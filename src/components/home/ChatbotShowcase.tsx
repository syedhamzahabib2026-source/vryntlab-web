"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { chatWidgetDefaults } from "@/lib/config/brand";
import { brandChatbotShowcase } from "@/lib/brand-knowledge";
import {
  contentWell,
  focusRing,
  slabBleed,
  slabContent,
} from "@/components/layout/layoutTokens";
import { SectionShell } from "@/components/layout/SectionShell";
import { Reveal } from "@/components/motion/Reveal";
import { siteLogoSrc } from "@/lib/site";
import "@/components/chat/chat-widget.css";

type ExampleTurn =
  | { role: "user"; time: string; text: string }
  | { role: "assistant"; time: string; text: string };

const EXAMPLE_THREAD: readonly ExampleTurn[] = [
  {
    role: "user",
    time: "10:01 AM",
    text: "Hi, what services do you offer?",
  },
  {
    role: "assistant",
    time: "10:01 AM",
    text: "Hey! VryntLab builds websites, AI chatbots, and automations for growing businesses. We can help with anything from a full site redesign to adding a booking system or automating your customer replies. What are you looking to improve?",
  },
  {
    role: "user",
    time: "10:02 AM",
    text: "How long does a chatbot take to set up?",
  },
  {
    role: "assistant",
    time: "10:02 AM",
    text: "Usually 48 hours from when we have your business info. We handle the setup, training, and installation — you just review it before it goes live. Want me to send you a quick estimate?",
  },
];

type ChatLine = {
  key: string;
  role: "user" | "assistant";
  time: string;
  text: string;
};

function openLiveChatWidget() {
  document
    .querySelector<HTMLButtonElement>(
      "[data-vryntlab-chatbot] button.chat-widget-launcher:not(.chat-widget-launcher--hidden)",
    )
    ?.click();
}

function triggerChatLauncherAttentionOnce() {
  const btn = document.querySelector<HTMLButtonElement>(
    "[data-vryntlab-chatbot] button.chat-widget-launcher:not(.chat-widget-launcher--hidden)",
  );
  if (!btn || btn.dataset.launcherAttnFired === "1") return;
  btn.dataset.launcherAttnFired = "1";
  btn.classList.add("chat-launcher-attn-pulse");
  window.setTimeout(() => {
    btn.classList.remove("chat-launcher-attn-pulse");
  }, 2600);
}

function BotAvatar() {
  return (
    <div
      className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/12 bg-zinc-900/90 shadow-inner ring-1 ring-white/[0.06] sm:h-9 sm:w-9"
      aria-hidden
    >
      <Image
        src={siteLogoSrc}
        alt=""
        width={72}
        height={72}
        className="h-[1.35rem] w-auto object-contain opacity-95 sm:h-6"
      />
    </div>
  );
}

const bubbleMotion = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] as const },
};

