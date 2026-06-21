import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { tips, eventsData } from '../data/gameData';

const SITE_URL = 'https://fgfwiki.com';
const SITE_NAME = 'Foundation: Galactic Frontier Wiki';

const ROUTE_KEYS = {
    '/': 'home',
    '/home': 'home',
    '/news': 'news',
    '/guides': 'guides',
    '/champions': 'champions',
    '/flagships': 'flagships',
    '/events': 'events',
    '/tools': 'tools',
    '/gift-codes': 'gift_codes',
};

// Supported languages — keep in sync with src/i18n.js and the language switcher.
const SUPPORTED_LANGS = [
    'en', 'fr', 'ko', 'de', 'ja', 'zh', 'pl', 'it', 'uk', 'es', 'pt', 'fi', 'sv', 'nb',
    'zh-tw', 'nl', 'id', 'tr', 'vi', 'ru', 'th', 'ms', 'ar'
];
const OG_LOCALES = {
    en: 'en_US',
    fr: 'fr_FR',
    de: 'de_DE',
    es: 'es_ES',
    fi: 'fi_FI',
    it: 'it_IT',
    nb: 'nb_NO',
    pl: 'pl_PL',
    pt: 'pt_PT',
    sv: 'sv_SE',
    uk: 'uk_UA',
    ja: 'ja_JP',
    ko: 'ko_KR',
    zh: 'zh_CN',
    'zh-tw': 'zh_TW',
    nl: 'nl_NL',
    id: 'id_ID',
    tr: 'tr_TR',
    vi: 'vi_VN',
    ru: 'ru_RU',
    th: 'th_TH',
    ms: 'ms_MY',
    ar: 'ar_AR',
};
// hreflang code per language — Google recommends script subtags for Chinese.
const HREFLANG = {
    en: 'en',
    fr: 'fr',
    de: 'de',
    es: 'es',
    fi: 'fi',
    it: 'it',
    nb: 'nb',
    pl: 'pl',
    pt: 'pt',
    sv: 'sv',
    uk: 'uk',
    ja: 'ja',
    ko: 'ko',
    zh: 'zh-Hans',
    'zh-tw': 'zh-Hant',
    nl: 'nl',
    id: 'id',
    tr: 'tr',
    vi: 'vi',
    ru: 'ru',
    th: 'th',
    ms: 'ms',
    ar: 'ar',
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

function setJsonLd(data) {
    let el = document.head.querySelector('script[data-seo-jsonld]');
    if (!el) {
        el = document.createElement('script');
        el.setAttribute('type', 'application/ld+json');
        el.setAttribute('data-seo-jsonld', 'true');
        document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(data);
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

        let pageTitle = '';
        let description = '';
        let tip = null;
        let event = null;

        const newsMatch = location.pathname.match(/^\/news\/([^/]+)$/);
        const guideMatch = location.pathname.match(/^\/guides\/([^/]+)$/);
        const eventMatch = location.pathname.match(/^\/events\/([^/]+)$/);

        if (newsMatch) {
            const newsId = newsMatch[1];
            tip = tips.find(t => String(t.id) === newsId);
            if (tip) {
                pageTitle = t(tip.title, { defaultValue: 'News' });
                description = t(tip.content, {
                    defaultValue: 'News update for Foundation: Galactic Frontier.',
                });
            } else {
                pageTitle = t('seo.news.title', { defaultValue: 'News' });
                description = t('seo.news.description', {
                    defaultValue: 'All the latest news, updates and migration details for Foundation: Galactic Frontier.',
                });
            }
        } else if (guideMatch) {
            const guideId = guideMatch[1];
            tip = tips.find(t => String(t.id) === guideId);
            if (tip) {
                pageTitle = t(tip.title, { defaultValue: 'Guide' });
                description = t(tip.content, {
                    defaultValue: 'Strategy guide for Foundation: Galactic Frontier.',
                });
            } else {
                pageTitle = t('seo.guides.title', { defaultValue: 'Guides' });
                description = t('seo.guides.description', {
                    defaultValue: 'Strategy guides, tier lists, flagship decks, events and tools for Foundation: Galactic Frontier.',
                });
            }
        } else if (eventMatch) {
            const eventId = eventMatch[1];
            event = eventsData.find(e => e.id === eventId);
            if (event) {
                pageTitle = t(event.title, { defaultValue: 'Event' });
                description = t(event.description, {
                    defaultValue: 'Event guide for Foundation: Galactic Frontier.',
                });
            } else {
                pageTitle = t('seo.events.title', { defaultValue: 'Events' });
                description = t('seo.events.description', {
                    defaultValue: 'Strategy guides, tier lists, flagship decks, events and tools for Foundation: Galactic Frontier.',
                });
            }
        } else {
            pageTitle = t(`seo.${key}.title`, { defaultValue: SITE_NAME });
            description = t(`seo.${key}.description`, {
                defaultValue: 'Strategy guides, tier lists, flagship decks, events and tools for Foundation: Galactic Frontier.',
            });
        }

        const isHome = location.pathname === '/' || location.pathname === '/home';
        const fullTitle = isHome
            ? `${SITE_NAME} | ${pageTitle}`
            : `${pageTitle} | ${SITE_NAME}`;
        const ogLocale = OG_LOCALES[lang] || OG_LOCALES.en;

        document.title = fullTitle;
        document.documentElement.lang = lang;

        setMetaByName('description', description);
        
        // Asian & Eastern European Search Engine Optimization (Baidu, Naver, Yandex)
        let keywords = t(`seo.${key}.keywords`, {
            defaultValue: 'Foundation Galactic Frontier, FGF, FGF Wiki, strategy guides, tier list, flagship decks, events, tools'
        });
        if ((guideMatch || newsMatch) && tip) {
            keywords = `${t(tip.title)}, ${newsMatch ? 'news' : 'guide'}, strategy, Foundation Galactic Frontier, FGF, FGF Wiki`;
        } else if (eventMatch && event) {
            keywords = `${t(event.title)}, event, guide, strategy, Foundation Galactic Frontier, FGF, FGF Wiki`;
        }
        setMetaByName('keywords', keywords);
        setMetaByName('applicable-device', 'pc,mobile'); // Baidu mobile indexing directive
        setMetaByName('renderer', 'webkit'); // Force modern rendering in Chinese dual-core browsers

        setMetaByProperty('og:title', fullTitle);
        setMetaByProperty('og:description', description);
        setMetaByProperty('og:url', url);
        setMetaByProperty('og:locale', ogLocale);
        syncOgAlternateLocales(lang);
        setMetaByName('twitter:title', fullTitle);
        setMetaByName('twitter:description', description);
        setLinkByRel('canonical', url);
        syncHreflangs(url);

        // Generative AI Engine Optimization (AIO/GEO) using JSON-LD Structured Data
        let schemaData = {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": SITE_NAME,
            "url": SITE_URL,
            "inLanguage": lang
        };

        if ((guideMatch || newsMatch) && tip) {
            schemaData = {
                "@context": "https://schema.org",
                "@type": "TechArticle",
                "headline": pageTitle,
                "description": description,
                "url": url,
                "inLanguage": lang,
                "publisher": {
                    "@type": "Organization",
                    "name": SITE_NAME,
                    "url": SITE_URL
                },
                "author": {
                    "@type": "Organization",
                    "name": "HawkTuah #1061"
                }
            };
            if (tip.publishDate) {
                schemaData.datePublished = tip.publishDate;
            }
        } else if (eventMatch && event) {
            schemaData = {
                "@context": "https://schema.org",
                "@type": "Event",
                "name": pageTitle,
                "description": description,
                "url": url,
                "inLanguage": lang,
                "eventStatus": "https://schema.org/EventScheduled",
                "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
                "location": {
                    "@type": "VirtualLocation",
                    "url": url
                },
                "organizer": {
                    "@type": "Organization",
                    "name": SITE_NAME,
                    "url": SITE_URL
                }
            };
        }

        setJsonLd(schemaData);
    }, [t, lang, location.pathname, key]);
}
