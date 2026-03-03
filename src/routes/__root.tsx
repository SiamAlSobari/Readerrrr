import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { inject } from "@vercel/analytics";

import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";

import appCss from "../styles.css?url";

import type { QueryClient } from "@tanstack/react-query";
import React from "react";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        name: "description",
        content:
          "MANGA READER – Baca KOMIK online terbaru, populer, dan lengkap dengan mudah dan gratis.",
      },
      {
        name: "keywords",
        content:
          "KOMIK, baca KOMIK, KOMIK online, KOMIK terbaru, KOMIK populer, KOMIK reader",
      },
      {
        name: "author",
        content: "KOMIK READER",
      },
      {
        property: "og:title",
        content: "KOMIK READER – Baca KOMIK Online Terbaru & Populer",
      },
      {
        property: "og:description",
        content:
          "Nikmati ribuan KOMIK terbaru dan populer secara gratis dengan KOMIK READER. Akses mudah, cepat, dan lengkap!",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:url",
        //content: 'https://KOMIKreader.com', // ganti dengan domain lo
      },
      {
        property: "og:image",
        content: "/komik_reader.png", // ganti dengan logo / cover gambar
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: "KOMIK READER – Baca KOMIK Online Terbaru & Populer",
      },
      {
        name: "twitter:description",
        content:
          "Nikmati ribuan KOMIK terbaru dan populer secara gratis dengan KOMIK READER. Akses mudah, cepat, dan lengkap!",
      },
      {
        name: "twitter:image",
        content: "/komik_reader.png", // ganti dengan logo / cover gambar
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "icon",
        href: "/komik_reader.png",
        type: "image/x-icon",
      },
    ],
    title: "KOMIK READER – Baca KOMIK Online Terbaru & Populer",
  }),

  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    inject();
  }, []);
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
