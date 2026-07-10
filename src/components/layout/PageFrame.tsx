"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "@/components/layout/SiteFooter";

/**
 * Route-aware page frame. The homepage renders bare so its sections
 * (which own their max-w containers) can go true full-bleed; all other
 * routes keep the padded content well they rely on.
 */
export function PageFrame({ children }: { children: React.ReactNode }) {
  const isHome = usePathname() === "/";

  if (isHome) {
    return (
      <div className="flex min-h-screen w-full flex-col pb-[max(5.75rem,env(safe-area-inset-bottom,0px))] lg:pb-[max(4rem,env(safe-area-inset-bottom,0px))]">
        <main className="flex flex-1 flex-col">{children}</main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pb-[max(5.75rem,env(safe-area-inset-bottom,0px))] pt-0 sm:px-8 md:px-10 lg:px-16 lg:pb-[max(4rem,env(safe-area-inset-bottom,0px))]">
      <main className="flex flex-1 flex-col pt-4 sm:pt-5">{children}</main>
      <SiteFooter />
    </div>
  );
}
