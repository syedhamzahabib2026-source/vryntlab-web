"use client";

import { useState } from "react";
import { focusRing } from "@/components/layout/layoutTokens";

const FAQS = [
  {
    q: "How much does a Shopify store cost?",
    a: "Most Shopify builds from VryntLab run $500–$1,200. Simple stores with a theme and product setup start lower; custom layouts, apps, and checkout work push toward the higher end.",
  },
  {
    q: "Do you work with existing Shopify stores?",
    a: "Yes — we redesign, fix, and improve stores that are already live just as often as we build new ones.",
  },
  {
    q: "How long does a Shopify store take to build?",
    a: "Most stores are live in 1–2 weeks from when we have your products and brand assets.",
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
