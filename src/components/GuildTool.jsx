import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    CalendarCheck, ClipboardCheck, BarChart3, Smartphone, ShieldAlert, Bell,
    Trophy, CheckCircle2, Crown, Star, MessageCircle, Building2,
    Zap, Globe, Clock, ChevronDown, Sparkles
} from 'lucide-react';
import './GuildTool.css';

const DISCORD_URL = 'https://discord.gg/6NNe6zUbt6';

const FEATURES = [
    { icon: CalendarCheck, titleKey: 'guild_tool.f1_title', descKey: 'guild_tool.f1_desc' },
    { icon: ClipboardCheck, titleKey: 'guild_tool.f2_title', descKey: 'guild_tool.f2_desc' },
    { icon: BarChart3, titleKey: 'guild_tool.f3_title', descKey: 'guild_tool.f3_desc' },
    { icon: Smartphone, titleKey: 'guild_tool.f4_title', descKey: 'guild_tool.f4_desc' },
    { icon: ShieldAlert, titleKey: 'guild_tool.f5_title', descKey: 'guild_tool.f5_desc' },
    { icon: Bell, titleKey: 'guild_tool.f6_title', descKey: 'guild_tool.f6_desc' },
];

const STEPS = [
    { icon: Building2, titleKey: 'guild_tool.s1_title', descKey: 'guild_tool.s1_desc' },
    { icon: Zap, titleKey: 'guild_tool.s2_title', descKey: 'guild_tool.s2_desc' },
    { icon: Trophy, titleKey: 'guild_tool.s3_title', descKey: 'guild_tool.s3_desc' },
];

const PLANS = [
    { nameKey: 'guild_tool.p1_name', priceKey: 'guild_tool.p1_price' },
    { nameKey: 'guild_tool.p3_name', priceKey: 'guild_tool.p3_price' },
    { nameKey: 'guild_tool.p6_name', priceKey: 'guild_tool.p6_price' },
    { nameKey: 'guild_tool.p12_name', priceKey: 'guild_tool.p12_price' },
];

const TESTIMONIALS = [
    { quoteKey: 'guild_tool.t1_quote', roleKey: 'guild_tool.t1_role', icon: Crown },
    { quoteKey: 'guild_tool.t2_quote', roleKey: 'guild_tool.t2_role', icon: Star },
    { quoteKey: 'guild_tool.t3_quote', roleKey: 'guild_tool.t3_role', icon: Trophy },
];

const FAQ = [
    { qKey: 'guild_tool.q1', aKey: 'guild_tool.a1' },
    { qKey: 'guild_tool.q2', aKey: 'guild_tool.a2' },
    { qKey: 'guild_tool.q3', aKey: 'guild_tool.a3' },
    { qKey: 'guild_tool.q4', aKey: 'guild_tool.a4' },
];

function SectionLabel({ children }) {
    return (
        <div className="gt-section-label">
            <span>{children}</span>
        </div>
    );
}

function SectionTitle({ titleKey, subtitleKey }) {
    const { t } = useTranslation();
    return (
        <div className="gt-section-head">
            <h2 className="gt-section-title">{t(titleKey)}</h2>
            {subtitleKey && <p className="gt-section-subtitle">{t(subtitleKey)}</p>}
        </div>
    );
}

function FaqItem({ qKey, aKey }) {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    return (
        <div className={`gt-faq-item ${open ? 'open' : ''}`}>
            <button type="button" className="gt-faq-question" onClick={() => setOpen(o => !o)} aria-expanded={open}>
                <span>{t(qKey)}</span>
                <ChevronDown size={18} className="gt-faq-chevron" />
            </button>
            {open && <div className="gt-faq-answer">{t(aKey)}</div>}
        </div>
    );
}

