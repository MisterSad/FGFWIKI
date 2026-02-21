import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckSquare, Square, Swords, Shield, Coins, Pickaxe, Ship, ClipboardList } from 'lucide-react';

export default function DailyChecklist() {
    const { t } = useTranslation();
    const [checkedItems, setCheckedItems] = useState(() => {
        const saved = localStorage.getItem('dailyChecklist');
        return saved ? JSON.parse(saved) : {};
    });

    useEffect(() => {
        localStorage.setItem('dailyChecklist', JSON.stringify(checkedItems));
    }, [checkedItems]);

    const toggleCheck = (id) => {
        setCheckedItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const isChecked = (id) => !!checkedItems[id];

    const CheckboxRow = ({ id, label }) => (
        <div
            onClick={() => toggleCheck(id)}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                cursor: 'pointer',
                borderRadius: '8px',
                background: isChecked(id) ? 'rgba(0, 255, 170, 0.1)' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${isChecked(id) ? 'var(--primary-neon)' : 'rgba(255,255,255,0.1)'}`,
                transition: 'all 0.2s ease',
                opacity: isChecked(id) ? 0.7 : 1
            }}
        >
            <div style={{ color: isChecked(id) ? 'var(--primary-neon)' : 'var(--text-secondary)' }}>
                {isChecked(id) ? <CheckSquare size={20} /> : <Square size={20} />}
            </div>
            <span style={{
                color: 'var(--text-primary)',
                textDecoration: isChecked(id) ? 'line-through' : 'none',
                flex: 1
            }}>
                {label}
            </span>
        </div>
    );

    return (
        <div style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--primary-neon)',
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '3rem',
            boxShadow: '0 0 20px rgba(0, 255, 170, 0.1)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background glow lines */}
            <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, height: '4px',
                background: 'linear-gradient(90deg, transparent, var(--primary-neon), transparent)',
                opacity: 0.5
            }} />

            <h2 style={{
                fontSize: '1.5rem',
                color: 'var(--text-primary)',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
            }}>
                <CheckSquare style={{ color: 'var(--primary-neon)' }} size={28} />
                {t('daily_checklist.title')}
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>

                {/* Tribute Vessel */}
                <div>
                    <h3 style={{
                        fontSize: '1.1rem', color: '#ffb84d', marginBottom: '1rem',
                        display: 'flex', alignItems: 'center', gap: '0.5rem'
                    }}>
                        <Coins size={20} />
                        {t('daily_checklist.tribute_vessel')}
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <CheckboxRow id="tribute_1" label={t('daily_checklist.tribute_1')} />
                        <CheckboxRow id="tribute_2" label={t('daily_checklist.tribute_2')} />
                    </div>
                </div>

                {/* Ascendancy Shrine */}
                <div>
                    <h3 style={{
                        fontSize: '1.1rem', color: '#ff4d4d', marginBottom: '1rem',
                        display: 'flex', alignItems: 'center', gap: '0.5rem'
                    }}>
                        <Swords size={20} />
                        {t('daily_checklist.ascendancy_shrine')}
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <CheckboxRow id="shrine_1" label={t('daily_checklist.shrine_1')} />
                        <CheckboxRow id="shrine_2" label={t('daily_checklist.shrine_2')} />
                    </div>
                </div>

                {/* Valor Arena */}
                <div>
                    <h3 style={{
                        fontSize: '1.1rem', color: '#4da6ff', marginBottom: '1rem',
                        display: 'flex', alignItems: 'center', gap: '0.5rem'
                    }}>
                        <Shield size={20} />
                        {t('daily_checklist.valor_arena')}
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <CheckboxRow id="arena_1" label={t('daily_checklist.arena_1')} />
                    </div>
                </div>

                {/* Ruins Plunder */}
                <div>
                    <h3 style={{
                        fontSize: '1.1rem', color: '#b366ff', marginBottom: '1rem',
                        display: 'flex', alignItems: 'center', gap: '0.5rem'
                    }}>
                        <Pickaxe size={20} />
                        {t('daily_checklist.ruins_plunder')}
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <CheckboxRow id="ruins_1" label={t('daily_checklist.ruins_1')} />
                    </div>
                </div>

                {/* Trade Shipping */}
                <div>
                    <h3 style={{
                        fontSize: '1.1rem', color: '#00cc99', marginBottom: '1rem',
                        display: 'flex', alignItems: 'center', gap: '0.5rem'
                    }}>
                        <Ship size={20} />
                        {t('daily_checklist.trade_shipping')}
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <CheckboxRow id="trade_1" label={t('daily_checklist.trade_1')} />
                        <CheckboxRow id="trade_2" label={t('daily_checklist.trade_2')} />
                        <CheckboxRow id="trade_3" label={t('daily_checklist.trade_3')} />
                    </div>
                </div>

                {/* Commissions */}
                <div>
                    <h3 style={{
                        fontSize: '1.1rem', color: '#ff99cc', marginBottom: '1rem',
                        display: 'flex', alignItems: 'center', gap: '0.5rem'
                    }}>
                        <ClipboardList size={20} />
                        {t('daily_checklist.commissions')}
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <CheckboxRow id="commissions_1" label={t('daily_checklist.commissions_1')} />
                        <CheckboxRow id="commissions_2" label={t('daily_checklist.commissions_2')} />
                    </div>
                </div>

            </div>
        </div>
    );
}
