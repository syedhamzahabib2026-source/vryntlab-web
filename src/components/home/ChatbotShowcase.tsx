"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { chatWidgetDefaults } from "@/lib/config/brand";
import { brandChatbotShowcase } from "@/lib/brand-knowledge";
import { focusRing } from "@/components/layout/layoutTokens";
import { siteLogoSrc } from "@/lib/site";
import "@/components/chat/chat-widget.css";

// ─── Shared helpers ────────────────────────────────────────────────────────────

const ease = [0.22, 1, 0.36, 1] as const;

const childVariant = {
  hidden: { opacity: 0, y: 24, scale: 0.985 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.75, ease } },
};

const parentVariant = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
};

function openLiveChatWidget() {
  document
    .querySelector<HTMLButtonElement>(
      "[data-vryntlab-chatbot] button.chat-widget-launcher:not(.chat-widget-launcher--hidden)",
    )
    ?.click();
}

function triggerChatLauncherAttentionOnce(armed: React.MutableRefObject<boolean>) {
  if (armed.current) return;
  armed.current = true;
  const btn = document.querySelector<HTMLButtonElement>(
    "[data-vryntlab-chatbot] button.chat-widget-launcher:not(.chat-widget-launcher--hidden)",
  );
  if (!btn || btn.dataset.launcherAttnFired === "1") return;
  btn.dataset.launcherAttnFired = "1";
  btn.classList.add("chat-launcher-attn-pulse");
  window.setTimeout(() => btn.classList.remove("chat-launcher-attn-pulse"), 2600);
}

function BotAvatar() {
  return (
    <div
      className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-[#0F0F1A] sm:h-9 sm:w-9"
      aria-hidden
    >
      <Image
        src={siteLogoSrc}
        alt=""
        width={72}
        height={72}
        className="h-[1.3rem] w-auto object-contain sm:h-[1.45rem]"
      />
    </div>
  );
}

function ChatHeader() {
  return (
    <div className="flex shrink-0 items-center justify-between gap-3 border-b border-[#1E1E35] px-5 py-3.5">
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#7C3FFF] to-[#00E5FF]">
          <Image src={siteLogoSrc} alt="" width={40} height={40} className="h-5 w-auto object-contain" />
        </div>
        <div>
          <p className="text-[13px] font-medium text-[#F0F0FF]">{chatWidgetDefaults.title}</p>
          <p className="flex items-center gap-1 text-[11px] text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Online
          </p>
        </div>
      </div>
      <span className="rounded-full border border-[#1E1E35] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#8888a8]">
        Example
      </span>
    </div>
  );
}

// ─── Mobile: auto-playing chat demo ───────────────────────────────────────────

const EXAMPLE_THREAD = [
  { role: "user"      as const, time: "10:01 AM", text: "Hi, what services do you offer?" },
  { role: "assistant" as const, time: "10:01 AM", text: "Hey! VryntLab builds websites, AI chatbots, and automations for growing businesses. We can help with anything from a full site redesign to adding a booking system or automating your customer replies. What are you looking to improve?" },
  { role: "user"      as const, time: "10:02 AM", text: "How long does a chatbot take to set up?" },
  { role: "assistant" as const, time: "10:02 AM", text: "Usually 48 hours from when we have your business info. We handle the setup, training, and installation — you just review it before it goes live. Want me to send you a quick estimate?" },
];

type ChatLine = { key: string; role: "user" | "assistant"; time: string; text: string };

const bubbleMotion = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] as const },
};

