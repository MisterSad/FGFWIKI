# FGF Wiki

**The community knowledge base for *Foundation: Galactic Frontier* — guides, tier lists, tools and event coverage in 23 languages.**

[![Website](https://img.shields.io/badge/website-fgfwiki.com-5b8def?style=flat-square)](https://fgfwiki.com)
[![Languages](https://img.shields.io/badge/languages-23-7fb86e?style=flat-square)](https://fgfwiki.com)
[![CI](https://img.shields.io/github/actions/workflow/status/MisterSad/FGFWIKI/ci.yml?style=flat-square&label=CI)](https://github.com/MisterSad/FGFWIKI/actions)
[![PWA](https://img.shields.io/badge/PWA-ready-8e7bd6?style=flat-square)](https://fgfwiki.com)

<a href="https://fgfwiki.com"><img src="https://fgfwiki.com/og-image.png" alt="FGF Wiki" width="100%"></a>

---

## About

FGF Wiki is a fan-made knowledge base built by and for the community of *Foundation: Galactic Frontier*. It brings together everything a commander needs to plan, build and compete — from hero evaluations and flagship decks to step-by-step event walkthroughs and interactive planning tools — all in one place.

Our goal is simple: **make the game's deepest systems approachable for every player**, in their own language, on any device.

## Features

**Guides & reference**
- Strategy guides and daily news from the frontier
- Hero tier lists and team compositions
- Flagship deck and ground team buildouts
- Event walkthroughs and live event coverage
- Verified gift codes, updated as they appear

**Interactive tools**
- Champion upgrade cost calculator
- Build time, combat craft and GvG calculators
- Nexus planning tools

**Community-driven**
- Community comments on news, guides and events (Google sign-in)
- Stella Anomaly event submissions with fair, time-based ranking
- Mirandus video feed, refreshed automatically

**Global by design**
- Fully translated into 23 languages, from English to 한국어, 日本語, 中文 and more
- Search-engine friendly and multilingual — find the wiki in your own language
- Installable as a PWA with offline support

## Built with

| Layer | Technology |
|---|---|
| Frontend | [React](https://react.dev) + [Vite](https://vite.dev) |
| Routing & i18n | [React Router](https://reactrouter.com) + [i18next](https://www.i18next.com) |
| Backend | [Firebase](https://firebase.google.com) (Authentication + Cloud Firestore) |
| Hosting | [Vercel](https://vercel.com) with edge caching |
| Quality | [Vitest](https://vitest.dev), [ESLint](https://eslint.org), [GitHub Actions](https://github.com/features/actions) |

## Getting started

FGF Wiki is a standard Vite + React project — getting it running locally takes a minute:

```bash
npm install
npm run dev
```

Other useful commands:

```bash
npm run test       # run the unit tests
npm run lint       # lint the codebase
npm run build      # production build
```

## Contributing

Everyone is welcome, whether you write code, guides or translations:

- **Content** — improve a guide, fix a typo, add a gift code or translate a page into your language
- **Code** — open an issue for a bug, or a pull request for a new tool or feature
- Every PR is validated by CI (lint, tests, build) before it lands

The wiki belongs to its players — if something is missing or wrong, it's yours to fix.

## License

The code, documentation and tools in this repository are licensed under the [MIT License](LICENSE).

*Foundation: Galactic Frontier* names, artwork, logos, images and screenshots are © **FunPlus** — used with permission under an official creator/content agreement, and remain the property of their respective owners.
