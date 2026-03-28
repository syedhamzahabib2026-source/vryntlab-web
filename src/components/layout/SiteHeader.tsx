"use client";

import { useState } from "react";
import { navLinks } from "@/lib/site";

const ctaClass =
  "inline-flex h-9 shrink-0 items-center justify-center rounded-full bg-zinc-950 px-4 text-[13px] font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/70 bg-[var(--background)]/85 py-3 backdrop-blur-md dark:border-zinc-800/70 dark:bg-[var(--background)]/80">
      <div className="flex items-center justify-between gap-4">
        <a
          href="#top"
          className="text-[15px] font-semibold tracking-tight text-zinc-950 dark:text-zinc-50"
        >
          Trellisify
        </a>

        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Primary"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] font-medium text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a href="#contact" className={`${ctaClass} hidden sm:inline-flex`}>
            Start a project
          </a>
          <button
            type="button"
            className="rounded-md px-2 py-1.5 text-[13px] font-medium text-zinc-600 lg:hidden dark:text-zinc-400"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="mt-4 flex flex-col gap-1 border-t border-zinc-200/60 pt-4 lg:hidden dark:border-zinc-800/60"
          aria-label="Mobile primary"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-2 py-2.5 text-[14px] font-medium text-zinc-700 hover:bg-zinc-100/80 dark:text-zinc-300 dark:hover:bg-zinc-900/60"
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
            Start a project
          </a>
        </nav>
      ) : null}
    </header>
  );
}
