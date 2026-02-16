import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Hero() {
    const { t } = useTranslation();

    return (
        <div style={{
            position: 'relative',
            minHeight: '100vh', /* Full viewport height */
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start', // Align content to the top
            alignItems: 'center',
            overflow: 'hidden',
            paddingTop: '4rem' // Reduced space to bring content closer to theheader
        }} className="fade-in">



            <h1 style={{ fontSize: '3.5rem', marginBottom: '0.5rem', lineHeight: 1.1, textShadow: '0 4px 20px rgba(0,0,0,0.8)', zIndex: 1, textAlign: 'center' }}>
                {t('hero.title_prefix')} <br />
                <span className="text-gradient" style={{ fontSize: '4.5rem' }}>{t('hero.title_main')}</span>
            </h1>

            <div style={{ maxWidth: '700px', margin: '0 auto 2rem', textShadow: '0 2px 10px rgba(0,0,0,0.8)', zIndex: 1, textAlign: 'center' }}>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '0.5rem', fontWeight: 500 }}>
                    {t('hero.subtitle_1')}
                </p>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-dim)', margin: 0 }}>
                    {t('hero.subtitle_2')}
                </p>
            </div>

            {/* Hari Seldon Animation (Floating) */}
            <div style={{
                marginBottom: '1rem',
                animation: 'float 6s ease-in-out infinite',
                filter: 'drop-shadow(0 0 30px rgba(0, 243, 255, 0.3))',
                zIndex: 0
            }}>
                <img
                    src="/assets/hari_seldon.png"
                    alt="Hari Seldon"
                    style={{
                        maxHeight: '60vh', // Increased height since it's now lower/main focus below text
                        objectFit: 'contain',
                        maskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)',
                        WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)',
                        opacity: 0.9 // Slightly higher opacity since we are masking edges
                    }}
                />
            </div>
        </div>
    );
}
