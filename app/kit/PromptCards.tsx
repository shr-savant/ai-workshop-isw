"use client";

import { useState } from "react";
import Link from "next/link";

const PROMPTS = [
  {
    id: "career-productivity",
    label: "Career Productivity",
    category: "career",
    color: "blue",
    tags: ["career", "time-saving", "beginner"],
    featured: true,
    text: `I am a [YOUR ROLE] at a [COMPANY TYPE]. Give me 5 specific ways I could use AI to save time in my work this week. Be concrete, not generic.`,
  },
  {
    id: "business-social-media",
    label: "Business Social Media",
    category: "business",
    color: "cyan",
    tags: ["business", "social media", "content"],
    featured: true,
    text: `I run a [DESCRIBE YOUR BUSINESS] in [CITY/AREA]. Write 3 Instagram captions: a weekend special, a behind-the-scenes moment, and a community post. Each under 150 characters.`,
  },
  {
    id: "resume-rewrite",
    label: "Resume Bullet Rewrite",
    category: "career",
    color: "teal",
    tags: ["career", "resume", "job search"],
    featured: true,
    text: `Here is one of my resume bullets: [PASTE YOUR BULLET]. Rewrite it to focus on measurable outcomes, not just duties. Give me 3 different versions.`,
  },
  {
    id: "meeting-followup",
    label: "Meeting Follow-up Email",
    category: "productivity",
    color: "amber",
    tags: ["productivity", "email", "communication"],
    featured: false,
    text: `Write a professional follow-up email after a meeting with [CLIENT / MANAGER]. Include key decisions, next steps, and owners. Tone: warm and direct. Max 120 words.`,
  },
  {
    id: "stock-analysis",
    label: "Stock Analysis Framework",
    category: "finance",
    color: "purple",
    tags: ["finance", "investing", "analysis"],
    featured: true,
    advanced: true,
    text: `Act as a professional equity analyst. Analyze [TICKER SYMBOL, e.g. AAPL] using the following framework:

1. Business overview — What does the company do, who are its customers, and what is its competitive moat?
2. Recent financials — Revenue growth rate, gross margin trend, and free cash flow over the last 3 years.
3. Valuation — Current P/E, forward P/E, and EV/EBITDA versus sector peers. Is the stock cheap or expensive?
4. Key risks — Top 3 risks that could hurt the stock price over the next 12 months.
5. Bull case vs. bear case — One paragraph for each scenario — the optimistic and the pessimistic outlook.
6. Verdict — Buy, Hold, or Avoid — with a one-sentence rationale and a suggested entry price range.

Use publicly available data only. Be specific with numbers. Flag any figures you are uncertain about.`,
  },
];

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "career", label: "Career" },
  { id: "business", label: "Business" },
  { id: "productivity", label: "Productivity" },
  { id: "finance", label: "Finance" },
];

