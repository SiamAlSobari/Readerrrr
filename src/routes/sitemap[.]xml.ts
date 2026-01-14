import { shinigamiService } from '@/api/services/shinigami.service'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sitemap.xml')({
    server: {
        handlers: {
            GET: async () => {
                // ⚠️ ambil list komik (pakai page besar)
                const res = await shinigamiService.getPopularComic(1, 24)
                const comics = res.data

                const comicUrls = comics.map((comic) => `
  <url>
    <loc>https://komik-reader.my.id/series/${comic.manga_id}</loc>
  </url>
        `).join('')

                const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <url>
    <loc>https://komik-reader.my.id/</loc>
  </url>
  <url>
    <loc>https://komik-reader.my.id/genre</loc>
  </url>
  
  <url>
    <loc>https://komik-reader.my.id/update</loc>
  </url>

  <url>
    <loc>https://komik-reader.my.id/series</loc>
  </url>

  <url>
    <loc>https://komik-reader.my.id/popular</loc>
  </url>

  ${comicUrls}

</urlset>`

                return new Response(xml, {
                    headers: {
                        'Content-Type': 'application/xml',
                    },
                })
            },
        },
    },
})
