"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useId } from "react";
import { useConversion } from "@/components/conversion/ConversionContext";
import {
  contentWell,
  focusRing,
} from "@/components/layout/layoutTokens";
import { SectionIntro } from "@/components/layout/SectionIntro";
import { SectionShell } from "@/components/layout/SectionShell";
import type { CaseStudy } from "@/lib/case-studies";
import { brandWorkIntentNudge, brandWorkSection } from "@/lib/brand-knowledge";
import { caseStudies, caseStudyPosterUrl } from "@/lib/case-studies";

function WorkShowcaseCard({ study, index }: { study: CaseStudy; index: number }) {
  const n = String(index + 1).padStart(2, "0");
  const posterSrc = caseStudyPosterUrl(study.media);
  const [isHovered, setIsHovered] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [layerKey, setLayerKey] = useState(0);
  const labelId = useId();

  // Get hero (poster) and tall scroll images
  const [hero, tall] = study.media.images;
  const altHero = study.imageAlts[0] ?? study.coverAlt;
  const altTall = study.imageAlts[1] ?? study.coverAlt;

  // Check for reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Reset animation when hover ends
  useEffect(() => {
    if (!isHovered) {
      const id = window.setTimeout(() => setLayerKey((k) => k + 1), 0);
      return () => window.clearTimeout(id);
    }
    return undefined;
  }, [isHovered]);

  const scrollOn = isHovered && !reduceMotion;

  return (
    <article
      className="group relative overflow-hidden rounded-xl border border-[#1E1E35] bg-[#0F0F1A] transition-all duration-500 ease-[var(--ease-out-premium)] hover:-translate-y-1 hover:border-[#7C3FFF]/40 hover:shadow-[0_0_60px_-20px_rgba(124,63,255,0.2),0_0_40px_-15px_rgba(0,229,255,0.1)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient border glow on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{
        background: 'linear-gradient(135deg, rgba(124,63,255,0.1) 0%, rgba(0,229,255,0.1) 100%)',
      }} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Image Section with Scrolling Preview */}
        <Link
          href={`/work/${study.id}`}
          className={`relative block aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[360px] ${focusRing}`}
          aria-labelledby={labelId}
        >
          <span id={labelId} className="sr-only">
            {study.coverAlt}
          </span>

          {/* Live preview badge */}
          <div className="pointer-events-none absolute left-3 top-3 z-[4] rounded-md border border-white/[0.12] bg-black/55 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-zinc-100 shadow-lg backdrop-blur-md sm:left-4 sm:top-4">
            Live preview
          </div>

          {/* Static hero image (shows when not hovering) */}
          <div className="absolute inset-0 z-[1]">
            <Image
              src={hero}
              alt={altHero}
              fill
              className={`object-cover object-center transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                scrollOn ? "opacity-0" : "opacity-100"
              }`}
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={90}
            />
          </div>

          {/* Scrolling tall image (shows on hover) */}
          {!reduceMotion && (
            <div
              className={`absolute inset-0 z-[0] overflow-hidden [container-type:size] transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                scrollOn ? "opacity-100" : "opacity-0"
              }`}
              aria-hidden={!scrollOn}
            >
              <div
                key={layerKey}
                data-active={scrollOn ? "true" : "false"}
                className="work-scroll-preview-track relative w-full will-change-transform"
              >
                <Image
                  src={tall}
                  alt={altTall}
                  width={1600}
                  height={2600}
                  className="h-auto w-full max-w-none object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={90}
                />
              </div>
            </div>
          )}

          {/* Bottom gradient overlay */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-[38%] bg-gradient-to-t from-[#0F0F1A] via-[#0F0F1A]/55 to-transparent"
            aria-hidden
          />
          {/* Inner ring */}
          <div
            className="pointer-events-none absolute inset-0 z-[3] ring-1 ring-inset ring-white/[0.06]"
            aria-hidden
          />
        </Link>

        {/* Content Section */}
        <div className="flex flex-col justify-center gap-5 p-6 sm:p-8 lg:p-10">
          {/* Project number and category */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7C3FFF]">
              Project {n}
            </span>
            <span className="inline-flex rounded-full border border-[#1E1E35] bg-[#1E1E35]/30 px-3 py-1 text-[10px] font-medium tracking-tight text-[#C8C8D8]">
              {study.typeLabel}
            </span>
          </div>

          {/* Client name */}
          <h3 className="font-display text-2xl font-medium tracking-[-0.02em] text-[#F0F0FF] sm:text-[1.75rem]">
            {study.client}
          </h3>

          {/* One-liner */}
          <p className="max-w-md text-[15px] leading-relaxed text-[#C8C8D8]">
            {study.shortTitle}
          </p>

          {/* Stats card */}
          <div className="rounded-lg border border-[#1E1E35] bg-[#1E1E35]/20 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#00E5FF]">
              {study.cardStat}
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-[#8888a0]">
              {study.cardOutcome}
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={`/work/${study.id}`}
              className={`inline-flex min-h-10 items-center justify-center rounded-lg bg-gradient-to-r from-[#7C3FFF] to-[#00E5FF] px-5 text-[13px] font-semibold text-white transition-all duration-300 ${focusRing} hover:shadow-[0_0_20px_-5px_rgba(124,63,255,0.4)]`}
            >
              View project
              <span aria-hidden className="ml-2">
                &rarr;
              </span>
            </Link>
            <a
              href={study.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex min-h-10 items-center text-[13px] font-medium text-[#8888a0] underline decoration-[#1E1E35] underline-offset-4 transition-colors duration-300 ${focusRing} hover:text-[#00E5FF] hover:decoration-[#00E5FF]/50`}
            >
              Visit live site &rarr;
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
    <SectionShell
      id="work"
      labelledBy="work-heading"
      pad="compact"
      className="!scroll-mt-20 border-t border-[#1E1E35] pt-16 sm:!scroll-mt-24 sm:pt-20 md:!scroll-mt-28 md:pt-24"
    >
      <div className={`${contentWell} flex flex-col gap-10 sm:gap-12 lg:gap-14`}>
        {/* Section header */}
        <div>
          <SectionIntro
            eyebrow={brandWorkSection.eyebrow}
            titleId="work-heading"
            title={brandWorkSection.title}
            description={<>{brandWorkSection.description}</>}
            align="start"
          />
          {workNudge && (
            <p className="mt-4 max-w-xl border-l-2 border-[#7C3FFF]/40 py-0.5 pl-4 text-[13px] leading-relaxed text-[#8888a0]">
              {workNudge}
            </p>
          )}
        </div>

        {/* Project cards - side by side on large screens */}
        <div className="grid grid-cols-1 gap-6 lg:gap-8">
          {caseStudies.map((study, i) => (
            <WorkShowcaseCard key={study.id} study={study} index={i} />
          ))}
        </div>

        {/* Footer link */}
        <div className="flex flex-col items-center gap-4 border-t border-[#1E1E35] pt-10 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="max-w-md">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8888a0]">
              Beyond the highlights
            </p>
            <p className="mt-2 text-[14px] leading-relaxed text-[#C8C8D8]">
              Partner builds, internal tools, and launch work under NDA do not
              appear here — reach out for references closer to your industry.
            </p>
          </div>
          <Link
            href="/work"
            className={`inline-flex min-h-10 items-center justify-center rounded-lg border border-[#1E1E35] bg-transparent px-5 text-[13px] font-semibold text-[#C8C8D8] transition-all duration-300 ${focusRing} hover:border-[#7C3FFF]/50 hover:text-[#F0F0FF]`}
          >
            More work &rarr;
          </Link>
        </div>
      </div>
    </SectionShell>
  );
}
