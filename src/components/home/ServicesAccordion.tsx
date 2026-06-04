"use client";

import Link from "next/link";
import { motion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="h-px w-4 shrink-0 bg-[#8888a8]" aria-hidden />
      <span className="text-[13px] font-normal text-[#8888a8]">{text}</span>
    </div>
  );
}

const SERVICES = [
  {
    num: "01",
    title: "Ecommerce & Shopify",
    tagline: "Build stores that convert.",
    description:
      "We design and build Shopify stores that turn browsers into buyers. Product pages, checkout flow, speed, and upsells — all of it handled.",
    href: "/services/shopify",
  },
  {
    num: "02",
    title: "Web Design",
    tagline: "Sites that tell a clear story.",
    description:
      "Marketing websites built to convert visitors into inquiries. Fast, mobile-first, and clear from the first scroll.",
    href: "/services/web-design",
  },
  {
    num: "03",
    title: "AI Chatbots",
    tagline: "Answer questions. Capture leads. 24/7.",
    description:
      "We build and train AI chatbots that handle customer questions, qualify leads, and book calls while you sleep.",
    href: "/services/ai-chatbot",
  },
  {
    num: "04",
    title: "SEO",
    tagline: "Get found. Stay found.",
    description:
      "On-page optimization, technical SEO, and content that ranks. We focus on traffic that converts, not just traffic.",
    href: "/services/seo",
  },
  {
    num: "05",
    title: "Automations",
    tagline: "Skip the manual work.",
    description:
      "Connect your tools, automate your follow-ups, and stop doing things a computer should be doing.",
    href: "/services/automation",
  },
  {
    num: "06",
    title: "Booking Systems",
    tagline: "Online bookings that work while you don't.",
    description:
      "Calendar integration, online payments, and automated reminders — your clients book themselves while you focus on delivery.",
    href: "/services/booking-systems",
  },
] as const;

export function ServicesAccordion() {
  return (
    <section
      aria-labelledby="services-heading"
      style={{ paddingTop: "100px" }}
    >
      <div className="mx-auto w-full max-w-[1290px] px-4 sm:px-8 lg:px-[30px]">

        {/* Label + heading — stagger in */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div
            variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } } }}
          >
            <SectionLabel text="What We Do Best" />
          </motion.div>

          <div className="mt-6 overflow-hidden">
            <motion.h2
              id="services-heading"
              variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } } }}
              className="text-[3rem] font-medium leading-[1] tracking-[-0.04em] text-[#F0F0FF] sm:text-[4.5rem] lg:text-[6rem]"
            >
              Our{" "}
              <span className="text-[#C8C8D8]/30">Services</span>
            </motion.h2>
          </div>
        </motion.div>

        {/* Numbered service list */}
        <ul className="mt-12" role="list">
          {SERVICES.map((svc) => (
            <motion.li
              key={svc.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.8, ease }}
            >
              <Link
                href={svc.href}
                className="group block border-t border-[#1E1E35] py-[80px] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">

                  {/* LEFT: number + title + tagline */}
                  <div className="flex flex-col">
                    {/* Number — cross-fades to gradient on hover */}
                    <span className="relative inline-block self-start pb-[10px] pt-[10px]">
                      <span className="text-[16px] font-normal text-[#8888a8] transition-opacity duration-300 group-hover:opacity-0">
                        {svc.num}
                      </span>
                      <span
                        className="absolute inset-0 flex items-center bg-gradient-to-r from-[#7C3FFF] to-[#00E5FF] bg-clip-text text-[16px] font-normal text-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        aria-hidden
                      >
                        {svc.num}
                      </span>
                    </span>

                    {/* Title — turns gradient on hover */}
                    <h3
                      className="bg-gradient-to-r from-[#7C3FFF] to-[#00E5FF] bg-clip-text text-[2.5rem] font-medium leading-[1.1] tracking-[-0.04em] text-[#F0F0FF] transition-colors duration-300 group-hover:text-transparent sm:text-[3.5rem] lg:text-[4.25rem]"
                    >
                      {svc.title}
                    </h3>

                    {/* Tagline */}
                    <p className="mt-1 text-[1.125rem] font-normal text-[#8888a8]">
                      {svc.tagline}
                    </p>
                  </div>

                  {/* RIGHT: description + arrow */}
                  <div className="flex items-start gap-6 lg:w-[360px] lg:shrink-0 lg:pt-[36px]">
                    <p className="flex-1 text-[1.125rem] font-normal leading-[1.6] text-[#8888a8]">
                      {svc.description}
                    </p>
                    {/* Arrow — shifts right on hover */}
                    <span
                      className="mt-1 shrink-0 text-[1.125rem] text-[#8888a8] transition-transform duration-300 group-hover:translate-x-2 group-hover:text-[#F0F0FF]"
                      aria-hidden
                    >
                      →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* Bottom border closure */}
        <div className="border-t border-[#1E1E35]" />
        <div className="pb-[100px]" />
      </div>
    </section>
  );
}
