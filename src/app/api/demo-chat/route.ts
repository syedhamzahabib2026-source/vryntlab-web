import "server-only";
import { getDemoConfig, getDemoSource } from "@/lib/demoConfigs";
import { createOpenRouterClient } from "@/lib/ai/openrouter";
import { DEFAULT_OPENROUTER_CHAT_MODEL } from "@/lib/ai/models";
import { serverEnv } from "@/lib/config/env";
import { createSupabaseLeadWriteClient } from "@/lib/integrations/supabase";
import { extractLeadFromTranscript, toSaveableLead } from "@/lib/ai/extract-lead";
import { shouldExtractAndSaveLead, leadLog } from "@/lib/lead/save-gate";
import { saveLead } from "@/lib/lead/save-lead";
import { threadRequestedHuman, shouldNotifyLead } from "@/lib/lead/human-request";
import { getThreadLeadIntentLevel, threadIntentStrengthScore } from "@/lib/lead/intent";
import { sendLeadNotifications } from "@/lib/integrations/lead-notifications";
import { checkRateLimit, getClientIp } from "@/lib/utils/chat-protection";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { NextResponse } from "next/server";
import type { DemoConfig } from "@/lib/demoConfigs";

export const runtime = "nodejs";

type Message = { role: "user" | "assistant"; content: string };

type RequestBody = {
  messages?: unknown;
  slug?: unknown;
  conversationId?: unknown;
  leadAlreadySaved?: unknown;
};

function parseMessages(body: unknown): Message[] | null {
  const messages = (body as RequestBody).messages;
  if (!Array.isArray(messages)) return null;
  const out: Message[] = [];
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

function parseSlug(body: unknown): string | undefined {
  const s = (body as RequestBody).slug;
  if (typeof s !== "string") return undefined;
  const t = s.trim().toLowerCase().replace(/[^a-z0-9-]/g, "");
  return t || undefined;
}

function parseConversationId(body: unknown): string | null {
  const v = (body as RequestBody).conversationId;
  if (typeof v !== "string") return null;
  const t = v.trim();
  if (t.length < 8 || t.length > 128) return null;
  return t;
}

function parseLeadAlreadySaved(body: unknown): boolean {
  return (body as RequestBody).leadAlreadySaved === true;
}

function buildSystemPrompt(config: DemoConfig): string {
  return `You are ${config.businessName}'s booking concierge — warm, polished, and efficient, like the best front-desk coordinator at a high-end med spa in ${config.location}.

GOAL: turn curious visitors into booked consultations, capturing their name + email along the way.

Business details:
- Services: ${config.services.join(", ")}
- Hours: ${config.hours}
- Location: ${config.location}
- Pricing: ${config.pricingNote}
- Booking link: ${config.bookingLink}

How you operate:
- Open warm and brief. Answer the visitor's actual question first, then guide toward booking.
- Capture contact naturally at peak interest — once someone asks about a specific treatment or booking, ask: "I'd love to get you booked — what's the best name and email for our team?" Never dump a form.
- Remember what they've told you this conversation (name, treatment of interest) and use it. Never re-ask.
- Once you have a name + email, share the booking link and confirm warmly by name.

Voice:
- Short, friendly, human. 1–3 sentences per reply. No corporate stiffness, no "As an AI."
- Speak as ${config.businessName} ("we", "our team"). Never mention VryntLab or that this is a demo.

Guardrails:
- Never invent exact prices — use the pricing note and steer to a consult.
- Never make medical or outcome claims (results, safety, dosages). Defer to "our practitioners can walk you through that at your consult."
- If asked whether you're a bot, be honest and light: "I'm ${config.businessName}'s digital assistant — happy to help you book!" and keep moving.
- If off-topic or unknown, offer to have the team follow up and capture their contact.

Message formatting:
- Text like a real person: short, one thought per line.
- Put each thought on its own new line.
- Keep each line to one short sentence.
- Put any follow-up question on its own final line.
- Never send a dense paragraph.`;
}

export async function POST(req: Request): Promise<Response> {
  const ip = getClientIp(req);
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "Too many requests. Please wait a moment." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const messages = parseMessages(body);
  if (!messages || messages.length === 0 || !messages.some((m) => m.role === "user")) {
    return NextResponse.json({ error: "Invalid messages" }, { status: 400 });
  }

  const slug = parseSlug(body);
  const conversationId = parseConversationId(body);
  const leadAlreadySaved = parseLeadAlreadySaved(body);
  const config = getDemoConfig(slug);
  const systemPrompt = buildSystemPrompt(config);
  const source = getDemoSource(slug, config);

  const client = createOpenRouterClient();
  const model = serverEnv.openrouter.chatModel || DEFAULT_OPENROUTER_CHAT_MODEL;
  const supabaseReady = Boolean(createSupabaseLeadWriteClient());

  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    async start(controller) {
      let fullText = "";

      try {
        const stream = await client.chat.completions.create({
          model,
          messages: [
            { role: "system", content: systemPrompt },
            ...(messages as ChatCompletionMessageParam[]),
          ],
          stream: true,
        });

        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content ?? "";
          if (text) {
            fullText += text;
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
          }
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Stream error";
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: msg })}\n\n`));
        controller.close();
        return;
      }

      // Lead extraction runs after stream completes — user already has the full response
      let leadSaved = false;
      if (!leadAlreadySaved && conversationId && supabaseReady && fullText.trim()) {
        const fullThread: Message[] = [
          ...messages,
          { role: "assistant", content: fullText.trim() },
        ];
        const gate = shouldExtractAndSaveLead(fullThread);
        if (gate.ok) {
          try {
            leadLog("[demo] lead_gate_passed");
            const extracted = await extractLeadFromTranscript(fullThread);
            const payload = toSaveableLead(extracted);
            if (payload) {
              const threadIntent = getThreadLeadIntentLevel(fullThread);
              const intentStrength = threadIntent === "none" ? null : threadIntent;
              const intentScore = threadIntentStrengthScore(threadIntent);
              const humanRequested =
                threadRequestedHuman(fullThread) || Boolean(extracted.humanRequested);
              const result = await saveLead({
                ...payload,
                conversationId,
                intentStrength,
                source,
                humanRequested,
              });
              if (result.outcome === "inserted") {
                leadSaved = true;
                if (shouldNotifyLead(humanRequested, intentScore)) {
                  void sendLeadNotifications({
                    name: payload.name,
                    email: payload.email,
                    business: payload.business,
                    website: payload.website,
                    need: payload.need,
                    intent_strength: intentStrength,
                    source,
                    created_at: result.createdAt,
                    conversation_id: conversationId,
                    human_requested: humanRequested,
                  });
                }
              } else if (result.outcome === "duplicate") {
                leadSaved = true;
              }
            }
          } catch (err) {
            console.error("[api/demo-chat] lead persistence failed", err);
          }
        } else {
          leadLog(`[demo] lead_gate_blocked: ${gate.reason}`);
        }
      }

      controller.enqueue(
        encoder.encode(`data: ${JSON.stringify({ done: true, leadSaved })}\n\n`),
      );
      controller.close();
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
