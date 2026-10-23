---
name: KOMIK READER
description: Shibuya Tankōbon Darkroom Press & 3D Interactive Comic Reader
colors:
  hanko-vermilion: "#be123c"
  hanko-vermilion-bright: "#f43f5e"
  hanko-vermilion-deep: "#9f1239"
  obsidian-ground: "#09090b"
  darkroom-plinth: "#0c0c10"
  editorial-panel: "#101014"
  graphite-surface: "#141418"
  graphite-elevated: "#181820"
  hairline-rule: "#27272e"
  newsprint-bone: "#f4f1ea"
  muted-stone: "#c8c2b6"
typography:
  display:
    fontFamily: "Big Shoulders Display, Impact, Arial Narrow, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3.75rem)"
    fontWeight: 900
    lineHeight: 0.96
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Big Shoulders Display, Impact, Arial Narrow, sans-serif"
    fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)"
    fontWeight: 900
    lineHeight: 1.02
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Barlow, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: "Barlow, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Chivo Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "0.05em"
rounded:
  none: "0px"
  sm: "4px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.hanko-vermilion}"
    textColor: "{colors.newsprint-bone}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "14px 24px"
  button-primary-hover:
    backgroundColor: "{colors.hanko-vermilion-deep}"
  button-secondary:
    backgroundColor: "{colors.graphite-surface}"
    textColor: "{colors.newsprint-bone}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "10px 20px"
  input-search:
    backgroundColor: "{colors.graphite-surface}"
    textColor: "{colors.newsprint-bone}"
    rounded: "{rounded.none}"
    padding: "10px 14px"
    height: "44px"
---

# Design System: KOMIK READER

## Overview

**Creative North Star: "The Shibuya Tankōbon Darkroom Press"**

KOMIK READER treats digital Manga (JP), Manhwa (KR), and Manhua (CN) with the tactile weight of physical print editions inspected under a darkroom safelight. Rather than dressing a comic reader in generic SaaS startup cards, floating gradients, or fabricated marketing counters, the interface operates like an editorial serialization desk and a physical Tankōbon volume rack. Every surface is anchored by 1px architectural rules, condensed spine typography, tabular serialization indices, and live cover artwork fetched directly from the catalog server.

In the first viewport, visitors interact with a Three.js WebGL 3D Tankōbon rack where each volume has physical book thickness, stacked paper page striations on the fore-edge, custom-rendered vertical spine lettering, and a Japanese/Korean Obi belly band. Selecting or rotating a 3D volume updates the adjacent Editorial Volume Dossier in real time, connecting spatial exploration directly to a one-click chapter reader.

**Key Characteristics:**
- Physical 3D Tankōbon book geometry with 6 distinct face materials (front cover + Obi band, custom vertical spine, stacked paper fore-edges, back cover colophon).
- Obsidian darkroom ground (`#09090b`) paired with warm newsprint paper foregrounds (`#f4f1ea`) and a single Hanko vermilion seal accent (`#be123c` / `#f43f5e`).
- Crisp 1px structural hairline grids (`#27272e`) and zero-radius architectural frames (`0px`) inspired by manga panel borders and serialization tables.
- Tabular monospace metadata (`Chivo Mono`) for chapter numbers, volume indices, release dates, and reader ratings.

## Colors

The palette pairs deep obsidian ink surfaces with warm off-white newsprint paper and a single high-contrast Hanko vermilion seal accent.

### Primary
- **Hanko Vermilion** (`#be123c`): Used for primary action fills ("Baca Chapter Sekarang", active format tabs, active angle buttons, and masthead colophon stamps). Maintains a 5.57:1 WCAG AA contrast ratio against `#f4f1ea` text.
- **Safelight Vermilion Text** (`#f43f5e`): Used for inline active labels, volume index numbers, and focus rings over `#09090b` darkroom surfaces (5.42:1 WCAG AA contrast ratio).
- **Deep Vermilion Press** (`#9f1239`): Hover and active state for primary vermilion buttons.

