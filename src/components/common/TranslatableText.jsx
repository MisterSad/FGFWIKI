import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, RefreshCw } from 'lucide-react';
import { translateText } from '../../services/translate';

export default function TranslatableText({ text, as: Component = 'p', style, className = '' }) {
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language || 'en';

    // State keyed by language and text to avoid synchronous useEffect resets
    const [translations, setTranslations] = useState({});

    const entryKey = `${currentLang}_${text}`;
    const state = translations[entryKey] || {
        translatedText: null,
        isTranslated: false,
        loading: false,
        error: false
    };

    const handleTranslate = async (e) => {
        e.stopPropagation();
        if (state.isTranslated) {
            setTranslations((prev) => ({
                ...prev,
                [entryKey]: { ...state, isTranslated: false }
            }));
            return;
        }

        if (state.translatedText) {
            setTranslations((prev) => ({
                ...prev,
                [entryKey]: { ...state, isTranslated: true }
            }));
            return;
        }

        setTranslations((prev) => ({
            ...prev,
            [entryKey]: { ...state, loading: true, error: false }
        }));

        try {
            const result = await translateText(text, currentLang);
            if (result && result !== text) {
                setTranslations((prev) => ({
                    ...prev,
                    [entryKey]: {
                        translatedText: result,
                        isTranslated: true,
                        loading: false,
                        error: false
                    }
                }));
            } else {
                setTranslations((prev) => ({
                    ...prev,
                    [entryKey]: {
                        translatedText: result,
                        isTranslated: false,
                        loading: false,
                        error: false
                    }
                }));
            }
        } catch {
            setTranslations((prev) => ({
                ...prev,
                [entryKey]: {
                    ...state,
                    loading: false,
                    error: true
                }
            }));
        }
    };

    const handleToggle = (e) => {
        e.stopPropagation();
        setTranslations((prev) => ({
            ...prev,
            [entryKey]: { ...state, isTranslated: !state.isTranslated }
        }));
    };

    const displayedText = state.isTranslated && state.translatedText ? state.translatedText : text;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <Component className={className} style={style}>
                {displayedText}
            </Component>

            {text && text.trim().length > 3 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.15rem' }}>
                    {!state.translatedText && !state.loading && (
                        <button
                            type="button"
                            onClick={handleTranslate}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                background: 'transparent',
                                border: 'none',
                                padding: 0,
                                color: 'var(--text-dim, #5E5B50)',
                                fontSize: '0.75rem',
                                cursor: 'pointer',
                                transition: 'color 0.15s ease',
                                textDecoration: 'underline',
                                textUnderlineOffset: '2px'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--gold, #C9A84C)'}
                            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-dim, #5E5B50)'}
                            aria-label={t('translate_action.translate', { defaultValue: 'Translate' })}
                        >
                            <Globe size={12} />
                            <span>{t('translate_action.translate', { defaultValue: 'Translate' })}</span>
                        </button>
                    )}

                    {state.loading && (
                        <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            color: 'var(--gold, #C9A84C)',
                            fontSize: '0.75rem'
                        }}>
                            <RefreshCw size={11} className="spin" />
                            <span>{t('translate_action.translating', { defaultValue: 'Translating…' })}</span>
                        </span>
                    )}

                    {state.translatedText && !state.loading && (
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontSize: '0.72rem',
                            color: 'var(--text-dim, #5E5B50)'
                        }}>
                            <span style={{ color: 'var(--gold, #C9A84C)', fontWeight: '600' }}>
                                {state.isTranslated 
                                    ? t('translate_action.translated', { defaultValue: 'Translated' }) 
                                    : t('translate_action.original', { defaultValue: 'Original' })}
                            </span>
                            <span>·</span>
                            <button
                                type="button"
                                onClick={handleToggle}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    padding: 0,
                                    color: 'var(--text-secondary, #8A8778)',
                                    fontSize: '0.72rem',
                                    cursor: 'pointer',
                                    textDecoration: 'underline'
                                }}
                            >
                                {state.isTranslated 
                                    ? t('translate_action.show_original', { defaultValue: 'Show original' }) 
                                    : t('translate_action.show_translation', { defaultValue: 'Show translation' })}
                            </button>
                        </div>
                    )}

                    {state.error && (
                        <span style={{ color: 'var(--text-dim, #5E5B50)', fontSize: '0.72rem' }}>
                            {t('translate_action.error', { defaultValue: 'Translation unavailable' })}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}
