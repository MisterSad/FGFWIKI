import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { shipDecks } from '../data/gameData';
import TeamDisplay from './TeamDisplay';
import { Rocket, Shield, Crosshair, Zap, Star, Brain, Layers } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';

export default function FlagshipGuide() {
    const { t } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams();
    const activeTab = searchParams.get('tab') === 'decks' ? 'decks' : 'guide';

    const setActiveTab = (tab) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('tab', tab);
        setSearchParams(newParams);
    };

    return (
        <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', color: 'var(--text-main)' }}>

            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2 style={{
                    fontFamily: 'var(--font-hero)',
                    fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
                    color: "#FFFFFF",
                    textTransform: 'uppercase',
                    letterSpacing: 'clamp(1px, 0.4vw, 2px)',
                    marginBottom: '0.5rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap'
                }}>
                    <Rocket size={40} /> {t('flagships.title')}
                </h2>
                <p style={{ color: 'var(--text-dim)', fontSize: 'clamp(0.9rem, 2.4vw, 1.1rem)' }}>
                    {t('flagships.subtitle')}
                </p>
            </div>

            {/* Sub-tab switcher */}
            <div className="sub-tabs-container">
                <button
                    className={`sub-tab-button ${activeTab === 'guide' ? 'active' : ''}`}
                    onClick={() => setActiveTab('guide')}
                >
                    {t('navigation.flagships')}
                </button>
                <button
                    className={`sub-tab-button ${activeTab === 'decks' ? 'active' : ''}`}
                    onClick={() => setActiveTab('decks')}
                >
                    {t('navigation.flagship_decks')}
                </button>
            </div>

            {activeTab === 'guide' ? (
                <>
                    {/* 1. Fundamentals */}
                    <section className="card reveal" style={{ padding: 'clamp(1rem, 4vw, 2rem)', marginBottom: 'clamp(2rem, 5vw, 3rem)', borderLeft: '4px solid var(--gold)' }}>
                        <h3 style={{ fontFamily: 'var(--font-hero)', textTransform: 'uppercase', fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '1.5rem', marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Shield size={28} /> <span className="label-text">{t('flagships.fundamentals')}</span>
                        </h3>

                        <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                            <div>
                                <h4 style={{ color: "#FFFFFF", marginBottom: '0.5rem' }}>{t('flagships.vessels_vs_energy')}</h4>
                                <p style={{ lineHeight: '1.6', color: 'var(--text-dim)' }}>
                                    <Trans i18nKey="flagships.vessels_vs_energy_desc" components={{ 1: <strong />, 3: <strong /> }} />
                                </p>
                            </div>
                        </div>

                        <div style={{ marginTop: '2rem' }}>
                            <h4 className="label-text" style={{ color: "#FFFFFF", marginBottom: '1rem' }}>{t('flagships.promotion_costs')}</h4>
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ fontFamily: 'var(--font-mono)', width: '100%', borderCollapse: 'collapse', color: 'var(--text-dim)' }}>
                                    <thead>
                                        <tr style={{ background: 'var(--bg-void)', borderBottom: '1px solid var(--border)' }}>
                                            <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-primary)' }}>{t('flagships.rank')}</th>
                                            <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-primary)' }}>{t('flagships.blueprints_required')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            { rank: 1, cost: 100 },
                                            { rank: 2, cost: 200 },
                                            { rank: 3, cost: 400 },
                                            { rank: 4, cost: 600 },
                                            { rank: 5, cost: 800 },
                                            { rank: 6, cost: 1200 }
                                        ].map((row, idx) => (
                                            <tr key={idx} style={{ background: idx % 2 === 0 ? 'var(--bg-surface)' : 'transparent', borderBottom: '1px solid var(--border)' }}>
                                                <td style={{ padding: '0.8rem 1rem', color: 'var(--text-primary)' }}>{t('flagships.rank')} {row.rank}</td>
                                                <td style={{ padding: '0.8rem 1rem', color: 'var(--accent-teal)' }}>{row.cost}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>

                    {/* 2. Ship Analysis Grid */}
                    <h3 className="reveal" style={{ transitionDelay: '0.1s', fontFamily: 'var(--font-hero)', textTransform: 'uppercase', fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Zap size={28} /> <span className="label-text">{t('flagships.ship_analysis')}</span>
                    </h3>

                    <div style={{ display: 'grid', gap: '2rem', marginBottom: '4rem' }}>

                        {/* GRAM */}
                        <div className="card reveal" style={{ transitionDelay: '0.2s', background: 'var(--bg-void)', borderRadius: '2px', overflow: 'hidden', border: '1px solid var(--gold)', borderLeft: '4px solid var(--gold)' }}>
                            <div style={{ padding: '1.5rem', background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)' }}>
                                <h4 className="label-text" style={{ margin: 0, fontSize: '1.5rem', color: "#FFFFFF", display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    {t('flagships.gram.title')}
                                </h4>
                                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{t('flagships.gram.subtitle')}</span>
                            </div>
                            <div style={{ padding: '1.5rem' }}>
                                <p style={{ color: 'var(--text-dim)', marginBottom: '1rem' }}>
                                    <strong style={{ color: 'var(--text-primary)' }}>Strengths:</strong> <Trans i18nKey="flagships.gram.strengths" components={{ 1: <strong /> }} />
                                </p>
                                <h5 className="label-text" style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{t('flagships.gram.strategy_title')}</h5>
                                <ul style={{ color: 'var(--text-dim)', paddingLeft: '1.2rem', marginBottom: '1rem' }}>
                                    <li><Trans i18nKey="flagships.gram.strategy_early" components={{ 0: <strong /> }} /></li>
                                    <li><Trans i18nKey="flagships.gram.strategy_late" components={{ 0: <strong /> }} /></li>
                                    <li><Trans i18nKey="flagships.gram.strategy_use" components={{ 0: <strong /> }} /></li>
                                </ul>
                                <h5 className="label-text" style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{t('flagships.gram.abilities_title')}</h5>
                                <ul style={{ color: 'var(--text-dim)', paddingLeft: '1.2rem' }}>
                                    <li><Trans i18nKey="flagships.gram.ability1" components={{ 0: <strong style={{ color: "#FFFFFF" }} /> }} /></li>
                                    <li><Trans i18nKey="flagships.gram.ability2" components={{ 0: <strong style={{ color: "#FFFFFF" }} /> }} /></li>
                                </ul>
                            </div>
                        </div>

                        {/* OPPORTUNITY */}
                        <div className="card reveal" style={{ transitionDelay: '0.3s', background: 'var(--bg-void)', borderRadius: '2px', overflow: 'hidden', border: '1px solid var(--accent-teal)', borderLeft: '4px solid var(--accent-teal)' }}>
                            <div style={{ padding: '1.5rem', background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)' }}>
                                <h4 className="label-text" style={{ margin: 0, fontSize: '1.5rem', color: 'var(--accent-teal)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    {t('flagships.opportunity.title')}
                                </h4>
                                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{t('flagships.opportunity.subtitle')}</span>
                            </div>
                            <div style={{ padding: '1.5rem' }}>
                                <p style={{ color: 'var(--text-dim)', marginBottom: '1rem' }}>
                                    <strong style={{ color: 'var(--text-primary)' }}>Strengths:</strong> <Trans i18nKey="flagships.opportunity.strengths" components={{ 1: <strong /> }} />
                                </p>
                                <div style={{ background: 'var(--bg-surface)', padding: '1rem', borderRadius: '2px', marginBottom: '1rem', borderLeft: '3px solid var(--accent-teal)' }}>
                                    <Trans i18nKey="flagships.opportunity.strategic_note" components={{ 0: <strong style={{ color: 'var(--accent-teal)' }} /> }} />
                                </div>
                                <h5 className="label-text" style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{t('flagships.opportunity.abilities_title')}</h5>
                                <ul style={{ color: 'var(--text-dim)', paddingLeft: '1.2rem' }}>
                                    <li><Trans i18nKey="flagships.opportunity.ability1_op" components={{ 0: <strong style={{ color: 'var(--accent-teal)' }} /> }} /></li>
                                    <li><Trans i18nKey="flagships.opportunity.ability2_op" components={{ 0: <strong style={{ color: 'var(--accent-teal)' }} /> }} /></li>
                                </ul>
                            </div>
                        </div>

                        {/* DEMERZEL */}
                        <div className="card reveal" style={{ transitionDelay: '0.4s', background: 'var(--bg-void)', borderRadius: '2px', overflow: 'hidden', border: '1px solid var(--accent-blue)', borderLeft: '4px solid var(--accent-blue)' }}>
                            <div style={{ padding: '1.5rem', background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)' }}>
                                <h4 className="label-text" style={{ margin: 0, fontSize: '1.5rem', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    {t('flagships.demerzel.title')}
                                </h4>
                                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{t('flagships.demerzel.subtitle')}</span>
                            </div>
                            <div style={{ padding: '1.5rem' }}>
                                <p style={{ color: 'var(--text-dim)', marginBottom: '1rem' }}>
                                    <strong style={{ color: 'var(--text-primary)' }}>Strengths:</strong> {t('flagships.demerzel.strengths')}
                                </p>
                                <h5 className="label-text" style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{t('flagships.demerzel.strategy_title')}</h5>
                                <ul style={{ color: 'var(--text-dim)', paddingLeft: '1.2rem', marginBottom: '1rem' }}>
                                    <li><Trans i18nKey="flagships.demerzel.strategy_synergy" components={{ 0: <strong />, 2: <strong /> }} /></li>
                                    <li><Trans i18nKey="flagships.demerzel.strategy_unlock" components={{ 0: <strong /> }} /></li>
                                </ul>
                                <h5 className="label-text" style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{t('flagships.demerzel.abilities_title')}</h5>
                                <ul style={{ color: 'var(--text-dim)', paddingLeft: '1.2rem' }}>
                                    <li><Trans i18nKey="flagships.demerzel.ability1_dem" components={{ 0: <strong style={{ color: 'var(--accent-blue)' }} /> }} /></li>
                                    <li><Trans i18nKey="flagships.demerzel.ability2_dem" components={{ 0: <strong style={{ color: 'var(--accent-blue)' }} /> }} /></li>
                                </ul>
                            </div>
                        </div>

                        {/* GUNGIR */}
                        <div className="card reveal" style={{ transitionDelay: '0.5s', background: 'var(--bg-void)', borderRadius: '2px', overflow: 'hidden', border: '1px solid var(--accent-red)', borderLeft: '4px solid var(--accent-red)' }}>
                            <div style={{ padding: '1.5rem', background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)' }}>
                                <h4 className="label-text" style={{ margin: 0, fontSize: '1.5rem', color: 'var(--accent-red)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    {t('flagships.gungir.title', 'Gungir')}
                                </h4>
                                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{t('flagships.gungir.subtitle', 'Pace Controller')}</span>
                            </div>
                            <div style={{ padding: '1.5rem' }}>
                                <p style={{ color: 'var(--text-dim)', marginBottom: '1rem' }}>
                                    <strong style={{ color: 'var(--text-primary)' }}>Strengths:</strong> {t('flagships.gungir.strengths', 'High energy generation, opponent suppression, and scaling combat boosts (Key abilities unlocked at MAX upgrade level).')}
                                </p>
                                <h5 className="label-text" style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{t('flagships.gungir.strategy_title', 'Core Strategy')}</h5>
                                <ul style={{ color: 'var(--text-dim)', paddingLeft: '1.2rem', marginBottom: '1rem' }}>
                                    <li>{t('flagships.gungir.strategy_1', 'Accelerate your champion skill cycle while suppressing the enemy\'s ability speed (Requires max upgrade for key abilities).')}</li>
                                    <li>{t('flagships.gungir.strategy_2', 'Scales to 25% after two full skill rotations, outperforming other options in longer engagements.')}</li>
                                </ul>
                                <h5 className="label-text" style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{t('flagships.gungir.abilities_title', 'Key Abilities')}</h5>
                                <ul style={{ color: 'var(--text-dim)', paddingLeft: '1.2rem' }}>
                                    <li><strong>{t('flagships.gungir.ability1_title', 'Energy Surge')}</strong>: {t('flagships.gungir.ability1_desc', 'Secures ~720 energy per rotation.')}</li>
                                    <li><strong>{t('flagships.gungir.ability2_title', 'Suppression Core')}</strong>: {t('flagships.gungir.ability2_desc', 'Drains a flat 300 energy from the opponent ship, delaying their ability rotations.')}</li>
                                </ul>
                            </div>
                        </div>

                    </div>

                    {/* 5. Expert Tips */}
                    <div className="card reveal" style={{ transitionDelay: '0.5s', padding: 'clamp(1rem, 4vw, 2rem)', borderTop: '2px solid var(--gold)', border: '1px solid var(--border)', marginBottom: 'clamp(2rem, 6vw, 4rem)' }}>
                        <h3 style={{ fontFamily: 'var(--font-hero)', textTransform: 'uppercase', color: "#FFFFFF", marginTop: 0, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Brain size={24} /> <span className="label-text">{t('flagships.expert_tips')}</span>
                        </h3>
                        <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                            <div>
                                <strong className="label-text" style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.5rem' }}>{t('flagships.starting_energy')}</strong>
                                <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem' }}>
                                    <Trans i18nKey="flagships.starting_energy_desc" components={{ 1: <strong /> }} />
                                </p>
                            </div>
                            <div>
                                <strong className="label-text" style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.5rem' }}>{t('flagships.type_choice')}</strong>
                                <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem' }}>
                                    {t('flagships.type_choice_desc')}
                                </p>
                            </div>
                            <div>
                                <strong className="label-text" style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.5rem' }}>{t('flagships.acquisition')}</strong>
                                <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem' }}>
                                    <Trans i18nKey="flagships.acquisition_desc" components={{ 1: <strong />, 3: <strong /> }} />
                                </p>
                            </div>
                        </div>

                        <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
                            <strong className="label-text" style={{ color: 'var(--gold-bright)', display: 'block', fontSize: '1.2rem', marginBottom: '0.5rem' }}>{t('flagships.deployment_title', 'Recommended Ship Deployment Configurations')}</strong>
                            <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                                <div>
                                    <strong className="label-text" style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.3rem' }}>{t('flagships.deployment_whales_title', 'Whale Configuration')}</strong>
                                    <ul style={{ color: 'var(--text-dim)', paddingLeft: '1.2rem', margin: 0 }}>
                                        <li>{t('flagships.deployment_whales_kinetic', 'Kinetic -> Gungir (top offensive setup with Killer Bee)')}</li>
                                        <li>{t('flagships.deployment_whales_beam', 'Beam -> Gram (premium support ship)')}</li>
                                        <li>{t('flagships.deployment_whales_ion', 'Ion -> Opportunity (aggressive burst builder)')}</li>
                                    </ul>
                                </div>
                                <div>
                                    <strong className="label-text" style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.3rem' }}>{t('flagships.deployment_f2p_title', 'Non-Whale Configuration')}</strong>
                                    <ul style={{ color: 'var(--text-dim)', paddingLeft: '1.2rem', margin: 0 }}>
                                        <li>{t('flagships.deployment_f2p_kinetic', 'Kinetic -> Gram (main combat ship, accessible blueprints)')}</li>
                                        <li>{t('flagships.deployment_f2p_beam', 'Beam -> Gungir (secondary storage placement)')}</li>
                                        <li>{t('flagships.deployment_f2p_ion', 'Ion -> Opportunity (balanced trade and burst damage)')}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="fade-in">
                    {/* Header */}
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h3 style={{
                            fontFamily: 'var(--font-hero)',
                            fontSize: '2rem',
                            color: "#FFFFFF",
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            marginBottom: '0.5rem',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem'
                        }}>
                            <Layers size={32} /> {t('flagships.decks.title')}
                        </h3>
                        <p className="label-text" style={{ color: 'var(--text-primary)', fontSize: '1.1rem', margin: 0 }}>
                            {t('flagships.decks.subtitle')}
                        </p>
                    </div>

                    <div>
                        {shipDecks.map(d => <TeamDisplay key={d.id} deck={d} />)}
                    </div>
                </div>
            )}
        </div>
    );
}

