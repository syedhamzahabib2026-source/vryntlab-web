import type { ReactNode } from "react";

type SectionShellProps = {
  id?: string;
  /** Pass the section heading id for aria-labelledby */
  labelledBy?: string;
  as?: "section" | "aside";
  pad?: "default" | "compact" | "none";
  className?: string;
  children: ReactNode;
};

const padClass: Record<NonNullable<SectionShellProps["pad"]>, string> = {
  /** Tighter on phones to reduce scroll fatigue; opens up from `sm` */
  default:
    "py-7 sm:py-10 md:py-[3.25rem] lg:py-[4rem] xl:py-[4.5rem]",
  compact: "py-6 sm:py-8 md:py-10",
  none: "",
};

/**
 * Shared vertical rhythm and scroll offset for in-page sections.
 */
export function SectionShell({
  id,
  labelledBy,
  as: Tag = "section",
  pad = "default",
  className = "",
  children,
}: SectionShellProps) {
  const shared = {
    id,
    className:
      `scroll-mt-[calc(4.5rem+0.25rem)] sm:scroll-mt-24 md:scroll-mt-28 ${padClass[pad]} ${className}`.trim(),
    ...(labelledBy ? ({ "aria-labelledby": labelledBy } as const) : {}),
  };

  return Tag === "aside" ? (
    <aside {...shared}>{children}</aside>
  ) : (
    <section {...shared}>{children}</section>
  );
}
