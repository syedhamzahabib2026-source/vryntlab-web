"use client";

import { useState, type FormEvent } from "react";
import { focusRing } from "@/components/layout/layoutTokens";

const inputClass =
  "min-h-12 w-full rounded-2xl border border-zinc-700 bg-zinc-900/60 px-4 py-3.5 text-[16px] leading-relaxed text-zinc-50 placeholder:text-zinc-500 shadow-[var(--shadow-xs)] outline-none transition-[border-color,box-shadow] duration-300 sm:text-[15px] focus-visible:border-teal-400/40 focus-visible:ring-2 focus-visible:ring-teal-400/25";

const labelClass =
  "mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500";

const btnClass = `inline-flex min-h-12 w-full items-center justify-center rounded-full bg-teal-400/95 px-8 text-[13px] font-semibold tracking-tight text-zinc-950 shadow-[var(--shadow-md)] transition-[transform,opacity] duration-300 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto ${focusRing}`;

type ApiResponse = { ok: boolean; error?: string };

export function GithubAccessForm() {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "GitHub repository access",
          email: email.trim(),
          message: [
            "GitHub access request (verified clients only).",
            "",
            `Requester email: ${email.trim()}`,
            "",
            "Please grant repository access or reply with next steps.",
          ].join("\n"),
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
            "Something went wrong. Please try again or email hello@vryntlab.com.",
        );
        return;
      }
      setSent(true);
    } catch {
      setError("We couldn't reach the server. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <p className="rounded-2xl border border-teal-400/25 bg-teal-950/30 px-4 py-4 text-[15px] leading-relaxed text-zinc-200">
        Got it — we&apos;ll be in touch within 24 hours.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 flex max-w-md flex-col gap-5">
      <div>
        <label htmlFor="github-access-email" className={labelClass}>
          Email
        </label>
        <input
          id="github-access-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          className={inputClass}
          placeholder="you@company.com"
        />
      </div>
      <input
        tabIndex={-1}
        name="website"
        value={honeypot}
        onChange={(ev) => setHoneypot(ev.target.value)}
        className="sr-only"
        aria-hidden
        autoComplete="off"
      />
      {error ? (
        <p
          className="rounded-2xl border border-red-900/50 bg-red-950/40 px-4 py-3 text-sm text-red-200"
          role="alert"
        >
          {error}
        </p>
      ) : null}
      <button type="submit" disabled={loading} className={btnClass}>
        {loading ? "Sending…" : "Request Access"}
      </button>
      <p className="text-[12px] leading-relaxed text-zinc-500">
        Only sent to verified clients. We don&apos;t share repositories publicly.
      </p>
    </form>
  );
}
