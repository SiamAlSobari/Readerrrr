import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { inject } from "@vercel/analytics";

import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";
import appCss from "../styles.css?url";

import type { QueryClient } from "@tanstack/react-query";
import React, { Suspense } from "react";
import { JsonLd } from "@/common/components/JsonLd";

interface MyRouterContext {
  queryClient: QueryClient;
}

const SITE_URL = "https://komik-reader.my.id";

const DevtoolsComponent = import.meta.env.DEV
  ? React.lazy(() =>
      Promise.all([
        import("@tanstack/react-devtools"),
        import("@tanstack/react-router-devtools"),
      ]).then(([devtools, routerDevtools]) => ({
        default: () => (
          <devtools.TanStackDevtools
            config={{ position: "bottom-right" }}
            plugins={[
              {
                name: "Tanstack Router",
                render: <routerDevtools.TanStackRouterDevtoolsPanel />,
              },
              TanStackQueryDevtools,
            ]}
          />
        ),
      }))
    )
  : () => null;

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: ({ match }) => {
    const rawPath = match.pathname === "/" ? "" : match.pathname.replace(/\/$/, "");
    const canonicalUrl = `${SITE_URL}${rawPath}`;

    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
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
        { name: "author", content: "KOMIK READER" },
        {
          property: "og:title",
          content: "KOMIK READER : Baca KOMIK Online Terbaru & Populer",
        },
        {
          property: "og:description",
          content:
            "Nikmati ribuan KOMIK terbaru dan populer secara gratis dengan KOMIK READER. Akses mudah, cepat, dan lengkap!",
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: canonicalUrl },
        { property: "og:image", content: `${SITE_URL}/komik_reader.png` },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: "KOMIK READER : Baca KOMIK Online Terbaru & Populer",
        },
        {
          name: "twitter:description",
          content:
            "Nikmati ribuan KOMIK terbaru dan populer secara gratis dengan KOMIK READER. Akses mudah, cepat, dan lengkap!",
        },
        { name: "twitter:image", content: `${SITE_URL}/komik_reader.png` },
        { name: "theme-color", content: "#09090b" },
      ],
      links: [
        { rel: "canonical", href: canonicalUrl },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&family=Big+Shoulders+Display:wght@700;800;900&family=Chivo+Mono:wght@400;600;700&display=swap",
        },
        { rel: "stylesheet", href: appCss },
        { rel: "icon", href: "/komik_reader.png", type: "image/x-icon" },
        { rel: "apple-touch-icon", href: "/komik_reader.png" },
        { rel: "manifest", href: "/manifest.webmanifest" },
      ],
      title: "KOMIK READER : Baca KOMIK Online Terbaru & Populer",
    };
  },

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
        <title>KOMIK READER : Baca KOMIK Online Terbaru & Populer</title>
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
        <div
          hidden
          aria-hidden="true"
          dangerouslySetInnerHTML={{
            __html: `<!--
THESIS: KOMIK READER stages live Manga, Manhwa, and Manhua as physical 3D Tankobon volumes in a darkroom press studio, refusing generic SaaS feature grids, pill badges, and fabricated stats.
OWN-WORLD: Obsidian darkroom ground (#09090b), warm newsprint paper (#f4f1ea), muted stone (#c8c2b6), graphite panel borders (#27272e), and single Hanko vermilion accent (#e11d48); Big Shoulders Display mastheads, Barlow prose, and Chivo Mono tabular indices.
STORY: Visitors inspect live trending 3D comic volumes, verify real chapter releases and ratings, and jump directly into reading or series archives.
FIRST VIEWPORT: Asymmetric 12-column stage: 7-column interactive Three.js WebGL 3D Tankobon rack with spine/page-edge geometry on left, 5-column live Volume Dossier with direct Read Chapter CTA on right, anchored by a spine index bar.
FORM: 3D Interactive Tankobon Press Stage (candidate 3, seed key f902f592, raised by signals-instruments-darkroom-safelight-bay and ikeda-datamatics).
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
-->`,
          }}
        />
        {children}
        {import.meta.env.DEV && (
          <Suspense fallback={null}>
            <DevtoolsComponent />
          </Suspense>
        )}
        <Scripts />
      </body>
    </html>
  );
}
