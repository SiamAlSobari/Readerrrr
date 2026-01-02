import { TaxonomyItem } from '@/common/interface'
import { Button } from '@/common/shadcn-ui/button'
import { ScrollArea } from '@/common/shadcn-ui/scroll-area'
import { Separator } from '@radix-ui/react-separator'


interface Props {
    activeGenre: string
    setActiveGenre: (genre: string) => void
    genres: TaxonomyItem[]
}

export default function GenreList({ activeGenre, setActiveGenre, genres }: Props) {
  return (
     <aside className="rounded-xl border bg-background p-3">
          <h2 className="text-sm font-semibold mb-2">Genres</h2>
          <Separator className="mb-3" />

          <ScrollArea className="h-120">
            <div className="grid grid-cols-2 gap-1 pr-2">
              {genres.map((genre) => {
                const active = activeGenre === genre.slug

                return (
                  <Button
                    key={genre.slug}
                    variant="ghost"
                    onClick={() => setActiveGenre(genre.slug)}
                    className={`justify-start rounded-lg text-sm transition
                      ${active
                        ? 'bg-primary/10 text-primary font-semibold border-l-4 border-primary'
                        : 'text-muted-foreground hover:bg-muted'
                      }`}
                  >
                    {genre.name}
                  </Button>
                )
              })}
            </div>
          </ScrollArea>
        </aside>
  )
}
