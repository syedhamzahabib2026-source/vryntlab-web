"use client";

import Link from "next/link";
import { useConversion } from "@/components/conversion/ConversionContext";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import {
  contentWell,
  focusRing,
  slabBleed,
  slabContent,
} from "@/components/layout/layoutTokens";
import { SectionIntro } from "@/components/layout/SectionIntro";
import { SectionShell } from "@/components/layout/SectionShell";
import type { CaseStudy } from "@/lib/case-studies";
import { brandWorkIntentNudge, brandWorkSection } from "@/lib/brand-knowledge";
import { caseStudies } from "@/lib/case-studies";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ScrollingWorkPreview } from "./ScrollingWorkPreview";

function useDesktopFineHover(): boolean | null {
  const [matches, setMatches] = useState<boolean | null>(null);
  useLayoutEffect(() => {
    const mq = window.matchMedia(
      "(min-width: 1024px) and (hover: hover) and (pointer: fine)",
    );
    const sync = () => setMatches(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return matches;
}

const cardShell = `overflow-hidden rounded-2xl border border-white/[0.09] bg-gradient-to-br from-white/[0.09] via-white/[0.03] to-black/35 text-left shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_32px_100px_-40px_rgba(0,0,0,0.62),0_0_90px_-30px_var(--slab-glow)] transition-[box-shadow,border-color,transform] duration-500 ease-[var(--ease-out-premium)] sm:rounded-[1.85rem] [@media(hover:hover)]:hover:-translate-y-[4px] [@media(hover:hover)]:hover:border-teal-400/28 [@media(hover:hover)]:hover:shadow-[0_0_0_1px_rgba(94,234,212,0.12),0_40px_120px_-40px_rgba(0,0,0,0.68),0_0_100px_-28px_rgba(94,234,212,0.12)] motion-reduce:transform-none motion-reduce:duration-200`;

const primaryCta = `inline-flex w-fit items-center gap-2 rounded-full border border-white/14 bg-white/[0.07] px-4 py-2.5 text-[12px] font-semibold tracking-tight text-zinc-50 shadow-[0_10px_40px_-24px_rgba(0,0,0,0.55)] transition-[border-color,background-color,box-shadow,transform] duration-400 ease-[var(--ease-out-premium)] active:scale-[0.99] ${focusRing} [@media(hover:hover)]:hover:border-teal-400/40 [@media(hover:hover)]:hover:bg-white/[0.11] [@media(hover:hover)]:hover:shadow-[0_14px_48px_-28px_rgba(94,234,212,0.12)]`;

const secondaryCta = `inline-flex w-fit items-center gap-1.5 text-[12px] font-medium text-zinc-400 underline decoration-white/15 underline-offset-4 transition-colors duration-300 ${focusRing} rounded-sm [@media(hover:hover)]:hover:text-teal-200/90 [@media(hover:hover)]:hover:decoration-teal-400/35`;

/** Decorative only — not client work, not links (visual depth for the portfolio row). */
const ILLUSTRATIVE_INDUSTRY_LABELS = [
  "E-commerce · Fashion",
  "Local services · Booking system",
  "SaaS · Landing page",
] as const;

function WorkPortfolioHintCards() {
  return (
    <div className="space-y-5">
      <div
        aria-hidden="true"
        className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-4 lg:gap-5"
      >
        {ILLUSTRATIVE_INDUSTRY_LABELS.map((label) => (
          <div
            key={label}
            className="pointer-events-none select-none overflow-hidden rounded-xl border border-white/[0.1] bg-white/[0.06] opacity-[0.68] shadow-[0_20px_60px_-40px_rgba(0,0,0,0.55)] backdrop-blur-xl backdrop-saturate-150 [box-shadow:inset_0_1px_0_0_rgba(255,255,255,0.06)] supports-[backdrop-filter]:bg-white/[0.045] sm:rounded-[1.1rem]"
          >
            <div className="aspect-[16/10] bg-gradient-to-br from-white/[0.12] via-white/[0.04] to-transparent ring-1 ring-inset ring-white/[0.08]" />
            <div className="border-t border-white/[0.06] px-4 py-3.5 sm:px-4 sm:py-4">
              <p className="text-[11px] font-medium tracking-tight text-zinc-400 sm:text-[12px]">
                {label}
              </p>
            </div>
          </div>
        ))}
      </div>
      <p className="text-center text-[12px] leading-relaxed text-zinc-500 sm:text-[13px]">
        Showing selected examples — more available on request
      </p>
    </div>
  );
}

function WorkShowcaseCard({ study, index }: { study: CaseStudy; index: number }) {
  const articleRef = useRef<HTMLElement>(null);
  const fineDesktop = useDesktopFineHover();
  const [hovered, setHovered] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const root = articleRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e) return;
        const ok =
          e.isIntersecting &&
          typeof e.intersectionRatio === "number" &&
          e.intersectionRatio > 0.12;
        setInView(ok);
      },
      {
        root: null,
        threshold: [0, 0.08, 0.12, 0.15, 0.2, 0.28, 0.36, 0.5],
        rootMargin: "-6% 0px -10% 0px",
      },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  const previewActive =
    fineDesktop === true
      ? hovered || focusWithin
      : fineDesktop === false
        ? inView
        : false;

  const n = String(index + 1).padStart(2, "0");

  return (
    <article
      ref={articleRef}
      className={cardShell}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocusWithin(true)}
      onBlurCapture={(ev) => {
        const next = ev.relatedTarget;
        if (next instanceof Node && articleRef.current?.contains(next)) return;
        setFocusWithin(false);
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 lg:items-stretch lg:min-h-[min(440px,54vh)]">
        <Link
          href={`/work/${study.id}`}
          className={`relative block min-h-[220px] focus:outline-none lg:col-span-3 lg:min-h-full ${focusRing} rounded-none`}
          aria-label={`View project: ${study.client}`}
        >
          <ScrollingWorkPreview
            study={study}
            active={previewActive}
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
        </Link>

        <div className="flex flex-col justify-center gap-5 border-t border-white/[0.08] bg-gradient-to-br from-black/40 to-zinc-950/90 px-6 py-8 sm:gap-6 sm:px-8 sm:py-10 lg:col-span-2 lg:border-l lg:border-t-0 lg:px-9 lg:py-11 xl:px-11">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-300/85">
              Project · {n}
            </p>
            <span className="mt-3 inline-flex w-fit rounded-full border border-white/12 bg-white/[0.05] px-2.5 py-0.5 text-[10px] font-medium tracking-tight text-zinc-300 sm:text-[11px]">
              {study.typeLabel}
            </span>
            <h3 className="mt-4 font-display text-2xl font-normal tracking-[-0.025em] text-zinc-50 sm:text-[1.65rem]">
              {study.client}
            </h3>
            <p className="mt-2 max-w-prose text-[14px] font-medium leading-snug tracking-[-0.01em] text-zinc-200 sm:text-[15px]">
              {study.shortTitle}
            </p>
          </div>

          <div className="space-y-2.5 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3.5 sm:px-5 sm:py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-teal-200/80">
              {study.cardStat}
            </p>
            <p className="text-[13px] leading-relaxed text-zinc-400 sm:text-[14px]">
              {study.cardOutcome}
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 sm:gap-3.5">
            <Link href={`/work/${study.id}`} className={primaryCta}>
              View project
              <span aria-hidden className="text-[0.95em]">
                →
              </span>
            </Link>
            <a
              href={study.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={secondaryCta}
            >
              Visit live site
              <span aria-hidden>→</span>
              <span className="sr-only"> (opens in new tab)</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

export function FeaturedWork() {
  const { selectedIntent } = useConversion();
  const workNudge =
    selectedIntent != null ? brandWorkIntentNudge[selectedIntent] : null;

  return (
    <div className={slabBleed}>
      <SectionShell
        id="work"
        labelledBy="work-heading"
        pad="compact"
        className={`${slabContent} !scroll-mt-[calc(4.5rem+0.25rem)] border-0 sm:!scroll-mt-24 md:!scroll-mt-28`}
      >
        <div className="flex flex-col gap-7 pt-2 sm:gap-10 sm:pt-3 md:gap-11 md:pt-4 lg:gap-14 lg:pt-5">
          <div className={contentWell}>
            <Reveal>
              <SectionIntro
                eyebrow={brandWorkSection.eyebrow}
                titleId="work-heading"
                title={brandWorkSection.title}
                tone="onDark"
                description={<>{brandWorkSection.description}</>}
                align="start"
              />
              {workNudge ? (
                <p className="mt-4 max-w-xl border-l-2 border-teal-400/35 py-0.5 pl-3.5 text-[13px] leading-relaxed text-zinc-300 sm:mt-5 sm:pl-4 sm:text-[14px]">
                  {workNudge}
                </p>
              ) : null}
            </Reveal>
          </div>

          <div
            className={`${contentWell} flex flex-col gap-8 sm:gap-10 lg:gap-12`}
          >
            <StaggerGroup
              className="flex flex-col gap-8 sm:gap-10 lg:gap-11"
              inViewMargin="-10% 0px -8% 0px"
              inViewAmount={0.12}
            >
              {caseStudies.map((study, i) => (
                <StaggerItem key={study.id}>
                  <WorkShowcaseCard study={study} index={i} />
                </StaggerItem>
              ))}
            </StaggerGroup>

            <Reveal>
              <div className="border-t border-white/[0.07] pt-9 sm:pt-10">
                <WorkPortfolioHintCards />
              </div>
            </Reveal>

            <Reveal>
              <div className="flex flex-col gap-5 pt-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:pt-8">
                <div className="max-w-xl space-y-1.5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                    Beyond the highlights
                  </p>
                  <p className="text-[14px] leading-relaxed text-zinc-400 sm:text-[15px]">
                    Partner builds, internal tools, and launch work under NDA do
                    not appear here — the archive covers the full picture.
                  </p>
                </div>
                <Link
                  href="/work"
                  className={`group/more inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-white/12 bg-white/[0.04] px-4 py-2.5 text-[12px] font-semibold text-zinc-100 transition-[border-color,background-color,transform] duration-400 ease-[var(--ease-out-premium)] active:scale-[0.99] sm:self-center ${focusRing} [@media(hover:hover)]:hover:border-teal-400/35 [@media(hover:hover)]:hover:bg-white/[0.07]`}
                >
                  More work
                  <span
                    aria-hidden
                    className="transition-transform duration-400 ease-[var(--ease-out-premium)] [@media(hover:hover)]:group-hover/more:translate-x-0.5"
                  >
                    →
                  </span>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </SectionShell>
    </div>
  );
}
