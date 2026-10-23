import { ChapterDetail } from "@/common/interface";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
    <div className="border-y border-[#27272e] bg-[#0c0c10]">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-3 font-mono text-xs uppercase tabular-nums">
        {/* PREV */}
        {hasPrev ? (
          <Link
            to="/read/$comicId/$chapterId"
            params={{
              comicId,
              chapterId: chapter.prev_chapter_id!,
            }}
            className="inline-flex min-h-10 items-center gap-1.5 border border-[#27272e] bg-[#141418] px-4 py-2 font-bold text-[#f4f1ea] transition-colors hover:border-[#f4f1ea]"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            <span>CH. {chapter.prev_chapter_number}</span>
          </Link>
        ) : (
          <span className="inline-flex min-h-10 items-center border border-[#27272e] bg-[#101014] px-4 py-2 text-[#c8c2b6]/50">
            CH. AWAL
          </span>
        )}

        {/* TITLE */}
        <div className="text-center">
          <p className="text-xs tracking-widest text-[#c8c2b6]">EDISI BACA</p>
          <p className="text-sm font-bold text-[#f4f1ea]">
            CHAPTER {chapter.chapter_number}
          </p>
        </div>

        {/* NEXT */}
        {hasNext ? (
          <Link
            to="/read/$comicId/$chapterId"
            params={{
              comicId,
              chapterId: chapter.next_chapter_id!,
            }}
            className="inline-flex min-h-10 items-center gap-1.5 bg-[#be123c] px-4 py-2 font-bold text-[#f4f1ea] transition-colors hover:bg-[#9f1239]"
          >
            <span>CH. {chapter.next_chapter_number}</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        ) : (
          <span className="inline-flex min-h-10 items-center border border-[#27272e] bg-[#101014] px-4 py-2 text-[#c8c2b6]/50">
            CH. TERBARU
          </span>
        )}
      </div>
    </div>
  );
}

const ChapterNavigation = memo(ChapterNavigationComponent);
export default ChapterNavigation;
