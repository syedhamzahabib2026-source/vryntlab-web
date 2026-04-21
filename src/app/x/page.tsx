import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { contentWell, focusRing } from "@/components/layout/layoutTokens";
import { siteBrandName, siteLogoSrc } from "@/lib/site";

export const metadata: Metadata = {
  title: `X — ${siteBrandName}`,
  description: "VryntLab on X — coming soon.",
};

export default function XComingSoonPage() {
  return (
    <div className="flex min-h-[calc(100vh-6rem)] flex-col items-center justify-center bg-[#080a0e] px-6 py-16 text-zinc-100">
      <div className={`${contentWell} flex max-w-lg flex-col items-center text-center`}>
        <Image
          src={siteLogoSrc}
          alt={`${siteBrandName} logo`}
          width={640}
          height={200}
          className="h-12 w-auto object-contain sm:h-14"
          priority
        />
        <h1 className="font-display mt-10 text-3xl font-normal tracking-[-0.03em] text-zinc-50 sm:text-4xl">
          Coming soon
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-zinc-400 sm:text-[16px]">
          @vryntlab — we&apos;ll be here shortly
        </p>
        <Link
          href="/"
          className={`mt-10 inline-flex min-h-11 items-center text-[14px] font-semibold text-teal-300/95 underline decoration-teal-400/35 underline-offset-[6px] transition-colors ${focusRing} rounded-sm [@media(hover:hover)]:hover:decoration-teal-300/70`}
        >
          ← Back to vryntlab.com
        </Link>
      </div>
    </div>
  );
}
