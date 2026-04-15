import { CHAT_SYSTEM_PROMPT } from "@/lib/ai/system-prompt";
import { extractLeadFromTranscript, toSaveableLead } from "@/lib/ai/extract-lead";
import { createOpenRouterClient } from "@/lib/ai/openrouter";
import { DEFAULT_OPENROUTER_CHAT_MODEL } from "@/lib/ai/models";
import { DEFAULT_LEAD_SOURCE } from "@/lib/config/brand";
import { serverEnv } from "@/lib/config/env";
import { sendLeadNotifications } from "@/lib/integrations/lead-notifications";
import { createSupabaseLeadWriteClient } from "@/lib/integrations/supabase";
import { shouldNotifyLead, threadRequestedHuman } from "@/lib/lead/human-request";
import {
  applyLeadIntentHint,
  getThreadLeadIntentLevel,
  threadIntentStrengthScore,
} from "@/lib/lead/intent";
import { leadLog, shouldExtractAndSaveLead } from "@/lib/lead/save-gate";
import { saveLead } from "@/lib/lead/save-lead";
import {
  buildSiteContextSystemAppend,
  parseSiteContext,
} from "@/lib/site/chat-site-context";
import {
  checkIdenticalUserMessageBurst,
  checkRateLimit,
  getChatProtectionConfig,
  getClientIp,
  looksLikeGarbageText,
  protectionLog,
  validateMessageSizes,
  type ClientMessage as ProtectClientMessage,
} from "@/lib/utils/chat-protection";
import { NextResponse } from "next/server";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

export const runtime = "nodejs";

type ClientMessage = ProtectClientMessage;

type ChatRequestBody = {
  messages?: unknown;
  leadAlreadySaved?: unknown;
  conversationId?: unknown;
};

function parseMessages(body: unknown): ClientMessage[] | null {
  if (!body || typeof body !== "object") return null;
  const messages = (body as ChatRequestBody).messages;
  if (!Array.isArray(messages)) return null;

  const out: ClientMessage[] = [];
  for (const m of messages) {
    if (!m || typeof m !== "object") return null;
    const role = (m as { role?: unknown }).role;
    const content = (m as { content?: unknown }).content;
    if (role !== "user" && role !== "assistant") return null;
    if (typeof content !== "string" || content.trim().length === 0) return null;
    out.push({ role, content: content.trim() });
  }
  return out;
}

function parseLeadAlreadySaved(body: unknown): boolean {
  if (!body || typeof body !== "object") return false;
  const v = (body as ChatRequestBody).leadAlreadySaved;
  return v === true;
}

function parseConversationId(body: unknown): string | null {
  if (!body || typeof body !== "object") return null;
  const v = (body as ChatRequestBody).conversationId;
  if (typeof v !== "string") return null;
  const t = v.trim();
  if (t.length < 8 || t.length > 128) return null;
  return t;
}

const ERR_RATE = "Too many messages too quickly. Please wait a moment and try again.";
const ERR_TOO_LONG = "That message is too long. Please shorten it and try again.";
const ERR_BAD_REQUEST =
  "We couldn't process this chat request. Please refresh the page and try again.";
const ERR_GARBAGE = "Something looked off with that message. Please try again in a moment.";

function chatVerboseLogsEnabled(): boolean {
  return !serverEnv.isProduction || serverEnv.chat.verboseLogs;
}

/** Model splits multi-bubble replies with this token (see system prompt). Max 3 segments client-side. */
const ASSISTANT_REPLY_SPLIT = "<<<MSG>>>";

function splitAssistantReply(text: string): string[] {
  const trimmed = text.trim();
  if (!trimmed.includes(ASSISTANT_REPLY_SPLIT)) {
    return [trimmed];
  }
  const parts = trimmed
    .split(ASSISTANT_REPLY_SPLIT)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
  if (parts.length === 0) return [trimmed];
  return parts.slice(0, 3);
}

