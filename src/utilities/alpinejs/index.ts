import Alpine from 'alpinejs'
import persist from '@alpinejs/persist'

import type { Alpine as AlpineType } from 'alpinejs'

interface ThemeStore {
  mode: 'light' | 'dark'
  label: string
  init(): void
  getSystem(): void
  toggle(): void
}

interface AestheticStore {
  value: string
  init(): void
  set(aesthetic: string): void
}

interface DrawerStore {
  open: boolean
  toggle(): void
}

export default (Alpine: AlpineType) => {
  Alpine.plugin(persist)

  Alpine.store('theme', {
    mode: (Alpine as any).$persist('light').as('theme'),

    get label(this: ThemeStore) {
      return `Switch to ${this.mode === 'light' ? 'dark' : 'light'} theme`
    },

    init(this: ThemeStore) {
      Alpine.effect(() => {
        document.documentElement.setAttribute('data-theme', this.mode)
      })
    },

    getSystem(this: ThemeStore) {
      this.mode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    },

    toggle(this: ThemeStore) {
      this.mode = this.mode === 'light' ? 'dark' : 'light'
    }
  })

  Alpine.store('aesthetic', {
    value: (Alpine as any).$persist('creative').as('aesthetic'),

    init(this: AestheticStore) {
      Alpine.effect(() => {
        document.documentElement.setAttribute('data-aesthetic', this.value)
      })
    },

    set(this: AestheticStore, aesthetic: string) {
      this.value = aesthetic
    }
  })

  Alpine.store('drawer', {
    open: false,

    toggle(this: DrawerStore) {
      console.log(this.open)
      this.open = !this.open
    }
  })
}
