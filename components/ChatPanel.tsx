"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatPanelProps {
  initialPrompt?: string;
  placeholder?: string;
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

export default function ChatPanel({ initialPrompt, placeholder }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState(initialPrompt ?? "");

  useEffect(() => {
    if (initialPrompt) setInput(initialPrompt);
  }, [initialPrompt]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send(text?: string) {
    const q = (text ?? input).trim();
    if (!q || loading) return;

    const newMessages: Message[] = [...messages, { role: "user", content: q }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-session-key": getSessionKey(),
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();
      const answer = data.text || data.error || "Something went wrong.";
      setMessages([...newMessages, { role: "assistant", content: answer }]);
    } catch {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content:
            "Couldn't reach the AI right now. That's actually a useful lesson — always have a backup plan when tools go offline. Try again in a moment!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="chat-panel">
      <div className="chat-messages">
        {messages.length === 0 && (
          <div className="chat-empty">Ask any question about AI — no jargon, just plain English answers.</div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.role}`}>
            {m.role === "assistant" && (
              <div className="msg-label">Workshop AI</div>
            )}
            <div
              className="msg-body"
              dangerouslySetInnerHTML={{
                __html: m.content
                  .replace(/&/g, "&amp;")
                  .replace(/</g, "&lt;")
                  .replace(/>/g, "&gt;")
                  .replace(/\n\n/g, "<br><br>")
                  .replace(/\n/g, "<br>"),
              }}
            />
          </div>
        ))}
        {loading && (
          <div className="msg assistant">
            <div className="msg-label">Workshop AI</div>
            <div className="typing-dots">
              <span /><span /><span />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="chat-input-row">
        <input
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
          placeholder={placeholder ?? "Ask anything about AI…"}
          disabled={loading}
        />
        <button
          className="chat-send-btn"
          onClick={() => send()}
          disabled={loading || !input.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
}
