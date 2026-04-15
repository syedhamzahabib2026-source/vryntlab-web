import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { serverEnv } from "@/lib/config/env";

/**
 * Server-side Supabase client (anon key). Returns null if env is incomplete — chat still works without persistence.
 */
export function createSupabaseClient(): SupabaseClient | null {
  const url = serverEnv.supabase.url;
  const anonKey = serverEnv.supabase.anonKey;
  if (!url || !anonKey) return null;

  return createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function isProductionDeploy(): boolean {
  return serverEnv.isProduction || serverEnv.vercelEnv === "production";
}

/**
 * Server-only client for lead inserts/dedupe reads. **Production requires `SUPABASE_SERVICE_ROLE_KEY`**
 * (bypasses RLS safely). Non-production may fall back to anon for local dev (warns once); with RLS on,
 * prefer service role locally too.
 */
let warnedAnonLeadWrite = false;

export function createSupabaseLeadWriteClient(): SupabaseClient | null {
  const url = serverEnv.supabase.url;
  const service = serverEnv.supabase.serviceRoleKey;
  const anon = serverEnv.supabase.anonKey;

  if (!url) return null;

  if (service) {
    return createClient(url, service, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }

  if (isProductionDeploy()) {
    return null;
  }

  if (anon) {
    if (!warnedAnonLeadWrite) {
      warnedAnonLeadWrite = true;
      console.warn(
        "[supabase] Lead writes use SUPABASE_ANON_KEY — set SUPABASE_SERVICE_ROLE_KEY for production and whenever RLS is enabled on `leads`.",
      );
    }
    return createClient(url, anon, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }

  return null;
}
