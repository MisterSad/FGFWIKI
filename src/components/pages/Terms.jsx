import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import {
    ArrowLeft,
    Shield,
    FileText,
    AlertTriangle,
    Lock,
    Scale,
    ExternalLink,
    Mail,
    CheckCircle2
} from 'lucide-react';

export default function Terms() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate('/guides');
        }
    };

    return (
        <div style={{
            maxWidth: '920px',
            margin: '0 auto',
            padding: 'clamp(1rem, 3vw, 2.5rem) clamp(0.75rem, 2vw, 1.5rem)',
            color: 'var(--text-secondary)',
            fontSize: 'clamp(0.88rem, 1.8vw, 0.96rem)',
            lineHeight: 1.7
        }}>
            {/* Top Navigation */}
            <div style={{ marginBottom: '1.5rem' }}>
                <button
                    onClick={handleBack}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '4px',
                        color: 'var(--text-primary)',
                        padding: '0.5rem 1rem',
                        fontSize: '0.84rem',
                        fontFamily: 'var(--font-label)',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--gold)';
                        e.currentTarget.style.color = 'var(--gold-bright)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        e.currentTarget.style.color = 'var(--text-primary)';
                    }}
                    aria-label={t('terms_page.back_btn', 'Back to guides')}
                >
                    <ArrowLeft size={16} />
                    <span>{t('terms_page.back_btn', 'Back to guides')}</span>
                </button>
            </div>

            {/* Header Hero */}
            <div
                className="glass-panel"
                style={{
                    padding: 'clamp(1.5rem, 4vw, 2.25rem)',
                    borderRadius: '8px',
                    border: '1px solid rgba(212, 175, 55, 0.35)',
                    background: 'linear-gradient(180deg, rgba(16, 17, 24, 0.95) 0%, rgba(8, 9, 14, 0.98) 100%)',
                    marginBottom: '2rem',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    background: 'rgba(212, 175, 55, 0.12)',
                    border: '1px solid rgba(212, 175, 55, 0.35)',
                    color: 'var(--gold-bright)',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 'bold',
                    letterSpacing: '0.5px',
                    padding: '3px 10px',
                    borderRadius: '3px',
                    marginBottom: '0.75rem'
                }}>
                    <Scale size={14} style={{ color: 'var(--gold-bright)' }} />
                    <span>{t('terms_page.badge', 'Legal & compliance')}</span>
                </div>

                <h1 style={{
                    fontFamily: 'var(--font-hero)',
                    color: 'var(--gold)',
                    fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
                    margin: '0 0 0.5rem 0',
                    fontWeight: 700,
                    letterSpacing: '0.5px',
                    lineHeight: 1.25
                }}>
                    {t('terms_page.title', 'Terms and conditions')}
                </h1>

                <p style={{
                    margin: 0,
                    color: 'var(--text-dim)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.82rem'
                }}>
                    {t('terms_page.last_updated', 'Last updated: August 21, 2026')}
                </p>
            </div>

            {/* Intro Callout Box */}
            <div style={{
                background: 'rgba(212, 175, 55, 0.05)',
                borderLeft: '4px solid var(--gold)',
                padding: '1.25rem 1.5rem',
                borderRadius: '0 6px 6px 0',
                marginBottom: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                color: 'var(--text-primary)'
            }}>
                <p style={{ margin: 0, fontSize: '0.95rem' }}>
                    {t('terms_page.intro_p1', 'Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the FGF WIKI website (the "Service") operated by FGF WIKI ("us", "we", or "our").')}
                </p>
                <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                    {t('terms_page.intro_p2', 'Your access to and use of the Service is conditioned upon your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who wish to access or use the Service. By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, you do not have permission to access the Service.')}
                </p>
            </div>

            {/* Main Sections */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                {/* Section 1 */}
                <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <h2 style={{
                        fontFamily: 'var(--font-hero)',
                        color: 'var(--gold-bright)',
                        fontSize: '1.2rem',
                        margin: '0 0 1rem 0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem'
                    }}>
                        <Shield size={20} style={{ color: 'var(--gold)' }} />
                        <span>{t('terms_page.sec1_title', '1. Non-affiliation and disclaimer of endorsement')}</span>
                    </h2>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                        <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '0.9rem 1.1rem', borderRadius: '4px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                            <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.25rem' }}>
                                {t('terms_page.sec1_bullet1_title', 'Independent platform')}
                            </strong>
                            <span>{t('terms_page.sec1_bullet1_desc', 'FGF WIKI is an independent, community-driven database and information hub.')}</span>
                        </div>

                        <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '0.9rem 1.1rem', borderRadius: '4px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                            <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.25rem' }}>
                                {t('terms_page.sec1_bullet2_title', 'No official association')}
                            </strong>
                            <span>{t('terms_page.sec1_bullet2_desc', 'FGF WIKI is not affiliated with, endorsed, sponsored, or specifically approved by FunPlus International AG, Skydance Production, LLC, or any of their affiliates or subsidiaries.')}</span>
                        </div>

                        <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '0.9rem 1.1rem', borderRadius: '4px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                            <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.25rem' }}>
                                {t('terms_page.sec1_bullet3_title', 'Trademarks & copyrights')}
                            </strong>
                            <span>{t('terms_page.sec1_bullet3_desc', 'Foundation: Galactic Frontier and all associated logos, characters, artwork, audio, game mechanics, and trademarks are the exclusive property of their respective owners and copyright holders. All game imagery, statistics, and related content displayed on this website are used under Fair Use principles for educational, informational, and analytical purposes only.')}</span>
                        </div>
                    </div>
                </div>

                {/* Section 2 */}
                <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <h2 style={{
                        fontFamily: 'var(--font-hero)',
                        color: 'var(--gold-bright)',
                        fontSize: '1.2rem',
                        margin: '0 0 1rem 0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem'
                    }}>
                        <FileText size={20} style={{ color: 'var(--accent-teal, #4ecdc4)' }} />
                        <span>{t('terms_page.sec2_title', '2. Nature of the content and accuracy of data')}</span>
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                        <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '0.9rem 1.1rem', borderRadius: '4px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                            <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.25rem' }}>
                                {t('terms_page.sec2_bullet1_title', 'Informational purposes only')}
                            </strong>
                            <span>{t('terms_page.sec2_bullet1_desc', 'The information, tools, calculators, and database entries provided on FGF WIKI are for general informational and entertainment purposes only.')}</span>
                        </div>

                        <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '0.9rem 1.1rem', borderRadius: '4px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                            <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.25rem' }}>
                                {t('terms_page.sec2_bullet2_title', 'Estimation & crowdsourcing')}
                            </strong>
                            <span>{t('terms_page.sec2_bullet2_desc', 'While we strive to ensure that all data, calculators, timers, and upgrade formulas are accurate and up to date, game mechanics and balance patches may change without notice. All calculations, estimates, and data sets are provided on an "as-is" and "as-available" basis without warranties of any kind, whether express or implied.')}</span>
                        </div>

                        <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '0.9rem 1.1rem', borderRadius: '4px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                            <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.25rem' }}>
                                {t('terms_page.sec2_bullet3_title', 'No in-game responsibility')}
                            </strong>
                            <span>{t('terms_page.sec2_bullet3_desc', 'We accept no responsibility or liability for in-game decisions, resource allocation, progression choices, or financial expenditures made by users based on the information or tools provided on this website.')}</span>
                        </div>
                    </div>
                </div>

                {/* Section 3 */}
                <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <h2 style={{
                        fontFamily: 'var(--font-hero)',
                        color: 'var(--gold-bright)',
                        fontSize: '1.2rem',
                        margin: '0 0 1rem 0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem'
                    }}>
                        <Lock size={20} style={{ color: '#f59e0b' }} />
                        <span>{t('terms_page.sec3_title', '3. Intellectual property of original website content')}</span>
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                        <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '0.9rem 1.1rem', borderRadius: '4px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                            <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.25rem' }}>
                                {t('terms_page.sec3_bullet1_title', 'Platform assets & source code')}
                            </strong>
                            <span>{t('terms_page.sec3_bullet1_desc', 'Excluding third-party game assets and trademarks, the structure, layout, custom source code, calculation algorithms, database design, user interface (UI), and original written documentation of FGF WIKI are the exclusive intellectual property of the site owner and are protected by applicable copyright, database, and intellectual property laws.')}</span>
                        </div>

                        <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '0.9rem 1.1rem', borderRadius: '4px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                            <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.25rem' }}>
                                {t('terms_page.sec3_bullet2_title', 'Restrictions on scraping & mirroring')}
                            </strong>
                            <span>{t('terms_page.sec3_bullet2_desc', "You may not copy, reproduce, scrape, mirror, redistribute, or reverse-engineer the site's database structures, calculation engines, or custom scripts for commercial purposes without prior express written permission.")}</span>
                        </div>
                    </div>
                </div>

                {/* Section 4 */}
                <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <h2 style={{
                        fontFamily: 'var(--font-hero)',
                        color: 'var(--gold-bright)',
                        fontSize: '1.2rem',
                        margin: '0 0 1rem 0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem'
                    }}>
                        <CheckCircle2 size={20} style={{ color: 'var(--gold)' }} />
                        <span>{t('terms_page.sec4_title', '4. Acceptable use policy')}</span>
                    </h2>

                    <p style={{ margin: '0 0 0.75rem 0' }}>
                        {t('terms_page.sec4_intro', 'You agree not to use the Service:')}
                    </p>

                    <ul style={{
                        margin: 0,
                        paddingLeft: '1.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem'
                    }}>
                        <li>{t('terms_page.sec4_bullet1', 'In any way that violates any applicable local, national, or international law or regulation.')}</li>
                        <li>{t('terms_page.sec4_bullet2', 'To transmit or procure the sending of any advertising or promotional material (spam).')}</li>
                        <li>{t('terms_page.sec4_bullet3', "To engage in any conduct that restricts, inhibits, or impairs anyone's use or enjoyment of the Service, or which may expose FGF WIKI or its users to damage, liability, or denial of service.")}</li>
                        <li>{t('terms_page.sec4_bullet4', 'To attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of the Service, the server on which the Service is hosted, or any database connected to the Service.')}</li>
                    </ul>
                </div>

                {/* Section 5 */}
                <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <h2 style={{
                        fontFamily: 'var(--font-hero)',
                        color: 'var(--gold-bright)',
                        fontSize: '1.2rem',
                        margin: '0 0 1rem 0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem'
                    }}>
                        <ExternalLink size={20} style={{ color: 'var(--accent-teal, #4ecdc4)' }} />
                        <span>{t('terms_page.sec5_title', '5. Third-party links and external services')}</span>
                    </h2>

                    <p style={{ margin: '0 0 0.75rem 0' }}>
                        {t('terms_page.sec5_p1', 'Our Service may contain links to third-party websites or services (such as Discord, official game portals, or external hosting tools) that are not owned or controlled by FGF WIKI.')}
                    </p>
                    <p style={{ margin: 0 }}>
                        {t('terms_page.sec5_p2', 'We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You acknowledge and agree that FGF WIKI shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such websites.')}
                    </p>
                </div>

                {/* Section 6 */}
                <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <h2 style={{
                        fontFamily: 'var(--font-hero)',
                        color: 'var(--gold-bright)',
                        fontSize: '1.2rem',
                        margin: '0 0 1rem 0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem'
                    }}>
                        <AlertTriangle size={20} style={{ color: '#ef4444' }} />
                        <span>{t('terms_page.sec6_title', '6. Limitation of liability')}</span>
                    </h2>

                    <p style={{ margin: '0 0 0.75rem 0', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {t('terms_page.sec6_intro', 'To the fullest extent permitted by applicable law:')}
                    </p>
                    <p style={{ margin: 0 }}>
                        {t('terms_page.sec6_p1', 'In no event shall FGF WIKI, its owner, contributors, or service providers be liable for any direct, indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of (or inability to access or use) the Service; (ii) any content obtained from the Service; or (iii) unauthorized access, use, or alteration of your transmissions or content.')}
                    </p>
                </div>

                {/* Section 7 */}
                <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <h2 style={{
                        fontFamily: 'var(--font-hero)',
                        color: 'var(--gold-bright)',
                        fontSize: '1.2rem',
                        margin: '0 0 1rem 0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem'
                    }}>
                        <FileText size={20} style={{ color: 'var(--gold)' }} />
                        <span>{t('terms_page.sec7_title', '7. Modifications and termination')}</span>
                    </h2>

                    <p style={{ margin: '0 0 0.75rem 0' }}>
                        {t('terms_page.sec7_p1', 'We reserve the right, at our sole discretion, to modify, update, suspend, or discontinue these Terms or any part of the Service at any time without prior notice.')}
                    </p>
                    <p style={{ margin: 0 }}>
                        {t('terms_page.sec7_p2', 'What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after revisions become effective, you agree to be bound by the revised terms.')}
                    </p>
                </div>

                {/* Section 8 */}
                <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <h2 style={{
                        fontFamily: 'var(--font-hero)',
                        color: 'var(--gold-bright)',
                        fontSize: '1.2rem',
                        margin: '0 0 1rem 0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem'
                    }}>
                        <Scale size={20} style={{ color: 'var(--gold-bright)' }} />
                        <span>{t('terms_page.sec8_title', '8. Governing law and jurisdiction')}</span>
                    </h2>

                    <p style={{ margin: 0 }}>
                        {t('terms_page.sec8_p1', 'These Terms shall be governed and construed in accordance with the laws of France, without regard to its conflict of law provisions. Any dispute arising out of or in connection with these Terms or the use of the Service shall be subject to the exclusive jurisdiction of the competent courts of France.')}
                    </p>
                </div>

                {/* Section 9 */}
                <div style={{
                    background: 'rgba(6, 7, 14, 0.85)',
                    border: '1px solid rgba(212, 175, 55, 0.35)',
                    borderRadius: '8px',
                    padding: '1.5rem 1.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem'
                }}>
                    <h2 style={{
                        fontFamily: 'var(--font-hero)',
                        color: 'var(--gold)',
                        fontSize: '1.2rem',
                        margin: 0,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem'
                    }}>
                        <Mail size={20} style={{ color: 'var(--gold)' }} />
                        <span>{t('terms_page.sec9_title', '9. Contact information')}</span>
                    </h2>

                    <p style={{ margin: 0 }}>
                        {t('terms_page.sec9_p1', 'If you have any questions, inquiries, or copyright-related requests regarding these Terms and Conditions, please contact us at:')}
                    </p>

                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        background: 'rgba(212, 175, 55, 0.1)',
                        border: '1px solid rgba(212, 175, 55, 0.25)',
                        padding: '0.5rem 1rem',
                        borderRadius: '4px',
                        width: 'fit-content',
                        marginTop: '0.25rem'
                    }}>
                        <a
                            href="mailto:fgfwiki@gmail.com"
                            style={{
                                color: 'var(--gold-bright)',
                                textDecoration: 'none',
                                fontFamily: 'var(--font-mono)',
                                fontWeight: 'bold',
                                fontSize: '0.95rem'
                            }}
                        >
                            fgfwiki@gmail.com
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
}
