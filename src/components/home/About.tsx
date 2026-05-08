import { contentWell } from "@/components/layout/layoutTokens";
import { SectionIntro } from "@/components/layout/SectionIntro";
import { SectionShell } from "@/components/layout/SectionShell";
import { brandAbout } from "@/lib/brand-knowledge";

const whyPoints = [
  {
    number: "01",
    title: "Direct Access",
    description: "You work directly with the people shipping the work. No account managers, no handoffs, no disappearing after launch.",
  },
  {
    number: "02", 
    title: "Clear Pricing",
    description: "We&apos;re upfront about fit, scope, and price from day one. Projects typically start at $500 — if it&apos;s not a fit, we&apos;ll say so.",
  },
  {
    number: "03",
    title: "Fast Delivery",
    description: "A small, fast-moving studio that builds websites, AI chatbots, and automations for businesses that need results — not a 6-week agency process.",
  },
];

export function About() {
  return (
    <SectionShell id="about" labelledBy="about-heading">
      <div className={`${contentWell} flex flex-col gap-12 border-t border-[#1E1E35] pt-16 sm:gap-14 sm:pt-20 md:gap-16 md:pt-24`}>
        {/* Section header */}
        <SectionIntro
          eyebrow={brandAbout.eyebrow}
          titleId="about-heading"
          title={brandAbout.title}
        />

        {/* Why VryntLab - 3 columns */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-0">
          {whyPoints.map((point, index) => (
            <div 
              key={point.number} 
              className={`flex flex-col ${index !== 2 ? 'md:border-r md:border-[#1E1E35] md:pr-8' : ''} ${index !== 0 ? 'md:pl-8' : ''}`}
            >
              {/* Large violet number */}
              <span className="text-[3rem] font-bold leading-none text-[#7C3FFF]/80 sm:text-[4rem]">
                {point.number}
              </span>
              <h3 className="mt-4 font-display text-lg font-medium tracking-[-0.02em] text-[#F0F0FF] sm:text-xl">
                {point.title}
              </h3>
              <p className="mt-3 text-[14px] leading-[1.65] text-[#C8C8D8] sm:text-[15px]">
                {point.description}
              </p>
            </div>
          ))}
        </div>

        {/* About paragraphs */}
        <div className="max-w-2xl space-y-4 border-l-2 border-[#7C3FFF]/30 py-1 pl-6 text-[15px] leading-[1.65] text-[#C8C8D8] sm:text-[16px]">
          {brandAbout.paragraphs.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
