"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useConversion } from "@/components/conversion/ConversionContext";
import { contentWell } from "@/components/layout/layoutTokens";
import { Reveal } from "@/components/motion/Reveal";
import { SectionShell } from "@/components/layout/SectionShell";
import { brandDeliveryFooter, brandDeliveryPreview } from "@/lib/brand-knowledge";
import { getIntentById } from "@/lib/intent";

type FlowRow = {
  label: string;
  meta: string;
  status: "done" | "active" | "queued";
};

const flows: Record<
  string,
  { staging: string; branch: string; rows: readonly FlowRow[] }
> = {
  website: {
    staging: "staging-store.vryntlab.dev",
    branch: "feature/pdp-structure",
    rows: [
      { label: "IA + key templates", meta: "Milestone 1", status: "done" },
      {
        label: "PDP / collections performance pass",
        meta: "Milestone 2",
        status: "active",
      },
      { label: "Launch checklist + analytics", meta: "Milestone 3", status: "queued" },
    ],
  },
  automation: {
    staging: "hooks.internal.vryntlab.dev",
    branch: "workflow/crm-sheet-sync",
    rows: [
      { label: "Map sources → destinations", meta: "Milestone 1", status: "done" },
      {
        label: "Idempotent writes + error queue",
        meta: "Milestone 2",
        status: "active",
      },
      { label: "Runbook + handoff session", meta: "Milestone 3", status: "queued" },
    ],
  },
  custom: {
    staging: "app.staging.vryntlab.dev",
    branch: "mvp/internal-dashboard",
    rows: [
      { label: "Auth + data model slice", meta: "Milestone 1", status: "done" },
      {
        label: "Core screens in browser",
        meta: "Milestone 2",
        status: "active",
      },
      { label: "API hardening + deploy", meta: "Milestone 3", status: "queued" },
    ],
  },
  app: {
    staging: "mobile.staging.vryntlab.dev",
    branch: "release/field-app-v1",
    rows: [
      { label: "Navigation + auth shell", meta: "Milestone 1", status: "done" },
      {
        label: "Core offline-capable flows",
        meta: "Milestone 2",
        status: "active",
      },
      { label: "Store submission + analytics", meta: "Milestone 3", status: "queued" },
    ],
  },
  backend: {
    staging: "api.staging.vryntlab.dev",
    branch: "infra/idempotency-hardening",
    rows: [
      { label: "Read paths + error budget", meta: "Milestone 1", status: "done" },
      {
        label: "Write paths + retries",
        meta: "Milestone 2",
        status: "active",
      },
      { label: "Observability + runbooks", meta: "Milestone 3", status: "queued" },
    ],
  },
  other: {
    staging: "preview.vryntlab.dev",
    branch: "scope/first-pass",
    rows: [
      { label: "Scope + success criteria", meta: "Milestone 1", status: "done" },
      {
        label: "Spike or thin slice",
        meta: "Milestone 2",
        status: "active",
      },
      { label: "Plan + estimate", meta: "Milestone 3", status: "queued" },
    ],
  },
};

const defaultFlow = flows.website!;

const logLines = [
  { text: "Running checks…", tone: "muted" as const },
  { text: "✓ typecheck · 0 errors", tone: "ok" as const },
  { text: "✓ Deploy Preview — ready", tone: "ok" as const },
];

