import {oklch, formatHex, parse} from 'culori'

type OKLCH = {
  mode: 'oklch'
  l: number
  c: number
  h: number
  alpha?: number
}

export const PRIMARY = '#195230'
