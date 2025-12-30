import { ChapterDetail } from "@/common/interface";
import { Link } from "@tanstack/react-router";

export default function ChapterNavigation({ chapter }: { chapter: ChapterDetail }) {
  return (
    <div className="sticky top-0 z-10 bg-black/80 backdrop-blur border-b border-white/10">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* PREV */}
        {chapter.prev_chapter_id ? (
          <Link
            to="/read/$chapterId"
            params={{ chapterId: chapter.prev_chapter_id }}
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
        {chapter.next_chapter_id ? (
          <Link
            to="/read/$chapterId"
            params={{ chapterId: chapter.next_chapter_id }}
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
  )
}
