import { HoverLift, Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";

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
  "group flex h-full flex-col rounded-2xl border border-zinc-200/90 bg-white p-8 shadow-[0_1px_0_0_rgba(0,0,0,0.04)] transition-shadow duration-300 hover:shadow-[0_20px_50px_-24px_rgba(0,0,0,0.1)] sm:p-9 dark:border-zinc-800 dark:bg-zinc-950/60 dark:shadow-none dark:hover:shadow-[0_24px_55px_-20px_rgba(0,0,0,0.55)]";

export function Services() {
  return (
    <section id="services" className="scroll-mt-28" aria-labelledby="services-heading">
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-500">
            Services
          </p>
          <h2
            id="services-heading"
            className="mt-5 text-4xl font-semibold tracking-[-0.03em] text-zinc-950 md:text-5xl dark:text-zinc-50"
          >
            What we actually do
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            Three buckets—most client work fits one or two. We&apos;ll tell you
            straight if something needs a different specialist.
          </p>
        </div>
      </Reveal>
      <StaggerGroup className="mt-16 grid gap-8 md:mt-20 md:grid-cols-3 md:gap-10">
        {services.map((item) => (
          <StaggerItem key={item.title}>
            <HoverLift className={cardClassName}>
              <div className="h-px w-10 bg-zinc-950 dark:bg-zinc-50" aria-hidden />
              <h3 className="mt-7 text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                {item.title}
              </h3>
              <p className="mt-4 flex-1 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                {item.description}
              </p>
              <p className="mt-8 border-t border-zinc-100 pt-6 text-[13px] leading-relaxed text-zinc-500 dark:border-zinc-800/80 dark:text-zinc-500">
                {item.scope}
              </p>
            </HoverLift>
          </StaggerItem>
        ))}
      </StaggerGroup>
      <Reveal>
        <p className="mx-auto mt-16 max-w-md text-center text-[14px] leading-relaxed text-zinc-500 md:mt-20 dark:text-zinc-500">
          We say no sometimes. Better than saying yes and delivering something
          mediocre.
        </p>
      </Reveal>
    </section>
  );
}
