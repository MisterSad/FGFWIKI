/**
 * Translation service using Google Cloud Translation API with multi-layer localStorage cache.
 */

const CACHE_KEY = 'fgf_translation_cache_v1';
const API_KEY = import.meta.env.VITE_GOOGLE_TRANSLATION_API_KEY || import.meta.env.VITE_FIREBASE_API_KEY || '';

// Map app locales to Google Cloud standard language codes
const LANG_MAP = {
    'en': 'en',
    'fr': 'fr',
    'ko': 'ko',
    'de': 'de',
    'ja': 'ja',
    'zh': 'zh-CN',
    'zh-tw': 'zh-TW',
    'pl': 'pl',
    'it': 'it',
    'uk': 'uk',
    'es': 'es',
    'pt': 'pt',
    'fi': 'fi',
    'sv': 'sv',
    'nb': 'no',
    'nl': 'nl',
    'id': 'id',
    'tr': 'tr',
    'vi': 'vi',
    'ru': 'ru',
    'th': 'th',
    'ms': 'ms',
    'ar': 'ar'
};

function getCache() {
    try {
        const item = localStorage.getItem(CACHE_KEY);
        return item ? JSON.parse(item) : {};
    } catch {
        return {};
    }
}

function setCache(cache) {
    try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    } catch (e) {
        console.warn('Unable to persist translation cache to localStorage', e);
    }
}

function createHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0;
    }
    return String(hash);
}

/**
 * Translate text into the target language.
 * Checks cache first to avoid consuming Google Cloud quotas.
 * 
 * @param {string} text - Text to translate
 * @param {string} targetLocale - App language code (e.g. 'fr', 'en', 'ko')
 * @returns {Promise<string>} Translated text
 */
export async function translateText(text, targetLocale) {
    if (!text || typeof text !== 'string' || !text.trim()) {
        return text;
    }

    const cleanText = text.trim();
    const targetLang = LANG_MAP[targetLocale.toLowerCase()] || targetLocale;
    const cacheKey = `${targetLang}_${createHash(cleanText)}`;

    // 1. Check local cache
    const cache = getCache();
    if (cache[cacheKey]) {
        return cache[cacheKey];
    }

    // 2. Call Google Cloud Translation API if API Key is available
    if (API_KEY) {
        try {
            const url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    q: cleanText,
                    target: targetLang,
                    format: 'text',
                }),
            });

            if (response.ok) {
                const data = await response.json();
                const translated = data?.data?.translations?.[0]?.translatedText;
                if (translated) {
                    cache[cacheKey] = translated;
                    setCache(cache);
                    return translated;
                }
            }
        } catch (e) {
            console.warn('Google Cloud Translation direct call failed, attempting fallback', e);
        }
    }

    // 3. Fallback: MyMemory API (Free, resilient backup)
    try {
        const fallbackUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(cleanText)}&langpair=autodetect|${targetLang}`;
        const fallbackRes = await fetch(fallbackUrl);
        if (fallbackRes.ok) {
            const fallbackData = await fallbackRes.json();
            const translated = fallbackData?.responseData?.translatedText;
            if (translated && !translated.startsWith('MYMEMORY WARNING:')) {
                cache[cacheKey] = translated;
                setCache(cache);
                return translated;
            }
        }
    } catch (e) {
        console.error('Translation fallback failed', e);
    }

    // Return original text if all translation endpoints fail
    return cleanText;
}
