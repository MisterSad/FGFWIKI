import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

describe('SEO & GEO Verification Suite (2026 World-Class Standards)', () => {
    it('should have all 23 languages with 100% complete key parity across all sections', () => {
        const localesDir = path.join(ROOT, 'public/locales');
        const langs = fs.readdirSync(localesDir).filter(f => fs.statSync(path.join(localesDir, f)).isDirectory());
        
        function getFlatKeys(obj, prefix = "") {
            let keys = {};
            for (const [k, v] of Object.entries(obj)) {
                const fullKey = prefix ? `${prefix}.${k}` : k;
                if (typeof v === "object" && v !== null && !Array.isArray(v)) {
                    Object.assign(keys, getFlatKeys(v, fullKey));
                } else {
                    keys[fullKey] = v;
                }
            }
            return keys;
        }

        const enData = JSON.parse(fs.readFileSync(path.join(localesDir, 'en/translation.json'), 'utf8'));
        const enKeys = Object.keys(getFlatKeys(enData));

        expect(langs.length).toBeGreaterThanOrEqual(23);
        expect(enKeys.length).toBeGreaterThanOrEqual(1790);

        langs.forEach(lang => {
            const file = path.join(localesDir, lang, 'translation.json');
            expect(fs.existsSync(file)).toBe(true);
            const data = JSON.parse(fs.readFileSync(file, 'utf8'));
            const langKeys = getFlatKeys(data);
            const missing = enKeys.filter(k => !(k in langKeys));
            expect(missing).toEqual([]);
        });
    });

    it('should have all 23 languages with 100% complete guild_tool translations', () => {
        const localesDir = path.join(ROOT, 'public/locales');
        const langs = fs.readdirSync(localesDir);
        const enData = JSON.parse(fs.readFileSync(path.join(localesDir, 'en/translation.json'), 'utf8'));
        const requiredKeys = Object.keys(enData.guild_tool || {});

        expect(langs.length).toBeGreaterThanOrEqual(23);
        expect(requiredKeys.length).toBe(188);

        langs.forEach(lang => {
            const file = path.join(localesDir, lang, 'translation.json');
            if (fs.existsSync(file)) {
                const data = JSON.parse(fs.readFileSync(file, 'utf8'));
                expect(data.guild_tool).toBeDefined();
                const missing = requiredKeys.filter(k => !data.guild_tool[k]);
                expect(missing).toEqual([]);
                expect(Object.keys(data.guild_tool).length).toBe(188);
            }
        });
    });

    it('should have a 2026 AI-friendly robots.txt allowing all major AI search agents', () => {
        const robots = fs.readFileSync(path.join(ROOT, 'public/robots.txt'), 'utf8');
        expect(robots).toContain('User-agent: GPTBot');
        expect(robots).toContain('User-agent: ClaudeBot');
        expect(robots).toContain('User-agent: PerplexityBot');
        expect(robots).toContain('User-agent: Google-Extended');
        expect(robots).toContain('User-agent: Applebot');
        expect(robots).toContain('Allow: /llms.txt');
        expect(robots).toContain('Allow: /llms-full.txt');
        expect(robots).toContain('Sitemap: https://fgfwiki.com/sitemap.xml');
    });

    it('should have valid llms.txt and llms-full.txt files', () => {
        const llms = fs.readFileSync(path.join(ROOT, 'public/llms.txt'), 'utf8');
        const llmsFull = fs.readFileSync(path.join(ROOT, 'public/llms-full.txt'), 'utf8');

        expect(llms).toContain('# Foundation: Galactic Frontier Wiki');
        expect(llms).toContain('llms-full.txt');
        expect(llms).toContain('https://fgfwiki.com');

        expect(llmsFull).toContain('Hero Tier List');
        expect(llmsFull).toContain('Flagship Archetypes');
        expect(llmsFull).toContain('Optimal Ground Team');
        expect(llmsFull).toContain('16 AI Vision OCR Scanners');
        expect(llmsFull.length).toBeGreaterThan(3000);
    });

    it('should have index.html with all 23 language hreflang links and rich JSON-LD graph', () => {
        const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

        const langs = [
            'en', 'fr', 'de', 'es', 'it', 'pl', 'pt', 'ru', 'uk', 'ja', 'ko', 'zh-Hans',
            'zh-Hant', 'nl', 'id', 'tr', 'vi', 'th', 'ms', 'ar', 'fi', 'sv', 'nb', 'x-default'
        ];

        langs.forEach(lang => {
            expect(html).toContain(`hreflang="${lang}"`);
        });

        expect(html).toContain('/llms.txt');
        expect(html).toContain('/llms-full.txt');
        expect(html).toContain('@type": "WebSite"');
        expect(html).toContain('@type": "Organization"');
        expect(html).toContain('@type": "VideoGame"');
        expect(html).toContain('<noscript>');
    });

    it('should have a comprehensive sitemap.xml with over 1000 URLs, lastmod, and Google Image extension', () => {
        const sitemap = fs.readFileSync(path.join(ROOT, 'public/sitemap.xml'), 'utf8');
        expect(sitemap).toContain('xmlns:xhtml="http://www.w3.org/1999/xhtml"');
        expect(sitemap).toContain('xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"');
        expect(sitemap).toContain('<lastmod>');
        expect(sitemap).toContain('<image:image>');

        const urlCount = (sitemap.match(/<url>/g) || []).length;
        expect(urlCount).toBeGreaterThanOrEqual(1000);
    });
});
