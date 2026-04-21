"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { siteBrandName, siteHeroShowcaseSrc } from "@/lib/site";

const spring = { type: "spring" as const, stiffness: 380, damping: 28 };

function HeroMobileProcessCard() {
  return (
    <div className="w-full rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] p-5 shadow-[0_8px_32px_-12px_rgba(13,111,100,0.12),0_24px_60px_-28px_rgba(0,0,0,0.12)] ring-1 ring-white/40 dark:border-white/14 dark:bg-zinc-900/55 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.07),0_32px_80px_-36px_rgba(0,0,0,0.65)] dark:ring-white/10">
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-500">
        Live layout exploration
      </p>
      <p className="font-display mt-2 text-lg font-normal tracking-[-0.02em] text-zinc-950 dark:text-zinc-50">
        Staging-first, milestone-driven
      </p>
      <p className="mt-2 text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">
        Staged previews and milestone checkpoints before anything goes live — so you
        always see structure first, then polish, with no surprises at launch.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/35 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-900 dark:text-emerald-100">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/45 opacity-50 motion-reduce:animate-none" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
          </span>
          Build in review
        </span>
        <span className="rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-2.5 py-1 text-[10px] font-semibold text-zinc-600 shadow-[var(--shadow-xs)] dark:border-zinc-600 dark:bg-zinc-800/80 dark:text-zinc-300">
          Milestone 1 · Structure
        </span>
      </div>
    </div>
  );
}

/**
 * Layered product frame: depth plates, rim light, slow halo — reads as live tooling.
 */
