"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { contentWell, focusRing } from "@/components/layout/layoutTokens";
import { VisualPlaceholder } from "@/components/ui/VisualPlaceholder";
import {
  ctaStartProject,
  ctaViewWork,
  siteBrandName,
  siteHeroShowcaseSrc,
} from "@/lib/site";

const tapButton = `min-h-12 w-full justify-center rounded-full px-6 text-[13px] font-semibold tracking-tight transition-[transform,background-color,box-shadow,border-color] duration-300 ease-[var(--ease-out-premium)] motion-reduce:duration-150 active:scale-[0.98] ${focusRing} sm:w-auto sm:min-w-[160px] sm:px-8 md:min-w-[168px] md:px-9`;

const primaryCtaClass = `${tapButton} group/hero-cta inline-flex shrink-0 items-center bg-zinc-950 text-white shadow-[var(--shadow-md)] [@media(hover:hover)]:hover:bg-zinc-800 [@media(hover:hover)]:hover:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.35)] dark:bg-zinc-50 dark:text-zinc-950 dark:[@media(hover:hover)]:hover:bg-zinc-200`;

const secondaryCtaClass = `${tapButton} inline-flex shrink-0 items-center border border-[var(--border)] bg-[var(--surface)] text-zinc-800 shadow-[var(--shadow-xs)] [@media(hover:hover)]:hover:border-[var(--accent)]/40 [@media(hover:hover)]:hover:shadow-[var(--shadow-sm)] dark:border-zinc-700 dark:bg-[var(--surface)] dark:text-zinc-200 dark:[@media(hover:hover)]:hover:border-[var(--accent)]/45`;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
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
      className="relative overflow-hidden pb-11 pt-3 sm:pb-12 sm:pt-4 md:pb-16 md:pt-5 lg:pb-[4.75rem] lg:pt-6 xl:pb-[5.5rem]"
      aria-labelledby="hero-heading"
    >
      {reduceMotion ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-[-10%] flex justify-center opacity-[0.55] max-lg:opacity-40 dark:opacity-40 dark:max-lg:opacity-30"
        >
          <div className="h-[min(18rem,58vw)] w-[min(34rem,92vw)] rounded-full bg-[var(--accent-muted)] blur-3xl sm:h-[min(22rem,62vw)] sm:w-[min(38rem,88vw)]" />
        </div>
      ) : (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-[-10%] flex justify-center opacity-[0.55] max-lg:opacity-40 dark:opacity-40 dark:max-lg:opacity-30"
          style={{ y: parallaxY }}
        >
          <div className="h-[min(18rem,58vw)] w-[min(34rem,92vw)] rounded-full bg-[var(--accent-muted)] blur-3xl sm:h-[min(22rem,62vw)] sm:w-[min(38rem,88vw)]" />
        </motion.div>
      )}

      <div
        className={`relative grid w-full gap-9 sm:gap-11 md:gap-12 lg:grid-cols-12 lg:items-center lg:gap-x-20 lg:gap-y-12 xl:gap-x-24 ${contentWell}`}
      >
        <StaggerGroup
          mode="immediate"
          className="flex flex-col items-stretch text-left lg:col-span-5 lg:col-start-1 lg:row-start-1"
        >
          <StaggerItem>
            <header className="max-w-[22rem] sm:max-w-none lg:max-w-[min(100%,36rem)]">
              <div className="flex flex-col gap-2.5 sm:gap-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)] opacity-90 sm:tracking-[0.26em] dark:opacity-95">
                  {siteBrandName}
                </p>
                <span
                  className="h-px w-10 bg-[var(--accent)]/45 sm:w-12 dark:bg-[var(--accent)]/50"
                  aria-hidden
                />
              </div>
              <h1
                id="hero-heading"
                className="mt-5 text-balance text-[1.8125rem] font-semibold leading-[1.06] tracking-[-0.033em] text-zinc-950 sm:mt-6 sm:text-[2.25rem] sm:leading-[1.04] md:mt-7 md:text-[2.875rem] md:leading-[1.02] lg:text-[3.25rem] lg:tracking-[-0.035em] xl:text-[3.375rem] dark:text-zinc-50"
              >
                Web work built to perform in the real world
              </h1>
            </header>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-6 max-w-[36rem] text-pretty text-[0.9375rem] leading-[1.65] text-zinc-600 sm:mt-7 sm:text-[1.0625rem] sm:leading-[1.66] md:mt-8 md:max-w-[42ch] md:text-lg md:leading-[1.72] dark:text-zinc-400">
              For startups and growing teams who sell or operate online: we
              design, build, and fix websites, automations, and custom pieces when
              templates stop being enough. You work directly with whoever ships the
              work—clear scopes, steady communication, no account-manager maze.
            </p>
          </StaggerItem>
          <StaggerItem>
            <div className="mt-8 sm:mt-9 lg:mt-10">
              <div className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[color-mix(in_oklab,var(--surface)_78%,var(--surface-soft))] p-4 shadow-[var(--shadow-xs)] ring-1 ring-black/[0.02] sm:max-w-lg sm:rounded-[1.35rem] sm:p-5 dark:bg-[color-mix(in_oklab,var(--surface)_55%,var(--surface-soft))] dark:ring-white/[0.04]">
                <nav
                  aria-label="Primary actions"
                  className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3"
                >
                  <a href="#contact" className={primaryCtaClass}>
                    <span className="flex items-center justify-center gap-2">
                      {ctaStartProject}
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
                <p className="mt-4 border-t border-[var(--border)] pt-4 text-[12px] leading-relaxed text-zinc-500 dark:border-zinc-700/50 dark:text-zinc-500">
                  Free project estimate — no pressure, no commitment.
                </p>
              </div>
            </div>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-7 max-w-lg border-l-2 border-[var(--accent)]/35 py-0.5 pl-4 text-left text-[13px] leading-relaxed text-zinc-600 sm:mt-8 md:mt-9 dark:border-[var(--accent)]/40 dark:text-zinc-500">
              Clear communication, careful delivery, and code you can hand off when
              you&apos;re ready.
            </p>
          </StaggerItem>
        </StaggerGroup>

        <StaggerGroup
          mode="immediate"
          className="w-full lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:min-w-0"
        >
          <StaggerItem>
            {reduceMotion ? (
              <VisualPlaceholder
                variant="hero"
                aspect="cinematic"
                caption="Interface planning — early layout system"
                className="w-full"
              >
                <div className="absolute inset-0 bg-[var(--surface-soft)] dark:bg-zinc-900/90">
                  <Image
                    src={siteHeroShowcaseSrc}
                    alt={`${siteBrandName} — interface layout exploration`}
                    fill
                    className="object-contain object-center"
                    sizes="(max-width: 1024px) 100vw, 44vw"
                    priority
                  />
                </div>
              </VisualPlaceholder>
            ) : (
              <motion.div
                className="w-full will-change-transform"
                style={{ scale: mediaScale, y: mediaY }}
              >
                <VisualPlaceholder
                  variant="hero"
                  aspect="cinematic"
                  caption="Interface planning — early layout system"
                  className="w-full"
                >
                  <div className="absolute inset-0 bg-[var(--surface-soft)] dark:bg-zinc-900/90">
                    <Image
                      src={siteHeroShowcaseSrc}
                      alt={`${siteBrandName} — interface layout exploration`}
                      fill
                      className="object-contain object-center"
                      sizes="(max-width: 1024px) 100vw, 44vw"
                      priority
                    />
                  </div>
                </VisualPlaceholder>
              </motion.div>
            )}
          </StaggerItem>
        </StaggerGroup>
      </div>
    </section>
  );
}
