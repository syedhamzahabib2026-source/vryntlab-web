import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { narrowMeasure } from "@/components/layout/layoutTokens";
import { SectionIntro } from "@/components/layout/SectionIntro";
import { SectionShell } from "@/components/layout/SectionShell";

const services = [
  {
    title: "Websites",
    description:
      "Redesigns and tune-ups: clearer layout, faster loads, and copy that search engines can actually read. We’re happy to inherit something messy and leave it in better shape.",
    scope:
      "Redesigns, UI and UX fixes, speed work, and SEO cleanup—without rewriting your brand voice for you.",
  },
  {
    title: "Systems & automation",
    description:
      "Booking flows, chatbots and light AI helpers, and the small scripts that stop work piling up in inboxes. If two systems should talk to each other, we can usually get them there.",
    scope:
      "Booking systems, chatbots and AI-assisted tools, workflow automation, and integrations across the stack you already use.",
  },
  {
    title: "Custom development",
    description:
      "When you need a real screen or API—not another plugin. Dashboards, backends, and net-new features, scoped so you know what you’re buying.",
    scope:
      "Dashboards, backend pieces, and feature builds for products that have outgrown off-the-shelf tools.",
  },
] as const;

const cardClassName =
  "group/card flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-sm)] ring-1 ring-black/[0.02] transition-[box-shadow,border-color,transform] duration-300 ease-[var(--ease-out-premium)] motion-reduce:transform-none motion-reduce:duration-150 active:scale-[0.995] sm:p-7 md:p-8 lg:p-9 dark:ring-white/[0.04] [@media(hover:hover)]:hover:-translate-y-0.5 [@media(hover:hover)]:hover:border-zinc-300/80 [@media(hover:hover)]:hover:shadow-[var(--shadow-md)] dark:[@media(hover:hover)]:hover:border-zinc-600/45";

export function Services() {
  return (
    <SectionShell id="services" labelledBy="services-heading">
      <div className="flex flex-col gap-9 sm:gap-10 md:gap-12 lg:gap-14 xl:gap-16">
        <Reveal>
          <SectionIntro
            eyebrow="Services"
            titleId="services-heading"
            title="What we actually do"
            description={
              <>
                Three buckets—most client work fits one or two. We&apos;ll tell
                you straight if something needs a different specialist.
              </>
            }
            align="start"
          />
        </Reveal>

        <StaggerGroup className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-3 md:gap-5 lg:gap-8 xl:gap-10">
          {services.map((item) => (
            <StaggerItem key={item.title}>
              <article className={cardClassName}>
                <div
                  className="h-0.5 w-11 bg-[var(--accent)] opacity-85 transition-opacity [@media(hover:hover)]:group-hover/card:opacity-100 dark:opacity-75"
                  aria-hidden
                />
                <h3 className="mt-5 text-[1.0625rem] font-semibold tracking-[-0.02em] text-zinc-950 sm:text-lg md:mt-6 md:text-xl dark:text-zinc-50">
                  {item.title}
                </h3>
                <p className="mt-2.5 flex-1 text-[14px] leading-[1.62] text-zinc-600 sm:mt-3 sm:text-[15px] sm:leading-[1.65] dark:text-zinc-400">
                  {item.description}
                </p>
                <div className="mt-6 rounded-xl border border-[var(--border)] bg-[color-mix(in_oklab,var(--surface-soft)_70%,var(--surface))] px-3.5 py-3 sm:mt-7 sm:px-4 sm:py-3.5 dark:border-zinc-800/90">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-zinc-500 sm:text-[12px] sm:tracking-[0.12em] dark:text-zinc-500">
                    Typical scope
                  </p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-600 sm:mt-2 dark:text-zinc-400">
                    {item.scope}
                  </p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal>
          <p
            className={`${narrowMeasure} border-l-2 border-[var(--accent)]/30 py-0.5 pl-3.5 text-[13px] leading-relaxed text-zinc-600 sm:pl-4 sm:text-[14px] dark:border-[var(--accent)]/35 dark:text-zinc-500`}
          >
            We turn down work when we&apos;re not the right fit—better than
            overpromising and under-delivering.
          </p>
        </Reveal>
      </div>
    </SectionShell>
  );
}
