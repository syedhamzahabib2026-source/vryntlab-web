/** Shared site copy and navigation — edit once, use in header & footer */

import {
  brandFooterTagline,
  brandMetaDescription,
  brandSiteTitle,
} from "@/lib/brand-knowledge";

export const siteBrandName = "VryntLab";

/** Public paths under `/public` */
export const siteLogoSrc = "/brand/whitefont.png";
export const siteHeroShowcaseSrc = "/brand/figma-example.png";

export const siteEmail = "hello@vryntlab.com";

export const siteTitle = brandSiteTitle;

export const siteDescription = brandMetaDescription;

/** One-line positioning in footer */
export const siteTagline = brandFooterTagline;

/** Primary / secondary CTAs — keep labels consistent site-wide */
export const ctaStartProject = "Start a Project";
export const ctaViewWork = "View Work";

export const navLinks = [
  { href: "/#path", label: "Start" },
  { href: "/#work", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Process" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
] as const;
