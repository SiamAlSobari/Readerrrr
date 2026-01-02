import { motion } from 'framer-motion'
import { SearchX } from 'lucide-react'
export default function NoResultComicGenre() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 1.6 }}
        className="mb-4"
      >
        <SearchX className="w-14 h-14 text-muted-foreground" />
      </motion.div>

      <h3 className="font-semibold text-lg">Tidak ada komik</h3>
      <p className="text-sm text-muted-foreground max-w-sm">
        Komik dengan genre ini belum tersedia atau sedang kosong
      </p>
    </motion.div>
  )
}
