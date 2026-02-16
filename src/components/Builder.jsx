import React, { useState, useEffect } from 'react';
import { buildingData, bonusesData, flatReductions } from '../data/builderData';
import { Hammer, Clock, Zap, Percent, Info, ArrowRight } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';

export default function Builder() {
    const { t } = useTranslation();
    const [selectedBuilding, setSelectedBuilding] = useState(Object.keys(buildingData)[0]);
    const [selectedLevel, setSelectedLevel] = useState(1); // Target Level

    // Flat Reductions (Levels of cabins)
    const [crewCabin1, setCrewCabin1] = useState(0);
    const [crewCabin2, setCrewCabin2] = useState(0);

    // Speed Bonuses (%)
    const [bonuses, setBonuses] = useState({
        homePort: 0,        // value
        modularStructure: 0, // value
        guildConstruction: 0, // value
        princeTitle: 0,     // value (Replaces 'prince')
        princeAssistance: 0,// value (New check)
        other: 0            // value (manual input 0-100)
    });

    const [results, setResults] = useState({
        baseTime: 0,
        timeAfterFlat: 0,
        finalTime: 0,
        totalSpeedBonus: 0
    });

    // Calculate whenever inputs change
    useEffect(() => {
        const baseTimeSeconds = buildingData[selectedBuilding]?.[selectedLevel] || 0;

        // 1. Apply Flat Reductions
        // Each level of cabin reduces time by 60s
        const flatReductionSeconds = (crewCabin1 * flatReductions.crewCabin1) + (crewCabin2 * flatReductions.crewCabin2);
        let timeAfterFlat = Math.max(0, baseTimeSeconds - flatReductionSeconds);

        // 2. Calculate Total Percentage Bonus
        // Formula: Final Time = TimeAfterFlat / (1 + TotalBonusDecimal)
        const totalBonusDecimal = (
            bonuses.homePort +
            bonuses.modularStructure +
            bonuses.guildConstruction +
            bonuses.princeTitle +
            bonuses.princeAssistance +
            (bonuses.other / 100)
        );

        const finalTimeSeconds = timeAfterFlat / (1 + totalBonusDecimal);

        setResults({
            baseTime: baseTimeSeconds,
            timeAfterFlat,
            finalTime: finalTimeSeconds,
            totalSpeedBonus: totalBonusDecimal * 100
        });

    }, [selectedBuilding, selectedLevel, crewCabin1, crewCabin2, bonuses]);

    const formatTime = (seconds) => {
        if (!seconds) return '0s';
        const d = Math.floor(seconds / 86400);
        const h = Math.floor((seconds % 86400) / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);

        let parts = [];
        if (d > 0) parts.push(`${d}d`);
        if (h > 0) parts.push(`${h}h`);
        if (m > 0) parts.push(`${m}m`);
        if (s > 0) parts.push(`${s}s`);
        return parts.join(' ') || '0s';
    };

    const handleBonusChange = (key, value) => {
        setBonuses(prev => ({ ...prev, [key]: parseFloat(value) }));
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>

            {/* Configuration Panel */}
            <div style={{ background: 'rgba(20, 20, 30, 0.8)', padding: '2rem', borderRadius: '15px', border: '1px solid rgba(0, 243, 255, 0.1)' }}>
                <h2 style={{ color: 'var(--primary-neon)', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Hammer size={24} /> {t('builder_ui.title')}
                </h2>

                {/* Building Selection */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', color: 'var(--text-dim)', marginBottom: '0.5rem' }}>{t('builder_ui.select_building')}</label>
                    <select
                        value={selectedBuilding}
                        onChange={(e) => { setSelectedBuilding(e.target.value); setSelectedLevel(Object.keys(buildingData[e.target.value])[0]); }}
                        style={{ width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '8px' }}
                    >
                        {Object.keys(buildingData).map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', color: 'var(--text-dim)', marginBottom: '0.5rem' }}>{t('builder_ui.target_level')}</label>
                    <select
                        value={selectedLevel}
                        onChange={(e) => setSelectedLevel(Number(e.target.value))}
                        style={{ width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '8px' }}
                    >
                        {buildingData[selectedBuilding] && Object.keys(buildingData[selectedBuilding]).map(lvl => (
                            <option key={lvl} value={lvl}>Level {lvl}</option>
                        ))}
                    </select>
                </div>

                {/* Flat Reductions */}
                <h3 style={{ color: 'white', fontSize: '1rem', marginTop: '2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Clock size={18} /> {t('builder_ui.flat_reductions')}
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', color: 'var(--text-dim)', fontSize: '0.9rem', marginBottom: '0.3rem' }}>{t('builder_ui.crew_cabin_1')}</label>
                        <input
                            type="number" min="0" max="30"
                            value={crewCabin1}
                            onChange={(e) => setCrewCabin1(Number(e.target.value))}
                            style={{ width: '100%', padding: '0.5rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '5px' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', color: 'var(--text-dim)', fontSize: '0.9rem', marginBottom: '0.3rem' }}>{t('builder_ui.crew_cabin_2')}</label>
                        <input
                            type="number" min="0" max="30"
                            value={crewCabin2}
                            onChange={(e) => setCrewCabin2(Number(e.target.value))}
                            style={{ width: '100%', padding: '0.5rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '5px' }}
                        />
                    </div>
                </div>

                {/* Speed Bonuses */}
                <h3 style={{ color: 'white', fontSize: '1rem', marginTop: '2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Percent size={18} /> {t('builder_ui.speed_bonuses')}
                </h3>

                <div style={{ display: 'grid', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', color: 'var(--text-dim)', fontSize: '0.9rem', marginBottom: '0.3rem' }}>{t('builder_ui.home_port')}</label>
                        <select
                            onChange={(e) => handleBonusChange('homePort', e.target.value)}
                            style={{ width: '100%', padding: '0.5rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '5px' }}
                        >
                            {bonusesData.homePort.map(b => <option key={b.level} value={b.value}>{t(b.label)}</option>)}
                        </select>
                    </div>

                    <div>
                        <label style={{ display: 'block', color: 'var(--text-dim)', fontSize: '0.9rem', marginBottom: '0.3rem' }}>{t('builder_ui.modular_structure')}</label>
                        <select
                            onChange={(e) => handleBonusChange('modularStructure', e.target.value)}
                            style={{ width: '100%', padding: '0.5rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '5px' }}
                        >
                            {bonusesData.modularStructure.map(b => <option key={b.id} value={b.value}>{t(b.label)}</option>)}
                        </select>
                    </div>

                    <div>
                        <label style={{ display: 'block', color: 'var(--text-dim)', fontSize: '0.9rem', marginBottom: '0.3rem' }}>{t('builder_ui.guild_construction')}</label>
                        <select
                            onChange={(e) => handleBonusChange('guildConstruction', e.target.value)}
                            style={{ width: '100%', padding: '0.5rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '5px' }}
                        >
                            {bonusesData.guildConstruction.map(b => <option key={b.level} value={b.value}>{t(b.label)}</option>)}
                        </select>
                    </div>

                    <div>
                        <label style={{ display: 'block', color: 'var(--text-dim)', fontSize: '0.9rem', marginBottom: '0.3rem' }}>{t('builder_ui.prince_title')}</label>
                        <select
                            onChange={(e) => handleBonusChange('princeTitle', e.target.value)}
                            style={{ width: '100%', padding: '0.5rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '5px' }}
                        >
                            {bonusesData.princeTitles.map(b => <option key={b.id} value={b.value}>{t(b.label)}</option>)}
                        </select>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', background: 'rgba(0,0,0,0.3)', borderRadius: '5px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <input
                            type="checkbox"
                            id="princeAssistance"
                            onChange={(e) => handleBonusChange('princeAssistance', e.target.checked ? bonusesData.princeAssistance[1].value : 0)} // Assuming index 1 is 'active'
                            style={{ width: '1.2rem', height: '1.2rem', cursor: 'pointer' }}
                        />
                        <label htmlFor="princeAssistance" style={{ color: 'white', fontSize: '0.9rem', cursor: 'pointer' }}>
                            {t('builder_ui.prince_assistance')}
                        </label>
                    </div>

                    <div>
                        <label style={{ display: 'block', color: 'var(--text-dim)', fontSize: '0.9rem', marginBottom: '0.3rem' }}>{t('builder_ui.other_bonus')}</label>
                        <input
                            type="number" min="0"
                            value={bonuses.other}
                            onChange={(e) => handleBonusChange('other', e.target.value)}
                            style={{ width: '100%', padding: '0.5rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '5px' }}
                        />
                    </div>
                </div>

            </div>

            {/* Results Panel */}
            <div style={{ alignSelf: 'start' }}>
                <div style={{ background: 'linear-gradient(135deg, rgba(0, 243, 255, 0.1), rgba(0,0,0,0.5))', padding: '2rem', borderRadius: '15px', border: '1px solid var(--primary-neon)', position: 'sticky', top: '100px' }}>
                    <h2 style={{ color: 'white', marginBottom: '2rem', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                        <Clock size={28} /> {t('builder_ui.time_analysis')}
                    </h2>

                    <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
                        <span style={{ color: 'var(--text-dim)' }}>{t('builder_ui.base_time')}</span>
                        <span style={{ color: 'white', fontWeight: 'bold' }}>{formatTime(results.baseTime)}</span>
                    </div>

                    <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
                        <span style={{ color: 'var(--text-dim)' }}>{t('builder_ui.after_flat')}</span>
                        <span style={{ color: '#ffd700', fontWeight: 'bold' }}>{formatTime(results.timeAfterFlat)}</span>
                    </div>

                    <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
                        <span style={{ color: 'var(--text-dim)' }}>{t('builder_ui.total_speed_bonus')}</span>
                        <span style={{ color: '#00ff00', fontWeight: 'bold' }}>+{results.totalSpeedBonus.toFixed(1)}%</span>
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                        <div style={{ color: 'var(--primary-neon)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.5rem' }}>{t('builder_ui.final_build_time')}</div>
                        <div style={{ color: 'white', fontSize: '2.5rem', fontWeight: 'bold', textShadow: '0 0 20px var(--primary-neon)' }}>
                            {formatTime(results.finalTime)}
                        </div>
                        {results.finalTime > 0 && results.baseTime > 0 && (
                            <div style={{ color: '#00ff00', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                                {t('builder_ui.saved')} {formatTime(results.baseTime - results.finalTime)} (-{((1 - (results.finalTime / results.baseTime)) * 100).toFixed(1)}%)
                            </div>
                        )}
                    </div>

                </div>

                <div style={{ marginTop: '2rem', background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '10px' }}>
                    <h4 style={{ color: 'white', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Info size={18} /> {t('builder_ui.how_it_works')}
                    </h4>
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', lineHeight: '1.5' }}>
                        <Trans i18nKey="builder_ui.how_it_works_desc" components={{ 1: <code style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 5px', borderRadius: '3px', color: '#ffd700' }} />, 3: <b /> }} />
                    </p>
                </div>

            </div>

        </div>
    );
}
