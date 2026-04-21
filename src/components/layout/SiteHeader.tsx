"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { contentWell, focusRing } from "@/components/layout/layoutTokens";
import { useConversion } from "@/components/conversion/ConversionContext";
import { brandIntentActionLabels } from "@/lib/brand-knowledge";
import { navLinks, siteBrandName, siteLogoSrc } from "@/lib/site";

const ctaButtonCore = `inline-flex h-12 min-h-12 items-center justify-center rounded-full bg-[var(--surface-ink)] px-6 text-[13px] font-semibold tracking-tight text-white shadow-[var(--shadow-sm)] transition-[background-color,box-shadow,transform] duration-300 ease-[var(--ease-out-premium)] motion-reduce:duration-150 active:scale-[0.98] ${focusRing} [@media(hover:hover)]:hover:shadow-[var(--shadow-glow)] dark:bg-white dark:text-zinc-950 dark:[@media(hover:hover)]:hover:bg-zinc-200`;

/** Desktop header only — mobile uses hamburger + estimate inside the drawer. */
const ctaDesktopClass = `${ctaButtonCore} hidden shrink-0 lg:inline-flex`;

/** At top of homepage: reads on warm/mesh background. Otherwise / scrolled: standard nav ink. */
const navLinkClassHero =
  `rounded-md px-2 py-1.5 text-[13px] font-medium text-zinc-700 underline decoration-transparent underline-offset-[8px] transition-[color,text-decoration-color,transform] duration-300 ease-[var(--ease-out-premium)] motion-reduce:duration-150 ${focusRing} [@media(hover:hover)]:hover:-translate-y-px [@media(hover:hover)]:hover:text-[var(--accent)] [@media(hover:hover)]:hover:decoration-[var(--accent)]/45 dark:text-zinc-300 dark:[@media(hover:hover)]:hover:text-teal-200/95 dark:[@media(hover:hover)]:hover:decoration-teal-400/45`;

const navLinkClassDefault =
  `rounded-md px-2 py-1.5 text-[13px] font-medium text-zinc-600 underline decoration-transparent underline-offset-[8px] transition-[color,text-decoration-color,transform] duration-300 ease-[var(--ease-out-premium)] motion-reduce:duration-150 ${focusRing} [@media(hover:hover)]:hover:-translate-y-px [@media(hover:hover)]:hover:text-[var(--accent)] [@media(hover:hover)]:hover:decoration-[var(--accent)]/50 dark:text-zinc-400 dark:[@media(hover:hover)]:hover:text-teal-200/95 dark:[@media(hover:hover)]:hover:decoration-teal-400/45`;

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
      ? "border-b border-[color-mix(in_srgb,var(--foreground)_8%,transparent)] bg-[color-mix(in_srgb,var(--background)_52%,transparent)] py-3 shadow-[0_8px_40px_-28px_rgba(0,0,0,0.07)] backdrop-blur-2xl backdrop-saturate-150 sm:py-4 md:py-5 dark:border-white/[0.08] dark:bg-[color-mix(in_srgb,var(--background)_42%,transparent)] dark:shadow-[0_12px_44px_-32px_rgba(0,0,0,0.45)]"
      : "border-b border-[color-mix(in_srgb,var(--border)_40%,transparent)] bg-[color-mix(in_srgb,var(--background)_52%,transparent)] py-3 shadow-none backdrop-blur-md backdrop-saturate-110 sm:py-4 md:py-5 dark:border-white/[0.05] dark:bg-[color-mix(in_srgb,var(--background)_45%,transparent)]";

  const menuBtnClass = heroAtTop
    ? `flex min-h-12 min-w-12 items-center justify-center rounded-lg px-2 text-[13px] font-medium text-zinc-700 transition-[background-color,color,transform] duration-300 ease-[var(--ease-out-premium)] motion-reduce:duration-150 active:scale-[0.98] active:bg-zinc-950/[0.06] ${focusRing} [@media(hover:hover)]:hover:bg-zinc-950/[0.06] [@media(hover:hover)]:hover:text-zinc-950 lg:hidden dark:text-zinc-300 dark:active:bg-white/[0.08] dark:[@media(hover:hover)]:hover:bg-white/[0.08] dark:[@media(hover:hover)]:hover:text-white`
    : `flex min-h-12 min-w-12 items-center justify-center rounded-lg px-2 text-[13px] font-medium text-zinc-600 transition-[background-color,color,transform] duration-300 ease-[var(--ease-out-premium)] motion-reduce:duration-150 active:scale-[0.98] active:bg-[var(--surface-soft)] ${focusRing} [@media(hover:hover)]:hover:bg-[var(--surface-soft)] [@media(hover:hover)]:hover:text-zinc-950 lg:hidden dark:text-zinc-400 dark:active:bg-zinc-900/70 dark:[@media(hover:hover)]:hover:bg-zinc-900/70 dark:[@media(hover:hover)]:hover:text-zinc-50`;

  return (
    <header
      className={`sticky top-0 z-50 w-full motion-reduce:transition-none motion-safe:transition-[background-color,box-shadow,border-color,backdrop-filter] motion-safe:duration-300 motion-safe:ease-[var(--ease-out-premium)] ${shellClass}`}
    >
      {/* Full-bleed bar; inner grid matches page gutters + content well (hero column). */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-8 md:px-10 lg:px-16">
        <div className={`${contentWell}`}>
        {/* Grid: logo width doesn’t pull nav off-center; nav sits in its own column */}
        <div className="grid w-full min-w-0 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-2 sm:gap-x-3 md:gap-x-4 lg:gap-x-5">
          <div className="flex min-w-0 shrink-0 items-center justify-start">
            <Link
              href="/"
              className={`group/logo relative flex shrink-0 items-center ${focusRing} rounded-md transition-opacity duration-300 ease-[var(--ease-out-premium)] motion-reduce:duration-150 [@media(hover:hover)]:hover:opacity-88`}
              aria-label={`${siteBrandName} — home`}
            >
              <Image
                src={siteLogoSrc}
                alt={`${siteBrandName} logo`}
                width={1000}
                height={300}
                sizes="(max-width: 640px) 560px, (max-width: 1024px) 720px, 900px"
                className="h-[4.5rem] w-auto max-w-[min(82vw,17.5rem)] object-contain object-left brightness-0 dark:filter-none sm:h-[5.25rem] sm:max-w-[min(58vw,18.5rem)] md:h-[5.75rem] md:max-w-[min(48vw,20rem)] lg:h-[6.5rem] lg:max-w-[min(40vw,22rem)] xl:h-[7.5rem] xl:max-w-[min(36vw,24rem)]"
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
            className="mt-3 flex flex-col gap-0.5 rounded-xl border border-[color-mix(in_srgb,var(--border)_70%,transparent)] bg-[color-mix(in_srgb,var(--surface)_92%,transparent)] p-2 pt-3 shadow-[var(--shadow-sm)] backdrop-blur-xl dark:border-white/[0.08] dark:bg-[color-mix(in_srgb,var(--surface)_88%,transparent)] sm:mt-4 sm:p-3 sm:pt-4 lg:hidden"
            aria-label="Mobile primary"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex min-h-11 items-center rounded-lg px-3 py-2 text-[15px] font-medium text-zinc-800 transition-[background-color,color] duration-300 ease-[var(--ease-out-premium)] motion-reduce:duration-150 active:bg-zinc-950/[0.06] ${focusRing} [@media(hover:hover)]:hover:bg-zinc-950/[0.05] dark:text-zinc-200 dark:active:bg-white/[0.06] dark:[@media(hover:hover)]:hover:bg-white/[0.06]`}
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