function resolvedLeadSource(): string {
  return serverEnv.lead.source || DEFAULT_LEAD_SOURCE;
}

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    const { maxBodyBytes } = getChatProtectionConfig();
    const contentLength = req.headers.get("content-length");
    if (contentLength) {
      const n = Number(contentLength);
      if (Number.isFinite(n) && n > maxBodyBytes) {
        protectionLog("message_too_long", `body>${maxBodyBytes}b`);
        return NextResponse.json({ error: ERR_TOO_LONG }, { status: 413 });
      }
    }

    if (!checkRateLimit(ip)) {
      protectionLog("rate_limited", ip);
      return NextResponse.json({ error: ERR_RATE }, { status: 429 });
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      protectionLog("invalid_payload", "json_parse");
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const parsed = parseMessages(body);
    if (!parsed) {
      protectionLog("invalid_payload", "messages_shape");
      return NextResponse.json(
        { error: "Expected { messages: { role, content }[] } with non-empty user/assistant strings" },
        { status: 400 },
      );
    }

    const sizeCheck = validateMessageSizes(parsed);
    if (!sizeCheck.ok) {
      protectionLog(sizeCheck.code, `max=${sizeCheck.maxChars}`);
      return NextResponse.json(
        { error: sizeCheck.code === "message_too_long" ? ERR_TOO_LONG : ERR_BAD_REQUEST },
        { status: 400 },
      );
    }

    const lastUserContent = [...parsed].reverse().find((m) => m.role === "user")?.content ?? "";
    if (looksLikeGarbageText(lastUserContent)) {
      protectionLog("abuse_blocked", "low_signal");
      return NextResponse.json({ error: ERR_GARBAGE }, { status: 400 });
    }

    if (!checkIdenticalUserMessageBurst(ip, parsed)) {
      protectionLog("abuse_blocked", "identical_burst");
      return NextResponse.json({ error: ERR_RATE }, { status: 429 });
    }

    const leadAlreadySaved = parseLeadAlreadySaved(body);
    const conversationId = parseConversationId(body);
    const maxMsgs = getChatProtectionConfig().maxMessagesPerRequest;
    const trimmed = parsed.slice(-maxMsgs);
    if (!trimmed.some((m) => m.role === "user")) {
      protectionLog("invalid_payload", "no_user_turn");
      return NextResponse.json({ error: ERR_BAD_REQUEST }, { status: 400 });
    }

    const lastUser = [...trimmed].reverse().find((m) => m.role === "user")?.content ?? "";
    const siteCtx = parseSiteContext(body);
    let systemPrompt = applyLeadIntentHint(CHAT_SYSTEM_PROMPT, lastUser);
    if (siteCtx) {
      const siteAppend = buildSiteContextSystemAppend(siteCtx);
      if (siteAppend) {
        systemPrompt = `${systemPrompt}\n\n${siteAppend}`;
      }
    }

    const client = createOpenRouterClient();
    const model = serverEnv.openrouter.chatModel || DEFAULT_OPENROUTER_CHAT_MODEL;

    const completion = await client.chat.completions.create({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        ...trimmed as ChatCompletionMessageParam[],
      ],
    });

    const replyRaw = completion.choices[0]?.message?.content?.trim() ?? "";
    if (!replyRaw) {
      return NextResponse.json({ error: "Empty model response" }, { status: 502 });
    }

    const replyParts = splitAssistantReply(replyRaw);
    const reply = replyParts.join("\n\n");

    let leadSaved = false;

    const supabaseReady = Boolean(createSupabaseLeadWriteClient());

    if (leadAlreadySaved) {
      leadLog("lead_gate_blocked: already_saved");
    } else if (!supabaseReady) {
      leadLog("lead_gate_blocked: supabase_unconfigured");
    } else if (!conversationId) {
      leadLog("lead_gate_blocked: no_conversation_id");
    } else {
      const gate = shouldExtractAndSaveLead(trimmed);
      if (!gate.ok) {
        leadLog(`lead_gate_blocked: ${gate.reason}`);
      } else {
        leadLog("lead_gate_passed");
        try {
          leadLog("lead_extract_started");
          const extracted = await extractLeadFromTranscript(trimmed);
          const payload = toSaveableLead(extracted);
          if (!payload) {
            leadLog("lead_extract_skipped: invalid_payload");
          } else {
            const threadIntent = getThreadLeadIntentLevel(trimmed);
            const intentStrength = threadIntent === "none" ? null : threadIntent;
            const intentScore = threadIntentStrengthScore(threadIntent);
            const humanRequested =
              threadRequestedHuman(trimmed) || Boolean(extracted.humanRequested);
            const notifyPreview = shouldNotifyLead(humanRequested, intentScore);
            if (chatVerboseLogsEnabled()) {
              leadLog(
                `lead_pipeline_snapshot: ${JSON.stringify({
                  name: payload.name,
                  email: payload.email,
                  business: payload.business,
                  website: payload.website,
                  need: payload.need.length > 280 ? `${payload.need.slice(0, 280)}…` : payload.need,
                  extracted_human_requested: extracted.humanRequested,
                  human_requested: humanRequested,
                  intent_strength: intentStrength,
                  intent_strength_score: intentScore,
                  notify_decision: notifyPreview,
                  skipped_reason: notifyPreview
                    ? undefined
                    : "need_email_present_but_no_human_and_intent_below_0.8",
                })}`,
              );
            }
            const leadSource = resolvedLeadSource();
            const result = await saveLead({
              ...payload,
              conversationId,
              intentStrength,
              source: leadSource,
              humanRequested,
            });
            if (result.outcome === "inserted") {
              leadLog("lead_saved");
              leadSaved = true;
              const shouldNotify = shouldNotifyLead(humanRequested, intentScore);
              const notifyDebug: Record<string, unknown> = {
                name: payload.name,
                business: payload.business,
                website: payload.website,
                email: payload.email,
                need: payload.need.length > 220 ? `${payload.need.slice(0, 220)}…` : payload.need,
                intent_strength: intentStrength,
                intent_strength_score: intentScore,
                human_requested: humanRequested,
                notify_decision: shouldNotify,
              };
              if (!shouldNotify) {
                notifyDebug.skipped_reason =
                  "need_email_present_but_no_human_and_intent_below_0.8";
              }
              if (chatVerboseLogsEnabled()) {
                console.log("[notify] gate_eval", JSON.stringify(notifyDebug));
              }

              if (shouldNotify) {
                await sendLeadNotifications({
                  name: payload.name,
                  email: payload.email,
                  business: payload.business,
                  website: payload.website,
                  need: payload.need,
                  intent_strength: intentStrength,
                  source: leadSource,
                  created_at: result.createdAt,
                  conversation_id: conversationId,
                  human_requested: humanRequested,
                });
              } else {
                leadLog("lead_notify_skipped: not_action_oriented");
              }
            } else if (result.outcome === "duplicate") {
              leadLog("lead_skipped_duplicate");
              leadSaved = true;
            }
          }
        } catch (err) {
          console.error("[api/chat] lead persistence failed", err);
        }
      }
    }

    const jsonBody: { reply: string; leadSaved?: boolean; replies?: string[] } = leadSaved
      ? { reply, leadSaved: true }
      : { reply };
    if (replyParts.length > 1) {
      jsonBody.replies = replyParts;
    }
    return NextResponse.json(jsonBody);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (message.includes("OPENROUTER_API_KEY")) {
      return NextResponse.json({ error: "Chat is not configured (missing API key)" }, { status: 503 });
    }
    console.error("[api/chat]", err);
    return NextResponse.json({ error: "Chat request failed" }, { status: 500 });
  }
}
