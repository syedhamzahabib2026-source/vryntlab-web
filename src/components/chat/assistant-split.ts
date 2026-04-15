/** Client-side assistant reply splitting (typing delays + multi-bubble UX). */

const SPLIT_LONG_MIN_TOTAL = 300;
const SPLIT_MIN_PART_LEN = 40;
const MAX_ASSISTANT_BUBBLES = 3;
/** Below this length, skip “smart” explanatory splitting (avoid choppy short replies). */
const SMART_SPLIT_MIN_CHARS = 100;

/** Split prose into sentences on . ! ? followed by space + word start. */
export function splitSentences(text: string): string[] {
  const normalized = text.replace(/\n+/g, " ").replace(/\s+/g, " ").trim();
  if (!normalized) return [];
  const parts = normalized.split(/(?<=[.!?])\s+(?=[\w"'(0-9-])/);
  const out = parts.map((p) => p.trim()).filter(Boolean);
  return out.length ? out : [text.trim()];
}

/** Up to two body bubbles from plain text (paragraphs first, else sentence groups). */
export function splitBodyIntoAtMostTwo(body: string): string[] {
  const t = body.trim();
  if (!t) return [];

  const paras = t.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
  if (paras.length >= 2) {
    if (paras.length === 2) return paras;
    return [paras[0]!, paras.slice(1).join("\n\n")];
  }

  const sents = splitSentences(t);
  if (sents.length <= 2) return [t];
  const mid = Math.ceil(sents.length / 2);
  const a = sents.slice(0, mid).join(" ").trim();
  const b = sents.slice(mid).join(" ").trim();
  if (a.length < SPLIT_MIN_PART_LEN || b.length < SPLIT_MIN_PART_LEN) return [t];
  return [a, b];
}

/**
 * Explanation-style split: prefer body → body → trailing question (max 3 bubbles).
 */
export function smartSplitAssistant(text: string): string[] {
  const t = text.trim();
  if (t.length < SMART_SPLIT_MIN_CHARS) return [t];

  const paras = t.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
  if (paras.length >= 2) {
    const lastP = paras[paras.length - 1]!;
    if (lastP.endsWith("?")) {
      const bodyParas = paras.slice(0, -1);
      let bodyBubbles: string[];
      if (bodyParas.length === 1) {
        bodyBubbles = splitBodyIntoAtMostTwo(bodyParas[0]!);
      } else if (bodyParas.length === 2) {
        bodyBubbles = bodyParas;
      } else {
        bodyBubbles = [bodyParas[0]!, bodyParas.slice(1).join("\n\n")];
      }
      const out = [...bodyBubbles, lastP].filter((x) => x.length > 0).slice(0, MAX_ASSISTANT_BUBBLES);
      if (out.length >= 2 && out[out.length - 1]!.endsWith("?")) return out;
    }
  }

  const sents = splitSentences(t);
  if (sents.length >= 2 && sents[sents.length - 1]!.endsWith("?")) {
    const q = sents[sents.length - 1]!;
    const body = sents.slice(0, -1).join(" ").trim();
    if (body.length < SPLIT_MIN_PART_LEN) return [t];
    const bodyBubbles = splitBodyIntoAtMostTwo(body);
    const out = [...bodyBubbles, q].slice(0, MAX_ASSISTANT_BUBBLES);
    if (out.length >= 2) return out;
  }

  return [t];
}

export function maybeSplitLongSingleBubble(text: string): string[] {
  const trimmed = text.trim();
  if (trimmed.length <= SPLIT_LONG_MIN_TOTAL) return [trimmed];

  const blocks = trimmed
    .split(/\n\n+/)
    .map((b) => b.trim())
    .filter(Boolean);

  if (
    blocks.length >= 2 &&
    blocks.length <= MAX_ASSISTANT_BUBBLES &&
    blocks.every((b) => b.length >= SPLIT_MIN_PART_LEN)
  ) {
    return blocks.slice(0, MAX_ASSISTANT_BUBBLES);
  }

  if (blocks.length > MAX_ASSISTANT_BUBBLES) {
    const head = blocks[0]!;
    const rest = blocks.slice(1).join("\n\n");
    if (head.length >= SPLIT_MIN_PART_LEN && rest.length >= SPLIT_MIN_PART_LEN) {
      return [head, rest];
    }
  }

  return [trimmed];
}

export function normalizeAssistantParts(reply: string, replies: string[] | undefined): string[] {
  const clean = (s: string) => s.trim();
  if (Array.isArray(replies) && replies.length > 1) {
    const parts = replies.map(clean).filter((p) => p.length > 0);
    return parts.slice(0, MAX_ASSISTANT_BUBBLES);
  }
  const one = clean(reply);
  const smart = smartSplitAssistant(one);
  if (smart.length > 1) return smart;
  return maybeSplitLongSingleBubble(one);
}

/** First assistant bubble after fetch — slightly faster than before, still human. */
export function firstBubbleTypingMs(totalReplyChars: number): number {
  if (totalReplyChars < 160) return randInt(320, 720);
  return randInt(560, 1120);
}

/** Between split bubbles — shorter than first-bubble delays for one continuous reply feel. */
export function betweenBubbleTypingMs(): number {
  return randInt(240, 520);
}

function randInt(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min + 1));
}
