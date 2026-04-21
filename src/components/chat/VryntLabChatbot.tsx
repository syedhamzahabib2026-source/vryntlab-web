"use client";

import { chatWidgetDefaults } from "@/lib/config/brand";
import type { ChatSiteContextPayload } from "@/lib/site/chat-site-context";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChatLauncherGlyph } from "./ChatLauncherGlyph";
import {
  betweenBubbleTypingMs,
  firstBubbleTypingMs,
  normalizeAssistantParts,
} from "./assistant-split";
import "./chat-widget.css";

const LAUNCHER_TIP_SESSION_KEY = "vryntlab-chat-launcher-tip-dismissed";

export type ChatMessage = { role: "user" | "assistant"; content: string; id: string };

export type VryntLabChatbotProps = {
  /**
   * POST endpoint for chat JSON API (same host default).
   * When embedding in another Next app, copy `app/api/chat` or proxy to this service and set the full URL if needed.
   */
  apiUrl?: string;
  title?: string;
  /** If set, show this image instead of the default chat glyph */
  launcherImageSrc?: string;
  /** Optional class on the outer wrapper (launcher is fixed; wrapper is zero-size for layout) */
  className?: string;
  /** Live site hints (intent, path, estimate sheet) — merged on the server into the system prompt. */
  siteContext?: ChatSiteContextPayload | null;
};

