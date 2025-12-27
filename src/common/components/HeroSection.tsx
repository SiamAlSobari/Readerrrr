import { Book, Star, Trophy } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="relative h-[500px] overflow-hidden rounded-2xl mb-8">
      
      {/* Background Image */}
      <div
        className="
          absolute inset-0
          bg-[url('https://storage.shngm.id/low/unsafe/filters:format(webp):quality(70)/thumbnail/image/3f434882-1e65-4f8b-ae56-381e6b731cfc.jpg')]
          bg-cover bg-center
          scale-105
          transition-transform duration-700
        "
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center px-8">
        <div className="max-w-xl space-y-6">
          
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-full">
              TRENDING NOW
            </span>
            <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm font-semibold rounded-full">
              Manhwa
            </span>
          </div>

          <h1 className="text-5xl font-bold text-white leading-tight">
            I Killed An Academy Player
          </h1>

          <p className="text-gray-300 text-lg line-clamp-2">
            Dari author series The Knight King Who Returned with a God<br />
            Aku sudah membunuh sang player<br />
            Dia adalah bajingan yang sangat menyebalkan
          </p>

          <div className="flex items-center gap-6 text-white">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="text-xl font-bold">3</span>
            </div>
            <div className="flex items-center gap-2">
              <Book className="w-5 h-5 text-orange-400" />
              <span className="text-lg">123 chapter</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-purple-400" />
              <span className="text-lg">1 rank</span>
            </div>
          </div>

          <button className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-transform hover:scale-105">
            Read Now
          </button>
        </div>
      </div>
    </div>
  );
}
