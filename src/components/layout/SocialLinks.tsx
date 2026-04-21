"use client";

import type { SVGProps } from "react";
import { focusRing } from "@/components/layout/layoutTokens";
import { siteBrandName } from "@/lib/site";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

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

function IconGitHub({ size = 20, className, ...props }: IconProps) {
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
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

const linkBaseClass = `inline-flex h-11 min-h-11 w-11 min-w-11 items-center justify-center rounded-full border border-transparent text-zinc-500 transition-[color,background-color,border-color,transform] duration-300 ease-[var(--ease-out-premium)] motion-reduce:duration-150 active:scale-[0.97] ${focusRing} [@media(hover:hover)]:hover:border-[var(--border)] [@media(hover:hover)]:hover:bg-[var(--surface-soft)] [@media(hover:hover)]:hover:text-zinc-950 active:bg-[var(--surface-soft)] dark:text-zinc-500 dark:[@media(hover:hover)]:hover:text-zinc-50 dark:[@media(hover:hover)]:hover:border-zinc-700/80`;

const SOCIAL_ITEMS = [
  {
    href: "https://www.facebook.com/people/VryntLab/61564736394364/",
    label: `${siteBrandName} on Facebook`,
    Icon: IconFacebook,
  },
  {
    href: "https://www.instagram.com/vryntlab/",
    label: `${siteBrandName} on Instagram`,
    Icon: IconInstagram,
  },
  {
    href: "/x",
    label: `${siteBrandName} on X`,
    Icon: IconX,
  },
  {
    href: "/github",
    label: `${siteBrandName} GitHub access`,
    Icon: IconGitHub,
  },
] as const;

export function SocialLinks({ className = "" }: { className?: string }) {
  const items = SOCIAL_ITEMS.filter((i) => i.href.trim() !== "");

  if (items.length === 0) return null;

  return (
    <div
      className={`w-full border-t border-[var(--border)] pt-4 sm:w-auto sm:max-w-none dark:border-zinc-800/80 ${className}`.trim()}
    >
      <p className="mb-2 text-left text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-400 sm:text-right dark:text-zinc-500">
        Social
      </p>
      <ul
        className="flex flex-wrap items-center gap-1 sm:justify-end sm:gap-0.5"
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
    </div>
  );
}
