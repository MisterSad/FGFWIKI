import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import { ArrowUp } from 'lucide-react';
import Header from './Header';
import Tabs from './Tabs';
import AmbientSignal from '../common/AmbientSignal';
import useSEO from '../../hooks/useSEO';

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

                <p style={{ opacity: 0.5, margin: 0 }}>&copy; {new Date().getFullYear()} {t('footer_ui.copyright')} <span style={{ color: "#FFFFFF" }}>HawkEye #1058</span></p>
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
