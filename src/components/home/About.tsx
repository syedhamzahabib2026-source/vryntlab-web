import { Reveal } from "@/components/motion/Reveal";

export function About() {
  return (
    <Reveal>
      <section
        id="about"
        className="scroll-mt-28"
        aria-labelledby="about-heading"
      >
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-16 lg:items-start">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-500">
              About
            </p>
            <h2
              id="about-heading"
              className="mt-5 text-4xl font-semibold tracking-[-0.03em] text-zinc-950 md:text-5xl dark:text-zinc-50"
            >
              A small studio, not a department store
            </h2>
          </div>
          <div className="space-y-6 text-[17px] leading-[1.65] text-zinc-600 dark:text-zinc-400">
            <p>
              Trellisify is a handful of people who spend most of their time on
              the web: shipping pages, fixing what broke, and plugging tools
              together. You talk to whoever is actually building—not a rotating
              cast of account managers.
            </p>
            <p>
              We&apos;re picky about fit. If the timeline, budget, or problem
              isn&apos;t right, we&apos;d rather say so than drag something out.
            </p>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
