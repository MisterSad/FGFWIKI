import React, { useState } from 'react';
import { Copy, Check, ExternalLink } from 'lucide-react';

const UID = '1917131';

export default function Support() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(UID);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="container" style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem 1rem 4rem' }}>
            <div className="guide-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 className="guide-title text-gradient">Support the Site</h1>
                <p className="guide-subtitle">
                    This site is free, independent, and built with passion.<br />
                    If it has helped you in the Galactic Frontier, consider supporting its growth!
                </p>

                {/* Feature badges */}
                <div style={{
                    display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
                    gap: '0.75rem', marginTop: '1.25rem'
                }}>
                    {[
                        { icon: '🆓', label: '100% Free' },
                        { icon: '🚫', label: 'No Ads' },
                    ].map(({ icon, label }) => (
                        <span key={label} style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                            padding: '0.35rem 0.85rem',
                            background: 'rgba(201,168,76,0.06)',
                            border: '1px solid rgba(201,168,76,0.2)',
                            borderRadius: 20,
                            fontSize: '0.8rem',
                            color: 'var(--text-secondary)',
                            fontFamily: 'var(--font-label)',
                            letterSpacing: 0.5,
                        }}>
                            <span>{icon}</span> {label}
                        </span>
                    ))}
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                {/* In-Game Store Card */}
                <div className="gift-card" style={{
                    position: 'relative',
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border)',
                    borderRadius: '12px',
                    padding: '2rem',
                    overflow: 'hidden'
                }}>
                    <div className="scan-line" />
                    <div className="corner-tl" />
                    <div className="corner-br" />

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                        <div style={{
                            width: 40, height: 40, borderRadius: 8,
                            background: 'linear-gradient(135deg, rgba(201,168,76,0.2), rgba(201,168,76,0.05))',
                            border: '1px solid var(--border)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: 'var(--accent-gold, #C9A84C)'
                        }}>
                            🌌
                        </div>
                        <div>
                            <h2 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--text-primary)', fontFamily: 'var(--font-label)', letterSpacing: 1 }}>
                                Foundation Store
                            </h2>
                            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                                store.funplus.com/foundation
                            </p>
                        </div>
                    </div>

                    <p style={{ color: 'var(--text-secondary)', margin: '0 0 1.5rem', lineHeight: 1.7, fontSize: '0.95rem' }}>
                        One great way to support me is to gift me Platinum Credits via the official Foundation store. Simply use my UID at checkout, it's the easiest way to show your support directly in-game!
                    </p>

                    {/* UID Row */}
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '0.75rem',
                        background: 'rgba(0,0,0,0.3)',
                        border: '1px solid var(--border)',
                        borderRadius: 8, padding: '0.75rem 1rem', marginBottom: '1.25rem'
                    }}>
                        <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem', fontFamily: 'var(--font-label)', letterSpacing: 1, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                            My UID
                        </span>
                        <span style={{
                            flex: 1, fontFamily: 'var(--font-mono)', fontSize: '1.4rem', fontWeight: 700,
                            color: 'var(--accent-gold, #C9A84C)', letterSpacing: 3
                        }}>
                            {UID}
                        </span>
                        <button
                            onClick={handleCopy}
                            title="Copy UID"
                            style={{
                                background: copied ? 'var(--bg-surface)' : 'transparent',
                                border: '1px solid',
                                borderColor: copied ? 'var(--accent-teal)' : 'var(--border)',
                                cursor: 'pointer',
                                color: copied ? 'var(--accent-teal)' : 'var(--text-dim)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                padding: '0.5rem 0.75rem', borderRadius: 6,
                                transition: 'all 0.2s ease', gap: '0.4rem',
                                fontFamily: 'var(--font-label)', fontSize: '0.8rem', letterSpacing: 1
                            }}
                        >
                            {copied ? <Check size={16} /> : <Copy size={16} />}
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                    </div>

                    <a
                        href="https://store.funplus.com/foundation"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                            padding: '0.75rem 1.5rem',
                            background: 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.05))',
                            border: '1px solid rgba(201,168,76,0.4)',
                            borderRadius: 8,
                            color: 'var(--accent-gold, #C9A84C)',
                            textDecoration: 'none',
                            fontFamily: 'var(--font-label)',
                            fontSize: '0.9rem',
                            letterSpacing: 1,
                            textTransform: 'uppercase',
                            transition: 'all 0.2s ease',
                            fontWeight: 600
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.2)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.6)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.05))'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'; }}
                    >
                        <ExternalLink size={16} />
                        Open Store
                    </a>
                </div>

                {/* PayPal Card */}
                <div className="gift-card" style={{
                    position: 'relative',
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border)',
                    borderRadius: '12px',
                    padding: '2rem',
                    overflow: 'hidden'
                }}>
                    <div className="scan-line" />
                    <div className="corner-tl" />
                    <div className="corner-br" />

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                        <div style={{
                            width: 44, height: 44, borderRadius: 8,
                            background: 'linear-gradient(135deg, #003087, #009cde)',
                            border: '1px solid rgba(0,112,186,0.4)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            flexShrink: 0,
                        }}>
                            <img src="/assets/paypal.svg" alt="PayPal" style={{ width: 26, height: 26, filter: 'brightness(0) invert(1)' }} />
                        </div>
                        <div>
                            <h2 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--text-primary)', fontFamily: 'var(--font-label)', letterSpacing: 1 }}>
                                PayPal
                            </h2>
                            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                                paypal.me/HawkTuah89
                            </p>
                        </div>
                    </div>

                    <p style={{ color: 'var(--text-secondary)', margin: '0 0 1.5rem', lineHeight: 1.7, fontSize: '0.95rem' }}>
                        Prefer PayPal? Send any amount directly. Quick, secure, and available worldwide.
                    </p>

                    <a
                        href="https://paypal.me/HawkTuah89"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                            padding: '0.75rem 1.5rem',
                            background: 'linear-gradient(135deg, rgba(0,112,186,0.15), rgba(0,112,186,0.05))',
                            border: '1px solid rgba(0,112,186,0.4)',
                            borderRadius: 8,
                            color: '#4da6ff',
                            textDecoration: 'none',
                            fontFamily: 'var(--font-label)',
                            fontSize: '0.9rem',
                            letterSpacing: 1,
                            textTransform: 'uppercase',
                            transition: 'all 0.2s ease',
                            fontWeight: 600
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,112,186,0.2)'; e.currentTarget.style.borderColor = 'rgba(0,112,186,0.6)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,112,186,0.15), rgba(0,112,186,0.05))'; e.currentTarget.style.borderColor = 'rgba(0,112,186,0.4)'; }}
                    >
                        <img src="/assets/paypal.svg" alt="" style={{ width: 18, height: 18, filter: 'brightness(0) invert(1)', opacity: 0.9 }} />
                        Donate via PayPal
                    </a>
                </div>

                {/* Revolut Card */}
                <div className="gift-card" style={{
                    position: 'relative',
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border)',
                    borderRadius: '12px',
                    padding: '2rem',
                    overflow: 'hidden'
                }}>
                    <div className="scan-line" />
                    <div className="corner-tl" />
                    <div className="corner-br" />

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                        <div style={{
                            width: 44, height: 44, borderRadius: 8,
                            background: '#191C1F',
                            border: '1px solid rgba(255,255,255,0.15)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            flexShrink: 0,
                        }}>
                            <img src="/assets/revolut.svg" alt="Revolut" style={{ width: 26, height: 26 }} />
                        </div>
                        <div>
                            <h2 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--text-primary)', fontFamily: 'var(--font-label)', letterSpacing: 1 }}>
                                Revolut
                            </h2>
                            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                                revolut.me/hawktuah89
                            </p>
                        </div>
                    </div>

                    <p style={{ color: 'var(--text-secondary)', margin: '0 0 1.5rem', lineHeight: 1.7, fontSize: '0.95rem' }}>
                        Your donation helps cover the costs of running this site (hosting, domain name, and everything in between). Every bit counts and is deeply appreciated. 🙏
                    </p>

                    <a
                        href="https://revolut.me/hawktuah89"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                            padding: '0.75rem 1.5rem',
                            background: 'linear-gradient(135deg, rgba(78,205,196,0.15), rgba(78,205,196,0.05))',
                            border: '1px solid rgba(78,205,196,0.4)',
                            borderRadius: 8,
                            color: '#4ECDC4',
                            textDecoration: 'none',
                            fontFamily: 'var(--font-label)',
                            fontSize: '0.9rem',
                            letterSpacing: 1,
                            textTransform: 'uppercase',
                            transition: 'all 0.2s ease',
                            fontWeight: 600
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(78,205,196,0.2)'; e.currentTarget.style.borderColor = 'rgba(78,205,196,0.6)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'linear-gradient(135deg, rgba(78,205,196,0.15), rgba(78,205,196,0.05))'; e.currentTarget.style.borderColor = 'rgba(78,205,196,0.4)'; }}
                    >
                        <img src="/assets/revolut.svg" alt="" style={{ width: 16, height: 16, filter: 'brightness(0) saturate(100%) invert(74%) sepia(60%) saturate(400%) hue-rotate(130deg)' }} />
                        Donate via Revolut
                    </a>
                </div>

            </div>

            {/* Footer thank you */}
            <p style={{
                textAlign: 'center', marginTop: '2.5rem',
                color: 'var(--text-dim)', fontSize: '0.85rem',
                fontFamily: 'var(--font-label)', letterSpacing: 0.5
            }}>
                Every bit of support keeps the Galactic Frontier Encyclopedia alive.<br />
                Thank you, Commanders.
            </p>
        </div>
    );
}
