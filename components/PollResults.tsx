"use client";

import { useState, useEffect, useCallback } from "react";

interface Option {
  emoji?: string;
  label: string;
}

interface Poll {
  id: string;
  question: string;
  options: Option[];
}

interface Results {
  options: { count: number }[];
  total: number;
}

function PollResultBlock({ poll }: { poll: Poll }) {
  const [results, setResults] = useState<Results | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetch_ = useCallback(async () => {
    try {
      const res = await fetch(`/api/polls/results?poll_id=${poll.id}`);
      if (res.ok) {
        setResults(await res.json());
        setLastUpdated(new Date());
      }
    } catch { /* silently ignore */ }
  }, [poll.id]);

  useEffect(() => {
    fetch_();
    const t = setInterval(fetch_, 3000);
    return () => clearInterval(t);
  }, [fetch_]);

  const total = results?.total ?? 0;

  return (
    <div className="result-block">
      <div className="result-block-header">
        <p className="result-question">{poll.question}</p>
        <span className="result-total">{total} {total === 1 ? "vote" : "votes"}</span>
      </div>
      <div className="result-options">
        {poll.options.map((opt, i) => {
          const count = results?.options[i]?.count ?? 0;
          const pct = total > 0 ? Math.round((count / total) * 100) : 0;
          const isLeading = total > 0 && count === Math.max(...(results?.options.map(o => o.count) ?? [0])) && count > 0;
          return (
            <div key={i} className={`result-row${isLeading ? " leading" : ""}`}>
              <div className="result-row-top">
                <span className="result-label">
                  {opt.emoji && <span className="result-emoji">{opt.emoji}</span>}
                  {opt.label}
                </span>
                <span className="result-stat">
                  <span className="result-count">{count}</span>
                  <span className="result-pct">{pct}%</span>
                </span>
              </div>
              <div className="result-track">
                <div className={`result-fill${isLeading ? " fill-leading" : ""}`} style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
      {lastUpdated && (
        <p className="result-updated">
          Updated {lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })} · refreshes every 3s
        </p>
      )}
    </div>
  );
}

const POLLS: Poll[] = [
  {
    id: "icebreaker",
    question: "How do you currently use AI in your day-to-day life?",
    options: [
      { emoji: "🔰", label: "Total newbie — I'm here to learn!" },
      { emoji: "🧪", label: "Curious tinkerer — tried it once or twice" },
      { emoji: "🛠️", label: "Regular user — part of my workflow" },
      { emoji: "🚀", label: "Power user — AI is my co-pilot" },
    ],
  },
  {
    id: "mid-session",
    question: "What's your biggest challenge with AI tools right now?",
    options: [
      { emoji: "🤷", label: "Not sure where to start" },
      { emoji: "🎯", label: "Getting useful, specific outputs" },
      { emoji: "🔒", label: "Privacy and trust concerns" },
      { emoji: "⚡", label: "Fitting it into my busy schedule" },
      { emoji: "💸", label: "Cost of premium tools" },
    ],
  },
];

export default function PollResults() {
  return (
    <div className="poll-results-panel">
      <div className="poll-results-note">
        <span>📡</span>
        <span>Live results — updates automatically as people vote</span>
      </div>
      {POLLS.map((poll) => (
        <PollResultBlock key={poll.id} poll={poll} />
      ))}

      <style>{`
        .poll-results-panel { display: flex; flex-direction: column; gap: 1.5rem; }

        .poll-results-note {
          display: flex; align-items: center; gap: 0.5rem;
          font-size: 0.8125rem; color: var(--teal);
          background: var(--teal-bg); border: 1px solid var(--teal-bd);
          border-radius: 8px; padding: 0.625rem 0.875rem;
        }

        .result-block {
          background: var(--paper);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.25rem;
        }

        .result-block-header {
          display: flex; align-items: flex-start;
          justify-content: space-between; gap: 1rem;
          margin-bottom: 1rem;
        }

        .result-question {
          font-family: 'Sora', sans-serif;
          font-size: 0.9375rem; font-weight: 600;
          color: var(--ink); margin: 0; line-height: 1.4;
        }

        .result-total {
          font-size: 0.75rem; font-weight: 700;
          color: var(--muted); background: var(--surface);
          border: 1px solid var(--border); border-radius: 100px;
          padding: 0.2rem 0.65rem; white-space: nowrap;
        }

        .result-options { display: flex; flex-direction: column; gap: 0.75rem; }

        .result-row { }

        .result-row-top {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 0.375rem; gap: 0.5rem;
        }

        .result-label {
          font-size: 0.875rem; color: var(--ink); line-height: 1.4;
        }
        .result-emoji { margin-right: 0.375rem; }

        .result-stat {
          display: flex; align-items: center; gap: 0.5rem;
          flex-shrink: 0;
        }
        .result-count {
          font-size: 0.8125rem; font-weight: 700;
          color: var(--ink); font-family: var(--mono);
        }
        .result-pct {
          font-size: 0.8125rem; font-weight: 600;
          color: var(--muted); font-family: var(--mono);
          min-width: 2.5rem; text-align: right;
        }
        .result-row.leading .result-pct { color: var(--blue); }
        .result-row.leading .result-count { color: var(--blue); }

        .result-track {
          height: 8px; background: var(--border);
          border-radius: 4px; overflow: hidden;
        }
        .result-fill {
          height: 8px; background: var(--hint);
          border-radius: 4px; transition: width 0.5s ease;
        }
        .result-fill.fill-leading {
          background: var(--blue);
        }

        .result-updated {
          font-size: 0.75rem; color: var(--hint);
          margin: 0.875rem 0 0; text-align: right;
        }
      `}</style>
    </div>
  );
}
