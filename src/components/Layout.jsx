import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Tabs from './Tabs';

export default function Layout({ children, onLoginClick }) {
    const location = useLocation();

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

    return (
        <div className="app-layout">
            <Header onLoginClick={onLoginClick} />

            <div className="sticky-tabs-wrapper">
                <Tabs />
            </div>

            <main className="main-content container fade-in">
                {children}
            </main>

            <footer style={{
                textAlign: 'center',
                padding: '4rem 2rem 2rem',
                color: 'var(--text-dim)',
                marginTop: '4rem',
                fontFamily: 'var(--font-label)',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                fontSize: '0.8rem'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '4px',
                    marginBottom: '2rem'
                }}>
                    <div style={{ width: '40px', height: '3px', borderRadius: '1px', background: 'var(--gold-dim)' }}></div>
                    <div style={{ width: '40px', height: '3px', borderRadius: '1px', background: 'var(--gold)' }}></div>
                    <div style={{ width: '40px', height: '3px', borderRadius: '1px', background: 'var(--gold-bright)' }}></div>
                    <div style={{ width: '40px', height: '3px', borderRadius: '1px', background: 'var(--gold)' }}></div>
                    <div style={{ width: '40px', height: '3px', borderRadius: '1px', background: 'var(--bronze)' }}></div>
                    <div style={{ width: '40px', height: '3px', borderRadius: '1px', background: 'var(--gold-dim)' }}></div>
                </div>

                <p style={{ opacity: 0.5 }}>&copy; {new Date().getFullYear()} FGF Wiki. Developer <span style={{ color: "#FFFFFF" }}>HawkTuah</span> #1061.</p>
            </footer>
        </div>
    );
}
