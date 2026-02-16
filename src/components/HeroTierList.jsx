import React from 'react';
import { Trophy, Star, Shield, Zap, Crosshair, Heart, AlertTriangle, Gem, Info, BarChart2 } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';

// Helper component for cleaner code and consistent layout
const ChampionEntry = ({ name, role, description, isPremium = false, color = 'var(--text-dim)' }) => (
    <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
        {/* SVG Placeholder */}
        <div style={{
            flex: '0 0 60px', width: '60px', height: '60px',
            background: 'rgba(0,0,0,0.5)', borderRadius: '50%',
            border: `2px solid ${isPremium ? '#ffd700' : 'rgba(255,255,255,0.1)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.6rem', color: 'var(--text-dim)',
            textAlign: 'center',
            boxShadow: isPremium ? '0 0 10px rgba(255, 215, 0, 0.1)' : 'none'
        }}>
            <Trophy size={24} color={isPremium ? '#ffd700' : 'var(--text-dim)'} />
        </div>

        <div>
            <strong style={{ color: isPremium ? '#ffd700' : 'white', fontSize: '1.1rem' }}>{name} ({role})</strong>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)', marginTop: '0.3rem', lineHeight: '1.4' }}>
                {description}
            </p>
        </div>
    </div>
);

export default function ChampionsGuide() {
    const { t } = useTranslation();

    return (
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', color: 'var(--text-main)' }}>

            {/* 1. Introduction & Fundamentals */}
            <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem', borderLeft: '4px solid var(--primary-neon)' }}>
                <h2 style={{ fontSize: '1.5rem', color: 'var(--primary-neon)', marginBottom: '1rem', marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Shield size={24} /> {t('champions.fundamentals')}
                </h2>
                <div style={{
                    background: 'rgba(0, 243, 255, 0.05)',
                    border: '1px solid var(--primary-neon)',
                    borderRadius: '12px',
                    padding: '2rem',
                    textAlign: 'center',
                    boxShadow: '0 0 15px rgba(0, 243, 255, 0.1)'
                }}>
                    <h4 style={{ color: 'var(--primary-neon)', marginBottom: '1rem', fontSize: '1.4rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
                        {t('champions.synergy_title')}
                    </h4>
                    <p style={{ fontSize: '1.2rem', lineHeight: '1.6', color: 'white', margin: 0, maxWidth: '800px', marginInline: 'auto' }}>
                        <Trans i18nKey="champions.synergy_desc" components={{ 1: <strong style={{ color: '#FFD700', borderBottom: '2px solid #FFD700' }} /> }} />
                    </p>
                </div>
            </div>

            {/* 2. Guide by Damage Type */}

            {/* KINETIC */}
            <div style={{ marginBottom: '4rem' }}>
                <h3 style={{ fontSize: '1.8rem', color: '#FFD700', marginBottom: '1.5rem', borderBottom: '1px solid #FFD700', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Crosshair size={28} /> {t('champions.kinetic')}
                </h3>

                <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: '1fr 1fr' }}>
                    {/* Budget */}
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px' }}>
                        <h4 style={{ color: '#a0a0a0', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>{t('champions.budget')}</h4>
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
                    <div style={{ background: 'rgba(255, 215, 0, 0.05)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255, 215, 0, 0.2)' }}>
                        <h4 style={{ color: '#FFD700', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>{t('champions.premium')}</h4>
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
            <div style={{ marginBottom: '4rem' }}>
                <h3 style={{ fontSize: '1.8rem', color: '#00F3FF', marginBottom: '1.5rem', borderBottom: '1px solid #00F3FF', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Zap size={28} /> {t('champions.beam')}
                </h3>

                <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: '1fr 1fr' }}>
                    {/* Budget */}
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px' }}>
                        <h4 style={{ color: '#a0a0a0', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>{t('champions.budget')}</h4>
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
                    <div style={{ background: 'rgba(0, 243, 255, 0.05)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(0, 243, 255, 0.2)' }}>
                        <h4 style={{ color: '#00F3FF', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>{t('champions.premium')}</h4>
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
            <div style={{ marginBottom: '4rem' }}>
                <h3 style={{ fontSize: '1.8rem', color: '#BF55EC', marginBottom: '1.5rem', borderBottom: '1px solid #BF55EC', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Star size={28} /> {t('champions.ion')}
                </h3>

                <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: '1fr 1fr' }}>
                    {/* Budget */}
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px' }}>
                        <h4 style={{ color: '#a0a0a0', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>{t('champions.budget')}</h4>
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
                    <div style={{ background: 'rgba(191, 85, 236, 0.05)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(191, 85, 236, 0.2)' }}>
                        <h4 style={{ color: '#BF55EC', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>{t('champions.premium')}</h4>
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
            <div style={{ marginBottom: '4rem' }}>
                <h3 style={{ fontSize: '1.8rem', color: 'white', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <BarChart2 size={24} /> {t('champions.stats_title')}
                </h3>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-dim)' }}>
                        <thead>
                            <tr style={{ background: 'rgba(255,255,255,0.05)', borderBottom: '2px solid rgba(255,255,255,0.1)' }}>
                                <th style={{ padding: '1rem', textAlign: 'left', color: 'white' }}>Type</th>
                                <th style={{ padding: '1rem', textAlign: 'left', color: 'white' }}>Champion</th>
                                <th style={{ padding: '1rem', textAlign: 'left', color: '#ffd700' }}>Key Stat</th>
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
                                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <td style={{ padding: '1rem', color: '#FFD700' }}>{row.type}</td>
                                    <td style={{ padding: '1rem', color: 'white', fontWeight: 'bold' }}>{row.name}</td>
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
                                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <td style={{ padding: '1rem', color: '#00F3FF' }}>{row.type}</td>
                                    <td style={{ padding: '1rem', color: 'white', fontWeight: 'bold' }}>{row.name}</td>
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
                                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <td style={{ padding: '1rem', color: '#BF55EC' }}>{row.type}</td>
                                    <td style={{ padding: '1rem', color: 'white', fontWeight: 'bold' }}>{row.name}</td>
                                    <td style={{ padding: '1rem' }}>{row.stat}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 4. Pro Tips */}
            <div style={{ background: 'linear-gradient(135deg, rgba(255,215,0,0.1), rgba(0,0,0,0)', padding: '2rem', borderRadius: '15px', border: '1px solid rgba(255,215,0,0.3)' }}>
                <h3 style={{ color: '#ffd700', marginTop: 0, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Zap size={24} /> {t('champions.pro_tips_title')}
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '1rem' }}>
                    <li style={{ display: 'flex', gap: '1rem' }}>
                        <AlertTriangle size={24} color="#ff4444" />
                        <div>
                            <strong style={{ color: 'white', display: 'block', marginBottom: '0.3rem' }}>{t('champions.golden_rule')}</strong>
                            <span style={{ color: 'var(--text-dim)', lineHeight: '1.5' }}>
                                {t('champions.golden_rule_desc')}
                            </span>
                        </div>
                    </li>
                    <li style={{ display: 'flex', gap: '1rem' }}>
                        <Gem size={24} color="#00F3FF" />
                        <div>
                            <strong style={{ color: 'white', display: 'block', marginBottom: '0.3rem' }}>{t('champions.shard_management')}</strong>
                            <span style={{ color: 'var(--text-dim)', lineHeight: '1.5' }}>
                                <Trans i18nKey="champions.shard_management_desc" components={{ 1: <strong /> }} />
                            </span>
                        </div>
                    </li>
                    <li style={{ display: 'flex', gap: '1rem' }}>
                        <Info size={24} color="#BF55EC" />
                        <div>
                            <strong style={{ color: 'white', display: 'block', marginBottom: '0.3rem' }}>{t('champions.update_note')}</strong>
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
