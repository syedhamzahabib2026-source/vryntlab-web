"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useId, useRef } from "react";
import { focusRing } from "@/components/layout/layoutTokens";
import { caseStudyPosterUrl, type CaseStudy } from "@/lib/case-studies";
import { motionEase } from "@/components/motion/Reveal";

type CaseStudyModalProps = {
  study: CaseStudy | null;
  onClose: () => void;
};

const labelClass =
  "text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-500";

const bodyClass =
  "text-[15px] leading-[1.62] tracking-[-0.01em] text-zinc-700 dark:text-zinc-300";

const panelTransition = {
  duration: 0.42,
  ease: motionEase,
} as const;

export function CaseStudyModal({ study, onClose }: CaseStudyModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const reduceMotion = useReducedMotion();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!study) return;
    document.addEventListener("keydown", handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => closeRef.current?.focus(), 50);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(t);
    };
  }, [study, handleKeyDown]);

  /** `_2` only — `_1` is hero poster / video still. */
  const galleryImages =
    study != null && study.media.images.length > 1
      ? study.media.images.slice(1)
      : [];

  return (
    <AnimatePresence>
      {study ? (
        <motion.div
          key={study.id}
          className="fixed inset-0 z-[100] flex items-end justify-center p-0 pb-[env(safe-area-inset-bottom,0px)] sm:items-center sm:p-5 sm:pb-5 md:p-8"
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: reduceMotion ? 0.01 : 0.22,
            ease: motionEase,
          }}
        >
          <motion.div
            className="absolute inset-0 cursor-default bg-zinc-950/45 backdrop-blur-[2px] dark:bg-black/65 dark:backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            role="presentation"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-10 flex max-h-[min(92dvh,900px)] w-full max-w-[min(100%,42rem)] flex-col overflow-hidden rounded-t-[1.35rem] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-md)] ring-1 ring-black/[0.03] sm:max-h-[min(90vh,900px)] sm:rounded-[1.75rem] dark:ring-white/[0.05]"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={
              reduceMotion
                ? { duration: 0.01 }
                : panelTransition
            }
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative shrink-0 bg-zinc-100 dark:bg-zinc-950">
              <div className="relative flex min-h-[12.5rem] w-full items-center justify-center overflow-hidden bg-zinc-100 sm:min-h-[14rem] md:min-h-[16rem] dark:bg-zinc-950">
                {study.media.previewVideoSrc ? (
                  <video
                    src={study.media.previewVideoSrc}
                    poster={caseStudyPosterUrl(study.media)}
                    controls
                    playsInline
                    className="max-h-[min(52vh,420px)] w-full object-contain object-center sm:max-h-[min(48vh,440px)]"
                    preload="metadata"
                  />
                ) : (
                  <Image
                    src={caseStudyPosterUrl(study.media)}
                    alt={study.imageAlts[0] ?? study.coverAlt}
                    width={1920}
                    height={1080}
                    className="h-auto max-h-[min(52vh,420px)] w-full object-contain object-center sm:max-h-[min(48vh,440px)]"
                    sizes="(max-width: 768px) 100vw, 672px"
                    quality={92}
                    priority
                  />
                )}
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  className={`absolute right-2.5 top-2.5 z-[3] flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.06] bg-white/95 text-zinc-800 shadow-[var(--shadow-xs)] backdrop-blur-sm transition-[background-color,transform] duration-300 ease-[var(--ease-out-premium)] motion-reduce:duration-150 active:scale-[0.98] ${focusRing} [@media(hover:hover)]:hover:bg-white sm:right-3 sm:top-3 sm:h-11 sm:w-11 dark:border-white/[0.08] dark:bg-zinc-900/95 dark:text-zinc-100 dark:[@media(hover:hover)]:hover:bg-zinc-800`}
                  aria-label="Close case study"
                >
                  <span className="text-xl leading-none font-light" aria-hidden>
                    ×
                  </span>
                </button>
              </div>

              {galleryImages.length > 0 ? (
                <div className="border-t border-[var(--border)] bg-[var(--surface-soft)] px-3 pb-3 pt-3 dark:border-zinc-800/80 sm:px-4 sm:pb-4 sm:pt-4">
                  <p className="mb-2.5 px-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500 sm:mb-3 sm:px-0">
                    On-site captures
                  </p>
                  <div className="grid grid-cols-1 gap-3 sm:gap-4">
                    {galleryImages.map((src, i) => {
                      const idx = i + 1;
                      const alt = study.imageAlts[idx] ?? study.coverAlt;
                      return (
                        <div
                          key={src}
                          className="flex min-h-0 w-full items-center justify-center rounded-xl bg-zinc-200/60 px-2 py-3 ring-1 ring-inset ring-black/[0.05] dark:bg-zinc-900/80 dark:ring-white/[0.06] sm:rounded-[1.05rem] sm:px-3 sm:py-4"
                        >
                          <Image
                            src={src}
                            alt={alt}
                            width={1920}
                            height={1080}
                            className="h-auto max-h-[min(48vh,380px)] w-full object-contain object-center sm:max-h-[min(44vh,400px)]"
                            sizes="(max-width: 768px) 100vw, 672px"
                            quality={92}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-7 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-9 sm:py-9 sm:pb-9 md:px-10 md:py-10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-2.5 py-0.5 text-[10px] font-medium tracking-tight text-zinc-600 sm:py-1 sm:text-[11px] dark:text-zinc-400">
                  {study.typeLabel}
                </span>
              </div>

              <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500">
                {study.client}
              </p>
              <h2
                id={titleId}
                className="mt-2 max-w-[22ch] text-pretty text-[1.5rem] font-semibold leading-[1.12] tracking-[-0.03em] text-zinc-950 sm:max-w-none sm:text-[1.65rem] dark:text-zinc-50"
              >
                {study.shortTitle}
              </h2>

              {study.role || study.tech?.length ? (
                <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2 border-b border-[var(--border)] pb-5 text-[12px] text-zinc-500 dark:border-zinc-800/80 dark:text-zinc-500">
                  {study.role ? (
                    <div className="min-w-[40%] flex-1 sm:min-w-0">
                      <dt className={labelClass}>Role</dt>
                      <dd className="mt-1 font-normal normal-case tracking-normal text-zinc-600 dark:text-zinc-400">
                        {study.role}
                      </dd>
                    </div>
                  ) : null}
                  {study.tech?.length ? (
                    <div className="min-w-[40%] flex-1 sm:min-w-0">
                      <dt className={labelClass}>Tech</dt>
                      <dd className="mt-1 font-normal normal-case tracking-normal text-zinc-600 dark:text-zinc-400">
                        {study.tech.join(" · ")}
                      </dd>
                    </div>
                  ) : null}
                </dl>
              ) : null}

              <div
                className={`space-y-0 ${study.role || study.tech?.length ? "mt-6" : "mt-7"} max-w-none sm:max-w-[38rem]`}
              >
                <div className="border-t border-[var(--border)] pt-6 first:border-t-0 first:pt-0 dark:border-zinc-800/70">
                  <p className={labelClass}>Challenge</p>
                  <p className={`mt-2.5 ${bodyClass}`}>{study.problem}</p>
                </div>
                <div className="border-t border-[var(--border)] pt-6 dark:border-zinc-800/70">
                  <p className={labelClass}>Solution</p>
                  <p
                    className={`mt-2.5 ${bodyClass} text-zinc-600 dark:text-zinc-400`}
                  >
                    {study.solution}
                  </p>
                </div>
                <div className="border-t border-[var(--border)] pt-6 dark:border-zinc-800/70">
                  <p className={labelClass}>Outcome</p>
                  <p className={`mt-2.5 ${bodyClass}`}>{study.result}</p>
                </div>
              </div>

              <p className="mt-6 text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-500">
                {study.caption}
              </p>

              <div className="mt-8 flex flex-col gap-3 border-t border-[var(--border)] pt-8 dark:border-zinc-800/80 sm:mt-9 sm:flex-row sm:items-stretch sm:gap-4 sm:pt-9">
                <a
                  href={study.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-zinc-950 px-6 text-[13px] font-semibold tracking-tight text-white shadow-[var(--shadow-xs)] transition-[background-color,transform] duration-300 ease-[var(--ease-out-premium)] motion-reduce:duration-150 active:scale-[0.99] active:bg-zinc-800 ${focusRing} [@media(hover:hover)]:hover:bg-zinc-800 sm:min-h-[3rem] sm:flex-none sm:px-9 dark:bg-zinc-50 dark:text-zinc-950 dark:active:bg-zinc-200 dark:[@media(hover:hover)]:hover:bg-zinc-200`}
                >
                  Visit {study.liveLabel}
                  <span className="ml-1.5 text-[0.85em] opacity-80" aria-hidden>
                    ↗
                  </span>
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className={`min-h-12 min-w-[5.5rem] rounded-full border border-transparent px-4 text-[13px] font-medium text-zinc-600 transition-[background-color,border-color,color,transform] duration-300 ease-[var(--ease-out-premium)] motion-reduce:duration-150 active:scale-[0.99] active:bg-zinc-100 ${focusRing} sm:min-h-[3rem] [@media(hover:hover)]:hover:border-[var(--border)] [@media(hover:hover)]:hover:bg-[var(--surface-soft)] [@media(hover:hover)]:hover:text-zinc-950 dark:text-zinc-400 dark:active:bg-zinc-900/60 dark:[@media(hover:hover)]:hover:text-zinc-50`}
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
