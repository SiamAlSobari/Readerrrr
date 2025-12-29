import { useState } from "react"
import { Eye } from "lucide-react"
import { Button } from "@/common/shadcn-ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/common/shadcn-ui/dialog"

interface Chapter {
  chapter_id: string
  chapter_number: number
  thumbnail_image_url: string
  release_date: string
  view_count: number
}

interface ChapterListProps {
  chapters: Chapter[]
  perPage?: number
}

export function ChapterList({ chapters, perPage = 5 }: ChapterListProps) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(chapters.length / perPage)
  const start = (currentPage - 1) * perPage
  const end = start + perPage
  const paginatedChapters = chapters.slice(start, end)

  const goPrev = () => setCurrentPage((p) => Math.max(1, p - 1))
  const goNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1))

  return (
    <section className="mx-auto mt-16 max-w-7xl px-4">
      <h2 className="mb-8 text-2xl font-bold text-white tracking-wide">
        Chapters
      </h2>

      <div className="space-y-4">
        {paginatedChapters.map((ch) => (
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

      {/* Pagination */}
      <div className="mt-10 mb-10 flex flex-wrap items-center justify-center gap-4">
        <Button
          onClick={goPrev}
          disabled={currentPage === 1}
          className="px-5 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700"
        >
          Prev
        </Button>

        {/* Tombol Dialog di tengah */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="px-6 py-2 rounded-lg border border-gray-500 hover:bg-gray-700 hover:text-white"
            >
              Lihat Chapter List
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg rounded-xl  border p-6 shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-white">
                All Chapters
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-2 max-h-96 overflow-y-auto mt-4">
              {chapters.map((ch) => (
                <div
                  key={ch.chapter_id}
                  className="flex items-center justify-between rounded-md p-3 hover:bg-white/5 transition"
                >
                  <p className="text-sm font-medium text-white">
                    Chapter {ch.chapter_number}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(ch.release_date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        <Button
          onClick={goNext}
          disabled={currentPage === totalPages}
          className="px-5 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700"
        >
          Next
        </Button>
      </div>
    </section>
  )
}