function AnimatedExampleChat({ active }: { active: boolean }) {
  const [lines, setLines] = useState<ChatLine[]>([]);
  const [typingBeforeBot, setTypingBeforeBot] = useState(false);
  const [transcriptFade, setTranscriptFade] = useState(false);
  const genRef = useRef(0);
  const timeoutRefs = useRef<number[]>([]);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const clearTimers = useCallback(() => {
    for (const id of timeoutRefs.current) window.clearTimeout(id);
    timeoutRefs.current = [];
  }, []);

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
      const id = window.setTimeout(() => {
        setLines([]);
        setTypingBeforeBot(false);
        setTranscriptFade(false);
      }, 0);
      return () => window.clearTimeout(id);
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
        const id = window.setTimeout(() => { if (myGen !== genRef.current) return; fn(); }, t);
        timeoutRefs.current.push(id);
      };

      const k = (i: number) => `${cycle}-${i}`;

      q(500,  () => setLines([{ key: k(0), role: "user",      time: EXAMPLE_THREAD[0]!.time, text: EXAMPLE_THREAD[0]!.text }]));
      q(400,  () => setTypingBeforeBot(true));
      q(1750, () => { setTypingBeforeBot(false); setLines(p => [...p, { key: k(1), role: "assistant", time: EXAMPLE_THREAD[1]!.time, text: EXAMPLE_THREAD[1]!.text }]); });
      q(1000, () => setLines(p => [...p, { key: k(2), role: "user",      time: EXAMPLE_THREAD[2]!.time, text: EXAMPLE_THREAD[2]!.text }]));
      q(400,  () => setTypingBeforeBot(true));
      q(1750, () => { setTypingBeforeBot(false); setLines(p => [...p, { key: k(3), role: "assistant", time: EXAMPLE_THREAD[3]!.time, text: EXAMPLE_THREAD[3]!.text }]); });
      q(3000, () => setTranscriptFade(true));
      q(700,  () => { setLines([]); setTypingBeforeBot(false); setTranscriptFade(false); });
      q(400,  () => runCycle(cycle + 1));
    };

    runCycle(0);
    return () => { genRef.current += 1; clearTimers(); };
  }, [active, clearTimers]);

  return (
    <div aria-label="Example chatbot conversation" className="overflow-hidden rounded-2xl border border-[#1E1E35] bg-[var(--surface)]">
      <ChatHeader />
      <div
        ref={messagesContainerRef}
        className={`h-[340px] space-y-4 overflow-x-hidden overflow-y-auto overscroll-contain px-5 py-5 transition-opacity duration-500 ease-out motion-reduce:transition-none ${transcriptFade ? "opacity-0" : "opacity-100"}`}
      >
        <AnimatePresence initial={false} mode="popLayout">
          {lines.map((row) =>
            row.role === "user" ? (
              <motion.div key={row.key} layout {...bubbleMotion} className="flex flex-col items-end gap-1">
                <div className="flex items-end gap-2">
                  <span className="pb-1 text-[10px] tabular-nums text-[#8888a8]">{row.time}</span>
                  <div className="max-w-[88%] rounded-2xl rounded-br-md bg-[var(--accent-muted)] px-3.5 py-2.5 text-[13px] leading-relaxed text-[#F0F0FF] ring-1 ring-violet-400/20 sm:text-[14px]">
                    {row.text}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div key={row.key} layout {...bubbleMotion} className="flex flex-col gap-1">
                <div className="flex items-end gap-2">
                  <BotAvatar />
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="text-[10px] font-medium text-[#8888a8]">Assistant</span>
                      <span className="text-[10px] tabular-nums text-[#8888a8]">{row.time}</span>
                    </div>
                    <div className="max-w-[min(100%,28rem)] rounded-2xl rounded-bl-md bg-white/[0.04] px-3.5 py-2.5 text-[13px] leading-relaxed text-[#C8C8D8] ring-1 ring-white/[0.06] sm:text-[14px]">
                      {row.text}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          )}
        </AnimatePresence>
        <AnimatePresence>
          {typingBeforeBot && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.28 }}
              className="flex flex-col gap-1"
            >
              <div className="flex items-end gap-2">
                <BotAvatar />
                <div className="inline-flex items-center rounded-2xl rounded-bl-md bg-white/[0.04] px-3 py-2 ring-1 ring-white/[0.06]" aria-hidden>
                  <div className="chat-typing" aria-hidden><span /><span /><span /></div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="border-t border-[#1E1E35] px-5 py-3 text-center">
        <p className="text-[11px] text-[#8888a8]">{brandChatbotShowcase.demoHint}</p>
      </div>
    </div>
  );
}

// ─── Desktop: scroll-driven chat demo ─────────────────────────────────────────

