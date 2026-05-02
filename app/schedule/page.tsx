import SiteNav from "@/components/SiteNav";

export const metadata = {
  title: "Schedule · LEAP 2026 AI Workshop",
};

const SCHEDULE = [
  {
    time: "0:00",
    duration: "5 min",
    segment: "Joint intro — two voices, one vision",
    speaker: "both",
    speakerLabel: "Both",
    notes: "Set the stage: why AI, why now, why this community.",
  },
  {
    time: "0:05",
    duration: "6 min",
    segment: "The real AI landscape + his story",
    speaker: "rik",
    speakerLabel: "Rik",
    notes: "EzyUpload, Bazaar Protocol, DCF platform — built with AI, not despite it.",
  },
  {
    time: "0:11",
    duration: "6 min",
    segment: "His AI journey — a different entry point",
    speaker: "sri",
    speakerLabel: "Shrikant",
    notes: "Entrepreneur perspective: small-business use, not Big Tech.",
  },
  {
    time: "0:17",
    duration: "8 min",
    segment: "Try-on #1 — everyone types their first prompt",
    speaker: "tryon",
    speakerLabel: "Hands-on",
    notes: "Career prompt from the Starter Kit. Speakers walk the room.",
    tryOnStep: 1,
  },
  {
    time: "0:25",
    duration: "5 min",
    segment: "Career case study — resume & job search",
    speaker: "rik",
    speakerLabel: "Rik",
    notes: "Resume bullet rewrite live demo. Show before/after.",
  },
  {
    time: "0:30",
    duration: "5 min",
    segment: "Business case study — entrepreneur AI in action",
    speaker: "sri",
    speakerLabel: "Shrikant",
    notes: "Social media captions + customer email templates.",
  },
  {
    time: "0:35",
    duration: "7 min",
    segment: "Try-on #2 — the iteration lesson",
    speaker: "tryon",
    speakerLabel: "Hands-on",
    notes: "Same prompt, three iterations. Watch it improve. Introduce Role + Task + Format.",
    tryOnStep: 2,
  },
  {
    time: "0:42",
    duration: "5 min",
    segment: "The 85/15 principle — Rik frames, Shrikant extends",
    speaker: "both",
    speakerLabel: "Both",
    notes: "AI does 85% of the lifting. Your irreplaceable 15% = context, judgment, relationships.",
  },
  {
    time: "0:47",
    duration: "6 min",
    segment: "Try-on #3 — freeform, both speakers in the room",
    speaker: "tryon",
    speakerLabel: "Hands-on",
    notes: "Attendees pick any prompt. Use the Q&A tab on /hub to ask questions.",
    tryOnStep: 3,
  },
  {
    time: "0:53",
    duration: "7 min",
    segment: "Q&A + one habit + joint close",
    speaker: "both",
    speakerLabel: "Both",
    notes: "One habit to leave with: 'Use AI for the next task that bores you.'",
  },
];

