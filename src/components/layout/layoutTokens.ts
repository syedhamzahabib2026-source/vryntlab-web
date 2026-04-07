/**
 * Shared layout tokens for homepage sections (Tailwind class fragments).
 */

/** Keyboard / visible focus — matches `--ring-focus` in globals.css */
export const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]";

export const contentWell = "mx-auto w-full max-w-6xl";

/** Narrow supporting line (footnotes, asides) */
export const narrowMeasure = "max-w-md";

/** Comfortable reading width for body copy */
export const proseComfort = "max-w-prose text-pretty";
