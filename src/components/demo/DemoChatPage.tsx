"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { flushSync } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import type { DemoConfig } from "@/lib/demoConfigs";
import "./demo-chat.css";

type Message = { role: "user" | "assistant"; content: string; id: string };

function newId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((res) => setTimeout(res, ms));
}

const URL_RE = /https?:\/\/[^\s<>"]+/g;

function linkifyText(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  URL_RE.lastIndex = 0;
  while ((match = URL_RE.exec(text)) !== null) {
    const raw = match[0].replace(/[.,;:!?)}\]'"]+$/, ""); // strip trailing punctuation
    if (match.index > last) parts.push(text.slice(last, match.index));
    parts.push(
      <a key={match.index} href={raw} target="_blank" rel="noopener noreferrer" className="demo-link">
        {raw}
      </a>,
    );
    last = match.index + raw.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length > 0 ? <>{parts}</> : text;
}

function readOrCreateConversationId(storageKey: string): string {
  if (typeof window === "undefined") return "";
  try {
    let id = sessionStorage.getItem(storageKey);
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem(storageKey, id);
    }
    return id;
  } catch {
    return crypto.randomUUID();
  }
}

// ── Chip logic ──────────────────────────────────────────────────────────────

type ChipSet = "initial" | "mid" | "booking" | "none";

function detectChipStage(messages: Message[]): ChipSet {
  // No user turn yet — always show service intro chips
  const hasUserMessage = messages.some((m) => m.role === "user");
  if (!hasUserMessage) return "initial";

  const lastBot = [...messages].reverse().find((m) => m.role === "assistant");
  if (!lastBot) return "initial";
  const txt = lastBot.content.toLowerCase();

  // Bot asked for contact info → hide chips
  if (
    (txt.includes("name") && (txt.includes("email") || txt.includes("number"))) ||
    txt.includes("best email") ||
    txt.includes("get in touch")
  ) {
    return "none";
  }
  // Bot mentioned booking or consult after real exchange → booking chips
  if (
    txt.includes("book") ||
    txt.includes("consult") ||
    txt.includes("appointment") ||
    txt.includes("schedule")
  ) {
    return "booking";
  }
  if (messages.length >= 4) return "mid";
  return "initial";
}

function getChips(config: DemoConfig, messages: Message[]): string[] {
  const stage = detectChipStage(messages);
  switch (stage) {
    case "none":
      return [];
    case "booking":
      return ["Book a consult", "How does it work?", "What should I expect?"];
    case "mid":
      return ["Book a consult", "Pricing info", "Hours & location"];
    case "initial":
    default: {
      const svcChips = config.services.slice(0, 3).map((s) => `Tell me about ${s}`);
      return [...svcChips, "Hours & location"];
    }
  }
}

// ── Avatar ──────────────────────────────────────────────────────────────────

function Avatar({
  name,
  color,
  small,
}: {
  name: string;
  color?: string;
  small?: boolean;
}) {
  const letter = name.charAt(0).toUpperCase();
  return (
    <div
      className={small ? "demo-avatar demo-avatar--sm" : "demo-avatar"}
      style={
        color
          ? { background: `linear-gradient(135deg, ${color}, ${color}88)` }
          : undefined
      }
      aria-hidden="true"
    >
      {letter}
    </div>
  );
}

// ── Typing dots ──────────────────────────────────────────────────────────────

function TypingDots() {
  return (
    <div className="demo-typing" aria-label="Typing" role="status">
      <span />
      <span />
      <span />
    </div>
  );
}

// ── SSE reader ───────────────────────────────────────────────────────────────

async function* readSSE(
  res: Response,
): AsyncGenerator<{ text?: string; done?: boolean; leadSaved?: boolean; error?: string }> {
  if (!res.body) return;
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const chunks = buffer.split("\n\n");
    buffer = chunks.pop() ?? "";
    for (const chunk of chunks) {
      if (!chunk.startsWith("data: ")) continue;
      const jsonStr = chunk.slice(6).trim();
      if (!jsonStr) continue;
      try {
        yield JSON.parse(jsonStr) as {
          text?: string;
          done?: boolean;
          leadSaved?: boolean;
          error?: string;
        };
      } catch {
        // skip malformed chunks
      }
    }
  }
}

// ── Main component ───────────────────────────────────────────────────────────

