export interface ChapterHistory {
    chapter_id: string
    chapter_number: number
    comic_id: string
    last_read_time: number
    comic_title?: string
    comic_cover_url?: string
}


const STORAGE_KEY = 'chapter-history'
export function getChapterHistory(): ChapterHistory[] {
    if (typeof window === 'undefined') {
        return []
    }
    const data = localStorage.getItem(STORAGE_KEY)
    if (data) {
        return JSON.parse(data)
    }
    return []
}

export const setChapterHistory = (history: ChapterHistory) => {
    if (typeof window === 'undefined') return

    const histories = getChapterHistory()

    // Ambil data lama kecuali data yang sama dengan data baru
    // Hapus data yang sama
    const filtered = histories.filter(
        (h) => !(h.comic_id === history.comic_id && h.chapter_id === history.chapter_id)
    )

    // Tambahkan data baru
    filtered.unshift(history)

    // Simpan ke localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered.slice(0, 1000)))
}

export function getLastReadChapter(comicId: string) {
  return getChapterHistory().find((h) => h.comic_id === comicId)
}

export function clearAllHistory() {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}

export function deleteHistoryItem(comicId: string) {
  if (typeof window === 'undefined') return
  const histories = getChapterHistory()
  const filtered = histories.filter((h) => h.comic_id !== comicId)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
}
