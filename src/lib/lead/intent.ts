/**
 * Heuristic intent tiers for the *latest user message* only.
 * Complements the LLM: the model must still interpret paraphrases and full-thread context.
 */
const STRONG_INTENT_PHRASES = [
  "i want to get started",
  "let's get started",
  "lets get started",
  "ready to get started",
  "can you help my business",
  "i need a website",
  "i want a website",
  "need a website",
  "build me a website",
  "i want a chatbot",
  "need a chatbot",
  "can someone contact me",
  "can you contact me",
  "please contact me",
  "contact me",
  "call me",
  "reach out to me",
  "have someone reach out",
  "i want a quote",
  "i'd like a quote",
  "id like a quote",
  "want a quote",
  "get a quote",
  "need a quote",
  "request a quote",
  "book a call",
  "schedule a call",
  "want to work with you",
  "looking to hire",
  "talk to a human",
  "speak to a human",
  "real person",
  "live agent",
  "human representative",
  "call me back",
  "request a callback",
] as const;

/** Softer problem/solution language—answer first; do not open a form. */
const SOFT_INTENT_PHRASES = [
  "i think i need help",
  "think i need help",
  "need help with my site",
  "help with my site",
  "help with my website",
  "website is kind of outdated",
  "site is kind of outdated",
  "my website is outdated",
  "my site is outdated",
  "outdated website",
  "outdated site",
  "old website",
  "old site",
  "not happy with my website",
  "not happy with my site",
  "improve conversions",
  "better conversions",
  "conversion rate",
  "not converting",
  "might need a chatbot",
  "thinking about a chatbot",
  "considering a chatbot",
  "might want a chatbot",
  "exploring a chatbot",
  "thinking about a new site",
  "thinking about a new website",
  "website redesign",
  "redesign my site",
  "redesign my website",
  "could use help",
  "need a hand",
  "struggling with my site",
  "struggling with my website",
  "site feels slow",
  "website feels slow",
  "want to freshen up",
  "refresh my website",
  "refresh my site",
  "not getting enough leads",
  "exploring options",
  "not sure where to start",
  "where should i start",
] as const;

export function normalizeUserText(message: string): string {
  return message.toLowerCase().replace(/\s+/g, " ").trim();
}

export type LeadIntentLevel = "none" | "soft" | "strong";

export function getLeadIntentLevel(message: string): LeadIntentLevel {
  const t = normalizeUserText(message);
  if (STRONG_INTENT_PHRASES.some((p) => t.includes(p))) return "strong";
  if (SOFT_INTENT_PHRASES.some((p) => t.includes(p))) return "soft";
  return "none";
}

/** Strongest signal seen in any user turn (for lead row metadata). */
export function getThreadLeadIntentLevel(
  messages: { role: string; content: string }[],
): LeadIntentLevel {
  let best: LeadIntentLevel = "none";
  for (const m of messages) {
    if (m.role !== "user") continue;
    const level = getLeadIntentLevel(m.content);
    if (level === "strong") return "strong";
    if (level === "soft") best = "soft";
  }
  return best;
}

/** Numeric score for notification gating (e.g. >= 0.8 ≈ strong thread intent). */
export function threadIntentStrengthScore(level: LeadIntentLevel): number {
  switch (level) {
    case "strong":
      return 1;
    case "soft":
      return 0.5;
    default:
      return 0;
  }
}

/** @deprecated use getLeadIntentLevel(message) === "strong" */
export function hasStrongBuyingIntent(message: string): boolean {
  return getLeadIntentLevel(message) === "strong";
}

export function applyLeadIntentHint(baseSystemPrompt: string, latestUserMessage: string): string {
  const level = getLeadIntentLevel(latestUserMessage);
  if (level === "none") return baseSystemPrompt;

  if (level === "strong") {
    return `${baseSystemPrompt}

## Runtime note (latest user message — strong signal)
The latest message reads as clear intent to move forward, get contacted, get a quote, or start a build. If this thread is **not** already in intake, open with a brief, human acknowledgment—then begin collecting details **one question at a time** (no form vibe). If intake is underway, ask only for the **next missing** field; do not restart unless they changed topic.`;
  }

  return `${baseSystemPrompt}

## Runtime note (latest user message — soft signal)
The latest message hints at a real problem or interest (e.g. site frustration, conversions, exploring a chatbot) but may not be a commitment. **Answer helpfully first.** Do **not** jump into field-by-field lead capture unless they already agreed or clearly escalated. At most, one optional, low-pressure check-in about whether they want someone to follow up—if they dodge it, keep helping with zero pressure.`;
}
