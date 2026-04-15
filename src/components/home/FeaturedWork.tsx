"use client";

import type { ReactNode } from "react";
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
import { CaseStudyPreviewMedia } from "./CaseStudyPreviewMedia";

const cardBase = `group/case relative block cursor-pointer overflow-hidden rounded-2xl border text-left transition-[box-shadow,border-color,transform,filter] duration-500 ease-[var(--ease-out-premium)] active:scale-[0.997] motion-reduce:transform-none motion-reduce:duration-200 ${focusRing}`;

const cardFeatured = `${cardBase} border-white/[0.08] bg-gradient-to-br from-white/[0.07] to-white/[0.02] shadow-[0_0_0_1px_rgba(255,255,255,0.07),0_32px_100px_-32px_rgba(0,0,0,0.58),0_0_80px_-24px_var(--slab-glow)] sm:rounded-[1.9rem] [@media(hover:hover)]:hover:-translate-y-[5px] [@media(hover:hover)]:hover:border-teal-400/30 [@media(hover:hover)]:hover:shadow-[0_0_0_1px_rgba(94,234,212,0.14),0_40px_110px_-32px_rgba(0,0,0,0.65),0_0_100px_-28px_rgba(94,234,212,0.14)]`;

const cardCompact = `${cardBase} border-white/[0.07] bg-white/[0.035] shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_24px_64px_-28px_rgba(0,0,0,0.52)] sm:rounded-[1.7rem] [@media(hover:hover)]:hover:-translate-y-[3px] [@media(hover:hover)]:hover:border-teal-400/25 [@media(hover:hover)]:hover:shadow-[0_0_0_1px_rgba(94,234,212,0.11),0_32px_80px_-28px_rgba(0,0,0,0.58)]`;

function CaseStudyCardContent({
  study,
  index,
  layout,
}: {
  study: CaseStudy;
  index: number;
  layout: "featured" | "compact";
}) {
  const n = String(index + 1).padStart(2, "0");
  const isFeatured = layout === "featured";

  const copyBlock = (
    <div
      className={
        isFeatured
          ? "order-2 flex flex-col justify-center border-t border-white/[0.08] px-5 py-7 sm:px-8 sm:py-10 md:px-10 md:py-12 lg:order-2 lg:col-span-5 lg:border-t-0 lg:border-l lg:border-white/[0.08] lg:bg-white/[0.03] lg:px-10 lg:py-14 xl:px-12"
          : "order-2 flex flex-col justify-center border-t border-white/[0.08] px-5 py-6 sm:px-7 sm:py-8"
      }
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-300/90">
        Case study · {n}
      </p>
      <span className="mt-3 inline-flex w-fit rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-0.5 text-[10px] font-medium tracking-tight text-zinc-300 sm:py-1 sm:text-[11px]">
        {study.typeLabel}
      </span>
      <h3
        className={`mt-4 text-balance font-display font-normal tracking-[-0.02em] text-zinc-50 sm:mt-5 ${isFeatured ? "text-xl sm:text-2xl md:text-[1.65rem]" : "text-lg sm:text-xl"}`}
      >
        {study.client}
      </h3>
      <p className="mt-2 max-w-[36ch] text-[14px] font-medium leading-snug tracking-[-0.012em] text-zinc-200 sm:text-[15px]">
        {study.shortTitle}
      </p>
      <p className="mt-3 max-w-[42ch] text-[13px] leading-relaxed text-zinc-400 sm:mt-3.5 sm:text-[14px] sm:leading-relaxed">
        {study.problem}
      </p>
      <p className="mt-6 sm:mt-7">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-200 shadow-[0_8px_32px_-20px_rgba(0,0,0,0.5)] transition-[border-color,background-color,box-shadow,transform] duration-400 ease-[var(--ease-out-premium)] [@media(hover:hover)]:group-hover/case:border-teal-400/35 [@media(hover:hover)]:group-hover/case:bg-white/[0.08]">
          View case study
          <span
            aria-hidden
            className="text-[0.95em] transition-transform duration-400 ease-[var(--ease-out-premium)] [@media(hover:hover)]:group-hover/case:translate-x-0.5"
          >
            →
          </span>
        </span>
      </p>
      <span className="sr-only">
        Opens the full case study on a new page.
      </span>
    </div>
  );

  const mediaMin = isFeatured
    ? "aspect-[4/5] min-h-[240px] sm:aspect-[4/3] sm:min-h-[280px] md:aspect-[16/10] md:min-h-[340px] lg:aspect-auto lg:min-h-[min(56vh,480px)] xl:min-h-[min(58vh,520px)]"
    : "aspect-[4/5] min-h-[200px] sm:aspect-[4/3] sm:min-h-[220px] md:min-h-[240px] lg:aspect-[16/11] lg:min-h-[260px]";

  const mediaBlock = (
    <div
      className={
        isFeatured
          ? "order-1 overflow-hidden bg-zinc-950 lg:order-1 lg:col-span-7 lg:bg-gradient-to-br lg:from-zinc-950 lg:to-black lg:p-0"
          : "order-1 overflow-hidden bg-zinc-950"
      }
    >
      <figure className="relative m-0 flex h-full min-h-0 flex-col lg:overflow-hidden lg:rounded-[1.35rem] lg:ring-1 lg:ring-white/[0.1] lg:shadow-[0_28px_70px_-32px_rgba(0,0,0,0.75)]">
        <div className={`relative w-full min-w-0 ${mediaMin}`}>
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden lg:rounded-t-[1.35rem]">
            <div className="relative h-full w-full origin-center transition-transform duration-500 ease-[var(--ease-out-premium)] [@media(hover:hover)]:group-hover/case:scale-[1.02] motion-reduce:transform-none">
              <CaseStudyPreviewMedia
                study={study}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 56vw"
              />
            </div>
          </div>
          <div
            className="pointer-events-none absolute inset-0 z-[2] ring-1 ring-inset ring-white/[0.06]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-black/35 via-transparent to-transparent [@media(hover:hover)]:group-hover/case:from-black/45"
            aria-hidden
          />
        </div>
        <figcaption className="border-t border-white/[0.08] bg-white/[0.04] px-5 py-3 text-left text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500 sm:px-6 sm:py-3.5 lg:rounded-b-[1.35rem] lg:px-8">
          {study.caption}
        </figcaption>
      </figure>
    </div>
  );

  if (isFeatured) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 lg:items-stretch">
        {mediaBlock}
        {copyBlock}
      </div>
    );
  }

  return (
    <>
      {mediaBlock}
      {copyBlock}
    </>
  );
}

