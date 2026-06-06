import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

const savedLang = typeof window !== 'undefined' ? localStorage.getItem('fgfwiki_lang') : null;

i18n
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        lng: savedLang || 'en',
        supportedLngs: [
            'en', 'fr', 'ko', 'de', 'ja', 'zh', 'pl', 'it', 'uk', 'es', 'pt', 'fi', 'sv', 'nb',
            'zh-tw', 'nl', 'id', 'tr', 'vi', 'ru', 'th', 'ms', 'ar'
        ],
        nonExplicitSupportedLngs: true,
        detection: {
            order: ['localStorage', 'navigator', 'htmlTag'],
            lookupLocalStorage: 'fgfwiki_lang',
            caches: ['localStorage']
        },
        backend: {
            loadPath: '/locales/{{lng}}/translation.json',
        },
        interpolation: {
            escapeValue: false, // React already safes from xss
        }
    });

export default i18n;
