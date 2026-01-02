import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Button } from '@/common/shadcn-ui/button'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-6xl md:text-8xl font-extrabold text-red-500">404</h1>
        <p className="mt-4 text-lg md:text-xl text-gray-300">
          Oops! Halaman yang kamu cari tidak ditemukan.
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Button
          asChild
          size="lg"
          className="bg-red-500 hover:bg-red-600 text-white"
        >
          <Link to="/">Kembali ke Beranda</Link>
        </Button>
      </motion.div>

      <motion.div
        initial={{ rotate: -10, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-12 max-w-sm mx-auto"
      >
        {/* Bisa taruh ilustrasi manga / logo disini */}
        <img
          src="/komik_reader.png"
          alt="Manga Reader Logo"
          className="w-48 md:w-64 mx-auto opacity-80"
        />
      </motion.div>
    </div>
  )
}
