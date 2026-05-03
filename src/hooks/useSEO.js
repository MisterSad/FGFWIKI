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
    let el = document.head.querySelector(`link[rel="${rel}"]`);
    if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
    }
    el.setAttribute('href', href);
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
        const ogLocale = lang === 'fr' ? 'fr_FR' : 'en_US';
        const ogLocaleAlt = lang === 'fr' ? 'en_US' : 'fr_FR';

        document.title = fullTitle;
        document.documentElement.lang = lang;

        setMetaByName('description', description);
        setMetaByProperty('og:title', fullTitle);
        setMetaByProperty('og:description', description);
        setMetaByProperty('og:url', url);
        setMetaByProperty('og:locale', ogLocale);
        setMetaByProperty('og:locale:alternate', ogLocaleAlt);
        setMetaByName('twitter:title', fullTitle);
        setMetaByName('twitter:description', description);
        setLinkByRel('canonical', url);
    }, [t, lang, location.pathname, key]);
}
