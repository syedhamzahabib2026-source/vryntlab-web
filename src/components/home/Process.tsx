import { SectionIntro } from "@/components/layout/SectionIntro";
import { SectionShell } from "@/components/layout/SectionShell";
import { contentWell } from "@/components/layout/layoutTokens";
import { brandProcess } from "@/lib/brand-knowledge";

const steps = brandProcess.steps;

export function Process() {
  return (
    <SectionShell id="process" labelledBy="process-heading">
      <div className={`${contentWell} flex flex-col gap-10 border-t border-[#1E1E35] pt-16 sm:gap-12 sm:pt-20 md:gap-14 md:pt-24`}>
        <SectionIntro
          eyebrow={brandProcess.eyebrow}
          titleId="process-heading"
          title={brandProcess.title}
          description={<>{brandProcess.description}</>}
          align="start"
        />

        {/* Process steps with horizontal connecting line */}
        <div className="relative">
          {/* Connecting dashed line - desktop only */}
          <div className="absolute left-0 right-0 top-6 hidden h-px border-t-2 border-dashed border-[#7C3FFF]/30 md:block" style={{ left: '6rem', right: '6rem' }} />
          
          <ol className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6 lg:gap-8">
            {steps.map((step, index) => (
              <li key={step.title} className="relative">
                <article className="flex flex-col">
                  {/* Step number in violet circle */}
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#7C3FFF] bg-[#080810]">
                    <span className="text-[14px] font-semibold tabular-nums text-[#7C3FFF]">
                      {step.phase}
                    </span>
                  </div>
                  
                  <h3 className="font-display mt-5 text-lg font-medium tracking-[-0.02em] text-[#F0F0FF] sm:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-[1.65] text-[#C8C8D8] sm:text-[15px]">
                    {step.description}
                  </p>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </SectionShell>
  );
}
