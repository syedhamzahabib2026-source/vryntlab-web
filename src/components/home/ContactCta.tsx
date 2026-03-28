"use client";

import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/ui/ContactForm";
import { siteEmail } from "@/lib/site";

export function ContactCta() {
  return (
    <Reveal>
      <section
        id="contact"
        className="scroll-mt-28"
        aria-labelledby="contact-heading"
      >
        <div className="rounded-3xl border border-zinc-200/90 bg-zinc-50/80 px-8 py-20 text-center dark:border-zinc-800 dark:bg-zinc-950/40 sm:px-14 sm:py-24">
          <h2
            id="contact-heading"
            className="text-4xl font-semibold tracking-[-0.03em] text-zinc-950 md:text-5xl dark:text-zinc-50"
          >
            Say hello
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            Drop a few lines: what you&apos;re trying to fix or build, when you
            need it, and a link if there&apos;s something to look at. We read
            everything and answer within a couple of business days.
          </p>
          <p className="mx-auto mt-4 max-w-md text-[14px] leading-relaxed text-zinc-500 dark:text-zinc-500">
            No pitch deck required.
          </p>

          <ContactForm />

          <p className="mx-auto mt-12 max-w-md text-[12px] leading-relaxed text-zinc-500 dark:text-zinc-500">
            Old-fashioned email still works:{" "}
            <a
              href={`mailto:${siteEmail}`}
              className="font-medium text-zinc-700 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-500 dark:text-zinc-300 dark:decoration-zinc-600 dark:hover:decoration-zinc-400"
            >
              {siteEmail}
            </a>
          </p>
        </div>
      </section>
    </Reveal>
  );
}
