import type {ExternalImageService} from 'astro'
import {PUBLIC_IMAGE_HOST} from 'astro:env/client'

const QUALITY_PRESETS: Record<string, string> = {
  low: '60',
  mid: '80',
  high: '85',
  max: '100'
}

const ASTRO_INTERNAL_PROPS = new Set([
  'src',
  'format',
  'quality',
  'widths',
  'densities',
  'inferSize',
  'formats',
  'layout',
  'fit',
  'position',
  'background'
])

const getSourcePath = (src: string): string => {
  try {
    const url = new URL(src)
    if (url.hostname === PUBLIC_IMAGE_HOST) {
      return url.pathname.replace(/^\//, '')
    }
    return src
  } catch {
    return src.replace(/^\//, '')
  }
}

const resolveQuality = (quality?: string | number): string => {
  if (!quality) return '80'
  if (typeof quality === 'number') {
    return Math.max(1, Math.min(100, Math.round(quality))).toString()
  }
  return QUALITY_PRESETS[quality] || '80'
}

const service: ExternalImageService = {
  validateOptions(options) {
    return options
  },

  getURL(options) {
    const src = typeof options.src === 'string' ? options.src : options.src.src
    const sourcePath = getSourcePath(src)
    const quality = resolveQuality(options.quality)
    const format = options.format || 'auto'

    return `https://${PUBLIC_IMAGE_HOST}/cdn-cgi/image/width=${options.width},format=${format},quality=${quality}/${sourcePath}`
  },

  getHTMLAttributes(options) {
    const attributes = Object.fromEntries(
      Object.entries(options).filter(([key]) => !ASTRO_INTERNAL_PROPS.has(key))
    )

    return {
      loading: 'lazy',
      decoding: 'async',
      ...attributes
    }
  },

  getSrcSet(options) {
    const {widths, densities, width, height, format, ...transformWithoutDimensions} = options

    const wVal = typeof width === 'number' ? width : parseInt(width || '0', 10)
    const hVal = typeof height === 'number' ? height : parseInt(height || '0', 10)
    const aspectRatio = wVal > 0 && hVal > 0 ? wVal / hVal : 1

    let targetWidths: {width: number; descriptor: string}[] = []

    if (widths) {
      targetWidths = widths.map(w => ({
        width: w,
        descriptor: `${w}w`
      }))
    } else if (densities) {
      const parsedDensities = densities.map(d => (typeof d === 'number' ? d : parseFloat(d)))
      targetWidths = parsedDensities.map(density => ({
        width: Math.round(wVal * density),
        descriptor: `${density}x`
      }))
    }

    return targetWidths.map(({width: w, descriptor}) => {
      const h = Math.round(w / aspectRatio)
      return {
        transform: {
          ...transformWithoutDimensions,
          width: w,
          height: h,
          format
        },
        descriptor,
        attributes: format ? {type: `image/${format}`} : {}
      }
    })
  }
}

export default service
