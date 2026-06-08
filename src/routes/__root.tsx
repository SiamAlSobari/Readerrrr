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
import { JsonLd } from "@/common/components/JsonLd";

interface MyRouterContext {
  queryClient: QueryClient;
}

const SITE_URL = "https://komik-reader.my.id";

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: ({ match }) => ({
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
          "Baca KOMIK online terbaru, populer, dan lengkap dengan mudah dan gratis. Nikmati ribuan judul Manga, Manhwa, dan Manhua terbaru!",
      },
      {
        name: "keywords",
        content:
          "KOMIK, baca KOMIK, KOMIK online, KOMIK terbaru, KOMIK populer, KOMIK reader, manga, manhwa, manhua",
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
        content: `${SITE_URL}${match.pathname}`,
      },
      {
        property: "og:image",
        content: "/komik_reader.png",
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
        content: "/komik_reader.png",
      },
      {
        name: "theme-color",
        content: "#000000",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: `${SITE_URL}${match.pathname}`,
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "icon",
        href: "/komik_reader.png",
        type: "image/x-icon",
      },
      {
        rel: "apple-touch-icon",
        href: "/komik_reader.png",
      },
      {
        rel: "manifest",
        href: "/manifest.webmanifest",
      },
    ],
    title: "KOMIK READER – Baca KOMIK Online Terbaru & Populer",
  }),

  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    inject();
    
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").catch((err) => {
          console.error("SW registration failed: ", err);
        });
      });
    }
  }, []);
  return (
    <html lang="id">
      <head>
        <HeadContent />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "KOMIK READER",
            url: SITE_URL,
            description:
              "Baca KOMIK online terbaru, populer, dan lengkap dengan mudah dan gratis.",
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
              },
              "query-input": "required name=search_term_string",
            },
          }}
        />
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
