import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'


import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'


import appCss from '../styles.css?url'

import type { QueryClient } from '@tanstack/react-query'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        name: 'description',
        content: 'MANGA READER – Baca manga online terbaru, populer, dan lengkap dengan mudah dan gratis.',
      },
      {
        name: 'keywords',
        content: 'manga, baca manga, manga online, manga terbaru, manga populer, manga reader',
      },
      {
        name: 'author',
        content: 'MANGA READER',
      },
      {
        property: 'og:title',
        content: 'MANGA READER – Baca Manga Online Terbaru & Populer',
      },
      {
        property: 'og:description',
        content: 'Nikmati ribuan manga terbaru dan populer secara gratis dengan MANGA READER. Akses mudah, cepat, dan lengkap!',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        //content: 'https://mangareader.com', // ganti dengan domain lo
      },
      {
        property: 'og:image',
        content: '/komik_reader.png', // ganti dengan logo / cover gambar
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:title',
        content: 'MANGA READER – Baca Manga Online Terbaru & Populer',
      },
      {
        name: 'twitter:description',
        content: 'Nikmati ribuan manga terbaru dan populer secara gratis dengan MANGA READER. Akses mudah, cepat, dan lengkap!',
      },
      {
        name: 'twitter:image',
        content: '/komik_reader.png', // ganti dengan logo / cover gambar
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'icon',
        href: '/manga_reader.png',
        type: 'image/x-icon',
      },
    ],
    title: 'MANGA READER – Baca Manga Online Terbaru & Populer',
  }),


  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