function AnimatedExampleChat({ active }: { active: boolean }) {
  const [lines, setLines] = useState<ChatLine[]>([]);
  const [typingBeforeBot, setTypingBeforeBot] = useState(false);
  const [transcriptFade, setTranscriptFade] = useState(false);
  const genRef = useRef(0);
  const timeoutRefs = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    for (const id of timeoutRefs.current) window.clearTimeout(id);
    timeoutRefs.current = [];
  }, []);

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!active) return;
    const el = messagesContainerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [lines, typingBeforeBot, active]);

  useEffect(() => {
    if (!active) {
      genRef.current += 1;
      clearTimers();
      const resetId = window.setTimeout(() => {
        setLines([]);
        setTypingBeforeBot(false);
        setTranscriptFade(false);
      }, 0);
      return () => window.clearTimeout(resetId);
    }

    const myGen = ++genRef.current;

    const runCycle = (cycle: number) => {
      if (myGen !== genRef.current) return;
      clearTimers();
      setLines([]);
      setTypingBeforeBot(false);
      setTranscriptFade(false);

      let t = 0;
      const q = (delayMs: number, fn: () => void) => {
        t += delayMs;
        const id = window.setTimeout(() => {
          if (myGen !== genRef.current) return;
          fn();
        }, t);
        timeoutRefs.current.push(id);
      };

      const key = (idx: number) => `${cycle}-${idx}`;

      q(500, () => {
        setLines([
          {
            key: key(0),
            role: "user",
            time: EXAMPLE_THREAD[0]!.time,
            text: EXAMPLE_THREAD[0]!.text,
          },
        ]);
      });
      q(400, () => setTypingBeforeBot(true));
      q(1750, () => {
        setTypingBeforeBot(false);
        setLines((prev) => [
          ...prev,
          {
            key: key(1),
            role: "assistant",
            time: EXAMPLE_THREAD[1]!.time,
            text: EXAMPLE_THREAD[1]!.text,
          },
        ]);
      });
      q(1000, () => {
        setLines((prev) => [
          ...prev,
          {
            key: key(2),
            role: "user",
            time: EXAMPLE_THREAD[2]!.time,
            text: EXAMPLE_THREAD[2]!.text,
          },
        ]);
      });
      q(400, () => setTypingBeforeBot(true));
      q(1750, () => {
        setTypingBeforeBot(false);
        setLines((prev) => [
          ...prev,
          {
            key: key(3),
            role: "assistant",
            time: EXAMPLE_THREAD[3]!.time,
            text: EXAMPLE_THREAD[3]!.text,
          },
        ]);
      });

      q(3000, () => setTranscriptFade(true));
      q(700, () => {
        setLines([]);
        setTypingBeforeBot(false);
        setTranscriptFade(false);
      });
      q(400, () => runCycle(cycle + 1));
    };

    runCycle(0);

    return () => {
      genRef.current += 1;
      clearTimers();
    };
  }, [active, clearTimers]);

  return (
    <div
      aria-label="Example chatbot conversation"
      className="flex flex-col overflow-hidden rounded-2xl border border-zinc-700/90 bg-zinc-950/85 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.65)] ring-1 ring-white/[0.06] backdrop-blur-md sm:rounded-[1.35rem]"
    >
      <header className="flex shrink-0 items-center justify-between gap-3 border-b border-zinc-800/90 px-4 py-3 sm:px-5">
        <h3 className="font-display text-[0.95rem] font-normal tracking-[-0.02em] text-zinc-50">
          {chatWidgetDefaults.title}
        </h3>
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
          Example
        </span>
      </header>

      <div
        ref={messagesContainerRef}
        className={`h-[380px] shrink-0 space-y-4 overflow-x-hidden overflow-y-auto overscroll-contain px-4 py-4 transition-opacity duration-500 ease-out motion-reduce:transition-none sm:h-96 sm:px-5 sm:py-5 ${
          transcriptFade ? "opacity-0" : "opacity-100"
        }`}
      >
        <AnimatePresence initial={false} mode="popLayout">
          {lines.map((row) =>
            row.role === "user" ? (
              <motion.div
                key={row.key}
                layout
                {...bubbleMotion}
                className="flex flex-col items-end gap-1"
              >
                <div className="flex items-end gap-2">
                  <span className="pb-1 text-[10px] tabular-nums text-zinc-500">
                    {row.time}
                  </span>
                  <div className="max-w-[92%] rounded-2xl rounded-br-md bg-teal-500/20 px-3.5 py-2.5 text-left text-[13px] leading-relaxed text-zinc-50 ring-1 ring-teal-400/25 sm:max-w-[85%] sm:text-[14px]">
                    {row.text}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={row.key}
                layout
                {...bubbleMotion}
                className="flex flex-col gap-1"
              >
                <div className="flex items-end gap-2">
                  <BotAvatar />
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="text-[10px] font-medium text-zinc-500">
                        Assistant
                      </span>
                      <span className="text-[10px] tabular-nums text-zinc-500">
                        {row.time}
                      </span>
                    </div>
                    <div className="max-w-[min(100%,28rem)] rounded-2xl rounded-bl-md bg-white/[0.06] px-3.5 py-2.5 text-[13px] leading-relaxed text-zinc-200 ring-1 ring-white/[0.08] sm:text-[14px]">
                      {row.text}
                    </div>
                  </div>
                </div>
              </motion.div>
            ),
          )}
        </AnimatePresence>

        <AnimatePresence>
          {typingBeforeBot ? (
            <motion.div
              key="typing-slot"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.28 }}
              className="flex flex-col gap-1"
            >
              <div className="flex items-end gap-2">
                <BotAvatar />
                <div
                  className="inline-flex max-w-[min(100%,28rem)] items-center rounded-2xl rounded-bl-md bg-white/[0.04] px-3 py-2 ring-1 ring-white/[0.06]"
                  aria-hidden="true"
                >
                  <div className="chat-typing" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function ChatbotShowcase() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [demoActive, setDemoActive] = useState(false);
  const pulseArmedRef = useRef(false);
  const wasInViewRef = useRef(false);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e) return;
        const inView = e.isIntersecting && e.intersectionRatio > 0.04;
        setDemoActive(inView);

        if (inView) wasInViewRef.current = true;
        if (
          pulseArmedRef.current === false &&
          wasInViewRef.current &&
          !inView &&
          e.boundingClientRect.top < -8
        ) {
          pulseArmedRef.current = true;
          triggerChatLauncherAttentionOnce();
        }
      },
      { threshold: [0, 0.04, 0.08, 0.12], rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className={slabBleed}>
      <SectionShell
        id="chat-showcase"
        labelledBy="chat-showcase-heading"
        pad="default"
        className={`${slabContent} border-y border-zinc-800/90`}
      >
        <div className={`${contentWell} flex flex-col gap-10 lg:gap-14`}>
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[11fr_9fr] lg:gap-12 xl:gap-16">
            <Reveal>
              <div className="max-w-xl lg:max-w-none">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-teal-300/85">
                  {brandChatbotShowcase.eyebrow}
                </p>
                <h2
                  id="chat-showcase-heading"
                  className="font-display mt-3 text-balance text-2xl font-normal tracking-[-0.025em] text-zinc-50 sm:text-[1.75rem] md:text-[2rem]"
                >
                  {brandChatbotShowcase.title}
                </h2>
                <p className="mt-4 max-w-prose text-[15px] leading-relaxed text-zinc-400 sm:text-[16px]">
                  {brandChatbotShowcase.description}
                </p>
                <ul className="mt-6 space-y-3 text-[14px] leading-relaxed text-zinc-300 sm:text-[15px]">
                  {brandChatbotShowcase.bullets.map((line) => (
                    <li key={line} className="flex gap-2.5">
                      <span
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal-400/80"
                        aria-hidden
                      />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-[12px] leading-relaxed text-zinc-500 sm:text-[13px]">
                  {brandChatbotShowcase.demoHint}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <div className="flex flex-col gap-5">
                <AnimatedExampleChat active={demoActive} />
                <p className="text-center text-[12px] italic leading-snug text-zinc-500 sm:text-[13px]">
                  {brandChatbotShowcase.demoExampleCaption}
                </p>

                <div className="rounded-2xl border border-teal-400/20 bg-teal-950/25 px-5 py-5 sm:px-6 sm:py-6">
                  <p className="font-display text-lg font-normal tracking-[-0.02em] text-zinc-50 sm:text-xl">
                    {brandChatbotShowcase.realChatHeadline}
                  </p>
                  <p className="mt-2 text-[14px] leading-relaxed text-zinc-400 sm:text-[15px]">
                    {brandChatbotShowcase.realChatSub}
                  </p>
                  <button
                    type="button"
                    onClick={openLiveChatWidget}
                    className={`mt-4 inline-flex min-h-11 items-center justify-center rounded-full bg-teal-400/95 px-5 text-[13px] font-semibold text-zinc-950 shadow-[0_12px_40px_-18px_rgba(45,212,191,0.35)] transition-[transform,box-shadow] duration-300 active:scale-[0.99] ${focusRing} [@media(hover:hover)]:hover:shadow-[0_16px_48px_-20px_rgba(45,212,191,0.45)]`}
                  >
                    {brandChatbotShowcase.realChatButton}
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </SectionShell>
    </div>
  );
}
