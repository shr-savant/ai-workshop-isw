import SiteNav from "@/components/SiteNav";
import Link from "next/link";

export const metadata = {
  title: "Prompt Library · LEAP 2026 AI Workshop",
};

// Curated prompts — seeded from ai_starter_kit.html
const CURATED_PROMPTS = [
  {
    id: "career-productivity",
    title: "Career Productivity",
    category: "career",
    body: `I am a [YOUR ROLE] at a [COMPANY TYPE]. Give me 5 specific ways I could use AI to save time in my work this week. Be concrete, not generic.`,
    tags: ["career", "time-saving", "beginner"],
    featured: true,
  },
  {
    id: "business-social-media",
    title: "Business Social Media",
    category: "business",
    body: `I run a [DESCRIBE YOUR BUSINESS] in [CITY/AREA]. Write 3 Instagram captions: a weekend special, a behind-the-scenes moment, and a community post. Each under 150 characters.`,
    tags: ["business", "social media", "content"],
    featured: true,
  },
  {
    id: "resume-rewrite",
    title: "Resume Bullet Rewrite",
    category: "career",
    body: `Here is one of my resume bullets: [PASTE YOUR BULLET]. Rewrite it to focus on measurable outcomes, not just duties. Give me 3 different versions.`,
    tags: ["career", "resume", "job search"],
    featured: true,
  },
  {
    id: "meeting-followup",
    title: "Meeting Follow-up Email",
    category: "productivity",
    body: `Write a professional follow-up email after a meeting with [CLIENT / MANAGER]. Include key decisions, next steps, and owners. Tone: warm and direct. Max 120 words.`,
    tags: ["productivity", "email", "communication"],
    featured: false,
  },
  {
    id: "stock-analysis",
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
    featured: true,
  },
];

const CATEGORIES = [
  { id: "all", label: "All Prompts" },
  { id: "career", label: "Career" },
  { id: "business", label: "Business" },
  { id: "productivity", label: "Productivity" },
  { id: "finance", label: "Finance" },
  { id: "community", label: "Community" },
];

const CATEGORY_COLORS: Record<string, string> = {
  career:      "blue",
  business:    "cyan",
  productivity:"teal",
  finance:     "amber",
  community:   "purple",
};

