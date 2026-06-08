import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/robots.txt')({
  server: {
    handlers: {
      GET: async () => {
        const robots = `User-agent: *
Allow: /
Disallow: /search
Crawl-Delay: 10

Sitemap: https://komik-reader.my.id/sitemap.xml`

        return new Response(robots, {
          headers: {
            'Content-Type': 'text/plain',
          },
        })
      },
    },
  },
})
