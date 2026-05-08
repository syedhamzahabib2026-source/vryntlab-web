"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { contentWell, focusRing } from "@/components/layout/layoutTokens";
import { useConversion } from "@/components/conversion/ConversionContext";
import { brandIntentActionLabels } from "@/lib/brand-knowledge";
import { navLinks, siteBrandName, siteLogoSrc } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { openEstimate, selectedIntent } = useConversion();
  const estimateNavLabel =
    selectedIntent != null
      ? brandIntentActionLabels[selectedIntent].estimatePrimary
      : "Free Estimate";
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

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const shellClass = scrolled
    ? "border-b border-[#1E1E35]/80 bg-[#080810]/80 backdrop-blur-xl backdrop-saturate-150 shadow-[0_4px_30px_-10px_rgba(0,0,0,0.5)]"
    : "border-b border-transparent bg-transparent";

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ease-[var(--ease-out-premium)] ${shellClass}`}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-8 md:px-10 lg:px-16">
        <div className={contentWell}>
          <div className="flex min-h-16 items-center justify-between gap-4 py-3 sm:min-h-[4.5rem] sm:py-4">
            {/* Logo */}
            <Link
              href="/"
              className={`group/logo relative flex shrink-0 items-center ${focusRing} rounded-md transition-opacity duration-300 hover:opacity-90`}
              aria-label={`${siteBrandName} — home`}
            >
              <Image
                src={siteLogoSrc}
                alt={`${siteBrandName} logo`}
                width={1000}
                height={300}
                sizes="(max-width: 640px) 140px, 180px"
                className="h-12 w-auto object-contain object-left sm:h-14 md:h-16"
                priority
              />
            </Link>

            {/* Desktop Navigation - Center */}
            <nav
              className="hidden items-center gap-1 lg:flex"
              aria-label="Primary"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-3 py-2 text-[13px] font-medium text-[#C8C8D8] transition-all duration-300 ${focusRing} hover:bg-[#1E1E35]/50 hover:text-[#F0F0FF]`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Side - CTA + Mobile Menu */}
            <div className="flex items-center gap-3">
              {/* Desktop CTA - Ghost button with violet border */}
              <button
                type="button"
                onClick={() => openEstimate()}
                className={`hidden min-h-10 items-center justify-center rounded-lg border border-[#7C3FFF] px-5 text-[13px] font-semibold text-[#7C3FFF] transition-all duration-300 lg:inline-flex ${focusRing} hover:bg-[#7C3FFF] hover:text-white`}
              >
                {estimateNavLabel}
              </button>

              {/* Mobile Menu Button */}
              <button
                type="button"
                className={`flex min-h-11 min-w-11 items-center justify-center rounded-lg text-[#C8C8D8] transition-all duration-300 lg:hidden ${focusRing} hover:bg-[#1E1E35]/50 hover:text-[#F0F0FF]`}
                aria-expanded={open}
                aria-controls="mobile-nav"
                aria-label={open ? "Close navigation" : "Open navigation"}
                onClick={() => setOpen((v) => !v)}
              >
                {open ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Drawer */}
          {open && (
            <nav
              id="mobile-nav"
              className="flex flex-col gap-1 rounded-xl border border-[#1E1E35] bg-[#0F0F1A] p-4 shadow-lg lg:hidden"
              aria-label="Mobile primary"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex min-h-12 items-center rounded-lg px-4 py-3 text-[15px] font-medium text-[#C8C8D8] transition-all duration-300 ${focusRing} hover:bg-[#1E1E35]/50 hover:text-[#F0F0FF]`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 border-t border-[#1E1E35] pt-4">
                <button
                  type="button"
                  className="flex min-h-12 w-full items-center justify-center rounded-lg border border-[#7C3FFF] px-6 text-[14px] font-semibold text-[#7C3FFF] transition-all duration-300 hover:bg-[#7C3FFF] hover:text-white"
                  onClick={() => {
                    openEstimate();
                    setOpen(false);
                  }}
                >
                  {estimateNavLabel}
                </button>
              </div>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
