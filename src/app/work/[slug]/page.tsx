import type { ReactNode } from "react";
import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  caseStudyPosterUrl,
  getAllCaseStudySlugs,
  getCaseStudyBySlug,
} from "@/lib/case-studies";
import { CaseStudyHeroVideo } from "@/components/work/CaseStudyHeroVideo";
import { siteBrandName } from "@/lib/site";
import { contentWell, focusRing } from "@/components/layout/layoutTokens";

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
    openGraph: {
      title: `${study.client} — ${study.shortTitle}`,
      description: study.shortTitle,
      type: "article",
    },
  };
}

const kickerClass =
  "text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500";
const titleClass =
  "font-display text-[1.125rem] font-normal leading-snug tracking-[-0.02em] text-zinc-950 dark:text-zinc-50 sm:text-xl";
const bodyClass =
  "mt-4 text-[16px] leading-[1.7] text-zinc-600 dark:text-zinc-400 sm:text-[17px] sm:leading-[1.72]";

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
      className="rounded-2xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_88%,var(--surface-soft))] py-9 pl-6 pr-6 shadow-[var(--shadow-xs)] dark:border-zinc-800/85 dark:bg-[color-mix(in_srgb,var(--surface)_82%,var(--surface-soft))] sm:rounded-[1.35rem] sm:py-11 sm:pl-8 sm:pr-10 md:py-12 md:pl-10 md:pr-12"
    >
      <div className="border-l-[3px] border-[var(--accent)] pl-5 dark:border-teal-400/85 sm:pl-6">
        <p className={kickerClass}>{kicker}</p>
        <h2 id={id} className={`mt-2 ${titleClass}`}>
          {title}
        </h2>
        <div className={bodyClass}>{children}</div>
      </div>
    </section>
  );
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) notFound();

  const poster = caseStudyPosterUrl(study.media);
  const galleryImages =
    study.media.images.length > 1 ? study.media.images.slice(1) : [];

  return (
    <article className="flex flex-1 flex-col overflow-x-clip pb-14 pt-3 sm:pb-20 sm:pt-4 md:pt-5">
      <div className={`${contentWell} flex flex-col gap-8 sm:gap-10`}>
        <nav aria-label="Breadcrumb" className="text-[13px] text-zinc-500">
          <Link
            href="/#work"
            className={`font-medium text-[var(--accent)] underline decoration-[color-mix(in_oklab,var(--accent)_35%,transparent)] underline-offset-4 transition-colors ${focusRing} rounded-sm [@media(hover:hover)]:hover:decoration-[var(--accent)] dark:text-teal-300/90`}
          >
            ← Selected work
          </Link>
        </nav>

        <header className="max-w-3xl">
          <span className="inline-flex rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-2.5 py-0.5 text-[10px] font-medium tracking-tight text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-400">
            {study.typeLabel}
          </span>
          <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)] dark:text-teal-300/90">
            {study.client}
          </p>
          <h1 className="font-display mt-3 max-w-[min(100%,40rem)] text-balance text-[1.875rem] font-normal leading-[1.08] tracking-[-0.03em] text-zinc-950 sm:text-[2.25rem] md:text-[2.5rem] dark:text-zinc-50">
            {study.shortTitle}
          </h1>
        </header>
      </div>

      {/* Immersive media — breaks slightly wider than text for product-page feel */}
      <div className="mt-2 w-full px-4 sm:mt-3 sm:px-8 md:px-10 lg:px-16">
        <div className="mx-auto w-full max-w-6xl">
          <section aria-labelledby="case-media-heading" className="space-y-5">
            <h2 id="case-media-heading" className="sr-only">
              Project media
            </h2>
            <div className="overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-zinc-100 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.2),var(--shadow-md)] ring-1 ring-black/[0.04] dark:border-zinc-800/90 dark:bg-zinc-950 dark:ring-white/[0.06] sm:rounded-[1.5rem] md:rounded-[1.75rem]">
              <div className="flex min-h-[min(52vh,22rem)] w-full items-center justify-center bg-gradient-to-b from-zinc-100 to-zinc-200/80 sm:min-h-[min(56vh,28rem)] md:min-h-[min(62vh,34rem)] lg:min-h-[min(64vh,38rem)] dark:from-zinc-950 dark:to-zinc-950/95">
                {study.media.previewVideoSrc ? (
                  <CaseStudyHeroVideo
                    src={study.media.previewVideoSrc}
                    poster={poster}
                    className="max-h-[min(72vh,640px)] w-full object-contain object-center"
                  />
                ) : (
                  <Image
                    src={poster}
                    alt={study.imageAlts[0] ?? study.coverAlt}
                    width={1920}
                    height={1080}
                    className="h-auto max-h-[min(72vh,640px)] w-full object-contain object-center px-2 py-3 sm:px-4 sm:py-5"
                    sizes="(max-width: 768px) 100vw, 72rem"
                    quality={92}
                    priority
                  />
                )}
              </div>
            </div>
            <p className="mx-auto max-w-3xl text-[13px] leading-relaxed text-zinc-500 dark:text-zinc-500">
              {study.caption}
            </p>
          </section>
        </div>
      </div>

      <div
        className={`${contentWell} mt-12 flex max-w-3xl flex-col gap-10 sm:mt-14 sm:gap-12 md:mt-16 md:gap-14`}
      >
        <StoryBlock id="case-problem" kicker="01" title="Problem">
          <p className="text-pretty">{study.problem}</p>
        </StoryBlock>
        <StoryBlock id="case-solution" kicker="02" title="What we did">
          <p className="text-pretty">{study.solution}</p>
        </StoryBlock>
        <StoryBlock id="case-result" kicker="03" title="Result">
          <p className="text-pretty text-zinc-700 dark:text-zinc-300">
            {study.result}
          </p>
        </StoryBlock>

        {study.role || study.tech?.length ? (
          <dl className="flex flex-wrap gap-x-10 gap-y-6 border-t border-[var(--border)] pt-10 text-[13px] dark:border-zinc-800/80">
            {study.role ? (
              <div>
                <dt className={kickerClass}>Role</dt>
                <dd className="mt-2 text-[15px] text-zinc-700 dark:text-zinc-300">
                  {study.role}
                </dd>
              </div>
            ) : null}
            {study.tech?.length ? (
              <div>
                <dt className={kickerClass}>Stack</dt>
                <dd className="mt-2 text-[15px] text-zinc-700 dark:text-zinc-300">
                  {study.tech.join(" · ")}
                </dd>
              </div>
            ) : null}
          </dl>
        ) : null}

        {galleryImages.length > 0 ? (
          <section
            aria-labelledby="case-gallery-heading"
            className="space-y-6 border-t border-[var(--border)] pt-12 dark:border-zinc-800/80"
          >
            <h2
              id="case-gallery-heading"
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-500"
            >
              More from the project
            </h2>
            <div className="grid gap-6 sm:gap-8">
              {galleryImages.map((src, i) => {
                const idx = i + 1;
                const alt = study.imageAlts[idx] ?? study.coverAlt;
                return (
                  <div
                    key={src}
                    className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] p-3 shadow-[var(--shadow-xs)] dark:border-zinc-800/80 dark:bg-zinc-900/50 sm:rounded-2xl sm:p-5"
                  >
                    <Image
                      src={src}
                      alt={alt}
                      width={1920}
                      height={1080}
                      className="h-auto w-full object-contain object-center"
                      sizes="(max-width: 768px) 100vw, 42rem"
                      quality={92}
                    />
                  </div>
                );
              })}
            </div>
          </section>
        ) : null}

        <div className="flex flex-col gap-3 border-t border-[var(--border)] pt-12 sm:flex-row sm:items-center sm:gap-4 dark:border-zinc-800/80">
          <a
            href={study.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-[var(--surface-ink)] px-6 text-[13px] font-semibold tracking-tight text-white shadow-[var(--shadow-md)] transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-premium)] active:scale-[0.99] sm:flex-none dark:bg-white dark:text-zinc-950 ${focusRing} [@media(hover:hover)]:hover:shadow-[var(--shadow-glow)] dark:[@media(hover:hover)]:hover:bg-zinc-200`}
          >
            Visit {study.liveLabel}
            <span className="ml-1.5 text-[0.85em] opacity-80" aria-hidden>
              ↗
            </span>
          </a>
          <Link
            href="/#contact"
            className={`inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-6 text-[13px] font-semibold tracking-tight text-[var(--foreground)] transition-[transform,background-color] duration-300 ease-[var(--ease-out-premium)] active:scale-[0.99] dark:border-zinc-700 dark:bg-[var(--surface)] ${focusRing} [@media(hover:hover)]:hover:border-[var(--accent)]/35`}
          >
            Start a project
          </Link>
        </div>
      </div>
    </article>
  );
}
