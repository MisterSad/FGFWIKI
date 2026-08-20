// Locale codes used in language-prefixed URLs (e.g. /fr/guides).
const LANGS = [
    'en', 'fr', 'ko', 'de', 'ja', 'zh', 'pl', 'it', 'uk', 'es', 'pt', 'fi', 'sv', 'nb',
    'zh-tw', 'nl', 'id', 'tr', 'vi', 'ru', 'th', 'ms', 'ar'
];

// All top-level SPA routes (without the language prefix).
const SPA_ROUTES = [
    '/home',
    '/news',
    '/guides',
    '/champions',
    '/flagships',
    '/events',
    '/tools',
    '/gift-codes',
    '/stella-anomaly',
    '/creators',
    '/guild-tool',
    '/evolutions',
    '/flagship-decks',
    '/ground-teams',
];

export default function middleware(request) {
    const { pathname } = new URL(request.url);

    // Strip the optional language prefix to get the SPA path.
    const segments = pathname.split('/').filter(Boolean);
    let rest = pathname;
    if (segments[0] && LANGS.includes(segments[0])) {
        rest = `/${segments.slice(1).join('/')}`;
    }
    if (rest === '') rest = '/';

    const isRoot = rest === '/';
    const matched = isRoot || SPA_ROUTES.some(
        (route) => rest === route || rest.startsWith(`${route}/`)
    );

    // Unknown paths get a real 404 (previously they soft-redirected to /home).
    if (matched) {
        return; // continue to the normal Vercel rewrite pipeline
    }
    return new Response('404 Not Found', {
        status: 404,
        headers: { 'content-type': 'text/plain; charset=utf-8' },
    });
}

export const config = {
    matcher: [
        '/((?!assets|images|locales|favicon\\.png|apple-touch-icon\\.png|icon-512\\.png|robots\\.txt|sitemap\\.xml|manifest\\.webmanifest|llms\\.txt|llms-full\\.txt|og-image\\.png|sw\\.js).*)',
    ],
};
