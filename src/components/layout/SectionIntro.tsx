import type { ReactNode } from "react";

type SectionIntroProps = {
  eyebrow: string;
  titleId: string;
  title: ReactNode;
  description?: ReactNode;
  /** Start = editorial column; center = narrow centered block */
  align?: "start" | "center";
  /** `onDark` = headings on forced dark slabs (mint eyebrow, zinc text) */
  tone?: "default" | "onDark";
  className?: string;
};

const eyebrowDefault =
  "text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)] opacity-90 sm:tracking-[0.26em] dark:opacity-95";

const eyebrowOnDark =
  "text-[10px] font-semibold uppercase tracking-[0.22em] text-teal-300/95 sm:tracking-[0.26em]";

const titleDefault =
  "font-display mt-3 text-balance text-[1.625rem] font-normal leading-[1.1] tracking-[-0.024em] text-zinc-950 sm:mt-4 sm:text-[1.875rem] sm:leading-[1.08] md:text-[2.25rem] md:tracking-[-0.028em] lg:text-[2.6rem] lg:leading-[1.06] xl:text-[2.7rem] dark:text-zinc-50";

const titleOnDark =
  "font-display mt-3 text-balance text-[1.625rem] font-normal leading-[1.1] tracking-[-0.024em] text-zinc-50 sm:mt-4 sm:text-[1.875rem] sm:leading-[1.08] md:text-[2.25rem] md:tracking-[-0.028em] lg:text-[2.6rem] lg:leading-[1.06] xl:text-[2.7rem]";

const ledeDefault =
  "section-lede mt-4 max-w-[min(100%,38rem)] text-pretty text-[0.9375rem] font-normal leading-[1.58] text-zinc-600 sm:mt-5 sm:text-[1.0625rem] sm:leading-[1.62] md:mt-6 md:max-w-[40rem] md:text-lg md:leading-[1.66] dark:text-zinc-400";

const ledeOnDark =
  "section-lede mt-4 max-w-[min(100%,38rem)] text-pretty text-[0.9375rem] font-normal leading-[1.58] text-zinc-400 sm:mt-5 sm:text-[1.0625rem] sm:leading-[1.62] md:mt-6 md:max-w-[40rem] md:text-lg md:leading-[1.66]";

/**
 * Section header: kicker, display heading, optional lede with editorial measure.
 */
export function SectionIntro({
  eyebrow,
  titleId,
  title,
  description,
  align = "start",
  tone = "default",
  className = "",
}: SectionIntroProps) {
  const alignClass =
    align === "center"
      ? "mx-auto max-w-2xl text-center [&_.section-lede]:mx-auto"
      : "max-w-[min(100%,40rem)] text-left lg:max-w-[42rem]";

  const eyebrowClass = tone === "onDark" ? eyebrowOnDark : eyebrowDefault;
  const titleClass = tone === "onDark" ? titleOnDark : titleDefault;
  const ledeClass = tone === "onDark" ? ledeOnDark : ledeDefault;

  return (
    <header className={`${alignClass} ${className}`.trim()}>
      <p className={eyebrowClass}>{eyebrow}</p>
      <h2 id={titleId} className={titleClass}>
        {title}
      </h2>
      {description ? <div className={ledeClass}>{description}</div> : null}
    </header>
  );
}
