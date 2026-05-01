import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";


const SYSTEM_PROMPT = `You are an expert AI educator at a community workshop called LEAP Collective 2026, hosted by the India Society of Worcester. The co-speakers are Rik Banerjee (AI Builder who built EzyUpload.com, the Bazaar Protocol, and a DCF stock analysis platform) and Shrikant Savant (AI Builder & entrepreneur).

Your answers are warm, jargon-free, honest, and practical. Keep responses to 3–5 sentences unless the question genuinely needs more. Use everyday analogies. Never overhype AI. If someone asks about tools, mention Claude, ChatGPT, Perplexity, Canva AI, or Notion AI as appropriate. Always refer back to the 85/15 principle when relevant: AI does 85% of the work, the human provides the irreplaceable 15%.`;

// Simple in-memory rate limiter (resets on cold start; good enough for workshop scale)
const requestCounts = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(sessionKey: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const limit = 20;

  const entry = requestCounts.get(sessionKey);
  if (!entry || now > entry.resetAt) {
    requestCounts.set(sessionKey, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= limit) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const sessionKey = req.headers.get("x-session-key") ?? "anonymous";

  if (!checkRateLimit(sessionKey)) {
    return NextResponse.json(
      { error: "Rate limit reached. Try again in an hour." },
      { status: 429 }
    );
  }

  let messages: { role: "user" | "assistant"; content: string }[];
  try {
    const body = await req.json();
    messages = body.messages;
    if (!Array.isArray(messages) || messages.length === 0) throw new Error();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "GEMINI_API_KEY is not configured on the server." },
      { status: 500 }
    );
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
      systemInstruction: SYSTEM_PROMPT,
    });

    // Convert message history to Gemini format (all but the last message)
    const history = messages.slice(0, -1).map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const chat = model.startChat({ history });
    const lastMessage = messages[messages.length - 1].content;

    const result = await chat.sendMessage(lastMessage);
    const text = result.response.text();

    return NextResponse.json({ text });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Gemini error:", message);
    return NextResponse.json(
      { error: `AI error: ${message}` },
      { status: 502 }
    );
  }
}
