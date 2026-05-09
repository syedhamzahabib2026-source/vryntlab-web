"use client";

import { useState } from "react";
import { focusRing } from "@/components/layout/layoutTokens";

const FAQS = [
  {
    q: "What is GEO?",
    a: "GEO stands for Generative Engine Optimization. It's the practice of making your content structured and clear enough that AI tools like ChatGPT, Perplexity, and Google AI Overviews cite your business when answering relevant questions.",
  },
  {
    q: "Is GEO different from SEO?",
    a: "They overlap significantly. Good SEO helps GEO. But GEO has additional requirements — structured data, clear entity definitions, and content written to be extracted rather than just read. A site optimized only for traditional search may still be invisible to AI engines.",
  },
  {
    q: "Do small businesses need to worry about GEO?",
    a: "Yes, increasingly. AI-powered search is growing fast. Businesses that establish structured, citable content now will have an advantage as AI search becomes the default for more queries.",
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