export function FeaturedWork() {
  const [primary, ...rest] = caseStudies;
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
        <div className={`flex flex-col gap-7 pt-2 sm:gap-10 sm:pt-3 md:gap-11 md:pt-4 lg:gap-14 lg:pt-5`}>
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

          <div className={`${contentWell} flex flex-col gap-8 sm:gap-10 lg:gap-12`}>
            {primary ? (
              <StaggerGroup
                className="flex flex-col"
                inViewMargin="-10% 0px -8% 0px"
                inViewAmount={0.12}
              >
                <StaggerItem>
                  <CaseStudyCardLink study={primary} className={cardFeatured}>
                    <CaseStudyCardContent
                      study={primary}
                      index={0}
                      layout="featured"
                    />
                  </CaseStudyCardLink>
                </StaggerItem>
              </StaggerGroup>
            ) : null}

            {primary && rest.length > 0 ? (
              <div
                className="flex flex-col items-center gap-3 py-2 sm:py-3"
                aria-hidden
              >
                <div className="h-px w-full max-w-xs bg-gradient-to-r from-transparent via-white/25 to-transparent sm:max-w-md" />
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                  More work
                </p>
              </div>
            ) : null}

            {rest.length > 0 ? (
              <StaggerGroup
                className="grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-8 xl:gap-10"
                inViewMargin="-10% 0px -8% 0px"
                inViewAmount={0.12}
              >
                {rest.map((study, i) => (
                  <StaggerItem key={study.id}>
                    <CaseStudyCardLink
                      study={study}
                      className={`grid grid-cols-1 ${cardCompact}`}
                    >
                      <CaseStudyCardContent
                        study={study}
                        index={i + 1}
                        layout="compact"
                      />
                    </CaseStudyCardLink>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            ) : null}
          </div>
        </div>
      </SectionShell>
    </div>
  );
}

function CaseStudyCardLink({
  study,
  className,
  children,
}: {
  study: CaseStudy;
  className: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={`/work/${study.id}`}
      className={className}
      aria-label={`View case study: ${study.client}`}
    >
      {children}
    </Link>
  );
}
