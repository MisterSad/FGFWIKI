import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowUp } from 'lucide-react';
import Header from './Header';
import Tabs from './Tabs';
import AmbientSignal from './AmbientSignal';
import useSEO from '../hooks/useSEO';

export default function Layout({ children, onLoginClick }) {
    const location = useLocation();
    const { t, i18n } = useTranslation();
    const [showScrollTop, setShowScrollTop] = useState(false);
    useSEO();

    // Event calendar check: Teaser glitches start June 22nd, 2026; event runs to August 31st, 2026
    const now = new Date();
    const eventStartDate = new Date('2026-06-22T00:00:00Z');
    const eventEndDate = new Date('2026-08-31T23:59:59Z');
    const isEventActive = now >= eventStartDate && now <= eventEndDate;
    // Glitch is active if event is active, or if we have a debug phase param, or if we are on the stella anomaly page
    const isGlitchActive = isEventActive || location.search.includes('debugPhase') || location.pathname.startsWith('/stella-anomaly');

    // Helper to count completed phases (0 to 4)
    const getCompletedCount = () => {
        // Check URL debugParam first for easy testing of glitch levels
        const params = new URLSearchParams(location.search);
        const debugPhaseParam = params.get('debugPhase');
        if (debugPhaseParam) {
            const dp = parseInt(debugPhaseParam, 10);
            if (dp >= 1 && dp <= 4) {
                return dp - 1; // debugPhase=1 -> 0 completed, debugPhase=4 -> 3 completed
            }
        }
        try {
            const saved = localStorage.getItem('stella_anomaly_completed');
            if (!saved) return 0;
            const parsed = JSON.parse(saved);
            return Object.values(parsed).filter(Boolean).length;
        } catch (e) {
            return 0;
        }
    };

    const [completedCount, setCompletedCount] = useState(getCompletedCount());

    useEffect(() => {
        const handleUpdate = () => {
            setCompletedCount(getCompletedCount());
        };
        // Listen to custom updates from StellaAnomaly terminal
        window.addEventListener('stella-progress-update', handleUpdate);
        // Sync on route / search query updates
        handleUpdate();
        return () => {
            window.removeEventListener('stella-progress-update', handleUpdate);
        };
    }, [location.pathname, location.search]);

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

    const glitchIntensityClass = isGlitchActive
        ? `glitch-intensity-${['high', 'medium', 'low', 'subtle', 'none'][Math.min(completedCount, 4)]}`
        : 'glitch-intensity-none';

    return (
        <div className={`app-layout ${glitchIntensityClass}`}>
            {isGlitchActive && completedCount < 4 && (
                <div className="anomaly-scanlines" aria-hidden="true" />
            )}
            <Header onLoginClick={onLoginClick} />

            <div className="sticky-tabs-wrapper">
                <Tabs />
            </div>

            <main className="main-content container fade-in">
                {children}
            </main>

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

                <p style={{ opacity: 0.5, margin: 0 }}>&copy; {new Date().getFullYear()} {t('footer_ui.copyright')} <span style={{ color: "#FFFFFF" }}>HawkTuah</span> #1061.</p>
            </footer>

            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    style={{
                        position: 'fixed',
                        bottom: '2rem',
                        right: '2rem',
                        zIndex: 99,
                        background: 'rgba(20, 20, 20, 0.85)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid var(--gold)',
                        color: 'var(--gold-bright)',
                        width: '3.2rem',
                        height: '3.2rem',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 0 15px rgba(212, 175, 55, 0.2)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        outline: 'none',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'var(--gold)';
                        e.currentTarget.style.color = 'var(--bg-void)';
                        e.currentTarget.style.boxShadow = '0 0 25px rgba(212, 175, 55, 0.6)';
                        e.currentTarget.style.transform = 'translateY(-3px)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(20, 20, 20, 0.85)';
                        e.currentTarget.style.color = 'var(--gold-bright)';
                        e.currentTarget.style.boxShadow = '0 0 15px rgba(212, 175, 55, 0.2)';
                        e.currentTarget.style.transform = 'none';
                    }}
                    aria-label="Scroll to top"
                >
                    <ArrowUp size={20} />
                </button>
            )}

            <AmbientSignal />
        </div>
    );
}
