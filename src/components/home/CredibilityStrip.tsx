import { Reveal } from "@/components/motion/Reveal";

const segments = [
  "SaaS",
  "Professional services",
  "E-commerce",
  "Teams shipping online",
] as const;

export function CredibilityStrip() {
  return (
    <Reveal>
      <section
        className="border-y border-zinc-200/80 py-14 md:py-16 dark:border-zinc-800/80"
        aria-labelledby="credibility-heading"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="credibility-heading" className="sr-only">
            Who we serve
          </h2>
          <p className="text-[15px] font-medium leading-relaxed text-zinc-700 dark:text-zinc-300">
            Most of our clients sell or support something on the web. They want
            someone who can ship without a month of meetings first.
          </p>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {segments.map((label) => (
              <li
                key={label}
                className="text-xs font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-500"
              >
                {label}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Reveal>
  );
}
