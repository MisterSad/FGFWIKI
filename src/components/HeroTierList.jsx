import React from 'react';
import { Trophy, Star, Shield, Zap, Crosshair, Heart, AlertTriangle, Gem, Info, BarChart2 } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';

// Helper component for cleaner code and consistent layout
const ChampionEntry = ({ name, role, description, isPremium = false, color = 'var(--text-dim)' }) => (
    <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
        <div style={{
            padding: '1rem',
            marginBottom: '1rem',
            background: 'var(--bg-void)',
            borderRadius: '2px',
            border: `2px solid ${isPremium ? 'var(--gold)' : 'var(--border)'}`,
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            boxShadow: 'none'
        }}>
            <Trophy size={24} color={isPremium ? 'var(--gold)' : 'var(--text-dim)'} />
            <div>
                <strong className="label-text" style={{ color: isPremium ? 'var(--gold)' : 'var(--text-primary)', fontSize: '1.1rem' }}>{name} ({role})</strong>
                <p style={{ margin: '0.3rem 0 0 0', color: 'var(--text-dim)', fontSize: '0.9rem', lineHeight: '1.4' }}>
                    {description}
                </p>
            </div>
        </div>
    </div>
);

export default function ChampionsGuide() {
    const { t } = useTranslation();

    return (
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', color: 'var(--text-main)' }}>

            {/* 1. Introduction & Fundamentals */}
            <div className="card reveal" style={{ padding: '1.5rem', marginBottom: '2rem', borderLeft: '4px solid var(--gold)' }}>
                <h2 style={{ fontFamily: 'var(--font-hero)', textTransform: 'uppercase', fontSize: '1.5rem', color: 'var(--gold-bright)', marginBottom: '1rem', marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Shield size={24} /> {t('champions.fundamentals')}
                </h2>
                <div style={{
                    background: 'var(--bg-void)',
                    border: '1px solid var(--border)',
                    borderRadius: '2px',
                    padding: '2rem',
                    textAlign: 'center',
                    boxShadow: 'none'
                }}>
                    <h4 style={{ color: 'var(--gold)', marginBottom: '1rem', fontSize: '1.4rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
                        {t('champions.synergy_title')}
                    </h4>
                    <p style={{ fontSize: '1.2rem', lineHeight: '1.6', color: 'var(--text-primary)', margin: 0, maxWidth: '800px', marginInline: 'auto' }}>
                        <Trans i18nKey="champions.synergy_desc" components={{ 1: <strong style={{ color: 'var(--gold-bright)', borderBottom: '1px solid var(--gold)' }} /> }} />
                    </p>
                </div>
            </div>

            {/* 2. Guide by Damage Type */}

            {/* KINETIC */}
            <div className="reveal" style={{ transitionDelay: '0.1s', marginBottom: '4rem' }}>
                <h3 style={{ fontFamily: 'var(--font-hero)', fontSize: '1.8rem', color: 'var(--gold)', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Crosshair size={28} /> <span className="label-text">{t('champions.kinetic')}</span>
                </h3>

                <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                    {/* Budget */}
                    <div style={{ background: 'var(--bg-void)', border: '1px solid var(--border)', padding: '1.5rem', borderRadius: '2px' }}>
                        <h4 className="label-text" style={{ color: 'var(--text-dim)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>{t('champions.budget')}</h4>
                        <ChampionEntry
                            name="Riian" role="Attacker"
                            description={t('champions.desc.riian')}
                        />
                        <ChampionEntry
                            name="Lani" role="Attacker"
                            description={t('champions.desc.lani')}
                        />
                    </div>

                    {/* Premium */}
                    <div style={{ background: 'var(--bg-void)', padding: '1.5rem', borderRadius: '2px', border: '1px solid var(--gold)', borderLeft: '4px solid var(--gold)' }}>
                        <h4 className="label-text" style={{ color: 'var(--gold)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>{t('champions.premium')}</h4>
                        <ChampionEntry
                            name="Cocoon" role="Defense" isPremium={true}
                            description={t('champions.desc.cocoon')}
                        />
                        <ChampionEntry
                            name="Eva" role="Support" isPremium={true}
                            description={t('champions.desc.eva')}
                        />
                        <ChampionEntry
                            name="Zora" role="Attacker" isPremium={true}
                            description={t('champions.desc.zora')}
                        />
                    </div>
                </div>
            </div>

            {/* BEAM */}
            <div className="reveal" style={{ transitionDelay: '0.2s', marginBottom: '4rem' }}>
                <h3 style={{ fontFamily: 'var(--font-hero)', fontSize: '1.8rem', color: 'var(--accent-teal)', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Zap size={28} /> <span className="label-text">{t('champions.beam')}</span>
                </h3>

                <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                    {/* Budget */}
                    <div style={{ background: 'var(--bg-void)', border: '1px solid var(--border)', padding: '1.5rem', borderRadius: '2px' }}>
                        <h4 className="label-text" style={{ color: 'var(--text-dim)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>{t('champions.budget')}</h4>
                        <ChampionEntry
                            name="Klara" role="Healer"
                            description={t('champions.desc.klara')}
                        />
                        <ChampionEntry
                            name="Lucius" role="Attacker"
                            description={t('champions.desc.lucius')}
                        />
                    </div>

                    {/* Premium */}
                    <div style={{ background: 'var(--bg-void)', padding: '1.5rem', borderRadius: '2px', border: '1px solid var(--accent-teal)', borderLeft: '4px solid var(--accent-teal)' }}>
                        <h4 className="label-text" style={{ color: 'var(--accent-teal)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>{t('champions.premium')}</h4>
                        <ChampionEntry
                            name="Doug" role="Healer" isPremium={true}
                            description={t('champions.desc.doug')}
                        />
                        <ChampionEntry
                            name="Aliya" role="Attacker" isPremium={true}
                            description={t('champions.desc.aliya')}
                        />
                        <ChampionEntry
                            name="Evan Rodgers" role="Elite" isPremium={true}
                            description={t('champions.desc.evan')}
                        />
                    </div>
                </div>
            </div>

            {/* ION */}
            <div className="reveal" style={{ transitionDelay: '0.3s', marginBottom: '4rem' }}>
                <h3 style={{ fontFamily: 'var(--font-hero)', fontSize: '1.8rem', color: 'var(--accent-blue)', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Star size={28} /> <span className="label-text">{t('champions.ion')}</span>
                </h3>

                <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                    {/* Budget */}
                    <div style={{ background: 'var(--bg-void)', border: '1px solid var(--border)', padding: '1.5rem', borderRadius: '2px' }}>
                        <h4 className="label-text" style={{ color: 'var(--text-dim)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>{t('champions.budget')}</h4>
                        <ChampionEntry
                            name="Kama" role="Attacker"
                            description={t('champions.desc.kama')}
                        />
                        <ChampionEntry
                            name="Phade" role="Healer"
                            description={t('champions.desc.phade')}
                        />
                    </div>

                    {/* Premium */}
                    <div style={{ background: 'var(--bg-void)', padding: '1.5rem', borderRadius: '2px', border: '1px solid var(--accent-blue)', borderLeft: '4px solid var(--accent-blue)' }}>
                        <h4 className="label-text" style={{ color: 'var(--accent-blue)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>{t('champions.premium')}</h4>
                        <ChampionEntry
                            name="Jodi" role="Attacker" isPremium={true}
                            description={t('champions.desc.jodi')}
                        />
                        <ChampionEntry
                            name="Ajita" role="Healer" isPremium={true}
                            description={t('champions.desc.ajita')}
                        />
                        <ChampionEntry
                            name="Lily" role="Elite" isPremium={true}
                            description={t('champions.desc.lily')}
                        />
                    </div>
                </div>
            </div>

            {/* 3. Stat Analysis */}
            <div className="reveal" style={{ transitionDelay: '0.4s', marginBottom: '4rem' }}>
                <h3 style={{ fontFamily: 'var(--font-hero)', fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                    <BarChart2 size={24} /> <span className="label-text">{t('champions.stats_title')}</span>
                </h3>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ fontFamily: 'var(--font-mono)', width: '100%', borderCollapse: 'collapse', color: 'var(--text-dim)' }}>
                        <thead>
                            <tr style={{ background: 'var(--bg-void)', borderBottom: '1px solid var(--border)' }}>
                                <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-primary)' }}>Type</th>
                                <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-primary)' }}>Champion</th>
                                <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--gold)' }}>Key Stat</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Kinetic */}
                            {[
                                { name: 'Riian', type: 'Kinetic', stat: 'INT / ATK' },
                                { name: 'Lani', type: 'Kinetic', stat: 'ATK' },
                                { name: 'Cocoon', type: 'Kinetic', stat: 'DEF' },
                                { name: 'Eva', type: 'Kinetic', stat: 'INT' },
                                { name: 'Zora', type: 'Kinetic', stat: 'INT' }
                            ].map((row, idx) => (
                                <tr key={idx} style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td className="label-text" style={{ padding: '1rem', color: 'var(--gold)' }}>{row.type}</td>
                                    <td style={{ padding: '1rem', color: 'var(--text-primary)', fontWeight: 'bold' }}>{row.name}</td>
                                    <td style={{ padding: '1rem' }}>{row.stat}</td>
                                </tr>
                            ))}
                            {/* Beam */}
                            {[
                                { name: 'Klara', type: 'Beam', stat: 'INT' },
                                { name: 'Lucius', type: 'Beam', stat: 'ATK' },
                                { name: 'Doug', type: 'Beam', stat: 'DEF' },
                                { name: 'Aliya', type: 'Beam', stat: 'INT' },
                                { name: 'Evan', type: 'Beam', stat: 'ATK' }
                            ].map((row, idx) => (
                                <tr key={idx} style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td className="label-text" style={{ padding: '1rem', color: 'var(--accent-teal)' }}>{row.type}</td>
                                    <td style={{ padding: '1rem', color: 'var(--text-primary)', fontWeight: 'bold' }}>{row.name}</td>
                                    <td style={{ padding: '1rem' }}>{row.stat}</td>
                                </tr>
                            ))}
                            {/* Ion */}
                            {[
                                { name: 'Kama', type: 'Ion', stat: 'INT' },
                                { name: 'Phade', type: 'Ion', stat: 'ATK' },
                                { name: 'Jodi', type: 'Ion', stat: 'ATK' },
                                { name: 'Ajita', type: 'Ion', stat: 'ATK' },
                                { name: 'Lily', type: 'Ion', stat: 'ATK' }
                            ].map((row, idx) => (
                                <tr key={idx} style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td className="label-text" style={{ padding: '1rem', color: 'var(--accent-blue)' }}>{row.type}</td>
                                    <td style={{ padding: '1rem', color: 'var(--text-primary)', fontWeight: 'bold' }}>{row.name}</td>
                                    <td style={{ padding: '1rem' }}>{row.stat}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 4. Pro Tips */}
            <div className="card reveal" style={{ transitionDelay: '0.5s', padding: '2rem', border: '1px solid var(--border)', borderTop: '2px solid var(--gold)' }}>
                <h3 style={{ fontFamily: 'var(--font-hero)', color: 'var(--gold)', marginTop: 0, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', textTransform: 'uppercase' }}>
                    <Zap size={24} /> {t('champions.pro_tips_title')}
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '1rem' }}>
                    <li style={{ display: 'flex', gap: '1rem' }}>
                        <AlertTriangle size={24} color="var(--accent-red)" />
                        <div>
                            <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.3rem' }}>{t('champions.golden_rule')}</strong>
                            <span style={{ color: 'var(--text-dim)', lineHeight: '1.5' }}>
                                {t('champions.golden_rule_desc')}
                            </span>
                        </div>
                    </li>
                    <li style={{ display: 'flex', gap: '1rem' }}>
                        <Gem size={24} color="var(--accent-teal)" />
                        <div>
                            <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.3rem' }}>{t('champions.shard_management')}</strong>
                            <span style={{ color: 'var(--text-dim)', lineHeight: '1.5' }}>
                                <Trans i18nKey="champions.shard_management_desc" components={{ 1: <strong /> }} />
                            </span>
                        </div>
                    </li>
                    <li style={{ display: 'flex', gap: '1rem' }}>
                        <Info size={24} color="var(--accent-blue)" />
                        <div>
                            <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.3rem' }}>{t('champions.update_note')}</strong>
                            <span style={{ color: 'var(--text-dim)', lineHeight: '1.5' }}>
                                {t('champions.update_note_desc')}
                            </span>
                        </div>
                    </li>
                </ul>
            </div>

        </div>
    );
}
