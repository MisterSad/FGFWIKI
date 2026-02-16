import React from 'react';
import Header from './Header';
import Tabs from './Tabs';

export default function Layout({ children, activeCategory, setActiveCategory }) {
    return (
        <div className="app-layout">
            <Header />

            {/* Fixed Sub-Header for Navigation */}
            <div className="sticky-nav">
                <div className="container" style={{ padding: '0 1rem' }}>
                    <Tabs activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
                </div>
            </div>

            <main className="main-content container">
                {children}
            </main>

            <footer style={{
                textAlign: 'center',
                padding: '2rem',
                borderTop: '1px solid rgba(255,255,255,0.05)',
                color: 'var(--text-dim)',
                fontSize: '0.9rem',
                marginTop: '2rem'
            }}>
                <p>&copy; {new Date().getFullYear()} FGF Wiki 2.0. Developed by HawkTuah #1061.</p>
            </footer>
        </div>
    );
}
