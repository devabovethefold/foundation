import type {ExternalImageService} from 'astro'

import {PUBLIC_IMAGE_HOST} from 'astro:env/client'

const service: ExternalImageService = {
  validateOptions(options) {
    return options
  },
  getURL(options) {
    const src = typeof options.src === 'string' ? options.src : options.src.src
    const filename = src.split('/').pop()

    let qualityVal = '80'
    if (options.quality) {
      if (typeof options.quality === 'number') {
        qualityVal = options.quality.toString()
      } else {
        const presets: Record<string, string> = {
          low: '60',
          mid: '80',
          high: '85',
          max: '100'
        }
        qualityVal = presets[options.quality] || '80'
      }
    }

    return `https://${PUBLIC_IMAGE_HOST}/cdn-cgi/image/width=${options.width},format=${options.format || 'auto'},quality=${qualityVal}/${filename}`
  },
  getHTMLAttributes(options) {
    const {src, format, quality, ...attributes} = options
    return attributes
  }
}

export default service
