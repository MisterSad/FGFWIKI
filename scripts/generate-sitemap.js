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

const staticRoutes = [
  { path: '', changefreq: 'weekly', priority: '1.0' },
  { path: '/home', changefreq: 'weekly', priority: '1.0' },
  { path: '/guides', changefreq: 'weekly', priority: '0.9' },
  { path: '/champions', changefreq: 'weekly', priority: '0.9' },
  { path: '/flagships', changefreq: 'weekly', priority: '0.9' },
  { path: '/events', changefreq: 'weekly', priority: '1.0' },
  { path: '/tools', changefreq: 'monthly', priority: '0.8' },
  { path: '/gift-codes', changefreq: 'daily', priority: '0.9' },
  { path: '/support', changefreq: 'monthly', priority: '0.4' },
];

const urls = [];

// Helper to generate alternate hreflangs
function getAlternateLinks(routePath) {
  let xml = '';
  LANGUAGES.forEach(lang => {
    const code = HREFLANG[lang] || lang;
    xml += `    <xhtml:link rel="alternate" hreflang="${code}" href="${SITE_URL}${routePath}" />\n`;
  });
  // x-default
  xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${routePath}" />`;
  return xml;
}

// 1. Static routes
staticRoutes.forEach(route => {
  urls.push({
    loc: `${SITE_URL}${route.path}`,
    alternates: getAlternateLinks(route.path),
    changefreq: route.changefreq,
    priority: route.priority
  });
});

// 2. Guides routes (only those with hasDetails: true)
tips.forEach(tip => {
  if (tip.hasDetails) {
    const routePath = `/guides/${tip.id}`;
    urls.push({
      loc: `${SITE_URL}${routePath}`,
      alternates: getAlternateLinks(routePath),
      changefreq: 'monthly',
      priority: '0.8'
    });
  }
});

// 3. Events routes
eventsData.forEach(event => {
  if (event.id) {
    const routePath = `/events/${event.id}`;
    urls.push({
      loc: `${SITE_URL}${routePath}`,
      alternates: getAlternateLinks(routePath),
      changefreq: 'weekly',
      priority: '0.8'
    });
  }
});

// Generate sitemap XML content
let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset\n';
xml += '    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
xml += '    xmlns:xhtml="http://www.w3.org/1999/xhtml">\n\n';

urls.forEach(urlObj => {
  xml += '  <url>\n';
  xml += `    <loc>${urlObj.loc}</loc>\n`;
  xml += `${urlObj.alternates}\n`;
  xml += `    <changefreq>${urlObj.changefreq}</changefreq>\n`;
  xml += `    <priority>${urlObj.priority}</priority>\n`;
  xml += '  </url>\n';
});

xml += '</urlset>\n';

const outputPath = path.resolve(__dirname, '../public/sitemap.xml');
fs.writeFileSync(outputPath, xml, 'utf8');
console.log(`Successfully generated sitemap.xml with ${urls.length} routes at ${outputPath}`);