export function DemoChatPage({
  config,
  slug,
}: {
  config: DemoConfig;
  slug?: string;
}) {
  const storageKey = `demo_cid_${slug ?? "default"}`;

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [leadAlreadySaved, setLeadAlreadySaved] = useState(false);
  const [conversationId, setConversationId] = useState("");

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Init conversation ID client-side (avoids hydration mismatch)
  useEffect(() => {
    setConversationId(readOrCreateConversationId(storageKey));
  }, [storageKey]);

  // Proactive greeting
  useEffect(() => {
    const greeting =
      config.greeting ??
      `Hi there! I'm ${config.businessName}'s booking assistant. Are you looking to book a treatment, or just exploring what we offer?`;
    const t = window.setTimeout(() => {
      setMessages([{ role: "assistant", content: greeting, id: newId() }]);
    }, 550);
    return () => clearTimeout(t);
  }, [config]);

  // Auto-scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, streaming]);

  const chips = getChips(config, messages);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || streaming) return;

      setError(null);
      const userMsg: Message = { role: "user", content: trimmed, id: newId() };
      const nextThread = [...messages, userMsg];
      // flushSync paints typing dots before the fetch even starts
      flushSync(() => {
        setMessages(nextThread);
        setInput("");
        setStreaming(true);
        setStreamingText("");
      });

      const cid = conversationId || readOrCreateConversationId(storageKey);
      if (!conversationId && cid) setConversationId(cid);

      abortRef.current?.abort();
      const abort = new AbortController();
      abortRef.current = abort;

      try {
        const res = await fetch("/api/demo-chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: nextThread.map(({ role, content }) => ({ role, content })),
            slug: slug ?? null,
            conversationId: cid,
            leadAlreadySaved,
          }),
          signal: abort.signal,
        });

        if (!res.ok) {
          const data = (await res.json().catch(() => ({ error: `Request failed (${res.status})` }))) as {
            error?: string;
          };
          throw new Error(data.error ?? `Request failed (${res.status})`);
        }

        // Buffer off-screen — typing dots show throughout, no streaming text displayed
        let accumulated = "";
        for await (const event of readSSE(res)) {
          if (event.error) throw new Error(event.error);
          if (event.text) accumulated += event.text;
          if (event.done && event.leadSaved) setLeadAlreadySaved(true);
        }

        // Split, hard-cap at 3 bubbles, merge overflow into last
        let parts = accumulated.split(/\n+/).map((s) => s.trim()).filter(Boolean);
        if (parts.length > 3) {
          parts = [...parts.slice(0, 2), parts.slice(2).join(" ")];
        }

        // Reveal one at a time with a short typing pause between bubbles
        const BUBBLE_PAUSE = 380; // ~300–450ms, tune here
        for (let i = 0; i < parts.length; i++) {
          if (i > 0) await sleep(BUBBLE_PAUSE);
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: parts[i]!, id: newId() },
          ]);
        }
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Something went wrong");
        setMessages((prev) => prev.slice(0, -1)); // roll back user message
      } finally {
        setStreaming(false);
        setStreamingText("");
        abortRef.current = null;
      }
    },
    [conversationId, leadAlreadySaved, messages, slug, storageKey, streaming],
  );

  const accentStyle = config.brandColor
    ? ({ "--demo-accent": config.brandColor } as React.CSSProperties)
    : undefined;

  return (
    <div className="demo-outer" style={accentStyle}>
      {/* Intro copy */}
      <motion.div
        className="demo-intro"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="demo-intro-eyebrow">Live demo</p>
        <h1 className="demo-intro-title">{config.businessName} AI Concierge</h1>
        <p className="demo-intro-subtitle">
          Try the booking assistant — just like your clients would.
        </p>
      </motion.div>

      {/* Chat card */}
      <motion.div
        className="demo-card"
        initial={{ opacity: 0, y: 16, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
      >
        {/* Header */}
        <div className="demo-header">
          <Avatar name={config.businessName} color={config.brandColor} />
          <div className="demo-header-info">
            <span className="demo-header-name">{config.businessName}</span>
            <span className="demo-header-status">
              <span className="demo-status-dot" />
              Online now
            </span>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="demo-messages" aria-live="polite">
          <AnimatePresence initial={false}>
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className={`demo-row ${m.role === "user" ? "demo-row--user" : "demo-row--assistant"}`}
              >
                {m.role === "assistant" && (
                  <div className="demo-bubble-avatar">
                    <Avatar name={config.businessName} color={config.brandColor} small />
                  </div>
                )}
                <div
                  className={`demo-bubble ${m.role === "user" ? "demo-bubble--user" : "demo-bubble--assistant"}`}
                >
                  {linkifyText(m.content)}
                </div>
              </motion.div>
            ))}

            {/* Streaming bubble */}
            {streaming && (
              <motion.div
                key="__streaming__"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18 }}
                className="demo-row demo-row--assistant"
              >
                <div className="demo-bubble-avatar">
                  <Avatar name={config.businessName} color={config.brandColor} small />
                </div>
                <div className="demo-bubble demo-bubble--assistant">
                  {streamingText ? (
                    <>
                      {streamingText}
                      <span className="demo-cursor" aria-hidden="true" />
                    </>
                  ) : (
                    <TypingDots />
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <p className="demo-error" role="alert">
              {error}
            </p>
          )}
        </div>

        {/* Quick-reply chips */}
        <AnimatePresence>
          {chips.length > 0 && !streaming && (
            <motion.div
              key="chips"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.18 }}
              className="demo-chips"
            >
              {chips.map((chip) => (
                <motion.button
                  key={chip}
                  type="button"
                  className="demo-chip"
                  onClick={() => void send(chip)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  {chip}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Composer */}
        <div className="demo-composer">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void send(input);
              }
            }}
            placeholder="Message..."
            disabled={streaming}
            autoComplete="off"
            enterKeyHint="send"
            className="demo-input"
            rows={1}
          />
          <button
            type="button"
            className="demo-send"
            onClick={() => void send(input)}
            disabled={streaming || !input.trim()}
            aria-label="Send"
          >
            {streaming ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                style={{ animation: "demo-spin 1s linear infinite" }}
              >
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeDasharray="28 56"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M22 2L11 13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 2L15 22L11 13L2 9L22 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        </div>
      </motion.div>

      {/* Page footer — VryntLab credit (never appears in bot messages) */}
      <motion.div
        className="demo-page-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <a
          href="https://vryntlab.com/contact"
          target="_blank"
          rel="noopener noreferrer"
          className="demo-footer-link"
        >
          ⚡ Powered by VryntLab — want one for your business?
        </a>
      </motion.div>
    </div>
  );
}
