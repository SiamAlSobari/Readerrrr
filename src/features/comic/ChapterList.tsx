import { Eye } from "lucide-react"

export function ChapterList({ chapters }: { chapters: any[] }) {
  return (
    <section className="mx-auto mt-16 max-w-7xl px-4">
      <h2 className="mb-6 text-xl font-semibold text-white">
        Chapters
      </h2>

      <div className="space-y-3">
        {chapters.map((ch) => (
          <a
            key={ch.chapter_id}
            href={`/read/${ch.chapter_id}`}
            className="flex items-center gap-4 rounded-xl border border-white/10
            bg-white/5 p-3 transition hover:bg-white/10"
          >
            <img
              src={ch.thumbnail_image_url}
              className="h-16 w-28 rounded-lg object-cover"
            />

            <div className="flex-1">
              <p className="font-medium text-white">
                Chapter {ch.chapter_number}
              </p>
              <p className="text-sm text-gray-400">
                {new Date(ch.release_date).toLocaleDateString()}
              </p>
            </div>

            <div className="flex items-center gap-1 text-sm text-gray-400">
              <Eye className="h-4 w-4" />
              {ch.view_count.toLocaleString()}
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
