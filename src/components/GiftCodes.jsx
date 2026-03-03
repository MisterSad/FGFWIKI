import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const giftCodes = [
    'Bdwayne',
    'LUNARFOUNDATION',
    'FantasyLibrary',
    'ayi0303',
    'bahagamecrazy',
    'HKICE',
    'JAPHK',
    'mrbay888',
    '888nicemonster',
    'yuyu31555',
    'yuniko',
    'drumstick',
    'alansmart123',
    'SCPLAY',
    'CMED',
    'tesscube',
    'CHING',
    '520pupupipi',
    'oddcomet',
    'badstory',
    'FLEET777',
    'TRADERS100K',
    'TANKFISH',
    'gametheory',
    'ACTMAN',
    'catzilla',
    'MrSneakyy',
    'Nooch2Gud',
    'Sinkiller',
    'Bitt3rSteel',
    'WANKIL',
    'WIZARDS',
    'VETERANSGIFT',
    'HERORIZON',
    'CHAMPIONSPIRIT',
    'FURTHERFUTURE',
    'FOUNDATION'
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
                        className="gift-card"
                        style={{
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            padding: '1rem 1.5rem',
                            background: 'var(--bg-elevated)',
                            border: '1px solid var(--border)',
                            borderRadius: '12px',
                            gap: '1rem',
                            cursor: 'default'
                        }}
                    >
                        <div className="scan-line"></div>
                        <div className="corner-tl"></div>
                        <div className="corner-br"></div>
                        <button
                            onClick={() => handleCopy(code, index)}
                            style={{
                                background: copiedIndex === index ? 'var(--bg-surface)' : 'transparent',
                                border: '1px solid',
                                borderColor: copiedIndex === index ? 'var(--accent-teal)' : 'var(--border)',
                                cursor: 'pointer',
                                color: copiedIndex === index ? 'var(--accent-teal)' : 'var(--text-dim)',
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
                        <h3 style={{ fontSize: '1.25rem', margin: 0, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', letterSpacing: '1px' }}>
                            {code}
                        </h3>
                    </div>
                ))}
            </div>

            <div style={{
                marginTop: '3rem',
                padding: '1.5rem',
                backgroundColor: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                textAlign: 'center'
            }}>
                <p style={{ color: 'var(--text-dim)', margin: 0, fontSize: '0.9rem' }}>
                    <strong style={{ color: 'var(--gold)' }}>How to redeem:</strong> Click the copy icon next to a code, tap your avatar in the top left corner of the game screen, select "Settings", then tap "Gift Code" and paste your code.
                </p>
            </div>
        </div>
    );
}
