"use client";

import { useCallback, useState } from "react";
import { LayoutGroup, motion, useReducedMotion } from "motion/react";
import { useConversion } from "@/components/conversion/ConversionContext";
import { contentWell, focusRing } from "@/components/layout/layoutTokens";
import { Reveal } from "@/components/motion/Reveal";
import { SectionShell } from "@/components/layout/SectionShell";
import { brandIntentTriad, brandPathSelector } from "@/lib/brand-knowledge";
import {
  getIntentById,
  intentOptions,
  type PathIntentId,
} from "@/lib/intent";

function pulseServiceCard(elementId: string) {
  if (typeof document === "undefined") return;
  const anchor = document.getElementById(elementId);
  const section = document.getElementById("services");
  if (anchor) anchor.scrollIntoView({ behavior: "smooth", block: "center" });
  const pulseEl = section ?? anchor;
  if (!pulseEl) return;
  pulseEl.classList.add(
    "ring-2",
    "ring-[var(--accent)]/45",
    "shadow-[var(--shadow-glow)]",
    "rounded-[1.5rem]",
  );
  window.setTimeout(() => {
    pulseEl.classList.remove(
      "ring-2",
      "ring-[var(--accent)]/45",
      "shadow-[var(--shadow-glow)]",
      "rounded-[1.5rem]",
    );
  }, 2200);
}

const optionShell =
  `relative z-0 flex min-h-12 w-full flex-col items-start justify-center gap-1 overflow-hidden rounded-2xl border px-4 py-3.5 text-left transition-[border-color,box-shadow,transform] duration-300 ease-[var(--ease-out-premium)] motion-reduce:duration-150 ${focusRing} active:scale-[0.99] sm:min-h-0 sm:px-5 sm:py-4`;

function PathIntentTriad({ intentId }: { intentId: PathIntentId }) {
  const triad = brandIntentTriad[intentId];
  return (
    <div className="mt-4 grid gap-3 rounded-xl border border-[var(--border)] bg-[color-mix(in_oklab,var(--surface-soft)_55%,var(--surface))] p-3.5 sm:grid-cols-3 sm:gap-3 sm:p-4 dark:border-zinc-700/80 dark:bg-zinc-900/45">
      <div className="min-w-0 sm:border-r sm:border-[var(--border)] sm:pr-3 dark:sm:border-zinc-700/80">
        <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-500">
          {triad.frictionLabel}
        </p>
        <p className="mt-1.5 text-[13px] font-medium leading-snug text-[var(--foreground)] sm:text-[13px]">
          {triad.friction}
        </p>
      </div>
      <div className="min-w-0 sm:border-r sm:border-[var(--border)] sm:pr-3 dark:sm:border-zinc-700/80">
        <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-500">
          {triad.fixLabel}
        </p>
        <p className="mt-1.5 text-[13px] font-medium leading-snug text-[var(--foreground)] sm:text-[13px]">
          {triad.fix}
        </p>
      </div>
      <div className="min-w-0">
        <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-500">
          {triad.outcomeLabel}
        </p>
        <p className="mt-1.5 text-[13px] font-medium leading-snug text-[var(--foreground)] sm:text-[13px]">
          {triad.outcome}
        </p>
      </div>
    </div>
  );
}

