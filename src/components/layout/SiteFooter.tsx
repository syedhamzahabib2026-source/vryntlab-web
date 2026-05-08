import Link from "next/link";
import { focusRing } from "@/components/layout/layoutTokens";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { navLinks, siteBrandName, siteEmail } from "@/lib/site";

const footerLinkClass = `inline-flex min-h-11 items-center rounded-md px-0.5 text-[13px] font-medium text-[#8888a0] underline decoration-transparent underline-offset-[6px] transition-all duration-300 ${focusRing} hover:text-[#F0F0FF] hover:decoration-[#7C3FFF]/40`;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-[#1E1E35] pt-11 pb-10 sm:pt-12 sm:pb-11 md:pt-14">
      {/* Thin gradient line at top */}
      <div className="absolute left-0 right-0 -mt-11 h-px bg-gradient-to-r from-transparent via-[#7C3FFF]/30 to-transparent sm:-mt-12 md:-mt-14" />
      
      <div className="grid gap-9 sm:gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:gap-14 lg:gap-16">
        <div className="max-w-sm md:max-w-md">
          <p className="text-[15px] font-semibold tracking-tight text-[#F0F0FF]">
            {siteBrandName}
          </p>
          <p className="mt-2.5 text-pretty text-[14px] leading-[1.6] text-[#C8C8D8] sm:mt-3 sm:text-[15px]">
            Built lean. Priced fair. Delivered right.
          </p>
        </div>
        <div className="flex flex-col gap-7 sm:flex-row sm:justify-end sm:gap-14 md:flex-col md:items-end md:gap-8">
          <nav aria-label="Footer">
            <ul className="flex flex-col gap-0.5 sm:gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={footerLinkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex w-full flex-col gap-4 sm:max-w-none sm:items-end md:w-auto">
            <a
              href={`mailto:${siteEmail}`}
              className={`inline-flex min-h-11 w-fit max-w-full items-center rounded-md text-[13px] font-semibold text-[#F0F0FF] underline decoration-[#1E1E35] underline-offset-[5px] transition-all duration-300 ${focusRing} hover:decoration-[#7C3FFF]/50`}
            >
              {siteEmail}
            </a>
            <SocialLinks className="justify-start sm:justify-end" />
          </div>
        </div>
      </div>
      <div className="mt-10 border-t border-[#1E1E35] pt-6 sm:mt-12 sm:pt-7">
        <p className="text-[12px] text-[#8888a0]">
          &copy; {year} {siteBrandName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
