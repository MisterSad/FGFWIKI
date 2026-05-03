import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckSquare, Square, Swords, Shield, Coins, Pickaxe, Ship, ClipboardList, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { saveUserToolData, loadUserToolData } from '../firebaseUtils';

export default function DailyChecklist() {
    const { t } = useTranslation();
    const { currentUser } = useAuth();
    const [isLoadingData, setIsLoadingData] = useState(false);

    // Initial load from local storage
    const [checkedItems, setCheckedItems] = useState(() => {
        const saved = localStorage.getItem('dailyChecklist');
        return saved ? JSON.parse(saved) : {};
    });

    // Load from profile when user changes
    useEffect(() => {
        const loadData = async () => {
            if (currentUser) {
                setIsLoadingData(true);
                const data = await loadUserToolData(currentUser.uid, 'dailyTasks');
                if (data) {
                    setCheckedItems(data);
                }
                setIsLoadingData(false);
            }
        };
        loadData();
    }, [currentUser]);

    // Save to local storage and profile when checkedItems changes
    useEffect(() => {
        // Prevent saving initial empty state if we're still loading from Firestore
        if (isLoadingData) return;

        localStorage.setItem('dailyChecklist', JSON.stringify(checkedItems));

        if (currentUser) {
            // Debounce or just save directly (it's a small object)
            saveUserToolData(currentUser.uid, 'dailyTasks', checkedItems);
        }
    }, [checkedItems, currentUser, isLoadingData]);

    const toggleCheck = (id) => {
        setCheckedItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleReset = () => {
        if (window.confirm(t('daily_checklist.reset_confirm', 'Are you sure you want to reset all daily tasks?'))) {
            setCheckedItems({});
        }
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
                borderRadius: '2px',
                background: 'var(--bg-void)',
                border: `1px solid ${isChecked(id) ? 'var(--accent-teal)' : 'var(--border)'}`,
                transition: 'all 0.2s ease',
                opacity: isChecked(id) ? 0.7 : 1
            }}
        >
            <div style={{ color: isChecked(id) ? 'var(--accent-teal)' : 'var(--text-secondary)' }}>
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
        <div className="card reveal" style={{
            background: 'var(--bg-void)',
            border: '1px solid var(--border)',
            borderTop: '2px solid var(--accent-teal)',
            padding: '1.5rem',
            marginBottom: '3rem',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background glow lines */}
            <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, height: '4px',
                background: 'linear-gradient(90deg, transparent, var(--accent-teal), transparent)',
                opacity: 0.5
            }} />

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem'
            }}>
                <h2 style={{
                    fontFamily: 'var(--font-hero)',
                    fontSize: '1.5rem',
                    color: 'var(--accent-teal)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    textTransform: 'uppercase',
                    margin: 0
                }}>
                    <CheckSquare style={{ color: 'var(--accent-teal)' }} size={28} />
                    <span className="label-text">{t('daily_checklist.title')}</span>
                </h2>

                <button
                    onClick={handleReset}
                    className="button"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 1rem',
                        background: 'transparent',
                        border: '1px solid var(--border)',
                        color: 'var(--text-secondary)',
                        fontSize: '0.9rem',
                        transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--text-primary)';
                        e.currentTarget.style.borderColor = 'var(--text-secondary)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--text-secondary)';
                        e.currentTarget.style.borderColor = 'var(--border)';
                    }}
                >
                    <RefreshCw size={16} />
                    {t('daily_checklist.reset', 'Reset')}
                </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                {/* Tribute Vessel */}
                <div>
                    <h3 className="label-text" style={{
                        fontSize: '1.1rem', color: "#FFFFFF", marginBottom: '1rem',
                        display: 'flex', alignItems: 'center', gap: '0.5rem'
                    }}>
                        <Coins size={20} />
                        {t('daily_checklist.tribute_vessel')}
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
                        <CheckboxRow id="tribute_1" label={t('daily_checklist.tribute_1')} />
                        <CheckboxRow id="tribute_2" label={t('daily_checklist.tribute_2')} />
                        <CheckboxRow id="tribute_3" label={t('daily_checklist.tribute_3')} />
                        <CheckboxRow id="tribute_4" label={t('daily_checklist.tribute_4')} />
                        <CheckboxRow id="tribute_5" label={t('daily_checklist.tribute_5')} />
                        <CheckboxRow id="tribute_6" label={t('daily_checklist.tribute_6')} />
                    </div>
                </div>

                {/* Ascendancy Shrine */}
                <div>
                    <h3 className="label-text" style={{
                        fontSize: '1.1rem', color: 'var(--accent-red)', marginBottom: '1rem',
                        display: 'flex', alignItems: 'center', gap: '0.5rem'
                    }}>
                        <Swords size={20} />
                        {t('daily_checklist.ascendancy_shrine')}
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
                        <CheckboxRow id="shrine_1" label={t('daily_checklist.shrine_1')} />
                        <CheckboxRow id="shrine_2" label={t('daily_checklist.shrine_2')} />
                    </div>
                </div>

                {/* Valor Arena */}
                <div>
                    <h3 className="label-text" style={{
                        fontSize: '1.1rem', color: 'var(--accent-blue)', marginBottom: '1rem',
                        display: 'flex', alignItems: 'center', gap: '0.5rem'
                    }}>
                        <Shield size={20} />
                        {t('daily_checklist.valor_arena')}
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
                        <CheckboxRow id="arena_1" label={t('daily_checklist.arena_1')} />
                        <CheckboxRow id="arena_2" label={t('daily_checklist.arena_2')} />
                    </div>
                </div>

                {/* Ruins Plunder */}
                <div>
                    <h3 className="label-text" style={{
                        fontSize: '1.1rem', color: 'var(--accent-blue)', marginBottom: '1rem',
                        display: 'flex', alignItems: 'center', gap: '0.5rem'
                    }}>
                        <Pickaxe size={20} />
                        {t('daily_checklist.ruins_plunder')}
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
                        <CheckboxRow id="ruins_1" label={t('daily_checklist.ruins_1')} />
                        <CheckboxRow id="ruins_2" label={t('daily_checklist.ruins_2')} />
                    </div>
                </div>

                {/* Trade Shipping */}
                <div>
                    <h3 className="label-text" style={{
                        fontSize: '1.1rem', color: 'var(--accent-teal)', marginBottom: '1rem',
                        display: 'flex', alignItems: 'center', gap: '0.5rem'
                    }}>
                        <Ship size={20} />
                        {t('daily_checklist.trade_shipping')}
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
                        <CheckboxRow id="trade_1" label={t('daily_checklist.trade_1')} />
                        <CheckboxRow id="trade_2" label={t('daily_checklist.trade_2')} />
                        <CheckboxRow id="trade_3" label={t('daily_checklist.trade_3')} />
                    </div>
                </div>

                {/* Commissions */}
                <div>
                    <h3 className="label-text" style={{
                        fontSize: '1.1rem', color: 'var(--caption-color)', marginBottom: '1rem',
                        display: 'flex', alignItems: 'center', gap: '0.5rem'
                    }}>
                        <ClipboardList size={20} />
                        {t('daily_checklist.commissions')}
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
                        <CheckboxRow id="commissions_1" label={t('daily_checklist.commissions_1')} />
                        <CheckboxRow id="commissions_2" label={t('daily_checklist.commissions_2')} />
                    </div>
                </div>

            </div>
        </div>
    );
}
