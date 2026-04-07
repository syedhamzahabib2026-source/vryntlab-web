import { Reveal } from "@/components/motion/Reveal";
import { proseComfort } from "@/components/layout/layoutTokens";
import { SectionShell } from "@/components/layout/SectionShell";

const headingClass =
  "mt-3 max-w-[22ch] text-[1.5rem] font-semibold leading-[1.12] tracking-[-0.03em] text-zinc-950 text-balance sm:mt-4 sm:max-w-none sm:text-[1.875rem] sm:leading-[1.08] md:text-[2.125rem] md:tracking-[-0.033em] lg:text-[2.375rem] dark:text-zinc-50";

const bodyClass = `${proseComfort} max-w-[40ch] space-y-4 border-l-0 py-0 pl-0 text-[15px] leading-[1.62] text-zinc-600 sm:max-w-[42ch] sm:space-y-5 sm:border-l-2 sm:border-[var(--accent)]/22 sm:py-0.5 sm:pl-5 sm:text-[16px] sm:leading-[1.64] md:max-w-[44ch] lg:col-span-7 lg:col-start-6 lg:max-w-none lg:pl-8 dark:border-[var(--accent)]/28 dark:text-zinc-400`;

export function About() {
  return (
    <SectionShell id="about" labelledBy="about-heading">
      <Reveal>
        <div className="grid gap-7 border-t border-[var(--border)] pt-9 sm:gap-8 sm:pt-10 md:gap-9 md:pt-11 lg:grid-cols-12 lg:items-start lg:gap-x-14 lg:gap-y-0 lg:pt-14 xl:pt-[3.25rem]">
          <header className="lg:col-span-4 lg:max-w-none">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--accent)] opacity-90 sm:tracking-[0.24em] dark:opacity-95">
              About
            </p>
            <h2 id="about-heading" className={headingClass}>
              A small studio. Not a department store.
            </h2>
          </header>
          <div className={bodyClass}>
            <p>
              VryntLab is a small team that spends most of its time building on the
              web—shipping pages, fixing what breaks, and connecting the pieces
              behind the scenes.
            </p>
            <p>
              You talk directly to the people doing the work. No layers, no
              handoffs.
            </p>
            <p>
              We&apos;re straightforward about fit, budget, and timing. If
              something&apos;s off, we&apos;ll tell you early—before it turns into a
              bigger problem.
            </p>
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}
