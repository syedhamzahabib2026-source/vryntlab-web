"use client";

import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useConversion } from "@/components/conversion/ConversionContext";
import { brandIntentActionLabels } from "@/lib/brand-knowledge";
import { ctaStartProject, ctaViewWork } from "@/lib/site";
import { contentWell, focusRing } from "@/components/layout/layoutTokens";

const ease = [0.16, 1, 0.3, 1] as const;

const CYCLING_WORDS = [
  "Shopify Store",
  "Website",
  "Chatbot",
  "Booking System",
] as const;

/** Larger padding + always-on glow so it reads instantly as the primary action */
const primaryBtnClass =
  `inline-flex min-h-12 items-center gap-2 rounded-full bg-gradient-to-r from-[#7C3FFF] to-[#00E5FF] px-10 text-[14px] font-semibold tracking-tight text-white shadow-[0_0_0_1px_rgba(124,63,255,0.22),0_0_32px_-8px_rgba(124,63,255,0.55)] transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-premium)] active:scale-[0.98] ${focusRing} [@media(hover:hover)]:hover:-translate-y-px [@media(hover:hover)]:hover:shadow-[0_0_0_1px_rgba(124,63,255,0.4),0_0_44px_-6px_rgba(124,63,255,0.75)]`;

/** More visible border so the secondary CTA reads against the dark bg */
const secondaryBtnClass =
  `inline-flex min-h-12 items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/[0.05] px-8 text-[14px] font-semibold tracking-tight text-[#C8C8D8] transition-[border-color,background-color,transform] duration-300 ease-[var(--ease-out-premium)] active:scale-[0.98] ${focusRing} [@media(hover:hover)]:hover:-translate-y-px [@media(hover:hover)]:hover:border-violet-400/55 [@media(hover:hover)]:hover:bg-violet-500/[0.1]`;

function StorePreview({ reduceMotion }: { reduceMotion: boolean }) {
  const card = (
    <div className="relative w-full overflow-hidden rounded-2xl border border-[#1E1E35] bg-[#0A0A14] shadow-[0_0_0_1px_rgba(124,63,255,0.09),0_32px_80px_-20px_rgba(0,0,0,0.75),0_0_60px_-20px_rgba(124,63,255,0.14)]">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-[#1E1E35] bg-[#0A0A14] px-3 py-2.5">
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]/80" />
        </div>
        <div className="flex flex-1 items-center gap-1.5 rounded-md bg-[#1E1E35]/60 px-2.5 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-violet-400/50" aria-hidden />
          <span className="text-[10px] text-[#8888a8]/70">your-store.com</span>
        </div>
      </div>
      {/* Screenshot — Living Silica Shopify build */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "16 / 10" }}>
        <Image
          src="/projects/living-silica/living-silica_1.webp"
          alt="Shopify store built by VryntLab"
          fill
          className="object-cover object-top"
          sizes="(max-width: 1024px) 100vw, 480px"
          priority
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#080810]/65 to-transparent" />
      </div>
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

            <motion.h1
              id="hero-heading"
              initial={reduceMotion ? undefined : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease }}
              className="mt-5 text-[2.625rem] font-black leading-[1.04] tracking-[-0.032em] text-[#F0F0FF] sm:text-[3.5rem] md:text-[4.125rem] lg:text-[4.5rem] xl:text-[5.25rem]"
            >
              Your{" "}
              <AnimatePresence mode="wait">
                <motion.span
                  key={CYCLING_WORDS[wordIndex]}
                  initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease }}
                  className="inline-block"
                >
                  {CYCLING_WORDS[wordIndex]}
                </motion.span>
              </AnimatePresence>
              ,
              <br />
              <span className="bg-gradient-to-r from-[#7C3FFF] to-[#00E5FF] bg-clip-text text-transparent">
                built to sell.
              </span>
            </motion.h1>

            <motion.p
              initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18, ease }}
              className="mt-6 max-w-[44ch] text-[1rem] leading-[1.66] text-[#C8C8D8]/80 sm:text-[1.0625rem]"
            >
              Shopify stores, websites, and the automations behind them.
              A clear plan and price before we start.
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
          </div>

          {/* RIGHT: Store preview mockup */}
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.22, ease }}
            className="mt-6 sm:mt-8 lg:mt-0"
          >
            <StorePreview reduceMotion={reduceMotion} />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
