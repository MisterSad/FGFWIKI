import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { tips, eventsData } from '../src/data/gameData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://fgfwiki.com';

const LANGUAGES = [
  'en', 'fr', 'ko', 'de', 'ja', 'zh', 'pl', 'it', 'uk', 'es', 'pt', 'fi', 'sv', 'nb',
  'zh-tw', 'nl', 'id', 'tr', 'vi', 'ru', 'th', 'ms', 'ar'
];
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
const DEFAULT_LANG = 'en';

const staticRoutes = [
  { path: '/home', changefreq: 'weekly', priority: '1.0' },
  { path: '/news', changefreq: 'weekly', priority: '0.9' },
  { path: '/guides', changefreq: 'weekly', priority: '0.9' },
  { path: '/champions', changefreq: 'weekly', priority: '0.9' },
  { path: '/flagships', changefreq: 'weekly', priority: '0.9' },
  { path: '/events', changefreq: 'weekly', priority: '1.0' },
  { path: '/tools', changefreq: 'monthly', priority: '0.8' },
  { path: '/gift-codes', changefreq: 'daily', priority: '0.9' },
  { path: '/creators', changefreq: 'weekly', priority: '0.8' },
  { path: '/creators/mirandus-plays', changefreq: 'weekly', priority: '0.8' },
  { path: '/guild-tool', changefreq: 'monthly', priority: '0.9' },
];

// Helper to generate alternate hreflangs for a given language-prefixed URL.
// Each language has its own URL: /en/guides, /fr/guides, ... (x-default -> /en).
function getAlternateLinks(loc) {
  let xml = '';
  LANGUAGES.forEach(lang => {
    const code = HREFLANG[lang] || lang;
    xml += `    <xhtml:link rel="alternate" hreflang="${code}" href="${SITE_URL}/${lang}${loc}" />\n`;
  });
  xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/${DEFAULT_LANG}${loc}" />`;
  return xml;
}

const routeEntries = [];

// 1. Static routes
staticRoutes.forEach(route => {
  routeEntries.push({
    loc: route.path,
    changefreq: route.changefreq,
    priority: route.priority
  });
});

// 2. Guides & News routes (only those with hasDetails: true)
tips.forEach(tip => {
  if (tip.hasDetails) {
    routeEntries.push({
      loc: tip.category === 'news' ? `/news/${tip.id}` : `/guides/${tip.id}`,
      changefreq: 'monthly',
      priority: '0.8'
    });
  }
});

// 3. Events routes
eventsData.forEach(event => {
  if (event.id) {
    routeEntries.push({
      loc: `/events/${event.id}`,
      changefreq: 'weekly',
      priority: '0.8'
    });
  }
});

// Generate sitemap XML content: one <url> entry per language per route.
let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset\n';
xml += '    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
xml += '    xmlns:xhtml="http://www.w3.org/1999/xhtml">\n\n';

routeEntries.forEach(route => {
  LANGUAGES.forEach(lang => {
    const loc = `${SITE_URL}/${lang}${route.loc}`;
    xml += '  <url>\n';
    xml += `    <loc>${loc}</loc>\n`;
    xml += `${getAlternateLinks(route.loc)}\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;
    xml += '  </url>\n';
  });
});

xml += '</urlset>\n';

const outputPath = path.resolve(__dirname, '../public/sitemap.xml');
fs.writeFileSync(outputPath, xml, 'utf8');
console.log(`Successfully generated sitemap.xml with ${routeEntries.length * LANGUAGES.length} routes at ${outputPath}`);
