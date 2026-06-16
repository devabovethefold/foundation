// @ts-check
import {defineConfig} from 'astro/config'

import alpinejs from '@astrojs/alpinejs'
import cloudflare from '@astrojs/cloudflare'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  adapter: cloudflare({
    imageService: 'cloudflare-binding',
  }),
  image: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.r2.dev' },
  { protocol: 'https', hostname: 'images.tryabovethefold.org' },
    ],
  },
  integrations: [alpinejs()],
  output: 'server',
  vite: {
    plugins: [tailwindcss()]
  }
})
