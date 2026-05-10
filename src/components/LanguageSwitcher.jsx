import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Check, ChevronDown } from 'lucide-react';

// Language list — autonyms (each language displayed in its own script).
// Order: English first (default), then Latin-script alphabetical, then Cyrillic, then CJK.
const LANGS = [
    { code: 'en', label: 'English' },
    { code: 'de', label: 'Deutsch' },
    { code: 'es', label: 'Español' },
    { code: 'fr', label: 'Français' },
    { code: 'it', label: 'Italiano' },
    { code: 'nb', label: 'Norsk' },
    { code: 'pl', label: 'Polski' },
    { code: 'pt', label: 'Português' },
    { code: 'fi', label: 'Suomi' },
    { code: 'sv', label: 'Svenska' },
    { code: 'uk', label: 'Українська' },
    { code: 'ja', label: '日本語' },
    { code: 'ko', label: '한국어' },
    { code: 'zh', label: '简体中文' }
];

const DEFAULT_CODE = 'en';

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const [open, setOpen] = useState(false);
    const containerRef = useRef(null);
    const triggerRef = useRef(null);

    const current = (i18n.resolvedLanguage || i18n.language || DEFAULT_CODE)
        .slice(0, 2)
        .toLowerCase();
    const currentLang = LANGS.find((l) => l.code === current) || LANGS[0];

    const change = useCallback(
        (code) => {
            setOpen(false);
            if (code === current) return;
            i18n.changeLanguage(code);
            try {
                localStorage.setItem('fgfwiki_lang', code);
            } catch {
                /* ignore (private mode, etc.) */
            }
        },
        [current, i18n]
    );

    // Close on click outside.
    useEffect(() => {
        if (!open) return;
        const onDocClick = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', onDocClick);
        return () => document.removeEventListener('mousedown', onDocClick);
    }, [open]);

    // Close on Escape, return focus to the trigger.
    useEffect(() => {
        if (!open) return;
        const onKey = (e) => {
            if (e.key === 'Escape') {
                setOpen(false);
                triggerRef.current?.focus();
            }
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [open]);

    return (
        <div
            ref={containerRef}
            className="lang-switcher"
            style={{
                position: 'relative',
                display: 'inline-block',
                fontFamily: 'var(--font-label)'
            }}
        >
            <button
                ref={triggerRef}
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-label={`Language: ${currentLang.label}`}
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    background: 'transparent',
                    border: '1px solid var(--border)',
                    borderRadius: 4,
                    padding: '4px 8px',
                    color: 'var(--text-dim)',
                    fontSize: '0.78rem',
                    letterSpacing: 0.5,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontFamily: 'var(--font-label)'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--gold)';
                    e.currentTarget.style.borderColor = 'var(--gold)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-dim)';
                    e.currentTarget.style.borderColor = 'var(--border)';
                }}
            >
                <Globe size={14} aria-hidden="true" />
                <span style={{ minWidth: 0 }}>{currentLang.label}</span>
                <ChevronDown
                    size={12}
                    aria-hidden="true"
                    style={{
                        transition: 'transform 0.2s ease',
                        transform: open ? 'rotate(180deg)' : 'rotate(0deg)'
                    }}
                />
            </button>

            {open && (
                <ul
                    role="listbox"
                    aria-label="Choose language"
                    style={{
                        position: 'absolute',
                        top: 'calc(100% + 6px)',
                        right: 0,
                        zIndex: 1000,
                        margin: 0,
                        padding: 4,
                        listStyle: 'none',
                        minWidth: 160,
                        background: 'var(--bg-elevated)',
                        border: '1px solid var(--border)',
                        borderRadius: 4,
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)',
                        fontFamily: 'var(--font-label)'
                    }}
                >
                    {LANGS.map(({ code, label }) => {
                        const active = code === current;
                        return (
                            <li key={code} role="none">
                                <button
                                    type="button"
                                    role="option"
                                    aria-selected={active}
                                    onClick={() => change(code)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        gap: 12,
                                        width: '100%',
                                        background: active ? 'var(--gold)' : 'transparent',
                                        color: active ? '#000' : 'var(--text-primary)',
                                        border: 'none',
                                        padding: '8px 10px',
                                        fontSize: '0.85rem',
                                        fontWeight: active ? 700 : 500,
                                        letterSpacing: 0.3,
                                        textAlign: 'left',
                                        cursor: active ? 'default' : 'pointer',
                                        borderRadius: 2,
                                        transition: 'background 0.15s ease, color 0.15s ease',
                                        fontFamily: 'var(--font-label)'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (active) return;
                                        e.currentTarget.style.background = 'var(--border-hover)';
                                        e.currentTarget.style.color = 'var(--gold-bright)';
                                    }}
                                    onMouseLeave={(e) => {
                                        if (active) return;
                                        e.currentTarget.style.background = 'transparent';
                                        e.currentTarget.style.color = 'var(--text-primary)';
                                    }}
                                >
                                    <span>{label}</span>
                                    {active && <Check size={14} aria-hidden="true" />}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
