"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { contentWell, focusRing } from "@/components/layout/layoutTokens";
import { useConversion } from "@/components/conversion/ConversionContext";
import { brandIntentActionLabels } from "@/lib/brand-knowledge";
import { navLinks, siteBrandName, siteLogoSrc } from "@/lib/site";

const ctaButtonCore = `inline-flex h-12 min-h-12 items-center justify-center rounded-full border border-violet-500/40 bg-transparent px-6 text-[13px] font-semibold tracking-tight text-[#F0F0FF] shadow-[var(--shadow-sm)] transition-[background-color,border-color,box-shadow,transform] duration-300 ease-[var(--ease-out-premium)] motion-reduce:duration-150 active:scale-[0.98] ${focusRing} [@media(hover:hover)]:hover:border-violet-400/65 [@media(hover:hover)]:hover:bg-violet-500/10 [@media(hover:hover)]:hover:shadow-[0_0_24px_-6px_rgba(124,63,255,0.35)]`;

/** Desktop header only — mobile uses hamburger + estimate inside the drawer. */
const ctaDesktopClass = `${ctaButtonCore} hidden shrink-0 lg:inline-flex`;

/** At top of homepage: reads on warm/mesh background. Otherwise / scrolled: standard nav ink. */
const navLinkClassHero =
  `rounded-md px-2 py-1.5 text-[13px] font-medium text-[#C8C8D8]/85 underline decoration-transparent underline-offset-[8px] transition-[color,text-decoration-color,transform] duration-300 ease-[var(--ease-out-premium)] motion-reduce:duration-150 ${focusRing} [@media(hover:hover)]:hover:-translate-y-px [@media(hover:hover)]:hover:text-[#00E5FF]/95 [@media(hover:hover)]:hover:decoration-[#00E5FF]/40`;

const navLinkClassDefault =
  `rounded-md px-2 py-1.5 text-[13px] font-medium text-[#C8C8D8]/70 underline decoration-transparent underline-offset-[8px] transition-[color,text-decoration-color,transform] duration-300 ease-[var(--ease-out-premium)] motion-reduce:duration-150 ${focusRing} [@media(hover:hover)]:hover:-translate-y-px [@media(hover:hover)]:hover:text-[#00E5FF]/95 [@media(hover:hover)]:hover:decoration-[#00E5FF]/40`;

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { openEstimate, selectedIntent } = useConversion();
  const estimateNavLabel =
    selectedIntent != null
      ? brandIntentActionLabels[selectedIntent].estimatePrimary
      : "Quick estimate";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /** Same canvas as hero: no frosted panel over the mesh/gradient. */
  const heroAtTop = isHome && !scrolled;
  const navLinkClass = heroAtTop ? navLinkClassHero : navLinkClassDefault;

  const shellClass = heroAtTop
    ? "border-b border-transparent bg-transparent py-3 shadow-none backdrop-blur-none backdrop-saturate-100 sm:py-4 md:py-5"
    : scrolled
      ? "border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--background)_42%,transparent)] py-3 shadow-[0_12px_44px_-32px_rgba(0,0,0,0.45)] backdrop-blur-2xl backdrop-saturate-150 sm:py-4 md:py-5"
      : "border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--background)_45%,transparent)] py-3 shadow-none backdrop-blur-md backdrop-saturate-110 sm:py-4 md:py-5";

  const menuBtnClass = `flex min-h-12 min-w-12 items-center justify-center rounded-lg px-2 text-[13px] font-medium text-[#C8C8D8]/80 transition-[background-color,color,transform] duration-300 ease-[var(--ease-out-premium)] motion-reduce:duration-150 active:scale-[0.98] active:bg-white/[0.07] ${focusRing} [@media(hover:hover)]:hover:bg-white/[0.07] [@media(hover:hover)]:hover:text-[#F0F0FF] lg:hidden`;

  return (
    <header
      className={`sticky top-0 z-50 w-full motion-reduce:transition-none motion-safe:transition-[background-color,box-shadow,border-color,backdrop-filter] motion-safe:duration-300 motion-safe:ease-[var(--ease-out-premium)] ${shellClass}`}
    >
      {/* Full-bleed bar; inner grid matches page gutters + content well (hero column). */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-8 md:px-10 lg:px-16">
        <div className={`${contentWell}`}>
        {/* Grid: logo width doesn’t pull nav off-center; nav sits in its own column */}
        <div className="grid w-full min-h-0 min-w-0 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-2 sm:gap-x-3 md:gap-x-4 lg:gap-x-5">
          <div className="flex min-h-0 min-w-0 shrink-0 self-stretch items-center justify-start">
            <Link
              href="/"
              className={`group/logo relative flex min-h-0 min-w-0 shrink-0 items-center ${focusRing} rounded-md transition-opacity duration-300 ease-[var(--ease-out-premium)] motion-reduce:duration-150 [@media(hover:hover)]:hover:opacity-80`}
              aria-label={`${siteBrandName}, home`}
            >
              <Image
                src={siteLogoSrc}
                alt={siteBrandName}
                width={120}
                height={80}
                className="h-7 w-auto object-contain sm:h-8"
                priority
              />
            </Link>
          </div>

          <nav
            className="hidden min-w-0 justify-self-center lg:flex lg:justify-center lg:gap-0.5 xl:gap-1"
            aria-label="Primary"
          >
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={navLinkClass}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center justify-end gap-2 sm:gap-2.5">
            <button
              type="button"
              onClick={() => openEstimate()}
              className={ctaDesktopClass}
            >
              {estimateNavLabel}
            </button>
            <button
              type="button"
              className={menuBtnClass}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close navigation" : "Open navigation"}
              onClick={() => setOpen((v) => !v)}
            >
              <span aria-hidden>{open ? "Close" : "Menu"}</span>
            </button>
          </div>
        </div>

        {open ? (
          <nav
            id="mobile-nav"
            className="mt-3 flex flex-col gap-0.5 rounded-xl border border-white/[0.08] bg-[#0F0F1A]/90 p-2 pt-3 shadow-[var(--shadow-sm)] backdrop-blur-xl sm:mt-4 sm:p-3 sm:pt-4 lg:hidden"
            aria-label="Mobile primary"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex min-h-11 items-center rounded-lg px-3 py-2 text-[15px] font-medium text-[#C8C8D8] transition-[background-color,color] duration-300 ease-[var(--ease-out-premium)] motion-reduce:duration-150 active:bg-white/[0.05] ${focusRing} [@media(hover:hover)]:hover:bg-white/[0.05] [@media(hover:hover)]:hover:text-[#F0F0FF]`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <button
              type="button"
              className={`${ctaButtonCore} mt-2 w-full shrink-0`}
              onClick={() => {
                openEstimate();
                setOpen(false);
              }}
            >
              {estimateNavLabel}
            </button>
          </nav>
        ) : null}
        </div>
      </div>
    </header>
  );
}
