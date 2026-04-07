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
  /** Mobile-tighter vertical rhythm; scales up for tablet/desktop */
  default:
    "py-10 sm:py-12 md:py-[3.75rem] lg:py-[4.75rem] xl:py-[5.25rem]",
  compact: "py-8 sm:py-9 md:py-11",
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