function ScrollDrivenChat({
  scrollYProgress,
}: {
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  // Each message fades + slides in as the user scrolls to it
  const msg0Opacity = useTransform(scrollYProgress, [0.05, 0.16], [0, 1]);
  const msg0Y       = useTransform(scrollYProgress, [0.05, 0.16], [12, 0]);

  const msg1Opacity = useTransform(scrollYProgress, [0.23, 0.34], [0, 1]);
  const msg1Y       = useTransform(scrollYProgress, [0.23, 0.34], [12, 0]);

  const msg2Opacity = useTransform(scrollYProgress, [0.42, 0.53], [0, 1]);
  const msg2Y       = useTransform(scrollYProgress, [0.42, 0.53], [12, 0]);

  const msg3Opacity = useTransform(scrollYProgress, [0.60, 0.71], [0, 1]);
  const msg3Y       = useTransform(scrollYProgress, [0.60, 0.71], [12, 0]);

  return (
    <div aria-label="Example chatbot conversation" className="overflow-hidden rounded-2xl border border-[#1E1E35] bg-[var(--surface)]">
      <ChatHeader />

      <div className="space-y-4 px-5 py-5">
        {/* msg0: user */}
        <motion.div style={{ opacity: msg0Opacity, y: msg0Y }} className="flex flex-col items-end gap-1">
          <div className="flex items-end gap-2">
            <span className="pb-1 text-[10px] tabular-nums text-[#8888a8]">10:01 AM</span>
            <div className="max-w-[88%] rounded-2xl rounded-br-md bg-[var(--accent-muted)] px-3.5 py-2.5 text-[13px] leading-relaxed text-[#F0F0FF] ring-1 ring-violet-400/20">
              {EXAMPLE_THREAD[0]!.text}
            </div>
          </div>
        </motion.div>

        {/* msg1: assistant */}
        <motion.div style={{ opacity: msg1Opacity, y: msg1Y }} className="flex flex-col gap-1">
          <div className="flex items-end gap-2">
            <BotAvatar />
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center gap-2">
                <span className="text-[10px] font-medium text-[#8888a8]">Assistant</span>
                <span className="text-[10px] tabular-nums text-[#8888a8]">10:01 AM</span>
              </div>
              <div className="max-w-[min(100%,28rem)] rounded-2xl rounded-bl-md bg-white/[0.04] px-3.5 py-2.5 text-[13px] leading-relaxed text-[#C8C8D8] ring-1 ring-white/[0.06]">
                {EXAMPLE_THREAD[1]!.text}
              </div>
            </div>
          </div>
        </motion.div>

        {/* msg2: user */}
        <motion.div style={{ opacity: msg2Opacity, y: msg2Y }} className="flex flex-col items-end gap-1">
          <div className="flex items-end gap-2">
            <span className="pb-1 text-[10px] tabular-nums text-[#8888a8]">10:02 AM</span>
            <div className="max-w-[88%] rounded-2xl rounded-br-md bg-[var(--accent-muted)] px-3.5 py-2.5 text-[13px] leading-relaxed text-[#F0F0FF] ring-1 ring-violet-400/20">
              {EXAMPLE_THREAD[2]!.text}
            </div>
          </div>
        </motion.div>

        {/* msg3: assistant */}
        <motion.div style={{ opacity: msg3Opacity, y: msg3Y }} className="flex flex-col gap-1">
          <div className="flex items-end gap-2">
            <BotAvatar />
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center gap-2">
                <span className="text-[10px] font-medium text-[#8888a8]">Assistant</span>
                <span className="text-[10px] tabular-nums text-[#8888a8]">10:02 AM</span>
              </div>
              <div className="max-w-[min(100%,28rem)] rounded-2xl rounded-bl-md bg-white/[0.04] px-3.5 py-2.5 text-[13px] leading-relaxed text-[#C8C8D8] ring-1 ring-white/[0.06]">
                {EXAMPLE_THREAD[3]!.text}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="border-t border-[#1E1E35] px-5 py-3 text-center">
        <p className="text-[11px] text-[#8888a8]">Scroll to watch the conversation unfold</p>
      </div>
    </div>
  );
}

// ─── Exported section ─────────────────────────────────────────────────────────

export function ChatbotShowcase() {
  const pulseArmedRef = useRef(false);

  // ── Desktop: sticky scroll-driven ──────────────────────────────────────────
  const desktopRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: desktopRef,
    offset: ["start start", "end end"],
  });

  // Scroll-linked transforms for the left copy column
  const leftOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);
  const leftY       = useTransform(scrollYProgress, [0, 0.08], [20, 0]);

  // CTA button appears after the last chat message settles
  const ctaOpacity = useTransform(scrollYProgress, [0.72, 0.84], [0, 1]);
  const ctaY       = useTransform(scrollYProgress, [0.72, 0.84], [10, 0]);

  // Fire the attention pulse on the chat launcher when the section is mostly done
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v > 0.95) triggerChatLauncherAttentionOnce(pulseArmedRef);
  });

  // ── Mobile: IntersectionObserver-driven demo ────────────────────────────────
  const mobileRef = useRef<HTMLElement>(null);
  const [demoActive, setDemoActive] = useState(false);
  const wasInViewRef = useRef(false);

  useEffect(() => {
    const root = mobileRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e) return;
        const inView = e.isIntersecting && e.intersectionRatio > 0.04;
        setDemoActive(inView);
        if (inView) wasInViewRef.current = true;
        if (wasInViewRef.current && !inView && e.boundingClientRect.top < -8) {
          triggerChatLauncherAttentionOnce(pulseArmedRef);
        }
      },
      { threshold: [0, 0.04, 0.08, 0.12], rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  return (
    <div id="chat-showcase">

      {/* ── Mobile: auto-play demo (< lg) ── */}
      <section
        ref={mobileRef}
        className="block py-16 lg:hidden"
        style={{ background: "var(--surface)" }}
        aria-label="AI Chatbot showcase"
      >
        <div className="mx-auto w-full max-w-[1290px] px-4 sm:px-8 lg:px-[30px]">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={parentVariant}
          >
            <motion.div variants={childVariant} className="flex items-center gap-2.5">
              <span className="h-px w-4 shrink-0 bg-[#8888a8]" aria-hidden />
              <span className="text-[13px] font-normal text-[#8888a8]">AI Chatbot</span>
            </motion.div>

            <div className="mt-10 grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-20">
              <div className="flex flex-col gap-0">
                <motion.h2
                  variants={childVariant}
                  className="text-[2rem] font-medium leading-[1.15] tracking-[-0.03em] text-[#F0F0FF] sm:text-[2.5rem]"
                >
                  <span className="text-white/40">A</span> chatbot{" "}
                  <span className="text-white/40">that</span> answers for you, 24/7
                </motion.h2>
                <motion.p variants={childVariant} className="mt-6 text-[1.125rem] font-normal leading-[1.6] text-[#8888a8]">
                  {brandChatbotShowcase.description}
                </motion.p>
                <motion.ul variants={childVariant} className="mt-8 space-y-3" role="list">
                  {brandChatbotShowcase.bullets.map((line) => (
                    <li key={line} className="flex items-start gap-3 text-[1.125rem] font-normal leading-[1.5] text-[#8888a8]">
                      <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden />
                      {line}
                    </li>
                  ))}
                </motion.ul>
                <motion.div variants={childVariant} className="mt-10">
                  <button
                    type="button"
                    onClick={openLiveChatWidget}
                    className={`inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#7C3FFF] to-[#00E5FF] px-7 py-3.5 text-[16px] font-medium text-white shadow-[0_0_28px_-8px_rgba(124,63,255,0.5)] transition-[transform,box-shadow] duration-[180ms] active:scale-[0.98] ${focusRing} [@media(hover:hover)]:hover:scale-[1.02] [@media(hover:hover)]:hover:-translate-y-px [@media(hover:hover)]:hover:shadow-[0_0_40px_-4px_rgba(124,63,255,0.7)]`}
                  >
                    {brandChatbotShowcase.realChatButton}
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-[14px]" aria-hidden>→</span>
                  </button>
                </motion.div>
              </div>

              <motion.div variants={childVariant}>
                <AnimatedExampleChat active={demoActive} />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Desktop: pinned scroll-driven (≥ lg) ── */}
      <section
        ref={desktopRef}
        className="relative hidden lg:block"
        style={{ height: "250vh", background: "var(--surface)" }}
        aria-label="AI Chatbot showcase"
      >
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="mx-auto w-full max-w-[1290px] px-4 sm:px-8 lg:px-[30px]">
            <div className="grid grid-cols-2 items-start gap-20">

              {/* LEFT: heading + copy + CTA */}
              <motion.div style={{ opacity: leftOpacity, y: leftY }}>
                <div className="flex items-center gap-2.5">
                  <span className="h-px w-4 shrink-0 bg-[#8888a8]" aria-hidden />
                  <span className="text-[13px] font-normal text-[#8888a8]">AI Chatbot</span>
                </div>

                <h2
                  id="chat-showcase-heading"
                  className="mt-6 text-[2rem] font-medium leading-[1.15] tracking-[-0.03em] text-[#F0F0FF] lg:text-[2.75rem]"
                >
                  <span className="text-white/40">A</span> chatbot{" "}
                  <span className="text-white/40">that</span> answers for you, 24/7
                </h2>

                <p className="mt-6 text-[1.125rem] font-normal leading-[1.6] text-[#8888a8]">
                  {brandChatbotShowcase.description}
                </p>

                <ul className="mt-8 space-y-3" role="list">
                  {brandChatbotShowcase.bullets.map((line) => (
                    <li key={line} className="flex items-start gap-3 text-[1.125rem] font-normal leading-[1.5] text-[#8888a8]">
                      <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden />
                      {line}
                    </li>
                  ))}
                </ul>

                <motion.div style={{ opacity: ctaOpacity, y: ctaY }} className="mt-10">
                  <button
                    type="button"
                    onClick={openLiveChatWidget}
                    className={`inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#7C3FFF] to-[#00E5FF] px-7 py-3.5 text-[16px] font-medium text-white shadow-[0_0_28px_-8px_rgba(124,63,255,0.5)] transition-[transform,box-shadow] duration-[180ms] active:scale-[0.98] ${focusRing} [@media(hover:hover)]:hover:scale-[1.02] [@media(hover:hover)]:hover:-translate-y-px [@media(hover:hover)]:hover:shadow-[0_0_40px_-4px_rgba(124,63,255,0.7)]`}
                  >
                    {brandChatbotShowcase.realChatButton}
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-[14px]" aria-hidden>→</span>
                  </button>
                </motion.div>
              </motion.div>

              {/* RIGHT: scroll-driven chat messages */}
              <ScrollDrivenChat scrollYProgress={scrollYProgress} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
