"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useRef } from "react";
import { contentWell, focusRing } from "@/components/layout/layoutTokens";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { brandHero, brandIntentActionLabels } from "@/lib/brand-knowledge";
import { useConversion } from "@/components/conversion/ConversionContext";
import {
  ctaStartProject,
  ctaViewWork,
  siteBrandName,
} from "@/lib/site";
import { caseStudies } from "@/lib/case-studies";

const tapButton = `min-h-12 w-full justify-center rounded-full px-6 text-[13px] font-semibold tracking-tight transition-[transform,background-color,box-shadow,border-color] duration-300 ease-[var(--ease-out-premium)] motion-reduce:duration-150 active:scale-[0.98] ${focusRing} sm:w-auto sm:min-w-[160px] sm:px-8 md:min-w-[168px] md:px-9`;

const primaryCtaClass = `${tapButton} group/hero-cta inline-flex shrink-0 items-center bg-gradient-to-r from-[#7C3FFF] to-[#00E5FF] text-white shadow-[var(--shadow-md),0_0_30px_-8px_rgba(124,63,255,0.4)] [@media(hover:hover)]:hover:shadow-[var(--shadow-glow),0_0_40px_-6px_rgba(124,63,255,0.55)]`;

const secondaryCtaClass = `${tapButton} inline-flex shrink-0 items-center border border-[#1E1E35] bg-[#0F0F1A] text-[#C8C8D8] shadow-[var(--shadow-xs)] [@media(hover:hover)]:hover:border-violet-500/35 [@media(hover:hover)]:hover:shadow-[var(--shadow-sm)]`;

const pathLinkClass = `mt-3 inline-flex min-h-11 items-center gap-1.5 py-1 text-[13px] font-semibold text-[#00E5FF] underline decoration-[#00E5FF]/35 underline-offset-[5px] transition-[color,decoration-color,gap] duration-300 ease-[var(--ease-out-premium)] ${focusRing} rounded-md [@media(hover:hover)]:hover:gap-2 [@media(hover:hover)]:hover:decoration-[#00E5FF] sm:min-h-0 sm:py-0`;

function caseStudyProofLine(): string {
  const names = caseStudies.map((s) => s.client);
  if (names.length === 0) return "";
  if (names.length === 1) return `${names[0]} — live today.`;
  if (names.length === 2) return `${names[0]} and ${names[1]} — both live.`;
  const head = names.slice(0, -1).join(", ");
  const last = names[names.length - 1];
  return `${head}, and ${last} — all live today.`;
}

