import { Eye } from "lucide-react"
import { Button } from "@/common/shadcn-ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/common/shadcn-ui/dialog"
import { formatDistanceToNow } from "date-fns"
import { id } from "date-fns/locale"
import { Meta } from "@/common/interface"
import { Link, useNavigate } from "@tanstack/react-router"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useServerFn } from "@tanstack/react-start"
import { getChapterList } from "@/api/servers/shinigami.server"
import { getLastReadChapter } from "@/common/utils/chapter-history"

interface Chapter {
  chapter_id: string
  chapter_number: number
  thumbnail_image_url: string
  release_date: string
  view_count: number
}

interface ChapterListProps {
  chapters: Chapter[]       // SSR data (main list)
  page?: number
  meta: Meta
  comicId: string
}

export function ChapterList({
  chapters,
  page = 1,
  meta,
  comicId,
}: ChapterListProps) {
  const navigate = useNavigate()
  const chapterList = useServerFn(getChapterList)

  // SSR
  const totalPages = meta.total_page

  function handlePageNext() {
    navigate({
      to: ".",
      search: (prev) => ({ page: (prev.page ?? 1) + 1 }),
    })
  }

  function handlePagePrev() {
    navigate({
      to: ".",
      search: (prev) => ({ page: Math.max((prev.page ?? 1) - 1, 1) }),
    })
  }

  // CSR
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["dialog-chapters", comicId],

    initialPageParam: 1,

    queryFn: ({ pageParam }) =>
      chapterList({
        data: {
          comicId,
          page: pageParam,
          pageSize: 50,
        },
      }),

    getNextPageParam: (lastPage) => {
      const meta = lastPage.data.meta
      return meta.page < meta.total_page
        ? meta.page + 1
        : undefined
    },

    enabled: false,
  })


  const dialogChapters =
    data?.pages.flatMap((p) => p.data.data) ?? []
  const lastRead = getLastReadChapter(comicId)
  console.log(lastRead)

  return (
    <section className="mx-auto mt-16 max-w-7xl px-4">
      <h2 className="mb-8 text-2xl font-bold text-white tracking-wide">
        Chapters
      </h2>

      {/* ===== MAIN SSR LIST ===== */}
      {lastRead && (
        <div
          className="
      mb-6
      rounded-xl
      border border-emerald-400/30
      bg-emerald-400/10
      p-4
      flex items-center justify-between
    "
        >
          <div>
            <p className="text-sm text-emerald-300 font-medium">
              Terakhir dibaca
            </p>
            <p className="text-white font-semibold">
              Chapter {lastRead.chapter_number}
            </p>
            <p className="text-xs text-emerald-200">
              {formatDistanceToNow(lastRead.last_read_time, {
                addSuffix: true,
                locale: id,
              })}
            </p>
          </div>

          <Button
            size="sm"
            className="bg-emerald-500 hover:bg-emerald-600 text-black"
            onClick={() =>
              navigate({
                to: "/read/$comicId/$chapterId",
                params: {
                  comicId,
                  chapterId: lastRead.chapter_id,
                },
              })
            }
          >
            Lanjutkan
          </Button>
        </div>
      )}

      <div className="space-y-3">
        {chapters.map((ch) => (
          <Link
            to="/read/$comicId/$chapterId"
            params={{ comicId, chapterId: ch.chapter_id }}
            key={ch.chapter_id}
            className="
        group
        flex flex-col sm:flex-row
        gap-4
        rounded-xl
        border border-white/10
        bg-white/5
        p-3 sm:p-4
        backdrop-blur
        transition
        hover:border-white/20
        hover:bg-white/10
        active:scale-[0.99]
      "
          >
            {/* THUMBNAIL */}
            <img
              src={ch.thumbnail_image_url}
              alt={`Chapter ${ch.chapter_number}`}
              className="
          h-40 sm:h-20
          w-full sm:w-32
          rounded-lg
          object-cover
          shrink-0
        "
            />

            {/* CONTENT */}
            <div className="flex flex-1 flex-col justify-between gap-2">
              <div>
                <p className="text-base sm:text-lg font-semibold text-white">
                  Chapter {ch.chapter_number}
                </p>

                <p className="text-xs sm:text-sm text-gray-400">
                  {new Date(ch.release_date).toLocaleDateString()} •{" "}
                  {formatDistanceToNow(new Date(ch.release_date), {
                    locale: id,
                    addSuffix: true,
                  })}
                </p>
              </div>

              {/* META (mobile-friendly) */}
              <div className="flex items-center gap-2 text-xs text-gray-300">
                <Eye className="h-4 w-4 text-gray-400" />
                <span>{ch.view_count.toLocaleString()} views</span>
              </div>
            </div>
          </Link>
        ))}
      </div>


      {/* ===== PAGINATION + DIALOG ===== */}
      <div className="mt-10 mb-10 flex items-center justify-center gap-4">
        <Button onClick={handlePagePrev} disabled={page === 1}>
          Prev
        </Button>

        {/* ===== DIALOG ===== */}
        <Dialog
          onOpenChange={(open) => {
            if (open) {
              // fetch pertama saat dialog dibuka
              fetchNextPage()
            }
          }}
        >
          <DialogTrigger asChild>
            <Button variant="outline">Lihat Chapter List</Button>
          </DialogTrigger>

          <DialogContent className="max-w-lg rounded-xl border p-6">
            <DialogHeader>
              <DialogTitle>All Chapters</DialogTitle>
            </DialogHeader>

            <div
              className="mt-4 max-h-96 space-y-2 overflow-y-auto"
              onScroll={(e) => {
                const el = e.currentTarget
                const isBottom =
                  el.scrollTop + el.clientHeight >=
                  el.scrollHeight - 20

                if (isBottom && hasNextPage && !isFetchingNextPage) {
                  fetchNextPage()
                }
              }}
            >
              {dialogChapters.map((ch) => (
                
                <div
                  key={ch.chapter_id}
                  className="flex justify-between rounded-md p-3 hover:bg-white/5"
                >
                  <p className="text-sm text-white">
                    Chapter {ch.chapter_number}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(ch.release_date).toLocaleDateString()}
                  </p>
                </div>
              ))}

              {(isLoading || isFetchingNextPage) && (
                <p className="py-4 text-center text-sm text-gray-400">
                  Loading...
                </p>
              )}
            </div>
          </DialogContent>
        </Dialog>

        <Button
          onClick={handlePageNext}
          disabled={page === totalPages}
        >
          Next
        </Button>
      </div>
    </section>
  )
}
