import type {ExternalImageService} from 'astro'

import {PUBLIC_IMAGE_HOST} from 'astro:env/client'

const service: ExternalImageService = {
  validateOptions(options) {
    return options
  },
  getURL(options) {
    const src = typeof options.src === 'string' ? options.src : options.src.src
    const filename = src.split('/').pop()

    return `https://${PUBLIC_IMAGE_HOST}/cdn-cgi/image/width=${options.width},format=${options.format || 'auto'}/${filename}`
  },
  getHTMLAttributes(options) {
    const {src, format, quality, ...attributes} = options
    return attributes
  }
}

export default service
