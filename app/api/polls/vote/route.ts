import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const sessionKey = req.headers.get("x-session-key") ?? "anonymous";

  let poll_id: string, option_idx: number;
  try {
    const body = await req.json();
    poll_id = body.poll_id;
    option_idx = Number(body.option_idx);
    if (!poll_id || isNaN(option_idx)) throw new Error();
  } catch {
    return NextResponse.json({ error: "Invalid body." }, { status: 400 });
  }

  // Upsert — one vote per session per poll
  try {
    const { error } = await getSupabase()
      .from("poll_votes")
      .upsert(
        { poll_id, option_idx, session_key: sessionKey },
        { onConflict: "poll_id,session_key" }
      );
    if (error) console.error("Supabase vote error:", error);
  } catch {
    // Supabase not configured — silently succeed so UI doesn't break
  }

  return NextResponse.json({ ok: true });
}
