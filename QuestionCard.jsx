"use client";

import { useEffect, useRef } from "react";
import { LIKERT } from "../lib/questions";

export default function QuestionCard({ question, index, answer, onAnswer }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.style.opacity = "0";
    ref.current.style.transform = "translateY(12px)";
    requestAnimationFrame(() => {
      if (!ref.current) return;
      ref.current.style.transition = "all 0.35s ease";
      ref.current.style.opacity = "1";
      ref.current.style.transform = "translateY(0)";
    });
  }, [question.id]);

  return (
    <div
      ref={ref}
      className="bg-surface-card dark:bg-surface-card-dark border border-line dark:border-line-dark rounded-xl p-8 shadow-sm mb-8"
    >
      <div className="font-mono text-[11px] tracking-wider uppercase text-ink-muted dark:text-ink-muted-dark mb-4">
        Question {index + 1}
      </div>

      <p className="font-display text-xl font-medium leading-relaxed text-ink dark:text-ink-dark mb-7">
        {question.text}
      </p>

      <div className="flex flex-col gap-2">
        {LIKERT.map((opt) => {
          const isSelected = answer === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => onAnswer(question.id, opt.value)}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-md text-left transition-all duration-150
                font-body text-[14.5px]
                ${
                  isSelected
                    ? "bg-accent dark:bg-accent-green-light text-white dark:text-surface-dark border-transparent"
                    : "bg-transparent text-ink-secondary dark:text-ink-secondary-dark border border-line dark:border-line-dark hover:bg-track dark:hover:bg-track-dark"
                }
              `}
            >
              <span
                className={`
                  w-[22px] h-[22px] rounded-full flex items-center justify-center flex-shrink-0 text-[11px] font-bold
                  ${
                    isSelected
                      ? "bg-white dark:bg-surface-dark text-accent dark:text-accent-green-light"
                      : "border-[1.5px] border-line dark:border-line-dark text-ink-muted dark:text-ink-muted-dark"
                  }
                `}
              >
                {isSelected ? "✓" : opt.value}
              </span>
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
