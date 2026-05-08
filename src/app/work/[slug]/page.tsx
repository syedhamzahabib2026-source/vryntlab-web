import type { ReactNode } from "react";
import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllCaseStudySlugs,
  getCaseStudyBySlug,
} from "@/lib/case-studies";
import { CaseStudyHeroScroll } from "@/components/work/CaseStudyHeroScroll";
import { siteBrandName } from "@/lib/site";
import { contentWell, focusRing } from "@/components/layout/layoutTokens";
import { JsonLd } from "@/components/seo/JsonLd";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) return { title: "Work" };
  return {
    title: `${study.client} — ${study.shortTitle} | ${siteBrandName}`,
    description: study.problem.slice(0, 155),
    alternates: {
      canonical: `https://vryntlab.com/work/${slug}`,
    },
    openGraph: {
      title: `${study.client} — ${study.shortTitle}`,
      description: study.problem.slice(0, 155),
      url: `https://vryntlab.com/work/${slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${study.client} — ${study.shortTitle} | ${siteBrandName}`,
      description: study.problem.slice(0, 155),
    },
  };
}

function StoryBlock({
  id,
  kicker,
  title,
  children,
}: {
  id: string;
  kicker: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      aria-labelledby={id}
      className="rounded-xl border border-[#1E1E35] bg-[#0F0F1A] p-6 sm:p-8 md:p-10"
    >
      <div className="border-l-[3px] border-[#7C3FFF] pl-5 sm:pl-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8888a0]">
          {kicker}
        </p>
        <h2 id={id} className="mt-2 font-display text-lg font-medium tracking-[-0.02em] text-[#F0F0FF] sm:text-xl">
          {title}
        </h2>
        <div className="mt-4 text-[16px] leading-[1.7] text-[#C8C8D8] sm:text-[17px]">
          {children}
        </div>
      </div>
    </section>
  );
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) notFound();

  const [heroCropSrc, tallScrollSrc] = study.media.images;
  const heroCropAlt = study.imageAlts[0] ?? study.coverAlt;
  const tallAlt = study.imageAlts[1] ?? study.coverAlt;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://vryntlab.com" },
      { "@type": "ListItem", position: 2, name: "Work", item: "https://vryntlab.com/work" },
      { "@type": "ListItem", position: 3, name: study.client, item: `https://vryntlab.com/work/${slug}` },
    ],
  };

  return (
    <article className="flex flex-1 flex-col overflow-x-clip pb-14 pt-3 sm:pb-20 sm:pt-4 md:pt-5">
      <JsonLd schema={breadcrumb} />
      <div className={`${contentWell} flex flex-col gap-8 sm:gap-10`}>
        <nav aria-label="Breadcrumb" className="text-[13px] text-[#8888a0]">
          <Link
            href="/#work"
            className={`font-medium text-[#7C3FFF] underline decoration-[#7C3FFF]/30 underline-offset-4 transition-colors ${focusRing} rounded-sm hover:text-[#9d6aff] hover:decoration-[#7C3FFF]`}
          >
            &larr; Selected Work
          </Link>
        </nav>

        <header className="max-w-3xl">
          <span className="inline-flex rounded-full border border-[#1E1E35] bg-[#1E1E35]/30 px-2.5 py-0.5 text-[10px] font-medium tracking-tight text-[#C8C8D8]">
            {study.typeLabel}
          </span>
          <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7C3FFF]">
            {study.client}
          </p>
          <h1 className="font-display mt-3 max-w-[min(100%,40rem)] text-balance text-[1.875rem] font-medium leading-[1.08] tracking-[-0.02em] text-[#F0F0FF] sm:text-[2.25rem] md:text-[2.5rem]">
            {study.shortTitle}
          </h1>
        </header>
      </div>

      <div className="mt-2 w-full px-4 sm:mt-3 sm:px-8 md:px-10 lg:px-16">
        <div className="mx-auto w-full max-w-6xl">
          <section aria-labelledby="project-media-heading" className="space-y-5">
            <h2 id="project-media-heading" className="sr-only">
              Project media
            </h2>
            <div className="overflow-hidden rounded-xl border border-[#1E1E35] bg-[#0F0F1A] shadow-lg">
              <CaseStudyHeroScroll
                src={tallScrollSrc}
                alt={tallAlt}
                sizes="(max-width: 768px) 100vw, 72rem"
              />
            </div>
            <p className="mx-auto max-w-3xl text-[13px] leading-relaxed text-[#8888a0]">
              {study.caption}
            </p>
          </section>

          <section
            aria-labelledby="project-overview-heading"
            className="mx-auto mt-10 max-w-6xl space-y-4 sm:mt-12"
          >
            <h2
              id="project-overview-heading"
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8888a0]"
            >
              Primary view
            </h2>
            <div className="overflow-hidden rounded-xl border border-[#1E1E35] bg-[#0F0F1A]">
              <div className="flex w-full items-center justify-center bg-gradient-to-b from-[#0F0F1A] to-[#080810] px-2 py-4 sm:px-4 sm:py-6">
                <Image
                  src={heroCropSrc}
                  alt={heroCropAlt}
                  width={1920}
                  height={1080}
                  className="h-auto max-h-[min(56vh,520px)] w-full object-contain object-center"
                  sizes="(max-width: 768px) 100vw, 72rem"
                  quality={92}
                />
              </div>
            </div>
          </section>
        </div>
      </div>

      <div
        className={`${contentWell} mt-12 flex max-w-3xl flex-col gap-10 sm:mt-14 sm:gap-12 md:mt-16 md:gap-14`}
      >
        <section
          aria-labelledby="project-results-heading"
          className="rounded-xl border border-[#7C3FFF]/30 bg-gradient-to-br from-[#7C3FFF]/10 to-[#00E5FF]/5 p-6 sm:p-8 md:p-10"
        >
          <p
            id="project-results-heading"
            className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#00E5FF]"
          >
            Results
          </p>
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8888a0]">
            {study.cardStat}
          </p>
          <p className="font-display mt-4 max-w-[min(100%,36rem)] text-balance text-[1.5rem] font-medium leading-[1.15] tracking-[-0.02em] text-[#F0F0FF] sm:text-[1.75rem] md:text-[2rem]">
            {study.cardOutcome}
          </p>
          <p className="mt-6 text-[16px] leading-relaxed text-[#C8C8D8] sm:text-[17px]">
            {study.result}
          </p>
        </section>

        <StoryBlock id="project-problem" kicker="01" title="Problem">
          <p className="text-pretty">{study.problem}</p>
        </StoryBlock>
        <StoryBlock id="project-solution" kicker="02" title="What we did">
          <p className="text-pretty">{study.solution}</p>
        </StoryBlock>

        {study.role || study.tech?.length ? (
          <dl className="flex flex-wrap gap-x-10 gap-y-6 border-t border-[#1E1E35] pt-10 text-[13px]">
            {study.role ? (
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8888a0]">
                  Role
                </dt>
                <dd className="mt-2 text-[15px] text-[#C8C8D8]">
                  {study.role}
                </dd>
              </div>
            ) : null}
            {study.tech?.length ? (
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8888a0]">
                  Stack
                </dt>
                <dd className="mt-2 text-[15px] text-[#C8C8D8]">
                  {study.tech.join(" · ")}
                </dd>
              </div>
            ) : null}
          </dl>
        ) : null}

        <section
          aria-labelledby="project-gallery-heading"
          className="space-y-6 border-t border-[#1E1E35] pt-12"
        >
          <h2
            id="project-gallery-heading"
            className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8888a0]"
          >
            More from the project
          </h2>
          <div className="grid gap-6 sm:gap-8">
            <div className="overflow-hidden rounded-xl border border-[#1E1E35] bg-[#0F0F1A] p-3 sm:p-5">
              <Image
                src={tallScrollSrc}
                alt={tallAlt}
                width={1920}
                height={1080}
                className="h-auto w-full object-contain object-center"
                sizes="(max-width: 768px) 100vw, 42rem"
                quality={92}
              />
            </div>
          </div>
        </section>

        <div className="flex flex-col gap-3 border-t border-[#1E1E35] pt-12 sm:flex-row sm:items-center sm:gap-4">
          <a
            href={study.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex min-h-12 flex-1 items-center justify-center rounded-lg bg-gradient-to-r from-[#7C3FFF] to-[#00E5FF] px-6 text-[13px] font-semibold text-white shadow-lg transition-all duration-300 sm:flex-none ${focusRing} hover:shadow-[0_0_30px_-5px_rgba(124,63,255,0.4)]`}
          >
            Visit {study.liveLabel}
            <span className="ml-1.5 text-[0.85em] opacity-80" aria-hidden>
              &nearr;
            </span>
          </a>
          <Link
            href="/#contact"
            className={`inline-flex min-h-12 items-center justify-center rounded-lg border border-[#1E1E35] bg-transparent px-6 text-[13px] font-semibold text-[#C8C8D8] transition-all duration-300 ${focusRing} hover:border-[#7C3FFF]/50 hover:text-[#F0F0FF]`}
          >
            Start a project
          </Link>
        </div>
      </div>
    </article>
  );
}
