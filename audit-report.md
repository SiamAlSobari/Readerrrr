# Project Analysis, Security, Bug & Performance Report

Berdasarkan hasil eksplorasi pada *workspace* codebase web manga/comic ini, terdapat berbagai temuan seputar *Security (XSS)*, *Performance*, *Bugs*, serta *SSR/SEO flaws*. Berikut adalah detail dari setiap temuan dan rekomendasinya:

## 1. Security Vulnerabilities (XSS)
- **File:** `src/common/components/JsonLd.tsx`
- **Tingkat Keparahan:** 🔴 Tinggi
- **Detail:** Penggunaan `dangerouslySetInnerHTML` dengan `JSON.stringify(data)` tidak melakukan *escaping* terhadap karakter kurung sudut `<`. Jika data JSON ini berasal dari backend/user input dan berisi string seperti `</script><script>alert('XSS')</script>`, maka script tersebut akan langsung dieksekusi.
- **Rekomendasi:** Lakukan replacing (escape) terhadap karakter `<` sebelum diparsing:
  ```typescript
  __html: JSON.stringify(data).replace(/</g, '\\u003c')
  ```

## 2. SSR & SEO Blocker Blunder
- **File:** `src/common/providers/theme-provider.tsx` dan `src/routes/_main.tsx`
- **Tingkat Keparahan:** 🔴 Tinggi (Berpengaruh pada SEO)
- **Detail:** Pada `ThemeProvider` terdapat `hydration safeguard` berupa:
  ```tsx
  const [mounted, setMounted] = useState(false)
  // ...
  if (!mounted) return null;
  ```
  Masalahnya, _theme provider_ ini membungkus seluruh layout (`<Header>`, `<Outlet>`, `<Footer>`) di dalam `_main.tsx`. Akibatnya, pada saat SSR (Server-Side Rendering), server hanya me-render `<body>` yang kosong. Crawler SEO (seperti Googlebot) tidak akan bisa membaca konten halaman sebelum Client-Side Rendering berjalan.
- **Rekomendasi:** Hapus *early return* `(!mounted)` yang menghalangi rendering `children`. Gunakan pendekatan lain untuk menghindari *hydration mismatch* (misalnya dengan menggunakan *defaultTheme* untuk initial server render, lalu biarkan *client* menyesuaikan nanti dengan CSS override / useEffect data).

## 3. Network Waterfalls (Isu Performa)
Dua loader di bawah ini mengeksekusi fetch secara berurutan/beruntun (blocking sequential fetching), padahal data-nya tidak saling bergantung.
- **File:** `src/routes/_main.series.$comicId.index.tsx`
  - **Detail:** `getChapterList` menunggu `getComicDetail` selesai di-fetch.
- **File:** `src/routes/_main.home.tsx`
  - **Detail:** 3 fungsi `ensureQueryData` (`queryPopularComic`, `queryUpdateComic`, `queryRecommendation`) memakai `await` berderet.
- **Rekomendasi:** Bungkus fetcher tersebut menggunakan `Promise.all()` agar query berjalan secara paralel, sehingga secara drastis memangkas waktu load.

## 4. API & Backend Logic Bugs
- **File:** `src/api/servers/shinigami.server.ts`
  - **Bug Pagination:** Pada endpoint `getComicUpdate`, argumen paginasi (`page` dsb) **diabaikan** sepenuhnya. Kode tersebut secara *hardcoded* memanggil `shinigamiService.getComicUpdate("mirror", 1, 6)`. User yang membuka halaman 2 atau 3 tetap akan disuguhi data dari halaman 1.
  - **Code Duplication:** Fungsi `genGenreList` sepenuhnya menduplikasi fungsi `getGenreList` secara identik.
- **File:** `src/common/libs/redis.ts`
  - **Sisa Debugging (Leftover Bug):** Terdapat skrip test di level top module: `await client.set('foo', 'bar');`. Pemanggilan ini menahan/hook inisialisasi modul, dan **akan langsung menyebabkan aplikasi crash (panic)** jika server Redis sedang mati atau lamban karena tidak dibungkus `try/catch`. Hapus saja.

