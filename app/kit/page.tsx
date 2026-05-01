import SiteNav from "@/components/SiteNav";
import PromptCards from "./PromptCards";

export const metadata = {
  title: "AI Starter Kit · LEAP 2026 Workshop",
};

const TOOLS = [
  {
    name: "Claude",
    url: "https://claude.ai",
    tag: "Best for deep thinking",
    color: "blue",
    desc: "Excels at nuanced reasoning, long documents, and coding. Our pick for complex analysis.",
  },
  {
    name: "ChatGPT",
    url: "https://chat.openai.com",
    tag: "Most popular",
    color: "teal",
    desc: "Versatile and powerful. Great starting point — huge community and plugin ecosystem.",
  },
  {
    name: "Perplexity",
    url: "https://perplexity.ai",
    tag: "Best for research",
    color: "purple",
    desc: "Searches the web in real-time and cites sources. Use when you need current information.",
  },
  {
    name: "Canva AI",
    url: "https://canva.com",
    tag: "Design + content",
    color: "cyan",
    desc: "Generate images, presentations, and social content without any design skills.",
  },
  {
    name: "Notion AI",
    url: "https://notion.so",
    tag: "Docs + notes",
    color: "amber",
    desc: "Built into Notion. Summarize meeting notes, draft action items, or brainstorm inside your workspace.",
  },
];

