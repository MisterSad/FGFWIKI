import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Gamepad2, ExternalLink, Sparkles, Tag } from 'lucide-react';
import { getInstantGamingAffiliateUrl, getInstantGamingLang, INSTANT_GAMING_AFFILIATE_ID } from '../../lib/partnerUtils';

export default function InstantGamingBanner({ className = '' }) {
    const { t, i18n } = useTranslation();
    const bannerContainerRef = useRef(null);
    const [hasDynamicContent, setHasDynamicContent] = useState(false);
    const affiliateUrl = getInstantGamingAffiliateUrl();
    const currentLang = getInstantGamingLang(i18n.language);

    useEffect(() => {
        let isSubscribed = true;

        // Set up Instant Gaming Banner configuration
        window.igBannerConfig = {
            lang: currentLang,
            igr: INSTANT_GAMING_AFFILIATE_ID,
            banners: ['ig-partner-banner-slot']
        };

        const targetNode = bannerContainerRef.current;
        let observer = null;

        if (targetNode) {
            observer = new MutationObserver(() => {
                if (isSubscribed && targetNode.children.length > 0) {
                    setHasDynamicContent(true);
                }
            });
            observer.observe(targetNode, { childList: true, subtree: true });
        }

        const existingScript = document.getElementById('ig-partner-loader');
        if (!existingScript) {
            const script = document.createElement('script');
            script.id = 'ig-partner-loader';
            script.src = 'https://www.instant-gaming.com/api/banner/partner/loader.js';
            script.async = true;
            script.defer = true;
            document.body.appendChild(script);
        }

        return () => {
            isSubscribed = false;
            if (observer) {
                observer.disconnect();
            }
        };
    }, [currentLang]);

    return (
        <section
            className={`ig-partner-card ${className}`}
            aria-label={t('partner.badge', 'Official Partner')}
            style={{
                position: 'relative',
                background: 'linear-gradient(135deg, var(--bg-surface) 0%, #12131C 100%)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: 'clamp(1rem, 3vw, 1.5rem)',
                margin: 'clamp(1.5rem, 4vw, 2.5rem) auto',
                maxWidth: '1200px',
                boxShadow: 'var(--imperial-shadow)',
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
        >
            {/* Top gold ambient glow */}
            <div
                aria-hidden="true"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: '10%',
                    right: '10%',
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
                    opacity: 0.7
                }}
            />

            {/* Header / Badges Row */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '0.75rem',
                    marginBottom: '1rem',
                    paddingBottom: '0.75rem',
                    borderBottom: '1px solid rgba(201, 168, 76, 0.1)'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            padding: '0.25rem 0.65rem',
                            borderRadius: '4px',
                            background: 'rgba(201, 168, 76, 0.12)',
                            border: '1px solid rgba(201, 168, 76, 0.3)',
                            color: 'var(--gold-bright)',
                            fontFamily: 'var(--font-label)',
                            fontSize: 'clamp(0.68rem, 1.5vw, 0.75rem)',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}
                    >
                        <Sparkles size={13} style={{ color: 'var(--gold)' }} />
                        {t('partner.badge', 'Official Partner')}
                    </span>
                </div>

                <div
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        color: 'var(--funplus-orange, #FF4500)',
                        fontFamily: 'var(--font-label)',
                        fontSize: 'clamp(0.7rem, 1.5vw, 0.8rem)',
                        fontWeight: 700,
                        letterSpacing: '0.5px'
                    }}
                >
                    <Tag size={14} />
                    <span>Jusqu'à -70% / Up to -70%</span>
                </div>
            </div>

            {/* Main Content Card Layout */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: '1.25rem'
                }}
            >
                {/* Left info column */}
                <div style={{ flex: '1 1 320px', minWidth: '260px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
                        <div
                            style={{
                                width: '38px',
                                height: '38px',
                                borderRadius: '8px',
                                background: 'linear-gradient(135deg, #FF4500 0%, #D83A00 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#FFFFFF',
                                boxShadow: '0 4px 12px rgba(255, 69, 0, 0.35)',
                                flexShrink: 0
                            }}
                        >
                            <Gamepad2 size={22} />
                        </div>
                        <div>
                            <h3
                                style={{
                                    margin: 0,
                                    color: 'var(--text-primary)',
                                    fontSize: 'clamp(1.05rem, 2.2vw, 1.25rem)',
                                    fontFamily: 'var(--font-hero)',
                                    fontWeight: 700,
                                    letterSpacing: '0.5px'
                                }}
                            >
                                {t('partner.title', 'Instant Gaming')}
                            </h3>
                        </div>
                    </div>

                    <p
                        style={{
                            margin: '0.4rem 0 0.5rem 0',
                            color: 'var(--text-secondary)',
                            fontSize: 'clamp(0.82rem, 1.8vw, 0.92rem)',
                            lineHeight: 1.5,
                            fontFamily: 'var(--font-body)'
                        }}
                    >
                        {t('partner.subtitle', 'Get PC & Console games, gift cards and subscriptions with up to -70% off while supporting FGF WIKI.')}
                    </p>

                    <span
                        style={{
                            display: 'block',
                            color: 'var(--text-dim)',
                            fontSize: 'clamp(0.68rem, 1.4vw, 0.74rem)',
                            fontFamily: 'var(--font-label)',
                            lineHeight: 1.4
                        }}
                    >
                        {t('partner.disclaimer', 'Affiliate partner. Purchases made via this link support the wiki hosting at no additional cost to you.')}
                    </span>
                </div>

                {/* Right CTA Button */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <a
                        href={affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${t('partner.cta', 'Explore Deals')} - Instant Gaming`}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.55rem',
                            padding: '0.75rem 1.4rem',
                            borderRadius: '8px',
                            background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-dim) 100%)',
                            color: '#060710',
                            fontWeight: 700,
                            fontFamily: 'var(--font-label)',
                            fontSize: 'clamp(0.85rem, 1.8vw, 0.95rem)',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            textDecoration: 'none',
                            boxShadow: '0 4px 14px rgba(201, 168, 76, 0.3)',
                            transition: 'all 0.25s ease',
                            cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(232, 201, 106, 0.45)';
                            e.currentTarget.style.background = 'linear-gradient(135deg, var(--gold-bright) 0%, var(--gold) 100%)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 14px rgba(201, 168, 76, 0.3)';
                            e.currentTarget.style.background = 'linear-gradient(135deg, var(--gold) 0%, var(--gold-dim) 100%)';
                        }}
                    >
                        <span>{t('partner.cta', 'Explore Deals')}</span>
                        <ExternalLink size={16} />
                    </a>
                </div>
            </div>

            {/* Dynamic Instant Gaming API Banner Slot (auto-populated by loader.js) */}
            <div
                ref={bannerContainerRef}
                className="ig-partner-banner-slot"
                style={{
                    marginTop: hasDynamicContent ? '1rem' : '0',
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    minHeight: hasDynamicContent ? '90px' : '0',
                    transition: 'all 0.3s ease'
                }}
            />
        </section>
    );
}
