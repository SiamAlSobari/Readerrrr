import { Comic } from '@/common/interface'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Search, Bookmark, Flame, TrendingUp, Clock, Star, ChevronRight, BookOpen, Library, ScrollText } from 'lucide-react'
import Header from '@/common/components/Header'
import HeroSection from '@/common/components/HeroSection'
import { useServerFn } from '@tanstack/react-start'
import { getComicRecomendation, getComicUpdate, getPopularComic } from '@/api/servers/shinigami.server'
import { useQuery } from '@tanstack/react-query'
import { DUMMY_COMICS, POPULAR_COMICS_DUMMY, UPDATE_COMICS_DUMMY } from '@/common/data/dummy'
import PopularComicCard from '@/features/comic/PopularComicCard'
import BaseComicCard from '@/features/comic/BaseComicCard'
import Footer from '@/common/components/Footer'
import UpdateComicCard from '@/features/comic/UpdateComicCard'

export const Route = createFileRoute('/_main/')({ component: App })


function App() {
  const [activeTab, setActiveTab] = useState('manhwa')
  // const recommendation = useServerFn(getComicRecomendation)
  //  const popular = useServerFn(getPopularComic)
  //const update = useServerFn(getComicUpdate)
  // const { data: comicRecomendation } = useQuery({
  //   queryKey: ['recomendation', activeTab],
  //   queryFn: () => recommendation()
  // })
  // const { data: popularComic } = useQuery({
  //   queryKey: ['popular'],
  //   queryFn: () => popular()
  // })
  // const {data: updateCommic} = useQuery({
  //   queryKey:["update"],
  //   queryFn: () => update()
  // })
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
    <div className="min-h-screen bg-linear-to-b from-black to-gray-900 ">
      {/* Header */}
      <Header />

      <main className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <HeroSection comics={POPULAR_COMICS_DUMMY ?? []} />
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Recommendations */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl text-white font-bold mb-6 flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-red-400" />
                Top Recommendations
                <div className="h-px flex-1 bg-linear-to-r from-red-500 to-transparent"></div>
              </h2>
              {/* Tab Navigation */}
              {/* Tab Navigation */}
              <div className="flex items-center gap-8 mb-8 border-b border-gray-800">
                {TABS.map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`
        pb-4 px-1 font-semibold text-lg
        flex items-center gap-2
        transition-colors
        ${activeTab === key
                        ? "text-white border-b-2 border-red-500"
                        : "text-gray-400 hover:text-white"
                      }
      `}
                  >
                    <Icon className="w-5 h-5" />
                    {label}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {DUMMY_COMICS.map((comic) => (
                  <BaseComicCard comic={comic} />
                ))}
              </div>
            </div>

            {/* Popular Section */}
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Flame className="w-6 h-6 text-orange-400" />
                Popular All Time
                <div className="h-px flex-1 bg-linear-to-r from-orange-500 to-transparent"></div>
              </h2>


              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {POPULAR_COMICS_DUMMY.map((comic) => (
                  <PopularComicCard
                    comic={comic}
                  />
                ))}

              </div>
            </div>
          </div>

          {/* Right Column - Latest Updates */}
          <div className="space-y-6">
            <div className="bg-linear-to-b from-gray-900/50 to-black/50 rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Clock className="w-6 h-6 text-green-400" />
                Latest Updates
                <div className="h-px flex-1 bg-linear-to-r from-green-500 to-transparent"></div>
              </h2>

              <div className="space-y-4">
                {UPDATE_COMICS_DUMMY.map((comic) => (
                  <UpdateComicCard comic={comic} />
                ))}
              </div>

              <button className="w-full mt-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
                View All Updates
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}