function CyclingBuildLog() {
  const reduceMotion = useReducedMotion();
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const t = window.setInterval(() => {
      setLogIndex((i) => (i + 1) % logLines.length);
    }, 3200);
    return () => window.clearInterval(t);
  }, [reduceMotion]);

  if (reduceMotion) {
    return (
      <p className="rounded-md border border-white/[0.08] bg-white/[0.04] px-2.5 py-2 text-emerald-300/95">
        {logLines[2]!.text}
      </p>
    );
  }

  return (
    <motion.p
      key={logIndex}
      initial={{ opacity: 0, x: -4 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className={`rounded-md border border-white/[0.08] bg-white/[0.04] px-2.5 py-2 ${
        logLines[logIndex]!.tone === "ok"
          ? "text-emerald-300/95"
          : "text-zinc-500"
      }`}
    >
      {logLines[logIndex]!.text}
    </motion.p>
  );
}

function statusDot(status: FlowRow["status"]) {
  if (status === "done")
    return "bg-emerald-400 shadow-[0_0_0_3px_rgba(52,211,153,0.28)]";
  if (status === "active")
    return "bg-amber-400 shadow-[0_0_0_3px_rgba(251,191,36,0.25)] motion-safe:animate-pulse";
  return "bg-zinc-500/85";
}

export function DeliveryPreview() {
  const reduceMotion = useReducedMotion();
  const { selectedIntent } = useConversion();
  const intent = getIntentById(selectedIntent);
  const key =
    selectedIntent && flows[selectedIntent] ? selectedIntent : "website";
  const flow = flows[key] ?? defaultFlow;

  const title = useMemo(() => {
    if (intent) return `Environment · ${intent.label}`;
    return "Environment";
  }, [intent]);

  return (
    <SectionShell
      id="delivery"
      pad="compact"
      labelledBy="delivery-heading"
      className="pb-4 pt-1 sm:pb-6 sm:pt-2 md:pb-7 md:pt-3"
    >
      <Reveal>
        <div className={contentWell}>
          <div className="overflow-hidden rounded-[1.3rem] border border-[var(--border)] bg-[var(--surface)] shadow-[0_20px_60px_-28px_rgba(0,0,0,0.14),0_0_0_1px_rgba(0,0,0,0.04)_inset] ring-1 ring-black/[0.03] dark:border-zinc-800/95 dark:bg-[color-mix(in_oklab,var(--surface)_88%,var(--surface-soft))] dark:shadow-[0_28px_80px_-36px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.05)_inset] dark:ring-white/[0.05] sm:rounded-[1.45rem]">
            <div className="flex flex-col gap-2 border-b border-[var(--border)] bg-[color-mix(in_oklab,var(--surface-soft)_50%,var(--surface))] px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:px-5 sm:py-3 dark:border-zinc-800/85 dark:bg-zinc-950/55">
              <div className="min-w-0">
                <p
                  id="delivery-heading"
                  className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]"
                >
                  {brandDeliveryPreview.chromeTitle}
                </p>
                <p className="mt-1 text-[13px] font-medium leading-snug text-zinc-800 dark:text-zinc-100">
                  {title}
                </p>
              </div>
              <p className="max-w-prose text-[11px] leading-relaxed text-zinc-500 sm:max-w-[14rem] sm:text-right dark:text-zinc-500">
                {intent
                  ? brandDeliveryPreview.hintWithIntent
                  : brandDeliveryPreview.hintNoIntent}
              </p>
            </div>

            <div className="grid gap-4 p-4 sm:grid-cols-12 sm:gap-5 sm:p-5 md:p-6">
              <div className="sm:col-span-7">
                {!reduceMotion ? (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                    className="relative overflow-hidden rounded-xl border border-zinc-800/90 bg-[#0a0b0f] text-zinc-100 shadow-[0_24px_64px_-28px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.06)_inset,0_1px_0_rgba(255,255,255,0.06)_inset] dark:border-white/12 dark:bg-black/75"
                  >
                    <div
                      className="pointer-events-none absolute inset-0 opacity-[0.07] motion-reduce:hidden"
                      style={{
                        animation: "terminal-scan 6.5s linear infinite",
                        background:
                          "linear-gradient(180deg, transparent 0%, rgba(94,234,212,0.35) 50%, transparent 100%)",
                      }}
                      aria-hidden
                    />
                    <div className="relative flex items-center gap-2 border-b border-white/[0.08] bg-zinc-950/80 px-3 py-2">
                      <div className="flex gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-[#ff5f57]/95 shadow-[0_0_6px_rgba(255,95,87,0.45)]" />
                        <span className="h-2 w-2 rounded-full bg-[#febc2e]/95 shadow-[0_0_6px_rgba(254,188,46,0.4)]" />
                        <span className="h-2 w-2 rounded-full bg-[#28c840]/95 shadow-[0_0_6px_rgba(40,200,64,0.4)]" />
                      </div>
                      <span className="ml-1 truncate font-mono text-[10px] text-zinc-500">
                        zsh — deploy-preview
                      </span>
                    </div>
                    <div className="relative space-y-2.5 p-3 font-mono text-[11px] leading-relaxed sm:text-[12px]">
                      <p className="text-zinc-500">
                        <span className="text-emerald-400/95">➜</span>{" "}
                        <span className="text-zinc-400">https://</span>
                        <span className="text-teal-300/95">{flow.staging}</span>
                      </p>
                      <p className="text-zinc-400">
                        branch{" "}
                        <span className="rounded bg-white/[0.06] px-1.5 py-0.5 text-teal-200/95">
                          {flow.branch}
                        </span>
                      </p>
                      <CyclingBuildLog key={key} />
                      <p className="flex items-center gap-2 text-[10px] text-zinc-600">
                        <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 motion-safe:animate-pulse" />
                        Watching branch — auto-redeploy on push
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-zinc-950 p-3 text-zinc-100 dark:border-white/12">
                    <p className="font-mono text-[11px] text-zinc-400">
                      https://{flow.staging}
                    </p>
                    <p className="mt-2 font-mono text-[12px] text-zinc-300">
                      branch {flow.branch}
                    </p>
                  </div>
                )}
              </div>

              <ul className="flex flex-col gap-2 sm:col-span-5 sm:justify-center">
                {flow.rows.map((row, i) => (
                  <motion.li
                    key={row.label}
                    initial={reduceMotion ? false : { opacity: 0, x: 6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: reduceMotion ? 0 : 0.05 + i * 0.06,
                      duration: 0.35,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="flex items-start gap-3 rounded-xl border border-[var(--border)] bg-[color-mix(in_oklab,var(--surface-soft)_35%,var(--surface))] px-3 py-2.5 shadow-[var(--shadow-xs)] dark:border-zinc-800/90 dark:bg-zinc-900/40"
                  >
                    <span
                      className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${statusDot(row.status)}`}
                      aria-hidden
                    />
                    <div className="min-w-0">
                      <p className="text-[13px] font-semibold tracking-tight text-[var(--foreground)]">
                        {row.label}
                      </p>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-500">
                        {row.meta}
                        {row.status === "active" ? " · in progress" : null}
                        {row.status === "done" ? " · shipped" : null}
                        {row.status === "queued" ? " · queued" : null}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="border-t border-[var(--border)] bg-[color-mix(in_oklab,var(--surface-soft)_30%,var(--surface))] px-4 py-3 dark:border-zinc-800/80 dark:bg-zinc-950/35 sm:px-5">
              <p className="text-[12px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                {brandDeliveryFooter.byIntent[key] ?? brandDeliveryFooter.default}
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}
