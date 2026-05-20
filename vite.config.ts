import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'
import { VitePWA } from 'vite-plugin-pwa'

const config = defineConfig({
  plugins: [
    devtools(),
    nitro(),
    // this is the plugin that enables path aliases
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: null,
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
})

export default config
