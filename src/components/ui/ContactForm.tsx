"use client";

import { useState, type FormEvent } from "react";
import { focusRing } from "@/components/layout/layoutTokens";
import { brandContactForm } from "@/lib/brand-knowledge";
import { siteBrandName } from "@/lib/site";

const inputClass =
  "min-h-12 w-full rounded-lg border border-[#1E1E35] bg-[#0F0F1A] px-4 py-3.5 text-[16px] leading-relaxed text-[#F0F0FF] placeholder:text-[#8888a0] outline-none transition-all duration-300 sm:text-[15px] hover:border-[#7C3FFF]/30 focus:border-[#7C3FFF] focus:ring-2 focus:ring-[#7C3FFF]/30";

const labelClass =
  "mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8888a0]";

const primaryBtnClass = `inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-gradient-to-r from-[#7C3FFF] to-[#00E5FF] px-8 text-[13px] font-semibold text-white shadow-lg transition-all duration-300 ${focusRing} enabled:hover:shadow-[0_0_30px_-5px_rgba(124,63,255,0.4)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-10`;

const errorTextClass =
  "rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm leading-relaxed text-red-400";

type ContactFormProps = {
  className?: string;
};

type ApiResponse = { ok: boolean; error?: string };

export function ContactForm({ className = "" }: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message: description,
          website: honeypot,
        }),
      });

      let data: ApiResponse = { ok: false };
      try {
        data = (await res.json()) as ApiResponse;
      } catch {
        /* non-JSON */
      }

      if (!res.ok || !data.ok) {
        setError(
          data.error ??
            "Something went wrong. Please try again or email us directly.",
        );
        return;
      }

      setSent(true);
    } catch {
      setError(
        "We couldn't reach the server. Check your connection and try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div
        className={`text-left ${className}`.trim()}
        role="status"
        aria-live="polite"
      >
        <p className="text-[1.0625rem] font-semibold tracking-tight text-[#F0F0FF] sm:text-lg">
          {brandContactForm.sentTitle}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[#C8C8D8]">
          {brandContactForm.sentBody}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[#8888a0]">
          {brandContactForm.sentFooter}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative flex w-full max-w-md flex-col gap-6 text-left sm:gap-7 lg:max-w-none ${className}`.trim()}
      noValidate
      aria-label={`Message ${siteBrandName}`}
      aria-busy={loading}
    >
      <div
        className="pointer-events-none absolute -left-[9999px] h-px w-px overflow-hidden"
        aria-hidden="true"
      >
        <input
          id="contact-honeypot"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>
      {error ? (
        <p className={errorTextClass} role="alert">
          {error}
        </p>
      ) : null}
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
          disabled={loading}
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
          disabled={loading}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
          placeholder="you@company.com"
        />
      </div>
      <div>
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="description"
          required
          rows={5}
          disabled={loading}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`${inputClass} min-h-[140px] resize-y`}
          placeholder="Problem, timeline, budget ballpark if you have one, link to your site or product."
        />
      </div>
      <div>
        <button type="submit" className={primaryBtnClass} disabled={loading}>
          {loading ? "Sending..." : "Send message"}
        </button>
      </div>
    </form>
  );
}
