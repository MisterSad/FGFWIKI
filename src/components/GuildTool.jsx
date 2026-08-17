import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    BrainCircuit, ScanLine, Swords, Globe, LineChart,
    CalendarCheck, ClipboardCheck, BarChart3, Smartphone, ShieldAlert, Bell,
    Trophy, CheckCircle2, Crown, Star, MessageCircle, Building2,
    Zap, Clock, ChevronDown, Sparkles, Shield, User, Play,
    Copy, Check, ExternalLink, Activity, Target, ShieldCheck,
    XCircle, CheckCheck, TrendingUp, Lock, Users
} from 'lucide-react';
import './GuildTool.css';

const TOOL_URL = 'https://guildmanagement.vercel.app/';
const DISCORD_URL = 'https://discord.gg/6NNe6zUbt6';

const DEMO_ACCOUNTS = [
    {
        id: 'DemoAdmin',
        password: 'demo1234',
        icon: Shield,
        badgeKey: 'guild_tool.demo_admin_badge',
        nameKey: 'guild_tool.demo_admin_name',
        descKey: 'guild_tool.demo_admin_desc',
        features: ['Roster 7D', '16 Scanners OCR', 'Timezone 24/7', 'Shadowfront 20+10', 'Sanctions & Absences']
    },
    {
        id: 'DemoPlayer',
        password: 'demo1234',
        icon: User,
        badgeKey: 'guild_tool.demo_player_badge',
        nameKey: 'guild_tool.demo_player_name',
        descKey: 'guild_tool.demo_player_desc',
        features: ['Courbes vs Guilde', 'Bilan Militaire 7D', 'Absences 1-Clic', 'Suivi Assiduité', 'KPIs Personnels']
    },
];

const COMPARISON_ROWS = [
    {
        icon: Users,
        taskKey: 'guild_tool.comp1_task',
        oldKey: 'guild_tool.comp1_old',
        newKey: 'guild_tool.comp1_new'
    },
    {
        icon: Swords,
        taskKey: 'guild_tool.comp2_task',
        oldKey: 'guild_tool.comp2_old',
        newKey: 'guild_tool.comp2_new'
    },
    {
        icon: Target,
        taskKey: 'guild_tool.comp3_task',
        oldKey: 'guild_tool.comp3_old',
        newKey: 'guild_tool.comp3_new'
    },
    {
        icon: Globe,
        taskKey: 'guild_tool.comp4_task',
        oldKey: 'guild_tool.comp4_old',
        newKey: 'guild_tool.comp4_new'
    },
    {
        icon: CalendarCheck,
        taskKey: 'guild_tool.comp5_task',
        oldKey: 'guild_tool.comp5_old',
        newKey: 'guild_tool.comp5_new'
    },
    {
        icon: BarChart3,
        taskKey: 'guild_tool.comp6_task',
        oldKey: 'guild_tool.comp6_old',
        newKey: 'guild_tool.comp6_new'
    }
];

const PLANS = [
    { nameKey: 'guild_tool.p1_name', priceKey: 'guild_tool.p1_price', popular: false },
    { nameKey: 'guild_tool.p3_name', priceKey: 'guild_tool.p3_price', popular: false },
    { nameKey: 'guild_tool.p6_name', priceKey: 'guild_tool.p6_price', popular: true },
    { nameKey: 'guild_tool.p12_name', priceKey: 'guild_tool.p12_price', popular: false },
];

const TESTIMONIALS = [
    { quoteKey: 'guild_tool.t1_quote', roleKey: 'guild_tool.t1_role', icon: Crown },
    { quoteKey: 'guild_tool.t2_quote', roleKey: 'guild_tool.t2_role', icon: Swords },
    { quoteKey: 'guild_tool.t3_quote', roleKey: 'guild_tool.t3_role', icon: Star },
];

