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
  const origBase = oklch(parse(brandBaseHex)) as OKLCH
  const origBaseL = origBase.l ?? 0.5
  const origBaseC = origBase.c ?? 0
  const origBaseH = origBase.h ?? 0

  // Clamping variables matching CSS tokens:
  const chromaMin = 0.14
  const chromaMax = 0.22
  const lightnessMin = 0.30
  const lightnessMax = 0.70

  const baseL = Math.max(lightnessMin, Math.min(origBaseL, lightnessMax))
  const baseC = Math.max(chromaMin, Math.min(origBaseC, chromaMax))
  const baseH = origBaseH

  const base: OKLCH = { mode: 'oklch', l: baseL, c: baseC, h: baseH }

  const accentL = Math.max(0.6, Math.min(baseL + 0.1, 0.85))
  const accentC = Math.max(baseC, 0.16)
  const accentH = (baseH + 180) % 360

  return {
    base,
    accent: {
      mode: 'oklch',
      l: accentL,
      c: accentC,
      h: accentH
    },
    success: {
      mode: 'oklch',
      l: Math.max(0.6, Math.min(baseL + 0.25, 0.8)),
      c: 0.18,
      h: 143
    },
    info: {
      mode: 'oklch',
      l: Math.max(0.58, Math.min(baseL + 0.25, 0.78)),
      c: 0.16,
      h: 226
    },
    warning: {
      mode: 'oklch',
      l: Math.max(0.68, Math.min(baseL + 0.35, 0.88)),
      c: 0.2,
      h: 75
    },
    error: {
      mode: 'oklch',
      l: Math.max(0.55, Math.min(baseL + 0.2, 0.75)),
      c: 0.22,
      h: 25
    },
    neutral: {
      mode: 'oklch',
      l: Math.max(0.48, Math.min(baseL + 0.15, 0.62)),
      c: 0.03,
      h: baseH
    }
  } as Record<string, OKLCH>
}

/**
 * Generates the 100-900 scale for a given target OKLCH color
 * Replicating the Hermite spline and floating endpoints curves from palette.css
 */
export function generateScale(target: OKLCH) {
  const steps = [100, 200, 300, 400, 500, 600, 700, 800, 900]
  const scale: Record<string, string> = {}

  const l = target.l ?? 0.5
  const c = target.c ?? 0
  const h = target.h ?? 0

  const L_max = Math.max(0.95, Math.min(l + (1.0 - l) * 0.9, 0.98))
  const L_min = Math.max(0.04, Math.min(l * 0.25, 0.15))

  steps.forEach((step) => {
    let result: OKLCH

    switch (step) {
      case 100:
        result = { mode: 'oklch', l: L_max, c: c * 0.3, h }
        break
      case 200:
        result = { mode: 'oklch', l: L_max * 0.8671875 + l * 0.15625 - L_min * 0.0234375, c: c * 0.475, h }
        break
      case 300:
        result = { mode: 'oklch', l: L_max * 0.5625 + l * 0.5 - L_min * 0.0625, c: c * 0.65, h }
        break
      case 400:
        result = { mode: 'oklch', l: L_max * 0.2265625 + l * 0.84375 - L_min * 0.0703125, c: c * 0.825, h }
        break
      case 500:
        result = { mode: 'oklch', l, c, h }
        break
      case 600:
        result = { mode: 'oklch', l: -L_max * 0.0703125 + l * 0.84375 + L_min * 0.2265625, c: c * 0.835, h }
        break
      case 700:
        result = { mode: 'oklch', l: -L_max * 0.0625 + l * 0.5 + L_min * 0.5625, c: c * 0.67, h }
        break
      case 800:
        result = { mode: 'oklch', l: -L_max * 0.0234375 + l * 0.15625 + L_min * 0.8671875, c: c * 0.505, h }
        break
      case 900:
        result = { mode: 'oklch', l: L_min, c: c * 0.34, h }
        break
      default:
        result = { mode: 'oklch', l, c, h }
    }

    scale[step.toString()] = formatHex(result) || '#000000'
  })

  return scale
}
