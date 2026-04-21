# rx-kids-games-portal

Open-source games portal at [kids.wzmn.net](https://kids.wzmn.net), built with Vue 3 + Vite + vite-ssg.

## Tech Stack

| Tool | Purpose |
|------|---------|
| Vue 3 | UI framework (Composition API) |
| Vite 6 | Build tool |
| vite-ssg | Static site generation — pre-renders `/en/` and `/he/` |
| vue-i18n v9 | Hebrew + English translations |
| js-yaml | YAML parsing via inline Vite plugin in vite.config.js |

## Commands

```bash
npm install        # install dependencies
npm run dev        # start dev server at http://localhost:5173
npm run build      # vite-ssg static build → dist/
npm run preview    # preview built dist/ locally
```

## Adding a New Game

Edit `games.yaml` at the project root. Add an entry following the existing schema:

```yaml
- id: my-new-game
  gameUrl: https://arikw.github.io/my-new-game/
  repoUrl: https://github.com/arikw/my-new-game
  iconUrl: https://raw.githubusercontent.com/arikw/my-new-game/master/public/icon.svg
  iconEmoji: "🎯"      # shown if iconUrl fails to load
  color: "#e74c3c"     # hex accent colour for the card
  ageRange: "5+"
  name:
    en: My New Game
    he: המשחק החדש שלי
  description:
    en: English description here.
    he: תיאור בעברית כאן.
```

Push to `main` — GitHub Actions rebuilds and deploys automatically.

## i18n / Translations

- Locale files: [src/locales/en.yaml](src/locales/en.yaml) and [src/locales/he.yaml](src/locales/he.yaml)
- Supported locales: `en`, `he`
- Language preference is saved in `localStorage` under key `preferred-locale`
- Root `/` redirects to the detected locale; direct URLs `/en/` and `/he/` always work

## RTL Support

Hebrew pages have `dir="rtl"` and `lang="he"` set on `<html>` via `@vueuse/head`. The `.rtl` CSS class on the portal container flips `direction`. Add RTL-specific overrides under `.rtl` selectors.

## Component Naming

Vue component files use **kebab-case** (e.g. `game-card.vue`, `portal-header.vue`).

## Deployment

Pushes to `main` trigger [.github/workflows/deploy.yml](.github/workflows/deploy.yml):
1. `npm ci && npm run build`
2. `dist/` uploaded as GitHub Pages artifact
3. Deployed via `actions/deploy-pages` with OIDC (no secrets needed)

DNS record required at your registrar:
```
kids.wzmn.net   CNAME   arikw.github.io
```

## Architecture Notes

- `games.yaml` is the single source of truth; parsed at build time by the inline YAML plugin in `vite.config.js`
- vite-ssg pre-generates `/en/index.html` and `/he/index.html`
- `ssgOptions.onBeforePageRender` injects `<meta http-equiv="refresh" content="0;url=/en/">` into the root `/index.html`
- `ssgOptions.onPageRendered` injects the correct `<html lang>`, `<html dir>`, `<title>`, hreflang and meta tags after JSDOM serialization (must run after JSDOM to avoid attribute resets)
- The `[locale]/index.vue` page syncs the route param into vue-i18n so SSG output has locale-correct text baked in