export default function PromptCards() {
  const [copied, setCopied] = useState<number | null>(null);
  const [activeCat, setActiveCat] = useState("all");

  async function copyPrompt(text: string, idx: number) {
    await navigator.clipboard.writeText(text);
    setCopied(idx);
    setTimeout(() => setCopied(null), 2000);
  }

  const filtered = activeCat === "all" ? PROMPTS : PROMPTS.filter(p => p.category === activeCat);

  return (
    <div>
      <div className="cat-pills">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            className={`cat-pill${activeCat === cat.id ? " active" : ""}`}
            onClick={() => setActiveCat(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="prompt-cards">
        {filtered.map((p, i) => (
          <div key={p.id} className={`prompt-card prompt-${p.color}${p.advanced ? " prompt-advanced" : ""}`}>
            <div className="prompt-card-header">
              <div className="prompt-card-meta">
                <span className={`prompt-label prompt-label-${p.color}`}>
                  {p.advanced ? "⭐ " : ""}{p.label}
                </span>
                {p.featured && <span className="featured-badge">Featured</span>}
              </div>
              <div className="prompt-card-actions">
                <button className="prompt-copy-btn" onClick={() => copyPrompt(p.text, i)}>
                  {copied === i ? "✓ Copied!" : "Copy"}
                </button>
                <Link href={`/prompts/${p.id}`} className="prompt-try-btn">Try it →</Link>
              </div>
            </div>
            <pre className="prompt-text">{p.text}</pre>
            <div className="prompt-card-footer">
              {p.tags.map(tag => (
                <span key={tag} className="prompt-tag">#{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .cat-pills { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.25rem; }
        .cat-pill {
          padding: 0.375rem 0.875rem; border-radius: 100px;
          border: 1px solid var(--border); font-size: 0.8125rem; font-weight: 500;
          color: var(--muted); cursor: pointer; background: var(--surface);
          font-family: inherit; transition: background 0.15s, border-color 0.15s, color 0.15s;
        }
        .cat-pill:hover { border-color: var(--blue); color: var(--blue); background: var(--blue-bg); }
        .cat-pill.active { background: var(--blue-bg); border-color: var(--blue); color: var(--blue); font-weight: 600; }

        .prompt-cards { display: flex; flex-direction: column; gap: 1rem; }
        .prompt-card { border-radius: 12px; border: 1px solid; overflow: hidden; }
        .prompt-card-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0.75rem 1rem; border-bottom: 1px solid rgba(0,0,0,0.06);
          flex-wrap: wrap; gap: 0.5rem;
        }
        .prompt-card-meta { display: flex; align-items: center; gap: 0.5rem; }
        .prompt-card-actions { display: flex; align-items: center; gap: 0.5rem; }
        .prompt-label { font-size: 0.8125rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; }
        .prompt-label-blue   { color: var(--blue); }
        .prompt-label-cyan   { color: var(--cyan); }
        .prompt-label-teal   { color: var(--teal); }
        .prompt-label-amber  { color: var(--amber); }
        .prompt-label-purple { color: var(--purple); }
        .featured-badge {
          font-size: 0.6875rem; font-weight: 600; color: var(--amber);
          background: var(--amber-bg); border: 1px solid var(--amber-bd);
          padding: 0.125rem 0.5rem; border-radius: 100px;
        }
        .prompt-copy-btn {
          font-size: 0.8rem; font-weight: 600; font-family: inherit;
          padding: 0.3rem 0.875rem; border-radius: 6px; cursor: pointer;
          border: 1px solid; background: rgba(255,255,255,0.6); transition: background 0.15s;
        }
        .prompt-copy-btn:hover { background: rgba(255,255,255,0.9); }
        .prompt-try-btn {
          font-size: 0.8rem; font-weight: 600; padding: 0.3rem 0.875rem;
          border-radius: 6px; border: 1px solid var(--blue-bd); color: var(--blue);
          background: var(--blue-bg); text-decoration: none; transition: background 0.15s;
        }
        .prompt-try-btn:hover { background: var(--blue-bd); }

        .prompt-blue   { background: var(--blue-bg);   border-color: var(--blue-bd); }
        .prompt-cyan   { background: var(--cyan-bg);   border-color: var(--cyan-bd); }
        .prompt-teal   { background: var(--teal-bg);   border-color: var(--teal-bd); }
        .prompt-amber  { background: var(--amber-bg);  border-color: var(--amber-bd); }
        .prompt-purple { background: var(--purple-bg); border-color: var(--purple-bd); }
        .prompt-advanced { border-width: 2px; }

        .prompt-text {
          font-family: 'JetBrains Mono', monospace; font-size: 0.8125rem;
          line-height: 1.65; padding: 1rem; margin: 0;
          white-space: pre-wrap; word-break: break-word; color: var(--ink);
        }
        .prompt-card-footer {
          display: flex; gap: 0.375rem; flex-wrap: wrap;
          padding: 0.625rem 1rem; border-top: 1px solid rgba(0,0,0,0.06);
        }
        .prompt-tag { font-size: 0.75rem; color: var(--muted); }
      `}</style>
    </div>
  );
}
