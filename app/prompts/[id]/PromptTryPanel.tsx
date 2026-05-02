"use client";

import { useState } from "react";
import ChatPanel from "@/components/ChatPanel";

export default function PromptTryPanel({ defaultPrompt }: { defaultPrompt: string }) {
  const [customPrompt, setCustomPrompt] = useState(defaultPrompt);

  return (
    <div>
      <div className="ptp-customize">
        <label className="ptp-label">Customize your prompt (fill in the [brackets]):</label>
        <textarea
          className="ptp-textarea"
          value={customPrompt}
          onChange={(e) => setCustomPrompt(e.target.value)}
          rows={Math.min(12, customPrompt.split("\n").length + 2)}
        />
      </div>
      <ChatPanel
        initialPrompt={customPrompt}
        placeholder="Your customized prompt will appear here when you click Send…"
      />

      <style>{`
        .ptp-customize { margin-bottom: 1rem; }
        .ptp-label { display: block; font-size: 0.875rem; font-weight: 600; color: var(--ink); margin-bottom: 0.5rem; }
        .ptp-textarea {
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
        .ptp-textarea:focus { border-color: var(--blue); }
      `}</style>
    </div>
  );
}
