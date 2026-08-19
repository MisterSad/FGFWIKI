import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';
import { tips, eventsData, heroData, shipDecks } from '../data/gameData';

const SITE_URL = 'https://fgfwiki.com';
const SITE_NAME = 'Foundation: Galactic Frontier Wiki';
const AUTHOR_NAME = 'HawkTuah #1061';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

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
    '/creators': 'creators',
    '/stella-anomaly': 'stella_anomaly',
    '/guild-tool': 'guild_tool',
    '/evolutions': 'game_evolutions',
    '/game-evolutions': 'game_evolutions',
    '/daily-tasks': 'guides',
    '/flagship-decks': 'flagships',
    '/ground-teams': 'champions',
    '*': 'not_found',
};

// All 23 supported languages
const SUPPORTED_LANGS = [
    'en', 'fr', 'ko', 'de', 'ja', 'zh', 'pl', 'it', 'uk', 'es', 'pt', 'fi', 'sv', 'nb',
    'zh-tw', 'nl', 'id', 'tr', 'vi', 'ru', 'th', 'ms', 'ar'
];

const LANG_URL_CODES = SUPPORTED_LANGS;
const DEFAULT_LANG = 'en';

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
    if (!content) return;
    let el = document.head.querySelector(`meta[name="${name}"]`);
    if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
    }
    el.setAttribute('content', content);
}

function setMetaByProperty(property, content) {
    if (!content) return;
    let el = document.head.querySelector(`meta[property="${property}"]`);
    if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
    }
    el.setAttribute('content', content);
}

