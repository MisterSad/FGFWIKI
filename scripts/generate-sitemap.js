import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { tips, eventsData } from '../src/data/gameData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://fgfwiki.com';
const CURRENT_DATE = new Date().toISOString().split('T')[0]; // e.g. 2026-08-18

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
  { path: '/home', changefreq: 'weekly', priority: '1.0', images: ['/og-image.png'] },
  { path: '/news', changefreq: 'weekly', priority: '0.9', images: ['/og-image.png'] },
  { path: '/guides', changefreq: 'weekly', priority: '0.9', images: ['/images/2.webp', '/images/3.webp'] },
  { path: '/champions', changefreq: 'weekly', priority: '0.9', images: ['/images/Doug Rockwell.webp', '/images/Kama Moai.webp'] },
  { path: '/flagships', changefreq: 'weekly', priority: '0.9', images: ['/images/4.webp'] },
  { path: '/events', changefreq: 'weekly', priority: '1.0', images: ['/images/5.webp'] },
  { path: '/tools', changefreq: 'monthly', priority: '0.8', images: ['/og-image.png'] },
  { path: '/gift-codes', changefreq: 'daily', priority: '0.9', images: ['/og-image.png'] },
  { path: '/creators', changefreq: 'weekly', priority: '0.8', images: ['/og-image.png'] },
  { path: '/creators/mirandus-plays', changefreq: 'weekly', priority: '0.8', images: ['/og-image.png'] },
  { path: '/guild-tool', changefreq: 'monthly', priority: '0.9', images: ['/og-image.png'] },
  { path: '/evolutions', changefreq: 'daily', priority: '0.9', images: ['/og-image.png'] },
  { path: '/terms', changefreq: 'monthly', priority: '0.5', images: ['/og-image.png'] },
];

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
    priority: route.priority,
    lastmod: CURRENT_DATE,
    images: route.images || []
  });
});

// 2. Guides & News routes
tips.forEach(tip => {
  if (tip.hasDetails) {
    const tipImages = [];
    if (tip.sections) {
      tip.sections.forEach(s => {
        if (s.image) tipImages.push(s.image);
      });
    }
    const pubDate = tip.publishDate ? tip.publishDate.split('T')[0] : CURRENT_DATE;
    routeEntries.push({
      loc: tip.category === 'news' ? `/news/${tip.id}` : `/guides/${tip.id}`,
      changefreq: 'monthly',
      priority: '0.8',
      lastmod: pubDate,
      images: tipImages
    });
  }
});

// 3. Events routes
eventsData.forEach(event => {
  if (event.id) {
    routeEntries.push({
      loc: `/events/${event.id}`,
      changefreq: 'weekly',
      priority: '0.8',
      lastmod: CURRENT_DATE,
      images: event.image ? [event.image] : []
    });
  }
});

// Generate Sitemap XML with Image extension
let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset\n';
xml += '    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
xml += '    xmlns:xhtml="http://www.w3.org/1999/xhtml"\n';
xml += '    xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n\n';

routeEntries.forEach(route => {
  LANGUAGES.forEach(lang => {
    const loc = `${SITE_URL}/${lang}${route.loc}`;
    xml += '  <url>\n';
    xml += `    <loc>${loc}</loc>\n`;
    xml += `    <lastmod>${route.lastmod}</lastmod>\n`;
    xml += `${getAlternateLinks(route.loc)}\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;

    if (route.images && route.images.length > 0) {
      route.images.forEach(img => {
        const fullImg = img.startsWith('http') ? img : `${SITE_URL}${img}`;
        xml += `    <image:image>\n`;
        xml += `      <image:loc>${fullImg}</image:loc>\n`;
        xml += `      <image:title>Foundation: Galactic Frontier - ${route.loc.replace('/', '')}</image:title>\n`;
        xml += `    </image:image>\n`;
      });
    }

    xml += '  </url>\n';
  });
});

xml += '</urlset>\n';

const outputPath = path.resolve(__dirname, '../public/sitemap.xml');
fs.writeFileSync(outputPath, xml, 'utf8');
console.log(`Successfully generated sitemap.xml with ${routeEntries.length * LANGUAGES.length} URLs at ${outputPath}`);

