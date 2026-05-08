import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import en from './locales/en/translation.json';
import fr from './locales/fr/translation.json';
import ko from './locales/ko/translation.json';
import de from './locales/de/translation.json';
import ja from './locales/ja/translation.json';
import zh from './locales/zh/translation.json';

const savedLang = typeof window !== 'undefined' ? localStorage.getItem('fgfwiki_lang') : null;

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            fr: { translation: fr },
            ko: { translation: ko },
            de: { translation: de },
            ja: { translation: ja },
            zh: { translation: zh }
        },
        lng: savedLang || undefined, // let detector pick if nothing saved
        fallbackLng: 'en',
        supportedLngs: ['en', 'fr', 'ko', 'de', 'ja', 'zh'],
        nonExplicitSupportedLngs: true, // 'fr-FR' -> 'fr', 'zh-CN' -> 'zh', 'zh-Hans' -> 'zh'
        detection: {
            order: ['localStorage', 'navigator', 'htmlTag'],
            lookupLocalStorage: 'fgfwiki_lang',
            caches: ['localStorage']
        },
        interpolation: {
            escapeValue: false, // React already safes from xss
        }
    });

export default i18n;
