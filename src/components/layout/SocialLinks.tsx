"use client";

import type { SVGProps } from "react";
import { focusRing } from "@/components/layout/layoutTokens";
import { siteBrandName } from "@/lib/site";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

/** Minimal stroke icons (currentColor) — brand packs often omit these in tree-shaken builds. */
function IconInstagram({ size = 20, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconFacebook({ size = 20, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
      {...props}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function IconLinkedIn({ size = 20, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function IconX({ size = 20, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
      {...props}
    >
      <path d="M4 4l16 16M20 4L4 20" />
    </svg>
  );
}

const linkBaseClass = `inline-flex h-11 min-h-11 w-11 min-w-11 items-center justify-center rounded-full border border-transparent text-zinc-500 transition-[color,background-color,border-color,transform] duration-300 ease-[var(--ease-out-premium)] motion-reduce:duration-150 active:scale-[0.97] ${focusRing} [@media(hover:hover)]:hover:border-[var(--border)] [@media(hover:hover)]:hover:bg-[var(--surface-soft)] [@media(hover:hover)]:hover:text-zinc-950 active:bg-[var(--surface-soft)] dark:text-zinc-500 dark:[@media(hover:hover)]:hover:text-zinc-50 dark:[@media(hover:hover)]:hover:border-zinc-700/80`;

/**
 * Monochrome social links — replace `#` hrefs when URLs are ready.
 * Opens in a new tab when href is a real URL.
 */
export function SocialLinks({ className = "" }: { className?: string }) {
  const items = [
    {
      // TODO: replace with your Instagram profile URL
      href: "#",
      label: `${siteBrandName} on Instagram`,
      Icon: IconInstagram,
    },
    {
      // TODO: replace with your Facebook page URL
      href: "#",
      label: `${siteBrandName} on Facebook`,
      Icon: IconFacebook,
    },
    {
      // TODO: replace with your LinkedIn company or profile URL
      href: "#",
      label: `${siteBrandName} on LinkedIn`,
      Icon: IconLinkedIn,
    },
    {
      // TODO: replace with your X (Twitter) profile URL
      href: "#",
      label: `${siteBrandName} on X`,
      Icon: IconX,
    },
  ] as const;

  return (
    <ul
      className={`flex flex-wrap items-center gap-1 sm:gap-0.5 ${className}`.trim()}
      aria-label="Social media"
    >
      {items.map(({ href, label, Icon }) => {
        const external = href.startsWith("http");
        return (
          <li key={label}>
            <a
              href={href}
              aria-label={label}
              className={linkBaseClass}
              onClick={
                href === "#"
                  ? (e) => {
                      e.preventDefault();
                    }
                  : undefined
              }
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : { rel: "nofollow" })}
            >
              <Icon size={20} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
