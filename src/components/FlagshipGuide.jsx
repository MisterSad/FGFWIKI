import React from 'react';
import { shipDecks } from '../data/gameData';
import TeamDisplay from './TeamDisplay';
import { Rocket, Shield, Crosshair, Zap, Star, Brain } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';

export default function FlagshipGuide() {
    const { t } = useTranslation();

    return (
        <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', color: 'var(--text-main)' }}>

            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h2 style={{
                    fontSize: '2.5rem',
                    color: 'var(--primary-neon)',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    textShadow: '0 0 20px rgba(0, 243, 255, 0.3)',
                    marginBottom: '0.5rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem'
                }}>
                    <Rocket size={40} /> {t('flagships.title')}
                </h2>
                <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem' }}>
                    {t('flagships.subtitle')}
                </p>
            </div>

            {/* 1. Fundamentals */}
            <section className="glass-panel" style={{ padding: '2rem', marginBottom: '3rem', borderLeft: '4px solid var(--primary-neon)' }}>
                <h3 style={{ fontSize: '1.8rem', color: 'white', marginBottom: '1.5rem', marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Shield size={28} /> {t('flagships.fundamentals')}
                </h3>

                <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                    <div>
                        <h4 style={{ color: '#ffd700', marginBottom: '0.5rem' }}>{t('flagships.vessels_vs_energy')}</h4>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-dim)' }}>
                            <Trans i18nKey="flagships.vessels_vs_energy_desc" components={{ 1: <strong />, 3: <strong /> }} />
                        </p>
                    </div>
                </div>

                <div style={{ marginTop: '2rem' }}>
                    <h4 style={{ color: '#ffd700', marginBottom: '1rem' }}>{t('flagships.promotion_costs')}</h4>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-dim)' }}>
                            <thead>
                                <tr style={{ background: 'rgba(255,255,255,0.05)', borderBottom: '2px solid rgba(255,255,255,0.1)' }}>
                                    <th style={{ padding: '1rem', textAlign: 'left', color: 'white' }}>{t('flagships.rank')}</th>
                                    <th style={{ padding: '1rem', textAlign: 'left', color: 'white' }}>{t('flagships.blueprints_required')}</th>
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
                                    <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                        <td style={{ padding: '0.8rem 1rem' }}>{t('flagships.rank')} {row.rank}</td>
                                        <td style={{ padding: '0.8rem 1rem', color: '#00F3FF' }}>{row.cost}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* 2. Ship Analysis Grid */}
            <h3 style={{ fontSize: '1.8rem', color: 'white', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Zap size={28} /> {t('flagships.ship_analysis')}
            </h3>

            <div style={{ display: 'grid', gap: '2rem', marginBottom: '4rem' }}>

                {/* GRAM */}
                <div style={{ background: 'rgba(20, 20, 30, 0.6)', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255, 215, 0, 0.3)' }}>
                    <div style={{ padding: '1.5rem', background: 'rgba(255, 215, 0, 0.1)', borderBottom: '1px solid rgba(255, 215, 0, 0.2)' }}>
                        <h4 style={{ margin: 0, fontSize: '1.5rem', color: '#FFD700', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            {t('flagships.gram.title')}
                        </h4>
                        <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>{t('flagships.gram.subtitle')}</span>
                    </div>
                    <div style={{ padding: '1.5rem' }}>
                        <p style={{ color: 'var(--text-dim)', marginBottom: '1rem' }}>
                            <strong>Strengths:</strong> <Trans i18nKey="flagships.gram.strengths" components={{ 1: <strong /> }} />
                        </p>
                        <h5 style={{ color: 'white', marginBottom: '0.5rem' }}>{t('flagships.gram.strategy_title')}</h5>
                        <ul style={{ color: 'var(--text-dim)', paddingLeft: '1.2rem', marginBottom: '1rem' }}>
                            <li><Trans i18nKey="flagships.gram.strategy_early" components={{ 0: <strong /> }} /></li>
                            <li><Trans i18nKey="flagships.gram.strategy_late" components={{ 0: <strong /> }} /></li>
                            <li><Trans i18nKey="flagships.gram.strategy_use" components={{ 0: <strong /> }} /></li>
                        </ul>
                        <h5 style={{ color: 'white', marginBottom: '0.5rem' }}>{t('flagships.gram.abilities_title')}</h5>
                        <ul style={{ color: 'var(--text-dim)', paddingLeft: '1.2rem' }}>
                            <li><Trans i18nKey="flagships.gram.ability1" components={{ 0: <strong style={{ color: '#FFD700' }} /> }} /></li>
                            <li><Trans i18nKey="flagships.gram.ability2" components={{ 0: <strong style={{ color: '#FFD700' }} /> }} /></li>
                        </ul>
                    </div>
                </div>

                {/* OPPORTUNITY */}
                <div style={{ background: 'rgba(20, 20, 30, 0.6)', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(0, 243, 255, 0.3)' }}>
                    <div style={{ padding: '1.5rem', background: 'rgba(0, 243, 255, 0.1)', borderBottom: '1px solid rgba(0, 243, 255, 0.2)' }}>
                        <h4 style={{ margin: 0, fontSize: '1.5rem', color: '#00F3FF', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            {t('flagships.opportunity.title')}
                        </h4>
                        <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>{t('flagships.opportunity.subtitle')}</span>
                    </div>
                    <div style={{ padding: '1.5rem' }}>
                        <p style={{ color: 'var(--text-dim)', marginBottom: '1rem' }}>
                            <strong>Strengths:</strong> <Trans i18nKey="flagships.opportunity.strengths" components={{ 1: <strong /> }} />
                        </p>
                        <div style={{ background: 'rgba(0, 243, 255, 0.05)', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', borderLeft: '3px solid #00F3FF' }}>
                            <Trans i18nKey="flagships.opportunity.strategic_note" components={{ 0: <strong style={{ color: '#00F3FF' }} /> }} />
                        </div>
                        <h5 style={{ color: 'white', marginBottom: '0.5rem' }}>{t('flagships.opportunity.abilities_title')}</h5>
                        <ul style={{ color: 'var(--text-dim)', paddingLeft: '1.2rem' }}>
                            <li><Trans i18nKey="flagships.opportunity.ability1_op" components={{ 0: <strong style={{ color: '#00F3FF' }} /> }} /></li>
                            <li><Trans i18nKey="flagships.opportunity.ability2_op" components={{ 0: <strong style={{ color: '#00F3FF' }} /> }} /></li>
                        </ul>
                    </div>
                </div>

                {/* DEMERZAL */}
                <div style={{ background: 'rgba(20, 20, 30, 0.6)', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(191, 85, 236, 0.3)' }}>
                    <div style={{ padding: '1.5rem', background: 'rgba(191, 85, 236, 0.1)', borderBottom: '1px solid rgba(191, 85, 236, 0.2)' }}>
                        <h4 style={{ margin: 0, fontSize: '1.5rem', color: '#BF55EC', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            {t('flagships.demerzal.title')}
                        </h4>
                        <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>{t('flagships.demerzal.subtitle')}</span>
                    </div>
                    <div style={{ padding: '1.5rem' }}>
                        <p style={{ color: 'var(--text-dim)', marginBottom: '1rem' }}>
                            <strong>Strengths:</strong> {t('flagships.demerzal.strengths')}
                        </p>
                        <h5 style={{ color: 'white', marginBottom: '0.5rem' }}>{t('flagships.demerzal.strategy_title')}</h5>
                        <ul style={{ color: 'var(--text-dim)', paddingLeft: '1.2rem', marginBottom: '1rem' }}>
                            <li><Trans i18nKey="flagships.demerzal.strategy_synergy" components={{ 0: <strong />, 2: <strong /> }} /></li>
                            <li><Trans i18nKey="flagships.demerzal.strategy_unlock" components={{ 0: <strong /> }} /></li>
                        </ul>
                        <h5 style={{ color: 'white', marginBottom: '0.5rem' }}>{t('flagships.demerzal.abilities_title')}</h5>
                        <ul style={{ color: 'var(--text-dim)', paddingLeft: '1.2rem' }}>
                            <li><Trans i18nKey="flagships.demerzal.ability1_dem" components={{ 0: <strong style={{ color: '#BF55EC' }} /> }} /></li>
                            <li><Trans i18nKey="flagships.demerzal.ability2_dem" components={{ 0: <strong style={{ color: '#BF55EC' }} /> }} /></li>
                        </ul>
                    </div>
                </div>

            </div>

            {/* 5. Expert Tips */}
            <div style={{ background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.05), rgba(0,0,0,0))', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255, 215, 0, 0.2)', marginBottom: '4rem' }}>
                <h3 style={{ color: '#FFD700', marginTop: 0, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Brain size={24} /> {t('flagships.expert_tips')}
                </h3>
                <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                    <div>
                        <strong style={{ color: 'white', display: 'block', marginBottom: '0.5rem' }}>{t('flagships.starting_energy')}</strong>
                        <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem' }}>
                            <Trans i18nKey="flagships.starting_energy_desc" components={{ 1: <strong /> }} />
                        </p>
                    </div>
                    <div>
                        <strong style={{ color: 'white', display: 'block', marginBottom: '0.5rem' }}>{t('flagships.type_choice')}</strong>
                        <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem' }}>
                            {t('flagships.type_choice_desc')}
                        </p>
                    </div>
                    <div>
                        <strong style={{ color: 'white', display: 'block', marginBottom: '0.5rem' }}>{t('flagships.acquisition')}</strong>
                        <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem' }}>
                            <Trans i18nKey="flagships.acquisition_desc" components={{ 1: <strong />, 3: <strong /> }} />
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

