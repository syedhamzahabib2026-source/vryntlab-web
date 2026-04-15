/**
 * Code-first gate: when to run paid LLM extraction + Supabase insert.
 * No extra AI calls — only string/heuristic checks + existing intent helpers.
 */

import { threadRequestedHuman } from "./human-request";
import { getThreadLeadIntentLevel } from "./intent";

const EMAIL_TOKEN = /[^\s@]+@[^\s@]+\.[^\s@]+/g;
const EMAIL_STRICT = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Lightweight structured logs (grep server output for `[lead]`). */
export function leadLog(message: string): void {
  console.log(`[lead] ${message}`);
}

function userBlob(messages: { role: string; content: string }[]): string {
  return messages
    .filter((m) => m.role === "user")
    .map((m) => m.content)
    .join("\n");
}

export function strictEmailInUserMessages(messages: { role: string; content: string }[]): boolean {
  for (const m of messages) {
    if (m.role !== "user") continue;
    const matches = m.content.match(EMAIL_TOKEN);
    if (!matches) continue;
    if (matches.some((x) => EMAIL_STRICT.test(x.trim()))) return true;
  }
  return false;
}

function minConversationShape(messages: { role: "user" | "assistant"; content: string }[]): boolean {
  const users = messages.filter((m) => m.role === "user");
  const assistants = messages.filter((m) => m.role === "assistant");
  if (users.length >= 2 && assistants.length >= 1) return true;
  const chars = userBlob(messages).length;
  if (users.length === 1 && chars >= 100) return true;
  return false;
}

function hasBusinessNameHint(blob: string): boolean {
  return (
    /\b(LLC|L\.L\.C\.|Inc\.?|Ltd\.?|Corporation|Corp\.?|PLLC|LLP)\b/i.test(blob) ||
    /\b(my (business|company|store|shop|restaurant|salon|agency|studio|firm))\b/i.test(blob) ||
    /\b(we('re| are)|our (company|business|shop|store))\b/i.test(blob)
  );
}

function hasWebsiteCandidate(blob: string): boolean {
  if (/\bhttps?:\/\/[^\s]+/i.test(blob)) return true;
  if (/\bwww\.[^\s]+/i.test(blob)) return true;
  // Ignore domains that only appear inside email addresses (e.g. user@company.com)
  const withoutEmails = blob.replace(EMAIL_TOKEN, " ");
  return /\b[a-z0-9][a-z0-9-]{0,62}\.(com|net|org|io|co|app|dev|ai|us)\b/i.test(withoutEmails);
}

function hasClearServiceNeed(blob: string): boolean {
  if (blob.length < 30) return false;
  return /\b(website|web site|webpage|landing|redesign|seo|book(ing)?|calendar|chat ?bot|e-?commerce|shopify|wordpress|squarespace|wix|automate|automation|integration|crm|funnel|conversion|marketing site|new site|online presence|contact form|menu|hours)\b/i.test(
    blob,
  );
}

export type ExtractSaveGateResult = { ok: true } | { ok: false; reason: string };

/**
 * True when we should call extraction + save.
 *
 * Rules (code-first):
 * - Valid email in user text
 * - Minimum conversation shape (≥2 user + ≥1 assistant, or one long user message)
 * - At least one of: business hint, website candidate, clear service need, **strong** intent,
 *   **soft** intent together with (business OR website OR clear service need), or **human/rep/callback** request
 */
export function shouldExtractAndSaveLead(
  messages: { role: "user" | "assistant"; content: string }[],
): ExtractSaveGateResult {
  if (!minConversationShape(messages)) {
    return { ok: false, reason: "min_turns" };
  }
  if (!strictEmailInUserMessages(messages)) {
    return { ok: false, reason: "missing_email" };
  }

  const blob = userBlob(messages);
  const business = hasBusinessNameHint(blob);
  const website = hasWebsiteCandidate(blob);
  const need = hasClearServiceNeed(blob);
  const threadIntent = getThreadLeadIntentLevel(messages);

  const strong = threadIntent === "strong";
  const softPlus = threadIntent === "soft" && (business || website || need);
  const humanAsk = threadRequestedHuman(messages);

  if (business || website || need || strong || softPlus || humanAsk) {
    return { ok: true };
  }

  return { ok: false, reason: "weak_context" };
}

/** @deprecated use shouldExtractAndSaveLead */
export function shouldAttemptLeadExtraction(
  messages: { role: "user" | "assistant"; content: string }[],
): boolean {
  return shouldExtractAndSaveLead(messages).ok;
}
