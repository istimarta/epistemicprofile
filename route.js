import { SYSTEM_PROMPT, buildUserMessage } from "../../../lib/prompt";

export async function POST(request) {
  // ── Validate API key exists ──
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "ANTHROPIC_API_KEY is not configured on the server." },
      { status: 500 }
    );
  }

  // ── Parse and validate request body ──
  let scores;
  try {
    const body = await request.json();
    scores = body.scores;

    if (
      !scores ||
      typeof scores.empiricism !== "number" ||
      typeof scores.skepticism !== "number" ||
      typeof scores.objectivism !== "number" ||
      typeof scores.autonomy !== "number"
    ) {
      return Response.json(
        { error: "Invalid scores. Expected { empiricism, skepticism, objectivism, autonomy } as numbers." },
        { status: 400 }
      );
    }

    // Clamp to valid range
    for (const key of ["empiricism", "skepticism", "objectivism", "autonomy"]) {
      scores[key] = Math.max(-10, Math.min(10, scores[key]));
    }
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  // ── Call Claude API ──
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 2048,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: "user",
            content: buildUserMessage(scores),
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Claude API error:", response.status, errorBody);
      return Response.json(
        { error: `Claude API returned ${response.status}` },
        { status: 502 }
      );
    }

    const data = await response.json();

    const text =
      data.content
        ?.filter((block) => block.type === "text")
        .map((block) => block.text)
        .join("\n") || "No response generated.";

    return Response.json({ text });
  } catch (err) {
    console.error("Server error:", err);
    return Response.json(
      { error: "Failed to generate profile. Please try again." },
      { status: 500 }
    );
  }
}
