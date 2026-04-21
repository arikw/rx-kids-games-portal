import { createI18n } from 'vue-i18n'
import en from './locales/en.yaml'
import he from './locales/he.yaml'

export const SUPPORTED_LOCALES = ['en', 'he']
export const DEFAULT_LOCALE = 'en'

export function createI18nInstance(locale = DEFAULT_LOCALE) {
  return createI18n({
    legacy: false,
    locale,
    fallbackLocale: 'en',
    messages: { en, he },
  })
}
