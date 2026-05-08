import type { Metadata } from "next";
import Link from "next/link";
import { NeedPathSelector } from "@/components/home/NeedPathSelector";
import { ServiceLanePanels } from "@/components/home/ServiceLanePanels";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { contentWell, focusRing } from "@/components/layout/layoutTokens";
import { siteBrandName } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Web Design, SEO, Chatbots & Automation Services | VryntLab",
  description:
    "Website design, AI chatbots, booking systems, SEO, speed optimization and business automation — all from one lean digital studio. See what we do.",
  alternates: {
    canonical: "https://vryntlab.com/services",
  },
  openGraph: {
    title: "Web Design, SEO, Chatbots & Automation Services | VryntLab",
    description:
      "Website design, AI chatbots, booking systems, SEO, speed optimization and business automation — all from one lean digital studio. See what we do.",
    url: "https://vryntlab.com/services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Design, SEO, Chatbots & Automation Services | VryntLab",
    description:
      "Website design, AI chatbots, booking systems, SEO, speed optimization and business automation — all from one lean digital studio. See what we do.",
  },
};

const servicesBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://vryntlab.com" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://vryntlab.com/services" },
  ],
};

export default function ServicesPage() {
  return (
    <div className="flex flex-1 flex-col">
      <JsonLd schema={servicesBreadcrumb} />
      <header
        className={`${contentWell} border-b border-[#1E1E35] pb-8 pt-6 sm:pb-10 sm:pt-8 md:pb-11 md:pt-10`}
      >
        <h1 className="font-display text-balance text-[1.75rem] font-medium leading-[1.08] tracking-[-0.02em] text-[#F0F0FF] sm:text-[2rem] md:text-[2.25rem]">
          What we do — {siteBrandName}
        </h1>
        <p className="mt-3 max-w-2xl text-pretty text-[0.9375rem] leading-relaxed text-[#C8C8D8] sm:text-[1.0625rem]">
          Choose a lane, explore the problem grid, then read how we usually
          deliver — same team from estimate to launch.
        </p>
      </header>

      <NeedPathSelector />
      <ServicesGrid />
      <ServiceLanePanels />

      <section
        className={`${contentWell} border-t border-[#1E1E35] py-12 sm:py-14 md:py-16`}
        aria-labelledby="services-cta-heading"
      >
        <h2 id="services-cta-heading" className="sr-only">
          Contact
        </h2>
        <p className="max-w-xl text-[1.0625rem] leading-relaxed text-[#C8C8D8]">
          Ready to talk scope? Send a short note — we reply with next steps and a
          clear estimate when it&apos;s a fit.
        </p>
        <Link
          href="/#contact"
          className={`mt-6 inline-flex min-h-12 items-center justify-center rounded-lg bg-gradient-to-r from-[#7C3FFF] to-[#00E5FF] px-8 text-[13px] font-semibold text-white shadow-lg transition-all duration-300 ${focusRing} hover:shadow-[0_0_30px_-5px_rgba(124,63,255,0.4)]`}
        >
          Get in touch
        </Link>
      </section>
    </div>
  );
}
