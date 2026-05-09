"use client";

import { useState } from "react";
import { focusRing } from "@/components/layout/layoutTokens";

const FAQS = [
  {
    q: "What tools can you automate?",
    a: "Most common business tools — HubSpot, Salesforce, Google Sheets, Airtable, Calendly, Stripe, Slack, Gmail, Zapier, Make, and custom APIs. If it has an API, we can usually connect it.",
  },
  {
    q: "How much does automation cost?",
    a: "Most automation projects run $450–$1,300. Simple one-step connections start lower; multi-step workflows with error handling and monitoring cost more.",
  },
  {
    q: "Do I need to change the tools I already use?",
    a: "No. We work with what you have. The goal is connecting your existing tools, not replacing them.",
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
