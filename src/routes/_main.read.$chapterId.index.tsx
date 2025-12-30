import { DUMMY_CHAPTER_DETAIL } from '@/common/data/dummy'
import ChapterNavigation from '@/features/comic/ChaperNavigation'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/read/$chapterId/')({
  component: ReadChapterPage,
})

function ReadChapterPage() {
  const chapter = DUMMY_CHAPTER_DETAIL

  return (
<div className="bg-black text-white min-h-screen">
  <ChapterNavigation chapter={chapter} />

  {/* READER CONTAINER */}
  <div className="
    mx-auto
    w-full
    max-w-180
    sm:max-w-160
    md:max-w-170
    lg:max-w-170
  ">
    {chapter.chapter.data.map((img, index) => {
      const imageUrl = `${chapter.base_url_low}${chapter.chapter.path}${img}`

      return (
        <img
          key={index}
          src={imageUrl}
          alt={`Page ${index + 1}`}
          loading="lazy"
          className="
            w-full
            block
            object-contain
            select-none
          "
        />
      )
    })}
  </div>

  <ChapterNavigation chapter={chapter} />
</div>

  )
}
