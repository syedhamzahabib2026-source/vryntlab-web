import type { Metadata } from "next";
import Link from "next/link";
import { caseStudies } from "@/lib/case-studies";
import { siteBrandName } from "@/lib/site";
import { contentWell, focusRing } from "@/components/layout/layoutTokens";

export const metadata: Metadata = {
  title: `Work | ${siteBrandName}`,
  description:
    "Selected launches and partnerships — plus context on engagements we cannot show publicly.",
};

export default function WorkIndexPage() {
  return (
    <div className="flex flex-1 flex-col pb-16 pt-4 sm:pb-20 sm:pt-6">
      <div className={`${contentWell} max-w-3xl space-y-6`}>
        <nav aria-label="Breadcrumb" className="text-[13px] text-zinc-500">
          <Link
            href="/#work"
            className={`font-medium text-[var(--accent)] underline decoration-[color-mix(in_oklab,var(--accent)_35%,transparent)] underline-offset-4 transition-colors ${focusRing} rounded-sm [@media(hover:hover)]:hover:decoration-[var(--accent)] dark:text-teal-300/90`}
          >
            ← Home
          </Link>
        </nav>
        <header className="space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500">
            Work
          </p>
          <h1 className="font-display text-balance text-[2rem] font-normal leading-[1.08] tracking-[-0.03em] text-zinc-950 dark:text-zinc-50 sm:text-[2.25rem] md:text-[2.5rem]">
            Selected projects — a slice of what we ship
          </h1>
          <p className="max-w-2xl text-[16px] leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-[17px]">
            This page lists public projects. Many builds are confidential or live
            under partner brands; reach out if you need references closer to your
            industry.
          </p>
        </header>
      </div>

      <ul
        className={`${contentWell} mt-12 flex max-w-3xl flex-col gap-5 sm:mt-14 sm:gap-6`}
      >
        {caseStudies.map((study) => (
          <li key={study.id}>
            <Link
              href={`/work/${study.id}`}
              className={`group block rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-xs)] transition-[border-color,box-shadow,transform] duration-300 ease-[var(--ease-out-premium)] active:scale-[0.995] dark:border-zinc-800/85 dark:bg-zinc-900/40 sm:p-7 ${focusRing} [@media(hover:hover)]:hover:border-teal-400/25 [@media(hover:hover)]:hover:shadow-[var(--shadow-sm)]`}
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-500">
                {study.typeLabel}
              </span>
              <h2 className="mt-2 font-display text-lg font-normal tracking-[-0.02em] text-zinc-950 dark:text-zinc-50 sm:text-xl">
                {study.client}
              </h2>
              <p className="mt-2 text-[14px] leading-snug text-zinc-600 dark:text-zinc-400 sm:text-[15px]">
                {study.shortTitle}
              </p>
              <p className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--accent)] dark:text-teal-300/90">
                Open project
                <span
                  aria-hidden
                  className="transition-transform duration-300 [@media(hover:hover)]:group-hover:translate-x-0.5"
                >
                  →
                </span>
              </p>
            </Link>
          </li>
        ))}
      </ul>

      <div className={`${contentWell} mt-14 max-w-3xl`}>
        <Link
          href="/#contact"
          className={`inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--surface-ink)] px-5 text-[13px] font-semibold text-white shadow-[var(--shadow-md)] transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-premium)] active:scale-[0.99] dark:bg-white dark:text-zinc-950 ${focusRing} [@media(hover:hover)]:hover:shadow-[var(--shadow-glow)] dark:[@media(hover:hover)]:hover:bg-zinc-200`}
        >
          Start a project
        </Link>
      </div>
    </div>
  );
}
