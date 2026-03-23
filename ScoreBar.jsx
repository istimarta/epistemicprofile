"use client";

export default function ScoreBar({ label, negLabel, posLabel, value }) {
  const pct = ((value + 10) / 20) * 100;
  const isNeg = value < -0.5;
  const isPos = value > 0.5;

  return (
    <div className="mb-7">
      {/* Labels row */}
      <div className="flex justify-between mb-1.5 font-mono text-[11px] tracking-wider uppercase">
        <span className={isNeg ? "text-accent-red" : "text-ink-muted dark:text-ink-muted-dark"}>
          {negLabel}
        </span>
        <span className="text-ink dark:text-ink-dark font-semibold text-[13px]">
          {label}
        </span>
        <span className={isPos ? "text-accent-green" : "text-ink-muted dark:text-ink-muted-dark"}>
          {posLabel}
        </span>
      </div>

      {/* Track */}
      <div className="relative h-2.5 bg-track dark:bg-track-dark rounded-full overflow-hidden">
        {/* Center line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-line dark:bg-line-dark" />

        {/* Fill bar */}
        {value !== 0 && (
          <div
            className="absolute top-[2px] bottom-[2px] rounded transition-all duration-700 ease-out"
            style={{
              left: value >= 0 ? "50%" : `${pct}%`,
              width: value >= 0 ? `${pct - 50}%` : `${50 - pct}%`,
              background:
                value >= 0
                  ? "linear-gradient(90deg, #4e8a6e, #6db88a)"
                  : "linear-gradient(90deg, #c45d3e, #d4785f)",
            }}
          />
        )}
      </div>

      {/* Numeric value */}
      <div className="text-center mt-1.5 font-mono text-[13px] text-ink dark:text-ink-dark font-semibold">
        {value > 0 ? "+" : ""}
        {value}
      </div>
    </div>
  );
}
