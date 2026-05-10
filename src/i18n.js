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
import pl from './locales/pl/translation.json';
import it from './locales/it/translation.json';
import uk from './locales/uk/translation.json';
import es from './locales/es/translation.json';
import pt from './locales/pt/translation.json';
import fi from './locales/fi/translation.json';
import sv from './locales/sv/translation.json';
import nb from './locales/nb/translation.json';

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
            zh: { translation: zh },
            pl: { translation: pl },
            it: { translation: it },
            uk: { translation: uk },
            es: { translation: es },
            pt: { translation: pt },
            fi: { translation: fi },
            sv: { translation: sv },
            nb: { translation: nb }
        },
        // Default to English on first visit. Auto-detection from the browser
        // is intentionally bypassed: the user picks their language explicitly
        // via the language switcher (preference persisted in localStorage).
        lng: savedLang || 'en',
        fallbackLng: 'en',
        supportedLngs: ['en', 'fr', 'ko', 'de', 'ja', 'zh', 'pl', 'it', 'uk', 'es', 'pt', 'fi', 'sv', 'nb'],
        nonExplicitSupportedLngs: true, // 'fr-FR' -> 'fr', 'zh-CN' -> 'zh', 'pt-BR' -> 'pt', 'es-ES' -> 'es', etc.
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
