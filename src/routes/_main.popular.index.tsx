import { createFileRoute, Link } from "@tanstack/react-router";
import { PopularComicCardBase } from "@/features/comic/PopularComicCardBase";
import { getPopularComic } from "@/api/servers/shinigami.server";
import { ChevronLeft, ChevronRight, Star, Eye, BookOpen } from "lucide-react";
import { JsonLd } from "@/common/components/JsonLd";

type ComicSearch = {
  page: number;
};

const SITE_URL = "https://komik-reader.my.id";

export const Route = createFileRoute("/_main/popular/")({
  validateSearch: (search): ComicSearch => ({
    page: Number(search.page || 1),
  }),
  loaderDeps: ({ search: { page } }) => ({ page }),
  loader: async ({ deps: { page } }) => {
    const popularComic = await getPopularComic({
      data: { page, pageSize: 24 },
    });
    return { popularComic };
  },

  head: ({ loaderData }) => {
    const list = loaderData?.popularComic.data.data ?? [];
    const firstImage = list.find((item) => item.cover_image_url)?.cover_image_url;

    const title = "Komik Populer & Trending - KOMIK READER";
    const description = `Jelajahi ${list.length} komik populer dan trending terbaru dengan rating tertinggi di KOMIK READER. Baca online gratis.`;
    return {
      meta: [
        { name: "description", content: description },
        {
          name: "keywords",
          content:
            "komik populer, komik trending, komik terbaik, komik viral, komik reader",
        },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: `${SITE_URL}/popular` },
        ...(firstImage ? [{ property: "og:image" as const, content: firstImage }] : []),
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      title,
    };
  },
  component: RouteComponent,
});

const COUNTRY_CODE: Record<string, string> = {
  KR: "KR · MANHWA",
  JP: "JP · MANGA",
  CN: "CN · MANHUA",
};