function setLinkByRel(rel, href) {
    if (!href) return;
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

function syncHreflangs(url, lang) {
    document.head
        .querySelectorAll('link[rel="alternate"][data-managed-hreflang]')
        .forEach((el) => el.remove());
    LANG_URL_CODES.forEach((code) => {
        const el = document.createElement('link');
        el.setAttribute('rel', 'alternate');
        el.setAttribute('hreflang', HREFLANG[code] || code);
        el.setAttribute('href', url.replace(`/${lang}/`, `/${code}/`));
        el.setAttribute('data-managed-hreflang', 'true');
        document.head.appendChild(el);
    });
    const xd = document.createElement('link');
    xd.setAttribute('rel', 'alternate');
    xd.setAttribute('hreflang', 'x-default');
    xd.setAttribute('href', url.replace(`/${lang}/`, `/${DEFAULT_LANG}/`));
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
    const currentLang = (i18n.language || DEFAULT_LANG).toLowerCase();
    const langCode = LANG_URL_CODES.includes(currentLang) 
        ? currentLang 
        : (LANG_URL_CODES.includes(currentLang.split('-')[0]) ? currentLang.split('-')[0] : DEFAULT_LANG);

    const baseRouteKey = ROUTE_KEYS[location.pathname] || 'home';

    useEffect(() => {
        const path = location.pathname === '/' ? '/' : location.pathname;
        const canonicalUrl = `${SITE_URL}/${langCode}${path === '/' ? '' : path}`;

        let pageTitle = '';
        let description = '';
        let ogImage = DEFAULT_OG_IMAGE;
        let keywords = '';
        let breadcrumbs = [
            { name: t('navigation.home', { defaultValue: 'Home' }), url: `${SITE_URL}/${langCode}/home` }
        ];

        let tip = null;
        let event = null;

        const newsMatch = location.pathname.match(/^\/news\/([^/]+)$/);
        const guideMatch = location.pathname.match(/^\/guides\/([^/]+)$/);
        const eventMatch = location.pathname.match(/^\/events\/([^/]+)$/);
        const creatorMatch = location.pathname.match(/^\/creators\/([^/]+)$/);

        if (newsMatch) {
            const newsId = newsMatch[1];
            tip = tips.find(t => String(t.id) === newsId);
            breadcrumbs.push({ name: t('navigation.news', { defaultValue: 'News' }), url: `${SITE_URL}/${langCode}/news` });
            if (tip) {
                pageTitle = t(tip.title, { defaultValue: 'News Article' });
                description = t(tip.content, { defaultValue: 'Latest news update for Foundation: Galactic Frontier.' });
                breadcrumbs.push({ name: pageTitle, url: canonicalUrl });
                if (tip.sections) {
                    const imgSec = tip.sections.find(s => s.image);
                    if (imgSec) ogImage = `${SITE_URL}${imgSec.image}`;
                }
            } else {
                pageTitle = t('seo.news.title', { defaultValue: 'News' });
                description = t('seo.news.description', { defaultValue: 'All the latest news, updates and migration details for Foundation: Galactic Frontier.' });
            }
        } else if (guideMatch) {
            const guideId = guideMatch[1];
            tip = tips.find(t => String(t.id) === guideId);
            breadcrumbs.push({ name: t('navigation.guides', { defaultValue: 'Guides' }), url: `${SITE_URL}/${langCode}/guides` });
            if (tip) {
                pageTitle = t(tip.title, { defaultValue: 'Strategy Guide' });
                description = t(tip.content, { defaultValue: 'In-depth strategy guide for Foundation: Galactic Frontier.' });
                breadcrumbs.push({ name: pageTitle, url: canonicalUrl });
                if (tip.sections) {
                    const imgSec = tip.sections.find(s => s.image);
                    if (imgSec) ogImage = `${SITE_URL}${imgSec.image}`;
                }
            } else {
                pageTitle = t('seo.guides.title', { defaultValue: 'Strategy Guides' });
                description = t('seo.guides.description', { defaultValue: 'Comprehensive guides, fleet power optimization, and combat tactics for Foundation: Galactic Frontier.' });
            }
        } else if (eventMatch) {
            const eventId = eventMatch[1];
            event = eventsData.find(e => e.id === eventId);
            breadcrumbs.push({ name: t('navigation.events', { defaultValue: 'Events' }), url: `${SITE_URL}/${langCode}/events` });
            if (event) {
                pageTitle = t(event.title, { defaultValue: 'Event Walkthrough' });
                description = t(event.description, { defaultValue: 'Event guide and walkthrough for Foundation: Galactic Frontier.' });
                breadcrumbs.push({ name: pageTitle, url: canonicalUrl });
                if (event.image) ogImage = `${SITE_URL}${event.image}`;
            } else {
                pageTitle = t('seo.events.title', { defaultValue: 'Events' });
                description = t('seo.events.description', { defaultValue: 'Strategy guides and mechanics for all Foundation: Galactic Frontier events.' });
            }
        } else if (location.pathname === '/champions' || location.pathname === '/ground-teams') {
            pageTitle = t('seo.champions.title', { defaultValue: 'Hero Tier List & Ground Teams' });
            description = t('seo.champions.description', { defaultValue: 'Ranked tier list of all heroes, skills, roles, energy synergies and ground team builds for Foundation: Galactic Frontier.' });
            breadcrumbs.push({ name: t('navigation.champions', { defaultValue: 'Heroes & Tier List' }), url: canonicalUrl });
        } else if (location.pathname === '/flagships' || location.pathname === '/flagship-decks') {
            pageTitle = t('seo.flagships.title', { defaultValue: 'Flagships & Meta Decks' });
            description = t('seo.flagships.description', { defaultValue: 'Complete flagship guide, core upgrades, component mods and meta decks (Kinetic, Beam, Ion) for Foundation: Galactic Frontier.' });
            breadcrumbs.push({ name: t('navigation.flagships', { defaultValue: 'Flagships & Decks' }), url: canonicalUrl });
        } else if (location.pathname === '/tools') {
            pageTitle = t('seo.tools.title', { defaultValue: 'Interactive Calculators & Tools' });
            description = t('seo.tools.description', { defaultValue: 'Speedup calculator, Nexus resource estimator, Champion upgrade calculator and GvG combat simulation tools.' });
            breadcrumbs.push({ name: t('navigation.builder', { defaultValue: 'Calculators & Tools' }), url: canonicalUrl });
        } else if (location.pathname === '/gift-codes') {
            pageTitle = t('seo.gift_codes.title', { defaultValue: 'Active Gift Codes' });
            description = t('seo.gift_codes.description', { defaultValue: 'Latest active and working promo codes for diamonds, speedups and hero shards in Foundation: Galactic Frontier.' });
            breadcrumbs.push({ name: t('navigation.gift_codes', { defaultValue: 'Gift Codes' }), url: canonicalUrl });
        } else if (location.pathname === '/guild-tool') {
            pageTitle = t('guild_tool.hero_title', { defaultValue: 'AI Guild Management ERP & Roster OCR' }).replace('\n', ' - ');
            description = t('guild_tool.hero_subtitle', { defaultValue: 'Next-gen ERP for Foundation: Galactic Frontier alliances. 16 AI Vision OCR scanners, 7D military matrix, 24/7 timezone coverage and player portal.' });
            breadcrumbs.push({ name: t('navigation.guild_tool', { defaultValue: 'Guild ERP Tool' }), url: canonicalUrl });
        } else if (location.pathname === '/stella-anomaly') {
            pageTitle = t('seo.stella_anomaly.title', { defaultValue: 'Stella Anomaly Puzzle Terminal' });
            description = t('seo.stella_anomaly.description', { defaultValue: 'Interactive anomaly decoder, cipher terminal and secret ARG lore database for Foundation: Galactic Frontier.' });
            breadcrumbs.push({ name: t('navigation.stella_anomaly', { defaultValue: 'Stella Anomaly' }), url: canonicalUrl });
        } else if (location.pathname === '/creators' || creatorMatch) {
            pageTitle = t('seo.creators.title', { defaultValue: 'Creators Corner' });
            description = t('seo.creators.description', { defaultValue: 'Official creator partnerships, YouTube guides and video strategies by Mirandus Plays for Foundation: Galactic Frontier.' });
            breadcrumbs.push({ name: t('navigation.creators', { defaultValue: 'Creators Corner' }), url: canonicalUrl });
        } else {
            pageTitle = t(`seo.${baseRouteKey}.title`, { defaultValue: SITE_NAME });
            description = t(`seo.${baseRouteKey}.description`, {
                defaultValue: 'The definitive reference wiki for Foundation: Galactic Frontier. Strategy guides, hero tier lists, flagship decks, ground teams, event walkthroughs and tools.',
            });
        }

        const isHome = location.pathname === '/' || location.pathname === '/home';
        const fullTitle = isHome
            ? `${SITE_NAME} | ${t('seo.home.title', { defaultValue: 'Strategy Guides, Tier Lists & Tools' })}`
            : `${pageTitle} | ${SITE_NAME}`;
        
        const ogLocale = OG_LOCALES[langCode] || OG_LOCALES.en;

        document.title = fullTitle;
        document.documentElement.lang = langCode;

        // Meta tags
        setMetaByName('description', description);
        keywords = `${pageTitle}, Foundation Galactic Frontier, FGF, FGF Wiki, guide, tier list, FunPlus, sci-fi strategy`;
        setMetaByName('keywords', keywords);
        setMetaByName('applicable-device', 'pc,mobile');
        setMetaByName('renderer', 'webkit');
        setMetaByName('author', AUTHOR_NAME);

        // Open Graph
        setMetaByProperty('og:title', fullTitle);
        setMetaByProperty('og:description', description);
        setMetaByProperty('og:url', canonicalUrl);
        setMetaByProperty('og:locale', ogLocale);
        setMetaByProperty('og:image', ogImage);
        setMetaByProperty('og:image:width', '1200');
        setMetaByProperty('og:image:height', '630');
        setMetaByProperty('og:image:alt', fullTitle);
        setMetaByProperty('og:site_name', SITE_NAME);
        setMetaByProperty('og:type', (guideMatch || newsMatch) ? 'article' : 'website');
        syncOgAlternateLocales(langCode);

        // Twitter Cards
        setMetaByName('twitter:card', 'summary_large_image');
        setMetaByName('twitter:site', '@FGFWiki');
        setMetaByName('twitter:creator', '@HawkTuah');
        setMetaByName('twitter:title', fullTitle);
        setMetaByName('twitter:description', description);
        setMetaByName('twitter:image', ogImage);
        setMetaByName('twitter:image:alt', fullTitle);

        // Canonical & Multilingual Hreflang
        setLinkByRel('canonical', canonicalUrl);
        syncHreflangs(canonicalUrl, langCode);

        // ==========================================
        // Multi-Entity JSON-LD Schema.org Graph (GEO)
        // ==========================================
        const graphEntities = [];

        // 1. BreadcrumbList
        graphEntities.push({
            "@type": "BreadcrumbList",
            "@id": `${canonicalUrl}#breadcrumb`,
            "itemListElement": breadcrumbs.map((crumb, idx) => ({
                "@type": "ListItem",
                "position": idx + 1,
                "name": crumb.name,
                "item": crumb.url
            }))
        });

        // 2. Specific Route Graph Entities
        if ((guideMatch || newsMatch) && tip) {
            graphEntities.push({
                "@type": "TechArticle",
                "@id": `${canonicalUrl}#article`,
                "isPartOf": { "@id": `${SITE_URL}/#website` },
                "headline": pageTitle,
                "description": description,
                "image": ogImage,
                "url": canonicalUrl,
                "inLanguage": langCode,
                "datePublished": tip.publishDate || '2026-05-10T12:00:00Z',
                "dateModified": '2026-08-18T00:00:00Z',
                "author": {
                    "@type": "Person",
                    "name": AUTHOR_NAME
                },
                "publisher": {
                    "@type": "Organization",
                    "name": SITE_NAME,
                    "url": SITE_URL,
                    "logo": {
                        "@type": "ImageObject",
                        "url": `${SITE_URL}/favicon.png`
                    }
                },
                "speakable": {
                    "@type": "SpeakableSpecification",
                    "cssSelector": ["h1", ".guide-content", "article"]
                }
            });
        } else if (eventMatch && event) {
            graphEntities.push({
                "@type": "Event",
                "@id": `${canonicalUrl}#event`,
                "name": pageTitle,
                "description": description,
                "image": ogImage,
                "url": canonicalUrl,
                "inLanguage": langCode,
                "eventStatus": "https://schema.org/EventScheduled",
                "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
                "location": {
                    "@type": "VirtualLocation",
                    "url": canonicalUrl
                },
                "organizer": {
                    "@type": "Organization",
                    "name": SITE_NAME,
                    "url": SITE_URL
                }
            });
        } else if (location.pathname === '/champions' || location.pathname === '/ground-teams') {
            graphEntities.push({
                "@type": "ItemList",
                "@id": `${canonicalUrl}#itemlist`,
                "name": "Foundation: Galactic Frontier Hero Tier List",
                "description": "Ranked evaluation of heroes and ground squads across Kinetic, Beam, and Ion energy damage archetypes.",
                "numberOfItems": heroData?.length || 20,
                "itemListElement": (heroData || []).slice(0, 15).map((hero, idx) => ({
                    "@type": "ListItem",
                    "position": idx + 1,
                    "name": t(hero.name, { defaultValue: hero.name }),
                    "description": `${hero.tier} Tier ${hero.role} - ${hero.energyType} Damage`
                }))
            });
        } else if (location.pathname === '/flagships' || location.pathname === '/flagship-decks') {
            graphEntities.push({
                "@type": "ItemList",
                "@id": `${canonicalUrl}#itemlist`,
                "name": "Foundation: Galactic Frontier Flagship Meta Decks",
                "description": "Top tier flagship fleet combinations for Kinetic, Beam, and Ion warfare.",
                "numberOfItems": shipDecks?.length || 3,
                "itemListElement": (shipDecks || []).map((deck, idx) => ({
                    "@type": "ListItem",
                    "position": idx + 1,
                    "name": t(deck.title, { defaultValue: deck.title }),
                    "description": t(deck.description, { defaultValue: deck.description })
                }))
            });
        } else if (location.pathname === '/tools') {
            graphEntities.push({
                "@type": "WebApplication",
                "@id": `${canonicalUrl}#app`,
                "name": "Foundation: Galactic Frontier Interactive Calculators & Speedup Tools",
                "applicationCategory": "GameUtility",
                "operatingSystem": "All",
                "url": canonicalUrl,
                "inLanguage": langCode,
                "featureList": "Speedup Calculator, Nexus Resource Estimator, Champion Upgrade Planner, Combat Craft Mod Calculator",
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD"
                }
            });
        } else if (location.pathname === '/guild-tool') {
            graphEntities.push({
                "@type": "SoftwareApplication",
                "@id": `${canonicalUrl}#app`,
                "name": "Foundation: Galactic Frontier Guild Management ERP",
                "applicationCategory": "GameManagementUtility",
                "operatingSystem": "Web, iOS, Android, PC",
                "url": "https://guildmanagement.vercel.app/",
                "inLanguage": langCode,
                "featureList": "16 AI Vision OCR Scanners, 7D Military Matrix, 24/7 Timezone Coverage, Automated Shadowfront 20+10, Member Portal",
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "EUR",
                    "description": "1st Month Free Trial"
                }
            });
            graphEntities.push({
                "@type": "FAQPage",
                "@id": `${canonicalUrl}#faq`,
                "mainEntity": [1, 2, 3, 4, 5, 6].map(num => ({
                    "@type": "Question",
                    "name": t(`guild_tool.q${num}`),
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": t(`guild_tool.a${num}`)
                    }
                }))
            });
        } else if (location.pathname === '/gift-codes') {
            graphEntities.push({
                "@type": "FAQPage",
                "@id": `${canonicalUrl}#faq`,
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "How to redeem gift codes in Foundation: Galactic Frontier?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "1. Launch Foundation: Galactic Frontier. 2. Tap your Avatar at the top-left. 3. Navigate to Settings > Redeem Code. 4. Enter your code and claim your rewards in your in-game mailbox."
                        }
                    }
                ]
            });
        } else if (location.pathname === '/creators') {
            graphEntities.push({
                "@type": "ProfilePage",
                "@id": `${canonicalUrl}#profile`,
                "mainEntity": {
                    "@type": "Person",
                    "name": "Mirandus Plays",
                    "alternateName": "Mirandus",
                    "jobTitle": "Content Creator & Strategy Analyst",
                    "sameAs": [
                        "https://www.youtube.com/@mirandusplaysmobile",
                        "https://discord.gg/6NNe6zUbt6"
                    ]
                }
            });
        } else {
            graphEntities.push({
                "@type": "WebPage",
                "@id": `${canonicalUrl}#webpage`,
                "url": canonicalUrl,
                "name": fullTitle,
                "description": description,
                "inLanguage": langCode,
                "isPartOf": { "@id": `${SITE_URL}/#website` }
            });
        }

        const schemaData = {
            "@context": "https://schema.org",
            "@graph": graphEntities
        };

        setJsonLd(schemaData);
    }, [t, currentLang, langCode, location.pathname, baseRouteKey]);
}

