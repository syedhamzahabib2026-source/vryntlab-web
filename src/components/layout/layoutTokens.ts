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

/**
 * Full-bleed dark slab wrapper — pairs with `.slab-dark` in globals.css.
 * Inner content should use `contentWell` for alignment with the page grid.
 */
export const slabBleed = "slab-bleed slab-dark overflow-hidden";

/** Relative stacking above slab grid/glow pseudo-elements */
export const slabContent = "relative z-[1]";
