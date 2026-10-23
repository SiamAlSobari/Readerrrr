# Graph Report - web  (2026-10-23)

## Corpus Check
- 94 files · ~626,765 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 528 nodes · 791 edges · 58 communities (30 shown, 28 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 27 edges (avg confidence: 0.63)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `75860a95`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- ShinigamiService
- routeTree.gen.ts
- cn
- read.$comicId.$chapterId.index.tsx
- devDependencies
- shinigami.server.ts
- compilerOptions
- Komik READER Project
- components.json
- index.ts
- _main.tsx
- Caveman Commit Skill
- dependencies
- Graphify Rules
- RTK - Rust Token Killer (Google Antigravity)
- class-variance-authority
- date-fns
- dotenv
- ioredis
- lucide-react
- motion
- _main.update.index.tsx
- @radix-ui/react-dialog
- @radix-ui/react-scroll-area
- @radix-ui/react-slot
- react-dom
- __root.tsx
- tailwindcss
- @tailwindcss/vite
- @tanstack/react-devtools
- @tanstack/react-query
- @tanstack/react-query-devtools
- @tanstack/react-router
- @tanstack/react-router-devtools
- @tanstack/react-router-ssr-query
- @tanstack/react-start
- @tanstack/react-store
- @tanstack/store
- _main.series.$comicId.index.tsx
- vite-tsconfig-paths
- zod
- vite.config.ts
- _main.popular.index.tsx
- Phase 2 — Page-by-Page Audit
- _main.search.index.tsx
- FileRoutesByPath
- 📋 Laporan Hasil Pengujian: Full E2E Testing - Komik Reader (Landing, Home, Detail, Reader, History)
- 📋 Laporan Hasil Pengujian: E2E Testing Report - Komik Reader
- 📋 Laporan Hasil Pengujian: Full Site Quality Audit - Komik Reader Headed Mode
- router.tsx
- 📋 Laporan Hasil Pengujian: Full Site Quality Audit - KOMIK READER
- 📋 Laporan Hasil Pengujian: E2E Testing Flow - Landing, Home, Comic Detail, and Comic Reader
- cheerio
- react
- axios
- clsx
- @tanstack/router-plugin

## God Nodes (most connected - your core abstractions)
1. `cn()` - 34 edges
2. `compilerOptions` - 18 edges
3. `ShinigamiService` - 16 edges
4. `Komik READER Project` - 15 edges
5. `FileRoutesByPath` - 14 edges
6. `getEnv` - 13 edges
7. `Button()` - 12 edges
8. `JsonLd()` - 9 edges
9. `PopularComic` - 9 edges
10. `📋 Laporan Hasil Pengujian: Full E2E Testing - Komik Reader (Landing, Home, Detail, Reader, History)` - 7 edges

## Surprising Connections (you probably didn't know these)
- `Komik Reader UI Screenshot` --conceptually_related_to--> `Komik READER`  [INFERRED]
  public/komik_reader.png → README.md
- `Logo SVG` --conceptually_related_to--> `Komik READER`  [INFERRED]
  src/logo.svg → README.md
- `Network Waterfall Performance` --conceptually_related_to--> `TanStack Query`  [INFERRED]
  audit-report.md → README.md
- `Header Spoofing` --conceptually_related_to--> `Shinigami API`  [INFERRED]
  audit-report.md → README.md
- `RootDocument()` --references--> `react`  [EXTRACTED]
  src/routes/__root.tsx → package.json

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Caveman Tool Suite** — agents_skills_caveman_skill, agents_skills_caveman_commit_skill, agents_skills_caveman_help_skill [EXTRACTED 0.90]
- **Komik READER Tech Stack** — concept_react_19, concept_tanstack_router, concept_tanstack_query, concept_tanstack_start, concept_shadcn_ui, concept_tailwind_css, concept_vite, concept_axios, concept_framer_motion [EXTRACTED 0.95]
- **Audit Findings** — concept_xss_vulnerability, concept_ssr_seo_blocker, concept_network_waterfall, concept_cache_poisoning, concept_header_spoofing, concept_hydration_mismatch [EXTRACTED 0.95]

## Communities (58 total, 28 thin omitted)

### Community 0 - "ShinigamiService"
Cohesion: 0.23
Nodes (4): ShinigamiService, createAxiosClient(), getScraperHeaders(), getEnv

### Community 1 - "routeTree.gen.ts"
Cohesion: 0.09
Nodes (21): Route, FileRoutesByFullPath, FileRoutesByTo, FileRouteTypes, MainGenreIndexRoute, MainHistoryIndexRoute, MainHomeRoute, MainIndexRoute (+13 more)

### Community 2 - "cn"
Cohesion: 0.07
Nodes (39): Meta, TaxonomyItem, cn(), Badge(), badgeVariants, Button(), buttonVariants, Card() (+31 more)

### Community 3 - "read.$comicId.$chapterId.index.tsx"
Cohesion: 0.12
Nodes (21): getChapterDetail, getComicDetail, filterAndRankChapters(), ChapterHistory, clearAllHistory(), deleteHistoryItem(), getChapterHistory(), getLastReadChapter() (+13 more)

### Community 4 - "devDependencies"
Cohesion: 0.05
Nodes (39): jsdom, devDependencies, jsdom, @tanstack/devtools-event-client, @tanstack/devtools-vite, @testing-library/dom, @testing-library/react, tw-animate-css (+31 more)

### Community 5 - "shinigami.server.ts"
Cohesion: 0.13
Nodes (19): genGenreList, getComicGenre, getGenreList, comicChapterDetailValidation, comicChapterListValidation, comicDetailValidation, comicGenreValidation, comicPaginationValidation (+11 more)

### Community 6 - "compilerOptions"
Cohesion: 0.07
Nodes (27): DOM, DOM.Iterable, ES2022, scripts/generate.js, src/features/comic/PopularComicCardBase.tsx, **/*.ts, **/*.tsx, vite/client (+19 more)

### Community 7 - "Komik READER Project"
Cohesion: 0.09
Nodes (26): Security & Performance Audit Report, Axios HTTP Client, Cache Poisoning Vulnerability, Cheerio Web Scraping, date-fns Date Handling, Framer Motion Animation, Header Spoofing, Hydration Mismatch (+18 more)

### Community 8 - "components.json"
Cohesion: 0.11
Nodes (18): aliases, components, hooks, lib, ui, utils, iconLibrary, registries (+10 more)

### Community 9 - "index.ts"
Cohesion: 0.05
Nodes (44): getComicRecomendation, HeroSlider(), Props, DUMMY_CHAPTER_DETAIL, DUMMY_CHAPTERS, DUMMY_COMIC_DETAIL, DUMMY_COMICS, POPULAR_COMICS_DUMMY (+36 more)

### Community 10 - "_main.tsx"
Cohesion: 0.18
Nodes (8): Footer(), Header(), Theme, ThemeProvider(), ThemeProviderContext, ThemeProviderProps, ThemeProviderState, Route

### Community 11 - "Caveman Commit Skill"
Cohesion: 0.20
Nodes (11): Caveman Commit README, Caveman Commit Skill, Caveman Help README, Caveman Help Skill, Caveman Mode README, Caveman Mode Skill, Caveman Intensity Modes, Conventional Commits (+3 more)

### Community 12 - "dependencies"
Cohesion: 0.22
Nodes (9): nitro, dependencies, nitro, @radix-ui/react-separator, tailwind-merge, @vercel/analytics, @radix-ui/react-separator, tailwind-merge (+1 more)

### Community 13 - "Graphify Rules"
Cohesion: 0.50
Nodes (4): Graphify Rules, Graphify Workflow, Graphify Pipeline, Knowledge Graph

### Community 14 - "RTK - Rust Token Killer (Google Antigravity)"
Cohesion: 0.40
Nodes (4): Meta Commands, RTK - Rust Token Killer (Google Antigravity), Rule, Why

### Community 21 - "_main.update.index.tsx"
Cohesion: 0.40
Nodes (3): getComicUpdate, ComicCard, Route

### Community 26 - "__root.tsx"
Cohesion: 0.40
Nodes (3): MyRouterContext, Route, FileRoutesById

### Community 38 - "_main.series.$comicId.index.tsx"
Cohesion: 0.33
Nodes (4): getChapterList, ComicDetailSkeleton(), ChapterSearch, Route

### Community 43 - "_main.popular.index.tsx"
Cohesion: 0.24
Nodes (5): getPopularComic, JsonLd(), Route, ComicSearch, Route

### Community 44 - "Phase 2 — Page-by-Page Audit"
Cohesion: 0.18
Nodes (10): 🔴 BUG-01 (Medium) — `/series/$comicId` 500s on missing comic, 🌐 Full-Site Quality Audit — KOMIK READER, 🟡 INFO-01 (Dev-only) — `/manifest.webmanifest` 404 in dev, 🟢 OK — No debug leftovers, 🟢 OK — No global ErrorComponent, 🟢 OK — Static assets, Phase 1 — Site Map & Route Discovery, Phase 2 — Page-by-Page Audit (+2 more)

### Community 45 - "_main.search.index.tsx"
Cohesion: 0.29
Nodes (3): searchComicServer, Route, Search

### Community 46 - "FileRoutesByPath"
Cohesion: 0.25
Nodes (7): Route, Route, Route, Route, GENRES, Route, FileRoutesByPath

### Community 47 - "📋 Laporan Hasil Pengujian: Full E2E Testing - Komik Reader (Landing, Home, Detail, Reader, History)"
Cohesion: 0.25
Nodes (7): 📸 Bukti Visual Kesalahan (Error Screenshots), 📋 Laporan Hasil Pengujian: Full E2E Testing - Komik Reader (Landing, Home, Detail, Reader, History), 🎯 Matriks Pengujian Tombol & Elemen Interaktif (Execution Steps), ⚡ Metrik Performa & Waktu Render Halaman, 💡 Rekomendasi Tindakan untuk Developer / AI Coding Agent, 📊 Ringkasan Eksekutif, 🚨 Temuan Isu, Console Error & Fetch Network Failure

### Community 48 - "📋 Laporan Hasil Pengujian: E2E Testing Report - Komik Reader"
Cohesion: 0.25
Nodes (7): 📸 Bukti Visual Kesalahan (Error Screenshots), 📋 Laporan Hasil Pengujian: E2E Testing Report - Komik Reader, 🎯 Matriks Pengujian Tombol & Elemen Interaktif (Execution Steps), ⚡ Metrik Performa & Waktu Render Halaman, 💡 Rekomendasi Tindakan untuk Developer / AI Coding Agent, 📊 Ringkasan Eksekutif, 🚨 Temuan Isu, Console Error & Fetch Network Failure

### Community 49 - "📋 Laporan Hasil Pengujian: Full Site Quality Audit - Komik Reader Headed Mode"
Cohesion: 0.25
Nodes (7): 📸 Bukti Visual Kesalahan (Error Screenshots), 📋 Laporan Hasil Pengujian: Full Site Quality Audit - Komik Reader Headed Mode, 🎯 Matriks Pengujian Tombol & Elemen Interaktif (Execution Steps), ⚡ Metrik Performa & Waktu Render Halaman, 💡 Rekomendasi Tindakan untuk Developer / AI Coding Agent, 📊 Ringkasan Eksekutif, 🚨 Temuan Isu, Console Error & Fetch Network Failure

### Community 50 - "router.tsx"
Cohesion: 0.29
Nodes (3): getRouter(), Register, routeTree

### Community 51 - "📋 Laporan Hasil Pengujian: Full Site Quality Audit - KOMIK READER"
Cohesion: 0.29
Nodes (6): 📸 Bukti Pengujian (Screenshots & Artifacts), 📋 Laporan Hasil Pengujian: Full Site Quality Audit - KOMIK READER, 💡 Rekomendasi untuk AI Coding Agent / Developer, 📊 Ringkasan Eksekusi, 🚨 Temuan Masalah & Error (Issues & Anomalies), 🚶 Urutan Langkah Pengujian (Execution Steps)

### Community 52 - "📋 Laporan Hasil Pengujian: E2E Testing Flow - Landing, Home, Comic Detail, and Comic Reader"
Cohesion: 0.29
Nodes (6): 📸 Bukti Pengujian (Screenshots & Artifacts), 📋 Laporan Hasil Pengujian: E2E Testing Flow - Landing, Home, Comic Detail, and Comic Reader, 💡 Rekomendasi untuk AI Coding Agent / Developer, 📊 Ringkasan Eksekusi, 🚨 Temuan Masalah & Error (Issues & Anomalies), 🚶 Urutan Langkah Pengujian (Execution Steps)

### Community 54 - "react"
Cohesion: 0.67
Nodes (3): react, react, RootDocument()

## Knowledge Gaps
- **210 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+205 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **28 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `devDependencies`, `class-variance-authority`, `date-fns`, `dotenv`, `ioredis`, `lucide-react`, `motion`, `@radix-ui/react-dialog`, `@radix-ui/react-scroll-area`, `@radix-ui/react-slot`, `react-dom`, `tailwindcss`, `@tailwindcss/vite`, `@tanstack/react-devtools`, `@tanstack/react-query`, `@tanstack/react-query-devtools`, `@tanstack/react-router`, `@tanstack/react-router-devtools`, `@tanstack/react-router-ssr-query`, `@tanstack/react-start`, `@tanstack/react-store`, `@tanstack/store`, `vite-tsconfig-paths`, `zod`, `cheerio`, `react`, `axios`, `clsx`, `@tanstack/router-plugin`?**
  _High betweenness centrality (0.237) - this node is a cross-community bridge._
- **Why does `RootDocument()` connect `react` to `__root.tsx`?**
  _High betweenness centrality (0.209) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `dependencies`?**
  _High betweenness centrality (0.209) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _210 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `routeTree.gen.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._
- **Should `cn` be split into smaller, more focused modules?**
  _Cohesion score 0.06957047791893527 - nodes in this community are weakly interconnected._
- **Should `read.$comicId.$chapterId.index.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.12315270935960591 - nodes in this community are weakly interconnected._