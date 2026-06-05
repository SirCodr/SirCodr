import es from './es.json'
import en from './en.json'

export type Locale = 'es' | 'en'

const translations = { es, en } as const

export function useTranslations(locale: Locale) {
  return function t(key: string): string {
    const keys = key.split('.')
    let obj: unknown = translations[locale]
    for (const k of keys) {
      if (typeof obj !== 'object' || obj === null) return key
      obj = (obj as Record<string, unknown>)[k]
    }
    return typeof obj === 'string' ? obj : key
  }
}

export function getLocaleFromUrl(url: URL): Locale {
  const [, first] = url.pathname.split('/')
  if (first === 'en') return 'en'
  return 'es'
}

export function getAlternateUrl(url: URL): string {
  const locale = getLocaleFromUrl(url)
  const path = url.pathname

  if (locale === 'es') {
    // Map ES routes to EN routes
    if (path === '/') return '/en/'
    if (path.startsWith('/servicios/asesoria')) return '/en/services/advisory'
    if (path.startsWith('/servicios/optimizacion-cv'))
      return '/en/services/cv-review'
    if (path.startsWith('/servicios')) return '/en/services'
    return `/en${path}`
  } else {
    // Map EN routes to ES routes
    const noPrefix = path.replace(/^\/en/, '') || '/'
    if (noPrefix.startsWith('/services/advisory')) return '/servicios/asesoria'
    if (noPrefix.startsWith('/services/cv-review'))
      return '/servicios/optimizacion-cv'
    if (noPrefix.startsWith('/services')) return '/servicios'
    return noPrefix
  }
}