export function HeroProductMock() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <div className="md:hidden">
        <HeroMobileProcessCard />
      </div>

      <div className="relative mx-auto hidden w-full max-w-[min(100%,40rem)] md:block md:max-w-[min(100%,44rem)] md:px-0 lg:mx-0 lg:max-w-none lg:pr-5 xl:pr-6">
      {/* Ambient depth — stacked glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,var(--accent-glow),transparent_65%)] opacity-50 blur-2xl dark:opacity-40 sm:-inset-8 sm:rounded-[2.25rem]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-3 rounded-[1.75rem] bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.14),transparent_55%)] opacity-80 motion-reduce:animate-none dark:bg-[radial-gradient(circle_at_30%_15%,rgba(94,234,212,0.08),transparent_50%)] sm:-inset-4"
        style={
          reduceMotion
            ? undefined
            : { animation: "hero-mock-halo 10s ease-in-out infinite" }
        }
      />

      {/* Rear plate — suggests a second surface behind the main window */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-1 left-4 right-2 hidden h-[72%] rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)]/80 shadow-[0_20px_50px_-28px_rgba(0,0,0,0.2)] ring-1 ring-black/[0.04] dark:border-white/[0.07] dark:bg-zinc-900/50 dark:shadow-[0_24px_60px_-28px_rgba(0,0,0,0.55)] dark:ring-white/[0.05] lg:block lg:translate-y-3 lg:rotate-[0.6deg]"
      />

      {!reduceMotion ? (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 z-[4] hidden h-24 w-[min(42%,11rem)] max-w-[11rem] rounded-2xl border border-[var(--border)] bg-[var(--surface)]/95 shadow-[var(--shadow-md)] ring-1 ring-black/[0.05] backdrop-blur-md dark:border-white/12 dark:bg-zinc-900/92 dark:ring-white/[0.08] lg:block lg:top-1 lg:h-28 lg:w-[min(38%,12rem)] lg:max-w-[12rem]"
          initial={{ opacity: 0, y: 10, rotate: -2 }}
          animate={{
            opacity: 1,
            y: [0, -3, 0],
            rotate: [-1.2, -0.8, -1.2],
          }}
          transition={{
            opacity: { ...spring, delay: 0.12 },
            y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 9, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <div className="flex items-center gap-2 border-b border-[var(--border)] px-3 py-2 dark:border-white/10">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/90 shadow-[0_0_10px_rgba(52,211,153,0.45)]" />
            <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
              Staging
            </span>
          </div>
          <div className="space-y-2 px-3 py-3">
            <div className="h-1.5 w-3/4 rounded-full bg-zinc-200/90 dark:bg-zinc-600/80" />
            <div className="h-1.5 w-1/2 rounded-full bg-zinc-200/70 dark:bg-zinc-700/70" />
            <div className="mt-2 h-8 rounded-lg bg-[color-mix(in_oklab,var(--accent-muted)_55%,var(--surface-soft))] shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] dark:bg-teal-950/40 dark:shadow-none" />
          </div>
        </motion.div>
      ) : null}

      <motion.div
        className="relative z-[2] overflow-hidden rounded-[1.35rem] border border-[var(--border-strong)] bg-[var(--surface)] shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_8px_32px_-12px_rgba(13,111,100,0.15),0_32px_90px_-36px_rgba(0,0,0,0.2)] ring-1 ring-white/40 ring-inset dark:border-white/14 dark:bg-zinc-900/55 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.07),0_0_80px_-20px_rgba(94,234,212,0.12),0_40px_100px_-40px_rgba(0,0,0,0.7)] dark:ring-white/10 sm:rounded-[1.65rem] md:rounded-[1.85rem]"
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduceMotion ? { duration: 0 } : { ...spring, delay: 0.02 }}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(145deg,rgba(255,255,255,0.5)_0%,transparent_42%,transparent_58%,rgba(13,111,100,0.04)_100%)] dark:bg-[linear-gradient(145deg,rgba(255,255,255,0.07)_0%,transparent_40%,transparent_65%,rgba(0,0,0,0.25)_100%)]"
          aria-hidden
        />
        <div
          className="flex h-9 items-center gap-2 border-b border-[var(--border)] bg-[color-mix(in_oklab,var(--surface-soft)_70%,var(--surface))] px-3 dark:border-white/10 dark:bg-zinc-950/55"
          aria-hidden
        >
          <div className="flex gap-1.5 opacity-80">
            <span className="h-2 w-2 rounded-full bg-zinc-300 dark:bg-zinc-600" />
            <span className="h-2 w-2 rounded-full bg-zinc-300 dark:bg-zinc-600" />
            <span className="h-2 w-2 rounded-full bg-zinc-300 dark:bg-zinc-600" />
          </div>
          <div className="mx-auto flex h-2 w-[40%] max-w-[140px] items-center rounded-full bg-zinc-200/90 px-2 dark:bg-zinc-700/80">
            <span className="text-[8px] font-medium uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-400">
              preview.vryntlab.local
            </span>
          </div>
        </div>

        <div className="relative grid grid-cols-[minmax(0,4.5rem)_1fr] gap-0 border-b border-[var(--border)] dark:border-white/[0.06]">
          <div
            className="hidden border-r border-[var(--border)] bg-[color-mix(in_oklab,var(--surface-soft)_55%,var(--background))] py-4 dark:border-white/[0.06] dark:bg-zinc-950/40 sm:block"
            aria-hidden
          >
            <div className="mx-auto flex w-8 flex-col gap-2">
              <span className="h-1.5 w-full rounded-full bg-zinc-300/80 dark:bg-zinc-600/70" />
              <span className="h-1.5 w-4/5 rounded-full bg-zinc-200/70 dark:bg-zinc-700/60" />
              <span className="h-1.5 w-full rounded-full bg-zinc-200/60 dark:bg-zinc-700/50" />
              <span className="mt-3 h-6 w-full rounded-md bg-[var(--accent-muted)] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] dark:bg-teal-900/35 dark:shadow-none" />
            </div>
          </div>
          <div className="relative aspect-[16/11] w-full min-h-0 sm:aspect-[16/10] sm:min-h-[220px] md:aspect-[16/10] md:min-h-[240px] lg:aspect-[16/11] lg:min-h-[300px]">
            <div className="absolute inset-0 bg-[linear-gradient(145deg,color-mix(in_oklab,var(--surface-soft)_82%,var(--background-2)),var(--surface-soft))] dark:bg-zinc-950/85">
              <Image
                src={siteHeroShowcaseSrc}
                alt={`${siteBrandName} — interface layout exploration`}
                fill
                className="object-contain object-center p-3 px-3.5 pb-3.5 pt-3 md:p-3.5 md:px-4 lg:p-4 lg:px-5"
                sizes="(max-width: 1023px) min(90vw, 640px), min(52vw, 640px)"
                priority
              />
            </div>
            <div
              className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06),inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-40px_60px_-20px_rgba(0,0,0,0.08)] dark:shadow-[inset_0_0_80px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)]"
              aria-hidden
            />
          </div>
        </div>

        <div className="relative flex flex-wrap items-center justify-between gap-2 px-3 py-2.5 sm:px-4 sm:py-3">
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-500">
            Live layout exploration
          </p>
          <span className="rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-2 py-0.5 text-[10px] font-semibold text-zinc-600 shadow-[var(--shadow-xs)] dark:border-zinc-600 dark:bg-zinc-800/80 dark:text-zinc-300">
            Milestone 1 · Structure
          </span>
        </div>
      </motion.div>

      {!reduceMotion ? (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -bottom-2 -left-2 z-[3] hidden items-center gap-2 rounded-xl border border-[var(--accent)]/30 bg-[color-mix(in_oklab,var(--surface)_88%,var(--accent-muted))] px-2.5 py-2 shadow-[0_12px_40px_-16px_var(--accent-glow)] backdrop-blur-[2px] dark:border-teal-400/25 dark:bg-zinc-900/95 md:flex"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...spring, delay: 0.2 }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/50 opacity-60 motion-reduce:animate-none" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
          </span>
          <span className="text-[10px] font-semibold tracking-tight text-zinc-700 dark:text-zinc-200">
            Build in review
          </span>
        </motion.div>
      ) : null}
    </div>
    </>
  );
}
