(() => {
  const themeKey = 'theme'
  const aestheticKey = 'aesthetic'

  const getPreference = (key, fallback) => {
    const preference = localStorage.getItem(key)
    if (preference) {
      try {
        return JSON.parse(preference)
      } catch (e) {
        return preference.replace(/^"|"$/g, '')
      }
    }
    return fallback()
  }

  const getSystemTheme = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  const getDefaultAesthetic = () => {
    return 'creative'
  }

  const applyPreferences = (doc) => {
    const theme = getPreference(themeKey, getSystemTheme)
    const aesthetic = getPreference(aestheticKey, getDefaultAesthetic)
    
    doc.documentElement.setAttribute('data-theme', theme)
    doc.documentElement.setAttribute('data-aesthetic', aesthetic)
    
    localStorage.setItem(themeKey, JSON.stringify(theme))
    localStorage.setItem(aestheticKey, JSON.stringify(aesthetic))
  }

  applyPreferences(document)

  document.addEventListener('astro:before-swap', (e) => {
    applyPreferences(e.newDocument)
  })
})()
