import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// Base path du déploiement GitHub Pages : https://aziguy.github.io/pwa-joses-cuisine/
const BASE = '/pwa-joses-cuisine/'

export default defineConfig({
  base: BASE,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/favicon-64.png', 'icons/apple-touch-icon.png', 'robots.txt'],
      manifest: {
        name: "JS cuisine — food is bae*",
        short_name: "Jose's cuisine",
        description:
          'Cuisine camerounaise & africaine, faite maison en Ile-de-France. Menu de la semaine, recettes, repas composés — commande par WhatsApp ou Messenger.',
        lang: 'fr',
        start_url: BASE,
        scope: BASE,
        display: 'standalone',
        background_color: '#FBF6EC',
        theme_color: '#FBF6EC',
        categories: ['food'],
        icons: [
          { src: `${BASE}icons/icon-192.png`, sizes: '192x192', type: 'image/png' },
          { src: `${BASE}icons/icon-512.png`, sizes: '512x512', type: 'image/png' },
          { src: `${BASE}icons/icon-maskable-192.png`, sizes: '192x192', type: 'image/png', purpose: 'maskable' },
          { src: `${BASE}icons/icon-maskable-512.png`, sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,woff2}'],
        navigateFallback: `${BASE}index.html`,
      },
    }),
  ],
})
