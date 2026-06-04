"use client";

import { motion } from "motion/react";
import { ContactForm } from "@/components/ui/ContactForm";
import { siteEmail } from "@/lib/site";

const ease = [0.16, 1, 0.3, 1] as const;

const inViewItem = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
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
      style={{
        paddingTop: "100px",
        paddingBottom: "100px",
        background: "var(--surface)",
      }}
    >
      <div className="mx-auto w-full max-w-[1290px] px-4 sm:px-8 lg:px-[30px]">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease }}
        >
          <SectionLabel text="Get in Touch" />
        </motion.div>

        {/* Two-col: headline+info left, form right */}
        <div className="mt-10 grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20">

          {/* LEFT: headline + contact info — stagger in */}
          <motion.div
            className="flex flex-col justify-between gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } } }}
          >
            <motion.h2
              id="contact-heading"
              variants={inViewItem}
              className="text-[2.25rem] font-medium leading-[1.1] tracking-[-0.035em] text-[#F0F0FF] sm:text-[3rem] lg:text-[3.5rem]"
            >
              Let&rsquo;s talk about
              <br />
              your next project.
            </motion.h2>

            <motion.div variants={inViewItem} className="flex flex-col gap-4">
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
          </motion.div>

          {/* RIGHT: contact form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
