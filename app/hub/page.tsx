import SiteNav from "@/components/SiteNav";
import HubTabs from "./HubTabs";

export const metadata = {
  title: "Attendee Hub · LEAP 2026 AI Workshop",
};

export default function HubPage() {
  return (
    <>
      <SiteNav />

      <header className="hub-header">
        <div className="hub-header-inner">
          <div className="event-chip">
            <span className="live-dot" style={{ marginRight: "0.5rem" }} />
            LEAP Collective 2026 · May 2 · Shrewsbury MA
          </div>
          <h1 className="hub-title">
            Making AI Work<br />
            <span className="hub-accent">For You</span>
          </h1>
          <p className="hub-sub">
            Join the live poll and ask your AI questions anonymously.
            No technical background needed — just curiosity.
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

      <main className="hub-main">
        <HubTabs />
      </main>

      <style>{`
        .hub-header {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f2044 100%);
          color: #fff;
          padding: 3.5rem 1.5rem 3rem;
          text-align: center;
        }
        .hub-header-inner { max-width: 640px; margin: 0 auto; }
        .event-chip {
          display: inline-flex;
          align-items: center;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 100px;
          padding: 0.375rem 1rem;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.03em;
          color: rgba(255,255,255,0.85);
          margin-bottom: 1.5rem;
        }
        .hub-title {
          font-family: 'Sora', sans-serif;
          font-size: clamp(2rem, 6vw, 3rem);
          font-weight: 800;
          line-height: 1.1;
          margin: 0 0 1rem;
          letter-spacing: -0.02em;
        }
        .hub-accent { color: #38bdf8; }
        .hub-sub {
          color: rgba(255,255,255,0.7);
          font-size: 1rem;
          line-height: 1.6;
          margin: 0 0 2rem;
        }
        .speakers-row {
          display: flex;
          gap: 0.75rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        .spk-chip {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0.875rem;
          border-radius: 100px;
          font-size: 0.8125rem;
          font-weight: 500;
          border: 1px solid;
        }
        .spk-rik { background: rgba(37,99,235,0.2); border-color: rgba(37,99,235,0.4); color: #93c5fd; }
        .spk-sri { background: rgba(8,145,178,0.2); border-color: rgba(8,145,178,0.4); color: #67e8f9; }
        .spk-av {
          width: 28px; height: 28px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.625rem;
          font-weight: 700;
          font-family: 'Sora', sans-serif;
        }
        .av-r { background: #2563eb; color: #fff; }
        .av-s { background: #0891b2; color: #fff; }
        .hub-main { max-width: 720px; margin: 0 auto; padding: 2rem 1rem 4rem; }

        /* Poll styles */
        .poll-card { padding: 0.25rem 0; }
        .poll-question {
          font-family: 'Sora', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          color: var(--ink);
          margin: 0 0 1.25rem;
          line-height: 1.4;
        }
        .poll-options { display: flex; flex-direction: column; gap: 0.5rem; }
        .poll-option {
          width: 100%;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 0.75rem 1rem;
          cursor: pointer;
          text-align: left;
          transition: border-color 0.15s, background 0.15s;
        }
        .poll-option:hover:not(.has-voted) { border-color: var(--blue); background: var(--blue-bg); }
        .poll-option.voted { border-color: var(--blue); background: var(--blue-bg); }
        .poll-option.has-voted { cursor: default; }
        .poll-option-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }
        .poll-option-label { font-size: 0.875rem; font-weight: 500; color: var(--ink); }
        .poll-emoji { margin-right: 0.375rem; }
        .poll-pct { font-size: 0.8125rem; font-weight: 600; color: var(--blue); font-family: var(--mono); }
        .poll-bar-track { height: 4px; background: var(--border); border-radius: 2px; }
        .poll-bar-fill { height: 4px; background: var(--blue); border-radius: 2px; transition: width 0.4s ease; }
        .poll-meta {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-top: 0.875rem;
          font-size: 0.8125rem;
          color: var(--muted);
        }
        .poll-voted-badge {
          background: var(--teal-bg);
          color: var(--teal);
          border: 1px solid var(--teal-bd);
          border-radius: 100px;
          padding: 0.125rem 0.625rem;
          font-size: 0.75rem;
          font-weight: 600;
        }

        /* Chat styles */
        .chat-panel {
          display: flex;
          flex-direction: column;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
        }
        .chat-messages {
          min-height: 320px;
          max-height: 480px;
          overflow-y: auto;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .chat-empty {
          color: var(--hint);
          font-size: 0.875rem;
          text-align: center;
          margin: auto;
          padding: 2rem;
          line-height: 1.6;
        }
        .msg { max-width: 85%; }
        .msg.user {
          align-self: flex-end;
          background: var(--blue);
          color: #fff;
          padding: 0.625rem 1rem;
          border-radius: 14px 14px 4px 14px;
          font-size: 0.9rem;
          line-height: 1.5;
        }
        .msg.assistant { align-self: flex-start; max-width: 90%; }
        .msg-label {
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 0.375rem;
        }
        .msg-body {
          background: var(--paper);
          border: 1px solid var(--border);
          border-radius: 4px 14px 14px 14px;
          padding: 0.75rem 1rem;
          font-size: 0.9rem;
          line-height: 1.6;
          color: var(--ink);
        }
        .chat-input-row {
          display: flex;
          border-top: 1px solid var(--border);
        }
        .chat-input {
          flex: 1;
          border: none;
          outline: none;
          padding: 0.875rem 1rem;
          font-size: 0.9rem;
          font-family: inherit;
          background: transparent;
          color: var(--ink);
        }
        .chat-input::placeholder { color: var(--hint); }
        .chat-send-btn {
          background: var(--blue);
          color: #fff;
          border: none;
          padding: 0 1.5rem;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          font-family: inherit;
          transition: background 0.15s;
        }
        .chat-send-btn:hover { background: #1d4ed8; }
        .chat-send-btn:disabled { background: var(--border); color: var(--hint); cursor: not-allowed; }
      `}</style>
    </>
  );
}
