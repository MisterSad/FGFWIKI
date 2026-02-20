import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const giftCodes = [
    'FOUNDATION',
    'FURTHERFUTURE',
    'CHAMPIONSPIRIT',
    'HERORIZON',
    'VETERANSGIFT',
    'WIZARDS',
    'WANKIL',
    'Bitt3rSteel',
    'Sinkiller',
    'Nooch2Gud',
    'MrSneakyy',
    'catzilla',
    'ACTMAN',
    'gametheory',
    'TANKFISH',
    'TRADERS100K',
    'FLEET777',
    'badstory',
    'oddcomet',
    '520pupupipi',
    'CHING',
    'tesscube',
    'CMED',
    'SCPLAY',
    'alansmart123',
    'drumstick',
    'yuniko',
    'yuyu31555',
    '888nicemonster',
    'mrbay888',
    'JAPHK',
    'HKICE',
    'bahagamecrazy',
    'ayi0303',
    'FantasyLibrary',
    'LUNARFOUNDATION',
    'COSMIC2026'
];

export default function GiftCodes() {
    const [copiedIndex, setCopiedIndex] = useState(null);

    const handleCopy = (code, index) => {
        navigator.clipboard.writeText(code);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
            <div className="guide-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 className="guide-title text-gradient">Gift Codes</h1>
                <p className="guide-subtitle">Redeem these codes in-game for free rewards.</p>
            </div>

            <div className="grid" style={{
                display: 'grid',
                gap: '1rem',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))'
            }}>
                {giftCodes.map((code, index) => (
                    <div
                        key={index}
                        className="builder-card"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '1rem 1.5rem',
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '12px',
                            gap: '1rem'
                        }}
                    >
                        <button
                            onClick={() => handleCopy(code, index)}
                            style={{
                                background: copiedIndex === index ? 'rgba(74, 222, 128, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid',
                                borderColor: copiedIndex === index ? 'rgba(74, 222, 128, 0.5)' : 'rgba(255, 255, 255, 0.1)',
                                cursor: 'pointer',
                                color: copiedIndex === index ? '#4ade80' : 'var(--text-dim)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '0.6rem',
                                borderRadius: '8px',
                                transition: 'all 0.2s ease',
                                outline: 'none'
                            }}
                            title="Copy to clipboard"
                        >
                            {copiedIndex === index ? <Check size={18} /> : <Copy size={18} />}
                        </button>
                        <h3 style={{ fontSize: '1.25rem', margin: 0, color: '#fff', fontFamily: 'monospace', letterSpacing: '1px' }}>
                            {code}
                        </h3>
                    </div>
                ))}
            </div>

            <div style={{
                marginTop: '3rem',
                padding: '1.5rem',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                borderRadius: '8px',
                textAlign: 'center'
            }}>
                <p style={{ color: '#93c5fd', margin: 0, fontSize: '0.9rem' }}>
                    <strong>How to redeem:</strong> Click the copy icon next to a code, tap your avatar in the top left corner of the game screen, select "Settings", then tap "Gift Code" and paste your code.
                </p>
            </div>
        </div>
    );
}
