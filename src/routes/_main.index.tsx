import { createFileRoute } from "@tanstack/react-router";
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
import { useServerFn } from "@tanstack/react-start";
import {
  getComicRecomendation,
  getComicUpdate,
  getPopularComic,
} from "@/api/servers/shinigami.server";
import { useQuery } from "@tanstack/react-query";

import PopularComicCard from "@/features/comic/PopularComicCard";
import BaseComicCard from "@/features/comic/BaseComicCard";
import UpdateComicCard from "@/features/comic/UpdateComicCard";
import BaseComicCardSkeleton from "@/features/comic/BaseComicCardSkeleton";
import PopularComicCardSkeleton from "@/features/comic/PopularComicCardSkeleton";
import UpdateComicCardSkeleton from "@/features/comic/UpdateComicCardSkeleton";

export const Route = createFileRoute("/_main/")({ component: App });

function App() {
  const [activeTab, setActiveTab] = useState("manhwa");
  const recommendation = useServerFn(getComicRecomendation);
  const popular = useServerFn(getPopularComic);
  const update = useServerFn(getComicUpdate);
  const { data: comicRecomendation, isLoading: comicRecomendationLoading } =
    useQuery({
      queryKey: ["recomendation", activeTab],
      queryFn: () => recommendation(),
    });
  const { data: popularComic, isLoading: popularComicLoading } = useQuery({
    queryKey: ["popular"],
    queryFn: () => popular({ data: { page: 1, pageSize: 10 } }),
  });
  const { data: updateComic, isLoading: updateCommicLoading } = useQuery({
    queryKey: ["update"],
    queryFn: () => update(),
  });
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
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 bg-linear-to-b from-black to-gray-900 overflow-x-hidden">
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
                ${activeTab === key
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
              {comicRecomendationLoading
                ? // Tampilkan skeleton jika loading
                Array.from({ length: 5 }).map((_, idx) => (
                  <BaseComicCardSkeleton key={idx} />
                ))
                : // Tampilkan cards jika data sudah ada
                comicRecomendation?.data.data.map((comic) => (
                  <BaseComicCard key={comic.manga_id} comic={comic} />
                ))}
            </div>
          </div>

          {/* Popular Section */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-6 flex items-center gap-3">
              <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400" />
              Popular All Time
              <div className="h-px flex-1 bg-linear-to-r from-orange-500 to-transparent"></div>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {popularComicLoading ?
                Array.from({ length: 5 }).map((_, idx) => (
                  <PopularComicCardSkeleton key={idx} />
                )) :

                popularComic?.data.data.map((comic) => (
                  <PopularComicCard key={comic.manga_id} comic={comic} />
                ))
              }
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

            <div className="space-y-4">
              {updateCommicLoading ?
              
                Array.from({ length: 5 }).map((_, idx) => (
                  <UpdateComicCardSkeleton key={idx} />
                )) :
                updateComic?.data.data.map((comic) => (
                  <UpdateComicCard key={comic.manga_id} comic={comic} />
                ))}
       
            </div>

            <button className="w-full mt-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
              View All Updates
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
