/**
 * Code-first detection: user asked for a human, rep, callback, or team follow-up.
 * Used for `human_requested` on the lead row and for the extract/save gate.
 */

const HUMAN_REQUEST_PHRASES = [
  "talk to a human",
  "speak to a human",
  "speak with a human",
  "speak with someone",
  "talk to someone",
  "real person",
  "live person",
  "actual person",
  "human being",
  "not a bot",
  "not a robot",
  "representative",
  "sales rep",
  "account manager",
  "someone from your team",
  "someone on your team",
  "member of your team",
  "call me back",
  "phone call",
  "give me a call",
  "call me at",
  "callback",
  "call-back",
  "follow-up from the team",
  "follow up from the team",
  "follow-up from your team",
  "follow up from your team",
  "please follow up",
  "want you to follow up",
  "want a follow up",
  "want a follow-up",
  "need a follow up",
  "need a follow-up",
  "can you follow up",
  "team to reach out",
  "have your team",
  "someone contact me",
  "person contact me",
  "contact me",
  "contact me directly",
  "get in touch with me",
  "reach out to me",
  "reach out to me personally",
  "can someone email me",
  "email me",
  "let's talk",
  "lets talk",
  "let us talk",
  "i want to move forward",
  "want to move forward",
  "i'd like to discuss",
  "id like to discuss",
  "i'd like to discuss this",
  "id like to discuss this",
  "discuss this further",
  "discuss this with",
  "escalate",
  "transfer me",
] as const;

function userTextBlob(messages: { role: string; content: string }[]): string {
  return messages
    .filter((m) => m.role === "user")
    .map((m) => m.content)
    .join("\n")
    .toLowerCase()
    .replace(/\s+/g, " ");
}

/** True if any user message suggests they want a human or direct team follow-up. */
export function threadRequestedHuman(messages: { role: string; content: string }[]): boolean {
  const blob = userTextBlob(messages);
  if (blob.length < 8) return false;
  return HUMAN_REQUEST_PHRASES.some((p) => blob.includes(p));
}

/**
 * Email/Slack alerts after a new lead insert (caller must already have email + need).
 * Notify when the user asked for follow-up/human **or** thread buying intent is strong (score ≥ 0.8).
 */
export function shouldNotifyLead(humanRequested: boolean, intentStrengthScore: number): boolean {
  if (humanRequested) return true;
  return intentStrengthScore >= 0.8;
}
