import { Eye } from "lucide-react"
import { Button } from "@/common/shadcn-ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/common/shadcn-ui/dialog"
import { Meta } from "@/common/interface"
import { useNavigate } from "@tanstack/react-router"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useServerFn } from "@tanstack/react-start"
import { getChapterList } from "@/api/servers/shinigami.server"

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

  return (
    <section className="mx-auto mt-16 max-w-7xl px-4">
      <h2 className="mb-8 text-2xl font-bold text-white tracking-wide">
        Chapters
      </h2>

      {/* ===== MAIN SSR LIST ===== */}
      <div className="space-y-4">
        {chapters.map((ch) => (
          <a
            key={ch.chapter_id}
            href={`/read/${ch.chapter_id}`}
            className="flex items-center gap-5 rounded-xl border border-white/20
              bg-linear-to-r from-white/5 to-white/10 p-4 backdrop-blur-md
              transition hover:scale-[1.02] hover:border-white/30 hover:shadow-lg"
          >
            <img
              src={ch.thumbnail_image_url}
              className="h-20 w-32 rounded-lg object-cover shadow-sm"
            />

            <div className="flex-1">
              <p className="font-semibold text-lg text-white">
                Chapter {ch.chapter_number}
              </p>
              <p className="text-sm text-gray-400">
                {new Date(ch.release_date).toLocaleDateString()}
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-300 font-medium">
              <Eye className="h-5 w-5 text-gray-400" />
              {ch.view_count.toLocaleString()}
            </div>
          </a>
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
