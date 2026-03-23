"use client";

import { useState } from "react";
import { QUESTIONS, calculateScores } from "../lib/questions";
import QuestionCard from "../components/QuestionCard";
import ProfileDisplay from "../components/ProfileDisplay";

export default function Home() {
  const [answers, setAnswers] = useState({});
  const [phase, setPhase] = useState("intro"); // intro | test | loading | result
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState(null);
  const [profile, setProfile] = useState("");
  const [error, setError] = useState(null);

  const answered = Object.keys(answers).length;
  const progress = (answered / QUESTIONS.length) * 100;
  const allAnswered = answered === QUESTIONS.length;
  const q = QUESTIONS[currentQ];

  function handleAnswer(qId, value) {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
    if (currentQ < QUESTIONS.length - 1) {
      setTimeout(() => setCurrentQ((c) => c + 1), 250);
    }
  }

  async function handleSubmit() {
    const s = calculateScores(answers);
    setScores(s);
    setPhase("loading");
    setError(null);

    try {
      const response = await fetch("/api/claude", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scores: s }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Server error ${response.status}`);
      }

      const data = await response.json();
      setProfile(data.text);
      setPhase("result");
    } catch (err) {
      setError(err.message);
      setPhase("test");
    }
  }

  function reset() {
    setAnswers({});
    setCurrentQ(0);
    setPhase("intro");
    setProfile("");
    setScores(null);
    setError(null);
  }

  return (
    <main className="min-h-screen py-10 px-5 font-body">
      <div className="max-w-[640px] mx-auto">

        {/* ══════════════════ INTRO ══════════════════ */}
        {phase === "intro" && (
          <div className="text-center pt-[12vh] animate-fade-up">
            <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-ink-muted dark:text-ink-muted-dark mb-4">
              Epistemological Profile
            </div>
            <h1 className="font-display text-[38px] font-bold leading-tight mb-6 text-ink dark:text-ink-dark">
              How Do You<br />Know What You Know?
            </h1>
            <p className="text-base leading-relaxed text-ink-secondary dark:text-ink-secondary-dark max-w-[440px] mx-auto mb-10">
              Sixteen questions to map the structure of your epistemic commitments—how
              you form beliefs, weigh evidence, and navigate uncertainty.
            </p>
            <button
              onClick={() => setPhase("test")}
              className="
                font-mono text-[13px] tracking-wider uppercase
                px-10 py-3.5 rounded-md
                bg-accent dark:bg-accent-green-light
                text-white dark:text-surface-dark
                hover:bg-accent-light dark:hover:bg-accent-green
                transition-colors duration-200
                cursor-pointer
              "
            >
              Begin Assessment
            </button>
          </div>
        )}

        {/* ══════════════════ TEST ══════════════════ */}
        {phase === "test" && (
          <div className="animate-fade-up-fast">
            {/* Progress bar */}
            <div className="mb-12">
              <div className="flex justify-between items-baseline mb-2.5">
                <span className="font-mono text-[11px] tracking-wider uppercase text-ink-muted dark:text-ink-muted-dark">
                  Progress
                </span>
                <span className="font-mono text-xs text-ink-secondary dark:text-ink-secondary-dark">
                  {answered} / {QUESTIONS.length}
                </span>
              </div>
              <div className="h-[3px] bg-track dark:bg-track-dark rounded-sm overflow-hidden">
                <div
                  className="h-full bg-accent dark:bg-accent-green-light rounded-sm transition-all duration-400 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Question nav dots */}
            <div className="flex gap-1.5 flex-wrap mb-8">
              {QUESTIONS.map((qq, i) => (
                <button
                  key={qq.id}
                  onClick={() => setCurrentQ(i)}
                  className={`
                    w-8 h-8 rounded text-[11px] font-mono transition-all duration-150 cursor-pointer
                    ${i === currentQ ? "ring-2 ring-accent dark:ring-accent-green-light" : ""}
                    ${
                      answers[qq.id] !== undefined
                        ? "bg-accent dark:bg-accent-green-light text-white dark:text-surface-dark border-transparent"
                        : "bg-transparent text-ink-muted dark:text-ink-muted-dark border border-line dark:border-line-dark"
                    }
                  `}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            {/* Current question */}
            <QuestionCard
              question={q}
              index={currentQ}
              answer={answers[q.id]}
              onAnswer={handleAnswer}
            />

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <button
                onClick={() => setCurrentQ((c) => Math.max(0, c - 1))}
                disabled={currentQ === 0}
                className="
                  font-mono text-xs px-5 py-2.5 rounded border border-line dark:border-line-dark
                  bg-transparent text-ink-secondary dark:text-ink-secondary-dark
                  disabled:opacity-40 disabled:cursor-default
                  cursor-pointer transition-opacity
                "
              >
                ← Back
              </button>

              {currentQ < QUESTIONS.length - 1 ? (
                <button
                  onClick={() => setCurrentQ((c) => c + 1)}
                  className="
                    font-mono text-xs px-5 py-2.5 rounded border border-line dark:border-line-dark
                    bg-transparent text-ink-secondary dark:text-ink-secondary-dark
                    cursor-pointer hover:bg-track dark:hover:bg-track-dark transition-colors
                  "
                >
                  Next →
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!allAnswered}
                  className={`
                    font-mono text-[13px] tracking-wider uppercase px-7 py-3 rounded
                    transition-all duration-200
                    ${
                      allAnswered
                        ? "bg-accent dark:bg-accent-green-light text-white dark:text-surface-dark cursor-pointer hover:bg-accent-light"
                        : "bg-track dark:bg-track-dark text-ink-muted dark:text-ink-muted-dark cursor-default"
                    }
                  `}
                >
                  Generate Profile
                </button>
              )}
            </div>

            {/* Error display */}
            {error && (
              <div className="mt-5 p-3 bg-accent-red/10 border border-accent-red/25 rounded-md font-mono text-xs text-accent-red">
                {error}
              </div>
            )}
          </div>
        )}

        {/* ══════════════════ LOADING ══════════════════ */}
        {phase === "loading" && (
          <div className="text-center pt-[20vh] animate-fade-up">
            <div className="w-8 h-8 border-2 border-line dark:border-line-dark border-t-accent dark:border-t-accent-green-light rounded-full animate-spin mx-auto mb-6" />
            <div className="font-mono text-xs tracking-wider uppercase text-ink-muted dark:text-ink-muted-dark animate-pulse-slow">
              Constructing your epistemic profile
            </div>
            <div className="font-body text-sm text-ink-secondary dark:text-ink-secondary-dark mt-3 opacity-70">
              Analyzing dimension interplay…
            </div>
          </div>
        )}

        {/* ══════════════════ RESULT ══════════════════ */}
        {phase === "result" && scores && (
          <div>
            <ProfileDisplay scores={scores} profile={profile} />
            <div className="text-center mt-12 pb-10">
              <button
                onClick={reset}
                className="
                  font-mono text-xs tracking-wider uppercase
                  px-7 py-3 rounded border border-line dark:border-line-dark
                  bg-transparent text-ink-secondary dark:text-ink-secondary-dark
                  cursor-pointer hover:bg-track dark:hover:bg-track-dark transition-colors
                "
              >
                Retake Assessment
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
