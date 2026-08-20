import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { ArrowUp } from 'lucide-react';
import Header from './Header';
import Tabs from './Tabs';
import AmbientSignal from '../common/AmbientSignal';
import InstantGamingBanner from '../common/InstantGamingBanner';
import useSEO from '../../hooks/useSEO';
import { getInstantGamingAffiliateUrl } from '../../lib/partnerUtils';

export default function Layout({ children, onLoginClick, onSearchClick, onProfileClick }) {
    const location = useLocation();
    const { t, i18n } = useTranslation();
    const [showScrollTop, setShowScrollTop] = useState(false);
    useSEO();

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        if (i18n.language) {
            document.documentElement.dir = i18n.language.startsWith('ar') ? 'rtl' : 'ltr';
            document.documentElement.lang = i18n.language;
        }
    }, [i18n.language]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        const observeElements = () => {
            const elements = document.querySelectorAll('.reveal');
            elements.forEach(el => observer.observe(el));
        };

        observeElements();

        const mutationObserver = new MutationObserver(() => {
            observeElements();
        });

        mutationObserver.observe(document.body, {
            childList: true,
            subtree: true
        });

        return () => {
            observer.disconnect();
            mutationObserver.disconnect();
        };
    }, [location.pathname]);

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [location.pathname]);

    const isHomePage = location.pathname === '/home' || location.pathname === '/';

    return (
        <div className={`app-layout ${isHomePage ? 'is-home-page' : ''}`}>
            <Header onLoginClick={onLoginClick} onSearchClick={onSearchClick} onProfileClick={onProfileClick} />

            <div className="sticky-tabs-wrapper">
                <Tabs />
            </div>

            <main className="main-content container fade-in">
                {children}
            </main>

            <div className="container" style={{ padding: '0 clamp(1rem, 3vw, 2rem)' }}>
                <InstantGamingBanner />
            </div>

            <footer style={{
                textAlign: 'center',
                padding: 'clamp(2rem, 6vw, 4rem) clamp(1rem, 4vw, 2rem) clamp(1.5rem, 4vw, 2rem)',
                color: 'var(--text-dim)',
                marginTop: 'clamp(2rem, 6vw, 4rem)',
                fontFamily: 'var(--font-label)',
                textTransform: 'uppercase',
                letterSpacing: 'clamp(1px, 0.4vw, 2px)',
                fontSize: 'clamp(0.65rem, 1.6vw, 0.8rem)'
            }}>
                <div className="footer-divider-row">
                    <div style={{ background: 'var(--gold-dim)' }}></div>
                    <div style={{ background: 'var(--gold)' }}></div>
                    <div style={{ background: 'var(--gold-bright)' }}></div>
                    <div style={{ background: 'var(--gold)' }}></div>
                    <div style={{ background: 'var(--bronze)' }}></div>
                    <div style={{ background: 'var(--gold-dim)' }}></div>
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.6rem'
                }}>
                    <p style={{ opacity: 0.5, margin: 0 }}>&copy; {new Date().getFullYear()} {t('footer_ui.copyright')} <span style={{ color: "#FFFFFF" }}>HawkEye #1058</span></p>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        gap: '0.75rem clamp(0.5rem, 1.5vw, 1.25rem)'
                    }}>
                        <Link
                            to="/terms"
                            style={{
                                color: 'var(--text-dim)',
                                textDecoration: 'none',
                                transition: 'all 0.2s ease',
                                borderBottom: '1px dashed rgba(212, 175, 55, 0.3)',
                                paddingBottom: '2px',
                                textTransform: 'uppercase',
                                fontSize: 'clamp(0.62rem, 1.4vw, 0.72rem)',
                                letterSpacing: '1px'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.color = 'var(--gold)';
                                e.currentTarget.style.borderBottomColor = 'var(--gold)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.color = 'var(--text-dim)';
                                e.currentTarget.style.borderBottomColor = 'rgba(212, 175, 55, 0.3)';
                            }}
                        >
                            {t('navigation.terms', 'Terms & conditions')}
                        </Link>
                        <span style={{ opacity: 0.3 }}>•</span>
                        <a
                            href={getInstantGamingAffiliateUrl()}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                color: 'var(--text-dim)',
                                textDecoration: 'none',
                                transition: 'all 0.2s ease',
                                borderBottom: '1px dashed rgba(212, 175, 55, 0.3)',
                                paddingBottom: '2px',
                                textTransform: 'uppercase',
                                fontSize: 'clamp(0.62rem, 1.4vw, 0.72rem)',
                                letterSpacing: '1px'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.color = 'var(--gold)';
                                e.currentTarget.style.borderBottomColor = 'var(--gold)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.color = 'var(--text-dim)';
                                e.currentTarget.style.borderBottomColor = 'rgba(212, 175, 55, 0.3)';
                            }}
                        >
                            {t('partner.badge', 'Official Partner')} : Instant Gaming
                        </a>
                    </div>
                </div>
            </footer>

            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="scroll-to-top-btn"
                    aria-label="Scroll to top"
                >
                    <ArrowUp size={20} />
                </button>
            )}

            <AmbientSignal />
        </div>
    );
}
