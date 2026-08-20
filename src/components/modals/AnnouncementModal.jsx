import React, { useEffect, useRef, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, ShieldAlert, Heart, Terminal, FileText, CheckCircle2, ArrowRight, FileDown, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AnnouncementModal({ isOpen, onClose }) {
    const { t, i18n } = useTranslation();
    const { currentUser } = useAuth();
    const [isExporting, setIsExporting] = useState(false);
    const closeBtnRef = useRef(null);

    const isAdmin = useMemo(() => {
        if (!currentUser) return false;
        const email = (currentUser.email || '').trim().toLowerCase();
        const adminList = [
            'fgfwiki@gmail.com',
            'fgfwiki@google.com',
            'fgfwiwi@gmail.com',
            'vieira.andre@proton.me'
        ];
        return adminList.includes(email);
    }, [currentUser]);

    useEffect(() => {
        if (!isOpen) return;

        // Prevent body scrolling while modal is open
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.style.overflow = originalOverflow;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="announcement-modal-title"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(3, 4, 8, 0.88)',
                zIndex: 10000,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                padding: 'clamp(0.75rem, 3vw, 1.5rem)',
                boxSizing: 'border-box'
            }}
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div
                className="glass-panel"
                style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '820px',
                    maxHeight: 'min(92dvh, 850px)',
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid rgba(212, 175, 55, 0.5)',
                    boxShadow: '0 0 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(212, 175, 55, 0.15)',
                    borderRadius: '8px',
                    background: 'linear-gradient(180deg, rgba(16, 17, 24, 0.96) 0%, rgba(8, 9, 14, 0.98) 100%)',
                    overflow: 'hidden',
                    boxSizing: 'border-box'
                }}
            >
                {/* Header */}
                <div style={{
                    padding: 'clamp(1rem, 3vw, 1.5rem) clamp(1.25rem, 4vw, 2rem) clamp(0.75rem, 2vw, 1rem)',
                    borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
                    background: 'rgba(6, 7, 12, 0.6)',
                    position: 'relative'
                }}>
                    <button
                        ref={closeBtnRef}
                        onClick={onClose}
                        aria-label={t('common.close', 'Close')}
                        style={{
                            position: 'absolute',
                            top: '1rem',
                            right: '1rem',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '4px',
                            color: 'var(--text-dim)',
                            width: '36px',
                            height: '36px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = '#FFFFFF';
                            e.currentTarget.style.borderColor = 'var(--gold)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'var(--text-dim)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        }}
                    >
                        <X size={20} />
                    </button>

                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                        background: 'rgba(212, 175, 55, 0.12)',
                        border: '1px solid rgba(212, 175, 55, 0.35)',
                        color: 'var(--gold-bright)',
                        fontSize: '0.72rem',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 'bold',
                        letterSpacing: '0.5px',
                        padding: '3px 9px',
                        borderRadius: '3px',
                        marginBottom: '0.6rem'
                    }}>
                        <ShieldAlert size={14} style={{ color: 'var(--gold-bright)' }} />
                        <span>{t('announcement_modal.badge', 'Official community statement')}</span>
                    </div>

                    <h2
                        id="announcement-modal-title"
                        style={{
                            fontFamily: 'var(--font-hero)',
                            color: 'var(--gold)',
                            margin: 0,
                            fontSize: 'clamp(1.1rem, 2.8vw, 1.45rem)',
                            lineHeight: 1.35,
                            fontWeight: 700,
                            letterSpacing: '0.5px',
                            paddingRight: '2.5rem'
                        }}
                    >
                        {t('announcement_modal.title', 'Why FGF WIKI is leaving the official program: defending the community, exposing the silence')}
                    </h2>
                </div>

                {/* Body Content */}
                <div style={{
                    padding: 'clamp(1rem, 3vw, 1.75rem) clamp(1.25rem, 4vw, 2rem)',
                    overflowY: 'auto',
                    overscrollBehavior: 'contain',
                    color: 'var(--text-secondary)',
                    fontSize: 'clamp(0.85rem, 1.8vw, 0.94rem)',
                    lineHeight: 1.65,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.25rem'
                }}>
                    {/* Intro */}
                    <div style={{
                        background: 'rgba(212, 175, 55, 0.05)',
                        borderLeft: '3px solid var(--gold)',
                        padding: '0.9rem 1.1rem',
                        borderRadius: '0 4px 4px 0',
                        color: 'var(--text-primary)',
                        fontSize: 'clamp(0.9rem, 2vw, 0.98rem)',
                        fontWeight: 500
                    }}>
                        <p style={{ margin: 0 }}>
                            {t('announcement_modal.intro_p1', 'I have officially terminated my Content Creator Agreement with FunPlus for Foundation: Galactic Frontier. This decision is not a retreat - it is an act of clarity. I want to lay out the plain truth for the entire community, without corporate sugarcoating.')}
                        </p>
                    </div>

                    {/* Section 1 */}
                    <div>
                        <h3 style={{
                            fontFamily: 'var(--font-hero)',
                            color: 'var(--gold-bright)',
                            fontSize: 'clamp(0.95rem, 2.2vw, 1.1rem)',
                            margin: '0 0 0.6rem 0',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            <Heart size={16} style={{ color: '#ef4444' }} />
                            <span>{t('announcement_modal.sec1_title', 'The real allies: unconditional respect for the community team')}</span>
                        </h3>
                        <p style={{ margin: '0 0 0.6rem 0' }}>{t('announcement_modal.sec1_p1', 'Before addressing the core failure, I want to draw a crystal-clear line: the Community Managers in charge of creators are genuine, dedicated allies.')}</p>
                        <p style={{ margin: '0 0 0.6rem 0' }}>{t('announcement_modal.sec1_p2', 'They work relentlessly, caught between an ambitious community and a rigid corporate machine. They listened, they negotiated, and they fought internally to find workarounds to support FGF WIKI. I have immense respect for their daily battles. They are trying to build bridges with their hands tied behind their backs, and it is impossible not to empathize with the position they are put in by their leadership.')}</p>
                        <p style={{ margin: 0, color: 'var(--text-primary)', fontWeight: 600 }}>{t('announcement_modal.sec1_p3', 'The failure does not lie with community management. It lies entirely at the feet of the studio and the development leadership.')}</p>
                    </div>

                    {/* Section 2 */}
                    <div>
                        <h3 style={{
                            fontFamily: 'var(--font-hero)',
                            color: 'var(--gold-bright)',
                            fontSize: 'clamp(0.95rem, 2.2vw, 1.1rem)',
                            margin: '0 0 0.6rem 0',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            <Terminal size={16} style={{ color: 'var(--gold)' }} />
                            <span>{t('announcement_modal.sec2_title', "The studio's failure: refusing to support the very engine of player retention")}</span>
                        </h3>
                        <p style={{ margin: '0 0 0.6rem 0' }}>{t('announcement_modal.sec2_p1', 'Every seasoned strategy player knows an undeniable reality: complex games do not survive on lore or marketing trailers; they survive on data, theorycrafting, and precision tools.')}</p>
                        <p style={{ margin: '0 0 0.75rem 0' }}>{t('announcement_modal.sec2_p2', "When FGF WIKI serves over 10,000 to 11,000 monthly active players and exceeds 40,000 page views, it is doing the studio's job. It is calculating building costs, mapping progression curves, and keeping players invested and spending wisely. I build, code, and maintain this platform alone - investing 10 to 15 hours every week on top of my 45-hour full-time job, while covering 100% of the infrastructure costs out of my own pocket.")}</p>
                        <p style={{ margin: '0 0 0.5rem 0', fontWeight: 600, color: 'var(--text-primary)' }}>{t('announcement_modal.sec2_p3', 'What was asked from the studio in return? Not money. Not recognition. Only raw data.')}</p>
                        <ul style={{
                            margin: '0 0 0.75rem 0',
                            paddingLeft: '1.25rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.35rem'
                        }}>
                            <li>{t('announcement_modal.sec2_bullet1', 'Simple structured sheets or JSON exports for upgrade costs, research trees, timers, and multipliers.')}</li>
                            <li>{t('announcement_modal.sec2_bullet2', 'Standard assets that take a developer minutes to export, but save hundreds of community hours.')}</li>
                        </ul>
                        <p style={{ margin: 0, fontStyle: 'italic', color: '#ff6b6b' }}>
                            {t('announcement_modal.sec2_p4', "The developers' response? Persistent, total silence.")}
                        </p>
                    </div>

                    {/* Section 3 */}
                    <div>
                        <h3 style={{
                            fontFamily: 'var(--font-hero)',
                            color: 'var(--gold-bright)',
                            fontSize: 'clamp(0.95rem, 2.2vw, 1.1rem)',
                            margin: '0 0 0.6rem 0',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            <FileText size={16} style={{ color: 'var(--accent-teal, #4ecdc4)' }} />
                            <span>{t('announcement_modal.sec3_title', 'The double standard: respecting the rules vs. indifference')}</span>
                        </h3>
                        <p style={{ margin: '0 0 0.75rem 0' }}>{t('announcement_modal.sec3_intro', 'Consider the stark contrast in ethics and commitment:')}</p>
                        
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.6rem'
                        }}>
                            <div style={{
                                background: 'rgba(255, 255, 255, 0.02)',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                borderRadius: '4px',
                                padding: '0.75rem 0.9rem'
                            }}>
                                <strong style={{ color: 'var(--text-primary)' }}>{t('announcement_modal.sec3_bullet1_title', 'Respecting the game')}</strong>: {t('announcement_modal.sec3_bullet1_desc', 'As a developer myself, I strictly refused to datamine, reverse-engineer, or breach terms of service out of professional integrity and respect for the studio. I chose the honest path: asking through official channels.')}
                            </div>
                            <div style={{
                                background: 'rgba(255, 255, 255, 0.02)',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                borderRadius: '4px',
                                padding: '0.75rem 0.9rem'
                            }}>
                                <strong style={{ color: 'var(--text-primary)' }}>{t('announcement_modal.sec3_bullet2_title', "The studio's apathy")}</strong>: {t('announcement_modal.sec3_bullet2_desc', 'Instead of providing non-confidential numbers to validate community calculators, the studio treated a database powering tens of thousands of players as if it were a casual creative blog, demanding 600-word fan-fiction pieces in exchange for capped in-game credits.')}
                            </div>
                            <div style={{
                                background: 'rgba(255, 255, 255, 0.02)',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                borderRadius: '4px',
                                padding: '0.75rem 0.9rem'
                            }}>
                                <strong style={{ color: 'var(--text-primary)' }}>{t('announcement_modal.sec3_bullet3_title', 'The missed win-win')}</strong>: {t('announcement_modal.sec3_bullet3_desc', "Refusing Creator Codes and withholding data hurts no one more than the studio itself. Accurate tools drive player confidence, engagement, and purchases. Withholding public gameplay statistics from the people building tools for your players is an incomprehensible barrier to the game's own growth.")}
                            </div>
                        </div>
                    </div>

                    {/* Section 4 */}
                    <div style={{
                        background: 'rgba(6, 7, 14, 0.75)',
                        border: '1px solid rgba(212, 175, 55, 0.25)',
                        borderRadius: '6px',
                        padding: '1rem 1.25rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.6rem'
                    }}>
                        <h3 style={{
                            fontFamily: 'var(--font-hero)',
                            color: 'var(--gold)',
                            fontSize: 'clamp(0.95rem, 2.2vw, 1.1rem)',
                            margin: 0,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            <CheckCircle2 size={16} style={{ color: 'var(--gold)' }} />
                            <span>{t('announcement_modal.sec4_title', 'Regaining full sovereignty')}</span>
                        </h3>
                        <p style={{ margin: 0 }}>{t('announcement_modal.sec4_p1', 'Operating under a contract that imposes exclusivity and legal liabilities, while the studio refuses to provide the bare minimum technical data to support the player base, is an unacceptable compromise.')}</p>
                        <p style={{ margin: 0, color: 'var(--gold-bright)', fontWeight: 'bold' }}>
                            {t('announcement_modal.sec4_p2', 'FGF WIKI was built for the players, not corporate metrics.')}
                        </p>
                        <p style={{ margin: 0 }}>{t('announcement_modal.sec4_p3', 'By terminating this contract, FGF WIKI regains complete operational freedom. I will continue to code, host, and evolve the platform on my own terms. The tools will remain free, accessible, and community-driven.')}</p>
                        <div style={{
                            borderTop: '1px dashed rgba(212, 175, 55, 0.25)',
                            paddingTop: '0.6rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.35rem',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.82rem'
                        }}>
                            <p style={{ margin: 0, color: 'var(--text-primary)' }}>{t('announcement_modal.sec4_cm', 'To our Community Managers: thank you for trying.')}</p>
                            <p style={{ margin: 0, color: 'var(--gold)' }}>{t('announcement_modal.sec4_studio', 'To the studio leadership: players remember who builds the tools, and who withholds the numbers.')}</p>
                            <p style={{ margin: 0, color: 'var(--text-dim)' }}>{t('announcement_modal.sec4_thanks', 'Thank you to everyone in the community for your unwavering support.')}</p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div style={{
                    padding: 'clamp(0.75rem, 2vw, 1.25rem) clamp(1.25rem, 4vw, 2rem)',
                    borderTop: '1px solid rgba(212, 175, 55, 0.2)',
                    background: 'rgba(6, 7, 12, 0.8)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem',
                    flexWrap: 'wrap'
                }}>
                    {isAdmin ? (
                        <button
                            onClick={async () => {
                                if (isExporting) return;
                                setIsExporting(true);
                                try {
                                    const { exportAnnouncementToPDF } = await import('../../lib/announcementPdf');
                                    exportAnnouncementToPDF(t, i18n.language || 'en');
                                } catch (err) {
                                    console.error('Failed to export announcement PDF:', err);
                                } finally {
                                    setIsExporting(false);
                                }
                            }}
                            disabled={isExporting}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                background: 'rgba(212, 175, 55, 0.12)',
                                border: '1px solid rgba(212, 175, 55, 0.4)',
                                color: 'var(--gold-bright)',
                                borderRadius: '4px',
                                padding: '0.65rem 1.1rem',
                                fontFamily: 'var(--font-label)',
                                fontSize: '0.82rem',
                                fontWeight: 'bold',
                                cursor: isExporting ? 'wait' : 'pointer',
                                opacity: isExporting ? 0.7 : 1,
                                transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                                if (!isExporting) {
                                    e.currentTarget.style.background = 'rgba(212, 175, 55, 0.25)';
                                    e.currentTarget.style.borderColor = 'var(--gold)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(212, 175, 55, 0.12)';
                                e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.4)';
                            }}
                        >
                            {isExporting ? <Loader2 size={16} className="animate-spin" /> : <FileDown size={16} />}
                            <span>{t('announcement_modal.export_pdf_btn', 'Export official PDF (A4)')}</span>
                        </button>
                    ) : <div />}

                    <button
                        onClick={onClose}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            background: 'linear-gradient(135deg, var(--gold-bright) 0%, var(--gold) 100%)',
                            color: 'var(--bg-void, #000000)',
                            border: 'none',
                            borderRadius: '4px',
                            padding: '0.7rem 1.6rem',
                            fontFamily: 'var(--font-label)',
                            fontSize: '0.88rem',
                            fontWeight: 'bold',
                            letterSpacing: '0.5px',
                            cursor: 'pointer',
                            boxShadow: '0 0 20px rgba(212, 175, 55, 0.4)',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow = '0 0 30px rgba(212, 175, 55, 0.7)';
                            e.currentTarget.style.transform = 'translateY(-1px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = '0 0 20px rgba(212, 175, 55, 0.4)';
                            e.currentTarget.style.transform = 'none';
                        }}
                    >
                        <span>{t('announcement_modal.acknowledge_btn', 'Continue to FGF WIKI')}</span>
                        <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}
