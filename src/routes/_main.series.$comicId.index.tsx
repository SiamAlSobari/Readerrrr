import { DUMMY_CHAPTERS, DUMMY_COMIC_DETAIL } from '@/common/data/dummy'
import { ChapterList } from '@/features/comic/ChapterList'
import { ComicDetail } from '@/features/comic/ComicDetail'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/series/$comicId/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main>
        <ComicDetail comic={DUMMY_COMIC_DETAIL} />
        <ChapterList chapters={DUMMY_CHAPTERS} />

    </main>
  )
}
