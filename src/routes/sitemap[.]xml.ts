import { shinigamiService } from '@/api/services/shinigami.service'
import { createFileRoute } from '@tanstack/react-router'

const SITE_URL = 'https://komik-reader.my.id'

const GENRES = [
  'action', 'adventure', 'comedy', 'drama', 'fantasy', 'horror',
  'mystery', 'romance', 'sci-fi', 'slice-of-life', 'sports',
  'supernatural', 'thriller', 'ecchi', 'harem', 'isekai',
  'martial-arts', 'mecha', 'psychological', 'shounen', 'shoujo',
  'seinen', 'josei', 'smut', 'tragedy', 'historical', 'music',
]

export const Route = createFileRoute('/sitemap.xml')({
    server: {
        handlers: {
            GET: async () => {
                // Ambil popular comics dari 3 halaman untuk lebih banyak URL
                const pages = await Promise.allSettled([
                    shinigamiService.getPopularComic(1, 24),
                    shinigamiService.getPopularComic(2, 24),
                    shinigamiService.getPopularComic(3, 24),
                ])

                const comics = pages
                    .filter((r) => r.status === 'fulfilled')
                    .flatMap((r) => (r as PromiseFulfilledResult<{ data: { manga_id: string }[] }>).value.data)
                const uniqueComics = Array.from(new Map(comics.map((c) => [c.manga_id, c])).values())

                const comicUrls = uniqueComics.map((comic) => `
  <url>
    <loc>${SITE_URL}/series/${comic.manga_id}</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`).join('')

                const genreUrls = GENRES.map((genre) => `
  <url>
    <loc>${SITE_URL}/genre?g=${genre}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`).join('')

                const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <url>
    <loc>${SITE_URL}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE_URL}/home</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${SITE_URL}/popular</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${SITE_URL}/genre</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${SITE_URL}/update</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${SITE_URL}/search</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>

  ${genreUrls}
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
