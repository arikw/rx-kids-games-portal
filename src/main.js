import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes } from './router'
import { createI18nInstance } from './i18n'
import { detectLocale, persistLocale } from './composables/useLocale'

export const createApp = ViteSSG(App, { routes }, ({ app, router, isClient }) => {
  const locale = isClient ? detectLocale() : 'en'
  const i18n = createI18nInstance(locale)

  app.use(i18n)

  if (isClient) {
    router.afterEach((to) => {
      const routeLocale = to.params.locale
      if (routeLocale) {
        i18n.global.locale.value = routeLocale
        persistLocale(routeLocale)
        document.documentElement.lang = routeLocale
        document.documentElement.dir = routeLocale === 'he' ? 'rtl' : 'ltr'
      }
    })
  }
})
