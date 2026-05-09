"use client";

import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useConversion } from "@/components/conversion/ConversionContext";
import { brandIntentActionLabels } from "@/lib/brand-knowledge";
import { ctaStartProject, ctaViewWork } from "@/lib/site";
import { contentWell, focusRing } from "@/components/layout/layoutTokens";

const ease = [0.16, 1, 0.3, 1] as const;

const CYCLING_WORDS = ["Websites", "Chatbots", "Automations", "Booking Systems", "Mobile Apps", "AI Tools"] as const;

const primaryBtnClass =
  `inline-flex min-h-12 items-center gap-2 rounded-full bg-gradient-to-r from-[#7C3FFF] to-[#00E5FF] px-8 text-[14px] font-semibold tracking-tight text-white shadow-[0_0_32px_-8px_rgba(124,63,255,0.5)] transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-premium)] active:scale-[0.98] ${focusRing} [@media(hover:hover)]:hover:-translate-y-px [@media(hover:hover)]:hover:shadow-[0_0_44px_-6px_rgba(124,63,255,0.65)]`;

const secondaryBtnClass =
  `inline-flex min-h-12 items-center gap-2 rounded-full border border-[#1E1E35] bg-[#0F0F1A] px-8 text-[14px] font-semibold tracking-tight text-[#C8C8D8] transition-[border-color,transform] duration-300 ease-[var(--ease-out-premium)] active:scale-[0.98] ${focusRing} [@media(hover:hover)]:hover:-translate-y-px [@media(hover:hover)]:hover:border-violet-500/40`;

function LiveDot() {
  return (
    <span className="relative flex h-2 w-2" aria-hidden>
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
    </span>
  );
}

