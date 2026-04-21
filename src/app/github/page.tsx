import type { Metadata } from "next";
import Link from "next/link";
import { contentWell, focusRing } from "@/components/layout/layoutTokens";
import { GithubAccessForm } from "./GithubAccessForm";
import { siteBrandName } from "@/lib/site";

export const metadata: Metadata = {
  title: `GitHub access | ${siteBrandName}`,
  description:
    "Request access to your VryntLab project repository. Verified clients only.",
};

export default function GithubAccessPage() {
  return (
    <div className="flex min-h-[calc(100vh-6rem)] flex-col bg-[#080a0e] px-6 py-14 text-zinc-100 sm:py-20">
      <div className={`${contentWell} mx-auto w-full max-w-xl`}>
        <Link
          href="/"
          className={`inline-flex min-h-10 text-[13px] font-medium text-teal-300/95 underline decoration-teal-400/35 underline-offset-4 transition-colors ${focusRing} rounded-sm [@media(hover:hover)]:hover:decoration-teal-300/70`}
        >
          ← Back to vryntlab.com
        </Link>

        <p className="mt-10 text-[10px] font-semibold uppercase tracking-[0.22em] text-teal-300/85">
          GitHub Access
        </p>
        <h1 className="font-display mt-3 text-balance text-3xl font-normal tracking-[-0.03em] text-zinc-50 sm:text-4xl">
          Request project access
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-zinc-400 sm:text-[16px]">
          We share source code directly with clients. Enter your email and
          we&apos;ll send you access to your project repository.
        </p>

        <GithubAccessForm />
      </div>
    </div>
  );
}
