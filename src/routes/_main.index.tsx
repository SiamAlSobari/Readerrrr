import { Comic } from '@/common/interface'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Search, Bookmark, Flame, TrendingUp, Clock, Star, ChevronRight, BookOpen, Library, ScrollText } from 'lucide-react'
import Header from '@/common/components/Header'
import HeroSection from '@/common/components/HeroSection'
import { useServerFn } from '@tanstack/react-start'
import { getComicRecomendation } from '@/api/servers/shinigami.server'
import { useQuery } from '@tanstack/react-query'
import ComicCard from '@/features/comic/ComicCard'

export const Route = createFileRoute('/_main/')({ component: App })


function App() {
  const [activeTab, setActiveTab] = useState('manhwa')
  const recommendation = useServerFn(getComicRecomendation)
  const { data: comicRecomendation } = useQuery({
    queryKey: ['recomendation', activeTab],
    queryFn: () => recommendation()
  })

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
  const dummyData = [
    {
      "manga_id": "e113cf28-241b-46f8-b27c-deb8e17b15eb",
      "title": "I Killed An Academy Player",
      "alternative_title": "아카데미 플레이어를 죽였다, I Killed the Player of the Academy",
      "description": "Dari author series The Knight King Who Returned with a God\nAku sudah membunuh sang player\nDia adalah bajingan yang sangat menyebalkan",
      "cover_image_url": "https://storage.shngm.id/low/unsafe/filters:format(webp):quality(70)/thumbnail/image/3f434882-1e65-4f8b-ae56-381e6b731cfc.jpg",
      "cover_portrait_url": "https://storage.shngm.id/low/unsafe/filters:format(webp):quality(70)/thumbnail/image/a9c6577f-2dc2-42ec-b39b-1b1538efc20a.jpg",
      "country_id": "KR",
      "release_year": "2023",
      "status": 1,
      "bookmark_count": 31866,
      "view_count": 12231755,
      "user_rate": 8.5,
      "latest_chapter_number": 104,
      "latest_chapter_id": "01ca45e3-7bed-436f-a117-8f9b7e62b6da",
      "chapters": [
        {
          "chapter_id": "01ca45e3-7bed-436f-a117-8f9b7e62b6da",
          "chapter_number": 104,
          "created_at": "2025-12-27T15:27:40Z"
        },
        {
          "chapter_id": "89d3a580-2154-4c1d-98eb-ca62362821ee",
          "chapter_number": 103,
          "created_at": "2025-12-20T02:31:20Z"
        }
      ],
      "taxonomy": {
        "Artist": [{ "name": "Greenkyrin", "slug": "greenkyrin" }],
        "Author": [{ "name": "Salamsallyeo", "slug": "salamsallyeo" }],
        "Format": [{ "name": "Manhwa", "slug": "manhwa" }],
        "Genre": [
          { "name": "Action", "slug": "action" },
          { "name": "Adventure", "slug": "adventure" },
          { "name": "Fantasy", "slug": "fantasy" }
        ],
        "Type": [{ "name": "Project", "slug": "project" }]
      }
    },
    {
      "manga_id": "73f1ddd8-5206-4e3b-8b7a-365573ab5136",
      "title": "After Rebirth, I Used Mirror Reversal For Vengeance",
      "alternative_title": "重生后我用镜面反转复仇",
      "description": "50 tahun setelah dunia game menyatu dengan kenyataan, seorang pejuang terhebat muncul. Ia mendedikasikan seluruh hidupnya untuk dunia tersebut, namun akhirnya dibunuh oleh sang raja karena rasa takut dan iri hati.",
      "cover_image_url": "https://storage.shngm.id/low/unsafe/filters:format(webp):quality(70)/thumbnail/image/3b95adb9-f0af-42a5-891c-aed2ff9ad454.jpg",
      "cover_portrait_url": "https://storage.shngm.id/low/unsafe/filters:format(webp):quality(70)/thumbnail/image/ba367f76-60e0-4416-8b88-0422e22e2577.jpg",
      "country_id": "CN",
      "release_year": "2024",
      "status": 1,
      "bookmark_count": 13391,
      "view_count": 2174843,
      "user_rate": 8.5,
      "latest_chapter_number": 36,
      "latest_chapter_id": "fd4e2b7b-5b01-49a4-b1bd-2f10c9280e15",
      "chapters": [
        {
          "chapter_id": "fd4e2b7b-5b01-49a4-b1bd-2f10c9280e15",
          "chapter_number": 36,
          "created_at": "2025-12-27T15:27:08Z"
        },
        {
          "chapter_id": "cc649135-4432-46c9-b9b1-ba861e4e703b",
          "chapter_number": 35,
          "created_at": "2025-12-25T04:36:14Z"
        }
      ],
      "taxonomy": {
        "Artist": [{ "name": "Menyusul", "slug": "menyusul-0" }],
        "Author": [{ "name": "Menyusul", "slug": "menyusul" }],
        "Format": [{ "name": "Manhua", "slug": "manhua" }],
        "Genre": [{ "name": "Action", "slug": "action" }],
        "Type": [{ "name": "Project", "slug": "project" }]
      }
    }
  ]

  // Hero Section Component

  // Manga Card Component
  const MangaCard = ({ manga }: { manga: typeof dummyData[0] }) => (
    <div className="group relative bg-gradient-to-b from-gray-900 to-black rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
      <div className="relative h-64 overflow-hidden">
        <img
          src={manga.cover_image_url}
          alt={manga.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

        <div className="absolute top-4 left-4 flex gap-2">
          <span className="px-2 py-1 bg-black/70 backdrop-blur-sm text-white text-xs font-bold rounded-md">
            {manga.taxonomy.Format[0].name}
          </span>
          <span className="px-2 py-1 bg-red-500/90 text-white text-xs font-bold rounded-md flex items-center gap-1">
            <Star className="w-3 h-3 fill-white" />
            {manga.user_rate}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-bold text-lg line-clamp-1">{manga.title}</h3>
          <div className="flex items-center justify-between mt-2">
            <span className="text-gray-300 text-sm">Chap {manga.latest_chapter_number}</span>
            <span className="text-green-400 text-sm font-semibold">
              {manga.country_id === 'KR' ? '🇰🇷' : '🇨🇳'}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex flex-wrap gap-1 mb-3">
          {manga.taxonomy.Genre.slice(0, 3).map((genre, index) => (
            <span key={index} className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-md">
              {genre.name}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>Updated</span>
          </div>
          <span className="text-green-400">
            {new Date(manga.chapters[0].created_at).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'short'
            })}
          </span>
        </div>
      </div>

      <button className="absolute right-4 bottom-4 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <ChevronRight className="w-5 h-5 text-white" />
      </button>
    </div>
  )

  // Latest Update Card
  const UpdateCard = ({ manga }: { manga: typeof dummyData[0] }) => (
    <div className="flex gap-4 p-4 bg-gradient-to-r from-gray-900/50 to-black/50 rounded-2xl hover:bg-gray-800/30 transition-all duration-300">
      <div className="relative w-24 h-32 flex-shrink-0 overflow-hidden rounded-xl">
        <img
          src={manga.cover_image_url}
          alt={manga.title}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-center py-1">
          <span className="text-white text-sm font-bold">Ch{manga.latest_chapter_number}</span>
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-white font-bold line-clamp-1 mb-1">{manga.title}</h4>
        <p className="text-gray-400 text-sm line-clamp-2 mb-3">
          {manga.description.split('\n')[0]}
        </p>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <span className="text-gray-300">{manga.taxonomy.Format[0].name}</span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-yellow-400">{manga.user_rate}</span>
            </div>
          </div>
          <span className="text-green-400 text-xs">
            {new Date(manga.chapters[0].created_at).toLocaleTimeString('id-ID', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-linear-to-b from-black to-gray-900 ">
      {/* Header */}
      <Header />

      <main className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <HeroSection />



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
                {comicRecomendation?.data.data.map((comic) => (
                  <ComicCard comic={comic} />
                ))}
              </div>
            </div>

            {/* Popular Section */}
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Flame className="w-6 h-6 text-orange-400" />
                Popular This Week
                <div className="h-px flex-1 bg-gradient-to-r from-orange-500 to-transparent"></div>
              </h2>


              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...dummyData].reverse().map((manga) => (
                  <MangaCard key={manga.manga_id} manga={manga} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Latest Updates */}
          <div className="space-y-6">
            <div className="bg-gradient-to-b from-gray-900/50 to-black/50 rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Clock className="w-6 h-6 text-green-400" />
                Latest Updates
                <div className="h-px flex-1 bg-gradient-to-r from-green-500 to-transparent"></div>
              </h2>

              <div className="space-y-4">
                {dummyData.map((manga) => (
                  <UpdateCard key={manga.manga_id} manga={manga} />
                ))}
              </div>

              <button className="w-full mt-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
                View All Updates
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Stats Widget */}
            <div className="bg-gradient-to-b from-gray-900/50 to-black/50 rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-4">Today's Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total Updates</span>
                  <span className="text-white font-bold">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Active Readers</span>
                  <span className="text-green-400 font-bold">1.2M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">New Chapters</span>
                  <span className="text-red-400 font-bold">48</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-gray-800 py-8">
        <div className="container mx-auto px-6 text-center text-gray-400">
          <p>© 2024 MangaReader. All rights reserved.</p>
          <p className="mt-2 text-sm">Read your favorite manga anytime, anywhere</p>
        </div>
      </footer>
    </div>
  )
}