import SiteNav from "@/components/SiteNav";
import Link from "next/link";

export const metadata = {
  title: "Share Your Result · LEAP 2026 AI Workshop",
};

export default function SharePage() {
  return (
    <>
      <SiteNav />

      <header className="share-header">
        <div className="share-header-inner">
          <h1 className="share-title">🎯 Share Your AI Result</h1>
          <p className="share-sub">
            Got a great output from a prompt? Share it with the community — it might inspire someone else.
          </p>
        </div>
      </header>

      <main className="share-main">
        <div className="share-coming-soon-card">
          <div className="share-icon">🚀</div>
          <h2 className="share-card-title">Coming After May 2</h2>
          <p className="share-card-body">
            Community sharing opens after the workshop. Attend LEAP Collective 2026 on May 2 in Shrewsbury MA and be the first to share your AI results.
          </p>
          <div className="share-cta-row">
            <Link href="/hub" className="share-cta-primary">Go to Attendee Hub</Link>
            <Link href="/prompts" className="share-cta-secondary">Browse Prompts</Link>
          </div>
        </div>
      </main>

      <style>{`
        .share-header {
          background: linear-gradient(135deg, #0f172a, #1e293b);
          color: #fff;
          padding: 2.5rem 1.5rem 2rem;
        }
        .share-header-inner { max-width: 640px; margin: 0 auto; }
        .share-title { font-family: 'Sora', sans-serif; font-size: 2rem; font-weight: 800; margin: 0 0 0.5rem; letter-spacing: -0.02em; }
        .share-sub { color: rgba(255,255,255,0.65); font-size: 1rem; line-height: 1.6; margin: 0; }

        .share-main { max-width: 640px; margin: 0 auto; padding: 3rem 1rem 5rem; }
        .share-coming-soon-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 3rem 2rem;
          text-align: center;
        }
        .share-icon { font-size: 3rem; margin-bottom: 1rem; }
        .share-card-title { font-family: 'Sora', sans-serif; font-size: 1.5rem; font-weight: 700; color: var(--ink); margin: 0 0 0.875rem; }
        .share-card-body { font-size: 0.95rem; color: var(--muted); line-height: 1.65; max-width: 440px; margin: 0 auto 2rem; }
        .share-cta-row { display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; }
        .share-cta-primary {
          background: var(--blue); color: #fff;
          padding: 0.75rem 1.5rem; border-radius: 8px;
          font-weight: 600; font-size: 0.9rem; text-decoration: none;
          transition: background 0.15s;
        }
        .share-cta-primary:hover { background: #1d4ed8; }
        .share-cta-secondary {
          background: var(--paper); color: var(--ink);
          border: 1px solid var(--border);
          padding: 0.75rem 1.5rem; border-radius: 8px;
          font-weight: 600; font-size: 0.9rem; text-decoration: none;
          transition: background 0.15s;
        }
        .share-cta-secondary:hover { background: var(--border); }
      `}</style>
    </>
  );
}
