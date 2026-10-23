import { createFileRoute } from "@tanstack/react-router";
import { getComicGenre, getGenreList } from "@/api/servers/shinigami.server";
import { queryOptions, useQuery } from "@tanstack/react-query";
import LoadingGrid from "@/features/comic/LoadingGrid";
import GenreList from "@/features/genre/GenreList";
import NoResultComicGenre from "@/features/genre/NoResultComicGenre";
import BaseComicCard from "@/features/comic/BaseComicCard";
import z from "zod";

const searchPValidate = z.object({
  g: z.string().default("action"),
});

export const genresQuery = queryOptions({
  queryKey: ["genres"],
  queryFn: () => getGenreList(),
  staleTime: 1000 * 60 * 10,
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
  head: ({ loaderData }) => {
    const genreList = loaderData?.genres.data.data ?? [];
    const comicList = loaderData?.comics.data.data ?? [];
    const firstImage = comicList.find((c) => c.cover_image_url)?.cover_image_url;
    const genreNames = genreList.map((g) => g.name).join(", ");
    const SITE_URL = "https://komik-reader.my.id";

    const title = "Indeks Genre Komik - KOMIK READER";
    const description = `Jelajahi ${comicList.length} komik dalam ${genreList.length} genre: ${genreNames}. Baca KOMIK online gratis di KOMIK READER.`;
    return {
      meta: [
        { name: "description", content: description },
        {
          name: "keywords",
          content: `genre komik, ${genreNames}, baca komik, komik online`,
        },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: `${SITE_URL}/genre` },
        ...(firstImage
          ? [{ property: "og:image" as const, content: firstImage }]
          : []),
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      title,
    };
  },
});

function RouteComponent() {
  const { g } = Route.useSearch();

  const { data: genres } = useQuery(genresQuery);
  const { data: comicsGenre, isLoading } = useQuery(comicsByGenreQuery(g));

  const list = comicsGenre?.data.data ?? [];
  const genreList = genres?.data.data ?? [];
  const activeGenreName =
    genreList.find((item) => item.slug === g)?.name || g.replace(/-/g, " ");

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Page Masthead */}
      <header className="mb-8 flex flex-col justify-between gap-4 border-b border-[#27272e] pb-6 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#f4f1ea]">
            Daftar Genre Komik
          </h1>
          <p className="mt-1.5 max-w-[65ch] text-sm text-[#c8c2b6]">
            Pilih genre di bawah untuk menemukan komik sesuai tema cerita yang kamu suka.
          </p>
        </div>

        <div className="border border-[#27272e] bg-[#0c0c10] px-3.5 py-2 font-mono text-xs font-bold uppercase text-[#c8c2b6] tabular-nums">
          {genreList.length} GENRE TERSEDIA
        </div>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left 3 Columns: Genre Directory */}
        <div className="lg:col-span-3">
          <GenreList activeGenre={g} genres={genreList} />
        </div>

        {/* Right 9 Columns: Genre Results */}
        <section className="lg:col-span-9" aria-labelledby="genre-results-heading">
          <div className="mb-6 flex items-center justify-between border border-[#27272e] bg-[#0c0c10] px-4 py-3">
            <h2
              id="genre-results-heading"
              className="font-display text-xl sm:text-2xl font-black uppercase tracking-tight text-[#f4f1ea]"
            >
              Genre: <span className="text-[#f43f5e]">{activeGenreName}</span>
            </h2>

            <span className="border border-[#27272e] bg-[#141418] px-2.5 py-1 font-mono text-xs font-bold uppercase text-[#f4f1ea] tabular-nums">
              {isLoading ? "MEMUAT..." : `${list.length} JUDUL`}
            </span>
          </div>

          {isLoading ? (
            <LoadingGrid />
          ) : list.length === 0 ? (
            <NoResultComicGenre />
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {list.map((comic) => (
                <BaseComicCard key={comic.manga_id} comic={comic} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
