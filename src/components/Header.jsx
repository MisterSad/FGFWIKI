import React from 'react';

export default function Header() {
    return (
        <header className="sticky-nav" style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0 40px',
            borderBottom: '1px solid var(--border)',
            display: 'flex'
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                lineHeight: '1.2',
                alignItems: 'center',
                textAlign: 'center'
            }}>
                <div style={{
                    fontFamily: 'var(--font-hero)',
                    fontSize: '2.2rem',
                    fontWeight: '800',
                    color: 'var(--gold-bright)',
                    textTransform: 'uppercase',
                    letterSpacing: '4px'
                }}>
                    FOUNDATION <span style={{ color: 'var(--text-primary)', fontWeight: '400' }}>GALACTIC FRONTIER</span>
                </div>
                <div style={{
                    fontFamily: 'var(--font-label)',
                    fontSize: '1rem',
                    color: 'var(--gold-dim)',
                    textTransform: 'uppercase',
                    letterSpacing: '8px',
                    marginTop: '2px'
                }}>
                    Encyclopedia Galactica
                </div>
            </div>
        </header>
    );
}
