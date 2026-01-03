# Komik READER

**Domain Web: [komik-reader.my.id](https://komik-reader.my.id)**

## Deskripsi Proyek

Komik READER adalah aplikasi web modern untuk membaca komik online yang dibangun menggunakan teknologi terkini. Aplikasi ini menyediakan pengalaman membaca komik yang lancar, responsif, dan user-friendly dengan fitur-fitur lengkap untuk menemukan, menjelajahi, dan menikmati ribuan judul komik dari berbagai genre.

## Teknologi Utama

- **Frontend Framework**: React 19 dengan TypeScript
- **Build Tool**: Vite
- **Routing**: TanStack Router dengan dukungan SSR
- **State Management**: TanStack Query untuk data fetching dan caching
- **UI Components**: Shadcn UI (berbasis Radix UI primitives)
- **Styling**: Tailwind CSS 4
- **HTTP Client**: Axios
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Form Validation**: Zod
- **Date Handling**: date-fns
- **Web Scraping**: Cheerio (untuk parsing data)
- **SSR/SSG**: TanStack Start dengan Nitro

## Fitur Utama

### 🏠 Halaman Utama
- **Hero Section**: Banner utama dengan navigasi cepat
- **Rekomendasi Komik**: Daftar komik yang direkomendasikan berdasarkan format
- **Komik Terbaru**: Update komik terbaru dengan pagination
- **Komik Populer**: Daftar komik populer sepanjang masa

### 📚 Detail Komik
- **Informasi Lengkap**: Judul, deskripsi, genre, status, rating, dan statistik
- **Cover Image**: Background blur dengan overlay untuk estetika
- **Chapter List**: Daftar chapter dengan thumbnail, tanggal rilis, dan view count
- **Pagination**: Navigasi chapter dengan infinite scroll
- **History Reading**: Pelacakan chapter terakhir yang dibaca

### 📖 Pembacaan Chapter
- **Image Viewer**: Tampilan gambar chapter dengan navigasi
- **Responsive Design**: Optimasi untuk desktop dan mobile
- **Navigation**: Tombol navigasi antar chapter
- **Loading States**: Skeleton loading untuk performa

### 🔍 Pencarian
- **Search Functionality**: Pencarian komik berdasarkan judul
- **Real-time Results**: Hasil pencarian instan

### 🏷️ Genre
- **Daftar Genre**: Kategori komik lengkap
- **Filter by Genre**: Komik berdasarkan genre tertentu
- **No Results Handling**: Pesan untuk genre tanpa komik

### 🎨 UI/UX
- **Dark/Light Theme**: Tema yang dapat disesuaikan
- **Responsive Layout**: Desain mobile-first
- **Smooth Animations**: Transisi halus dengan Framer Motion
- **Loading Skeletons**: Placeholder untuk loading states
- **Error Handling**: Penanganan error yang elegan

## Struktur Proyek

```
src/
├── api/
│   ├── servers/          # Server functions untuk SSR
│   └── services/         # API services
├── common/
│   ├── components/       # Komponen bersama (Header, Footer, dll.)
│   ├── data/            # Data dummy
│   ├── http/            # Konfigurasi HTTP client
│   ├── interface/       # TypeScript interfaces
│   ├── libs/            # Utility libraries
│   ├── providers/       # Context providers
│   ├── shadcn-ui/       # UI components
│   ├── utils/           # Utility functions
│   └── validation/      # Schema validation
├── features/
│   ├── chapter/         # Komponen chapter
│   ├── comic/           # Komponen komik
│   └── genre/           # Komponen genre
├── integrations/        # Integrasi third-party
├── routes/              # File-based routing
└── styles.css           # Global styles
```

## API Integration

Aplikasi terintegrasi dengan API eksternal dari `https://09.shinigami.asia/` yang menyediakan:

- Daftar komik rekomendasi
- Komik terbaru dan update
- Komik populer
- Detail komik
- Daftar chapter
- Data genre
- Pencarian komik

## Development Setup

### Prerequisites
- Node.js (versi terbaru)
- npm atau yarn

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Aplikasi akan berjalan di `http://localhost:3000`

### Build
```bash
npm run build
```

### Preview
```bash
npm run preview
```

### Testing
```bash
npm run test
```

## Konfigurasi

- **Port Development**: 3000
- **SSR Enabled**: Ya, menggunakan TanStack Start
- **Path Aliases**: `@/*` mengarah ke `./src/*`
- **Environment Variables**: Dikonfigurasi melalui `env.ts`

## Optimasi Performa

- **Code Splitting**: Automatic dengan Vite
- **Image Optimization**: Lazy loading dan error handling
- **Caching**: TanStack Query untuk caching API responses
- **SSR**: Server-side rendering untuk SEO dan performa
- **Bundle Analysis**: Devtools untuk monitoring

## Browser Support

- Chrome (versi terbaru)
- Firefox (versi terbaru)
- Safari (versi terbaru)
- Edge (versi terbaru)

## Komponen Utama

### Header Component
- **Logo**: "COMICREADER" dengan gradient merah-oranye
- **Navigasi**: Home, Popular, Genre, Update dengan active state indicators
- **Search Bar**: Pencarian real-time untuk desktop dan mobile
- **Mobile Menu**: Sheet overlay untuk navigasi mobile
- **Responsive Design**: Sticky header dengan backdrop blur

### Footer Component
- **Copyright**: © 2026 ComikReader. All rights reserved.
- **Tagline**: "Read your favorite Comic anytime, anywhere"
- **Simple Layout**: Centered text dengan gradient background

### Hero Section
- **Slider Auto**: 3 komik populer dengan auto-rotate setiap 6 detik
- **Cover Display**: Gambar cover dengan overlay informasi
- **Country Badges**: Manhwa (Korea), Manga (Jepang), Manhua (China)
- **Action Buttons**: "Read Now" dan "View Details"
- **Statistics**: Rating, views, bookmarks dengan icons

### Comic Cards
- **PopularComicCard**: Card untuk komik populer dengan rank display
- **BaseComicCard**: Card standar dengan cover dan info dasar
- **UpdateComicCard**: Card untuk update dengan tanggal terbaru
- **Skeleton Loading**: Placeholder animasi untuk loading states
- **Hover Effects**: Scale dan shadow transitions

### Chapter Components
- **ChapterList**: Infinite scroll dengan pagination
- **ChapterImage**: Viewer gambar dengan navigasi
- **ChapterNavigation**: Tombol prev/next chapter
- **History Tracking**: LocalStorage untuk chapter terakhir dibaca

## Data Models

### Comic Interface
```typescript
interface Comic {
  manga_id: string;
  title: string;
  alternative_title: string;
  description: string;
  country_id: string; // "KR", "JP", "CN"
  release_year: string;
  cover_image_url: string;
  cover_portrait_url: string;
  bookmark_count: number;
  view_count: number;
  rank: number;
  status: number;
  user_rate: number;
  latest_chapter_id: string;
  latest_chapter_number: number;
  taxonomy: Taxonomy;
}
```

### Chapter History
- **LocalStorage**: Penyimpanan chapter terakhir per komik
- **Max Entries**: 1000 entries untuk performa
- **Auto Cleanup**: Filter duplikat dan sort by time

## Validation & Security

### Zod Schemas
- **comicDetailValidation**: Validasi ID komik
- **comicChapterListValidation**: Validasi pagination chapter
- **comicPaginationValidation**: Validasi page dan pageSize
- **comicChapterDetailValidation**: Validasi chapter ID
- **comicRecomendationValidation**: Validasi format rekomendasi
- **comicGenreValidation**: Validasi genre filter

### Error Handling
- **API Error Responses**: Penanganan retcode dan message
- **Image Fallback**: Default images untuk cover yang gagal load
- **Network Errors**: Retry logic dengan TanStack Query
- **Validation Errors**: User feedback untuk input invalid

## UI/UX Features

### Theme System
- **Dark Theme**: Default theme dengan black/gray palette
- **Gradient Accents**: Red-orange gradients untuk branding
- **Glass Morphism**: Backdrop blur effects
- **Consistent Spacing**: Tailwind spacing scale

### Animations
- **Framer Motion**: Smooth transitions dan micro-interactions
- **Hero Slider**: Slide transitions dengan easing
- **Hover States**: Scale transforms pada cards
- **Loading Animations**: Pulse effects pada skeletons

### Responsive Breakpoints
- **Mobile**: < 768px - Single column layout
- **Tablet**: 768px - 1024px - Grid 2 columns
- **Desktop**: > 1024px - Grid 3-4 columns
- **Large Desktop**: > 1280px - Extended layouts

## Environment Configuration

### Server Environment
```bash
API_URL=https://09.shinigami.asia/
```

### Client Environment
```bash
VITE_API_URL_CLIENT=https://09.shinigami.asia/
```

### Development Environment
- **Port**: 3000
- **Hot Reload**: Enabled
- **DevTools**: TanStack DevTools integrated
- **TypeScript**: Strict mode enabled

## Build & Deployment

### Build Process
```bash
npm run build
```
- **Vite Build**: Optimized production build
- **SSR Generation**: Static pages dengan TanStack Start
- **Asset Optimization**: Image compression dan code splitting
- **Bundle Analysis**: Size monitoring

### Deployment Options
- **Vercel**: Recommended untuk SSR
- **Netlify**: Static deployment
- **Docker**: Containerized deployment
- **Node.js Server**: Traditional hosting

### Performance Metrics
- **Lighthouse Score**: Target 90+ untuk semua metrics
- **Bundle Size**: < 500KB gzipped
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s

## Development Guidelines

### Code Style
- **TypeScript Strict**: No any types, strict null checks
- **ESLint**: Configured untuk consistency
- **Prettier**: Code formatting
- **Path Aliases**: @/* untuk clean imports

### Component Patterns
- **Functional Components**: React hooks pattern
- **Props Interface**: Typed props untuk type safety
- **Default Props**: Sensible defaults
- **Error Boundaries**: Graceful error handling

### State Management
- **TanStack Query**: Server state management
- **Local State**: React useState untuk UI state
- **Context**: Theme provider untuk global state
- **LocalStorage**: Persistent user preferences

## Testing Strategy

### Unit Tests
- **Component Testing**: React Testing Library
- **Utility Functions**: Jest untuk pure functions
- **API Mocks**: MSW untuk API testing

### Integration Tests
- **Route Testing**: TanStack Router testing
- **API Integration**: End-to-end API flows
- **User Journeys**: Critical user paths

### E2E Testing
- **Playwright**: Cross-browser testing
- **CI/CD**: Automated test runs
- **Visual Regression**: Screenshot comparisons

## Roadmap

### Short Term (Q1 2026)
- [ ] Offline reading capability
- [ ] Bookmark/favorites system
- [ ] Advanced search filters
- [ ] User authentication
- [ ] Reading progress sync

### Medium Term (Q2 2026)
- [ ] PWA features
- [ ] Multi-language support
- [ ] Dark/light theme toggle
- [ ] Reading statistics
- [ ] Social sharing

### Long Term (2026+)
- [ ] Mobile app (React Native)
- [ ] Custom reading themes
- [ ] Community features
- [ ] Premium subscriptions
- [ ] AI recommendations

## Contributing

### Development Setup
1. Fork repository
2. Clone locally
3. Install dependencies: `npm install`
4. Start dev server: `npm run dev`
5. Create feature branch
6. Make changes with tests
7. Submit pull request

### Code Standards
- Follow existing TypeScript/React patterns
- Add proper JSDoc comments
- Include unit tests for new features
- Update README for significant changes
- Follow conventional commit messages

### Pull Request Process
- **Title**: [Feature/Bug] Brief description
- **Description**: Detailed changes and rationale
- **Testing**: How to test the changes
- **Screenshots**: UI changes screenshots
- **Breaking Changes**: Mark if any

## Troubleshooting

### Common Issues

**Build Errors**
- Clear node_modules: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npx tsc --noEmit`
- Verify environment variables

**API Issues**
- Check API_URL in environment
- Verify network connectivity
- Check browser console for CORS errors

**Performance Issues**
- Enable React DevTools Profiler
- Check bundle size with `npm run build`
- Optimize images and lazy loading

**Styling Issues**
- Verify Tailwind config
- Check CSS imports in styles.css
- Test responsive breakpoints

## License

Proyek ini bersifat privat dan tidak untuk distribusi publik.

## Acknowledgments

- **Shinigami API**: Data source untuk komik
- **Shadcn UI**: UI component library
- **TanStack**: Router, Query, dan Start frameworks
- **Vite**: Fast build tool
- **Tailwind CSS**: Utility-first CSS framework

## Support

Untuk dukungan teknis atau pertanyaan:
- Email: support@komik-reader.my.id
- Website: [komik-reader.my.id](https://komik-reader.my.id)
- GitHub Issues: Laporkan bug atau request fitur

---

**Last Updated**: January 3, 2026
**Version**: 1.0.0

## Lisensi

Proyek ini bersifat privat dan tidak untuk distribusi publik.

## Kontak

Untuk informasi lebih lanjut, kunjungi [komik-reader.my.id](https://komik-reader.my.id)