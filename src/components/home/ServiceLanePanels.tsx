import Link from "next/link";
import { contentWell, focusRing } from "@/components/layout/layoutTokens";
import { Reveal } from "@/components/motion/Reveal";
import { brandServiceLanes, brandServicesSection } from "@/lib/brand-knowledge";

const panelClass =
  "scroll-mt-28 rounded-2xl border border-[var(--border)] bg-[color-mix(in_oklab,var(--surface-soft)_40%,var(--surface))] p-6 shadow-[var(--shadow-xs)] ring-1 ring-black/[0.02] sm:p-7 dark:border-zinc-800/85 dark:bg-[color-mix(in_oklab,var(--surface)_88%,var(--surface-soft))] dark:ring-white/[0.04]";

export function ServiceLanePanels() {
  return (
    <section
      className="border-t border-[var(--border)] pt-10 sm:pt-12 md:pt-14"
      aria-labelledby="service-lanes-heading"
    >
      <div className={contentWell}>
        <Reveal>
          <h2
            id="service-lanes-heading"
            className="font-display text-balance text-[1.375rem] font-normal leading-[1.15] tracking-[-0.03em] text-[var(--foreground)] sm:text-[1.5rem] md:text-[1.625rem]"
          >
            {brandServicesSection.title}
          </h2>
          <p className="mt-2 max-w-2xl text-[0.9375rem] leading-relaxed text-zinc-600 sm:text-[1rem] dark:text-zinc-400">
            Three ways we usually engage — pick the lane that matches how you work.
          </p>
        </Reveal>
        <div className="mt-8 flex flex-col gap-6 sm:mt-10 sm:gap-7">
          {brandServiceLanes.map((lane, i) => (
            <Reveal key={lane.id} delay={i * 0.04}>
              <article id={lane.id} className={panelClass}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)] dark:text-teal-300/90">
                  {lane.shortLabel}
                </p>
                <h3 className="mt-2 font-display text-xl font-normal tracking-[-0.02em] text-[var(--foreground)] sm:text-[1.35rem]">
                  {lane.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
                  {lane.description}
                </p>
                <p className="mt-4 border-l-2 border-[var(--accent)]/35 py-0.5 pl-3.5 text-[13px] leading-relaxed text-zinc-600 sm:pl-4 sm:text-[14px] dark:border-teal-400/30 dark:text-zinc-400">
                  <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                    {brandServicesSection.panelHeading}:{" "}
                  </span>
                  {lane.scope}
                </p>
                <div className="mt-5">
                  <Link
                    href="/#contact"
                    className={`inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--surface-ink)] px-5 text-[13px] font-semibold tracking-tight text-white shadow-[var(--shadow-sm)] transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-premium)] active:scale-[0.98] dark:bg-white dark:text-zinc-950 ${focusRing} [@media(hover:hover)]:hover:shadow-[var(--shadow-glow)]`}
                  >
                    Start a conversation
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
