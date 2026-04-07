/** Shared site copy and navigation — edit once, use in header & footer */

export const siteBrandName = "VryntLab";

/** Public paths under `/public` */
export const siteLogoSrc = "/brand/whitefont.png";
export const siteHeroShowcaseSrc = "/brand/figma-example.png";

export const siteEmail = "hello@vryntlab.com";

export const siteTitle = "VryntLab — Web, Systems & Automation";

export const siteDescription =
  "Websites, automations, and custom builds for teams that need the web to work—not just look good.";

/** One-line positioning in footer (kept in sync with public-facing description) */
export const siteTagline = siteDescription;

/** Primary / secondary CTAs — keep labels consistent site-wide */
export const ctaStartProject = "Start a Project";
export const ctaViewWork = "View Work";

export const navLinks = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
] as const;
