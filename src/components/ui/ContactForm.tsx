"use client";

import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { motionEase } from "@/components/motion/Reveal";

const buttonTransition = { duration: 0.2, ease: motionEase };

const inputClass =
  "w-full rounded-2xl border border-zinc-200/90 bg-white px-4 py-3.5 text-[15px] leading-relaxed text-zinc-950 placeholder:text-zinc-400 shadow-[0_1px_0_0_rgba(0,0,0,0.03)] outline-none transition-[border-color,box-shadow] focus:border-zinc-300 focus:shadow-[0_0_0_3px_rgba(0,0,0,0.04)] dark:border-zinc-800 dark:bg-zinc-950/90 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-zinc-600 dark:focus:shadow-[0_0_0_3px_rgba(255,255,255,0.06)]";

const labelClass =
  "mb-2 block text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-500";

const primaryBtnClass =
  "inline-flex h-12 w-full items-center justify-center rounded-full bg-zinc-950 px-10 text-[13px] font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 sm:w-auto";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const payload = { name, email, description };
    console.log("[ContactForm]", payload);
    setSent(true);
  }

  if (sent) {
    return (
      <div
        className="mx-auto mt-14 max-w-md text-center"
        role="status"
        aria-live="polite"
      >
        <p className="text-lg font-medium tracking-tight text-zinc-950 dark:text-zinc-50">
          Got it. We&apos;ll read this and reply soon.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-zinc-500 dark:text-zinc-500">
          Usually within two business days.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-14 flex w-full max-w-md flex-col gap-9 text-left"
      noValidate
    >
      <div>
        <label htmlFor="contact-name" className={labelClass}>
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
          placeholder="Your name"
        />
      </div>
      <div>
        <label htmlFor="contact-email" className={labelClass}>
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
          placeholder="you@company.com"
        />
      </div>
      <div>
        <label htmlFor="contact-message" className={labelClass}>
          Project description
        </label>
        <textarea
          id="contact-message"
          name="description"
          required
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`${inputClass} min-h-[140px] resize-y`}
          placeholder="Rough idea of the problem, timeline, link if you have one."
        />
      </div>
      <div className="pt-1">
        <motion.button
          type="submit"
          className={primaryBtnClass}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.99 }}
          transition={buttonTransition}
        >
          Send message
        </motion.button>
      </div>
    </form>
  );
}
