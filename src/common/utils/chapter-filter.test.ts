import { describe, expect, it } from "vitest";
import { filterAndRankChapters } from "./chapter-filter";

describe("filterAndRankChapters", () => {
  it("does not throw 'is not iterable' when chapters is null or undefined (e.g. page > total_page from API)", () => {
    expect(() =>
      filterAndRankChapters(null as unknown as { chapter_number: number }[], "", false)
    ).not.toThrow();
    expect(
      filterAndRankChapters(null as unknown as { chapter_number: number }[], "", false)
    ).toEqual([]);
    expect(
      filterAndRankChapters(undefined as unknown as { chapter_number: number }[], "1", true)
    ).toEqual([]);
  });

  it("sorts chapters descending by default and ascending when sortAsc is true", () => {
    const items = [
      { chapter_number: 133 },
      { chapter_number: 209 },
      { chapter_number: 150 },
    ];
    expect(filterAndRankChapters(items, "", false).map((c) => c.chapter_number)).toEqual([
      209, 150, 133,
    ]);
    expect(filterAndRankChapters(items, "", true).map((c) => c.chapter_number)).toEqual([
      133, 150, 209,
    ]);
  });

  it("ranks exact numeric match before prefix matches", () => {
    const items = [
      { chapter_number: 100 },
      { chapter_number: 10 },
      { chapter_number: 1 },
      { chapter_number: 1.5 },
      { chapter_number: 21 },
    ];
    expect(filterAndRankChapters(items, "1", false).map((c) => c.chapter_number)).toEqual([
      1, 1.5, 10, 100,
    ]);
  });
});
