"use client";

import ScoreBar from "./ScoreBar";
import { parseProfile } from "../lib/parse-profile";

export default function ProfileDisplay({ scores, profile }) {
  const sections = parseProfile(profile);

  return (
    <div className="animate-fade-up">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-ink-muted dark:text-ink-muted-dark mb-2">
          Your Epistemic Profile
        </div>
      </div>

      {/* Score bars */}
      <div className="max-w-[520px] mx-auto mb-12">
        <ScoreBar
          label="Empiricism ↔ Rationalism"
          negLabel="Empiricist"
          posLabel="Rationalist"
          value={scores.empiricism}
        />
        <ScoreBar
          label="Skepticism ↔ Dogmatism"
          negLabel="Skeptic"
          posLabel="Dogmatist"
          value={scores.skepticism}
        />
        <ScoreBar
          label="Objectivism ↔ Relativism"
          negLabel="Objectivist"
          posLabel="Relativist"
          value={scores.objectivism}
        />
        <ScoreBar
          label="Authority ↔ Autonomy"
          negLabel="Deferent"
          posLabel="Autonomous"
          value={scores.autonomy}
        />
      </div>

      {/* Profile text */}
      <div className="border-t border-line dark:border-line-dark pt-10">
        {sections.map((sec, i) => (
          <div
            key={i}
            className="mb-9 animate-fade-up"
            style={{ animationDelay: `${0.1 * i}s`, animationFillMode: "both" }}
          >
            <h3
              className={
                sec.isTitle
                  ? "font-display text-[28px] font-bold text-ink dark:text-ink-dark mb-1.5 text-center tracking-tight"
                  : "font-display text-lg font-semibold text-ink dark:text-ink-dark mb-3"
              }
            >
              {sec.heading}
            </h3>
            {sec.body && (
              <div className="font-body text-[15.5px] leading-[1.72] text-ink-secondary dark:text-ink-secondary-dark whitespace-pre-wrap">
                {sec.body}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
