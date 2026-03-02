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
                    background: activeCategory === 'all' ? 'var(--gold-bright)' : 'var(--bg-void)',
                    color: activeCategory === 'all' ? 'var(--bg-void)' : 'var(--text-dim)',
                    border: '1px solid var(--border)',
                    boxShadow: 'none'
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
                        background: activeCategory === cat.id ? 'var(--gold-bright)' : 'var(--bg-void)',
                        color: activeCategory === cat.id ? 'var(--bg-void)' : 'var(--text-dim)',
                        border: '1px solid var(--border)',
                        boxShadow: 'none'
                    }}
                    onClick={() => setActiveCategory(cat.id)}
                >
                    {cat.icon} {cat.label}
                </button>
            ))}
        </div>
    );
}
