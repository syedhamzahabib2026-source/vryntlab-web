"use client";

import { motion } from "motion/react";
import { ContactForm } from "@/components/ui/ContactForm";
import { siteEmail } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

const childVariant = {
  hidden: { opacity: 0, y: 24, scale: 0.985 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.75, ease },
  },
};

const parentVariant = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
};

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="h-px w-4 shrink-0 bg-[#8888a8]" aria-hidden />
      <span className="text-[13px] font-normal text-[#8888a8]">{text}</span>
    </div>
  );
}

export function ContactCta() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-16 lg:py-[140px]"
      style={{ background: "var(--surface)" }}
    >
      <div className="mx-auto w-full max-w-[1290px] px-4 sm:px-8 lg:px-[30px]">

        {/* Full stagger from label down */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={parentVariant}
        >
          <motion.div variants={childVariant}>
            <SectionLabel text="Get in Touch" />
          </motion.div>

          {/* Two-col: headline+info left, form right */}
          <div className="mt-10 grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20">

            {/* LEFT: headline + contact info */}
            <div className="flex flex-col justify-between gap-10">
              <motion.h2
                id="contact-heading"
                variants={childVariant}
                className="text-[2.25rem] font-medium leading-[1.1] tracking-[-0.035em] text-[#F0F0FF] sm:text-[3rem] lg:text-[3.5rem]"
              >
                Let&rsquo;s talk{" "}
                <span className="text-white/40">about</span>
                <br />
                <span className="text-white/40">your</span> next project.
              </motion.h2>

              <motion.div variants={childVariant} className="flex flex-col gap-4">
                <p className="text-[1.125rem] font-normal leading-[1.5] text-[#8888a8]">
                  Tell us what you&rsquo;re building. We&rsquo;ll reply with a
                  clear plan and price — no decks, no back-and-forth.
                </p>

                <a
                  href={`mailto:${siteEmail}`}
                  className="inline-flex w-fit items-center gap-2 text-[1.125rem] font-normal text-[#F0F0FF] underline decoration-white/20 underline-offset-4 transition-colors duration-200 [@media(hover:hover)]:hover:decoration-white/60"
                >
                  {siteEmail}
                </a>
              </motion.div>
            </div>

            {/* RIGHT: contact form */}
            <motion.div variants={childVariant}>
              <ContactForm />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