export default function SchedulePage() {
  return (
    <>
      <SiteNav />

      <div className="schedule-page-header">
        <div className="schedule-inner">
          <div className="event-tag">
            <span className="dot" />
            LEAP Collective 2026 · India Society of Worcester
          </div>
          <h1 className="schedule-title">AI Workshop — 60-Minute Run of Show</h1>
          <p className="schedule-subtitle">
            A practical, interactive workshop on AI for career growth and entrepreneurship
          </p>
          <div className="meta-row">
            <span className="meta-item">📅 May 2, 2026</span>
            <span className="meta-item">⏱ 60 minutes</span>
            <span className="meta-item">📍 India Center, 152 Main St, Shrewsbury MA</span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="schedule-legend">
        <div className="schedule-inner schedule-legend-inner">
          {[
            { cls: "rik", label: "Rik" },
            { cls: "sri", label: "Shrikant" },
            { cls: "both", label: "Both" },
            { cls: "tryon", label: "Hands-on" },
          ].map(({ cls, label }) => (
            <div key={cls} className="legend-item">
              <span className={`legend-dot legend-${cls}`} />
              {label}
            </div>
          ))}
        </div>
      </div>

      <main className="schedule-main">
        <div className="schedule-inner">
          <div className="schedule-list">
            {SCHEDULE.map((item, i) => (
              <div key={i} className={`schedule-row speaker-${item.speaker}`}>
                <div className="schedule-time-col">
                  <span className="schedule-time">{item.time}</span>
                  <span className="schedule-duration">{item.duration}</span>
                </div>
                <div className={`schedule-dot-col`}>
                  <div className={`schedule-dot dot-${item.speaker}`} />
                  {i < SCHEDULE.length - 1 && <div className="schedule-line" />}
                </div>
                <div className="schedule-content">
                  <div className="schedule-content-header">
                    <span className={`schedule-speaker-badge badge-${item.speaker}`}>
                      {item.speakerLabel}
                    </span>
                    {item.tryOnStep && (
                      <span className="try-on-badge">Try-on #{item.tryOnStep}</span>
                    )}
                  </div>
                  <h3 className="schedule-segment">{item.segment}</h3>
                  <p className="schedule-notes">{item.notes}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Time breakdown */}
          <div className="breakdown-box">
            <h3 className="breakdown-title">Time Breakdown</h3>
            <div className="breakdown-grid">
              {[
                { cls: "rik", label: "Rik", pct: "28%", mins: "17 min" },
                { cls: "sri", label: "Shrikant", pct: "28%", mins: "17 min" },
                { cls: "both", label: "Both together", pct: "17%", mins: "10 min" },
                { cls: "tryon", label: "Audience try-ons", pct: "35%", mins: "21 min" },
              ].map(({ cls, label, pct, mins }) => (
                <div key={cls} className="breakdown-item">
                  <div className="breakdown-item-header">
                    <span className={`legend-dot legend-${cls}`} />
                    <span className="breakdown-label">{label}</span>
                  </div>
                  <div className="breakdown-bar-track">
                    <div className={`breakdown-bar-fill breakdown-fill-${cls}`} style={{ width: pct }} />
                  </div>
                  <span className="breakdown-mins">{mins} ({pct})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <style>{`
        .schedule-page-header {
          background: #fff;
          border-bottom: 1px solid var(--border);
          padding: 2.5rem 1.5rem 2rem;
        }
        .schedule-inner { max-width: 820px; margin: 0 auto; }
        .event-tag {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: var(--blue-bg); border: 1px solid var(--blue-bd);
          border-radius: 100px; padding: 0.3rem 0.875rem;
          font-size: 0.75rem; font-weight: 600; color: var(--blue);
          margin-bottom: 1rem; letter-spacing: 0.03em;
        }
        .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--blue); }
        .schedule-title {
          font-family: 'Sora', sans-serif;
          font-size: clamp(1.5rem, 4vw, 2.25rem);
          font-weight: 800; color: var(--ink);
          margin: 0 0 0.5rem; letter-spacing: -0.02em;
        }
        .schedule-subtitle { font-size: 1rem; color: var(--muted); margin: 0 0 1.25rem; }
        .meta-row { display: flex; gap: 1.5rem; flex-wrap: wrap; }
        .meta-item { font-size: 0.8375rem; color: var(--muted); font-weight: 500; }

        /* Legend */
        .schedule-legend {
          background: var(--paper);
          border-bottom: 1px solid var(--border);
          padding: 0.75rem 1.5rem;
        }
        .schedule-legend-inner { display: flex; gap: 1.5rem; flex-wrap: wrap; align-items: center; }
        .legend-item {
          display: flex; align-items: center; gap: 0.375rem;
          font-size: 0.8125rem; font-weight: 500; color: var(--muted);
        }
        .legend-dot {
          width: 10px; height: 10px; border-radius: 50%;
        }
        .legend-rik   { background: var(--rik); }
        .legend-sri   { background: var(--sri); }
        .legend-both  { background: var(--both); }
        .legend-tryon { background: var(--tryon); }

        /* Main */
        .schedule-main { padding: 2.5rem 1.5rem 5rem; }
        .schedule-list { display: flex; flex-direction: column; gap: 0; margin-bottom: 3rem; }

        /* Row */
        .schedule-row {
          display: grid;
          grid-template-columns: 5rem 2rem 1fr;
          gap: 0 1rem;
        }
        .schedule-time-col {
          text-align: right;
          padding-top: 0.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.125rem;
        }
        .schedule-time {
          font-family: var(--mono);
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--ink);
        }
        .schedule-duration {
          font-size: 0.75rem;
          color: var(--hint);
        }
        .schedule-dot-col {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .schedule-dot {
          width: 14px; height: 14px;
          border-radius: 50%;
          border: 2px solid #fff;
          box-shadow: 0 0 0 2px;
          flex-shrink: 0;
          margin-top: 0.3125rem;
        }
        .dot-rik   { background: var(--rik);   box-shadow: 0 0 0 2px var(--rik); }
        .dot-sri   { background: var(--sri);   box-shadow: 0 0 0 2px var(--sri); }
        .dot-both  { background: var(--both);  box-shadow: 0 0 0 2px var(--both); }
        .dot-tryon { background: var(--tryon); box-shadow: 0 0 0 2px var(--tryon); }
        .schedule-line {
          width: 2px; flex: 1;
          background: var(--border);
          margin: 4px 0 0;
          min-height: 1.5rem;
        }
        .schedule-content {
          padding-bottom: 2rem;
        }
        .schedule-content-header {
          display: flex;
          gap: 0.5rem;
          align-items: center;
          margin-bottom: 0.375rem;
        }
        .schedule-speaker-badge {
          font-size: 0.6875rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 0.125rem 0.5rem;
          border-radius: 100px;
        }
        .badge-rik   { background: var(--rik-bg);   color: var(--rik);   border: 1px solid var(--rik-border); }
        .badge-sri   { background: var(--sri-bg);   color: var(--sri);   border: 1px solid var(--sri-border); }
        .badge-both  { background: var(--both-bg);  color: var(--both);  border: 1px solid var(--both-border); }
        .badge-tryon { background: var(--tryon-bg); color: var(--tryon); border: 1px solid var(--tryon-border); }
        .try-on-badge {
          font-size: 0.6875rem;
          font-weight: 600;
          color: var(--tryon);
          background: var(--tryon-bg);
          border: 1px solid var(--tryon-border);
          padding: 0.125rem 0.5rem;
          border-radius: 100px;
        }
        .schedule-segment {
          font-family: 'Sora', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          color: var(--ink);
          margin: 0 0 0.375rem;
        }
        .schedule-notes { font-size: 0.875rem; color: var(--muted); margin: 0; line-height: 1.5; }

        /* Breakdown */
        .breakdown-box {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.5rem;
        }
        .breakdown-title {
          font-family: 'Sora', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          color: var(--ink);
          margin: 0 0 1.25rem;
        }
        .breakdown-grid { display: flex; flex-direction: column; gap: 1rem; }
        .breakdown-item {}
        .breakdown-item-header {
          display: flex; align-items: center; gap: 0.5rem;
          margin-bottom: 0.375rem;
        }
        .breakdown-label { font-size: 0.875rem; font-weight: 500; color: var(--ink); }
        .breakdown-bar-track { height: 8px; background: var(--paper); border-radius: 4px; margin-bottom: 0.25rem; }
        .breakdown-bar-fill { height: 8px; border-radius: 4px; transition: width 0.6s ease; }
        .breakdown-fill-rik   { background: var(--rik); }
        .breakdown-fill-sri   { background: var(--sri); }
        .breakdown-fill-both  { background: var(--both); }
        .breakdown-fill-tryon { background: var(--tryon); }
        .breakdown-mins { font-size: 0.8rem; color: var(--muted); font-family: var(--mono); }
      `}</style>
    </>
  );
}
