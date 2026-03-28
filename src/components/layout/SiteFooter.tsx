import { navLinks, siteEmail, siteTagline } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-zinc-200/80 pt-14 pb-10 dark:border-zinc-800/80">
      <div className="grid gap-12 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:gap-16">
        <div className="max-w-md">
          <p className="text-[15px] font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            Trellisify
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
            {siteTagline}
          </p>
        </div>
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-end sm:gap-16 md:flex-col md:items-end">
          <nav aria-label="Footer">
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[13px] font-medium text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a
            href={`mailto:${siteEmail}`}
            className="text-[13px] font-medium text-zinc-950 underline decoration-zinc-300 underline-offset-4 transition-colors hover:decoration-zinc-500 dark:text-zinc-50 dark:decoration-zinc-600 dark:hover:decoration-zinc-400"
          >
            {siteEmail}
          </a>
        </div>
      </div>
      <div className="mt-14 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <p className="text-[12px] text-zinc-500 dark:text-zinc-500">
          © {year} Trellisify. All rights reserved.
        </p>
        <p className="text-[11px] text-zinc-400 dark:text-zinc-600">
          Preview build — Trellisify Test 1
        </p>
      </div>
    </footer>
  );
}
