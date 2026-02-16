import React from 'react';
import { categories } from '../data/gameData';

export default function FilterBar({ activeCategory, setActiveCategory }) {
    return (
        <div style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginBottom: '3rem'
        }}>
            <button
                className="btn-primary"
                style={{
                    background: activeCategory === 'all' ? 'var(--primary-neon)' : 'transparent',
                    color: activeCategory === 'all' ? 'var(--bg-deep)' : 'var(--primary-neon)',
                    boxShadow: activeCategory === 'all' ? '0 0 15px rgba(0, 243, 255, 0.3)' : 'none'
                }}
                onClick={() => setActiveCategory('all')}
            >
                All Systems
            </button>

            {categories.map(cat => (
                <button
                    key={cat.id}
                    className="btn-primary"
                    style={{
                        background: activeCategory === cat.id ? 'var(--primary-neon)' : 'transparent',
                        color: activeCategory === cat.id ? 'var(--bg-deep)' : 'var(--primary-neon)',
                        boxShadow: activeCategory === cat.id ? '0 0 15px rgba(0, 243, 255, 0.3)' : 'none'
                    }}
                    onClick={() => setActiveCategory(cat.id)}
                >
                    {cat.icon} {cat.label}
                </button>
            ))}
        </div>
    );
}
