"use client";

import { useCallback, useState, type KeyboardEvent } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { focusRing } from "@/components/layout/layoutTokens";
import { SectionIntro } from "@/components/layout/SectionIntro";
import { SectionShell } from "@/components/layout/SectionShell";
import type { CaseStudy } from "@/lib/case-studies";
import { caseStudies } from "@/lib/case-studies";
import { CaseStudyModal } from "./CaseStudyModal";
import { CaseStudyPreviewMedia } from "./CaseStudyPreviewMedia";

/** Editorial card — matted media, calmer chrome, clearer depth on hover */
const cardShell = `group/case relative cursor-pointer overflow-hidden rounded-[1.85rem] border border-[var(--border)] bg-[var(--surface)] text-left shadow-[var(--shadow-sm)] ring-1 ring-black/[0.03] transition-[box-shadow,border-color,transform] duration-[480ms] ease-[var(--ease-out-premium)] active:scale-[0.997] dark:border-zinc-800/80 dark:ring-white/[0.04] [@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:border-zinc-300/65 [@media(hover:hover)]:hover:shadow-[var(--shadow-md)] dark:[@media(hover:hover)]:hover:border-zinc-600/42 motion-reduce:transform-none ${focusRing}`;

export function FeaturedWork() {
  const [openStudy, setOpenStudy] = useState<CaseStudy | null>(null);

  const open = useCallback((study: CaseStudy) => setOpenStudy(study), []);
  const close = useCallback(() => setOpenStudy(null), []);

  const onCardKeyDown = useCallback(
    (e: KeyboardEvent, study: CaseStudy) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open(study);
      }
    },
    [open],
  );

  return (
    <>
      <SectionShell id="work" labelledBy="work-heading">
        <div className="flex flex-col gap-10 border-t border-[var(--border)] pt-10 sm:gap-11 sm:pt-11 md:gap-12 md:pt-12 lg:gap-14 lg:pt-14 xl:gap-[3.75rem] xl:pt-16">
          <Reveal>
            <SectionIntro
              eyebrow="Selected work"
              titleId="work-heading"
              title="Recent work"
              description={
                <>
                  Three live builds—presented here as case studies. Co-shipped
                  with each client&apos;s developers; VryntLab led what you see
                  and click.
                </>
              }
              align="start"
            />
          </Reveal>

          <StaggerGroup className="flex flex-col gap-12 sm:gap-14 md:gap-16 lg:gap-[4.25rem] xl:gap-24">
            {caseStudies.map((study, index) => {
              const mediaFirstVisual = index % 2 === 0;
              const n = String(index + 1).padStart(2, "0");

              const copyCell = mediaFirstVisual
                ? "lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:border-l lg:border-[var(--border)] lg:bg-[color-mix(in_oklab,var(--surface-soft)_38%,var(--surface))] lg:px-10 lg:py-14 xl:px-12 xl:py-[3.65rem] dark:lg:bg-[color-mix(in_oklab,var(--surface-soft)_28%,var(--surface))]"
                : "lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:border-r lg:border-[var(--border)] lg:bg-[color-mix(in_oklab,var(--surface-soft)_38%,var(--surface))] lg:px-10 lg:py-14 xl:px-12 xl:py-[3.65rem] dark:lg:bg-[color-mix(in_oklab,var(--surface-soft)_28%,var(--surface))]";

              const mediaCell = mediaFirstVisual
                ? "lg:col-span-7 lg:col-start-1 lg:row-start-1 lg:bg-[color-mix(in_oklab,var(--surface-soft)_22%,var(--background))] lg:p-3.5 xl:p-4 dark:lg:bg-[color-mix(in_oklab,var(--surface)_40%,var(--background))]"
                : "lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:bg-[color-mix(in_oklab,var(--surface-soft)_22%,var(--background))] lg:p-3.5 xl:p-4 dark:lg:bg-[color-mix(in_oklab,var(--surface)_40%,var(--background))]";

              return (
                <StaggerItem key={study.id}>
                  <article
                    className={`grid grid-cols-1 lg:grid-cols-12 lg:items-stretch ${cardShell}`}
                    role="button"
                    tabIndex={0}
                    aria-label={`Open case study: ${study.client}`}
                    onClick={() => open(study)}
                    onKeyDown={(e) => onCardKeyDown(e, study)}
                  >
                    <div
                      className={`order-2 flex flex-col justify-center border-t border-[var(--border)] px-5 py-9 dark:border-zinc-800/80 sm:px-7 sm:py-10 md:px-8 md:py-11 lg:order-none lg:border-t-0 ${copyCell}`}
                    >
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--accent)] dark:opacity-90">
                        Case study · {n}
                      </p>
                      <span className="mt-4 inline-flex w-fit rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-2.5 py-0.5 text-[10px] font-medium tracking-tight text-zinc-600 dark:text-zinc-400 sm:py-1 sm:text-[11px]">
                        {study.typeLabel}
                      </span>
                      <h3 className="mt-4 text-lg font-semibold tracking-[-0.025em] text-zinc-950 sm:mt-5 sm:text-xl md:text-[1.35rem] dark:text-zinc-50">
                        {study.client}
                      </h3>
                      <p className="mt-2 max-w-[34ch] text-[14px] font-medium leading-snug tracking-[-0.012em] text-zinc-800 sm:text-[15px] dark:text-zinc-200">
                        {study.shortTitle}
                      </p>
                      <p className="mt-3 max-w-[38ch] text-[13px] leading-[1.55] text-zinc-600 dark:text-zinc-400 sm:mt-3.5">
                        {study.problem}
                      </p>
                      <p className="mt-6 sm:mt-7">
                        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-700 shadow-[var(--shadow-xs)] transition-[border-color,background-color,box-shadow,transform] duration-[480ms] ease-[var(--ease-out-premium)] dark:border-zinc-700/85 dark:bg-[var(--surface)] dark:text-zinc-200 [@media(hover:hover)]:group-hover/case:border-[var(--accent)]/35 [@media(hover:hover)]:group-hover/case:bg-[color-mix(in_oklab,var(--surface)_92%,var(--accent-muted))] [@media(hover:hover)]:group-hover/case:shadow-[var(--shadow-sm)] dark:[@media(hover:hover)]:group-hover/case:border-[var(--accent)]/30">
                          View case study
                          <span
                            aria-hidden
                            className="text-[0.95em] transition-transform duration-[480ms] ease-[var(--ease-out-premium)] [@media(hover:hover)]:group-hover/case:translate-x-0.5"
                          >
                            →
                          </span>
                        </span>
                      </p>
                      <span className="sr-only">
                        Opens a detailed panel with solution, outcome, and live
                        link.
                      </span>
                    </div>

                    <div
                      className={`order-1 overflow-hidden bg-zinc-100 dark:bg-zinc-950 lg:order-none ${mediaCell}`}
                    >
                      <figure className="relative m-0 flex h-full min-h-0 flex-col lg:overflow-hidden lg:rounded-[1.35rem] lg:ring-1 lg:ring-black/[0.06] lg:shadow-[var(--shadow-xs)] dark:lg:ring-white/[0.07]">
                        <div className="relative aspect-[4/5] min-h-[228px] w-full min-w-0 sm:aspect-[4/3] sm:min-h-[248px] md:aspect-[16/10] md:min-h-[272px] lg:aspect-auto lg:min-h-[min(44vh,360px)] xl:min-h-[min(48vh,400px)]">
                          <div className="absolute inset-0 flex items-center justify-center overflow-hidden lg:rounded-t-[1.35rem]">
                            <div className="relative h-full w-full origin-center transition-transform duration-[640ms] ease-[var(--ease-out-premium)] [@media(hover:hover)]:group-hover/case:scale-[1.012] motion-reduce:transform-none">
                              <CaseStudyPreviewMedia
                                study={study}
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 56vw"
                              />
                            </div>
                          </div>
                          <div
                            className="pointer-events-none absolute inset-0 z-[2] ring-1 ring-inset ring-black/[0.05] dark:ring-white/[0.07]"
                            aria-hidden
                          />
                          <div
                            className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-zinc-950/[0.14] via-transparent to-transparent [@media(hover:hover)]:group-hover/case:from-zinc-950/[0.22] dark:from-black/28 dark:[@media(hover:hover)]:group-hover/case:from-black/38"
                            aria-hidden
                          />
                        </div>
                        <figcaption className="border-t border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-left text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500 dark:border-zinc-800/70 dark:bg-[var(--surface)] dark:text-zinc-500 sm:px-6 sm:py-3.5 lg:rounded-b-[1.35rem] lg:px-8">
                          {study.caption}
                        </figcaption>
                      </figure>
                    </div>
                  </article>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </SectionShell>

      <CaseStudyModal study={openStudy} onClose={close} />
    </>
  );
}
