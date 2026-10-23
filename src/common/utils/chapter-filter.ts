export function filterAndRankChapters<T extends { chapter_number: number }>(
  chapters: T[],
  query: string,
  sortAsc: boolean = false
): T[] {
  const trimmed = query.trim();
  if (!trimmed) {
    const list = [...chapters];
    return sortAsc
      ? list.sort((a, b) => a.chapter_number - b.chapter_number)
      : list.sort((a, b) => b.chapter_number - a.chapter_number);
  }

  // Remove "ch", "chapter", "#", and whitespace
  const clean = trimmed.toLowerCase().replace(/^(ch(apter)?\.?\s*|#)/i, "").trim();
  const targetNum = Number(clean);
  const isNumeric = !isNaN(targetNum) && clean !== "";

  type ScoredItem = {
    chapter: T;
    score: number;
    diff: number;
  };

  const scored: ScoredItem[] = [];

  for (const ch of chapters) {
    const num = ch.chapter_number;
    const numStr = String(num);

    if (isNumeric) {
      if (num === targetNum) {
        // 1. Exact match (e.g. user typed 1 -> Chapter 1)
        scored.push({ chapter: ch, score: 100, diff: 0 });
      } else if (numStr.startsWith(`${clean}.`)) {
        // 2. Decimal chapter (e.g. user typed 1 -> Chapter 1.1, 1.5)
        scored.push({ chapter: ch, score: 80, diff: Math.abs(num - targetNum) });
      } else if (numStr.startsWith(clean)) {
        // 3. Prefix match (e.g. user typed 1 -> Chapter 10, 11, 100)
        scored.push({ chapter: ch, score: 50, diff: Math.abs(num - targetNum) });
      }
      // Numbers like 91, 81, 71, 21 that merely contain '1' as a suffix are excluded!
    } else {
      // Non-numeric search (e.g. "prolog", "extra")
      const title =
        (ch as any).chapter_title?.toLowerCase() ||
        (ch as any).comic_title?.toLowerCase() ||
        "";
      const fullText = `ch ${num} chapter ${num} ${title}`.toLowerCase();
      if (fullText.includes(trimmed.toLowerCase())) {
        scored.push({ chapter: ch, score: 50, diff: 0 });
      }
    }
  }

  // Sort by score descending (exact match first), then by closest number (smallest diff)
  scored.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return a.diff - b.diff;
  });

  return scored.map((s) => s.chapter);
}
