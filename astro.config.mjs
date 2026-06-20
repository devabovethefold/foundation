// @ts-check
import {defineConfig, envField, fontProviders} from 'astro/config'

import alpinejs from '@astrojs/alpinejs'
import cloudflare from '@astrojs/cloudflare'
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
    })
  ],
  output: 'server',
  vite: {
    plugins: [tailwindcss()]
  }
})