function RouteComponent() {
  const { popularComic } = Route.useLoaderData();
  const { page } = Route.useSearch();
  const totalPages = popularComic.data.meta.total_page || 1;
  const allItems = popularComic.data.data ?? [];
  const podiumItems = page === 1 ? allItems.slice(0, 3) : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Komik Populer All Time",
          description:
            "Daftar komik paling populer dan paling banyak dibaca di KOMIK READER.",
          url: `${SITE_URL}/popular`,
        }}
      />

      {/* Masthead */}
      <header className="mb-8 flex flex-col justify-between gap-4 border-b border-[#27272e] pb-6 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#f4f1ea]">
            Daftar Komik Terpopuler
          </h1>
          <p className="mt-1.5 max-w-[65ch] text-sm text-[#c8c2b6]">
            Komik yang paling banyak dibaca dan memiliki rating tertinggi dari pembaca.
          </p>
        </div>

        <div className="border border-[#27272e] bg-[#0c0c10] px-3.5 py-2 font-mono text-xs font-bold uppercase text-[#c8c2b6] tabular-nums">
          HALAMAN {page} DARI {totalPages}
        </div>
      </header>

      {/* Top 3 Podium on Page 1 */}
      {podiumItems.length === 3 && (
        <section aria-label="3 Besar Komik Terpopuler" className="mb-10">
          <div className="grid grid-cols-1 gap-px border border-[#27272e] bg-[#27272e] lg:grid-cols-3">
            {podiumItems.map((comic, idx) => {
              const rankNum = comic.rank || idx + 1;
              const origin = COUNTRY_CODE[comic.country_id] || "INT · KOMIK";
              return (
                <article
                  key={comic.manga_id}
                  className="flex flex-col justify-between bg-[#0c0c10] p-5"
                >
                  <div>
                    <div className="mb-4 flex items-center justify-between border-b border-[#27272e] pb-3 font-mono text-xs font-bold uppercase tabular-nums">
                      <span className="bg-[#be123c] px-2.5 py-1 text-[#f4f1ea]">
                        PERINGKAT #{String(rankNum).padStart(2, "0")}
                      </span>
                      <span className="text-[#c8c2b6]">{origin}</span>
                    </div>

                    <div className="flex gap-4">
                      <Link
                        to="/series/$comicId"
                        params={{ comicId: comic.manga_id }}
                        search={{ page: 1 }}
                        className="h-36 w-26 shrink-0 overflow-hidden border border-[#27272e] bg-[#141418]"
                      >
                        <img
                          src={comic.cover_portrait_url || comic.cover_image_url}
                          alt={comic.title}
                          loading="eager"
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover"
                        />
                      </Link>

                      <div className="flex min-w-0 flex-1 flex-col justify-between">
                        <div>
                          <Link
                            to="/series/$comicId"
                            params={{ comicId: comic.manga_id }}
                            search={{ page: 1 }}
                            className="line-clamp-2 font-display text-xl font-black uppercase tracking-tight text-[#f4f1ea] hover:text-[#f43f5e] transition-colors"
                          >
                            {comic.title}
                          </Link>
                          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-[#c8c2b6]">
                            {comic.description || "Seri unggulan terpopuler di katalog KOMIK READER."}
                          </p>
                        </div>

                        <div className="mt-3 flex items-center gap-4 font-mono text-xs font-bold tabular-nums">
                          <span className="flex items-center gap-1 text-[#fbbf24]">
                            <Star className="h-3.5 w-3.5 fill-[#fbbf24] text-[#fbbf24]" />
                            {comic.user_rate ? comic.user_rate.toFixed(1) : "N/A"}
                          </span>
                          <span className="flex items-center gap-1 text-[#c8c2b6]">
                            <Eye className="h-3.5 w-3.5" />
                            {(comic.view_count / 1000).toFixed(0)}K
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-[#27272e] pt-3">
                    <span className="font-mono text-xs font-bold text-[#f43f5e] tabular-nums">
                      CH. {comic.latest_chapter_number}
                    </span>
                    <Link
                      to="/read/$comicId/$chapterId"
                      params={{
                        comicId: comic.manga_id,
                        chapterId: comic.latest_chapter_id,
                      }}
                      className="inline-flex min-h-9 items-center gap-1.5 bg-[#be123c] px-3.5 py-1.5 font-mono text-xs font-bold uppercase text-[#f4f1ea] transition-colors hover:bg-[#9f1239]"
                    >
                      <BookOpen className="h-3.5 w-3.5" />
                      <span>Baca Ch. {comic.latest_chapter_number}</span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* Full Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {allItems.map((comic) => (
          <PopularComicCardBase key={comic.manga_id} comic={comic} />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-10 flex items-center justify-between border border-[#27272e] bg-[#0c0c10] p-3">
        <Link
          to="."
          search={(prev) => ({ page: Math.max((prev.page ?? 1) - 1, 1) })}
          disabled={page <= 1}
          className="inline-flex min-h-11 items-center gap-2 border border-[#27272e] bg-[#141418] px-4 py-2 font-mono text-xs font-bold uppercase text-[#f4f1ea] transition-colors hover:border-[#f4f1ea] aria-disabled:opacity-40 aria-disabled:pointer-events-none"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Sebelumnya</span>
        </Link>

        <span className="font-mono text-xs font-bold uppercase text-[#c8c2b6] tabular-nums">
          HALAMAN {page} DARI {totalPages}
        </span>

        <Link
          to="."
          search={(prev) => ({ page: (prev.page ?? 1) + 1 })}
          disabled={page >= totalPages}
          className="inline-flex min-h-11 items-center gap-2 border border-[#27272e] bg-[#141418] px-4 py-2 font-mono text-xs font-bold uppercase text-[#f4f1ea] transition-colors hover:border-[#f4f1ea] aria-disabled:opacity-40 aria-disabled:pointer-events-none"
        >
          <span>Selanjutnya</span>
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
