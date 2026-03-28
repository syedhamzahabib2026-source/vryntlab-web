import { Reveal } from "@/components/motion/Reveal";

const steps = [
  {
    phase: "01",
    title: "Discover",
    description:
      "We talk through what you need, what’s already there, and what done looks like. You get a scope you can plan around—not a vague estimate.",
  },
  {
    phase: "02",
    title: "Design",
    description:
      "Layout and UI land before we go deep on code. You see something tangible early, so we’re not guessing in production.",
  },
  {
    phase: "03",
    title: "Build",
    description:
      "We ship in slices you can review. Fast enough to matter, careful enough to sleep at night.",
  },
] as const;

export function Process() {
  return (
    <section
      id="process"
      className="scroll-mt-28"
      aria-labelledby="process-heading"
    >
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-500">
            Process
          </p>
          <h2
            id="process-heading"
            className="mt-5 text-4xl font-semibold tracking-[-0.03em] text-zinc-950 md:text-5xl dark:text-zinc-50"
          >
            How a project usually runs
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            Nothing ceremonial—just a rhythm that keeps everyone oriented.
          </p>
        </div>
      </Reveal>
      <ol className="mt-16 grid gap-14 md:mt-20 md:grid-cols-3 md:gap-12">
        {steps.map((step, index) => (
          <li key={step.title}>
            <Reveal delay={index * 0.06}>
              <article className="flex h-full flex-col border-t border-zinc-200/90 pt-8 dark:border-zinc-800/90">
                <span className="text-[11px] font-medium tabular-nums text-zinc-400 dark:text-zinc-500">
                  {step.phase}
                </span>
                <h3 className="mt-4 text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                  {step.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.65] text-zinc-600 dark:text-zinc-400">
                  {step.description}
                </p>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