export function NeedPathSelector() {
  const reduceMotion = useReducedMotion();
  const { setSelectedIntent, openEstimate } = useConversion();
  const [active, setActive] = useState<PathIntentId | null>(null);

  const selected = active ? getIntentById(active) : null;

  const onPick = useCallback(
    (id: PathIntentId) => {
      setActive(id);
      setSelectedIntent(id);
    },
    [setSelectedIntent],
  );

  const onSeeService = useCallback(() => {
    if (!selected) return;
    pulseServiceCard(selected.serviceSectionId);
  }, [selected]);

  return (
    <SectionShell id="path" labelledBy="path-heading" pad="compact">
      <Reveal>
        <div className={contentWell}>
          <div className="sm:px-1">
            <header className="max-w-2xl">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)] sm:tracking-[0.26em]">
                {brandPathSelector.eyebrow}
              </p>
              <h2
                id="path-heading"
                className="font-display mt-2 text-balance text-[1.5rem] font-normal leading-[1.08] tracking-[-0.03em] text-[var(--foreground)] sm:mt-3 sm:text-[1.75rem] md:text-[2rem]"
              >
                {brandPathSelector.title}
              </h2>
              <p className="mt-2 max-w-xl text-pretty text-[0.9375rem] leading-relaxed text-zinc-600 dark:text-zinc-400 sm:mt-3 sm:text-[1rem]">
                {brandPathSelector.description}
              </p>
            </header>

            <LayoutGroup id="path-lanes">
              <div className="mt-6 grid gap-2.5 sm:mt-8 sm:grid-cols-3 sm:gap-3 md:gap-3.5">
                {intentOptions.map((opt) => {
                  const pressed = active === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => onPick(opt.id as PathIntentId)}
                      className={`${optionShell} ${
                        pressed
                          ? "border-[var(--accent)]/45 shadow-[var(--shadow-md)] dark:border-[var(--accent)]/40"
                          : "border-[var(--border)] bg-[var(--surface)]/80 shadow-[var(--shadow-xs)] backdrop-blur-[2px] dark:border-zinc-700/80 dark:bg-zinc-900/40 [@media(hover:hover)]:hover:border-[var(--border-strong)] [@media(hover:hover)]:hover:shadow-[var(--shadow-sm)]"
                      }`}
                      aria-pressed={pressed}
                    >
                      {pressed && !reduceMotion ? (
                        <motion.span
                          layoutId="path-lane-highlight"
                          className="absolute inset-0 -z-10 rounded-[inherit] bg-[color-mix(in_oklab,var(--accent-muted)_42%,var(--surface))] dark:bg-[color-mix(in_oklab,var(--accent-muted)_28%,var(--surface-soft))]"
                          transition={{
                            type: "spring",
                            stiffness: 520,
                            damping: 38,
                          }}
                        />
                      ) : pressed ? (
                        <span className="absolute inset-0 -z-10 rounded-[inherit] bg-[color-mix(in_oklab,var(--accent-muted)_42%,var(--surface))] dark:bg-[color-mix(in_oklab,var(--accent-muted)_28%,var(--surface-soft))]" />
                      ) : null}
                      <span className="relative z-10 text-[13px] font-semibold tracking-tight text-[var(--foreground)] sm:text-[14px]">
                        {opt.label}
                      </span>
                      <span className="relative z-10 text-[11px] leading-snug text-zinc-500 dark:text-zinc-500 sm:text-[12px]">
                        {pressed
                          ? brandPathSelector.laneHintSelected
                          : brandPathSelector.laneHintDefault}
                      </span>
                    </button>
                  );
                })}
              </div>
            </LayoutGroup>

            {selected ? (
              <motion.div
                key={selected.id}
                initial={reduceMotion ? false : { opacity: 0, y: 10, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.38,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mt-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--shadow-md)] ring-1 ring-black/[0.03] sm:mt-6 sm:p-5 dark:border-zinc-700/75 dark:bg-[color-mix(in_oklab,var(--surface)_92%,var(--surface-soft))] dark:ring-white/[0.04]"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)] dark:text-teal-300/90">
                  {brandPathSelector.panelKicker}
                </p>
                <PathIntentTriad intentId={selected.id as PathIntentId} />
                <p className="mt-4 text-[1.0625rem] font-semibold tracking-[-0.02em] text-[var(--foreground)] sm:mt-5 sm:text-lg">
                  {selected.headline}
                </p>
                <ul className="mt-3 space-y-2 text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-[14px]">
                  {selected.outcomes.map((line) => (
                    <li key={line} className="flex gap-2">
                      <span
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)] shadow-[0_0_0_3px_var(--accent-muted)] dark:shadow-[0_0_0_3px_rgba(94,234,212,0.12)]"
                        aria-hidden
                      />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center">
                  <button
                    type="button"
                    onClick={() => openEstimate(selected.id)}
                    className={`inline-flex min-h-11 flex-1 items-center justify-center rounded-full bg-[var(--surface-ink)] px-5 text-[13px] font-semibold tracking-tight text-white shadow-[var(--shadow-md)] transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-premium)] active:scale-[0.98] dark:bg-white dark:text-zinc-950 sm:flex-none ${focusRing} [@media(hover:hover)]:hover:shadow-[var(--shadow-glow)]`}
                  >
                    Get an estimate
                  </button>
                  <button
                    type="button"
                    onClick={onSeeService}
                    className={`inline-flex min-h-11 flex-1 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-5 text-[13px] font-semibold tracking-tight text-[var(--foreground)] transition-[transform,background-color,border-color] duration-300 ease-[var(--ease-out-premium)] active:scale-[0.98] dark:border-zinc-600 dark:bg-zinc-800/80 sm:flex-none ${focusRing} [@media(hover:hover)]:hover:border-[var(--accent)]/35`}
                  >
                    See matching service
                  </button>
                </div>
              </motion.div>
            ) : null}
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}