export function Hero() {
  const { selectedIntent } = useConversion();
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const contactLabel =
    selectedIntent != null
      ? brandIntentActionLabels[selectedIntent].contactPrimary
      : ctaStartProject;
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reduceMotion ? 0 : -14],
  );

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative overflow-x-visible overflow-y-visible pb-10 pt-1 sm:pb-14 sm:pt-2 md:pb-16 md:pt-3 lg:pb-20 lg:pt-4"
      aria-labelledby="hero-heading"
    >
      {/* Dot grid */}
      <div
        aria-hidden
        className="hero-dot-grid pointer-events-none absolute inset-0"
      />

      {/* Violet glow — bottom-left */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -left-16 h-[32rem] w-[32rem] rounded-full blur-[120px]"
        style={{ background: "rgba(124,63,255,0.12)" }}
      />

      {/* Cyan glow — top-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-[22rem] w-[22rem] rounded-full blur-[100px]"
        style={{ background: "rgba(0,229,255,0.06)" }}
      />

      {reduceMotion ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-[-10%] flex justify-center opacity-[0.45]"
        >
          <div className="h-[min(16rem,52vw)] w-[min(32rem,90vw)] rounded-full bg-[var(--accent-muted)] blur-3xl sm:h-[min(20rem,58vw)] sm:w-[min(36rem,86vw)]" />
        </div>
      ) : (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-[-10%] flex justify-center opacity-[0.45]"
          style={{ y: parallaxY }}
        >
          <div className="h-[min(16rem,52vw)] w-[min(32rem,90vw)] rounded-full bg-[var(--accent-muted)] blur-3xl sm:h-[min(20rem,58vw)] sm:w-[min(36rem,86vw)]" />
        </motion.div>
      )}

      <div
        className={`relative flex w-full min-w-0 flex-col gap-7 sm:gap-9 md:gap-10 ${contentWell}`}
      >
        <StaggerGroup
          mode="immediate"
          className="flex min-w-0 max-w-3xl flex-col items-stretch overflow-x-visible text-left lg:max-w-[42rem]"
        >
          <StaggerItem>
            <header className="min-w-0 max-w-none">
              <div className="flex min-w-0 flex-col gap-2 sm:gap-2.5">
                <p className="min-w-0 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)] opacity-90 sm:tracking-[0.26em] dark:opacity-95">
                  {siteBrandName}
                </p>
                <span
                  className="h-px w-10 bg-[var(--accent)]/45 sm:w-12 dark:bg-[var(--accent)]/50"
                  aria-hidden
                />
              </div>
              <h1
                id="hero-heading"
                className="font-display mt-4 max-w-[min(100%,40rem)] text-balance text-[1.8125rem] font-normal leading-[1.1] tracking-[-0.024em] text-[#F0F0FF] sm:mt-5 sm:text-[2.125rem] sm:leading-[1.08] md:mt-6 md:text-[2.625rem] md:leading-[1.06] lg:text-[2.95rem] lg:tracking-[-0.028em] xl:text-[3.15rem]"
              >
                {brandHero.headline}
              </h1>
            </header>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-4 max-w-[40rem] text-pretty text-[0.9375rem] leading-[1.62] text-[#C8C8D8]/85 sm:mt-5 sm:text-[1.0625rem] sm:leading-[1.64] md:mt-6 md:max-w-[44ch] md:text-[1.0625rem] md:leading-[1.66]">
              {brandHero.subheadline}
            </p>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-3 max-w-[40rem] border-l-2 border-violet-500/40 py-0.5 pl-3.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#8888a8] sm:mt-4 sm:pl-4 sm:text-[11px] sm:tracking-[0.14em]">
              {brandHero.proofLabel}
            </p>
            <p className="mt-1.5 max-w-[40rem] pl-3.5 text-[13px] font-medium leading-relaxed text-[#C8C8D8] sm:pl-4 sm:text-[14px]">
              {caseStudyProofLine()}
            </p>
          </StaggerItem>
          <StaggerItem>
            <div className="mt-6 sm:mt-7 lg:mt-8">
              <nav
                aria-label="Primary actions"
                className="flex w-full max-w-md flex-col gap-3 sm:max-w-lg sm:flex-row sm:flex-wrap sm:items-center sm:gap-3"
              >
                <Link href="/#contact" className={primaryCtaClass}>
                  <span className="flex items-center justify-center gap-2">
                    {contactLabel}
                    <span
                      aria-hidden
                      className="text-[1.05em] opacity-80 transition-transform duration-300 ease-[var(--ease-out-premium)] [@media(hover:hover)]:group-hover/hero-cta:translate-x-0.5"
                    >
                      →
                    </span>
                  </span>
                </Link>
                <Link href="/#work" className={secondaryCtaClass}>
                  {ctaViewWork}
                </Link>
              </nav>
              <p className="mt-3 max-w-md text-pretty text-[12px] leading-relaxed text-[#8888a8] sm:max-w-lg">
                {brandHero.ctaSub}
              </p>
              <Link href="/services#path" className={pathLinkClass}>
                {brandHero.pathLink}
                <span aria-hidden>→</span>
              </Link>
            </div>
          </StaggerItem>
        </StaggerGroup>
      </div>
    </section>
  );
}
