import Link from "next/link";
import { Globe, Zap, Bot } from "lucide-react";
import { contentWell, focusRing } from "@/components/layout/layoutTokens";
import { SectionShell } from "@/components/layout/SectionShell";
import { brandHomeServicesTeaser } from "@/lib/brand-knowledge";

const services = [
  {
    icon: Globe,
    title: "Websites & Storefronts",
    description: "We build and improve marketing sites and storefronts — fast loads, a clear story, and paths that convert.",
  },
  {
    icon: Zap,
    title: "Automation & Integrations",
    description: "We wire automation, integrations, and on-site AI chatbots when they save real time and leads.",
  },
  {
    icon: Bot,
    title: "Custom Solutions",
    description: "We scope honestly: you get a written estimate before heavy work — not a six-week deck process.",
  },
];

export function ServicesHomeTeaser() {
  return (
    <SectionShell
      id="services-teaser"
      labelledBy="services-teaser-heading"
      pad="compact"
      className="!scroll-mt-20 border-t border-[#1E1E35] pt-16 sm:!scroll-mt-24 sm:pt-20 md:!scroll-mt-28 md:pt-24"
    >
      <div className={contentWell}>
        {/* Section header */}
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7C3FFF]">
          Services
        </p>
        <h2
          id="services-teaser-heading"
          className="font-display mt-3 text-balance text-[1.625rem] font-medium leading-[1.1] tracking-[-0.02em] text-[#F0F0FF] sm:text-[1.875rem] md:text-[2.25rem]"
        >
          What we do
        </h2>
        
        {/* Services grid */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 md:grid-cols-3 md:gap-6">
          {services.map((service) => (
            <article
              key={service.title}
              className="group rounded-xl border border-[#1E1E35] bg-[#0F0F1A] p-6 transition-all duration-400 ease-[var(--ease-out-premium)] hover:-translate-y-1 hover:border-[#7C3FFF]/30 hover:shadow-[0_0_40px_-15px_rgba(124,63,255,0.15)]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#1E1E35] bg-[#1E1E35]/30">
                <service.icon className="h-5 w-5 text-[#7C3FFF]" />
              </div>
              <h3 className="mt-4 font-display text-base font-medium tracking-[-0.02em] text-[#F0F0FF] sm:text-lg">
                {service.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-[#C8C8D8] sm:text-[15px]">
                {service.description}
              </p>
            </article>
          ))}
        </div>

        {/* CTA link */}
        <Link
          href="/services"
          className={`mt-8 inline-flex min-h-11 items-center gap-1.5 text-[13px] font-semibold text-[#7C3FFF] underline decoration-[#7C3FFF]/30 underline-offset-4 transition-all duration-300 ${focusRing} rounded-md hover:gap-2.5 hover:text-[#9d6aff] hover:decoration-[#7C3FFF]`}
        >
          {brandHomeServicesTeaser.ctaLabel}
        </Link>
      </div>
    </SectionShell>
  );
}
