import { focusRing } from "@/components/layout/layoutTokens";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { navLinks, siteBrandName, siteEmail, siteTagline } from "@/lib/site";

const footerLinkClass = `inline-flex min-h-11 items-center rounded-md px-0.5 text-[13px] font-medium text-zinc-600 underline decoration-transparent underline-offset-[6px] transition-[color,text-decoration-color] duration-300 ease-[var(--ease-out-premium)] motion-reduce:duration-150 ${focusRing} [@media(hover:hover)]:hover:text-zinc-950 [@media(hover:hover)]:hover:decoration-[var(--accent)]/45 dark:text-zinc-400 dark:[@media(hover:hover)]:hover:text-zinc-50 dark:[@media(hover:hover)]:hover:decoration-[var(--accent)]/40`;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-[var(--border)] pt-11 pb-10 sm:pt-12 sm:pb-11 md:pt-14">
      <div className="grid gap-9 sm:gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:gap-14 lg:gap-16">
        <div className="max-w-sm md:max-w-md">
          <p className="text-[15px] font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            {siteBrandName}
          </p>
          <p className="mt-2.5 text-pretty text-[14px] leading-[1.58] text-zinc-600 sm:mt-3 sm:text-[15px] sm:leading-[1.6] dark:text-zinc-400">
            {siteTagline}
          </p>
        </div>
        <div className="flex flex-col gap-7 sm:flex-row sm:justify-end sm:gap-14 md:flex-col md:items-end md:gap-8">
          <nav aria-label="Footer">
            <ul className="flex flex-col gap-0.5 sm:gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={footerLinkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex w-full flex-col gap-4 sm:max-w-none sm:items-end md:w-auto">
            <a
              href={`mailto:${siteEmail}`}
              className={`inline-flex min-h-11 w-fit max-w-full items-center rounded-md text-[13px] font-semibold text-zinc-950 underline decoration-zinc-300/90 underline-offset-[5px] transition-[text-decoration-color,color] duration-300 ease-[var(--ease-out-premium)] motion-reduce:duration-150 ${focusRing} [@media(hover:hover)]:hover:decoration-[var(--accent)]/50 dark:text-zinc-50 dark:decoration-zinc-600 dark:[@media(hover:hover)]:hover:decoration-[var(--accent)]/45`}
            >
              {siteEmail}
            </a>
            <SocialLinks className="justify-start sm:justify-end" />
          </div>
        </div>
      </div>
      <div className="mt-10 border-t border-[var(--border)] pt-6 sm:mt-12 sm:pt-7">
        <p className="text-[12px] text-zinc-500 dark:text-zinc-500">
          © {year} {siteBrandName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
