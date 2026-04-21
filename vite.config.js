import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import yaml from 'js-yaml'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const I18N = {
  en: {
    title: 'Kids Games Portal',
    description: 'Free educational games for children',
    dir: 'ltr',
  },
  he: {
    title: 'פורטל משחקים לילדים',
    description: 'משחקים חינוכיים וחינמיים לילדים',
    dir: 'rtl',
  },
}

function yamlPlugin() {
  return {
    name: 'vite-plugin-yaml',
    transform(src, id) {
      if (!id.endsWith('.yaml') && !id.endsWith('.yml')) return
      return { code: `export default ${JSON.stringify(yaml.load(src))}`, map: null }
    },
  }
}

export default defineConfig({
  base: '/',
  plugins: [
    Vue(),
    yamlPlugin(),
  ],
  resolve: {
    alias: { '@': resolve(__dirname, './src') },
  },
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    dirStyle: 'nested',
    includedRoutes() {
      return ['/', '/en/', '/he/']
    },
    onBeforePageRender(route, indexHTML) {
      if (route === '/') {
        return indexHTML.replace('</head>', '<meta http-equiv="refresh" content="0;url=/en/">\n</head>')
      }
      return indexHTML
    },
    onPageRendered(route, html) {
      const locale = route.replace(/\//g, '')
      const meta = I18N[locale]
      if (!meta) return html

      return html
        .replace(/<html[^>]*>/, `<html lang="${locale}" dir="${meta.dir}">`)
        .replace('</head>', [
          `<title>${meta.title}</title>`,
          `<meta name="description" content="${meta.description}">`,
          `<meta property="og:title" content="${meta.title}">`,
          `<meta property="og:type" content="website">`,
          `<meta property="og:url" content="https://kids.wzmn.net/${locale}/">`,
          `<link rel="alternate" hreflang="en" href="https://kids.wzmn.net/en/">`,
          `<link rel="alternate" hreflang="he" href="https://kids.wzmn.net/he/">`,
          `<link rel="alternate" hreflang="x-default" href="https://kids.wzmn.net/">`,
          '</head>',
        ].join('\n'))
    },
  },
})
