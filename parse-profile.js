/**
 * Parse Claude's markdown profile output into structured sections.
 *
 * @param {string} text - Raw markdown from Claude
 * @returns {Array<{ heading: string, body: string, isTitle: boolean }>}
 */
export function parseProfile(text) {
  const lines = text.split("\n");
  const sections = [];
  let current = null;

  for (const line of lines) {
    const headingMatch = line.match(/^#{1,4}\s+(.+)/);
    const boldMatch = line.match(/^\*\*(.+?)\*\*$/);

    if (headingMatch || boldMatch) {
      const heading = (headingMatch?.[1] || boldMatch?.[1]).replace(/\*\*/g, "").trim();
      if (current) sections.push(current);

      // Detect the archetype name (usually short, no section keywords)
      const sectionKeywords = /CORE|DIMENSION|STRENGTH|BLIND|FAILURE|PHILO|EPISTEMIC|INTERPLAY|SPOT|MODE|PARALLEL/i;
      const isTitle = !sectionKeywords.test(heading) && heading.length < 50;

      current = { heading, body: "", isTitle };
    } else if (current) {
      const cleaned = line
        .replace(/^\*\*(.+?)\*\*:?/, "$1:")
        .replace(/\*\*/g, "");
      current.body += (current.body ? "\n" : "") + cleaned;
    }
  }

  if (current) sections.push(current);

  return sections
    .map((s) => ({ ...s, body: s.body.trim() }))
    .filter((s) => s.heading || s.body);
}
