"use client";

import { useState } from "react";
import { focusRing } from "@/components/layout/layoutTokens";

const FAQS = [
  {
    q: "How much does an AI chatbot cost for a small business?",
    a: "Most small business chatbots from VryntLab range from $200–$600 depending on complexity. Simple FAQ bots start lower; ones with lead capture and CRM integration cost more.",
  },
  {
    q: "How long does it take to set up?",
    a: "Usually 48–72 hours from when we have your business information. We handle training, setup, and installation.",
  },
  {
    q: "Will it work on my existing website?",
    a: "Yes. We install it on any website — WordPress, Shopify, Squarespace, custom HTML, or Next.js — with one line of code.",
  },
] as const;

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="divide-y divide-[#1E1E35] border-y border-[#1E1E35]">
      {FAQS.map((faq, i) => (
        <div key={i}>
          <button
            type="button"
            className={`flex w-full items-center justify-between gap-4 py-5 text-left transition-colors duration-200 ${focusRing} rounded-sm`}
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <span className="text-[0.9375rem] font-semibold text-[#F0F0FF]">{faq.q}</span>
            <span
              className="shrink-0 text-[1.125rem] font-light text-[#7C3FFF] transition-transform duration-200"
              aria-hidden
              style={{ transform: open === i ? "rotate(45deg)" : "rotate(0deg)" }}
            >
              +
            </span>
          </button>
          {open === i && (
            <p className="pb-5 text-[0.9375rem] leading-[1.68] text-[#C8C8D8]/80">
              {faq.a}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
