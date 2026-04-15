import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { serverEnv } from "@/lib/config/env";
import type { LeadPayload } from "@/lib/lead/save-lead";
import { createOpenRouterClient } from "@/lib/ai/openrouter";
import { DEFAULT_OPENROUTER_EXTRACT_MODEL } from "@/lib/ai/models";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** User messages only — hints for light enrichment when the model under-fills. */
const PROJECT_NEED_HINT =
  /website|web\s*site|marketing|redesign|e-?commerce|seo|chatbot|booking|mobile|storefront|contact\s+form|services?\s+page|checkout|layout|cms|landing|conversion|branding|analytics/i;

const EXTRACT_SYSTEM = `You extract contact fields from a chat between a user and a business assistant.
Return ONLY valid JSON with exactly these keys: "name", "email", "business", "website", "need", "human_requested".
"name", "email", "business", "website", "need" are strings or null. "human_requested" is a boolean.

Ground rules:
- Use ONLY facts the USER stated in their messages. Ignore the assistant's guesses or suggestions unless the user clearly repeated them as their own.
- Never invent email, URL, or name. If unsure for those, use null.
- "name" = the person's name (not the company). If ambiguous, null.
- "email" = an address the user typed; null if absent.

Business ("business"):
- Fill when the user gave a company / organization / brand name: e.g. "Acme Co", "Northwind Design LLC", "we're Harborlight Books", "my business is …", "I run …", "our studio is …", "our agency …".
- Include legal suffixes as the user wrote them (LLC, Inc, Ltd, Corp, etc.).
- A standalone line that is clearly an organization name (e.g. "Northwind Design LLC" after giving their personal name) counts as business.
- If there is no clear business or org name, use null.

Need ("need"):
- Summarize what they want help with using ONLY the user's stated goals, services, and pain points across ALL of their messages.
- If they asked for several things (e.g. site redesign + contact form + mobile), combine into ONE concise summary (roughly 1–3 sentences, about 80–500 characters when they gave enough detail). Do not drop mentioned services.
- Prefer concrete project language over a single vague word. If they only said "website" once but elsewhere described pages, checkout, SEO, etc., include those details in "need".
- Do not copy the assistant's marketing text; paraphrase the user's request only.

Website ("website"):
- URL or domain the user gave; otherwise null.

Human follow-up ("human_requested"):
- true if the user clearly wants the team to follow up, contact them, or speak with someone (including paraphrases: contact me, reach out, get in touch, follow up, speak with someone, email me, let's talk, move forward, discuss this, book or schedule a call, callback, etc.). Be slightly liberal: if they sound ready for a human or next-step conversation, true.
- false if they are only browsing, asking prices, or gave no follow-up signal.

When the user clearly stated something for a field, prefer filling it over null. Still never fabricate contact details.`;

export type ExtractedLead = {
  name: string | null;
  email: string | null;
  business: string | null;
  website: string | null;
  need: string | null;
  /** From extract model + normalization; OR with code-side phrase detection before save. */
  humanRequested: boolean;
};

/** Normalize model output: true / "true" / "yes" / "1" → true. */
export function normalizeExtractedHumanRequested(v: unknown): boolean {
  if (v === true) return true;
  if (v === false) return false;
  if (typeof v === "string") {
    const t = v.trim().toLowerCase();
    if (t === "true" || t === "yes" || t === "1") return true;
    if (t === "false" || t === "no" || t === "0") return false;
  }
  return false;
}

function normalizeField(v: unknown): string | null {
  if (v === null || v === undefined) return null;
  if (typeof v !== "string") return null;
  const t = v.trim();
  if (!t || /^null$/i.test(t)) return null;
  return t;
}

function parseExtractedJson(raw: string): ExtractedLead {
  const parsed = JSON.parse(raw) as Record<string, unknown>;
  return {
    name: normalizeField(parsed.name),
    email: normalizeField(parsed.email),
    business: normalizeField(parsed.business),
    website: normalizeField(parsed.website),
    need: normalizeField(parsed.need),
    humanRequested: normalizeExtractedHumanRequested(parsed.human_requested),
  };
}

function userMessagesBlob(
  messages: { role: "user" | "assistant"; content: string }[],
): string {
  return messages
    .filter((m) => m.role === "user")
    .map((m) => m.content.trim())
    .join("\n");
}

