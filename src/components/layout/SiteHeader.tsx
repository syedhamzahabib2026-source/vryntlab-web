"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { contentWell, focusRing } from "@/components/layout/layoutTokens";
import {
  ctaStartProject,
  navLinks,
  siteBrandName,
  siteLogoSrc,
} from "@/lib/site";

const ctaClass = `inline-flex h-11 min-h-11 shrink-0 items-center justify-center rounded-full bg-zinc-950 px-4 text-[13px] font-semibold tracking-tight text-white shadow-[var(--shadow-sm)] transition-[background-color,box-shadow,transform] duration-300 ease-[var(--ease-out-premium)] motion-reduce:duration-150 active:scale-[0.98] ${focusRing} [@media(hover:hover)]:hover:bg-zinc-800 [@media(hover:hover)]:hover:shadow-[var(--shadow-md)] dark:bg-zinc-50 dark:text-zinc-950 dark:[@media(hover:hover)]:hover:bg-zinc-200`;

const navLinkClass = `rounded-md px-1 py-1 text-[13px] font-medium text-zinc-600 underline decoration-transparent underline-offset-[7px] transition-[color,text-decoration-color,transform] duration-300 ease-[var(--ease-out-premium)] motion-reduce:duration-150 ${focusRing} [@media(hover:hover)]:hover:text-zinc-950 [@media(hover:hover)]:hover:decoration-[var(--accent)]/55 dark:text-zinc-400 dark:[@media(hover:hover)]:hover:text-zinc-50 dark:[@media(hover:hover)]:hover:decoration-[var(--accent)]/45`;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 overflow-visible border-b border-[var(--border)] bg-[color-mix(in_oklab,var(--background)_90%,transparent)] py-3 backdrop-blur-md motion-reduce:transition-none sm:py-3.5 dark:bg-[color-mix(in_oklab,var(--background)_84%,transparent)] motion-safe:transition-[background-color,box-shadow] motion-safe:duration-300 motion-safe:ease-[var(--ease-out-premium)] ${
        scrolled
          ? "shadow-[0_12px_40px_-28px_rgba(0,0,0,0.12)] dark:shadow-[0_14px_44px_-24px_rgba(0,0,0,0.55)]"
          : ""
      }`}
    >
      <div className={`${contentWell} overflow-visible`}>
        <div className="flex w-full min-w-0 items-center gap-3 overflow-visible sm:gap-4">
          <a
            href="#top"
            className={`relative inline-flex min-h-11 min-w-0 shrink-0 items-center justify-start overflow-visible rounded-md transition-opacity duration-300 ease-[var(--ease-out-premium)] motion-reduce:duration-150 ${focusRing} [@media(hover:hover)]:hover:opacity-85`}
            aria-label={`${siteBrandName} — home`}
          >
            <span className="block w-fit origin-left -translate-x-[4.25rem] scale-[1.73] overflow-visible lg:-translate-x-[4.4rem]">
              <Image
                src={siteLogoSrc}
                alt={`${siteBrandName} logo`}
                width={1000}
                height={300}
                sizes="(max-width: 640px) 400px, (max-width: 1024px) 380px, 440px"
                className="h-20 w-auto max-w-none object-contain object-left brightness-0 dark:filter-none sm:h-[5.25rem] md:h-24 lg:h-20"
                priority
              />
            </span>
          </a>

          <nav
            className="hidden min-w-0 flex-1 items-center justify-center gap-8 lg:flex xl:gap-9"
            aria-label="Primary"
          >
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className={navLinkClass}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
            <a href="#contact" className={`${ctaClass} hidden sm:inline-flex`}>
              {ctaStartProject}
            </a>
            <button
              type="button"
              className={`flex min-h-11 min-w-11 items-center justify-center rounded-lg px-2 text-[13px] font-medium text-zinc-600 transition-[background-color,color,transform] duration-300 ease-[var(--ease-out-premium)] motion-reduce:duration-150 active:scale-[0.98] active:bg-[var(--surface-soft)] ${focusRing} [@media(hover:hover)]:hover:bg-[var(--surface-soft)] [@media(hover:hover)]:hover:text-zinc-950 lg:hidden dark:text-zinc-400 dark:active:bg-zinc-900/70 dark:[@media(hover:hover)]:hover:bg-zinc-900/70 dark:[@media(hover:hover)]:hover:text-zinc-50`}
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
            className="mt-3 flex flex-col gap-0.5 border-t border-[var(--border)] pt-3 sm:mt-4 sm:pt-4 lg:hidden"
            aria-label="Mobile primary"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`flex min-h-12 items-center rounded-lg px-2 py-2 text-[15px] font-medium text-zinc-700 transition-[background-color,color] duration-300 ease-[var(--ease-out-premium)] motion-reduce:duration-150 active:bg-[var(--surface-soft)] ${focusRing} [@media(hover:hover)]:hover:bg-[var(--surface-soft)] dark:text-zinc-300 dark:active:bg-zinc-900/60 dark:[@media(hover:hover)]:hover:bg-zinc-900/60`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className={`${ctaClass} mt-2 w-full justify-center sm:hidden`}
              onClick={() => setOpen(false)}
            >
              {ctaStartProject}
            </a>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