### Neutral
- **Obsidian Ink Ground** (`#09090b`): Primary page canvas and darkroom stage ground.
- **Darkroom Plinth** (`#0c0c10`): Secondary section ground and recessed table cells.
- **Editorial Panel** (`#101014`): Dossier container and featured spread surface.
- **Graphite Surface** (`#141418`): Interactive control surface at rest (secondary buttons, search inputs).
- **Graphite Elevated** (`#181820`): Hover surface for rows, spine tabs, and chapter triggers.
- **Hairline Rule** (`#27272e`): 1px structural borders separating panels, table cells, and ledger rows.
- **Newsprint Bone** (`#f4f1ea`): Primary display and body text color (17.64:1 contrast against `#09090b`).
- **Muted Stone** (`#c8c2b6`): Secondary prose, metadata labels, and inactive tab text (11.22:1 contrast against `#09090b`).

### Named Rules
**The Single Hanko Seal Rule.** Vermilion (`#be123c` / `#f43f5e`) is the sole chromatic accent on the landing and navigation surfaces. It marks only the active volume, the primary reading trigger, or an active filter state, never background washes or decorative borders.

**The Verified Contrast Rule.** Every text-on-surface pairing must pass WCAG AA normal text (4.5:1 minimum). Use `#f4f1ea` on `#be123c` (5.57:1) for filled buttons and `#f43f5e` on `#09090b` (5.42:1) for accent labels.

## Typography

**Display Font:** `Big Shoulders Display` (with `Impact, Arial Narrow, sans-serif` fallback)
**Body Font:** `Barlow` (with system sans-serif fallback)
**Label/Mono Font:** `Chivo Mono` (with `ui-monospace, monospace` fallback)

**Character:** Tall, condensed industrial display type (`Big Shoulders Display`) echoes vertical Japanese Tankōbon spines and weekly manga magazine covers, while `Barlow` keeps multi-line Indonesian synopses clean and compact, and `Chivo Mono` locks chapter numbers and ratings into strict tabular alignment.

### Hierarchy
- **Display** (`900`, `clamp(2.25rem, 5vw, 3.75rem)`, `line-height: 0.96`): Primary stage masthead (`<h1>`), set uppercase with `text-balance`.
- **Headline** (`900`, `clamp(1.75rem, 3.5vw, 2.5rem)`, `line-height: 1.02`): Section mastheads (`<h2>`) and active volume titles.
- **Title** (`700`, `1.125rem`, `line-height: 1.3`): Serialization ledger comic titles (`<h3>`).
- **Body** (`400`, `1rem`, `line-height: 1.6`, max measure `65-68ch`): Synopses, section descriptions, and editorial notes.
- **Label** (`700`, `0.75rem`, `letter-spacing: 0.05em`, uppercase, `tabular-nums`): Volume indices (`VOL.01`), origin codes (`JP · MANGA`), chapter buttons (`CH. 142`), and specification table keys.

### Named Rules
**The Tabular Serialization Rule.** Every numeric indicator (volume numbers, chapter numbers, ratings, release dates, and rank indices) must use `Chivo Mono` with `font-variant-numeric: tabular-nums` so columns align vertically like a print ledger.

**The No-Kicker Rule.** Headings (`<h1>`, `<h2>`, `<h3>`) never carry a decorative pill badge or eyebrow label stacked directly above them. Structural context belongs in a separate bordered toolbar or below the heading.

## Layout

The layout uses a `1280px` (`max-w-7xl`) centered container with `16px` (`px-4`) mobile and `24px` (`sm:px-6`) desktop horizontal padding. Instead of repeating a uniform centered-heading + card-grid rhythm, each section uses a structure dictated by its content:

1. **First Viewport (12-Column Asymmetric Stage):** 7 columns dedicated to the interactive Three.js WebGL 3D Tankōbon stage + 7-column spine selector bar; 5 columns dedicated to the live Editorial Volume Dossier (`<dl>` specification matrix + synopsis + primary/secondary CTAs).
2. **Serialization Dispatch Ledger:** 2-column architectural grid (`gap-px bg-[#27272e]`) where each row pairs a numbered comic entry (`01`..`08`) with direct chapter action buttons on the right.
3. **Three-Tradition Editorial Spread (5/7 Split):** 3-tab format switcher (`Manhwa KR`, `Manga JP`, `Manhua CN`) driving a 5-column featured work spread on the left and a 7-column ranked vertical ledger (`02`..`06`) on the right.
4. **Genre Classification Matrix:** 4-column hairline grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#27272e]`) of classification cards with catalog codes (`KL-01`..`KL-08`).

