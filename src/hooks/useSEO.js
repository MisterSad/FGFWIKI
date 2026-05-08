import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://fgfwiki.com';
const SITE_NAME = 'Foundation: Galactic Frontier Wiki';

const ROUTE_KEYS = {
    '/': 'home',
    '/home': 'home',
    '/guides': 'guides',
    '/daily-tasks': 'daily_tasks',
    '/champions': 'champions',
    '/flagships': 'flagships',
    '/flagship-decks': 'flagship_decks',
    '/ground-teams': 'ground_teams',
    '/events': 'events',
    '/tools': 'tools',
    '/gift-codes': 'gift_codes',
    '/support': 'support',
};

// Supported languages — keep in sync with src/i18n.js and the language switcher.
const SUPPORTED_LANGS = ['en', 'fr', 'de', 'ja', 'ko', 'zh'];
const OG_LOCALES = {
    en: 'en_US',
    fr: 'fr_FR',
    de: 'de_DE',
    ja: 'ja_JP',
    ko: 'ko_KR',
    zh: 'zh_CN',
};
// hreflang code per language — Google recommends script subtags for Chinese.
const HREFLANG = {
    en: 'en',
    fr: 'fr',
    de: 'de',
    ja: 'ja',
    ko: 'ko',
    zh: 'zh-Hans',
};

function setMetaByName(name, content) {
    let el = document.head.querySelector(`meta[name="${name}"]`);
    if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
    }
    el.setAttribute('content', content);
}

function setMetaByProperty(property, content) {
    let el = document.head.querySelector(`meta[property="${property}"]`);
    if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
    }
    el.setAttribute('content', content);
}

function setLinkByRel(rel, href) {
    // Match only the unique non-hreflang link of this rel (canonical, etc.).
    let el = document.head.querySelector(`link[rel="${rel}"]:not([hreflang])`);
    if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
    }
    el.setAttribute('href', href);
}

function syncHreflangs(url) {
    document.head
        .querySelectorAll('link[rel="alternate"][data-managed-hreflang]')
        .forEach((el) => el.remove());
    SUPPORTED_LANGS.forEach((code) => {
        const el = document.createElement('link');
        el.setAttribute('rel', 'alternate');
        el.setAttribute('hreflang', HREFLANG[code] || code);
        el.setAttribute('href', url);
        el.setAttribute('data-managed-hreflang', 'true');
        document.head.appendChild(el);
    });
    // x-default for unmatched locales
    const xd = document.createElement('link');
    xd.setAttribute('rel', 'alternate');
    xd.setAttribute('hreflang', 'x-default');
    xd.setAttribute('href', url);
    xd.setAttribute('data-managed-hreflang', 'true');
    document.head.appendChild(xd);
}

function syncOgAlternateLocales(currentLang) {
    document.head
        .querySelectorAll('meta[property="og:locale:alternate"]')
        .forEach((el) => el.remove());
    SUPPORTED_LANGS.filter((l) => l !== currentLang).forEach((code) => {
        const el = document.createElement('meta');
        el.setAttribute('property', 'og:locale:alternate');
        el.setAttribute('content', OG_LOCALES[code] || 'en_US');
        document.head.appendChild(el);
    });
}

export default function useSEO() {
    const { t, i18n } = useTranslation();
    const location = useLocation();
    const lang = (i18n.language || 'en').split('-')[0];
    const key = ROUTE_KEYS[location.pathname] || 'home';

    useEffect(() => {
        const path = location.pathname === '/' ? '/' : location.pathname;
        const url = `${SITE_URL}${path}`;
        const pageTitle = t(`seo.${key}.title`, { defaultValue: SITE_NAME });
        const description = t(`seo.${key}.description`, {
            defaultValue: 'Strategy guides, tier lists, flagship decks, events and tools for Foundation: Galactic Frontier.',
        });
        const fullTitle = key === 'home'
            ? `${SITE_NAME} — ${pageTitle}`
            : `${pageTitle} — ${SITE_NAME}`;
        const ogLocale = OG_LOCALES[lang] || OG_LOCALES.en;

        document.title = fullTitle;
        document.documentElement.lang = lang;

        setMetaByName('description', description);
        setMetaByProperty('og:title', fullTitle);
        setMetaByProperty('og:description', description);
        setMetaByProperty('og:url', url);
        setMetaByProperty('og:locale', ogLocale);
        syncOgAlternateLocales(lang);
        setMetaByName('twitter:title', fullTitle);
        setMetaByName('twitter:description', description);
        setLinkByRel('canonical', url);
        syncHreflangs(url);
    }, [t, lang, location.pathname, key]);
}
