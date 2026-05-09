"use client";

import { useState } from "react";
import { focusRing } from "@/components/layout/layoutTokens";

const FAQS = [
  {
    q: "How often should you redesign your website?",
    a: "Most small business websites need a meaningful update every 2–3 years. Technology, design standards, and your own business change faster than most people realize.",
  },
  {
    q: "How much does a website redesign cost?",
    a: "Most small business redesigns run $500–$1,500 with a small studio. The cost depends on how many pages need rebuilding and whether you're adding new features like booking or e-commerce.",
  },
  {
    q: "Can I just update my existing site instead?",
    a: "Sometimes yes. If the structure and messaging are sound and only the visuals are dated, a refresh costs less than a full rebuild. We'll tell you honestly which one you need.",
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
