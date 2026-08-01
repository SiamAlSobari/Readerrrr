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
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) return []
    const parsed = JSON.parse(data)
    if (!Array.isArray(parsed)) return []

    // Deduplicate by comic_id to guarantee unique keys and clean history state
    const seen = new Set<string>()
    const unique: ChapterHistory[] = []
    for (const item of parsed) {
      if (item && item.comic_id && !seen.has(item.comic_id)) {
        seen.add(item.comic_id)
        unique.push(item)
      }
    }
    return unique
  } catch (e) {
    console.error('Error reading chapter history:', e)
    return []
  }
}

export const setChapterHistory = (history: ChapterHistory) => {
  if (typeof window === 'undefined' || !history.comic_id) return

  const histories = getChapterHistory()

  // Find existing entry if available to preserve missing title/cover
  const existing = histories.find((h) => h.comic_id === history.comic_id)

  const mergedHistory: ChapterHistory = {
    ...history,
    comic_title: history.comic_title || existing?.comic_title,
    comic_cover_url: history.comic_cover_url || existing?.comic_cover_url,
  }

  // Deduplicate by comic_id: keep only the latest read chapter per comic
  const filtered = histories.filter((h) => h.comic_id !== history.comic_id)

  filtered.unshift(mergedHistory)

  // Save up to 500 items in localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered.slice(0, 500)))
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
