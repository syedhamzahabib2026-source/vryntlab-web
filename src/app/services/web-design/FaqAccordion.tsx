"use client";

import { useState } from "react";
import { focusRing } from "@/components/layout/layoutTokens";

const FAQS = [
  {
    q: "How much does a small business website cost?",
    a: "Most small business websites from VryntLab run $500–$1,500. Simple 3–5 page sites start lower; custom design with integrations and SEO setup move toward the higher end.",
  },
  {
    q: "How long does it take to build a website?",
    a: "Most sites are live in 1–2 weeks from when we have your content and brand assets. Complex projects take longer — we scope it before we start.",
  },
  {
    q: "Do I need to provide the content?",
    a: "We can work with what you have or help you structure and write it. Most clients provide a rough brief and we shape it from there.",
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
