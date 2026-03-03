import React, { useEffect } from 'react';
import Header from './Header';
import Tabs from './Tabs';

export default function Layout({ children, activeCategory, setActiveCategory, isMuted, toggleMute }) {

    // Setup Scroll Reveal Observer
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Optional: stop observing once revealed
                    // observer.unobserve(entry.target); 
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        const observeElements = () => {
            const elements = document.querySelectorAll('.reveal');
            elements.forEach(el => observer.observe(el));
        };

        observeElements();

        // Set up mutation observer to catch newly added .reveal elements
        // This fixes the issue where returning from a full-page detail view
        // left the re-rendered tiles invisible because they weren't observed.
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
    }, [activeCategory]); // Re-run when category changes

    return (
        <div className="app-layout">
            <Header isMuted={isMuted} toggleMute={toggleMute} />

            {/* Sub-Header for Navigation - now sits below the fixed Header */}
            <div style={{
                position: 'sticky',
                top: '80px',
                zIndex: 80,
                background: 'rgba(6, 7, 16, 0.95)',
                borderBottom: '1px solid var(--border)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)'
            }}>
                <Tabs activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
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
                letterSpacing: '3px',
                fontSize: '0.8rem'
            }}>
                {/* Psychohistory Bar */}
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

                <p style={{ opacity: 0.5 }}>&copy; {new Date().getFullYear()} FGF Wiki. Developer <span style={{ color: 'var(--gold-dim)' }}>HawkTuah</span> #1061.</p>
            </footer>
        </div>
    );
}