/** Legal-entity or explicit "my business / I run / our company is …" from user text only. */
function inferBusinessFromUserText(blob: string): string | null {
  const legal = blob.match(
    /\b([A-Z][A-Za-z0-9&'’.\s-]{2,55}?)\s+(LLC|L\.L\.C\.|Inc\.?|Incorporated|Ltd\.?|Limited|Corp\.?|Corporation|LP|PLC)\b/,
  );
  if (legal) {
    const b = `${legal[1].trim()} ${legal[2]}`.replace(/\s+/g, " ").trim();
    if (b.length >= 4 && b.length <= 200 && !EMAIL_RE.test(b)) return b;
  }
  const phrase = blob.match(
    /(?:^|[\n.])(?:my business is|i\s+run|we(?:'|’)?re\s+(?:called|named)|our\s+(?:company|studio|shop|agency|firm|clinic)\s+is)\s+([^.\n]+)/i,
  );
  if (phrase) {
    const b = phrase[1].trim().replace(/\s+/g, " ");
    if (b.length >= 2 && b.length <= 200 && !EMAIL_RE.test(b)) return b;
  }
  return null;
}

const THIN_NEED_MAX_LEN = 72;

/**
 * If the model returned a short "need" but a user line clearly states a fuller project, prefer that line.
 */
function expandThinNeed(need: string | null, userBlob: string): string | null {
  if (!need) return null;
  if (need.length >= THIN_NEED_MAX_LEN) return need;
  const lines = userBlob
    .split(/\n/)
    .map((l) => l.trim())
    .filter((l) => l.length >= 32);
  const candidates = lines.filter((l) => PROJECT_NEED_HINT.test(l));
  let best = "";
  for (const l of candidates) {
    if (l.length > best.length) best = l;
  }
  if (best.length > need.length + 20) {
    return best.slice(0, 650).trim();
  }
  return need;
}

/**
 * Light post-pass: only fills gaps from USER text (no model call).
 * Exported for focused validation scripts.
 */
export function enrichExtractedFromUserText(
  extracted: ExtractedLead,
  userBlob: string,
): ExtractedLead {
  const blob = userBlob.trim();
  if (!blob) return extracted;

  let business = extracted.business;
  if (!business) {
    const inferred = inferBusinessFromUserText(blob);
    if (inferred) business = inferred;
  }

  const need = expandThinNeed(extracted.need, blob);

  return {
    ...extracted,
    business,
    need,
  };
}

export async function extractLeadFromTranscript(
  messages: { role: "user" | "assistant"; content: string }[],
): Promise<ExtractedLead> {
  const client = createOpenRouterClient();
  const model =
    serverEnv.openrouter.extractModel || DEFAULT_OPENROUTER_EXTRACT_MODEL;

  const transcript = messages
    .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
    .join("\n\n");

  const userBlob = userMessagesBlob(messages);

  const completion = await client.chat.completions.create({
    model,
    messages: [
      { role: "system", content: EXTRACT_SYSTEM },
      { role: "user", content: transcript },
    ] as ChatCompletionMessageParam[],
    response_format: { type: "json_object" },
    max_tokens: 520,
    temperature: 0,
  });

  const raw = completion.choices[0]?.message?.content?.trim();
  if (!raw) {
    return {
      name: null,
      email: null,
      business: null,
      website: null,
      need: null,
      humanRequested: false,
    };
  }

  try {
    return enrichExtractedFromUserText(parseExtractedJson(raw), userBlob);
  } catch {
    return {
      name: null,
      email: null,
      business: null,
      website: null,
      need: null,
      humanRequested: false,
    };
  }
}

function nameLooksValid(name: string): boolean {
  const t = name.trim();
  if (t.length < 2 || t.length > 80) return false;
  if (EMAIL_RE.test(t)) return false;
  if (/^\d+$/.test(t)) return false;
  return true;
}

function sanitizeWebsite(raw: string | null): string | null {
  if (!raw) return null;
  const t = raw.trim();
  if (!t) return null;
  if (/^https?:\/\//i.test(t)) return t.slice(0, 500);
  if (/^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/i.test(t)) {
    return t.slice(0, 500);
  }
  return null;
}

/**
 * Returns ready-to-save payload only when name, email, and need are clearly present and valid.
 */
export function toSaveableLead(extracted: ExtractedLead): LeadPayload | null {
  const { name, email, need } = extracted;
  if (!name || !nameLooksValid(name)) return null;
  if (!email || !EMAIL_RE.test(email)) return null;
  if (!need || need.length < 12) return null;
  if (need.length > 4000) return null;

  const business = extracted.business?.trim() ? extracted.business.trim().slice(0, 200) : null;
  if (business && business.length < 2) return null;

  return {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    business,
    website: sanitizeWebsite(extracted.website),
    need: need.trim(),
  };
}