const FAQ = [
    { qKey: 'guild_tool.q1', aKey: 'guild_tool.a1' },
    { qKey: 'guild_tool.q2', aKey: 'guild_tool.a2' },
    { qKey: 'guild_tool.q3', aKey: 'guild_tool.a3' },
    { qKey: 'guild_tool.q4', aKey: 'guild_tool.a4' },
    { qKey: 'guild_tool.q5', aKey: 'guild_tool.a5' },
    { qKey: 'guild_tool.q6', aKey: 'guild_tool.a6' },
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

function CopyBadge({ text, label }) {
    const { t } = useTranslation();
    const [copied, setCopied] = useState(false);

    const handleCopy = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            type="button"
            className={`gt-copy-btn ${copied ? 'copied' : ''}`}
            onClick={handleCopy}
            title={copied ? t('guild_tool.demo_copied') : `${t('guild_tool.demo_copy')} ${label || text}`}
        >
            <code>{text}</code>
            <span className="gt-copy-icon">
                {copied ? <Check size={13} className="gt-icon-success" /> : <Copy size={13} />}
            </span>
            {copied && <span className="gt-copied-toast">{t('guild_tool.demo_copied')}</span>}
        </button>
    );
}

export default function GuildTool() {
    const { t } = useTranslation();

    return (
        <div className="gt-page">
            {/* ── 1. HERO HEADER ── */}
            <section className="gt-hero">
                <div className="gt-hero-glow" aria-hidden="true" />
                <div className="gt-hero-inner">
                    <div className="gt-hero-badge">
                        <Sparkles size={14} className="gt-sparkle-icon" />
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
                        <a className="gt-btn gt-btn-primary" href="#demo">
                            <Play size={18} />
                            <span>{t('guild_tool.hero_cta_demo')}</span>
                        </a>
                        <a className="gt-btn gt-btn-discord" href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
                            <MessageCircle size={18} />
                            <span>{t('guild_tool.hero_cta_discord')}</span>
                        </a>
                    </div>

                    <div className="gt-hero-badges">
                        <span className="gt-badge"><ScanLine size={14} />{t('guild_tool.badge_ocr')}</span>
                        <span className="gt-badge"><Swords size={14} />{t('guild_tool.badge_matrix')}</span>
                        <span className="gt-badge"><Globe size={14} />{t('guild_tool.badge_timezone')}</span>
                        <span className="gt-badge"><LineChart size={14} />{t('guild_tool.badge_portal')}</span>
                    </div>
                </div>
            </section>

            {/* ── 2. KEY STATS & PROOF ── */}
            <section className="gt-stats-section">
                <div className="gt-container">
                    <div className="gt-stats-grid">
                        <div className="gt-stat-card">
                            <div className="gt-stat-val">{t('guild_tool.stat1_val')}</div>
                            <div className="gt-stat-lbl">{t('guild_tool.stat1_lbl')}</div>
                            <div className="gt-stat-sub">{t('guild_tool.stat1_sub')}</div>
                        </div>
                        <div className="gt-stat-card highlight">
                            <div className="gt-stat-val">{t('guild_tool.stat2_val')}</div>
                            <div className="gt-stat-lbl">{t('guild_tool.stat2_lbl')}</div>
                            <div className="gt-stat-sub">{t('guild_tool.stat2_sub')}</div>
                        </div>
                        <div className="gt-stat-card">
                            <div className="gt-stat-val">{t('guild_tool.stat3_val')}</div>
                            <div className="gt-stat-lbl">{t('guild_tool.stat3_lbl')}</div>
                            <div className="gt-stat-sub">{t('guild_tool.stat3_sub')}</div>
                        </div>
                        <div className="gt-stat-card highlight">
                            <div className="gt-stat-val">{t('guild_tool.stat4_val')}</div>
                            <div className="gt-stat-lbl">{t('guild_tool.stat4_lbl')}</div>
                            <div className="gt-stat-sub">{t('guild_tool.stat4_sub')}</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 3. COMPARISON TABLE: EXCEL VS FGF GUILD TOOL ── */}
            <section className="gt-section gt-section-alt">
                <div className="gt-container">
                    <SectionLabel>{t('guild_tool.comparison_tag')}</SectionLabel>
                    <SectionTitle
                        titleKey="guild_tool.comparison_title"
                        subtitleKey="guild_tool.comparison_subtitle"
                    />

                    <div className="gt-comparison-wrap">
                        <div className="gt-comparison-header">
                            <div className="gt-comp-col-task">{t('guild_tool.comp_th_task')}</div>
                            <div className="gt-comp-col-old">{t('guild_tool.comp_th_old')}</div>
                            <div className="gt-comp-col-new">{t('guild_tool.comp_th_new')}</div>
                        </div>
                        <div className="gt-comparison-body">
                            {COMPARISON_ROWS.map((row, idx) => {
                                const Icon = row.icon;
                                return (
                                    <div key={idx} className="gt-comp-row">
                                        <div className="gt-comp-col-task">
                                            <div className="gt-comp-task-icon">
                                                <Icon size={16} />
                                            </div>
                                            <span>{t(row.taskKey)}</span>
                                        </div>
                                        <div className="gt-comp-col-old">
                                            <div className="gt-comp-badge-old">
                                                <XCircle size={15} className="gt-icon-cross" />
                                                <span>{t(row.oldKey)}</span>
                                            </div>
                                        </div>
                                        <div className="gt-comp-col-new">
                                            <div className="gt-comp-badge-new">
                                                <Zap size={15} className="gt-icon-zap" />
                                                <span>{t(row.newKey)}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 4. 4 STRATEGIC PILLARS / BENTO SHOWCASE ── */}
            <section className="gt-section">
                <div className="gt-container">
                    <SectionLabel>{t('guild_tool.bento_tag')}</SectionLabel>
                    <SectionTitle
                        titleKey="guild_tool.bento_title"
                        subtitleKey="guild_tool.bento_subtitle"
                    />

                    <div className="gt-bento-grid">
                        {/* PILLAR 1: OCR AI VISION */}
                        <div className="gt-bento-card gt-bento-large gt-bento-ai">
                            <div className="gt-bento-top">
                                <span className="gt-bento-pill ai">
                                    <BrainCircuit size={14} />
                                    {t('guild_tool.ocr_badge')}
                                </span>
                            </div>
                            <h3 className="gt-bento-title">{t('guild_tool.ocr_title')}</h3>
                            <p className="gt-bento-desc">{t('guild_tool.ocr_desc')}</p>

                            <div className="gt-bento-subgrid">
                                <div className="gt-subfeature-card">
                                    <div className="gt-subfeature-head">
                                        <ScanLine size={16} className="gt-icon-gold" />
                                        <h4>{t('guild_tool.ocr_roster_title')}</h4>
                                    </div>
                                    <p>{t('guild_tool.ocr_roster_items')}</p>
                                </div>
                                <div className="gt-subfeature-card">
                                    <div className="gt-subfeature-head">
                                        <Swords size={16} className="gt-icon-cyan" />
                                        <h4>{t('guild_tool.ocr_events_title')}</h4>
                                    </div>
                                    <p>{t('guild_tool.ocr_events_items')}</p>
                                </div>
                            </div>

                            <div className="gt-bento-shield-box">
                                <ShieldCheck size={18} className="gt-icon-green" />
                                <div>
                                    <strong>{t('guild_tool.ocr_shield_title')}</strong>
                                    <p>{t('guild_tool.ocr_shield_desc')}</p>
                                </div>
                            </div>
                        </div>

                        {/* PILLAR 2: MILITARY MATRIX & TIMEZONE COVERAGE */}
                        <div className="gt-bento-card gt-bento-matrix">
                            <div className="gt-bento-top">
                                <span className="gt-bento-pill gold">
                                    <Swords size={14} />
                                    {t('guild_tool.matrix_badge')}
                                </span>
                            </div>
                            <h3 className="gt-bento-title">{t('guild_tool.matrix_title')}</h3>
                            <p className="gt-bento-desc">{t('guild_tool.matrix_desc')}</p>

                            <div className="gt-pillar-list">
                                <div className="gt-pillar-item">
                                    <div className="gt-pillar-icon"><BarChart3 size={16} /></div>
                                    <div>
                                        <h4>{t('guild_tool.matrix_f1_title')}</h4>
                                        <p>{t('guild_tool.matrix_f1_desc')}</p>
                                    </div>
                                </div>
                                <div className="gt-pillar-item">
                                    <div className="gt-pillar-icon"><Target size={16} /></div>
                                    <div>
                                        <h4>{t('guild_tool.matrix_f2_title')}</h4>
                                        <p>{t('guild_tool.matrix_f2_desc')}</p>
                                    </div>
                                </div>
                                <div className="gt-pillar-item">
                                    <div className="gt-pillar-icon"><Globe size={16} /></div>
                                    <div>
                                        <h4>{t('guild_tool.matrix_f3_title')}</h4>
                                        <p>{t('guild_tool.matrix_f3_desc')}</p>
                                    </div>
                                </div>
                                <div className="gt-pillar-item">
                                    <div className="gt-pillar-icon"><TrendingUp size={16} /></div>
                                    <div>
                                        <h4>{t('guild_tool.matrix_f4_title')}</h4>
                                        <p>{t('guild_tool.matrix_f4_desc')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* PILLAR 3: PLAYER PORTAL */}
                        <div className="gt-bento-card gt-bento-portal">
                            <div className="gt-bento-top">
                                <span className="gt-bento-pill cyan">
                                    <LineChart size={14} />
                                    {t('guild_tool.portal_badge')}
                                </span>
                            </div>
                            <h3 className="gt-bento-title">{t('guild_tool.portal_title')}</h3>
                            <p className="gt-bento-desc">{t('guild_tool.portal_desc')}</p>

                            <div className="gt-pillar-list">
                                <div className="gt-pillar-item">
                                    <div className="gt-pillar-icon"><LineChart size={16} /></div>
                                    <div>
                                        <h4>{t('guild_tool.portal_f1_title')}</h4>
                                        <p>{t('guild_tool.portal_f1_desc')}</p>
                                    </div>
                                </div>
                                <div className="gt-pillar-item">
                                    <div className="gt-pillar-icon"><Shield size={16} /></div>
                                    <div>
                                        <h4>{t('guild_tool.portal_f2_title')}</h4>
                                        <p>{t('guild_tool.portal_f2_desc')}</p>
                                    </div>
                                </div>
                                <div className="gt-pillar-item">
                                    <div className="gt-pillar-icon"><CalendarCheck size={16} /></div>
                                    <div>
                                        <h4>{t('guild_tool.portal_f3_title')}</h4>
                                        <p>{t('guild_tool.portal_f3_desc')}</p>
                                    </div>
                                </div>
                                <div className="gt-pillar-item">
                                    <div className="gt-pillar-icon"><CheckCheck size={16} /></div>
                                    <div>
                                        <h4>{t('guild_tool.portal_f4_title')}</h4>
                                        <p>{t('guild_tool.portal_f4_desc')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* PILLAR 4: EVENTS, SHADOWFRONT & DISCIPLINE */}
                        <div className="gt-bento-card gt-bento-large gt-bento-events">
                            <div className="gt-bento-top">
                                <span className="gt-bento-pill purple">
                                    <Trophy size={14} />
                                    {t('guild_tool.events_badge')}
                                </span>
                            </div>
                            <h3 className="gt-bento-title">{t('guild_tool.events_title')}</h3>
                            <p className="gt-bento-desc">{t('guild_tool.events_desc')}</p>

                            <div className="gt-bento-subgrid">
                                <div className="gt-subfeature-card">
                                    <div className="gt-subfeature-head">
                                        <Trophy size={16} className="gt-icon-gold" />
                                        <h4>{t('guild_tool.events_f1_title')}</h4>
                                    </div>
                                    <p>{t('guild_tool.events_f1_desc')}</p>
                                </div>
                                <div className="gt-subfeature-card">
                                    <div className="gt-subfeature-head">
                                        <ShieldAlert size={16} className="gt-icon-purple" />
                                        <h4>{t('guild_tool.events_f2_title')}</h4>
                                    </div>
                                    <p>{t('guild_tool.events_f2_desc')}</p>
                                </div>
                            </div>

                            <div className="gt-bento-shield-box discord-box">
                                <MessageCircle size={18} className="gt-icon-discord" />
                                <div>
                                    <strong>{t('guild_tool.events_f3_title')}</strong>
                                    <p>{t('guild_tool.events_f3_desc')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 5. DUAL PERSONA: WHO IS THIS FOR? ── */}
            <section className="gt-section gt-section-alt">
                <div className="gt-container">
                    <SectionLabel>{t('guild_tool.persona_tag')}</SectionLabel>
                    <SectionTitle
                        titleKey="guild_tool.persona_title"
                        subtitleKey="guild_tool.persona_subtitle"
                    />

                    <div className="gt-persona-grid">
                        {/* PERSONA 1: OFFICERS & LEADERS */}
                        <div className="gt-persona-card">
                            <div className="gt-persona-head">
                                <div className="gt-persona-icon leader">
                                    <Crown size={24} />
                                </div>
                                <div>
                                    <h3 className="gt-persona-title">{t('guild_tool.persona1_title')}</h3>
                                    <span className="gt-persona-role">{t('guild_tool.persona1_subtitle')}</span>
                                </div>
                            </div>
                            <ul className="gt-persona-list">
                                <li>
                                    <CheckCircle2 size={16} className="gt-icon-green" />
                                    <span>{t('guild_tool.persona1_item1')}</span>
                                </li>
                                <li>
                                    <CheckCircle2 size={16} className="gt-icon-green" />
                                    <span>{t('guild_tool.persona1_item2')}</span>
                                </li>
                                <li>
                                    <CheckCircle2 size={16} className="gt-icon-green" />
                                    <span>{t('guild_tool.persona1_item3')}</span>
                                </li>
                                <li>
                                    <CheckCircle2 size={16} className="gt-icon-green" />
                                    <span>{t('guild_tool.persona1_item4')}</span>
                                </li>
                            </ul>
                        </div>

                        {/* PERSONA 2: GUILD PLAYERS */}
                        <div className="gt-persona-card">
                            <div className="gt-persona-head">
                                <div className="gt-persona-icon player">
                                    <User size={24} />
                                </div>
                                <div>
                                    <h3 className="gt-persona-title">{t('guild_tool.persona2_title')}</h3>
                                    <span className="gt-persona-role">{t('guild_tool.persona2_subtitle')}</span>
                                </div>
                            </div>
                            <ul className="gt-persona-list">
                                <li>
                                    <CheckCircle2 size={16} className="gt-icon-cyan" />
                                    <span>{t('guild_tool.persona2_item1')}</span>
                                </li>
                                <li>
                                    <CheckCircle2 size={16} className="gt-icon-cyan" />
                                    <span>{t('guild_tool.persona2_item2')}</span>
                                </li>
                                <li>
                                    <CheckCircle2 size={16} className="gt-icon-cyan" />
                                    <span>{t('guild_tool.persona2_item3')}</span>
                                </li>
                                <li>
                                    <CheckCircle2 size={16} className="gt-icon-cyan" />
                                    <span>{t('guild_tool.persona2_item4')}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 6. INTERACTIVE DEMO SANDBOX ── */}
            <section className="gt-section" id="demo">
                <div className="gt-container">
                    <SectionLabel>{t('guild_tool.demo_tag')}</SectionLabel>
                    <SectionTitle
                        titleKey="guild_tool.demo_title"
                        subtitleKey="guild_tool.demo_subtitle"
                    />

                    <div className="gt-demo-wrap">
                        <div className="gt-demo-grid">
                            {DEMO_ACCOUNTS.map(acc => {
                                const Icon = acc.icon;
                                return (
                                    <div key={acc.id} className="gt-demo-card">
                                        <div className="gt-demo-head">
                                            <div className="gt-demo-icon">
                                                <Icon size={20} />
                                            </div>
                                            <div>
                                                <span className="gt-demo-badge">{t(acc.badgeKey)}</span>
                                                <h3 className="gt-demo-title">{t(acc.nameKey)}</h3>
                                            </div>
                                        </div>

                                        <p className="gt-demo-card-desc">{t(acc.descKey)}</p>

                                        <div className="gt-demo-credentials">
                                            <div className="gt-demo-row">
                                                <span className="gt-demo-field-lbl">{t('guild_tool.demo_id')}</span>
                                                <CopyBadge text={acc.id} label={t('guild_tool.demo_id')} />
                                            </div>
                                            <div className="gt-demo-row">
                                                <span className="gt-demo-field-lbl">{t('guild_tool.demo_password')}</span>
                                                <CopyBadge text={acc.password} label={t('guild_tool.demo_password')} />
                                            </div>
                                        </div>

                                        <div className="gt-demo-feature-tags">
                                            {acc.features.map((feat, i) => (
                                                <span key={i} className="gt-demo-tag">{feat}</span>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="gt-demo-cta">
                            <a
                                className="gt-btn gt-btn-primary gt-btn-lg"
                                href={TOOL_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Play size={20} />
                                <span>{t('guild_tool.demo_cta')}</span>
                                <ExternalLink size={16} />
                            </a>
                        </div>
                        <p className="gt-demo-note">{t('guild_tool.demo_note')}</p>
                    </div>
                </div>
            </section>

            {/* ── 7. PRICING & TENANT REGISTRATION ── */}
            <section className="gt-section gt-section-alt">
                <div className="gt-container">
                    <SectionLabel>{t('guild_tool.pricing_tag')}</SectionLabel>
                    <SectionTitle
                        titleKey="guild_tool.pricing_title"
                        subtitleKey="guild_tool.pricing_subtitle"
                    />

                    {/* Free Month Highlight Card */}
                    <div className="gt-free-month-card">
                        <div className="gt-free-month-badge">
                            <Sparkles size={15} />
                            <span>{t('guild_tool.pricing_free_badge')}</span>
                        </div>
                        <h3 className="gt-free-month-title">{t('guild_tool.pricing_free_title')}</h3>
                        <p className="gt-free-month-desc">{t('guild_tool.pricing_free_desc')}</p>
                    </div>

                    {/* Pricing plans */}
                    <div className="gt-plans">
                        {PLANS.map(p => (
                            <div key={p.nameKey} className={`gt-plan ${p.popular ? 'popular' : ''}`}>
                                {p.popular && <span className="gt-plan-popular-tag">Plus Populaire</span>}
                                <span className="gt-plan-name">{t(p.nameKey)}</span>
                                <span className="gt-plan-price">
                                    {t(p.priceKey)} <span className="gt-plan-currency">{t('guild_tool.currency')}</span>
                                </span>
                                <span className="gt-plan-check">
                                    <CheckCircle2 size={16} />
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Included Features Checklist */}
                    <div className="gt-included-box">
                        <h4 className="gt-included-title">{t('guild_tool.pricing_included_title')}</h4>
                        <div className="gt-included-grid">
                            <div className="gt-included-item">
                                <CheckCircle2 size={16} className="gt-icon-green" />
                                <span>{t('guild_tool.pricing_inc_1')}</span>
                            </div>
                            <div className="gt-included-item">
                                <CheckCircle2 size={16} className="gt-icon-green" />
                                <span>{t('guild_tool.pricing_inc_2')}</span>
                            </div>
                            <div className="gt-included-item">
                                <CheckCircle2 size={16} className="gt-icon-green" />
                                <span>{t('guild_tool.pricing_inc_3')}</span>
                            </div>
                            <div className="gt-included-item">
                                <CheckCircle2 size={16} className="gt-icon-green" />
                                <span>{t('guild_tool.pricing_inc_4')}</span>
                            </div>
                            <div className="gt-included-item">
                                <CheckCircle2 size={16} className="gt-icon-green" />
                                <span>{t('guild_tool.pricing_inc_5')}</span>
                            </div>
                            <div className="gt-included-item">
                                <CheckCircle2 size={16} className="gt-icon-green" />
                                <span>{t('guild_tool.pricing_inc_6')}</span>
                            </div>
                        </div>
                    </div>

                    <div className="gt-pricing-note">
                        <p>{t('guild_tool.pricing_note')}</p>
                        <div className="gt-pricing-meta">
                            <span className="gt-payments">
                                <span className="gt-payments-label">{t('guild_tool.pricing_payment_label')}:</span>{' '}
                                {t('guild_tool.pricing_payments')}
                            </span>
                        </div>
                    </div>

                    {/* Discord Tenant Request Action */}
                    <div className="gt-tenant-card">
                        <div className="gt-tenant-icon"><MessageCircle size={22} /></div>
                        <div className="gt-tenant-text">
                            <h3 className="gt-tenant-title">{t('guild_tool.pricing_how_title')}</h3>
                            <p className="gt-tenant-desc">{t('guild_tool.pricing_how_desc')}</p>
                        </div>
                        <a className="gt-btn gt-btn-discord" href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
                            <MessageCircle size={18} />
                            <span>{t('guild_tool.pricing_cta')}</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* ── 8. TESTIMONIALS ── */}
            <section className="gt-section">
                <div className="gt-container">
                    <SectionLabel>Témoignages</SectionLabel>
                    <SectionTitle titleKey="guild_tool.testimonials_title" />
                    <div className="gt-testimonials">
                        {TESTIMONIALS.map((test, idx) => {
                            const Icon = test.icon;
                            return (
                                <div key={idx} className="gt-testimonial reveal">
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

            {/* ── 9. FAQ ── */}
            <section className="gt-section gt-section-alt">
                <div className="gt-container gt-container-narrow">
                    <SectionLabel>{t('guild_tool.faq_tag')}</SectionLabel>
                    <SectionTitle titleKey="guild_tool.faq_title" subtitleKey="guild_tool.faq_subtitle" />
                    <div className="gt-faq">
                        {FAQ.map((f, i) => (
                            <FaqItem key={i} qKey={f.qKey} aKey={f.aKey} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 10. FINAL CTA ── */}
            <section className="gt-final">
                <div className="gt-final-glow" aria-hidden="true" />
                <div className="gt-final-inner">
                    <div className="gt-final-badge">
                        <Sparkles size={14} />
                        <span>{t('guild_tool.cta_badge')}</span>
                    </div>
                    <h2 className="gt-final-title">{t('guild_tool.cta_title')}</h2>
                    <p className="gt-final-subtitle">{t('guild_tool.cta_subtitle')}</p>
                    <div className="gt-hero-cta-row">
                        <a className="gt-btn gt-btn-primary" href="#demo">
                            <Play size={18} />
                            <span>{t('guild_tool.hero_cta_demo')}</span>
                        </a>
                        <a className="gt-btn gt-btn-discord" href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
                            <MessageCircle size={18} />
                            <span>{t('guild_tool.hero_cta_discord')}</span>
                        </a>
                    </div>
                    <p className="gt-final-note">{t('guild_tool.cta_note')}</p>
                </div>
            </section>
        </div>
    );
}
