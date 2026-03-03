import React, { useState } from 'react';
import { Trophy, Star, Shield, Zap, Crosshair, Heart, AlertTriangle, Gem, Info, BarChart2, Users } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';

// Helper component for Tier List Layout
const getTierColor = (tier) => {
    switch (tier) {
        case 'S+': return '#ff4d4d'; // Bright Red S+
        case 'S': return '#ff8c00';  // Orange
        case 'A+': return '#ffd700'; // Gold
        case 'A': return '#adff2f';  // Green-Yellow
        case 'B+': return '#00bfff'; // Light Blue
        case 'B': return '#1e90ff';  // Dodger Blue
        default: return 'var(--text-dim)';
    }
};

const ChampionTierEntry = ({ champion }) => {
    const [imageError, setImageError] = useState(false);

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            background: 'var(--bg-void)',
            padding: '1.5rem',
            borderRadius: '4px',
            border: '1px solid var(--border)',
            gap: '1.5rem',
            marginBottom: '1rem'
        }}>
            {/* Left: Image + Tier Badge */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
                <div style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '50%',
                    background: 'var(--bg-surface)',
                    border: `2px solid ${getTierColor(champion.tier)}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                }}>
                    {!imageError ? (
                        <img
                            src={`/images/${champion.name}.png`}
                            alt={champion.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <Users size={32} color="var(--text-secondary)" />
                    )}
                </div>
                {/* Tier Badge */}
                <div style={{
                    position: 'absolute',
                    bottom: '-8px',
                    right: '-8px',
                    background: getTierColor(champion.tier),
                    color: '#fff',
                    fontWeight: '900',
                    fontSize: '0.85rem',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.5)',
                    border: '1px solid rgba(255,255,255,0.2)'
                }}>
                    {champion.tier}
                </div>
            </div>

            {/* Middle: Name */}
            <div style={{ flex: '0 0 160px' }}>
                <h4 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1.3rem' }}>{champion.name}</h4>
            </div>

            {/* Right: Description Space */}
            <div style={{
                flex: 1,
                borderLeft: '1px dashed var(--border)',
                paddingLeft: '1.5rem',
                minHeight: '60px',
                display: 'flex',
                alignItems: 'center'
            }}>
                <span style={{ color: 'var(--text-dim)', fontStyle: 'italic', fontSize: '1.15rem', lineHeight: '1.5' }}>
                    {champion.descKey ? <Trans i18nKey={champion.descKey} /> : null}
                </span>
            </div>
        </div>
    );
};

const tierListData = [
    {
        id: 'kinetic',
        titleKey: 'champions.kinetic',
        icon: Crosshair,
        color: 'var(--gold)',
        champions: [
            { name: 'Zora Dominii', tier: 'S+', descKey: 'champions.desc.zora' },
            { name: 'Killer Bee', tier: 'S+', descKey: 'champions.desc.killer_bee' },
            { name: 'Eva von Trier', tier: 'S', descKey: 'champions.desc.eva' },
            { name: 'Cocoon', tier: 'A', descKey: 'champions.desc.cocoon' },
            { name: 'Riian Dessos', tier: 'A', descKey: 'champions.desc.riian' },
            { name: 'Lani Verita', tier: 'B+', descKey: 'champions.desc.lani' }
        ]
    },
    {
        id: 'beam',
        titleKey: 'champions.beam',
        icon: Zap,
        color: 'var(--accent-teal)',
        champions: [
            { name: 'Evan Rogers', tier: 'S+', descKey: 'champions.desc.evan' },
            { name: 'Aliya', tier: 'A+', descKey: 'champions.desc.aliya' },
            { name: 'Doug Rockwell', tier: 'A', descKey: 'champions.desc.doug' },
            { name: 'Klara', tier: 'A', descKey: 'champions.desc.klara' },
            { name: 'Lucius Pullo', tier: 'B+', descKey: 'champions.desc.lucius' }
        ]
    },
    {
        id: 'ion',
        titleKey: 'champions.ion',
        icon: Star,
        color: 'var(--accent-blue)',
        champions: [
            { name: 'Ajita', tier: 'S+', descKey: 'champions.desc.ajita' },
            { name: 'Lily', tier: 'S', descKey: 'champions.desc.lily' },
            { name: 'Jodie Beart', tier: 'A+', descKey: 'champions.desc.jodi' },
            { name: 'Kama Moai', tier: 'A', descKey: 'champions.desc.kama' },
            { name: 'Phade', tier: 'B', descKey: 'champions.desc.phade' }
        ]
    }
];

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

            {/* 2. Guide by Damage Type (Tier List) */}
            {tierListData.map((category, idx) => (
                <div key={category.id} className="reveal" style={{ transitionDelay: `${0.1 + idx * 0.1}s`, marginBottom: '4rem' }}>
                    <h3 style={{ fontFamily: 'var(--font-hero)', fontSize: '1.8rem', color: category.color, marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <category.icon size={28} /> <span className="label-text">{t(category.titleKey)}</span>
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {category.champions.map((champ, cIdx) => (
                            <ChampionTierEntry key={cIdx} champion={champ} />
                        ))}
                    </div>
                </div>
            ))}

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
                                { name: 'Zora Dominii', type: 'Kinetic', stat: 'INT' },
                                { name: 'Eva von Trier', type: 'Kinetic', stat: 'INT' },
                                { name: 'Killer Bee', type: 'Kinetic', stat: 'ATK' },
                                { name: 'Cocoon', type: 'Kinetic', stat: 'DEF' },
                                { name: 'Riian Dessos', type: 'Kinetic', stat: 'INT / ATK' },
                                { name: 'Lani Verita', type: 'Kinetic', stat: 'ATK' }
                            ].map((row, idx) => (
                                <tr key={idx} style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td className="label-text" style={{ padding: '1rem', color: 'var(--gold)' }}>{row.type}</td>
                                    <td style={{ padding: '1rem', color: 'var(--text-primary)', fontWeight: 'bold' }}>{row.name}</td>
                                    <td style={{ padding: '1rem' }}>{row.stat}</td>
                                </tr>
                            ))}
                            {/* Beam */}
                            {[
                                { name: 'Evan Rogers', type: 'Beam', stat: 'ATK' },
                                { name: 'Aliya', type: 'Beam', stat: 'INT' },
                                { name: 'Doug Rockwell', type: 'Beam', stat: 'DEF' },
                                { name: 'Klara', type: 'Beam', stat: 'INT' },
                                { name: 'Lucius Pullo', type: 'Beam', stat: 'ATK' }
                            ].map((row, idx) => (
                                <tr key={idx} style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td className="label-text" style={{ padding: '1rem', color: 'var(--accent-teal)' }}>{row.type}</td>
                                    <td style={{ padding: '1rem', color: 'var(--text-primary)', fontWeight: 'bold' }}>{row.name}</td>
                                    <td style={{ padding: '1rem' }}>{row.stat}</td>
                                </tr>
                            ))}
                            {/* Ion */}
                            {[
                                { name: 'Ajita', type: 'Ion', stat: 'ATK' },
                                { name: 'Lily', type: 'Ion', stat: 'ATK' },
                                { name: 'Jodie Beart', type: 'Ion', stat: 'ATK' },
                                { name: 'Kama Moai', type: 'Ion', stat: 'INT' },
                                { name: 'Phade', type: 'Ion', stat: 'ATK' }
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
