import type { ReactNode } from "react";

type SectionIntroProps = {
  eyebrow: string;
  titleId: string;
  title: ReactNode;
  description?: ReactNode;
  /** Start = editorial column; center = narrow centered block */
  align?: "start" | "center";
  /** `onDark` = headings on forced dark slabs */
  tone?: "default" | "onDark";
  className?: string;
};

const eyebrowDefault =
  "text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7C3FFF]";

const eyebrowOnDark =
  "text-[11px] font-semibold uppercase tracking-[0.22em] text-[#00E5FF]";

const titleDefault =
  "font-display mt-3 text-balance text-[1.625rem] font-medium leading-[1.1] tracking-[-0.02em] text-[#F0F0FF] sm:mt-4 sm:text-[1.875rem] md:text-[2.25rem] lg:text-[2.5rem]";

const titleOnDark =
  "font-display mt-3 text-balance text-[1.625rem] font-medium leading-[1.1] tracking-[-0.02em] text-[#F0F0FF] sm:mt-4 sm:text-[1.875rem] md:text-[2.25rem] lg:text-[2.5rem]";

const ledeDefault =
  "section-lede mt-4 max-w-[min(100%,38rem)] text-pretty text-[0.9375rem] leading-[1.65] text-[#C8C8D8] sm:mt-5 sm:text-[1.0625rem] md:mt-6 md:max-w-[40rem] md:text-lg";

const ledeOnDark =
  "section-lede mt-4 max-w-[min(100%,38rem)] text-pretty text-[0.9375rem] leading-[1.65] text-[#C8C8D8] sm:mt-5 sm:text-[1.0625rem] md:mt-6 md:max-w-[40rem] md:text-lg";

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