function readOrCreateSessionId(storageKey: string): string {
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

function newMessageId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randInt(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function pickGreeting(greetings: readonly string[]): string {
  return greetings[randInt(0, greetings.length - 1)] ?? greetings[0] ?? "";
}

function TypingDots() {
  return (
    <div className="chat-typing" aria-label="Assistant is typing" role="status">
      <span />
      <span />
      <span />
    </div>
  );
}

/** Floating chat widget + launcher. Primary embed entry for host apps. */
export function VryntLabChatbot({
  apiUrl = "/api/chat",
  title = chatWidgetDefaults.title,
  launcherImageSrc,
  className,
  siteContext = null,
}: VryntLabChatbotProps) {
  const sessionKey = chatWidgetDefaults.sessionStorageKey;
  const greetings = chatWidgetDefaults.proactiveGreetings;

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [staging, setStaging] = useState(false);
  const [assistantTyping, setAssistantTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [leadAlreadySaved, setLeadAlreadySaved] = useState(false);
  const [launcherTipVisible, setLauncherTipVisible] = useState(false);
  /** Empty on SSR/first paint; synced from sessionStorage after mount to avoid hydration mismatch. */
  const [conversationId, setConversationId] = useState<string>("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const greetingGen = useRef(0);

  useEffect(() => {
    setConversationId(readOrCreateSessionId(sessionKey));
  }, [sessionKey]);

  const dismissLauncherTip = useCallback(() => {
    setLauncherTipVisible(false);
    try {
      sessionStorage.setItem(LAUNCHER_TIP_SESSION_KEY, "1");
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (sessionStorage.getItem(LAUNCHER_TIP_SESSION_KEY)) return;
    } catch {
      return;
    }
    const showTimer = window.setTimeout(() => setLauncherTipVisible(true), 3000);
    const hideTimer = window.setTimeout(() => {
      setLauncherTipVisible(false);
      try {
        sessionStorage.setItem(LAUNCHER_TIP_SESSION_KEY, "1");
      } catch {
        /* ignore */
      }
    }, 8000);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    if (open) dismissLauncherTip();
  }, [open, dismissLauncherTip]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => inputRef.current?.focus(), 80);
    return () => window.clearTimeout(id);
  }, [open]);

  const runProactiveGreeting = useCallback(() => {
    const id = ++greetingGen.current;
    setAssistantTyping(true);
    void (async () => {
      await sleep(randInt(480, 960));
      if (greetingGen.current !== id) {
        setAssistantTyping(false);
        return;
      }
      setAssistantTyping(false);
      setMessages((prev) => {
        if (greetingGen.current !== id) return prev;
        if (prev.some((m) => m.role === "user")) return prev;
        return [{ role: "assistant", content: pickGreeting(greetings), id: newMessageId() }];
      });
    })();
  }, [greetings]);

  useEffect(() => {
    runProactiveGreeting();
  }, [runProactiveGreeting]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, assistantTyping, open]);

  const deliverAssistantParts = useCallback(async (parts: string[]) => {
    const joinedLen = parts.join("").length;
    for (let i = 0; i < parts.length; i++) {
      setAssistantTyping(true);
      const ms = i === 0 ? firstBubbleTypingMs(joinedLen) : betweenBubbleTypingMs();
      await sleep(ms);
      setAssistantTyping(false);
      const chunk = parts[i]!;
      setMessages((m) => [...m, { role: "assistant", content: chunk, id: newMessageId() }]);
    }
  }, []);

  const send = useCallback(async () => {
    const text = input.trim();
    if (text === "" || loading || staging) return;

    setError(null);
    const userMsg: ChatMessage = { role: "user", content: text, id: newMessageId() };
    const nextThread = [...messages, userMsg];
    setMessages(nextThread);
    setInput("");
    setLoading(true);

    const cid = conversationId || readOrCreateSessionId(sessionKey);
    if (!conversationId && cid) setConversationId(cid);

    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextThread.map(({ role, content }) => ({ role, content })),
          leadAlreadySaved,
          conversationId: cid,
          ...(siteContext != null
            ? {
                siteContext: {
                  ...(siteContext.intentId != null
                    ? { intentId: siteContext.intentId }
                    : {}),
                  ...(siteContext.pathname ? { pathname: siteContext.pathname } : {}),
                  ...(siteContext.estimateOpen ? { estimateOpen: true } : {}),
                },
              }
            : {}),
        }),
      });
      const data = (await res.json()) as {
        reply?: string;
        replies?: string[];
        error?: string;
        leadSaved?: boolean;
      };
      if (!res.ok) {
        throw new Error(data.error || `Request failed (${res.status})`);
      }
      if (!data.reply || data.reply.trim() === "") {
        throw new Error("No reply from server");
      }
      if (data.leadSaved) {
        setLeadAlreadySaved(true);
      }

      const parts = normalizeAssistantParts(data.reply, data.replies);
      if (parts.length === 0) {
        throw new Error("No reply from server");
      }

      setLoading(false);
      setStaging(true);
      await deliverAssistantParts(parts);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong";
      setError(msg);
      setMessages((m) => m.slice(0, -1));
    } finally {
      setLoading(false);
      setStaging(false);
      setAssistantTyping(false);
    }
  }, [
    apiUrl,
    conversationId,
    deliverAssistantParts,
    input,
    leadAlreadySaved,
    loading,
    messages,
    sessionKey,
    staging,
    siteContext,
  ]);

  const clearChat = useCallback(() => {
    greetingGen.current += 1;
    try {
      sessionStorage.removeItem(sessionKey);
    } catch {
      /* ignore */
    }
    const nextId = crypto.randomUUID();
    try {
      sessionStorage.setItem(sessionKey, nextId);
    } catch {
      /* ignore */
    }
    setConversationId(nextId);
    setMessages([]);
    setError(null);
    setLeadAlreadySaved(false);
    setAssistantTyping(false);
    runProactiveGreeting();
  }, [runProactiveGreeting, sessionKey]);

  const panelClass = "chat-widget-panel " + (open ? "chat-widget-panel--open" : "");

  return (
    <div className={className ?? "vryntlab-chatbot-root"} data-vryntlab-chatbot="">
      <div
        className={"chat-widget-backdrop " + (open ? "chat-widget-backdrop--open" : "")}
        onClick={() => setOpen(false)}
        aria-hidden="true"
        role="presentation"
      />

      <div
        id="chat-widget-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="chat-widget-title"
        aria-hidden={!open}
        className={panelClass}
        inert={open ? undefined : true}
      >
        <header className="chat-widget-header">
          <h2 id="chat-widget-title" className="chat-widget-title">
            {title}
          </h2>
          <div className="chat-widget-header-actions">
            <button type="button" className="chat-widget-text-btn" onClick={clearChat}>
              {chatWidgetDefaults.newChatLabel}
            </button>
            <button
              type="button"
              className="chat-widget-icon-btn"
              aria-label={chatWidgetDefaults.closeAriaLabel}
              onClick={() => setOpen(false)}
            >
              ×
            </button>
          </div>
        </header>

        <div ref={scrollRef} className="chat-widget-scroll" aria-live="polite">
          {messages.length === 0 && !assistantTyping && !loading && !staging && (
            <p className="chat-widget-empty-hint">{chatWidgetDefaults.emptyThreadHint}</p>
          )}
          {messages.map((m) => (
            <div
              key={m.id}
              className={
                "chat-widget-row " +
                (m.role === "user" ? "chat-widget-row--user" : "chat-widget-row--assistant")
              }
            >
              <div
                className={
                  "chat-widget-bubble " +
                  (m.role === "user" ? "chat-widget-bubble--user" : "chat-widget-bubble--assistant")
                }
              >
                {m.content}
              </div>
            </div>
          ))}
          {(assistantTyping || loading) && (
            <div className="chat-widget-row chat-widget-row--assistant">
              <div className="chat-widget-bubble chat-widget-bubble--typing">
                <TypingDots />
              </div>
            </div>
          )}
        </div>

        {error && (
          <p className="chat-widget-error" role="alert">
            {error}
          </p>
        )}

        <div className="chat-widget-composer">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void send();
              }
            }}
            placeholder={chatWidgetDefaults.placeholder}
            rows={3}
            disabled={loading || staging}
            autoComplete="off"
            enterKeyHint="send"
          />
          <button
            type="button"
            className="chat-widget-send"
            onClick={() => void send()}
            disabled={loading || staging || input.trim() === ""}
          >
            {loading ? chatWidgetDefaults.sendingLabel : chatWidgetDefaults.sendLabel}
          </button>
        </div>
      </div>

      <div className="chat-widget-launcher-wrap">
        {launcherTipVisible && !open ? (
          <div className="chat-widget-launcher-tip" role="status">
            Ask VryntLab →
          </div>
        ) : null}
        <button
          type="button"
          className={
            "chat-widget-launcher chat-widget-launcher--alive " +
            (open ? "chat-widget-launcher--hidden" : "")
          }
          onClick={() => {
            dismissLauncherTip();
            setOpen(true);
          }}
          aria-expanded={open}
          aria-controls="chat-widget-panel"
          aria-label={chatWidgetDefaults.launcherAriaLabel}
          aria-hidden={open}
          tabIndex={open ? -1 : 0}
        >
          {launcherImageSrc ? (
            <Image
              src={launcherImageSrc}
              alt=""
              width={26}
              height={26}
              unoptimized
              priority
              className="chat-widget-launcher-img"
            />
          ) : (
            <ChatLauncherGlyph />
          )}
          <span className="chat-widget-launcher-label">
            {chatWidgetDefaults.launcherButtonLabel}
          </span>
        </button>
      </div>
    </div>
  );
}

/** Alias for consumers who prefer a generic widget name. */
export const ChatWidget = VryntLabChatbot;
