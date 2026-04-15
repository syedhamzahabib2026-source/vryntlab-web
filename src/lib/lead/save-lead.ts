import { DEFAULT_LEAD_SOURCE } from "@/lib/config/brand";
import { parseLeadDedupeHours } from "@/lib/config/env";
import { createSupabaseLeadWriteClient } from "@/lib/integrations/supabase";

export type LeadPayload = {
  name: string;
  email: string;
  business: string | null;
  website: string | null;
  need: string;
};

export type LeadInsert = LeadPayload & {
  conversationId: string;
  /** `strong` | `soft` or null when phrase heuristics never matched. */
  intentStrength: string | null;
  /** e.g. from LEAD_SOURCE env or DEFAULT_LEAD_SOURCE */
  source: string;
  /** User asked for a human, rep, callback, or team follow-up (code-detected). */
  humanRequested: boolean;
};

const PG_UNIQUE_VIOLATION = "23505";

export type SaveLeadResult =
  | { outcome: "inserted"; createdAt: string }
  | { outcome: "duplicate" }
  | { outcome: "skipped_no_client" };

/**
 * Inserts one row into `leads`. `conversation_id` is unique.
 * Optional: LEAD_EMAIL_DEDUPE_HOURS — skip insert if same email exists in that window (spam guard).
 */
export async function saveLead(data: LeadInsert): Promise<SaveLeadResult> {
  const id = data.conversationId?.trim();
  if (!id) return { outcome: "skipped_no_client" };

  const sb = createSupabaseLeadWriteClient();
  if (!sb) {
    throw new Error("Supabase is not configured");
  }

  const emailNorm = data.email.trim().toLowerCase();
  const dedupeH = parseLeadDedupeHours();
  if (dedupeH > 0) {
    const cutoff = new Date(Date.now() - dedupeH * 3600_000).toISOString();
    const { data: existing } = await sb
      .from("leads")
      .select("id")
      .eq("email", emailNorm)
      .gte("created_at", cutoff)
      .limit(1);
    if (existing?.length) {
      return { outcome: "duplicate" };
    }
  }

  const source =
    data.source.trim() || DEFAULT_LEAD_SOURCE;

  const row = {
    name: data.name.trim(),
    email: emailNorm,
    business: data.business?.trim() ? data.business.trim() : null,
    website: data.website?.trim() ? data.website.trim() : null,
    need: data.need.trim(),
    conversation_id: id,
    intent_strength: data.intentStrength,
    source,
    human_requested: Boolean(data.humanRequested),
  };

  const { data: inserted, error } = await sb.from("leads").insert(row).select("created_at").single();

  if (error) {
    const code = "code" in error ? String(error.code) : "";
    if (code === PG_UNIQUE_VIOLATION) {
      return { outcome: "duplicate" };
    }
    throw error;
  }

  const createdAt =
    inserted && typeof (inserted as { created_at?: unknown }).created_at === "string"
      ? (inserted as { created_at: string }).created_at
      : new Date().toISOString();

  return { outcome: "inserted", createdAt };
}
