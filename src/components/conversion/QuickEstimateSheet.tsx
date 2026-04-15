"use client";

import { useCallback, useEffect, useId, useRef, useState, type FormEvent } from "react";
import { focusRing } from "@/components/layout/layoutTokens";
import {
  brandIntentActionLabels,
  brandQuickEstimate,
  brandQuickEstimateAdaptive,
  brandQuickEstimateIntentHint,
} from "@/lib/brand-knowledge";
import { siteBrandName } from "@/lib/site";
import { estimateIntentOptions, getIntentById } from "@/lib/intent";
import { useConversion } from "./ConversionContext";

const inputClass =
  "min-h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3.5 py-3 text-[15px] leading-relaxed text-[var(--foreground)] placeholder:text-zinc-400 shadow-[var(--shadow-xs)] outline-none transition-[border-color,box-shadow] duration-300 ease-[var(--ease-out-premium)] focus-visible:border-[var(--accent)]/50 focus-visible:shadow-[0_0_0_3px_var(--ring-focus)] dark:placeholder:text-zinc-500";

const labelClass =
  "mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-500";

const chipClass = (active: boolean) =>
  `flex w-full items-center justify-start rounded-full border px-3.5 py-2.5 text-left text-[12px] font-semibold leading-snug tracking-tight transition-[background-color,border-color,box-shadow,transform] duration-300 ease-[var(--ease-out-premium)] motion-reduce:duration-150 ${focusRing} active:scale-[0.98] sm:min-h-0 sm:py-2 sm:text-[13px] ${
    active
      ? "border-[var(--accent)]/45 bg-[color-mix(in_oklab,var(--accent-muted)_55%,var(--surface))] text-[var(--foreground)] shadow-[var(--shadow-xs)] dark:border-[var(--accent)]/35"
      : "border-[var(--border)] bg-[var(--surface)] text-zinc-700 shadow-[var(--shadow-xs)] dark:border-zinc-700 dark:bg-[var(--surface)] dark:text-zinc-200 [@media(hover:hover)]:hover:border-[var(--accent)]/30"
  }`;

