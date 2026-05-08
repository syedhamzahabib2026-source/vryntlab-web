/**
 * Shared layout tokens for homepage sections (Tailwind class fragments).
 * VryntLab Design System — Premium Dark Theme
 */

/** Keyboard / visible focus — violet accent ring */
export const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080810]";

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

/** Card styles with gradient border on hover */
export const cardBase = 
  "rounded-xl border border-[#1E1E35] bg-[#0F0F1A] transition-all duration-400 ease-[var(--ease-out-premium)]";

export const cardHover =
  "hover:border-[#7C3FFF]/30 hover:shadow-[0_0_30px_-10px_rgba(124,63,255,0.2)]";

/** Button base styles */
export const buttonBase =
  "inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-300 ease-[var(--ease-out-premium)]";

/** Primary gradient CTA button */
export const buttonPrimary =
  `${buttonBase} bg-gradient-to-r from-[#7C3FFF] to-[#00E5FF] text-white shadow-lg hover:shadow-[0_0_30px_-5px_rgba(124,63,255,0.4)]`;

/** Ghost button with violet border */
export const buttonGhost =
  `${buttonBase} border border-[#7C3FFF] text-[#7C3FFF] hover:bg-[#7C3FFF] hover:text-white`;
