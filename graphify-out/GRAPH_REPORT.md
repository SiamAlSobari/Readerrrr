# Graph Report - web  (2026-10-24)

## Corpus Check
- 84 files · ~45,906 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 546 nodes · 821 edges · 53 communities (22 shown, 31 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 27 edges (avg confidence: 0.63)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `88e8a33d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- sitemap[.]xml.ts
- routeTree.gen.ts
- cn
- read.$comicId.$chapterId.index.tsx
- devDependencies
- shinigami.server.ts
- compilerOptions
- Komik READER Project
- components.json
- index.ts
- Design System: KOMIK READER
- Caveman Commit Skill
- dependencies
- Graphify Rules
- RTK - Rust Token Killer (Google Antigravity)
- class-variance-authority
- date-fns
- dotenv
- nitro
- lucide-react
- motion
- Product
- @radix-ui/react-dialog
- @radix-ui/react-scroll-area
- @radix-ui/react-slot
- clsx
- src-routes-main-index-tsx.md
- tailwindcss
- @radix-ui/react-separator
- @tanstack/react-devtools
- @tanstack/react-query
- @tanstack/react-query-devtools
- @tanstack/react-router
- @tanstack/react-router-devtools
- @tanstack/react-router-ssr-query
- @tanstack/react-start
- @tanstack/react-store
- @tanstack/store
- @tanstack/router-plugin
- vite-tsconfig-paths
- zod
- vite.config.ts
- _main.index.tsx
- ChapterList.tsx
- _main.home.tsx
- _main.tsx
- tailwind-merge
- @vercel/analytics
- FileRoutesByPath
- router.tsx
- ioredis
- cheerio

## God Nodes (most connected - your core abstractions)
1. `cn()` - 34 edges
2. `compilerOptions` - 18 edges
3. `ShinigamiService` - 17 edges
4. `FileRoutesByPath` - 15 edges
5. `Komik READER Project` - 15 edges
6. `getEnv` - 13 edges
7. `PopularComic` - 12 edges
8. `Product` - 11 edges
9. `JsonLd()` - 9 edges
10. `Design System: KOMIK READER` - 9 edges

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

## Communities (53 total, 31 thin omitted)

### Community 1 - "routeTree.gen.ts"
Cohesion: 0.09
Nodes (21): ApiCoverRoute, FileRoutesByFullPath, FileRoutesByTo, FileRouteTypes, MainGenreIndexRoute, MainHistoryIndexRoute, MainHomeRoute, MainIndexRoute (+13 more)

### Community 2 - "cn"
Cohesion: 0.11
Nodes (24): cn(), Badge(), badgeVariants, Button(), buttonVariants, Card(), CardAction(), CardContent() (+16 more)

### Community 3 - "read.$comicId.$chapterId.index.tsx"
Cohesion: 0.14
Nodes (14): getChapterDetail, getComicDetail, ChapterDetail, ChapterImage, Props, ChapterNavigation, Props, FloatingActionBar (+6 more)

### Community 4 - "devDependencies"
Cohesion: 0.05
Nodes (41): jsdom, devDependencies, jsdom, @tanstack/devtools-event-client, @tanstack/devtools-vite, @testing-library/dom, @testing-library/react, tw-animate-css (+33 more)

### Community 5 - "shinigami.server.ts"
Cohesion: 0.07
Nodes (32): genGenreList, getComicGenre, getGenreList, searchComicServer, DUMMY_CHAPTER_DETAIL, DUMMY_CHAPTERS, DUMMY_COMIC_DETAIL, DUMMY_COMICS (+24 more)

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
Cohesion: 0.13
Nodes (15): ShinigamiService, createAxiosClient(), getScraperHeaders(), ApiResponse, ApiResponseDetail, Chapter, ChapterImages, ChapterList (+7 more)

### Community 10 - "Design System: KOMIK READER"
Cohesion: 0.09
Nodes (22): 3D Tankōbon Stage (`MangaStage3D`), Buttons, Colors, Components, Design System: KOMIK READER, Do:, Do's and Don'ts, Don't: (+14 more)

### Community 11 - "Caveman Commit Skill"
Cohesion: 0.20
Nodes (11): Caveman Commit README, Caveman Commit Skill, Caveman Help README, Caveman Help Skill, Caveman Mode README, Caveman Mode Skill, Caveman Intensity Modes, Conventional Commits (+3 more)

### Community 12 - "dependencies"
Cohesion: 0.22
Nodes (9): axios, dependencies, axios, react-dom, @tailwindcss/vite, three, react-dom, @tailwindcss/vite (+1 more)

### Community 13 - "Graphify Rules"
Cohesion: 0.50
Nodes (4): Graphify Rules, Graphify Workflow, Graphify Pipeline, Knowledge Graph

### Community 14 - "RTK - Rust Token Killer (Google Antigravity)"
Cohesion: 0.40
Nodes (4): Meta Commands, RTK - Rust Token Killer (Google Antigravity), Rule, Why

### Community 21 - "Product"
Cohesion: 0.17
Nodes (11): Accessibility & Inclusion, Brand Commitments, Capabilities and Constraints, Evidence on Hand, Operating Context, Platform, Positioning, Product (+3 more)

### Community 43 - "_main.index.tsx"
Cohesion: 0.07
Nodes (25): react, react, getComicUpdate, getPopularComic, JsonLd(), COUNTRY_CODE, PopularComicCardBase, Props (+17 more)

### Community 44 - "ChapterList.tsx"
Cohesion: 0.09
Nodes (27): getChapterList, ComicDetail, Meta, Dialog(), DialogContent(), DialogDescription(), DialogFooter(), DialogHeader() (+19 more)

### Community 45 - "_main.home.tsx"
Cohesion: 0.08
Nodes (30): getComicRecomendation, COUNTRY_LABEL, HeroSection(), Props, PopularComic, UpdateComic, COUNTRY_CODE, PopularComicCard (+22 more)

### Community 46 - "_main.tsx"
Cohesion: 0.18
Nodes (8): Footer(), Header(), Theme, ThemeProvider(), ThemeProviderContext, ThemeProviderProps, ThemeProviderState, Route

### Community 49 - "FileRoutesByPath"
Cohesion: 0.18
Nodes (9): Route, Route, Route, Route, Route, Route, Route, FileRoutesById (+1 more)

### Community 50 - "router.tsx"
Cohesion: 0.29
Nodes (3): getRouter(), Register, routeTree

## Knowledge Gaps
- **216 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+211 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **31 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `devDependencies`, `class-variance-authority`, `date-fns`, `dotenv`, `nitro`, `lucide-react`, `motion`, `@radix-ui/react-dialog`, `@radix-ui/react-scroll-area`, `@radix-ui/react-slot`, `clsx`, `tailwindcss`, `@radix-ui/react-separator`, `@tanstack/react-devtools`, `@tanstack/react-query`, `@tanstack/react-query-devtools`, `@tanstack/react-router`, `@tanstack/react-router-devtools`, `@tanstack/react-router-ssr-query`, `@tanstack/react-start`, `@tanstack/react-store`, `@tanstack/store`, `@tanstack/router-plugin`, `vite-tsconfig-paths`, `zod`, `_main.index.tsx`, `tailwind-merge`, `@vercel/analytics`, `ioredis`, `cheerio`?**
  _High betweenness centrality (0.250) - this node is a cross-community bridge._
- **Why does `react` connect `_main.index.tsx` to `dependencies`?**
  _High betweenness centrality (0.221) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _216 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `routeTree.gen.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._
- **Should `cn` be split into smaller, more focused modules?**
  _Cohesion score 0.10810810810810811 - nodes in this community are weakly interconnected._
- **Should `read.$comicId.$chapterId.index.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.14035087719298245 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.047619047619047616 - nodes in this community are weakly interconnected._