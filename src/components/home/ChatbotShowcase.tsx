"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { chatWidgetDefaults } from "@/lib/config/brand";
import { brandChatbotShowcase } from "@/lib/brand-knowledge";
import {
  contentWell,
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

function InlineChatDemo() {
  return (
    <div
      aria-label="Example chatbot conversation"
      className="flex max-h-[min(560px,68vh)] flex-col overflow-hidden rounded-2xl border border-zinc-700/90 bg-zinc-950/85 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.65)] ring-1 ring-white/[0.06] backdrop-blur-md sm:rounded-[1.35rem]"
    >
      <header className="flex shrink-0 items-center justify-between gap-3 border-b border-zinc-800/90 px-4 py-3 sm:px-5">
        <h3 className="font-display text-[0.95rem] font-normal tracking-[-0.02em] text-zinc-50">
          {chatWidgetDefaults.title}
        </h3>
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
          Example
        </span>
      </header>

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-4 sm:px-5 sm:py-5">
        {EXAMPLE_THREAD.map((row, i) => {
          if (row.role === "user") {
            return (
              <div key={i} className="flex flex-col items-end gap-1">
                <div className="flex items-end gap-2">
                  <span className="pb-1 text-[10px] tabular-nums text-zinc-500">
                    {row.time}
                  </span>
                  <div className="max-w-[92%] rounded-2xl rounded-br-md bg-teal-500/20 px-3.5 py-2.5 text-left text-[13px] leading-relaxed text-zinc-50 ring-1 ring-teal-400/25 sm:max-w-[85%] sm:text-[14px]">
                    {row.text}
                  </div>
                </div>
              </div>
            );
          }

          const lastBot =
            row.role === "assistant" && i === EXAMPLE_THREAD.length - 1;
          return (
            <div key={i} className="flex flex-col gap-1">
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
                  {lastBot ? (
                    <div
                      className="mt-2 inline-flex items-center gap-1 rounded-xl bg-white/[0.04] px-2.5 py-1.5 ring-1 ring-white/[0.06]"
                      aria-hidden="true"
                    >
                      <div className="chat-typing" aria-hidden="true">
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ChatbotShowcase() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    let wasInView = false;
    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e) return;
        const inView = e.isIntersecting && e.intersectionRatio > 0.02;
        if (inView) wasInView = true;
        if (
          wasInView &&
          !e.isIntersecting &&
          e.boundingClientRect.top < -8
        ) {
          triggerChatLauncherAttentionOnce();
          io.disconnect();
        }
      },
      { threshold: [0, 0.02, 0.08, 0.15], rootMargin: "0px 0px -12% 0px" },
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
              <div className="flex flex-col gap-4">
                <InlineChatDemo />
                <p className="flex flex-wrap items-center justify-end gap-x-2 gap-y-1 text-right text-[12px] leading-snug text-zinc-500 sm:text-[13px]">
                  <span>{brandChatbotShowcase.demoLiveCallout}</span>
                  <span
                    className="inline-block translate-y-px font-mono text-teal-400/90"
                    aria-hidden
                  >
                    ↘
                  </span>
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </SectionShell>
    </div>
  );
}
