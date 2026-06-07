import { NextResponse } from "next/server";
import { createSupabaseLeadWriteClient } from "@/lib/integrations/supabase";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createSupabaseLeadWriteClient();
  if (!supabase) {
    return NextResponse.json(
      { ok: false, error: "Supabase is not configured" },
      { status: 500 },
    );
  }

  try {
    const { error } = await supabase.from("leads").select("id").limit(1);
    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true, pinged: new Date().toISOString() });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
