// 16 questions — 4 per epistemic dimension
// dir: +1 means agreement pushes toward the positive pole
// dir: -1 means agreement pushes toward the negative pole

export const QUESTIONS = [
  // ── Empiricism (−) ↔ Rationalism (+) ──
  {
    id: 1,
    dim: "empiricism",
    dir: 1,
    text: "I trust logical reasoning more than direct observation when they conflict.",
  },
  {
    id: 2,
    dim: "empiricism",
    dir: -1,
    text: "I need to see concrete evidence before I accept a claim.",
  },
  {
    id: 3,
    dim: "empiricism",
    dir: 1,
    text: "The most reliable truths are those derived from first principles, not experiments.",
  },
  {
    id: 4,
    dim: "empiricism",
    dir: -1,
    text: "Personal experience is the most trustworthy source of knowledge.",
  },

  // ── Skepticism (−) ↔ Dogmatism (+) ──
  {
    id: 5,
    dim: "skepticism",
    dir: -1,
    text: "I habitually question assumptions that others take for granted.",
  },
  {
    id: 6,
    dim: "skepticism",
    dir: 1,
    text: "Some foundational truths should not be subjected to constant re-examination.",
  },
  {
    id: 7,
    dim: "skepticism",
    dir: -1,
    text: "I find it difficult to hold any belief with absolute certainty.",
  },
  {
    id: 8,
    dim: "skepticism",
    dir: 1,
    text: "Excessive doubt is more dangerous than occasional error.",
  },

  // ── Objectivism (−) ↔ Relativism (+) ──
  {
    id: 9,
    dim: "objectivism",
    dir: -1,
    text: "There is a single correct answer to most important questions.",
  },
  {
    id: 10,
    dim: "objectivism",
    dir: 1,
    text: "What counts as 'knowledge' depends heavily on cultural context.",
  },
  {
    id: 11,
    dim: "objectivism",
    dir: -1,
    text: "Objective truth exists independently of anyone's perspective.",
  },
  {
    id: 12,
    dim: "objectivism",
    dir: 1,
    text: "Two contradictory frameworks can both be valid within their own domains.",
  },

  // ── Authority (−) ↔ Autonomy (+) ──
  {
    id: 13,
    dim: "autonomy",
    dir: -1,
    text: "I defer to expert consensus even when my intuition disagrees.",
  },
  {
    id: 14,
    dim: "autonomy",
    dir: 1,
    text: "I prefer to work through problems myself rather than accept received answers.",
  },
  {
    id: 15,
    dim: "autonomy",
    dir: -1,
    text: "Established institutions are generally reliable sources of knowledge.",
  },
  {
    id: 16,
    dim: "autonomy",
    dir: 1,
    text: "Intellectual independence matters more than alignment with authorities.",
  },
];

export const LIKERT = [
  { value: 1, label: "Strongly disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly agree" },
];

/**
 * Calculate the four epistemic dimension scores from answers.
 * Each dimension gets a score from -10 to +10.
 *
 * @param {Record<number, number>} answers - Map of question ID → Likert value (1-5)
 * @returns {{ empiricism: number, skepticism: number, objectivism: number, autonomy: number }}
 */
export function calculateScores(answers) {
  const buckets = {
    empiricism: [],
    skepticism: [],
    objectivism: [],
    autonomy: [],
  };

  for (const q of QUESTIONS) {
    const raw = answers[q.id];
    if (raw === undefined) continue;

    // Center at 0 (range becomes -2 to +2), then apply direction
    const centered = (raw - 3) * q.dir;
    // Scale to -10..+10 range
    const scaled = centered * 5;
    buckets[q.dim].push(scaled);
  }

  const scores = {};
  for (const [dim, values] of Object.entries(buckets)) {
    if (values.length === 0) {
      scores[dim] = 0;
    } else {
      const avg = values.reduce((a, b) => a + b, 0) / values.length;
      scores[dim] = Math.round(avg * 10) / 10;
    }
  }

  return scores;
}
