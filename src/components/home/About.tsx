import { contentWell } from "@/components/layout/layoutTokens";
import { Reveal } from "@/components/motion/Reveal";
import { brandAbout } from "@/lib/brand-knowledge";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-[calc(4.5rem+0.25rem)] py-8 sm:scroll-mt-24 sm:py-10 md:scroll-mt-28"
    >
      <div className={contentWell}>
        <Reveal>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-20 lg:items-start">
            {/* Left: bold statement */}
            <div>
              <h2
                id="about-heading"
                className="text-[2.5rem] font-black leading-[1.04] tracking-[-0.035em] text-[#F0F0FF] sm:text-[3rem] lg:text-[3.5rem]"
              >
                A small team<br />
                that does<br />
                the whole thing.
              </h2>
              <p className="mt-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-[#7C3FFF]/70">
                About VryntLab
              </p>
            </div>

            {/* Right: paragraphs with violet accent line */}
            <div className="space-y-4 border-l-2 border-[#7C3FFF]/30 pl-6 text-[15px] leading-[1.65] text-[#C8C8D8]/80 sm:space-y-5 sm:text-[16px] lg:pl-8">
              {brandAbout.paragraphs.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
