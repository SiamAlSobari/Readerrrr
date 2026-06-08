import { Badge } from "@/common/shadcn-ui/badge";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { getComicGenre, getGenreList } from "@/api/servers/shinigami.server";
import { queryOptions, useQuery } from "@tanstack/react-query";
import LoadingGrid from "@/features/comic/LoadingGrid";
import GenreList from "@/features/genre/GenreList";
import NoResultComicGenre from "@/features/genre/NoResultComicGenre";
import z from "zod";

const searchPValidate = z.object({
  g: z.string().default("action"),
});

export const genresQuery = queryOptions({
  queryKey: ["genres"],
  queryFn: () => getGenreList(),
  staleTime: 1000 * 60 * 10, // 10 menit
});

export const comicsByGenreQuery = (g: string) =>
  queryOptions({
    queryKey: ["comics", g],
    queryFn: () => getComicGenre({ data: { genre: g } }),
  });

export const Route = createFileRoute("/_main/genre/")({
  component: RouteComponent,
  validateSearch: searchPValidate,
  loaderDeps: ({ search: { g } }) => ({ g }),
  loader: async ({ context, deps: { g } }) => {
    const genres = await context.queryClient.ensureQueryData(genresQuery);
    const comics = await context.queryClient.ensureQueryData(
      comicsByGenreQuery(g),
    );
    return { genres, comics };
  },
  head: ({ loaderData, match }) => {
    const genreList = loaderData?.genres.data.data ?? [];
    const comicList = loaderData?.comics.data.data ?? [];
    const firstImage = comicList.find((c) => c.cover_image_url)?.cover_image_url;
    const genreNames = genreList.map((g) => g.name).join(", ");
    const SITE_URL = "https://komik-reader.my.id";

    const title = "Genre Comics - KOMIK READER";
    const description = `Jelajahi ${comicList.length} komik dalam ${genreList.length} genre: ${genreNames}. Baca KOMIK online gratis di KOMIK READER.`;
    return {
      meta: [
        { name: "description", content: description },
        { name: "keywords", content: `genre komik, ${genreNames}, baca komik, komik online` },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: `${SITE_URL}/genre` },
        ...(firstImage ? [{ property: "og:image" as const, content: firstImage }] : []),
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      links: [
        { rel: "canonical", href: `${SITE_URL}${match.pathname}` },
      ],
      title,
    };
  },
});

const gridVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

function RouteComponent() {
  const { g } = Route.useSearch();

  const { data: genres } = useQuery(genresQuery);

  const { data: comicsGenre, isLoading } = useQuery(comicsByGenreQuery(g));
  const list = comicsGenre?.data.data ?? [];
  const genreList = genres?.data.data ?? [];
  return (
    <div className="mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-[230px_1fr] gap-6">
        <GenreList activeGenre={g} genres={genreList} />
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold capitalize">{g} Comics</h2>

            <Badge variant="secondary">
              {isLoading ? "Loading..." : `${list.length} Result`}
            </Badge>
          </div>

          <AnimatePresence mode="wait">
            {isLoading ? (
              <LoadingGrid key="loading" />
            ) : list.length === 0 ? (
              <NoResultComicGenre key="empty" />
            ) : (
              <motion.div
                key={g}
                variants={gridVariants}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5"
              >
                {list.map((comic) => (
                  <Link
                    key={comic.manga_id}
                    to="/series/$comicId"
                    params={{ comicId: comic.manga_id }}
                    search={{ page: 1 }}
                  >
                    <motion.div
                      variants={cardVariants}
                      whileHover={{ y: -6 }}
                      className="group cursor-pointer"
                    >
                      <div className="relative overflow-hidden rounded-xl bg-muted shadow-sm">
                        <div className="aspect-3/4 overflow-hidden">
                          <img
                            src={comic.cover_image_url}
                            alt={comic.title}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>

                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition" />

                        <div className="absolute top-2 right-2 z-10">
                          <Badge className="text-xs">
                            Ch {comic.latest_chapter_number}
                          </Badge>
                        </div>

                        <div className="absolute bottom-0 z-10 p-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition">
                          <h3 className="text-sm font-semibold text-white line-clamp-2">
                            {comic.title}
                          </h3>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </div>
  );
}
