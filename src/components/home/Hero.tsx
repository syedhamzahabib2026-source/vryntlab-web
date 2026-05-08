"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { contentWell, focusRing } from "@/components/layout/layoutTokens";
import { useConversion } from "@/components/conversion/ConversionContext";
import { brandIntentActionLabels } from "@/lib/brand-knowledge";
import { ctaViewWork, siteBrandName } from "@/lib/site";

const CYCLING_WORDS = ["websites", "chatbots", "automations", "systems"];
const CYCLE_INTERVAL = 2500;

const MARQUEE_ITEMS = [
  "Chicago-Based",
  "Fast Turnaround",
  "Fair Pricing",
  "Living Silica",
  "DK Express",
  "No Agency Bloat",
];

function WordCycler() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % CYCLING_WORDS.length);
        setIsAnimating(false);
      }, 400);
    }, CYCLE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="relative inline-block min-w-[180px] sm:min-w-[220px]">
      <span
        className={`inline-block bg-gradient-to-r from-[#7C3FFF] to-[#00E5FF] bg-clip-text text-transparent transition-all duration-400 ${
          isAnimating ? "word-cycle-exit" : "word-cycle-enter"
        }`}
      >
        {CYCLING_WORDS[currentIndex]}
      </span>
    </span>
  );
}

function MarqueeTicker() {
  return (
    <div className="relative mt-10 w-full overflow-hidden border-y border-[#1E1E35]/50 bg-[#0F0F1A]/30 py-4 sm:mt-12 md:mt-14">
      <div className="animate-marquee flex whitespace-nowrap">
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, index) => (
          <span
            key={index}
            className="mx-6 text-[13px] font-medium tracking-wide text-[#8888a0] sm:mx-8 sm:text-[14px]"
          >
            {item}
            <span className="ml-6 text-[#7C3FFF]/50 sm:ml-8">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  const { selectedIntent } = useConversion();
  const contactLabel =
    selectedIntent != null
      ? brandIntentActionLabels[selectedIntent].contactPrimary
      : "Start a Project";

  return (
    <section
      id="top"
      className="relative flex min-h-[calc(100vh-5rem)] flex-col overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Background grid and glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(124, 63, 255, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(124, 63, 255, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
          }}
        />
        {/* Violet glow from bottom center */}
        <div className="absolute bottom-0 left-1/2 h-[60%] w-[80%] -translate-x-1/2 rounded-full bg-[#7C3FFF]/10 blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 h-[40%] w-[60%] -translate-x-1/2 rounded-full bg-[#00E5FF]/5 blur-[100px]" />
      </div>

      {/* Main content */}
      <div className={`relative flex flex-1 flex-col justify-center ${contentWell} py-16 sm:py-20 md:py-24 lg:py-28`}>
        <div className="flex max-w-4xl flex-col items-start">
          {/* Eyebrow */}
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#7C3FFF]">
            {siteBrandName}
          </p>
          <div className="mt-3 h-px w-12 bg-gradient-to-r from-[#7C3FFF] to-[#00E5FF]" />

          {/* Headline with word cycling */}
          <h1
            id="hero-heading"
            className="mt-6 text-[2rem] font-medium leading-[1.1] tracking-[-0.02em] text-[#F0F0FF] sm:mt-8 sm:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem]"
          >
            We build{" "}
            <WordCycler />
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            for businesses that can&apos;t afford to underperform online.
          </h1>

          {/* Subheadline */}
          <p className="mt-6 max-w-2xl text-[1rem] leading-[1.7] text-[#C8C8D8] sm:mt-8 sm:text-[1.125rem]">
            We fix what&apos;s broken, build what&apos;s missing, and ship it — with a
            clear scope and price before work starts.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex w-full flex-col gap-4 sm:mt-10 sm:w-auto sm:flex-row sm:gap-4">
            {/* Primary CTA - Gradient filled */}
            <Link
              href="/#contact"
              className={`group inline-flex min-h-12 items-center justify-center rounded-lg bg-gradient-to-r from-[#7C3FFF] to-[#00E5FF] px-8 text-[14px] font-semibold text-white shadow-lg transition-all duration-300 ${focusRing} hover:shadow-[0_0_30px_-5px_rgba(124,63,255,0.5)] sm:min-w-[180px]`}
            >
              {contactLabel}
              <span
                aria-hidden
                className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </Link>

            {/* Secondary CTA - Ghost outline */}
            <Link
              href="/#work"
              className={`inline-flex min-h-12 items-center justify-center rounded-lg border border-[#1E1E35] bg-transparent px-8 text-[14px] font-semibold text-[#C8C8D8] transition-all duration-300 ${focusRing} hover:border-[#7C3FFF]/50 hover:text-[#F0F0FF] sm:min-w-[160px]`}
            >
              {ctaViewWork}
            </Link>
          </div>

          {/* CTA Sub text */}
          <p className="mt-4 max-w-md text-[13px] leading-relaxed text-[#8888a0]">
            Tell us what&apos;s broken or what you want built — we&apos;ll reply with a
            clear scope and price. No decks, no back-and-forth.
          </p>
        </div>
      </div>

      {/* Marquee ticker */}
      <MarqueeTicker />
    </section>
  );
}
