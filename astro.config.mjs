// @ts-check
import { defineConfig } from 'astro/config'

import alpinejs from '@astrojs/alpinejs'
import icon from 'astro-icon'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  integrations: [
    alpinejs({ entrypoint: './src/utilities/alpine/index.ts' }),
    sitemap(),
    icon({
      include: {
        mdi: ['menu', 'moon-waning-crescent', 'white-balance-sunny']
      }
    })
  ],
  vite: {
    plugins: [tailwindcss()]
  }
})

// provider: fontProviders.adobe({ id: 'your-id' })
// provider: fontProviders.bunny()
// provider: fontProviders.fontshare()
// provider: fontProviders.google()
