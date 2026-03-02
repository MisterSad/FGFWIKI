import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Hero() {
    const { t } = useTranslation();

    return (
        <div className="hero-halo" style={{
            position: 'relative',
            minHeight: 'calc(100vh - 64px)', /* Full viewport height minus header */
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: '2rem',
            paddingBottom: '4rem'
        }}>

            <div style={{ textAlign: 'center', zIndex: 1, position: 'relative' }}>
                {/* Small top label */}
                <div style={{
                    fontFamily: 'var(--font-label)',
                    color: 'var(--gold-dim)',
                    letterSpacing: '6px',
                    fontSize: '0.9rem',
                    textTransform: 'uppercase',
                    marginBottom: '1rem',
                    animation: 'fadeUp 1s ease-out forwards'
                }}>
                    {t('hero.subtitle_1', 'GALACTIC FRONTIER')}
                </div>

                <h1 style={{
                    fontSize: 'clamp(40px, 8vw, 80px)',
                    lineHeight: 1.1,
                    margin: '0 0 2rem 0',
                    animation: 'titleReveal 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards'
                }}>
                    <span style={{ color: 'var(--text-primary)' }}>{t('hero.title_prefix', 'THE')}</span><br />
                    <span style={{ color: 'var(--gold-bright)' }}>{t('hero.title_main', 'FOUNDATION')}</span>
                </h1>

                {/* Decorative Line */}
                <div style={{
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
                    margin: '0 auto 2.5rem',
                    animation: 'expandLine 1.5s ease-out forwards 0.5s',
                    width: '0%', // Will animate to 120px
                    opacity: 0
                }}></div>

                <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <p style={{
                        fontSize: '1.2rem',
                        color: 'var(--text-secondary)',
                        margin: 0,
                        animation: 'fadeUp 1s ease-out forwards 0.8s',
                        opacity: 0,
                        lineHeight: 1.6
                    }}>
                        {t('hero.subtitle_2', 'Preserving knowledge for the coming darkness.')}
                    </p>
                </div>
            </div>

            {/* Background Image (Hari Seldon / Vault aesthetic) */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 0,
                width: '100%',
                maxWidth: '1600px', /* Increased by 2x */
                pointerEvents: 'none',
                animation: 'fadeUpCenter 2s ease-out forwards 1s',
                opacity: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <img
                    src="/assets/hari_seldon.png"
                    alt="Hari Seldon"
                    onError={(e) => e.target.style.display = 'none'} // Hide if missing
                    style={{
                        width: '100%',
                        height: 'auto',
                        maxHeight: '120vh', /* Increased by 2x */
                        objectFit: 'contain',
                        maskImage: 'linear-gradient(to top, transparent 0%, black 30%, black 70%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 30%, black 70%, transparent 100%)',
                        filter: 'sepia(40%) hue-rotate(10deg) opacity(0.3)', // Give it an old holographic recording feel
                        mixBlendMode: 'screen'
                    }}
                />
            </div>
        </div>
    );
}
