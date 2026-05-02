"use client";

import { useState } from "react";
import PollCard from "@/components/PollCard";
import PollResults from "@/components/PollResults";
import ChatPanel from "@/components/ChatPanel";

const POLL1 = {
  id: "icebreaker",
  question: "How do you currently use AI in your day-to-day life?",
  options: [
    { emoji: "🔰", label: "Total newbie — I'm here to learn!" },
    { emoji: "🧪", label: "Curious tinkerer — tried it once or twice" },
    { emoji: "🛠️", label: "Regular user — part of my workflow" },
    { emoji: "🚀", label: "Power user — AI is my co-pilot" },
  ],
};

const POLL2 = {
  id: "mid-session",
  question: "What's your biggest challenge with AI tools right now?",
  options: [
    { emoji: "🤷", label: "Not sure where to start" },
    { emoji: "🎯", label: "Getting useful, specific outputs" },
    { emoji: "🔒", label: "Privacy and trust concerns" },
    { emoji: "⚡", label: "Fitting it into my busy schedule" },
    { emoji: "💸", label: "Cost of premium tools" },
  ],
};

const QUICK_QUESTIONS = [
  "What's the best free AI tool for someone just starting out?",
  "How do I write a prompt that actually gives me what I want?",
  "Is AI going to take my job?",
  "What's the difference between ChatGPT and Claude?",
];

type Tab = "poll" | "poll2" | "results" | "qa";

export default function HubTabs() {
  const [active, setActive] = useState<Tab>("poll");
  const [qaInput, setQaInput] = useState("");

  return (
    <div>
      {/* Tab bar */}
      <div className="tab-bar">
        <button
          className={`tab-btn${active === "poll" ? " active" : ""}`}
          onClick={() => setActive("poll")}
        >
          <span className="tab-icon">📊</span> Icebreaker Poll
        </button>
        <button
          className={`tab-btn${active === "poll2" ? " active" : ""}`}
          onClick={() => setActive("poll2")}
        >
          <span className="tab-icon">🎯</span> Mid-Session Poll
        </button>
        <button
          className={`tab-btn${active === "results" ? " active" : ""}`}
          onClick={() => setActive("results")}
        >
          <span className="tab-icon">📊</span> Live Results
        </button>
        <button
          className={`tab-btn${active === "qa" ? " active" : ""}`}
          onClick={() => setActive("qa")}
        >
          <span className="tab-icon">💬</span> Ask AI Anything
        </button>
      </div>

      {/* Tab panels */}
      <div className="tab-panels">
        {active === "poll" && (
          <div className="tab-panel">
            <PollCard
              pollId={POLL1.id}
              question={POLL1.question}
              options={POLL1.options}
            />
          </div>
        )}

        {active === "poll2" && (
          <div className="tab-panel">
            <PollCard
              pollId={POLL2.id}
              question={POLL2.question}
              options={POLL2.options}
            />
          </div>
        )}

        {active === "results" && (
          <div className="tab-panel">
            <PollResults />
          </div>
        )}

        {active === "qa" && (
          <div className="tab-panel">
            <div className="qa-quick-btns">
              {QUICK_QUESTIONS.map((q, i) => (
                <button
                  key={i}
                  className="qa-quick-btn"
                  onClick={() => setQaInput(q)}
                >
                  {q}
                </button>
              ))}
            </div>
            <ChatPanel
              initialPrompt={qaInput}
              placeholder="Ask anything about AI…"
            />
          </div>
        )}
      </div>

      <style>{`
        .tab-bar {
          display: flex;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px 12px 0 0;
          overflow: hidden;
          border-bottom: none;
        }
        .tab-btn {
          flex: 1;
          padding: 0.875rem 0.5rem;
          border: none;
          background: transparent;
          font-size: 0.8125rem;
          font-weight: 500;
          color: var(--muted);
          cursor: pointer;
          font-family: inherit;
          transition: background 0.15s, color 0.15s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.375rem;
          border-bottom: 2px solid transparent;
        }
        .tab-btn:hover { background: var(--paper); color: var(--ink); }
        .tab-btn.active {
          color: var(--blue);
          border-bottom-color: var(--blue);
          background: var(--blue-bg);
          font-weight: 600;
        }
        .tab-icon { font-size: 1rem; }
        .tab-panels {
          background: var(--surface);
          border: 1px solid var(--border);
          border-top: none;
          border-radius: 0 0 12px 12px;
        }
        .tab-panel { padding: 1.5rem; }

        .qa-quick-btns {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.25rem;
        }
        .qa-quick-btn {
          background: var(--blue-bg);
          border: 1px solid var(--blue-bd);
          border-radius: 100px;
          color: var(--blue);
          font-size: 0.8rem;
          font-weight: 500;
          padding: 0.375rem 0.875rem;
          cursor: pointer;
          font-family: inherit;
          transition: background 0.15s;
          text-align: left;
        }
        .qa-quick-btn:hover { background: var(--blue-bd); }
      `}</style>
    </div>
  );
}
