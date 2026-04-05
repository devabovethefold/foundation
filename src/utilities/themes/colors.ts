import { oklch, formatHex, parse } from 'culori'

type OKLCH = {
  mode: 'oklch'
  l: number
  c: number
  h: number
  alpha?: number
}

export const BRAND_BASE = '#195230'

/**
 * Replicates the relative OKLCH logic from palette.css
 */
export function getSemanticBases(brandBaseHex: string) {
  const base = oklch(parse(brandBaseHex)) as OKLCH

  return {
    base: base,
    accent: {
      mode: 'oklch',
      l: base.l + 0.15,
      c: base.c + 0.08,
      h: (base.h || 0) + 180
    },
    success: {
      mode: 'oklch',
      l: base.l + 0.2,
      c: base.c + 0.06,
      h: 150
    },
    info: {
      mode: 'oklch',
      l: base.l + 0.15,
      c: base.c + 0.05,
      h: 245
    },
    warning: {
      mode: 'oklch',
      l: base.l + 0.28,
      c: base.c + 0.08,
      h: 70
    },
    error: {
      mode: 'oklch',
      l: base.l + 0.15,
      c: base.c + 0.1,
      h: 5
    },
    neutral: {
      mode: 'oklch',
      l: 0.5,
      c: 0.02,
      h: base.h
    }
  } as Record<string, OKLCH>
}

/**
 * Generates the 100-900 scale for a given target OKLCH color
 * Replicating the "Universal Relative OKLCH Generation Curves" from _palette.css
 */
export function generateScale(target: OKLCH) {
  const steps = [100, 200, 300, 400, 500, 600, 700, 800, 900]
  const scale: Record<string, string> = {}

  steps.forEach((step) => {
    let result: OKLCH

    switch (step) {
      case 100:
        result = { ...target, l: 0.96, c: target.c * 0.2 }
        break
      case 200:
        result = { ...target, l: 0.9, c: target.c * 0.4 }
        break
      case 300:
        result = {
          ...target,
          l: target.l + (0.9 - target.l) * 0.6,
          c: target.c * 0.7
        }
        break
      case 400:
        result = {
          ...target,
          l: target.l + (0.9 - target.l) * 0.3,
          c: target.c * 0.9
        }
        break
      case 500:
        result = target
        break
      case 600:
        result = { ...target, l: target.l * 0.85, c: target.c * 0.95 }
        break
      case 700:
        result = { ...target, l: target.l * 0.72, c: target.c * 0.9 }
        break
      case 800:
        result = { ...target, l: target.l * 0.58, c: target.c * 0.85 }
        break
      case 900:
        result = { ...target, l: target.l * 0.45, c: target.c * 0.8 }
        break
      default:
        result = target
    }

    scale[step.toString()] = formatHex(result) || '#000000'
  })

  return scale
}
