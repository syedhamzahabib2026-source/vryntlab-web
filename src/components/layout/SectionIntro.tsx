import type { ReactNode } from "react";

type SectionIntroProps = {
  eyebrow: string;
  titleId: string;
  title: ReactNode;
  description?: ReactNode;
  /** Start = editorial column; center = narrow centered block */
  align?: "start" | "center";
  className?: string;
};

const eyebrowClass =
  "text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)] opacity-90 sm:tracking-[0.26em] dark:opacity-95";

const titleClass =
  "mt-3 text-[1.625rem] font-semibold leading-[1.1] tracking-[-0.032em] text-zinc-950 sm:mt-4 sm:text-[1.875rem] sm:leading-[1.08] md:text-[2.25rem] md:tracking-[-0.035em] lg:text-[2.65rem] xl:text-[2.75rem] dark:text-zinc-50";

const ledeClass =
  "section-lede mt-4 max-w-[min(100%,36rem)] text-pretty text-[0.9375rem] font-normal leading-[1.62] text-zinc-600 sm:mt-5 sm:text-[1.0625rem] sm:leading-[1.65] md:mt-6 md:max-w-[40rem] md:text-lg md:leading-[1.7] dark:text-zinc-400";

/**
 * Section header: kicker, display heading, optional lede with editorial measure.
 */
export function SectionIntro({
  eyebrow,
  titleId,
  title,
  description,
  align = "start",
  className = "",
}: SectionIntroProps) {
  const alignClass =
    align === "center"
      ? "mx-auto max-w-2xl text-center [&_.section-lede]:mx-auto"
      : "max-w-[min(100%,42rem)] text-left lg:max-w-[44rem]";

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
