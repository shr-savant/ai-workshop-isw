"use client";

import { useState } from "react";
import SiteNav from "@/components/SiteNav";
import ChatPanel from "@/components/ChatPanel";

const STEPS = [
  {
    id: "vague-vs-specific",
    time: "Try-on #1",
    title: "Vague vs. Briefed",
    subtitle: "See how the RCTF formula transforms results",
    desc: "Try the vague version first — notice the generic output. Then try the briefed version with Role, Context, Task, and Format filled in. Same topic, completely different result.",
    vague: "Write an email to my customers about our sale.",
    specific: `Role: You are a friendly local restaurant owner.
Context: We're doing 20% off this weekend for our 5-year anniversary. Customers are regulars — families and couples for special occasions.
Task: Write the announcement email.
Format: Warm and personal, under 100 words, one clear call-to-action.`,
  },
  {
    id: "iteration",
    time: "Try-on #2",
    title: "The Iteration Lesson",
    subtitle: "Role + Task + Format unlocks 80% of AI's value",
    desc: "Same topic, three levels of refinement. Edit the template below — the more specific you are, the better.",
    template: `Act as a [ROLE, e.g. career coach / marketing expert / financial advisor].

Context: [BACKGROUND — e.g. I've been in this industry for 5 years / I'm a small business owner / I'm applying for my first job].

Help me [TASK — be specific about what you want].

Format the response as [FORMAT — e.g. bullet list / short email / step-by-step guide].

Keep the tone [TONE — e.g. professional / casual / encouraging].`,
  },
  {
    id: "freeform",
    time: "Try-on #3",
    title: "Freeform — Your Turn",
    subtitle: "Apply what you've learned to your real situation",
    desc: "No template. Think about the most tedious or time-consuming task in your work week. Ask AI to help with it.",
    placeholder: "Describe your task and ask for help…",
  },
];