function DashboardCard({ reduceMotion }: { reduceMotion: boolean }) {
  const [responseTime, setResponseTime] = useState(42);
  const [deployPct, setDeployPct] = useState(73);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => {
      setResponseTime(38 + Math.floor(Math.random() * 18));
      setDeployPct((v) => {
        const next = v + Math.floor(Math.random() * 4);
        return next > 98 ? 72 : next;
      });
    }, 2200);
    return () => clearInterval(id);
  }, [reduceMotion]);

  const card = (
    <div
      className="relative w-full max-w-[460px] overflow-hidden rounded-2xl border border-[#1E1E35] bg-[#09090f] shadow-[0_0_0_1px_rgba(124,63,255,0.09),0_32px_80px_-20px_rgba(0,0,0,0.75),0_0_60px_-20px_rgba(124,63,255,0.12)]"
      aria-hidden="true"
    >
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-[#1E1E35] bg-[#0A0A14] px-4 py-2.5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]/80" />
          </div>
          <span className="font-mono text-[11px] text-[#8888a8]">vryntlab.ops</span>
        </div>
        <div className="flex items-center gap-1.5">
          <LiveDot />
          <span className="font-mono text-[10px] text-emerald-400/80">live</span>
        </div>
      </div>

      {/* Metric rows */}
      <div className="divide-y divide-[#1E1E35]/50 px-4">
        <div className="flex items-center justify-between py-2.5">
          <span className="font-mono text-[11px] text-[#8888a8]">projects.deploying</span>
          <div className="flex items-center gap-2.5">
            <div className="h-1.5 w-16 overflow-hidden rounded-full bg-[#1E1E35]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#7C3FFF] to-[#00E5FF] transition-[width] duration-1000 ease-in-out"
                style={{ width: `${deployPct}%` }}
              />
            </div>
            <span className="font-mono text-[12px] font-semibold text-[#F0F0FF]">3</span>
          </div>
        </div>

        <div className="flex items-center justify-between py-2.5">
          <span className="font-mono text-[11px] text-[#8888a8]">uptime</span>
          <span className="font-mono text-[12px] text-emerald-400">99.98% · 847d</span>
        </div>

        <div className="flex items-center justify-between py-2.5">
          <span className="font-mono text-[11px] text-[#8888a8]">avg.response</span>
          <span
            className={`font-mono text-[12px] transition-colors duration-700 ${
              responseTime < 50 ? "text-emerald-400" : "text-yellow-400"
            }`}
          >
            {responseTime}ms
          </span>
        </div>

        <div className="flex items-center justify-between py-2.5">
          <span className="font-mono text-[11px] text-[#8888a8]">latest.build</span>
          <span className="font-mono text-[12px] text-[#7C3FFF]">✓ passing</span>
        </div>
      </div>

      {/* Code block */}
      <div className="mx-4 my-3 overflow-hidden rounded-lg border border-[#1E1E35] bg-[#05050c] px-4 py-3">
        <p className="font-mono text-[11px] text-[#8888a8]">
          $ <span className="text-[#00E5FF]">ship</span>{" "}
          <span className="text-violet-400">--env</span> prod
        </p>
        <p className="mt-0.5 font-mono text-[11px] text-emerald-400">
          → deployed in 1.2s ✓
        </p>
        <p className="mt-0.5 font-mono text-[11px] text-[#8888a8]">
          ${" "}
          <span
            className="inline-block w-2 bg-[#8888a8]"
            style={{
              animation: reduceMotion ? "none" : "pulse 1.2s step-start infinite",
            }}
          >
            &nbsp;
          </span>
        </p>
      </div>

      {/* Site status rows */}
      <div className="border-t border-[#1E1E35] px-4 py-3 space-y-2">
        {[
          { url: "living-silica.com", status: "live", color: "text-emerald-400" },
          { url: "dkexpresslogistics.co.uk", status: "live", color: "text-emerald-400" },
          { url: "client-03.preview", status: "staging", color: "text-[#7C3FFF]" },
        ].map(({ url, status, color }) => (
          <div key={url} className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-[#8888a8]">{url}</span>
            <span className={`flex items-center gap-1 font-mono text-[10px] ${color}`}>
              <span>●</span> {status}
            </span>
          </div>
        ))}
      </div>

      {/* Scanline overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
        }}
      />
    </div>
  );

  if (reduceMotion) {
    return <div className="flex justify-center lg:justify-end">{card}</div>;
  }

  return (
    <motion.div
      className="flex justify-center lg:justify-end"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
    >
      {card}
    </motion.div>
  );
}

export function Hero() {
  const { selectedIntent } = useConversion();
  const reduceMotion = useReducedMotion() ?? false;
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => {
      setWordIndex((i) => (i + 1) % CYCLING_WORDS.length);
    }, 2200);
    return () => clearInterval(id);
  }, [reduceMotion]);

  const ctaLabel =
    selectedIntent != null
      ? brandIntentActionLabels[selectedIntent].contactPrimary
      : ctaStartProject;

  return (
    <section
      id="top"
      className="relative flex flex-col justify-center pb-6 pt-8 sm:min-h-[calc(100vh-5rem)] sm:pb-10 sm:pt-12 lg:min-h-[calc(100vh-5.5rem)] lg:pb-14 lg:pt-16"
      aria-labelledby="hero-heading"
    >
      {/* Dot grid background */}
      <div aria-hidden className="hero-dot-grid pointer-events-none absolute inset-0" />

      {/* Ambient violet glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-0 h-[44rem] w-[44rem] rounded-full blur-[160px]"
        style={{ background: "rgba(124,63,255,0.08)" }}
      />
      {/* Ambient cyan glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-[28rem] w-[28rem] rounded-full blur-[130px]"
        style={{ background: "rgba(0,229,255,0.055)" }}
      />

      <div className={`relative ${contentWell}`}>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[55fr_45fr] lg:gap-14 xl:gap-20">

          {/* LEFT: Text content */}
          <div className="flex flex-col items-start">
            <motion.p
              initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease }}
              className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#7C3FFF]"
            >
              <span className="h-px w-8 bg-[#7C3FFF]" aria-hidden />
              Chicago · Web, AI & Automation Studio
            </motion.p>

            <motion.h1
              id="hero-heading"
              initial={reduceMotion ? undefined : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease }}
              className="mt-5 text-[2.625rem] font-black leading-[1.04] tracking-[-0.032em] text-[#F0F0FF] sm:text-[3.5rem] md:text-[4.125rem] lg:text-[4.5rem] xl:text-[5.25rem]"
            >
              We build
              <br />
              <AnimatePresence mode="wait">
                <motion.span
                  key={CYCLING_WORDS[wordIndex]}
                  initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease }}
                  className="inline-block bg-gradient-to-r from-[#7C3FFF] to-[#00E5FF] bg-clip-text text-transparent"
                >
                  {CYCLING_WORDS[wordIndex]}
                </motion.span>
              </AnimatePresence>
              <br />
              that actually ship.
            </motion.h1>

            <motion.p
              initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18, ease }}
              className="mt-6 max-w-[44ch] text-[1rem] leading-[1.66] text-[#C8C8D8]/80 sm:text-[1.0625rem]"
            >
              We fix what&apos;s broken, build what&apos;s missing, and ship it — with
              a clear scope and price before work starts.
            </motion.p>

            <motion.div
              initial={reduceMotion ? undefined : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28, ease }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Link href="/#contact" className={primaryBtnClass}>
                {ctaLabel}
                <span aria-hidden className="text-[0.95em] opacity-90">
                  →
                </span>
              </Link>
              <Link href="/#work" className={secondaryBtnClass}>
                {ctaViewWork}
              </Link>
            </motion.div>

            <motion.p
              initial={reduceMotion ? undefined : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="mt-5 text-[12px] text-[#8888a8]"
            >
              Living Silica · DK Express Logistics — both live today.
            </motion.p>
          </div>

          {/* RIGHT: Dashboard card — visible on all sizes, below text on mobile */}
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.22, ease }}
            className="block mt-6 sm:mt-8 lg:mt-0"
          >
            <DashboardCard reduceMotion={reduceMotion} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
