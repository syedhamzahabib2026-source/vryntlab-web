import { Reveal } from "@/components/motion/Reveal";
import { contentWell } from "@/components/layout/layoutTokens";
import { SectionShell } from "@/components/layout/SectionShell";

const segments = [
  "SaaS",
  "Professional services",
  "E-commerce",
  "Teams shipping online",
] as const;

/** Matches Process / Services card framing (radius, padding, border, ring, shadow). */
const credibilityPanelClass =
  "rounded-2xl border border-[var(--border)] bg-[color-mix(in_oklab,var(--surface)_88%,var(--surface-soft))] p-6 shadow-[var(--shadow-sm)] ring-1 ring-black/[0.02] sm:p-7 md:p-8 lg:p-9 dark:bg-[color-mix(in_oklab,var(--surface)_75%,var(--surface-soft))] dark:ring-white/[0.04]";

export function CredibilityStrip() {
  return (
    <Reveal>
      <SectionShell
        as="aside"
        pad="none"
        labelledBy="credibility-heading"
        className="my-6 sm:my-8 md:my-9"
      >
        <div className={contentWell}>
          <div className={credibilityPanelClass}>
            <div className="grid gap-7 sm:gap-8 md:grid-cols-12 md:items-center md:gap-x-10 md:gap-y-6 lg:gap-x-12">
              <h2 id="credibility-heading" className="sr-only">
                Who we serve
              </h2>
              <p className="min-w-0 max-w-xl text-[14px] font-medium leading-[1.62] text-zinc-700 sm:text-[15px] sm:leading-[1.65] md:col-span-7 md:max-w-none dark:text-zinc-300">
                Built for startups and growing teams: most of our clients sell or
                support something on the web. They want a partner who can ship without
                a month of meetings first—clear communication, sensible timelines.
              </p>
              <ul className="flex min-w-0 flex-wrap gap-2.5 sm:gap-3 md:col-span-5 md:justify-end md:gap-2.5 lg:gap-3">
                {segments.map((label) => (
                  <li key={label}>
                    <span className="inline-flex min-h-9 items-center rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-600 shadow-[var(--shadow-xs)] sm:min-h-0 sm:py-1.5 sm:tracking-[0.14em] dark:border-zinc-700/80 dark:bg-[var(--surface)] dark:text-zinc-400">
                      {label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </SectionShell>
    </Reveal>
  );
}
