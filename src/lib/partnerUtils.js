/**
 * Instant Gaming Partner Utilities
 * Handles language code normalization and affiliate link generation
 */

export const INSTANT_GAMING_AFFILIATE_ID = 'gamer-3167b41';
export const INSTANT_GAMING_BASE_URL = 'https://www.instant-gaming.com/';

const SUPPORTED_IG_LANGUAGES = ['fr', 'en', 'de', 'es', 'it', 'pt', 'da', 'nl', 'pl', 'br'];

/**
 * Normalizes an i18n language string to an Instant Gaming supported language
 * @param {string} lang - i18n language code (e.g. 'fr', 'zh-tw', 'pt-BR')
 * @returns {string} - Supported IG language code ('en', 'fr', etc.)
 */
export function getInstantGamingLang(lang) {
    if (!lang) return 'en';
    const cleanLang = lang.toLowerCase().split('-')[0];
    if (cleanLang === 'pt') return 'pt';
    if (SUPPORTED_IG_LANGUAGES.includes(cleanLang)) {
        return cleanLang;
    }
    return 'en';
}

/**
 * Generates the full partner URL with affiliate tag
 * @param {string} [path=''] - Optional path on instant-gaming.com
 * @returns {string} - Full affiliate URL
 */
export function getInstantGamingAffiliateUrl(path = '') {
    const trimmedPath = path.startsWith('/') ? path.slice(1) : path;
    const separator = trimmedPath.includes('?') ? '&' : '?';
    return `${INSTANT_GAMING_BASE_URL}${trimmedPath}${separator}igr=${INSTANT_GAMING_AFFILIATE_ID}`;
}
