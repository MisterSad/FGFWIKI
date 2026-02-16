import React from 'react';

export default function Header() {
    return (
        <header style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            padding: '1rem 2rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'rgba(11, 13, 23, 0.8)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(255,255,255,0.05)'
        }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                <span className="text-gradient">FGF</span> Wiki 2.0
            </div>
            <nav style={{ position: 'absolute', right: '2rem' }}>
                {/* Placeholder for future nav links if needed */}
            </nav>
        </header>
    );
}
