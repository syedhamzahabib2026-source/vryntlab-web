"use client";

import { useCallback, useMemo } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { useConversion } from "@/components/conversion/ConversionContext";
import { contentWell, focusRing } from "@/components/layout/layoutTokens";
import { Reveal } from "@/components/motion/Reveal";
import { SectionIntro } from "@/components/layout/SectionIntro";
import { SectionShell } from "@/components/layout/SectionShell";
import { brandServiceLanes, brandServicesSection } from "@/lib/brand-knowledge";
import type { IntentId } from "@/lib/intent";

const services = brandServiceLanes;

const tabBtn = (active: boolean) =>
  `relative z-0 min-h-12 flex-1 overflow-hidden rounded-full px-3 py-2.5 text-center text-[12px] font-semibold tracking-tight transition-[color,transform] duration-300 ease-[var(--ease-out-premium)] motion-reduce:duration-150 sm:min-h-11 sm:px-4 sm:text-[13px] ${focusRing} active:scale-[0.99] ${
    active
      ? "text-white dark:text-zinc-950"
      : "text-zinc-600 dark:text-zinc-400 [@media(hover:hover)]:hover:text-zinc-950 dark:[@media(hover:hover)]:hover:text-zinc-100"
  }`;

const panelMotion = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export function ServicesExplorer() {
  const reduceMotion = useReducedMotion();
  const { selectedIntent, setSelectedIntent, openEstimate } = useConversion();

  const active = useMemo((): IntentId => {
    if (
      selectedIntent != null &&
      services.some((s) => s.intent === selectedIntent)
    ) {
      return selectedIntent;
    }
    return services[0]!.intent;
  }, [selectedIntent]);

  const current = services.find((s) => s.intent === active) ?? services[0]!;

  const onSelect = useCallback(
    (intent: IntentId) => {
      setSelectedIntent(intent);
    },
    [setSelectedIntent],
  );

  return (
    <SectionShell id="services" labelledBy="services-heading">
      <div className="flex flex-col gap-5 border-t border-[var(--border)] pt-6 sm:gap-8 sm:pt-8 md:gap-9 md:pt-9 lg:gap-10 lg:pt-10 xl:pt-11">
        <Reveal>
          <SectionIntro
            eyebrow={brandServicesSection.eyebrow}
            titleId="services-heading"
            title={brandServicesSection.title}
            description={<>{brandServicesSection.description}</>}
            align="start"
          />
        </Reveal>

        <div className={`${contentWell} relative`}>
          {services.map((s) => (
            <div
              key={s.id}
              id={s.id}
              aria-hidden
              className="pointer-events-none absolute left-0 top-[-5.5rem] h-px w-px scroll-mt-28 opacity-0 sm:top-[-6rem] md:top-[-6.5rem]"
            />
          ))}
          <Reveal delay={0.04}>
            <div className="rounded-[1.25rem] border border-[var(--border)] bg-[color-mix(in_oklab,var(--surface)_94%,var(--background-2))] p-1 shadow-[var(--shadow-sm)] ring-1 ring-black/[0.03] dark:bg-[color-mix(in_oklab,var(--surface)_88%,var(--surface-soft))] dark:ring-white/[0.04] sm:rounded-[1.4rem] sm:p-1.5 md:p-2">
              <LayoutGroup id="services-tabs">
                <div
                  className="flex flex-col gap-1 sm:flex-row sm:rounded-full sm:bg-[var(--surface-soft)] sm:p-1 dark:sm:bg-zinc-900/85"
                  role="tablist"
                  aria-label="Service lanes"
                >
                  {services.map((s) => {
                    const isActive = active === s.intent;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        id={`tab-${s.intent}`}
                        aria-controls={`panel-${s.intent}`}
                        className={tabBtn(isActive)}
                        onClick={() => onSelect(s.intent)}
                      >
                        {isActive && !reduceMotion ? (
                          <motion.span
                            layoutId="services-tab-highlight"
                            className="absolute inset-0 z-[-1] rounded-full bg-[var(--surface-ink)] shadow-[var(--shadow-sm)] dark:bg-white"
                            transition={{
                              type: "spring",
                              stiffness: 480,
                              damping: 36,
                            }}
                          />
                        ) : null}
                        {isActive && reduceMotion ? (
                          <span className="absolute inset-0 z-[-1] rounded-full bg-[var(--surface-ink)] dark:bg-white" />
                        ) : null}
                        <span className="relative z-[1]">{s.shortLabel}</span>
                      </button>
                    );
                  })}
                </div>
              </LayoutGroup>

              <div className="relative mt-3 min-h-[10.5rem] sm:mt-4 md:min-h-[10rem]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={current.id}
                    id={`panel-${current.intent}`}
                    role="tabpanel"
                    aria-labelledby={`tab-${current.intent}`}
                    className="rounded-2xl border border-[var(--border)] border-l-4 border-l-[var(--accent)] bg-[var(--surface)] p-5 shadow-[var(--shadow-md)] sm:p-6 md:p-7 dark:border-zinc-800/85 dark:border-l-teal-400/85 dark:bg-[color-mix(in_oklab,var(--surface)_95%,var(--surface-soft))]"
                    initial={reduceMotion ? false : panelMotion.initial}
                    animate={reduceMotion ? undefined : panelMotion.animate}
                    exit={reduceMotion ? undefined : panelMotion.exit}
                    transition={{
                      duration: reduceMotion ? 0 : 0.36,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <article>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-500">
                        {brandServicesSection.panelHeading}
                      </p>
                      <h3 className="font-display mt-2 text-balance text-xl font-normal tracking-[-0.02em] text-[var(--foreground)] sm:text-[1.35rem]">
                        {current.title}
                      </h3>
                      <p className="mt-2.5 max-w-prose text-[14px] leading-[1.62] text-zinc-600 sm:text-[15px] sm:leading-[1.64] dark:text-zinc-400">
                        {current.description}
                      </p>
                      <details className="group mt-4 rounded-xl border border-[var(--border)] bg-[color-mix(in_oklab,var(--surface-soft)_50%,var(--surface))] open:shadow-[var(--shadow-xs)] dark:border-zinc-800/90 dark:bg-zinc-900/35">
                        <summary className="cursor-pointer list-none px-3.5 py-3 text-[12px] font-semibold tracking-tight text-[var(--foreground)] transition-colors duration-200 [@media(hover:hover)]:hover:text-[var(--accent)] dark:[@media(hover:hover)]:hover:text-teal-300 [&::-webkit-details-marker]:hidden">
                          <span className="flex items-center justify-between gap-2">
                            {brandServicesSection.deliverablesLabel}
                            <span className="text-zinc-400 transition-transform duration-300 group-open:rotate-180 dark:text-zinc-500">
                              ↓
                            </span>
                          </span>
                        </summary>
                        <div className="border-t border-[var(--border)] px-3.5 pb-3.5 pt-2 text-[12px] leading-relaxed text-zinc-600 dark:border-zinc-800/80 dark:text-zinc-400 sm:text-[13px]">
                          {current.scope}
                        </div>
                      </details>
                      <div className="mt-5 flex flex-col gap-2.5 sm:mt-6">
                        <button
                          type="button"
                          onClick={() => openEstimate(current.intent)}
                          className={`inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[var(--surface-ink)] px-6 text-[13px] font-semibold tracking-tight text-white shadow-[var(--shadow-md)] transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-premium)] active:scale-[0.98] [@media(hover:hover)]:hover:shadow-[var(--shadow-glow)] dark:bg-white dark:text-zinc-950 sm:w-auto ${focusRing}`}
                        >
                          Estimate this lane
                        </button>
                        <a
                          href="#contact"
                          className={`inline-flex min-h-10 w-full items-center justify-center text-[13px] font-semibold text-[var(--accent)] underline decoration-[color-mix(in_oklab,var(--accent)_35%,transparent)] underline-offset-[6px] transition-[color,decoration-color] duration-300 ease-[var(--ease-out-premium)] sm:w-auto sm:justify-start ${focusRing} rounded-sm [@media(hover:hover)]:hover:decoration-[var(--accent)]`}
                        >
                          Full project brief
                        </a>
                      </div>
                    </article>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <p
            className={`${contentWell} border-l-2 border-[var(--accent)]/30 py-0.5 pl-3.5 text-[13px] leading-relaxed text-zinc-600 sm:pl-4 sm:text-[14px] dark:border-[var(--accent)]/35 dark:text-zinc-500`}
          >
            {brandServicesSection.footerNote}
          </p>
        </Reveal>
      </div>
    </SectionShell>
  );
}