export default function PromptsPage() {
  return (
    <>
      <SiteNav />

      <header className="prompts-header">
        <div className="prompts-header-inner">
          <h1 className="prompts-title">📚 Prompt Library</h1>
          <p className="prompts-sub">
            Curated prompts from the workshop — ready to copy and use. More community prompts coming after May 2.
          </p>
        </div>
      </header>

      <main className="prompts-main">
        {/* Category filter pills */}
        <div className="cat-pills">
          {CATEGORIES.map((cat) => (
            <span key={cat.id} className={`cat-pill${cat.id === "all" ? " active" : ""}`}>
              {cat.label}
            </span>
          ))}
        </div>

        {/* Prompt grid */}
        <div className="prompts-grid">
          {CURATED_PROMPTS.map((p) => {
            const color = CATEGORY_COLORS[p.category] ?? "blue";
            return (
              <div key={p.id} className={`prompt-card-lib prompt-lib-${color}`}>
                <div className="prompt-lib-header">
                  <div className="prompt-lib-meta">
                    <span className={`cat-badge cat-badge-${color}`}>{p.category}</span>
                    {p.featured && <span className="featured-badge">⭐ Featured</span>}
                  </div>
                  <h3 className="prompt-lib-title">{p.title}</h3>
                </div>
                <pre className="prompt-lib-body">{p.body}</pre>
                <div className="prompt-lib-footer">
                  <div className="prompt-lib-tags">
                    {p.tags.map((t) => (
                      <span key={t} className="prompt-tag">#{t}</span>
                    ))}
                  </div>
                  <Link href={`/prompts/${p.id}`} className="prompt-lib-try-btn">
                    Try it →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Coming soon */}
        <div className="prompts-coming-soon">
          <p>
            🎉 After the workshop, attendees can submit their own prompts.{" "}
            <Link href="/share" className="coming-soon-link">Share yours →</Link>
          </p>
        </div>
      </main>

      <style>{`
        .prompts-header {
          background: linear-gradient(135deg, #0f172a, #1e293b);
          color: #fff;
          padding: 2.5rem 1.5rem 2rem;
        }
        .prompts-header-inner { max-width: 900px; margin: 0 auto; }
        .prompts-title { font-family: 'Sora', sans-serif; font-size: 2rem; font-weight: 800; margin: 0 0 0.5rem; letter-spacing: -0.02em; }
        .prompts-sub { color: rgba(255,255,255,0.65); font-size: 1rem; line-height: 1.6; margin: 0; }

        .prompts-main { max-width: 900px; margin: 0 auto; padding: 2rem 1rem 5rem; }

        /* Category pills */
        .cat-pills { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.75rem; }
        .cat-pill {
          padding: 0.375rem 0.875rem;
          border: 1px solid var(--border);
          border-radius: 100px;
          font-size: 0.8125rem;
          font-weight: 500;
          color: var(--muted);
          cursor: pointer;
          background: var(--surface);
          transition: background 0.15s, border-color 0.15s, color 0.15s;
        }
        .cat-pill:hover { border-color: var(--blue); color: var(--blue); background: var(--blue-bg); }
        .cat-pill.active { background: var(--blue-bg); border-color: var(--blue); color: var(--blue); font-weight: 600; }

        /* Prompt cards */
        .prompts-grid { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2.5rem; }
        .prompt-card-lib {
          border: 1px solid;
          border-radius: 12px;
          overflow: hidden;
        }
        .prompt-lib-blue   { background: var(--blue-bg);   border-color: var(--blue-bd); }
        .prompt-lib-cyan   { background: var(--cyan-bg);   border-color: var(--cyan-bd); }
        .prompt-lib-teal   { background: var(--teal-bg);   border-color: var(--teal-bd); }
        .prompt-lib-amber  { background: var(--amber-bg);  border-color: var(--amber-bd); }
        .prompt-lib-purple { background: var(--purple-bg); border-color: var(--purple-bd); }

        .prompt-lib-header { padding: 1rem 1.25rem 0.75rem; }
        .prompt-lib-meta { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; }
        .cat-badge {
          font-size: 0.6875rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.06em;
          padding: 0.125rem 0.5rem; border-radius: 100px;
          background: rgba(255,255,255,0.6);
        }
        .cat-badge-blue   { color: var(--blue); }
        .cat-badge-cyan   { color: var(--cyan); }
        .cat-badge-teal   { color: var(--teal); }
        .cat-badge-amber  { color: var(--amber); }
        .cat-badge-purple { color: var(--purple); }
        .featured-badge {
          font-size: 0.6875rem; font-weight: 600;
          color: var(--amber); background: var(--amber-bg);
          border: 1px solid var(--amber-bd);
          padding: 0.125rem 0.5rem; border-radius: 100px;
        }
        .prompt-lib-title {
          font-family: 'Sora', sans-serif;
          font-size: 1rem; font-weight: 700;
          color: var(--ink); margin: 0;
        }
        .prompt-lib-body {
          font-family: var(--mono);
          font-size: 0.8125rem; line-height: 1.65;
          padding: 0.75rem 1.25rem;
          margin: 0;
          white-space: pre-wrap;
          word-break: break-word;
          color: var(--ink);
          border-top: 1px solid rgba(0,0,0,0.06);
          border-bottom: 1px solid rgba(0,0,0,0.06);
        }
        .prompt-lib-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1.25rem;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .prompt-lib-tags { display: flex; gap: 0.375rem; flex-wrap: wrap; }
        .prompt-tag { font-size: 0.75rem; color: var(--muted); }
        .prompt-lib-try-btn {
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--blue);
          text-decoration: none;
          padding: 0.375rem 0.875rem;
          border: 1px solid var(--blue-bd);
          border-radius: 8px;
          background: rgba(255,255,255,0.6);
          transition: background 0.15s;
        }
        .prompt-lib-try-btn:hover { background: rgba(255,255,255,0.9); }

        /* Coming soon */
        .prompts-coming-soon {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 1.25rem 1.5rem;
          text-align: center;
          font-size: 0.9rem;
          color: var(--muted);
        }
        .prompts-coming-soon p { margin: 0; }
        .coming-soon-link { color: var(--blue); font-weight: 600; text-decoration: none; }
        .coming-soon-link:hover { text-decoration: underline; }
      `}</style>
    </>
  );
}
