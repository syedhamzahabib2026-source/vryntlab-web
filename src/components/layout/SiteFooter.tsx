"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { focusRing } from "@/components/layout/layoutTokens";
import { navLinks, siteBrandName, siteEmail, siteLogoSrc } from "@/lib/site";

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

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/acceptable-use", label: "Acceptable Use" },
] as const;

const socialLinks = [
  { href: "https://www.instagram.com/vryntlab/", label: "Instagram" },
  { href: "https://www.facebook.com/people/VryntLab/61564736394364/", label: "Facebook" },
  { href: "/x", label: "X (Twitter)" },
] as const;

const footerLinkClass =
  `block py-0.5 text-[15px] font-normal text-[#8888a8] transition-colors duration-200 ${focusRing} rounded-sm [@media(hover:hover)]:hover:text-[#F0F0FF]`;

const legalLinkClass =
  `${focusRing} text-[12px] font-normal text-[#6B6B85] transition-colors duration-200 rounded-sm [@media(hover:hover)]:hover:text-[#8888a8]`;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto" style={{ background: "var(--surface)" }}>
      {/* Gradient top border */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(124,63,255,0.4) 35%, rgba(0,229,255,0.25) 65%, transparent)",
        }}
        aria-hidden
      />

      <div
        className="mx-auto w-full max-w-[1290px] px-4 sm:px-8 lg:px-[30px]"
        style={{ paddingTop: "40px", paddingBottom: "40px" }}
      >
        {/* Top: logo + tagline */}
        <motion.div
          className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={parentVariant}
        >
          <motion.div variants={childVariant}>
            <Link
              href="/"
              className={`inline-block shrink-0 ${focusRing} rounded-md`}
              aria-label={`${siteBrandName}, home`}
            >
              <Image
                src={siteLogoSrc}
                alt={siteBrandName}
                width={200}
                height={80}
                className="h-auto w-[120px] object-contain"
              />
            </Link>
          </motion.div>

          <motion.p
            variants={childVariant}
            className="max-w-[380px] text-[15px] font-normal leading-[1.55] text-[#8888a8]"
          >
            Crafting fast, focused websites and stores for businesses that
            can&rsquo;t afford to underperform online.
          </motion.p>
        </motion.div>

        {/* Divider */}
        <div className="my-8 h-px bg-[#1E1E35]" aria-hidden />

        {/* Main footer body: columns left, CTA right */}
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">

          {/* LEFT: link columns */}
          <motion.div
            className="flex flex-wrap gap-10 sm:gap-16"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={parentVariant}
          >
            {/* Pages */}
            <motion.div variants={childVariant}>
              <p className="mb-4 text-[13px] font-normal text-[#8888a8]">Pages</p>
              <ul className="space-y-1" role="list">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={footerLinkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Legal */}
            <motion.div variants={childVariant}>
              <p className="mb-4 text-[13px] font-normal text-[#8888a8]">Legal</p>
              <ul className="space-y-1" role="list">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={footerLinkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Social */}
            <motion.div variants={childVariant}>
              <p className="mb-4 text-[13px] font-normal text-[#8888a8]">Social</p>
              <ul className="space-y-1" role="list">
                {socialLinks.map((link) => {
                  const external = link.href.startsWith("http");
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className={footerLinkClass}
                        {...(external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : { rel: "nofollow" })}
                      >
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </motion.div>

          {/* RIGHT: CTA strip */}
          <motion.div
            className="flex flex-col justify-between gap-8 lg:max-w-[440px]"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={parentVariant}
          >
            <motion.p
              variants={childVariant}
              className="text-[2rem] font-medium leading-[1.15] tracking-[-0.03em] text-[#F0F0FF] sm:text-[2.5rem] lg:text-[3rem]"
            >
              Let&rsquo;s create{" "}
              <span className="text-white/40">something</span>{" "}
              great together.
            </motion.p>

            {/* Pill + circle arrow */}
            <motion.div variants={childVariant} className="flex items-center gap-3">
              <Link
                href="/#contact"
                className={`inline-flex items-center rounded-full bg-gradient-to-r from-[#7C3FFF] to-[#00E5FF] px-6 py-3 text-[16px] font-medium text-white shadow-[0_0_24px_-6px_rgba(124,63,255,0.45)] transition-[transform,box-shadow] duration-[180ms] active:scale-[0.98] ${focusRing} [@media(hover:hover)]:hover:scale-[1.02] [@media(hover:hover)]:hover:-translate-y-px [@media(hover:hover)]:hover:shadow-[0_0_36px_-4px_rgba(124,63,255,0.65)]`}
              >
                Say Hello
              </Link>
              <Link
                href="/#contact"
                aria-hidden
                tabIndex={-1}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-[#7C3FFF] to-[#00E5FF] text-[18px] text-white shadow-[0_0_20px_-6px_rgba(124,63,255,0.4)] transition-[transform,box-shadow] duration-[180ms] [@media(hover:hover)]:hover:scale-[1.02] [@media(hover:hover)]:hover:-translate-y-px"
              >
                →
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-[#1E1E35] pt-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-1">
              <p className="text-[13px] font-normal text-[#6B6B85]">
                &copy; {year} {siteBrandName}. All rights reserved.
              </p>
              <a
                href={`mailto:${siteEmail}`}
                className={`w-fit text-[13px] font-normal text-[#6B6B85] underline decoration-transparent underline-offset-4 transition-[color,text-decoration-color] duration-200 ${focusRing} rounded-sm [@media(hover:hover)]:hover:text-[#8888a8] [@media(hover:hover)]:hover:decoration-current`}
              >
                {siteEmail}
              </a>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5">
              {legalLinks.map((link) => (
                <Link key={link.href} href={link.href} className={legalLinkClass}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
