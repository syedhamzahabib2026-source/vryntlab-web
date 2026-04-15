import type { IntentId } from "@/lib/intent";
import { getIntentById } from "@/lib/intent";

/** Client-sent hints so the model can stay aligned with the marketing site (optional). */
export type ChatSiteContextPayload = {
  intentId?: IntentId;
  pathname?: string;
  estimateOpen?: boolean;
};

const VALID_INTENTS = new Set<string>([
  "website",
  "automation",
  "custom",
  "app",
  "backend",
  "other",
]);

export function parseSiteContext(body: unknown): ChatSiteContextPayload | null {
  if (!body || typeof body !== "object") return null;
  const raw = (body as { siteContext?: unknown }).siteContext;
  if (!raw || typeof raw !== "object") return null;

  const out: ChatSiteContextPayload = {};

  const intentId = (raw as { intentId?: unknown }).intentId;
  if (typeof intentId === "string" && VALID_INTENTS.has(intentId)) {
    out.intentId = intentId as IntentId;
  }

  const pathname = (raw as { pathname?: unknown }).pathname;
  if (typeof pathname === "string") {
    const t = pathname.trim();
    if (t.length > 0 && t.length <= 512) out.pathname = t;
  }

  if ((raw as { estimateOpen?: unknown }).estimateOpen === true) {
    out.estimateOpen = true;
  }

  if (
    out.intentId === undefined &&
    out.pathname === undefined &&
    out.estimateOpen === undefined
  ) {
    return null;
  }
  return out;
}

/**
 * Short, factual appendix for the system prompt — not shown to the user verbatim.
 */
export function buildSiteContextSystemAppend(ctx: ChatSiteContextPayload): string {
  const lines: string[] = [];

  if (ctx.intentId) {
    const opt = getIntentById(ctx.intentId);
    if (opt) {
      lines.push(
        `- They selected “${opt.label}” on the site (${opt.headline}). One-line summary: ${opt.summary}`,
      );
    } else {
      lines.push(`- They indicated interest in: ${ctx.intentId}`);
    }
  }

  if (ctx.pathname) {
    lines.push(`- Current page path: ${ctx.pathname}`);
  }

  if (ctx.estimateOpen) {
    lines.push(
      "- The quick estimate sheet is open — they may be thinking about scope or pricing.",
    );
  }

  if (lines.length === 0) return "";

  return `
## Site context (live website — internal)
Use only when it genuinely helps you respond; never recite this list. Stay conversational.

${lines.join("\n")}
`.trim();
}
