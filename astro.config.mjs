import {defineConfig, envField, fontProviders} from 'astro/config'

import alpinejs from '@astrojs/alpinejs'
import cloudflare from '@astrojs/cloudflare'
import icon from '@twodft/astro-icon'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  adapter: cloudflare({
    imageService: 'custom'
  }),
  fonts: [
    {
      name: 'Inter',
      cssVariable: '--font-inter',
      fallbacks: ['sans-serif'],
      provider: fontProviders.google(),
      styles: ['normal'],
      weights: ['400 700']
    }
  ],
  env: {
    schema: {
      PUBLIC_IMAGE_HOST: envField.string({
        context: 'client',
        access: 'public',
        default: 'images.tryabovethefold.org'
      })
    }
  },
  image: {
    service: {
      entrypoint: '@utilities/images/service.ts'
    },
    remotePatterns: [
      {protocol: 'https', hostname: '*.r2.dev'},
      {protocol: 'https', hostname: 'images.tryabovethefold.org'}
    ]
  },
  integrations: [
    alpinejs({
      entrypoint: './src/utilities/alpinejs/index.ts'
    }),
    icon({
      iconDir: 'src/assets/icons',
      include: {
        mdi: ['menu', 'moon-waning-crescent', 'white-balance-sunny']
      }
    })
  ],
  output: 'server',
  vite: {
    plugins: [tailwindcss()]
  }
})
