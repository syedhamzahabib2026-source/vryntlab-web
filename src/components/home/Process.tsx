import { SectionIntro } from "@/components/layout/SectionIntro";
import { SectionShell } from "@/components/layout/SectionShell";
import { Reveal } from "@/components/motion/Reveal";
import { brandProcess } from "@/lib/brand-knowledge";

const steps = brandProcess.steps;

const stepCardClass =
  "group/step flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[color-mix(in_oklab,var(--surface)_88%,var(--surface-soft))] p-6 shadow-[var(--shadow-sm)] ring-1 ring-black/[0.02] transition-[border-color,box-shadow,transform] duration-300 ease-[var(--ease-out-premium)] motion-reduce:transform-none motion-reduce:duration-150 active:scale-[0.995] sm:p-7 md:p-8 dark:bg-[color-mix(in_oklab,var(--surface)_75%,var(--surface-soft))] dark:ring-white/[0.04] [@media(hover:hover)]:hover:-translate-y-0.5 [@media(hover:hover)]:hover:border-zinc-300/70 [@media(hover:hover)]:hover:shadow-[var(--shadow-md)] dark:[@media(hover:hover)]:hover:border-zinc-600/45";

export function Process() {
  return (
    <SectionShell id="process" labelledBy="process-heading">
      <div className="flex flex-col gap-7 border-t border-[var(--border)] pt-8 sm:gap-10 sm:pt-11 md:gap-12 md:pt-12 lg:gap-14 lg:pt-14 xl:gap-16 xl:pt-16">
        <Reveal>
          <SectionIntro
            eyebrow={brandProcess.eyebrow}
            titleId="process-heading"
            title={brandProcess.title}
            description={<>{brandProcess.description}</>}
            align="start"
          />
        </Reveal>

        <ol className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3 md:gap-4 lg:gap-6 xl:gap-8">
          {steps.map((step, index) => (
            <li key={step.title}>
              <Reveal delay={index * 0.045}>
                <article className={stepCardClass}>
                  <span className="text-[11px] font-semibold tabular-nums text-[var(--accent)] opacity-85 dark:opacity-90">
                    {step.phase}
                  </span>
                  <h3 className="font-display mt-3 text-[1.0625rem] font-normal tracking-[-0.02em] text-zinc-950 sm:mt-4 sm:text-lg md:text-xl dark:text-zinc-50">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-[14px] leading-[1.62] text-zinc-600 sm:mt-3 sm:text-[15px] sm:leading-[1.65] dark:text-zinc-400">
                    {step.description}
                  </p>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </SectionShell>
  );
}