## Elevation & Depth

Depth is concentrated in the interactive Three.js WebGL 3D stage (which uses ACES Filmic tone mapping, a directional key light, a `#e11d48` safelight rim point light, and a warm fill light) and in tonal surface layering (`#09090b` -> `#0c0c10` -> `#101014` -> `#141418`). Surrounding HTML containers remain flat and crisp, separated by `1px solid #27272e` hairline borders.

### Shadow Vocabulary
- **Stage Frame Shadow** (`0 24px 60px rgba(0, 0, 0, 0.75)`): Applied once to the primary 12-column 3D stage container to anchor it against the obsidian canvas.

### Named Rules
**The 1px Panel Gutter Rule.** Section dividers, specification tables, and serialization lists use `1px` hairline borders (`#27272e`) and `1px` grid gaps (`gap-px bg-[#27272e]`) rather than soft drop shadows or thick colored side stripes.

## Shapes

The landing and editorial shell uses crisp `0px` right-angled corners (`rounded-none`) that echo cut paper, manga panel frames, and physical Tankōbon book corners. Borders are strictly `1px` (`border-[#27272e]`), shifting to `#be123c` or `#f4f1ea` on interactive hover/focus.

## Components

### Buttons
- **Shape:** Sharp rectangular (`0px` radius), minimum `44px` tap target height (`min-h-11` / `min-h-12`).
- **Primary:** `#be123c` background, `#f4f1ea` text, uppercase `Big Shoulders Display` or `Chivo Mono` bold label. Transitions to `#9f1239` on hover.
- **Secondary:** `#141418` background, `#f4f1ea` text, `1px solid #27272e` border. Transitions to `#1e1e26` background and `#f4f1ea` border on hover.
- **Focus:** `2px solid #f43f5e` outline with `2px` offset (`:focus-visible`).

### Inputs / Fields
- **Style:** `44px` height, `#141418` background, `#f4f1ea` text, `#c8c2b6` placeholder at 70% opacity, `1px solid #27272e` border, `0px` radius.
- **Focus:** Border shifts to `#be123c` / `#f43f5e` with visible `:focus-visible` outline.
- **Error:** Inline `role="alert"` message in `#f43f5e` `Chivo Mono` directly beneath the bar.

### Navigation
- **Style:** Sticky `64px` top bar (`bg-[#09090b]/95 border-b border-[#27272e]`), stamp-styled `KOMIK READER` logotype, uppercase `Chivo Mono` links (`Katalog`, `Populer`, `Genre`, `Update`, `Riwayat`), `⌘K` quick-search bar, and a labeled mobile `Menu` button (`min-h-11`).

### 3D Tankōbon Stage (`MangaStage3D`)
- **Geometry:** 7 `THREE.BoxGeometry(1.88, 2.76, 0.34)` meshes with procedural paper fore-edge striations, custom vertical spine canvas textures, back-cover colophons, and proxied live front-cover artwork composited with a Tankōbon Obi belly band.
- **Controls:** Pointer raycast click-to-select, horizontal drag-to-rotate 360°, angle switcher (`Sampul Depan`, `Punggung Buku`, `Sampul Belakang`), and a 7-tab keyboard-accessible spine selector strip.

## Do's and Don'ts

### Do:
- **Do** wire every comic title, cover, chapter number, and rating to live server data (`getPopularComic`, `getComicUpdate`, `getComicRecomendation`).
- **Do** provide keyboard-accessible HTML controls (`role="tab"`, `Prev/Next` buttons, direct links) for every item represented in the 3D WebGL canvas.
- **Do** give container backgrounds or borders the hover feedback rather than scaling `<img>` elements on hover.

### Don't:
- **Don't** display fabricated statistics (`10,000+ Judul`, `100K+ Pembaca`), fake testimonials, or unverified claims.
- **Don't** place pill badges or eyebrow kickers above `<h1>`, `<h2>`, or `<h3>` headings.
- **Don't** use gradient text (`bg-clip-text text-transparent`), em dashes (`—`), or decorative multi-px left borders (`border-l-4`) on cards.