export default function KitPage() {
  return (
    <>
      <SiteNav />

      <header className="kit-hero">
        <div className="kit-hero-inner">
          <div className="kit-eyebrow">
            <span className="eyebrow-dot" />
            LEAP Collective 2026 · India Society of Worcester · May 2, Shrewsbury MA
          </div>
          <h1 className="kit-title">
            AI Starter Kit — <em>Put AI to Work</em>
          </h1>
          <p className="kit-sub">
            Tools, prompts and principles for your career and your business.
            No technical background required — just curiosity.
          </p>
          <div className="speakers-row">
            <div className="spk-chip spk-rik">
              <div className="spk-av av-r">RB</div>
              Rik Banerjee · AI Builder
            </div>
            <div className="spk-chip spk-sri">
              <div className="spk-av av-s">SS</div>
              Shrikant Savant · AI Builder
            </div>
          </div>
        </div>
      </header>

      {/* 85/15 principle banner */}
      <div className="principle-bar">
        <div className="principle-ratio">85 / 15</div>
        <div className="principle-divider" />
        <div className="principle-text">
          <strong>AI does 85% of the heavy lifting.</strong> Your judgment, expertise and context are the irreplaceable 15%. This session is about making that 85% work for you — starting today.
        </div>
      </div>

      <main className="kit-main">
        {/* Essential Tools */}
        <section className="kit-section">
          <div className="section-header">
            <h2 className="section-title">Essential AI Tools</h2>
            <p className="section-sub">Five tools you can start using today — all free tiers available.</p>
          </div>
          <div className="tools-grid">
            {TOOLS.map((tool) => (
              <a
                key={tool.name}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`tool-card tool-${tool.color}`}
              >
                <div className="tool-top">
                  <span className="tool-name">{tool.name}</span>
                  <span className="tool-tag">{tool.tag}</span>
                </div>
                <p className="tool-desc">{tool.desc}</p>
                <span className="tool-link">Open →</span>
              </a>
            ))}
          </div>
        </section>

        {/* Quick Prompts */}
        <section className="kit-section">
          <div className="section-header">
            <h2 className="section-title">Quick Prompts — Try These Today</h2>
            <p className="section-sub">Copy, fill in the blanks, paste into any AI chat. Results in under 60 seconds.</p>
          </div>
          <PromptCards />
        </section>

        {/* Principles */}
        <section className="kit-section">
          <div className="section-header">
            <h2 className="section-title">Core Principles</h2>
          </div>
          <div className="principles-grid">
            <div className="principle-card">
              <div className="principle-num">01</div>
              <h3 className="principle-heading">The 85/15 Rule</h3>
              <p className="principle-body">
                AI does 85% of the work — drafting, researching, formatting, brainstorming. You provide the irreplaceable 15%: your context, judgment, relationships, and final call. This division makes you <em>more</em> valuable, not less.
              </p>
            </div>
            <div className="principle-card">
              <div className="principle-num">02</div>
              <h3 className="principle-heading">The Golden Rule of Prompting</h3>
              <p className="principle-body">
                <strong>Role + Task + Format.</strong> Tell AI who it is, what to do, and how to respond. "Act as a [ROLE]. Help me [TASK]. Format the response as [FORMAT]." This one structure unlocks 80% of AI's value.
              </p>
            </div>
            <div className="principle-card">
              <div className="principle-num">03</div>
              <h3 className="principle-heading">Iterate, Don't Restart</h3>
              <p className="principle-body">
                Bad first response? Don't start over — say "make it shorter", "add a more optimistic tone", or "focus more on X." AI is a conversation, not a vending machine. Each iteration compounds.
              </p>
            </div>
          </div>
        </section>
      </main>

      <style>{`
        /* Hero */
        .kit-hero {
          background: linear-gradient(135deg, #0d1117 0%, #161b22 60%, #0d2137 100%);
          color: #fff;
          padding: 3.5rem 1.5rem 3rem;
          text-align: center;
        }
        .kit-hero-inner { max-width: 700px; margin: 0 auto; }
        .kit-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 100px;
          padding: 0.375rem 1rem;
          font-size: 0.75rem;
          letter-spacing: 0.03em;
          color: rgba(255,255,255,0.7);
          margin-bottom: 1.5rem;
        }
        .eyebrow-dot {
          display: inline-block;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #38bdf8;
        }
        .kit-title {
          font-family: 'Sora', sans-serif;
          font-size: clamp(1.75rem, 5vw, 2.75rem);
          font-weight: 800;
          line-height: 1.15;
          margin: 0 0 1rem;
          letter-spacing: -0.02em;
        }
        .kit-title em { font-style: italic; color: #38bdf8; }
        .kit-sub {
          color: rgba(255,255,255,0.65);
          font-size: 1rem;
          line-height: 1.6;
          margin: 0 0 2rem;
        }

        /* Speakers */
        .speakers-row { display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; }
        .spk-chip {
          display: flex; align-items: center; gap: 0.5rem;
          padding: 0.5rem 0.875rem; border-radius: 100px;
          font-size: 0.8125rem; font-weight: 500; border: 1px solid;
        }
        .spk-rik { background: rgba(37,99,235,0.2); border-color: rgba(37,99,235,0.4); color: #93c5fd; }
        .spk-sri { background: rgba(8,145,178,0.2); border-color: rgba(8,145,178,0.4); color: #67e8f9; }
        .spk-av {
          width: 28px; height: 28px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.625rem; font-weight: 700; font-family: 'Sora', sans-serif;
        }
        .av-r { background: #2563eb; color: #fff; }
        .av-s { background: #0891b2; color: #fff; }

        /* Principle bar */
        .principle-bar {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          background: #0f172a;
          color: #fff;
          padding: 1.125rem 2rem;
        }
        .principle-ratio {
          font-family: 'Sora', sans-serif;
          font-size: 1.75rem;
          font-weight: 800;
          color: #38bdf8;
          white-space: nowrap;
          letter-spacing: -0.02em;
        }
        .principle-divider { width: 1px; height: 2.5rem; background: rgba(255,255,255,0.15); flex-shrink: 0; }
        .principle-text { font-size: 0.875rem; line-height: 1.6; color: rgba(255,255,255,0.8); }
        .principle-text strong { color: #fff; }

        /* Main layout */
        .kit-main { max-width: 900px; margin: 0 auto; padding: 3rem 1.5rem 5rem; }
        .kit-section { margin-bottom: 3.5rem; }
        .section-header { margin-bottom: 1.5rem; }
        .section-title {
          font-family: 'Sora', sans-serif;
          font-size: 1.375rem;
          font-weight: 700;
          color: var(--ink);
          margin: 0 0 0.375rem;
          letter-spacing: -0.01em;
        }
        .section-sub { font-size: 0.9rem; color: var(--muted); margin: 0; line-height: 1.5; }

        /* Tools grid */
        .tools-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 1rem;
        }
        .tool-card {
          display: block;
          padding: 1.25rem;
          border-radius: 12px;
          border: 1px solid;
          text-decoration: none;
          transition: transform 0.15s, box-shadow 0.15s;
        }
        .tool-card:hover { transform: translateY(-2px); box-shadow: 0 4px 16px rgba(0,0,0,0.08); }
        .tool-blue { background: var(--blue-bg); border-color: var(--blue-bd); }
        .tool-teal { background: var(--teal-bg); border-color: var(--teal-bd); }
        .tool-purple { background: var(--purple-bg); border-color: var(--purple-bd); }
        .tool-cyan { background: var(--cyan-bg); border-color: var(--cyan-bd); }
        .tool-amber { background: var(--amber-bg); border-color: var(--amber-bd); }
        .tool-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.625rem; }
        .tool-name { font-family: 'Sora', sans-serif; font-size: 1rem; font-weight: 700; color: var(--ink); }
        .tool-tag {
          font-size: 0.6875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--muted);
          background: rgba(255,255,255,0.6);
          padding: 0.125rem 0.5rem;
          border-radius: 100px;
        }
        .tool-desc { font-size: 0.85rem; line-height: 1.55; color: var(--ink); margin: 0 0 0.75rem; }
        .tool-link { font-size: 0.8rem; font-weight: 600; color: var(--blue); }

        /* Principles */
        .principles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 1rem;
        }
        .principle-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.5rem;
        }
        .principle-num {
          font-family: var(--mono);
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--blue);
          letter-spacing: 0.1em;
          margin-bottom: 0.75rem;
        }
        .principle-heading {
          font-family: 'Sora', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          color: var(--ink);
          margin: 0 0 0.625rem;
        }
        .principle-body { font-size: 0.875rem; line-height: 1.65; color: var(--muted); margin: 0; }
        .principle-body strong { color: var(--ink); }
        .principle-body em { color: var(--ink); }
      `}</style>
    </>
  );
}