## 5. Caching & Request Header Spoofing (Architecture)
- **File:** `src/api/services/shinigami.service.ts`
  - **Missing Cache:** Endpoint krusial yang paling sering dipanggil (seperti `getComicUpdate`, `getComicDetail`, `getChapterList`) malah belum mengimplementasikan Cache Redis.
  - **Cache Poisoning Vulerability:** Beberapa fungsi yang memakai cache (contoh: `getComicRecomendation`) dengan polos melakukan caching data secara membabi buta dari `res.data`. Jika request return error `500` / data down dari API origin namun tidak dihandle, apps akan me-nyimpan response error (atau data kosong) tersebut ke dalam Redis Caching selama 7 hari (`604800` detik).
  - **Header Spoofing Hardcode:** Di dalam constructor `ShinigamiService`, nilai origin di-*hardcode* sebagai `"https://09.shinigami.asia/"`. Namun, fungsi API Fetch justru memanggil ENV `"API_URL"`. Jika sewaktu-waktu domain shinigami berubah di `.env`, header *Origin* & *Referer* yang dikirim tetep mengelabui diri memakai `09` tersebut. Hal ini sangat rentan kena blokir (HTTP 403 WAF) oleh peladen origin.
  
## 6. UX & Client-Side Optimizations 
- **File:** `src/common/components/Header.tsx`
  - **Broken UX:** Komponen pencarian (Search Input) menampilkan teks bantuan *shortcut* UX berupa tulisan `⌘K`, sayangnya aplikasinya **tidak** memiliki event listener *keyboard shortcut* (di file tersebut) yang mengikat pencetan tuts *Command+K* tersebut untuk meletakkan `focus()` pada inputan bar search. Ini akan membingungkan pengguna.
- **File:** `src/features/comic/UpdateComicCard.tsx`
  - **Performa Loop (Scraping Memory):** Fungsi format `formatTimeAgo` terus menerus membangkitkan instance `new Date()` pada tiap re-render masing-masing *Comic Card*. Saat *infinite scroll* digunakan dan terdapat banyak list, RAM + Scripting Time browser dapat termakan lumayan berat secara tidak perlu, apalagi komponen Card ini tidak di-balut dengan `React.memo`.

## 7. Optimasi Gambar (Image Optimizations)
- **File:** `src/features/comic/BaseComicCard.tsx` & `src/features/chapter/ChapterList.tsx`
  - **Isu:** Tag `<img>` di komponen ini tidak mempunyai atribut `loading="lazy"` maupun `decoding="async"`. Apabila ada puluhan komik di-load di Grid (seperti Popular / Updates), browser akan mencoba mengunduh puluhan gambar serta nge-decode sekaligus dan menghambat Main Thread.
  - **Rekomendasi:** Tambahkan atribut `loading="lazy"` serta `decoding="async"` di seluruh item *list/grid*.

- **File:* `src/features/chapter/ChapterImage.tsx`
  - **Isu:** Walaupun mungkin ada "lazy", jika gambar ini adalah halaman pembuka atau pembaca pertama (LCP - Largest Contentful Paint), `lazy` justru dapat mendeley *First Contentful Paint*. 
  - **Rekomendasi:** Beri opsi agar gambar pertama memuat via `fetchpriority="high"` dan tidak menggunakan lazy load (gunakan `eager`), sedangkan sisa chapter di bawahnya pakai lazy loading.

## 8. React Query (Tanstack) Refetch & Stale Time
- **File:** `src/integrations/tanstack-query/root-provider.tsx`
  - **Isu:** `QueryClient` diinisialisasi polosan. Ini mengakibatkan `staleTime` secara bawaan adalah `0`. Hasilnya cache seketika dianggap basi; React Query akan agresif me-refetch API ke *backend* ketika pengguna baru pindah window/tab (focus) atau komponen mount ulang.
  - **Rekomendasi:** Tetapkan nilai default secara global (misal `staleTime: 60 * 1000` setidaknya untuk 1 menit).

## 9. Bundle Size & Virtualization List
- **Isu Bundle (Framer Motion):** Pada file seperti `BaseComicCard.tsx`, import utuh dari `framer-motion` seperti `import { motion } from "framer-motion";` sangat memperbesar target *JavaScript bundle size*. Sangat dianjurkan pindah menggunakan `LazyMotion` dan tag `m`.
- **Isu DOM Raksasa (Virtualization):** Render ratusan Chapter pada `ChapterList.tsx` langsung ke DOM akan membuat lamban peramban (*lagging* / memory menanjak). Sebaiknya gunakan pustaka seperti `@tanstack/react-virtual` agar memori hanya menyisihkan resource-node komponen DOM yang kebetulan sedang muncul di layar (viewport) saja.
