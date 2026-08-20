import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

export const SUPPORTED_LANGS = [
    'en', 'fr', 'ko', 'de', 'ja', 'zh', 'pl', 'it', 'uk', 'es', 'pt', 'fi', 'sv', 'nb',
    'zh-tw', 'nl', 'id', 'tr', 'vi', 'ru', 'th', 'ms', 'ar'
];

/**
 * Returns the language prefix present in the URL path (e.g. "/fr/guides" -> "fr"),
 * or null when the first path segment is not a supported language.
 */
export function getLanguageFromPath() {
    if (typeof window === 'undefined') return null;
    const segment = window.location.pathname.split('/')[1] || '';
    return SUPPORTED_LANGS.includes(segment) ? segment : null;
}

i18n
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        supportedLngs: SUPPORTED_LANGS,
        nonExplicitSupportedLngs: true,
        detection: {
            // Language-prefixed URLs (e.g. /fr/guides) take priority, then the
            // saved preference, then the browser language.
            order: ['path', 'localStorage', 'navigator', 'htmlTag'],
            lookupFromPathIndex: 0,
            lookupLocalStorage: 'fgfwiki_lang',
            caches: ['localStorage']
        },
        backend: {
            loadPath: '/locales/{{lng}}/translation.json?v=20260821-3',
        },
        interpolation: {
            escapeValue: false, // React already safes from xss
        }
    });

export default i18n;
