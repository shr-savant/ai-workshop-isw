import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const poll_id = req.nextUrl.searchParams.get("poll_id");
  if (!poll_id) {
    return NextResponse.json({ error: "poll_id required" }, { status: 400 });
  }

  let data: { option_idx: number }[] | null = null;
  try {
    const result = await getSupabase()
      .from("poll_votes")
      .select("option_idx")
      .eq("poll_id", poll_id);
    if (result.error) console.error("Supabase results error:", result.error);
    else data = result.data;
  } catch {
    // Supabase not configured — return empty results so UI renders gracefully
    return NextResponse.json({ options: [], total: 0 });
  }

  // Aggregate counts
  const counts: Record<number, number> = {};
  for (const row of data ?? []) {
    counts[row.option_idx] = (counts[row.option_idx] ?? 0) + 1;
  }

  const maxIdx = Math.max(0, ...Object.keys(counts).map(Number));
  const options = Array.from({ length: maxIdx + 1 }, (_, i) => ({
    count: counts[i] ?? 0,
  }));

  return NextResponse.json({
    options,
    total: data?.length ?? 0,
  });
}
