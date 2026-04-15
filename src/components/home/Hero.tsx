"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
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
import { HeroProductMock } from "./HeroProductMock";

const tapButton = `min-h-12 w-full justify-center rounded-full px-6 text-[13px] font-semibold tracking-tight transition-[transform,background-color,box-shadow,border-color] duration-300 ease-[var(--ease-out-premium)] motion-reduce:duration-150 active:scale-[0.98] ${focusRing} sm:w-auto sm:min-w-[160px] sm:px-8 md:min-w-[168px] md:px-9`;

const primaryCtaClass = `${tapButton} group/hero-cta inline-flex shrink-0 items-center bg-[var(--surface-ink)] text-white shadow-[var(--shadow-md)] [@media(hover:hover)]:hover:shadow-[var(--shadow-glow)] dark:bg-white dark:text-zinc-950 dark:[@media(hover:hover)]:hover:bg-zinc-200`;

const secondaryCtaClass = `${tapButton} inline-flex shrink-0 items-center border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] shadow-[var(--shadow-xs)] [@media(hover:hover)]:hover:border-[var(--accent)]/35 [@media(hover:hover)]:hover:shadow-[var(--shadow-sm)] dark:border-zinc-700 dark:bg-[var(--surface)] dark:text-zinc-200 dark:[@media(hover:hover)]:hover:border-[var(--accent)]/30`;

const pathLinkClass = `mt-3 inline-flex min-h-11 items-center gap-1.5 py-1 text-[13px] font-semibold text-[var(--accent)] underline decoration-[color-mix(in_oklab,var(--accent)_35%,transparent)] underline-offset-[5px] transition-[color,decoration-color,gap] duration-300 ease-[var(--ease-out-premium)] ${focusRing} rounded-md [@media(hover:hover)]:hover:gap-2 [@media(hover:hover)]:hover:decoration-[var(--accent)] sm:min-h-0 sm:py-0`;

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

  const mediaScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, reduceMotion ? 1 : 0.985],
  );

  const mediaY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reduceMotion ? 0 : 8],
  );

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative overflow-x-visible overflow-y-visible pb-9 pt-1 sm:pb-12 sm:pt-2 md:pb-14 md:pt-3 lg:pb-16 lg:pt-4"
      aria-labelledby="hero-heading"
    >
      {reduceMotion ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-[-10%] flex justify-center opacity-[0.55] max-lg:opacity-40 dark:opacity-40 dark:max-lg:opacity-30"
        >
          <div className="h-[min(16rem,52vw)] w-[min(32rem,90vw)] rounded-full bg-[var(--accent-muted)] blur-3xl sm:h-[min(20rem,58vw)] sm:w-[min(36rem,86vw)]" />
        </div>
      ) : (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-[-10%] flex justify-center opacity-[0.55] max-lg:opacity-40 dark:opacity-40 dark:max-lg:opacity-30"
          style={{ y: parallaxY }}
        >
          <div className="h-[min(16rem,52vw)] w-[min(32rem,90vw)] rounded-full bg-[var(--accent-muted)] blur-3xl sm:h-[min(20rem,58vw)] sm:w-[min(36rem,86vw)]" />
        </motion.div>
      )}

      <div
        className={`relative grid w-full min-w-0 gap-7 sm:gap-9 md:gap-10 lg:grid-cols-12 lg:items-center lg:gap-x-16 lg:gap-y-10 xl:gap-x-20 ${contentWell}`}
      >
        <StaggerGroup
          mode="immediate"
          className="flex min-w-0 flex-col items-stretch overflow-x-visible text-left lg:col-span-5 lg:col-start-1 lg:row-start-1"
        >
          <StaggerItem>
            <header className="min-w-0 max-w-none lg:max-w-[min(100%,36rem)]">
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
                className="font-display mt-4 max-w-[min(100%,36rem)] text-balance text-[1.8125rem] font-normal leading-[1.1] tracking-[-0.024em] text-zinc-950 sm:mt-5 sm:text-[2.125rem] sm:leading-[1.08] md:mt-6 md:text-[2.625rem] md:leading-[1.06] lg:text-[2.95rem] lg:tracking-[-0.028em] xl:text-[3.15rem] dark:text-zinc-50"
              >
                {brandHero.headline}
              </h1>
            </header>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-4 max-w-[36rem] text-pretty text-[0.9375rem] leading-[1.62] text-zinc-600 sm:mt-5 sm:text-[1.0625rem] sm:leading-[1.64] md:mt-6 md:max-w-[44ch] md:text-[1.0625rem] md:leading-[1.66] dark:text-zinc-400">
              {brandHero.supportingServices}
            </p>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-3 max-w-[36rem] border-l-2 border-[var(--accent)]/40 py-0.5 pl-3.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-zinc-500 sm:mt-4 sm:pl-4 sm:text-[11px] sm:tracking-[0.14em] dark:border-teal-400/35 dark:text-zinc-400">
              {brandHero.proofLabel}
            </p>
            <p className="mt-1.5 max-w-[36rem] pl-3.5 text-[13px] font-medium leading-relaxed text-zinc-700 sm:pl-4 sm:text-[14px] dark:text-zinc-300">
              {caseStudyProofLine()}
            </p>
          </StaggerItem>
          <StaggerItem>
            <div className="mt-6 sm:mt-7 lg:mt-8">
              <nav
                aria-label="Primary actions"
                className="flex w-full max-w-md flex-col gap-3 sm:max-w-lg sm:flex-row sm:flex-wrap sm:items-center sm:gap-3"
              >
                <a href="#contact" className={primaryCtaClass}>
                  <span className="flex items-center justify-center gap-2">
                    {contactLabel}
                    <span
                      aria-hidden
                      className="text-[1.05em] opacity-80 transition-transform duration-300 ease-[var(--ease-out-premium)] [@media(hover:hover)]:group-hover/hero-cta:translate-x-0.5"
                    >
                      →
                    </span>
                  </span>
                </a>
                <a href="#work" className={secondaryCtaClass}>
                  {ctaViewWork}
                </a>
              </nav>
              <p className="mt-3 max-w-md text-pretty text-[12px] leading-relaxed text-zinc-500 sm:max-w-lg dark:text-zinc-500">
                {brandHero.ctaSub}
              </p>
              <a href="#path" className={pathLinkClass}>
                {brandHero.pathLink}
                <span aria-hidden>→</span>
              </a>
            </div>
          </StaggerItem>
        </StaggerGroup>

        <StaggerGroup
          mode="immediate"
          className="w-full min-w-0 overflow-x-clip lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:overflow-x-clip lg:pl-1 xl:pl-2"
        >
          <StaggerItem>
            {reduceMotion ? (
              <HeroProductMock />
            ) : (
              <motion.div
                className="w-full will-change-transform"
                style={{ scale: mediaScale, y: mediaY }}
              >
                <HeroProductMock />
              </motion.div>
            )}
          </StaggerItem>
        </StaggerGroup>
      </div>
    </section>
  );
}
