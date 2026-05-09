"use client";

import { useState } from "react";
import { focusRing } from "@/components/layout/layoutTokens";

const FAQS = [
  {
    q: "How long does SEO take to show results?",
    a: "Most businesses see meaningful movement in 3–6 months for local search. Technical fixes and Google Business Profile work can show results faster — sometimes within weeks.",
  },
  {
    q: "What is GEO and why does it matter?",
    a: "GEO stands for Generative Engine Optimization — it's the practice of making your content discoverable by AI tools like ChatGPT, Perplexity, and Google AI Overviews. It matters because a growing share of searches now get answered directly by AI, not a list of links.",
  },
  {
    q: "Do you offer ongoing SEO retainers?",
    a: "Yes. We offer monthly SEO work for businesses that want to build visibility over time. Scope and price depend on what's already in place — we assess before quoting.",
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
