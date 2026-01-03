import { ChapterDetail } from "@/common/interface"
import { cn } from "@/common/libs/utils"
import { Link } from "@tanstack/react-router"
import { useEffect, useState } from "react"

type Props = {
  chapter?: ChapterDetail
  comicId: string
}

export default function ChapterNavigation({ chapter, comicId }: Props) {
  const [show, setShow] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // scroll ke atas → tampil
      if (currentScrollY < lastScrollY) {
        setShow(true)
      }
      // scroll ke bawah → sembunyi
      else if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShow(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  if (!chapter) return null

  const hasPrev =
    chapter.prev_chapter_id !== null &&
    chapter.prev_chapter_number !== null

  const hasNext =
    chapter.next_chapter_id !== null &&
    chapter.next_chapter_number !== null

  return (
    <div
      className={cn(
        "sticky top-0 z-50 transition-transform duration-300",
        show ? "translate-y-0" : "-translate-y-full"
      )}
    >
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
    </div>
  )
}