export default function GuildTool() {
    const { t } = useTranslation();

    return (
        <div className="gt-page">
            {/* ── 1. HERO ── */}
            <section className="gt-hero">
                <div className="gt-hero-glow" aria-hidden="true" />
                <div className="gt-hero-inner">
                    <div className="gt-hero-badge">
                        <Sparkles size={13} />
                        <span>{t('guild_tool.hero_kicker')}</span>
                    </div>

                    <h1 className="gt-hero-title">
                        {t('guild_tool.hero_title').split('\n').map((line, i) => (
                            <React.Fragment key={i}>
                                {i > 0 && <br />}
                                {line}
                            </React.Fragment>
                        ))}
                    </h1>

                    <p className="gt-hero-subtitle">
                        {t('guild_tool.hero_subtitle')}
                    </p>

                    <div className="gt-hero-cta-row">
                        <a className="gt-btn gt-btn-discord" href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
                            <MessageCircle size={18} />
                            <span>{t('guild_tool.hero_cta_secondary')}</span>
                        </a>
                    </div>

                    <div className="gt-hero-badges">
                        <span className="gt-badge"><Globe size={14} />{t('guild_tool.badge_cloud')}</span>
                        <span className="gt-badge"><Smartphone size={14} />{t('guild_tool.badge_device')}</span>
                        <span className="gt-badge"><Clock size={14} />{t('guild_tool.badge_minutes')}</span>
                    </div>
                </div>
            </section>

            {/* ── 2. FEATURES ── */}
            <section className="gt-section">
                <div className="gt-container">
                    <SectionLabel>Features</SectionLabel>
                    <SectionTitle titleKey="guild_tool.features_title" subtitleKey="guild_tool.features_subtitle" />
                    <div className="gt-features-grid">
                        {FEATURES.map(f => {
                            const Icon = f.icon;
                            return (
                                <div key={f.titleKey} className="gt-feature-card reveal">
                                    <div className="gt-feature-icon"><Icon size={22} /></div>
                                    <h3 className="gt-feature-title">{t(f.titleKey)}</h3>
                                    <p className="gt-feature-desc">{t(f.descKey)}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── 3. HOW IT WORKS ── */}
            <section className="gt-section gt-section-alt">
                <div className="gt-container">
                    <SectionLabel>Process</SectionLabel>
                    <SectionTitle titleKey="guild_tool.how_title" subtitleKey="guild_tool.how_subtitle" />
                    <div className="gt-steps">
                        {STEPS.map((s, i) => {
                            const Icon = s.icon;
                            return (
                                <div key={s.titleKey} className="gt-step reveal">
                                    <div className="gt-step-top">
                                        <div className="gt-step-icon"><Icon size={20} /></div>
                                        <span className="gt-step-num">{String(i + 1).padStart(2, '0')}</span>
                                    </div>
                                    <h3 className="gt-step-title">{t(s.titleKey)}</h3>
                                    <p className="gt-step-desc">{t(s.descKey)}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── 4. PRICING ── */}
            <section className="gt-section">
                <div className="gt-container">
                    <SectionLabel>Pricing</SectionLabel>
                    <SectionTitle titleKey="guild_tool.pricing_title" subtitleKey="guild_tool.pricing_subtitle" />
                    <div className="gt-plans">
                        {PLANS.map(p => (
                            <div key={p.nameKey} className="gt-plan">
                                <span className="gt-plan-name">{t(p.nameKey)}</span>
                                <span className="gt-plan-price">
                                    {t(p.priceKey)} <span className="gt-plan-currency">{t('guild_tool.currency')}</span>
                                </span>
                                <span className="gt-plan-check">
                                    <CheckCircle2 size={15} />
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="gt-pricing-note">
                        <p>{t('guild_tool.pricing_note')}</p>
                        <div className="gt-pricing-meta">
                            <span className="gt-payments">
                                <span className="gt-payments-label">{t('guild_tool.pricing_payment_label')}:</span>
                                {t('guild_tool.pricing_payments')}
                            </span>
                        </div>
                    </div>

                    <div className="gt-tenant-card">
                        <div className="gt-tenant-icon"><MessageCircle size={20} /></div>
                        <div className="gt-tenant-text">
                            <h3 className="gt-tenant-title">{t('guild_tool.pricing_how_title')}</h3>
                            <p className="gt-tenant-desc">{t('guild_tool.pricing_how_desc')}</p>
                        </div>
                        <a className="gt-btn gt-btn-discord gt-btn-sm" href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
                            <MessageCircle size={16} />
                            <span>{t('guild_tool.pricing_cta')}</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* ── 5. TESTIMONIALS ── */}
            <section className="gt-section gt-section-alt">
                <div className="gt-container">
                    <SectionLabel>Testimonials</SectionLabel>
                    <SectionTitle titleKey="guild_tool.testimonials_title" />
                    <div className="gt-testimonials">
                        {TESTIMONIALS.map(test => {
                            const Icon = test.icon;
                            return (
                                <div key={test.roleKey} className="gt-testimonial reveal">
                                    <div className="gt-testimonial-quote">“{t(test.quoteKey)}”</div>
                                    <div className="gt-testimonial-foot">
                                        <div className="gt-testimonial-icon"><Icon size={16} /></div>
                                        <span className="gt-testimonial-role">{t(test.roleKey)}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── 6. FAQ ── */}
            <section className="gt-section">
                <div className="gt-container gt-container-narrow">
                    <SectionLabel>FAQ</SectionLabel>
                    <SectionTitle titleKey="guild_tool.faq_title" />
                    <div className="gt-faq">
                        {FAQ.map(f => (
                            <FaqItem key={f.qKey} qKey={f.qKey} aKey={f.aKey} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 7. FINAL CTA ── */}
            <section className="gt-final">
                <div className="gt-final-glow" aria-hidden="true" />
                <div className="gt-final-inner">
                    <h2 className="gt-final-title">{t('guild_tool.cta_title')}</h2>
                    <div className="gt-hero-cta-row">
                        <a className="gt-btn gt-btn-discord" href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
                            <MessageCircle size={18} />
                            <span>{t('guild_tool.hero_cta_secondary')}</span>
                        </a>
                    </div>
                    <p className="gt-final-note">{t('guild_tool.cta_note')}</p>
                </div>
            </section>
        </div>
    );
}
