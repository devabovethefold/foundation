// @ts-check
import { defineConfig } from 'astro/config'

import alpinejs from '@astrojs/alpinejs'
import icon from 'astro-icon'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'

import cloudflare from '@astrojs/cloudflare'

export default defineConfig({
  adapter: cloudflare(),
  integrations: [
    alpinejs({ entrypoint: './src/utilities/alpine/index.ts' }),
    icon({
      include: {
        mdi: [
          'menu',
          'moon-waning-crescent',
          'white-balance-sunny',
          'star',
          'lightning-bolt',
          'shield-check',
          'chevron-down',
          'menu'
        ]
      }
    }),
    sitemap()
  ],
  output: 'server',
  vite: {
    plugins: [tailwindcss()]
  }
})

// provider: fontProviders.adobe({ id: 'your-id' })
// provider: fontProviders.bunny()
// provider: fontProviders.fontshare()
// provider: fontProviders.google()
