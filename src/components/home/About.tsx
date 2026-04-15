import { proseComfort } from "@/components/layout/layoutTokens";
import { SectionIntro } from "@/components/layout/SectionIntro";
import { SectionShell } from "@/components/layout/SectionShell";
import { Reveal } from "@/components/motion/Reveal";
import { brandAbout } from "@/lib/brand-knowledge";

const bodyClass = `${proseComfort} max-w-[40ch] space-y-4 border-l-0 py-0 pl-0 text-[15px] leading-[1.62] text-zinc-600 sm:max-w-[42ch] sm:space-y-5 sm:border-l-2 sm:border-[var(--accent)]/22 sm:py-0.5 sm:pl-5 sm:text-[16px] sm:leading-[1.64] md:max-w-[44ch] lg:col-span-7 lg:col-start-6 lg:max-w-none lg:pl-8 dark:border-[var(--accent)]/28 dark:text-zinc-400`;

export function About() {
  return (
    <SectionShell id="about" labelledBy="about-heading">
      <Reveal>
        <div className="grid gap-7 border-t border-[var(--border)] pt-9 sm:gap-8 sm:pt-10 md:gap-9 md:pt-11 lg:grid-cols-12 lg:items-start lg:gap-x-14 lg:gap-y-0 lg:pt-14 xl:pt-[3.25rem]">
          <div className="max-w-[min(100%,24rem)] lg:col-span-4 lg:max-w-none">
            <SectionIntro
              eyebrow={brandAbout.eyebrow}
              titleId="about-heading"
              title={brandAbout.title}
              className="max-w-none"
            />
          </div>
          <div className={bodyClass}>
            {brandAbout.paragraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}