export default function PlaygroundPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [promptText, setPromptText] = useState("");

  const step = STEPS[activeStep];

  return (
    <>
      <SiteNav />

      <header className="pg-header">
        <div className="pg-header-inner">
          <h1 className="pg-title">🧪 Prompt Playground</h1>
          <p className="pg-sub">Three guided experiments tied to the workshop. Build intuition for how AI responds to different prompts.</p>
        </div>
      </header>

      <main className="pg-main">
        {/* Step selector */}
        <div className="pg-steps">
          {STEPS.map((s, i) => (
            <button
              key={s.id}
              className={`pg-step-btn${activeStep === i ? " active" : ""}`}
              onClick={() => { setActiveStep(i); setPromptText(""); }}
            >
              <span className="pg-step-time">{s.time}</span>
              <span className="pg-step-title">{s.title}</span>
            </button>
          ))}
        </div>

        {/* Step content */}
        <div className="pg-content">
          <div className="pg-step-header">
            <h2 className="pg-step-name">{step.title}</h2>
            <p className="pg-step-sub">{step.subtitle}</p>
            <p className="pg-step-desc">{step.desc}</p>
          </div>

          {/* Vague vs Specific step */}
          {step.id === "vague-vs-specific" && (
            <div className="pg-compare">
              <div className="pg-compare-col">
                <div className="pg-compare-label pg-label-bad">Vague prompt</div>
                <pre className="pg-compare-text">{step.vague}</pre>
                <button className="pg-try-btn" onClick={() => setPromptText(step.vague!)}>
                  Try the vague version →
                </button>
              </div>
              <div className="pg-compare-arrow">→</div>
              <div className="pg-compare-col">
                <div className="pg-compare-label pg-label-good">Briefed prompt (RCTF)</div>
                <pre className="pg-compare-text">{step.specific}</pre>
                <button className="pg-try-btn pg-try-btn-primary" onClick={() => setPromptText(step.specific!)}>
                  Try the briefed version →
                </button>
              </div>
            </div>
          )}

          {/* Template step */}
          {step.id === "iteration" && (
            <div className="pg-template-section">
              <label className="pg-template-label">Edit the template, then send:</label>
              <textarea
                className="pg-textarea"
                value={promptText || step.template!}
                onChange={(e) => setPromptText(e.target.value)}
                rows={8}
              />
            </div>
          )}

          {/* Chat panel */}
          <div className="pg-chat-wrapper">
            <ChatPanel
              initialPrompt={promptText}
              placeholder={step.placeholder ?? "Paste or type your prompt here…"}
            />
          </div>
        </div>
      </main>

      <style>{`
        .pg-header {
          background: linear-gradient(135deg, #0f172a, #1e293b);
          color: #fff;
          padding: 2.5rem 1.5rem 2rem;
        }
        .pg-header-inner { max-width: 800px; margin: 0 auto; }
        .pg-title { font-family: 'Sora', sans-serif; font-size: 2rem; font-weight: 800; margin: 0 0 0.5rem; letter-spacing: -0.02em; }
        .pg-sub { color: rgba(255,255,255,0.65); font-size: 1rem; line-height: 1.6; margin: 0; }

        .pg-main { max-width: 800px; margin: 0 auto; padding: 2rem 1rem 5rem; }

        .pg-steps {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }
        .pg-step-btn {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.125rem;
          padding: 0.75rem 1rem;
          border: 1px solid var(--border);
          border-radius: 10px;
          background: var(--surface);
          cursor: pointer;
          font-family: inherit;
          text-align: left;
          transition: border-color 0.15s, background 0.15s;
          flex: 1;
          min-width: 160px;
        }
        .pg-step-btn:hover { border-color: var(--blue); background: var(--blue-bg); }
        .pg-step-btn.active { border-color: var(--blue); background: var(--blue-bg); }
        .pg-step-time { font-size: 0.6875rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--blue); }
        .pg-step-title { font-size: 0.875rem; font-weight: 600; color: var(--ink); }

        .pg-content { display: flex; flex-direction: column; gap: 1.5rem; }
        .pg-step-header {}
        .pg-step-name { font-family: 'Sora', sans-serif; font-size: 1.375rem; font-weight: 700; color: var(--ink); margin: 0 0 0.25rem; }
        .pg-step-sub { font-size: 0.875rem; font-weight: 600; color: var(--blue); margin: 0 0 0.5rem; }
        .pg-step-desc { font-size: 0.9rem; color: var(--muted); margin: 0; line-height: 1.6; }

        .pg-compare {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 1rem;
          align-items: start;
        }
        .pg-compare-col {}
        .pg-compare-arrow {
          font-size: 1.5rem;
          color: var(--hint);
          padding-top: 2.5rem;
          align-self: center;
        }
        .pg-compare-label {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 0.5rem;
          padding: 0.25rem 0.625rem;
          border-radius: 100px;
          display: inline-block;
        }
        .pg-label-bad  { background: #fee2e2; color: #b91c1c; }
        .pg-label-good { background: var(--teal-bg); color: var(--teal); }
        .pg-compare-text {
          font-family: var(--mono);
          font-size: 0.8rem;
          line-height: 1.6;
          background: var(--paper);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 0.75rem;
          margin: 0 0 0.75rem;
          white-space: pre-wrap;
          word-break: break-word;
          color: var(--ink);
        }
        .pg-try-btn {
          width: 100%;
          padding: 0.5rem 0.875rem;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--surface);
          font-size: 0.8rem;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          color: var(--ink);
          transition: background 0.15s;
        }
        .pg-try-btn:hover { background: var(--paper); }
        .pg-try-btn-primary {
          background: var(--blue);
          color: #fff;
          border-color: var(--blue);
        }
        .pg-try-btn-primary:hover { background: #1d4ed8; }

        .pg-template-section {}
        .pg-template-label { font-size: 0.875rem; font-weight: 600; color: var(--ink); display: block; margin-bottom: 0.5rem; }
        .pg-textarea {
          width: 100%;
          font-family: var(--mono);
          font-size: 0.8125rem;
          line-height: 1.65;
          padding: 0.875rem;
          border: 1px solid var(--border);
          border-radius: 10px;
          background: var(--paper);
          color: var(--ink);
          resize: vertical;
          outline: none;
        }
        .pg-textarea:focus { border-color: var(--blue); }

        /* Shared chat styles (same as hub) */
        .chat-panel {
          display: flex; flex-direction: column;
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 12px; overflow: hidden;
        }
        .chat-messages {
          min-height: 280px; max-height: 420px; overflow-y: auto;
          padding: 1.25rem; display: flex; flex-direction: column; gap: 1rem;
        }
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
