import { notFound } from "next/navigation";
import SiteNav from "@/components/SiteNav";
import Link from "next/link";
import PromptTryPanel from "./PromptTryPanel";

// Shared prompt data — in Phase 3 this will be fetched from Supabase
const PROMPTS: Record<string, { title: string; category: string; body: string; tags: string[] }> = {
  "career-productivity": {
    title: "Career Productivity",
    category: "career",
    body: `I am a [YOUR ROLE] at a [COMPANY TYPE]. Give me 5 specific ways I could use AI to save time in my work this week. Be concrete, not generic.`,
    tags: ["career", "time-saving", "beginner"],
  },
  "business-social-media": {
    title: "Business Social Media",
    category: "business",
    body: `I run a [DESCRIBE YOUR BUSINESS] in [CITY/AREA]. Write 3 Instagram captions: a weekend special, a behind-the-scenes moment, and a community post. Each under 150 characters.`,
    tags: ["business", "social media", "content"],
  },
  "resume-rewrite": {
    title: "Resume Bullet Rewrite",
    category: "career",
    body: `Here is one of my resume bullets: [PASTE YOUR BULLET]. Rewrite it to focus on measurable outcomes, not just duties. Give me 3 different versions.`,
    tags: ["career", "resume", "job search"],
  },
  "meeting-followup": {
    title: "Meeting Follow-up Email",
    category: "productivity",
    body: `Write a professional follow-up email after a meeting with [CLIENT / MANAGER]. Include key decisions, next steps, and owners. Tone: warm and direct. Max 120 words.`,
    tags: ["productivity", "email", "communication"],
  },
  "stock-analysis": {
    title: "Stock Analysis Framework",
    category: "finance",
    body: `Act as a professional equity analyst. Analyze [TICKER SYMBOL, e.g. AAPL] using the following framework:

1. Business overview — What does the company do, who are its customers, and what is its competitive moat?
2. Recent financials — Revenue growth rate, gross margin trend, and free cash flow over the last 3 years.
3. Valuation — Current P/E, forward P/E, and EV/EBITDA versus sector peers. Is the stock cheap or expensive?
4. Key risks — Top 3 risks that could hurt the stock price over the next 12 months.
5. Bull case vs. bear case — One paragraph for each scenario — the optimistic and the pessimistic outlook.
6. Verdict — Buy, Hold, or Avoid — with a one-sentence rationale and a suggested entry price range.

Use publicly available data only. Be specific with numbers. Flag any figures you are uncertain about.`,
    tags: ["finance", "investing", "analysis"],
  },
};

export async function generateStaticParams() {
  return Object.keys(PROMPTS).map((id) => ({ id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const prompt = PROMPTS[id];
  return { title: prompt ? `${prompt.title} · LEAP Prompts` : "Prompt Not Found" };
}

export default async function PromptDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const prompt = PROMPTS[id];
  if (!prompt) notFound();

  return (
    <>
      <SiteNav />

      <main className="pd-main">
        <div className="pd-inner">
          <div className="pd-breadcrumb">
            <Link href="/prompts" className="pd-back">← Prompt Library</Link>
          </div>

          <div className="pd-header">
            <span className="pd-category">{prompt.category}</span>
            <h1 className="pd-title">{prompt.title}</h1>
            <div className="pd-tags">
              {prompt.tags.map((t) => (
                <span key={t} className="pd-tag">#{t}</span>
              ))}
            </div>
          </div>

          {/* Prompt body */}
          <div className="pd-prompt-box">
            <div className="pd-prompt-label">Prompt</div>
            <pre className="pd-prompt-text">{prompt.body}</pre>
          </div>

          {/* Try it panel */}
          <div className="pd-try-section">
            <h2 className="pd-try-title">Try It Now</h2>
            <p className="pd-try-sub">Fill in the blanks above, then paste your customized version below.</p>
            <PromptTryPanel defaultPrompt={prompt.body} />
          </div>
        </div>
      </main>

      <style>{`
        .pd-main { padding: 2rem 1rem 5rem; }
        .pd-inner { max-width: 760px; margin: 0 auto; }
        .pd-breadcrumb { margin-bottom: 1.5rem; }
        .pd-back { font-size: 0.875rem; color: var(--blue); text-decoration: none; font-weight: 500; }
        .pd-back:hover { text-decoration: underline; }
        .pd-header { margin-bottom: 1.5rem; }
        .pd-category {
          display: inline-block;
          font-size: 0.6875rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em;
          color: var(--blue); background: var(--blue-bg); border: 1px solid var(--blue-bd);
          padding: 0.125rem 0.5rem; border-radius: 100px; margin-bottom: 0.5rem;
        }
        .pd-title { font-family: 'Sora', sans-serif; font-size: 1.75rem; font-weight: 800; color: var(--ink); margin: 0 0 0.75rem; letter-spacing: -0.02em; }
        .pd-tags { display: flex; gap: 0.375rem; flex-wrap: wrap; }
        .pd-tag { font-size: 0.8rem; color: var(--muted); }

        .pd-prompt-box {
          background: var(--blue-bg);
          border: 1px solid var(--blue-bd);
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 2rem;
        }
        .pd-prompt-label {
          font-size: 0.6875rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em;
          color: var(--blue); padding: 0.625rem 1rem;
          border-bottom: 1px solid var(--blue-bd);
        }
        .pd-prompt-text {
          font-family: var(--mono);
          font-size: 0.8375rem; line-height: 1.7;
          padding: 1rem;
          margin: 0;
          white-space: pre-wrap; word-break: break-word;
          color: var(--ink);
        }

        .pd-try-section {}
        .pd-try-title { font-family: 'Sora', sans-serif; font-size: 1.125rem; font-weight: 700; color: var(--ink); margin: 0 0 0.25rem; }
        .pd-try-sub { font-size: 0.875rem; color: var(--muted); margin: 0 0 1rem; line-height: 1.5; }

        /* Chat */
        .chat-panel { display: flex; flex-direction: column; background: var(--surface); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; }
        .chat-messages { min-height: 280px; max-height: 420px; overflow-y: auto; padding: 1.25rem; display: flex; flex-direction: column; gap: 1rem; }
        .chat-empty { color: var(--hint); font-size: 0.875rem; text-align: center; margin: auto; padding: 2rem; line-height: 1.6; }
        .msg { max-width: 85%; }
        .msg.user { align-self: flex-end; background: var(--blue); color: #fff; padding: 0.625rem 1rem; border-radius: 14px 14px 4px 14px; font-size: 0.9rem; line-height: 1.5; }
        .msg.assistant { align-self: flex-start; max-width: 90%; }
        .msg-label { font-size: 0.6875rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted); margin-bottom: 0.375rem; }
        .msg-body { background: var(--paper); border: 1px solid var(--border); border-radius: 4px 14px 14px 14px; padding: 0.75rem 1rem; font-size: 0.9rem; line-height: 1.6; color: var(--ink); }
        .chat-input-row { display: flex; border-top: 1px solid var(--border); }
        .chat-input { flex: 1; border: none; outline: none; padding: 0.875rem 1rem; font-size: 0.9rem; font-family: inherit; background: transparent; color: var(--ink); }
        .chat-input::placeholder { color: var(--hint); }
        .chat-send-btn { background: var(--blue); color: #fff; border: none; padding: 0 1.5rem; font-size: 0.875rem; font-weight: 600; cursor: pointer; font-family: inherit; transition: background 0.15s; }
        .chat-send-btn:hover { background: #1d4ed8; }
        .chat-send-btn:disabled { background: var(--border); color: var(--hint); cursor: not-allowed; }
      `}</style>
    </>
  );
}
