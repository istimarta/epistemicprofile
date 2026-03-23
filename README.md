# Epistemic Profile

A 16-question assessment that maps the structure of your epistemic commitments, powered by Claude for AI-generated analysis.

## Architecture

```
app/
├── api/claude/route.js   ← Backend: proxies to Anthropic API (key stays server-side)
├── layout.js             ← Root layout with metadata + fonts
├── page.js               ← Main app (intro → test → loading → result)
├── globals.css           ← Tailwind + Google Fonts import
components/
├── QuestionCard.jsx      ← Single question with Likert options
├── ScoreBar.jsx          ← Dimension score visualization bar
├── ProfileDisplay.jsx    ← Renders AI-generated profile sections
lib/
├── questions.js          ← 16 questions, Likert config, scoring algorithm
├── prompt.js             ← Claude system prompt + user message builder
├── parse-profile.js      ← Markdown → structured sections parser
```

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Add your API key

Create `.env.local` in the project root:

```
ANTHROPIC_API_KEY=sk-ant-xxxxx-your-key-here
```

Get a key from [console.anthropic.com](https://console.anthropic.com/).

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

### One-click

1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new), import the repo
3. Add `ANTHROPIC_API_KEY` as an environment variable in the Vercel dashboard
4. Deploy

### CLI

```bash
npx vercel --prod
```

Set the environment variable first:

```bash
npx vercel env add ANTHROPIC_API_KEY
```

## How scoring works

Each of the 16 questions maps to one of four dimensions. Answers (1–5 Likert scale) are centered, direction-adjusted, and scaled to produce a score from **-10 to +10** per dimension:

| Dimension | Negative pole | Positive pole |
|-----------|---------------|---------------|
| Empiricism ↔ Rationalism | Empiricist | Rationalist |
| Skepticism ↔ Dogmatism | Skeptic | Dogmatist |
| Objectivism ↔ Relativism | Objectivist | Relativist |
| Authority ↔ Autonomy | Deferent | Autonomous |

The four scores are sent to Claude, which generates a tailored epistemological profile with archetype name, strengths, blind spots, failure modes, and a philosophical parallel.

## Tech stack

- **Next.js 14** (App Router)
- **Tailwind CSS**
- **Claude API** (claude-sonnet-4-20250514)

## License

MIT
