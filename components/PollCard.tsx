"use client";

import { useState, useEffect, useCallback } from "react";

interface PollOption {
  label: string;
  emoji?: string;
}

interface PollResults {
  options: { count: number }[];
  total: number;
}

interface PollCardProps {
  pollId: string;
  question: string;
  options: PollOption[];
}

function getSessionKey(): string {
  if (typeof window === "undefined") return "ssr";
  let key = localStorage.getItem("leap_session");
  if (!key) {
    key = crypto.randomUUID();
    localStorage.setItem("leap_session", key);
  }
  return key;
}

export default function PollCard({ pollId, question, options }: PollCardProps) {
  const [voted, setVoted] = useState<number | null>(null);
  const [results, setResults] = useState<PollResults | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchResults = useCallback(async () => {
    try {
      const res = await fetch(`/api/polls/results?poll_id=${pollId}`);
      if (res.ok) setResults(await res.json());
    } catch {
      // silently ignore
    }
  }, [pollId]);

  useEffect(() => {
    fetchResults();
    // Poll for live updates every 3 seconds
    const interval = setInterval(fetchResults, 3000);
    return () => clearInterval(interval);
  }, [fetchResults]);

  async function castVote(idx: number) {
    if (loading) return;

    // Optimistic toggle
    if (voted === idx) {
      setVoted(null);
    } else {
      setVoted(idx);
    }

    setLoading(true);
    try {
      await fetch("/api/polls/vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-session-key": getSessionKey(),
        },
        body: JSON.stringify({ poll_id: pollId, option_idx: idx }),
      });
      await fetchResults();
    } catch {
      // revert optimistic update
      setVoted(voted);
    } finally {
      setLoading(false);
    }
  }

  const total = results?.total ?? 0;

  const hasVoted = voted !== null;

  return (
    <div className="poll-card">
      <p className="poll-question">{question}</p>
      <div className="poll-options">
        {options.map((opt, i) => {
          const count = results?.options[i]?.count ?? 0;
          const pct = total > 0 ? Math.round((count / total) * 100) : 0;
          const isVoted = voted === i;

          return (
            <button
              key={i}
              className={`poll-option${isVoted ? " voted" : ""}${hasVoted ? " has-voted" : ""}`}
              onClick={() => !hasVoted && castVote(i)}
              disabled={loading || hasVoted}
            >
              <div className="poll-option-top">
                <span className="poll-option-label">
                  {opt.emoji && <span className="poll-emoji">{opt.emoji}</span>}
                  {opt.label}
                </span>
                {hasVoted && (
                  <span className="poll-pct">{`${pct}%`}</span>
                )}
              </div>
              {hasVoted && (
                <div className="poll-bar-track">
                  <div className="poll-bar-fill" style={{ width: `${pct}%` }} />
                </div>
              )}
            </button>
          );
        })}
      </div>
      <div className="poll-meta">
        {hasVoted
          ? `${total} ${total === 1 ? "response" : "responses"}`
          : "Tap an option to vote"}
        {hasVoted && <span className="poll-voted-badge">✓ Your vote is in</span>}
      </div>
    </div>
  );
}
