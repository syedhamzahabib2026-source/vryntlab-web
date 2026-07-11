"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { focusRing } from "@/components/layout/layoutTokens";
import { navLinks, siteBrandName, siteLogoSrc } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Continuous scroll-linked bg + blur — only active on home page
  const { scrollY } = useScroll();
  const headerBg = useTransform(
    scrollY,
    [0, 80],
    ["rgba(8,8,16,0)", "rgba(8,8,16,0.72)"],
  );
  const headerFilter = useTransform(
    scrollY,
    [0, 80],
    ["blur(0px) saturate(100%)", "blur(14px) saturate(150%)"],
  );

  // Keep scrolled state for border + shadow (those still snap at threshold)
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Drawer dismissal: Escape, tap outside the header, or page scroll
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointerDown = (e: PointerEvent) => {
      const el = headerRef.current;
      if (el && e.target instanceof Node && !el.contains(e.target)) {
        setOpen(false);
      }
    };
    const onScroll = () => setOpen(false);
    // Focus trap: keep Tab cycling within the header while the drawer is open
    const onTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const root = headerRef.current;
      if (!root) return;
      const focusables = Array.from(
        root.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      ).filter((el) => el.offsetParent !== null);
      if (focusables.length === 0) return;
      const first = focusables[0]!;
      const last = focusables[focusables.length - 1]!;
      const active = document.activeElement;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      } else if (active instanceof HTMLElement && !root.contains(active)) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("keydown", onTab);
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keydown", onTab);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("scroll", onScroll);
    };
  }, [open]);

  const heroAtTop = isHome && !scrolled;

  const navLinkClass =
    `rounded-md px-3 py-2 text-[15px] font-normal text-[#C8C8D8]/80 transition-colors duration-200 ease-[var(--ease-out-premium)] ${focusRing} [@media(hover:hover)]:hover:text-[#F0F0FF]`;

  const drawerLinkClass =
    `flex min-h-11 items-center rounded-lg px-3 py-2 text-[16px] font-normal text-[#C8C8D8] transition-colors duration-200 ${focusRing} [@media(hover:hover)]:hover:bg-white/[0.05] [@media(hover:hover)]:hover:text-[#F0F0FF]`;

  return (
    <motion.header
      ref={headerRef}
      className={`sticky top-0 z-50 w-full transition-[border-color,box-shadow] duration-300 ease-[var(--ease-out-premium)] motion-reduce:transition-none ${
        heroAtTop
          ? "border-b border-transparent shadow-none"
          : "border-b border-[var(--border)] shadow-[0_8px_32px_-16px_rgba(0,0,0,0.5)]"
      }`}
      style={
        isHome
          ? { backgroundColor: headerBg, backdropFilter: headerFilter }
          : {
              backgroundColor: "rgba(8,8,16,0.72)",
              backdropFilter: "blur(14px) saturate(150%)",
            }
      }
    >
      <div className="mx-auto w-full max-w-[1290px] px-4 sm:px-8 lg:px-[30px]">
        <div className="flex h-20 items-center justify-between gap-6">

          {/* Logo */}
          <Link
            href="/"
            className={`shrink-0 ${focusRing} rounded-md transition-opacity duration-200 [@media(hover:hover)]:hover:opacity-75`}
            aria-label={`${siteBrandName}, home`}
          >
            <Image
              src={siteLogoSrc}
              alt={siteBrandName}
              width={200}
              height={80}
              className="h-auto w-[125px] object-contain sm:w-[155px] lg:w-[175px]"
              loading="eager"
              priority
            />
          </Link>

          {/* Center nav — desktop pill */}
          <nav
            className="hidden items-center rounded-full border border-white/[0.08] bg-white/[0.04] px-2 py-1.5 lg:flex lg:gap-0.5"
            aria-label="Primary"
          >
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={navLinkClass}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: CTA + hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/#contact"
              className={`hidden shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-[#7C3FFF] to-[#00E5FF] px-5 py-2.5 text-[15px] font-medium text-white shadow-[0_0_24px_-6px_rgba(124,63,255,0.45)] transition-[transform,box-shadow] duration-[180ms] ease-[var(--ease-out-premium)] active:scale-[0.98] lg:inline-flex ${focusRing} [@media(hover:hover)]:hover:scale-[1.02] [@media(hover:hover)]:hover:-translate-y-px [@media(hover:hover)]:hover:shadow-[0_0_36px_-4px_rgba(124,63,255,0.65)]`}
            >
              Say Hello
            </Link>

            <button
              type="button"
              className={`flex min-h-11 min-w-11 items-center justify-center rounded-lg px-2 text-[14px] font-medium text-[#C8C8D8]/80 transition-[background-color,color] duration-200 active:bg-white/[0.06] ${focusRing} [@media(hover:hover)]:hover:bg-white/[0.06] [@media(hover:hover)]:hover:text-[#F0F0FF] lg:hidden`}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close navigation" : "Open navigation"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {open && (
          <nav
            id="mobile-nav"
            className="mt-2 flex flex-col gap-0.5 rounded-2xl border border-white/[0.07] bg-[#0F0F1A]/95 p-2 pb-3 shadow-[var(--shadow-md)] backdrop-blur-xl lg:hidden"
            aria-label="Mobile primary"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={drawerLinkClass}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              className={`mt-2 flex min-h-11 items-center justify-center rounded-full bg-gradient-to-r from-[#7C3FFF] to-[#00E5FF] px-6 text-[15px] font-medium text-white ${focusRing}`}
              onClick={() => setOpen(false)}
            >
              Say Hello
            </Link>
          </nav>
        )}
      </div>
    </motion.header>
  );
}
