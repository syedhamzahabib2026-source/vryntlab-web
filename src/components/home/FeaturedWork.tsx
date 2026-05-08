"use client";

import Link from "next/link";
import Image from "next/image";
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

  return (
    <article
      className="group relative overflow-hidden rounded-xl border border-[#1E1E35] bg-[#0F0F1A] transition-all duration-500 ease-[var(--ease-out-premium)] hover:-translate-y-1 hover:border-[#7C3FFF]/40 hover:shadow-[0_0_60px_-20px_rgba(124,63,255,0.2),0_0_40px_-15px_rgba(0,229,255,0.1)]"
    >
      {/* Gradient border glow on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{
        background: 'linear-gradient(135deg, rgba(124,63,255,0.1) 0%, rgba(0,229,255,0.1) 100%)',
      }} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Image Section */}
        <Link
          href={`/work/${study.id}`}
          className={`relative block aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[360px] ${focusRing}`}
        >
          <Image
            src={posterSrc}
            alt={study.coverAlt}
            fill
            className="object-cover transition-transform duration-700 ease-[var(--ease-out-premium)] group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F1A]/80 via-transparent to-transparent lg:bg-gradient-to-r" />
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
