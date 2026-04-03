import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const giftCodes = [
    { code: 'HERPOWER', expiresAt: new Date('2026-04-08T11:59:00Z') },
    { code: 'Bdwayne' },
    { code: 'FantasyLibrary' },
    { code: 'ayi0303' },
    { code: 'bahagamecrazy' },
    { code: 'HKICE' },
    { code: 'JAPHK' },
    { code: 'mrbay888' },
    { code: '888nicemonster' },
    { code: 'yuyu31555' },
    { code: 'yuniko' },
    { code: 'drumstick' },
    { code: 'alansmart123' },
    { code: 'SCPLAY' },
    { code: 'CMED' },
    { code: 'tesscube' },
    { code: 'CHING' },
    { code: '520pupupipi' },
    { code: 'oddcomet' },
    { code: 'badstory' },
    { code: 'FLEET777' },
    { code: 'TANKFISH' },
    { code: 'gametheory' },
    { code: 'ACTMAN' },
    { code: 'catzilla' },
    { code: 'MrSneakyy' },
    { code: 'Nooch2Gud' },
    { code: 'Sinkiller' },
    { code: 'Bitt3rSteel' },
    { code: 'WANKIL' },
    { code: 'WIZARDS' },
    { code: 'VETERANSGIFT' },
    { code: 'CHAMPIONSPIRIT' },
    { code: 'FURTHERFUTURE' },
    { code: 'FOUNDATION' },
    { code: 'NEWFRONTIER', expiresAt: new Date('2026-06-26T23:59:00Z') },
    { code: 'GALAXYTHANKS' },
    { code: 'GAMEMA27' },
    { code: 'YUNSEO0327' },
    { code: 'AKTUBE0327' },
    { code: 'LEVELMAP0327' },
    { code: 'KOOGNUJ0' },
    { code: 'NARI0327' },
    { code: 'SSAMDOL0327' },
    { code: 'yuyu' },
    { code: 'JiForceV' },
    { code: 'NATV0327' },
    { code: 'fujinattugift' },
    { code: 'yamamidoriirogift' },
    { code: 'TONBOKIRI' },
    { code: 'ranchannelgift' },
    { code: 'ugeple007' },
    { code: 'ggya0327' },
];

const now = new Date();
const visibleCodes = giftCodes.filter(({ expiresAt }) => !expiresAt || now < expiresAt).reverse();

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
                {visibleCodes.map(({ code }, index) => (
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

            {/* Contributors Section */}
            <div style={{
                marginTop: '4rem',
                textAlign: 'center',
                padding: '2rem',
                background: 'linear-gradient(135deg, rgba(201,168,76,0.05), rgba(0,0,0,0.2))',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
            }}>
                <h3 style={{
                    color: 'var(--gold-bright)',
                    fontFamily: 'var(--font-hero)',
                    letterSpacing: '2px',
                    margin: '0 0 1rem 0',
                    fontSize: '1.2rem'
                }}>
                    Special Thanks
                </h3>
                <p style={{
                    color: 'var(--text-dim)',
                    margin: 0,
                    fontSize: '0.95rem',
                    lineHeight: '1.6',
                    fontFamily: 'var(--font-body)'
                }}>
                    A big thank you to the amazing community members who help keep this list updated.
                </p>
                <div style={{
                    marginTop: '1.5rem',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '1rem',
                    flexWrap: 'wrap'
                }}>
                    <div style={{
                        padding: '0.5rem 1.2rem',
                        background: 'var(--bg-elevated)',
                        border: '1px solid var(--border)',
                        borderRadius: '20px',
                        color: 'var(--text-primary)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.95rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        <span style={{ 
                            display: 'inline-block', 
                            width: '8px', 
                            height: '8px', 
                            borderRadius: '50%', 
                            background: 'var(--gold-bright)',
                            boxShadow: '0 0 5px var(--gold-bright)' 
                        }}></span>
                        Xarren #1090
                    </div>
                </div>
            </div>
        </div>
    );
}
