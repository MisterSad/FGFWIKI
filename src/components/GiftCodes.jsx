import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const giftCodes = [
    'HERPOWER',
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

            <div style={{
                marginBottom: '2rem',
                padding: '1.5rem 2rem',
                background: 'linear-gradient(135deg, rgba(201,168,76,0.1), rgba(201,168,76,0.02))',
                border: '1px solid var(--gold)',
                borderRadius: '8px',
                textAlign: 'center',
                boxShadow: '0 4px 15px rgba(201,168,76,0.1)'
            }}>
                <h3 style={{
                    color: 'var(--gold-bright)',
                    fontFamily: 'var(--font-hero)',
                    letterSpacing: '3px',
                    margin: '0 0 1rem 0',
                    fontSize: '1.2rem'
                }}>
                    HOW TO REDEEM
                </h3>
                <p style={{
                    color: 'var(--text-primary)',
                    margin: 0,
                    fontSize: '0.95rem',
                    lineHeight: '1.6',
                    fontFamily: 'var(--font-body)'
                }}>
                    Click the copy icon next to a code below.
                    In-game, tap your <strong>avatar</strong> (top left), select <strong>"Settings"</strong>,
                    then tap <strong>"Gift Code"</strong> and paste.
                </p>
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
        </div>
    );
}
