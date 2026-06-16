// @ts-check
import {defineConfig, envField} from 'astro/config'

import alpinejs from '@astrojs/alpinejs'
import cloudflare from '@astrojs/cloudflare'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  adapter: cloudflare({
    imageService: 'cloudflare-binding'
  }),
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
      {protocol: 'https', hostname: 'pub-*.r2.dev'},
      {protocol: 'https', hostname: 'images.tryabovethefold.org'}
    ]
  },
  integrations: [alpinejs()],
  output: 'server',
  vite: {
    plugins: [tailwindcss()]
  }
})
