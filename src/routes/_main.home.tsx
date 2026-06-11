import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Flame,
  TrendingUp,
  Clock,
  ChevronRight,
  BookOpen,
  Library,
  ScrollText,
} from "lucide-react";
import HeroSection from "@/common/components/HeroSection";
import {
  getComicRecomendation,
  getComicUpdate,
  getPopularComic,
} from "@/api/servers/shinigami.server";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";

import PopularComicCard from "@/features/comic/PopularComicCard";
import BaseComicCard from "@/features/comic/BaseComicCard";
import UpdateComicCard from "@/features/comic/UpdateComicCard";
import BaseComicCardSkeleton from "@/features/comic/BaseComicCardSkeleton";
import PopularComicCardSkeleton from "@/features/comic/PopularComicCardSkeleton";
import UpdateComicCardSkeleton from "@/features/comic/UpdateComicCardSkeleton";

const queryRecommendation = (activeTab: string) =>
  queryOptions({
    queryKey: ["recomendation", activeTab],
    queryFn: () => getComicRecomendation({ data: { format: activeTab } }),
  });
const queryPopularComic = queryOptions({
  queryKey: ["popular"],
  queryFn: () => getPopularComic({ data: { page: 1, pageSize: 10 } }),
});
const queryUpdateComic = queryOptions({
  queryKey: ["update"],
  queryFn: () => getComicUpdate(),
});

export const Route = createFileRoute("/_main/home")({
  component: RouteComponent,
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        name: "description",
        content:
          "Baca ribuan KOMIK online terbaru, populer, dan lengkap di KOMIK READER. Gratis dan mudah diakses.",
      },
      {
        name: "keywords",
        content:
          "KOMIK, baca KOMIK, KOMIK online, KOMIK terbaru, KOMIK populer, KOMIK READER, manga, manhwa, manhua",
      },
      { name: "author", content: "KOMIK READER" },

      { property: "og:title", content: "KOMIK READER – Baca KOMIK Online Gratis" },
      {
        property: "og:description",
        content:
          "Baca ribuan KOMIK online terbaru dan populer di KOMIK READER. Gratis dan mudah diakses.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://komik-reader.my.id/home" },
      { property: "og:image", content: "/komik_reader.png" },

      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "KOMIK READER – Baca KOMIK Online Gratis" },
      {
        name: "twitter:description",
        content:
          "Baca ribuan KOMIK online terbaru dan populer di KOMIK READER. Gratis dan mudah diakses.",
      },
      { name: "twitter:image", content: "/komik_reader.png" },
    ],
    links: [
      { rel: "canonical", href: "https://komik-reader.my.id/home" },
    ],
    title: "KOMIK READER – Baca KOMIK Online Gratis",
  }),
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(queryPopularComic),
      context.queryClient.ensureQueryData(queryUpdateComic),
      context.queryClient.ensureQueryData(queryRecommendation("manhwa")),
    ]);
  },
});

function RouteComponent() {
  const [activeTab, setActiveTab] = useState("manhwa");
  const navigate = useNavigate();
  const { data: comicRecomendation, isLoading: comicRecomendationLoading } =
    useQuery(queryRecommendation(activeTab));
  const { data: popularComic, isLoading: popularComicLoading } =
    useQuery(queryPopularComic);
  const { data: updateComic, isLoading: updateCommicLoading } =
    useQuery(queryUpdateComic);
  const TABS = [
    {
      key: "manhwa",
      label: "Manhwa",
      icon: ScrollText, // Korea style / webtoon
    },
    {
      key: "manga",
      label: "Manga",
      icon: BookOpen, // Jepang
    },
    {
      key: "manhua",
      label: "Manhua",
      icon: Library, // China
    },
  ] as const;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 bg-linear-to-b from-black to-gray-900 overflow-x-hidden"
    >
      {/* Hero Section */}
      <HeroSection comics={popularComic?.data.data ?? []} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl text-white font-bold mb-6 flex items-center gap-3">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
              Top Recommendations
              <div className="h-px flex-1 bg-linear-to-r from-red-500 to-transparent"></div>
            </h2>

            {/* Tabs - RESPONSIVE */}
            <div className="flex gap-6 mb-8 border-b border-gray-800 overflow-x-auto scrollbar-hide">
              {TABS.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`
                pb-4 px-1 font-semibold text-sm sm:text-lg
                flex items-center gap-2 whitespace-nowrap
                transition-colors
                ${
                  activeTab === key
                    ? "text-white border-b-2 border-red-500"
                    : "text-gray-400 hover:text-white"
                }
              `}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  {label}
                </button>
              ))}
            </div>

            {/* Comic Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6"
              >
                {comicRecomendationLoading
                  ? Array.from({ length: 5 }).map((_, idx) => (
                      <BaseComicCardSkeleton key={idx} />
                    ))
                  : comicRecomendation?.data.data.map((comic) => (
                      <BaseComicCard key={comic.manga_id} comic={comic} />
                    ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Popular Section */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-6 flex items-center gap-3">
              <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400" />
              Popular All Time
              <div className="h-px flex-1 bg-linear-to-r from-orange-500 to-transparent"></div>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {popularComicLoading
                ? Array.from({ length: 5 }).map((_, idx) => (
                    <PopularComicCardSkeleton key={idx} />
                  ))
                : popularComic?.data.data.map((comic) => (
                    <PopularComicCard key={comic.manga_id} comic={comic} />
                  ))}
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          <div className="bg-linear-to-b from-gray-900/50 to-black/50 rounded-2xl p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 flex items-center gap-3">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
              Latest Updates
              <div className="h-px flex-1 bg-linear-to-r from-green-500 to-transparent"></div>
            </h2>

            <motion.div
              variants={{
                hidden: {},
                show: {
                  transition: { staggerChildren: 0.08 },
                },
              }}
              className="space-y-4"
            >
              {updateCommicLoading
                ? Array.from({ length: 5 }).map((_, idx) => (
                    <UpdateComicCardSkeleton key={idx} />
                  ))
                : updateComic?.data.data.map((comic) => (
                    <motion.div
                      key={comic.manga_id}
                      variants={{
                        hidden: { opacity: 0, x: 20 },
                        show: { opacity: 1, x: 0 },
                      }}
                    >
                      <UpdateComicCard comic={comic} />
                    </motion.div>
                  ))}
            </motion.div>

            <button
              onClick={() => navigate({ to: "/update" })}
              className="w-full mt-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
            >
              View All Updates
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
