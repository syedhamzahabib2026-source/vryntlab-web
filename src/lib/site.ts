/** Shared site copy and navigation — edit once, use in header & footer */
export const siteEmail = "hello@trellisify.com";

export const siteTitle = "Trellisify — Web, Systems & Automation";

export const siteDescription =
  "Custom websites, redesigns, and automation systems built to perform in the real world.";

/** One-line positioning in footer (kept in sync with public-facing description) */
export const siteTagline = siteDescription;

export const navLinks = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
] as const;
