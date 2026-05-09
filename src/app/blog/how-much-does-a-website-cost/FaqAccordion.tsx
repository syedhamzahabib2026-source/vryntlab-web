"use client";

import { useState } from "react";
import { focusRing } from "@/components/layout/layoutTokens";

const FAQS = [
  {
    q: "How much does a basic small business website cost?",
    a: "A basic small business website typically costs $500–$2,000 when built by a freelancer or small studio. DIY builders like Squarespace run $16–$49/month but require your own time.",
  },
  {
    q: "What affects the cost of a website?",
    a: "Number of pages, custom design vs template, integrations like booking or e-commerce, SEO setup, and ongoing maintenance all affect price.",
  },
  {
    q: "Is a cheaper website worth it?",
    a: "It depends on your goal. If the site is meant to win customers, a cheap site that loses trust or loads slowly costs more in missed business than the savings.",
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
            <p className="pb-5 text-[0.9375rem] leading-[1.68] text-[#C8C8D8]/80">{faq.a}</p>
          )}
        </div>
      ))}
    </div>
  );
}
