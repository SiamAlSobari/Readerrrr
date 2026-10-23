---
version: 1
slug: "src-routes-main-index-tsx"
primary_target: "src/routes/_main.index.tsx"
related_targets: ["src/features/landing/MangaStage3D.tsx"]
---

# Landing Page (`src/routes/_main.index.tsx`)

- **Scope & Visitor Mode:** Whole-route redesign (`src/routes/_main.index.tsx` + 3D WebGL stage `src/features/landing/MangaStage3D.tsx`). Mode: **Persuade** (with immediate interactive **Experience** proof in the first viewport).
- **Audience & Job:** Indonesian readers of Manga (JP), Manhwa (KR), and Manhua (CN) arriving at the root domain who want to immediately see what is hot/updated today, inspect physical-feeling 3D volumes, and jump straight into reading a chapter or browsing a specific series/genre.
- **Primary Action & Proof:**
  - Primary Action: Read the selected comic's latest chapter (`/read/$comicId/$chapterId`) or open its series catalog (`/series/$comicId`), or enter the full catalog (`/home`).
  - Real Proof: Live SSR + React Query data from `getPopularComic`, `getComicUpdate`, and `getComicRecomendation`—showing real covers, real chapter numbers, real ratings, and real release timestamps. Zero fabricated statistics (`10K+`, `100K+` removed).
- **Chosen Direction & Memorable Moment:**
  - **Shibuya Tankōbon Darkroom Press & 3D Interactive Volume Stage** (`seed key: f902f592`, user-pinned 3D WebGL Tankōbon Volumes & Panel Stage).
  - Raised by `signals-instruments-darkroom-safelight-bay` (obsidian darkroom ground `#09090b` with sharp Hanko vermilion `#e11d48` safelight focus on the active volume while unselected volumes recede) and `ikeda-datamatics` (hairline architectural rules `#27272e` and tabular monospace index numbers).
  - **Memorable Moment:** Interactive Three.js WebGL 3D stage rendering 7 physical Tankōbon comic volumes with 3D book spines, stacked paper fore-edges, dust-jacket cover textures with Japanese/Korean Obi bands, dynamic spotlight + rim light, cursor parallax tilt, drag-to-scrub rotation, and raycast click-to-select synchronized with the live Editorial Volume Dossier.
- **Dials (Anti-Slop):** `ENERGY 3 / RHYTHM 3 / MOTION 3`.
