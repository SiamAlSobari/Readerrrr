import { ChapterDetail } from "@/common/interface";
import { Link } from "@tanstack/react-router";
import { memo } from "react";

type Props = {
  chapter?: ChapterDetail;
  comicId: string;
};

function ChapterNavigationComponent({ chapter, comicId }: Props) {
  if (!chapter) {
    return null;
  }

  const hasPrev =
    chapter.prev_chapter_id !== null &&
    chapter.prev_chapter_number !== null;

  const hasNext =
    chapter.next_chapter_id !== null &&
    chapter.next_chapter_number !== null;

  return (
    <div className="bg-black/80 backdrop-blur border-b border-white/10">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* PREV */}
        {hasPrev ? (
          <Link
            to="/read/$comicId/$chapterId"
            params={{
              comicId,
              chapterId: chapter.prev_chapter_id!,
            }}
            className="px-4 py-2 text-sm bg-white/10 hover:bg-white/20 rounded transition"
          >
            ← Ch. {chapter.prev_chapter_number}
          </Link>
        ) : (
          <span className="px-4 py-2 text-sm text-white/30">
            First Chapter
          </span>
        )}

        {/* TITLE */}
        <div className="text-center">
          <p className="text-xs text-white/60">Chapter</p>
          <p className="font-semibold">{chapter.chapter_number}</p>
        </div>

        {/* NEXT */}
        {hasNext ? (
          <Link
            to="/read/$comicId/$chapterId"
            params={{
              comicId,
              chapterId: chapter.next_chapter_id!,
            }}
            className="px-4 py-2 text-sm bg-white/10 hover:bg-white/20 rounded transition"
          >
            Ch. {chapter.next_chapter_number} →
          </Link>
        ) : (
          <span className="px-4 py-2 text-sm text-white/30">
            Latest Chapter
          </span>
        )}
      </div>
    </div>
  );
}

const ChapterNavigation = memo(ChapterNavigationComponent);
export default ChapterNavigation;