export function QuickEstimateSheet() {
  const { estimateOpen, closeEstimate, selectedIntent, setSelectedIntent } =
    useConversion();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (estimateOpen) {
      if (!el.open) {
        setSent(false);
        setError(null);
        setNote("");
        el.showModal();
      }
    } else if (el.open) {
      el.close();
    }
  }, [estimateOpen]);

  const onDialogClose = useCallback(() => {
    closeEstimate();
  }, [closeEstimate]);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError(null);
      setLoading(true);
      const intent = getIntentById(selectedIntent);
      const messageParts = [
        intent ? `Quick estimate — ${intent.headline}` : "Quick estimate",
        intent ? `Context: ${intent.summary}` : null,
        note.trim() ? `Details: ${note.trim()}` : null,
      ].filter(Boolean);
      const message = messageParts.join("\n\n");

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            message,
            website: honeypot,
          }),
        });
        let data: { ok?: boolean; error?: string } = {};
        try {
          data = (await res.json()) as { ok?: boolean; error?: string };
        } catch {
          /* non-JSON */
        }
        if (!res.ok || !data.ok) {
          setError(
            data.error ??
              "Something went wrong. Try again or email us directly.",
          );
          return;
        }
        setSent(true);
      } catch {
        setError("Could not reach the server. Check your connection.");
      } finally {
        setLoading(false);
      }
    },
    [selectedIntent, name, email, note, honeypot],
  );

  useEffect(() => {
    if (!estimateOpen) return;
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") closeEstimate();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [estimateOpen, closeEstimate]);

  const adaptive =
    selectedIntent != null
      ? brandQuickEstimateAdaptive[selectedIntent]
      : null;
  const noteFieldLabel =
    adaptive?.noteLabel ?? "One sentence on the goal (optional)";
  const notePlaceholder =
    adaptive?.notePlaceholder ?? brandQuickEstimate.notePlaceholderFallback;
  const submitLabel =
    selectedIntent != null
      ? brandIntentActionLabels[selectedIntent].estimateSubmit
      : "Request estimate";

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={onDialogClose}
      className="fixed left-1/2 top-1/2 z-[200] max-h-[90dvh] w-[min(100%,26rem)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] p-0 text-[var(--foreground)] shadow-[var(--shadow-md)] dark:border-zinc-700/90 sm:w-[min(100%,28rem)]"
    >
      <div className="flex max-h-[90dvh] min-h-0 flex-col overflow-hidden">
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <h2
            id={titleId}
            className="text-lg font-semibold tracking-[-0.02em] text-[var(--foreground)]"
          >
            Quick estimate
          </h2>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className={`rounded-lg px-2 py-1 text-[13px] font-medium text-zinc-500 transition-colors ${focusRing} [@media(hover:hover)]:hover:text-zinc-900 dark:[@media(hover:hover)]:hover:text-zinc-200`}
          >
            Close
          </button>
        </div>
        <p className="mt-2 text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">
          {brandQuickEstimate.intro}
        </p>
        {selectedIntent != null ? (
          <p className="mt-2 text-[12px] font-medium leading-relaxed text-[var(--accent)] dark:text-teal-300/95">
            {brandQuickEstimateIntentHint[selectedIntent]}
          </p>
        ) : null}
        {adaptive ? (
          <ul
            className="mt-3 space-y-1.5 text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-500"
            aria-label="Helpful details to include"
          >
            {adaptive.prompts.map((line) => (
              <li key={line} className="flex gap-2">
                <span
                  className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]/75 dark:bg-teal-400/70"
                  aria-hidden
                />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-500">
            {brandQuickEstimate.pickLaneHint}
          </p>
        )}

        {sent ? (
          <div className="mt-6" role="status" aria-live="polite">
            <p className="font-semibold text-[var(--foreground)]">
              {brandQuickEstimate.sentTitle}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {brandQuickEstimate.sentBody}
            </p>
          </div>
        ) : (
          <form
            className="mt-6 flex flex-col gap-5"
            onSubmit={handleSubmit}
            noValidate
            aria-label={`Quick estimate for ${siteBrandName}`}
          >
            <div
              className="pointer-events-none absolute -left-[9999px] h-px w-px overflow-hidden"
              aria-hidden
            >
              <label htmlFor="qe-website">Website</label>
              <input
                id="qe-website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>
            <fieldset className="min-w-0 border-0 p-0">
              <legend className={labelClass}>What do you need?</legend>
              <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {estimateIntentOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    className={`${chipClass(selectedIntent === opt.id)} min-h-[2.875rem] sm:min-h-0`}
                    onClick={() => setSelectedIntent(opt.id)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </fieldset>
            <div>
              <label htmlFor="qe-name" className={labelClass}>
                Name
              </label>
              <input
                id="qe-name"
                name="name"
                required
                autoComplete="name"
                disabled={loading}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="qe-email" className={labelClass}>
                Email
              </label>
              <input
                id="qe-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                disabled={loading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label htmlFor="qe-note" className={labelClass}>
                {noteFieldLabel}
              </label>
              <textarea
                id="qe-note"
                name="note"
                rows={3}
                disabled={loading}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className={`${inputClass} resize-y min-h-[88px]`}
                placeholder={notePlaceholder}
              />
            </div>
            {error ? (
              <p
                className="rounded-xl border border-red-200/80 bg-red-50/90 px-3 py-2 text-sm text-red-900 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200"
                role="alert"
              >
                {error}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={loading || !selectedIntent}
              className={`inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[var(--surface-ink)] px-6 text-[13px] font-semibold tracking-tight text-white shadow-[var(--shadow-md)] transition-[transform,opacity,box-shadow] duration-300 ease-[var(--ease-out-premium)] disabled:cursor-not-allowed disabled:opacity-55 dark:bg-white dark:text-zinc-950 ${focusRing} active:scale-[0.98]`}
            >
              {loading ? "Sending…" : submitLabel}
            </button>
          </form>
        )}
        </div>
      </div>
    </dialog>
  );
}
