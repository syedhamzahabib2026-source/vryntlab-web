import Image from "next/image";
import Link from "next/link";
import { focusRing } from "@/components/layout/layoutTokens";
import { navLinks, siteBrandName, siteEmail, siteTagline, siteLogoSrc } from "@/lib/site";
import { SocialLinks } from "@/components/layout/SocialLinks";

const navLinkClass =
  `inline-flex min-h-11 items-center rounded-md px-1.5 py-0.5 text-[13px] font-medium text-[#8888a8] transition-colors duration-200 ${focusRing} [@media(hover:hover)]:hover:text-[#F0F0FF]`;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto">
      {/* Gradient line at top */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(124,63,255,0.45) 35%, rgba(0,229,255,0.3) 65%, transparent)",
        }}
        aria-hidden
      />

      <div className="py-10 sm:py-12">
        {/* Main row: logo | tagline | nav */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:items-center">
          {/* Logo */}
          <div>
            <Link
              href="/"
              className={`inline-block ${focusRing} rounded-md`}
              aria-label={`${siteBrandName} — home`}
            >
              <Image
                src={siteLogoSrc}
                alt={`${siteBrandName} logo`}
                width={140}
                height={42}
                className="h-9 w-auto brightness-0 dark:filter-none"
              />
            </Link>
          </div>

          {/* Tagline — center */}
          <div className="sm:text-center">
            <p className="text-[13px] leading-relaxed text-[#8888a8]">{siteTagline}</p>
          </div>

          {/* Nav links — right */}
          <nav aria-label="Footer navigation" className="sm:flex sm:justify-end">
            <ul className="flex flex-wrap gap-x-0.5 gap-y-0.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={navLinkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom row: copyright + social */}
        <div className="mt-8 flex flex-col gap-4 border-t border-[#1E1E35] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-[12px] text-[#8888a8]">
              © {year} {siteBrandName}. All rights reserved.
            </p>
            <a
              href={`mailto:${siteEmail}`}
              className={`inline-flex min-h-10 w-fit items-center text-[12px] font-medium text-[#8888a8] underline decoration-transparent underline-offset-4 transition-[color,text-decoration-color] duration-200 ${focusRing} rounded-sm [@media(hover:hover)]:hover:text-[#00E5FF] [@media(hover:hover)]:hover:decoration-[#00E5FF]/45`}
            >
              {siteEmail}
            </a>
          </div>
          <SocialLinks className="justify-start sm:justify-end" />
        </div>
      </div>
    </footer>
  );
}
