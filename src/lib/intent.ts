/**
 * Shared “what do you need?” paths for the homepage selector, quick estimate,
 * and contact prefill. Keep labels user-facing; ids stable for anchors + storage.
 * Wording lives in `brand-knowledge.ts` (BRAND_KNOWLEDGE).
 */

import { brandIntentCopy } from "@/lib/brand-knowledge";

export const INTENT_STORAGE_KEY = "vryntlab-intent";

/** Path selector + service tabs use the first three; estimate modal lists all six. */
export type IntentId =
  | "website"
  | "automation"
  | "custom"
  | "app"
  | "backend"
  | "other";

/** Homepage path lanes only — used where triad / services tabs apply */
export type PathIntentId = "website" | "automation" | "custom";

export type IntentOption = {
  id: IntentId;
  /** Short label for chips */
  label: string;
  /** Heading in expanded panel */
  headline: string;
  /** One line for forms / email prefill */
  summary: string;
  /** Concrete outcomes — scannable bullets */
  outcomes: readonly string[];
  /** Element id of matching service card (`#${serviceSectionId}`) */
  serviceSectionId: string;
};

const pathCopy = brandIntentCopy;

/** Homepage path selector (#path) — three lanes only */
export const intentOptions: readonly IntentOption[] = [
  {
    id: "website",
    serviceSectionId: "service-websites",
    ...pathCopy.website,
  },
  {
    id: "automation",
    serviceSectionId: "service-systems",
    ...pathCopy.automation,
  },
  {
    id: "custom",
    serviceSectionId: "service-custom",
    ...pathCopy.custom,
  },
] as const;

/** Quick estimate + storage — full set */
export const estimateIntentOptions: readonly IntentOption[] = [
  ...intentOptions,
  {
    id: "app",
    serviceSectionId: "service-custom",
    ...pathCopy.app,
  },
  {
    id: "backend",
    serviceSectionId: "service-custom",
    ...pathCopy.backend,
  },
  {
    id: "other",
    serviceSectionId: "service-custom",
    ...pathCopy.other,
  },
] as const;

export function getIntentById(id: string | null | undefined): IntentOption | null {
  if (!id) return null;
  return estimateIntentOptions.find((o) => o.id === id) ?? null;
}

export function readStoredIntentId(): IntentId | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(INTENT_STORAGE_KEY);
    if (!raw) return null;
    return estimateIntentOptions.some((o) => o.id === raw)
      ? (raw as IntentId)
      : null;
  } catch {
    return null;
  }
}

export function writeStoredIntentId(id: IntentId | null) {
  if (typeof window === "undefined") return;
  try {
    if (id) window.sessionStorage.setItem(INTENT_STORAGE_KEY, id);
    else window.sessionStorage.removeItem(INTENT_STORAGE_KEY);
  } catch {
    /* private mode / quota */
  }
}
