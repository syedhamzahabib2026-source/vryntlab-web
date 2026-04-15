/**
 * Lightweight in-memory limits for POST /api/chat.
 * Resets on server restart; not shared across serverless instances (see caveats in docs).
 */

import { serverEnv } from "@/lib/config/env";

export type ClientMessage = { role: "user" | "assistant"; content: string };

export function getChatProtectionConfig() {
  const c = serverEnv.chat;
  return {
    windowMs: c.rateLimitWindowMs,
    maxRequestsPerWindow: c.rateLimitMax,
    maxCharsPerMessage: c.maxCharsPerMessage,
    maxMessagesPerRequest: c.maxMessagesPerRequest,
    maxTotalMessageChars: c.maxTotalMessageChars,
    maxBodyBytes: c.maxBodyBytes,
    identicalBurstMax: c.identicalBurstMax,
    identicalBurstWindowMs: c.identicalBurstWindowMs,
  };
}

export function protectionLog(code: string, detail?: string): void {
  const tail = detail ? ` ${detail}` : "";
  console.warn(`[chat-protect] ${code}${tail}`);
}

export function getClientIp(req: Request): string {
  const xf = req.headers.get("x-forwarded-for");
  if (xf) {
    const first = xf.split(",")[0]?.trim();
    if (first) return first.slice(0, 128);
  }
  const real = req.headers.get("x-real-ip")?.trim();
  if (real) return real.slice(0, 128);
  return "unknown";
}

const ipHits: Map<string, number[]> = new Map();

function pruneHits(ts: number[], now: number, windowMs: number): number[] {
  const cutoff = now - windowMs;
  return ts.filter((t) => t > cutoff);
}

/**
 * Sliding window: max N timestamps per IP within windowMs.
 */
export function checkRateLimit(ip: string): boolean {
  const { windowMs, maxRequestsPerWindow } = getChatProtectionConfig();
  const now = Date.now();
  let hits = ipHits.get(ip) ?? [];
  hits = pruneHits(hits, now, windowMs);
  if (hits.length >= maxRequestsPerWindow) {
    ipHits.set(ip, hits);
    return false;
  }
  hits.push(now);
  ipHits.set(ip, hits);
  return true;
}

type IdenticalState = { hash: string; count: number; windowEnd: number };

const identicalByIp: Map<string, IdenticalState> = new Map();

function fnv1a32(s: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16);
}

/**
 * Blocks rapid-fire identical last user messages (spam / stuck client).
 */
export function checkIdenticalUserMessageBurst(ip: string, messages: ClientMessage[]): boolean {
  const lastUser = [...messages].reverse().find((m) => m.role === "user")?.content ?? "";
  if (lastUser.length < 12) return true;

  const { identicalBurstMax, identicalBurstWindowMs } = getChatProtectionConfig();
  const now = Date.now();
  const hash = fnv1a32(lastUser);
  const st = identicalByIp.get(ip);
  if (!st || now > st.windowEnd) {
    identicalByIp.set(ip, { hash, count: 1, windowEnd: now + identicalBurstWindowMs });
    return true;
  }
  if (st.hash === hash) {
    st.count += 1;
    if (st.count >= identicalBurstMax) {
      identicalByIp.set(ip, st);
      return false;
    }
  } else {
    st.hash = hash;
    st.count = 1;
  }
  identicalByIp.set(ip, st);
  return true;
}

/** Very low alphanumeric ratio in a long string — random symbols / keyboard mash */
export function looksLikeGarbageText(s: string): boolean {
  if (s.length < 48) return false;
  const alnum = (s.match(/[a-z0-9]/gi) ?? []).length;
  return alnum / s.length < 0.12;
}

export function validateMessageSizes(messages: ClientMessage[]): {
  ok: true;
} | { ok: false; code: "message_too_long" | "invalid_payload"; maxChars: number } {
  const { maxCharsPerMessage, maxMessagesPerRequest, maxTotalMessageChars } =
    getChatProtectionConfig();

  if (messages.length === 0 || messages.length > maxMessagesPerRequest) {
    return { ok: false, code: "invalid_payload", maxChars: maxCharsPerMessage };
  }

  let total = 0;
  for (const m of messages) {
    const len = m.content.length;
    if (len > maxCharsPerMessage) {
      return { ok: false, code: "message_too_long", maxChars: maxCharsPerMessage };
    }
    total += len;
  }
  if (total > maxTotalMessageChars) {
    return { ok: false, code: "message_too_long", maxChars: maxCharsPerMessage };
  }
  return { ok: true };
}
