"use client";

import { useState } from "react";
import { focusRing } from "@/components/layout/layoutTokens";

const FAQS = [
  {
    q: "How much does a booking system cost?",
    a: "Most booking system builds from VryntLab run $150–$500. Simple calendar integrations start lower; custom intake flows with CRM sync and automated reminders cost more.",
  },
  {
    q: "What booking platforms do you work with?",
    a: "Calendly, Acuity, Cal.com, Google Calendar, and custom-built solutions depending on your needs and existing tools.",
  },
  {
    q: "Can you connect the booking system to my CRM?",
    a: "Yes. We commonly connect booking to HubSpot, Salesforce, Airtable, or Google Sheets so every booking becomes a lead record automatically.",
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
