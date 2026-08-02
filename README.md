# FGF Wiki

Community wiki for **Foundation: Galactic Frontier** (FunPlus) — strategy guides, hero tier lists, flagship decks, ground teams, event walkthroughs, gift codes and in-depth tools. Available in 23 languages.

Live at [fgfwiki.com](https://fgfwiki.com).

## Stack

- **Vite + React 19** — SPA, deployed on Vercel
- **i18next** (`react-i18next` + `http-backend`) — 23 locales served from `public/locales/{lng}/translation.json`
- **Firebase** — Auth (Google, email/password, magic link) + Firestore for the Stella Anomaly submissions and per-user tool data
- **Vitest** — unit tests for pure logic (`tests/`)
- **ESLint** (flat config) — zero-warning gate

## Development

```bash
npm install
npm run dev        # start Vite dev server
npm run lint       # eslint .
npm run test       # vitest run
npm run build      # generate sitemap, then production build
npm run preview    # serve the production build
```

## Architecture notes

- **Language-prefixed URLs** (`/fr/guides`, `/ja/...`). The i18n language detector uses the first path segment (`lookupFromPathIndex: 0`); `App.jsx` computes a router `basename` from it, so unprefixed URLs (`/guides`) keep working.
- **`middleware.js`** (Vercel Edge) returns real HTTP 404s for unknown SPA paths and validates the language prefix; `vercel.json` rewrites everything else to `index.html`.
- **`scripts/generate-sitemap.js`** emits `public/sitemap.xml` (48 routes × 23 languages, with xhtml:link hreflang alternates). Runs on every build.
- **`scripts/optimize-images.js`** (sharp) converts source images to WebP. Run it after adding images in `public/images/`.
- **`scripts/get-anomaly-winners.js`** reads Stella Anomaly submissions, sorted by the atomic rank assigned at submit time.
- **Stella Anomaly ranks** are allocated inside a Firestore `runTransaction` against a counter document — never via `query.size()`. Rules live in `firestore.rules` (submissions are immutable after creation; the counter can only be incremented by 1).
- **PWA**: `public/sw.js` (runtime cache, network-first for navigation, cache-first for static assets) is registered only in production builds.

## Deployment

Push to `main` → Vercel build + deploy. GitHub Actions CI (`lint`, `test`, `build`) runs on every PR.

Env vars (`VITE_FIREBASE_*`) are configured in the Vercel project dashboard; see `src/firebase.js`.

## Translating

Each of the 23 locales is one JSON file under `public/locales/{lng}/translation.json`. Keys referenced with a fallback (`t('key', 'FALLBACK')`) degrade to English when missing, but all keys should exist in every locale — CI only gates lint/test/build, so keep the files in sync by hand.
