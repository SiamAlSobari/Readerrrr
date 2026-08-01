import { createFileRoute, Link } from "@tanstack/react-router";
import { PopularComicCardBase } from "@/features/comic/PopularComicCardBase";
import { getPopularComic } from "@/api/servers/shinigami.server";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";
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

  head: ({ loaderData, match }) => {
    const list = loaderData?.popularComic.data.data ?? [];
    const firstImage = list.find((item) => item.cover_image_url)?.cover_image_url;

    const title = "Komik Populer & Trending - KOMIK READER";
    const description = `Jelajahi ${list.length} komik populer dan trending terbaru dengan rating tertinggi di KOMIK READER. Baca online gratis.`;
    return {
      meta: [
        { name: "description", content: description },
        { name: "keywords", content: "komik populer, komik trending, komik terbaik, komik viral, komik reader" },
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

function RouteComponent() {
  const { popularComic } = Route.useLoaderData();
  const { page } = Route.useSearch();
  const totalPages = popularComic.data.meta.total_page;

  return (
    <div className="container mx-auto px-4 py-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Komik Populer All Time",
          description: "Daftar komik paling populer dan paling banyak dibaca di KOMIK READER.",
          url: `${SITE_URL}/popular`,
        }}
      />

      <div className="flex items-center gap-2 mb-6 border-b border-zinc-800/80 pb-4">
        <Flame className="w-6 h-6 text-amber-400" />
        <h1 className="text-2xl font-extrabold text-white">
          Komik Populer All Time
        </h1>
      </div>

      {/* Grid */}
      <motion.div
        key={page}
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.04 },
          },
        }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6"
      >
        {popularComic.data.data.map((comic) => (
          <PopularComicCardBase key={comic.manga_id} comic={comic} />
        ))}
      </motion.div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-3 mt-10">
        <Link
          to="."
          search={(prev) => ({ page: Math.max((prev.page ?? 1) - 1, 1) })}
          disabled={page <= 1}
          className="px-4 py-2 rounded-xl border border-zinc-800 bg-zinc-900 text-xs font-semibold text-white disabled:opacity-40 hover:bg-zinc-800 transition-colors"
        >
          Sebelumnya
        </Link>

        <span className="text-xs text-zinc-400 font-medium">
          Halaman {page} dari {totalPages}
        </span>

        <Link
          to="."
          search={(prev) => ({ page: (prev.page ?? 1) + 1 })}
          disabled={page >= totalPages}
          className="px-4 py-2 rounded-xl border border-zinc-800 bg-zinc-900 text-xs font-semibold text-white disabled:opacity-40 hover:bg-zinc-800 transition-colors"
        >
          Selanjutnya
        </Link>
      </div>
    </div>
  );
}
