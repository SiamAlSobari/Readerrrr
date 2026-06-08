import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  BookOpen,
  Sparkles,
  TrendingUp,
  Clock,
  Shield,
  Zap,
  ChevronRight,
  Library,
  Heart,
  Star,
  ScrollText,
  Flame,
} from "lucide-react";

export const Route = createFileRoute("/_main/")({
  component: App,
  head: ({ match }) => ({
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

      // Open Graph
      { property: "og:title", content: "KOMIK READER – Baca KOMIK Online Gratis" },
      {
        property: "og:description",
        content:
          "Baca ribuan KOMIK online terbaru dan populer di KOMIK READER. Gratis dan mudah diakses.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `https://komik-reader.my.id${match.pathname}` },
      { property: "og:image", content: "/komik_reader.png" },

      // Twitter Card
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
      { rel: "canonical", href: `https://komik-reader.my.id${match.pathname}` },
    ],
    title: "KOMIK READER – Baca KOMIK Online Gratis",
  }),
});

function App() {
  const navigate = useNavigate();

  const features = [
    {
      icon: BookOpen,
      title: "Ribuan Koleksi",
      description: "Manga, Manhwa, dan Manhua terlengkap dalam satu tempat",
      iconColor: "text-blue-400",
    },
    {
      icon: Zap,
      title: "Update Cepat",
      description: "Chapter terbaru update setiap hari tanpa delay",
      iconColor: "text-yellow-400",
    },
    {
      icon: Shield,
      title: "100% Gratis",
      description: "Baca sepuasnya tanpa biaya berlangganan",
      iconColor: "text-green-400",
    },
    {
      icon: Heart,
      title: "Bookmark Favorit",
      description: "Simpan dan track komik favorit kamu dengan mudah",
      iconColor: "text-pink-400",
    },
  ];

  const stats = [
    { value: "10,000+", label: "Judul Komik", icon: BookOpen },
    { value: "50,000+", label: "Chapter", icon: Library },
    { value: "100K+", label: "Pembaca Aktif", icon: Heart },
    { value: "Daily", label: "Update", icon: Clock },
  ];

  const genres = [
    { name: "Action", icon: Flame },
    { name: "Romance", icon: Heart },
    { name: "Fantasy", icon: Sparkles },
    { name: "Comedy", icon: Star },
    { name: "Drama", icon: TrendingUp },
    { name: "Horror", icon: BookOpen },
    { name: "Slice of Life", icon: ScrollText },
    { name: "Mystery", icon: Library },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-black to-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 py-20 overflow-hidden">
        {/* Animated Background - More Subtle */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto relative z-10 max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-red-500/10 border border-red-500/20 rounded-full"
            >
              <Sparkles className="w-4 h-4 text-red-400" />
              <span className="text-sm font-semibold text-red-400">
                Platform Baca Komik Terbaik
              </span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Baca Komik Favoritmu
              <br />
              <span className="text-red-400">Kapan Saja, Dimana Saja</span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Nikmati ribuan judul Manga, Manhwa, dan Manhua terbaru dengan
              kualitas HD. Gratis, tanpa iklan mengganggu!
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate({ to: "/home" })}
                className="group px-8 py-4 bg-red-500 hover:bg-red-600 rounded-xl font-semibold text-lg transition-colors shadow-lg shadow-red-500/20 flex items-center gap-2"
              >
                Mulai Baca Sekarang
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate({ to: "/genre" })}
                className="px-8 py-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl font-semibold text-lg transition-colors"
              >
                Jelajahi Genre
              </motion.button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-4 sm:p-6 hover:border-gray-700 transition-colors"
              >
                <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-red-400" />
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-gray-400 mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-red-400" />
              Kenapa Pilih Kami?
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              Platform terbaik dengan fitur lengkap dan pengalaman membaca yang
              maksimal
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-gray-700 hover:bg-gray-800/50 transition-all group"
              >
                <feature.icon
                  className={`w-10 h-10 ${feature.iconColor} mb-4 group-hover:scale-110 transition-transform`}
                />
                <h3 className="text-xl font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gray-900/30">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <Library className="w-6 h-6 sm:w-8 sm:h-8 text-orange-400" />
              Genre Populer
            </h2>
            <p className="text-gray-400 text-base sm:text-lg">
              Temukan komik favoritmu dari berbagai genre
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {genres.map((genre, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  navigate({
                    to: "/genre",
                    search: { g: genre.name.toLowerCase() },
                  })
                }
                className="bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 hover:border-gray-600 rounded-xl p-6 transition-all font-semibold text-white flex items-center justify-center gap-2"
              >
                <genre.icon className="w-5 h-5" />
                {genre.name}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-3xl p-8 sm:p-12 text-center"
          >
            <Star className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-400 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Siap Memulai Petualangan?
            </h2>
            <p className="text-gray-300 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
              Bergabung dengan jutaan pembaca lainnya dan temukan komik
              favoritmu sekarang juga!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate({ to: "/home" })}
              className="px-10 py-4 bg-red-500 hover:bg-red-600 rounded-xl font-bold text-lg transition-colors shadow-lg shadow-red-500/20 inline-flex items-center gap-3"
            >
              Jelajahi Sekarang
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
