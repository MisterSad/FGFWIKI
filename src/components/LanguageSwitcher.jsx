import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LANGS = [
    { code: 'en', label: 'EN' },
    { code: 'fr', label: 'FR' }
];

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const current = (i18n.resolvedLanguage || i18n.language || 'en').slice(0, 2).toLowerCase();

    const change = (code) => {
        if (code === current) return;
        i18n.changeLanguage(code);
        try { localStorage.setItem('fgfwiki_lang', code); } catch { /* ignore */ }
    };

    return (
        <div
            className="lang-switcher"
            role="group"
            aria-label="Language"
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 2,
                background: 'transparent',
                border: '1px solid var(--border)',
                borderRadius: 4,
                padding: '3px 4px',
                fontFamily: 'var(--font-label)'
            }}
        >
            <Globe size={13} style={{ color: 'var(--text-dim)', marginRight: 4, marginLeft: 2 }} />
            {LANGS.map(({ code, label }) => {
                const active = code === current;
                return (
                    <button
                        key={code}
                        type="button"
                        onClick={() => change(code)}
                        aria-pressed={active}
                        style={{
                            background: active ? 'var(--gold)' : 'transparent',
                            color: active ? '#000' : 'var(--text-dim)',
                            border: 'none',
                            padding: '3px 8px',
                            fontSize: '0.72rem',
                            fontWeight: active ? 700 : 500,
                            letterSpacing: 1,
                            cursor: active ? 'default' : 'pointer',
                            borderRadius: 2,
                            transition: 'all 0.2s ease',
                            fontFamily: 'var(--font-label)'
                        }}
                    >
                        {label}
                    </button>
                );
            })}
        </div>
    );
}
