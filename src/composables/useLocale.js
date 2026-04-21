import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from '@/i18n'

const STORAGE_KEY = 'preferred-locale'

export function detectLocale() {
  if (import.meta.env.SSR) return DEFAULT_LOCALE

  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored && SUPPORTED_LOCALES.includes(stored)) return stored

  const browserLangs = navigator.languages ?? [navigator.language]
  for (const lang of browserLangs) {
    const short = lang.split('-')[0]
    if (SUPPORTED_LOCALES.includes(short)) return short
  }

  return DEFAULT_LOCALE
}

export function persistLocale(locale) {
  if (import.meta.env.SSR) return
  localStorage.setItem(STORAGE_KEY, locale)
}
