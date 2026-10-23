import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'
import { VitePWA } from 'vite-plugin-pwa'

const isDev = process.env.NODE_ENV !== 'production'

const config = defineConfig({
  plugins: [
    ...(isDev ? [devtools()] : []),
    nitro(),
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: null,
      outDir: '.output/public',
      workbox: {
        globDirectory: '.output/public',
        globPatterns: ['**/*.{js,css,ico,png,svg,webmanifest}'],
        navigateFallback: null,
      },
      manifest: {
        name: 'KOMIK READER',
        short_name: 'KomikReader',
        description: 'Baca KOMIK online terbaru, populer, dan lengkap dengan mudah dan gratis.',
        theme_color: '#000000',
        background_color: '#000000',
        display: 'standalone',
        icons: [
          {
            src: '/komik_reader.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/komik_reader.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react/') || id.includes('react-dom/')) {
              return 'vendor-react'
            }
            if (id.includes('@tanstack/react-query')) {
              return 'vendor-query'
            }
            if (id.includes('@tanstack/react-router')) {
              return 'vendor-router'
            }
            if (id.includes('lucide-react')) {
              return 'vendor-icons'
            }
            if (id.includes('date-fns')) {
              return 'vendor-date'
            }
            if (id.includes('three')) {
              return 'vendor-three'
            }
          }
        }
      }
    },
    chunkSizeWarningLimit: 800,
  }
})

export default config
