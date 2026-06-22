import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
    Terminal, Cpu, ShieldAlert, CheckCircle2, AlertTriangle, 
    Play, RefreshCw, Lock, Unlock, Send, Sparkles, 
    Swords, Coins, Zap, Shield, Database, Radio
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { submitStellaAnomalyUid } from '../firebaseUtils';

// Helper for play synth beep sounds (self-contained Web Audio API)
const playBeep = (type) => {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        const now = ctx.currentTime;
        
        if (type === 'click') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, now);
            gain.gain.setValueAtTime(0.05, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            osc.start(now);
            osc.stop(now + 0.1);
        } else if (type === 'success') {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(600, now);
            osc.frequency.exponentialRampToValueAtTime(1200, now + 0.25);
            gain.gain.setValueAtTime(0.08, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
            osc.start(now);
            osc.stop(now + 0.3);
        } else if (type === 'error') {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(180, now);
            osc.frequency.setValueAtTime(120, now + 0.1);
            gain.gain.setValueAtTime(0.08, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
            osc.start(now);
            osc.stop(now + 0.25);
        } else if (type === 'power') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(400, now);
            osc.frequency.exponentialRampToValueAtTime(800, now + 0.4);
            gain.gain.setValueAtTime(0.05, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
            osc.start(now);
            osc.stop(now + 0.5);
        }
    } catch (e) {
        // AudioContext blocked or not supported
    }
};

export default function StellaAnomaly() {
    const { t, i18n } = useTranslation();
    const { currentUser } = useAuth();
    const [searchParams] = useSearchParams();
    
    // Parse override phase from query parameters (?debugPhase=1..4)
    const debugPhaseParam = searchParams.get('debugPhase');
    const debugPhase = debugPhaseParam ? parseInt(debugPhaseParam, 10) : null;
    
    // Phase unlocks based on date (UTC dates to ensure consistency)
    const phase1Date = new Date('2026-07-01T00:00:00Z');
    const phase2Date = new Date('2026-07-16T00:00:00Z');
    const phase3Date = new Date('2026-08-01T00:00:00Z');
    const phase4Date = new Date('2026-08-16T00:00:00Z');
    const endDate = new Date('2026-08-31T23:59:59Z');
    
    const [currentTime, setCurrentTime] = useState(new Date());
    
    // Real-time time updater
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Get current calendar phase based on date
    const getCalendarPhase = () => {
        if (currentTime > endDate) return 5; // Event ended
        if (currentTime >= phase4Date) return 4;
        if (currentTime >= phase3Date) return 3;
        if (currentTime >= phase2Date) return 2;
        return 1; // Phase 1 is open by default as teaser / starting phase
    };

    const currentActivePhase = debugPhase && debugPhase >= 1 && debugPhase <= 4 ? debugPhase : getCalendarPhase();
    
    // State of user's puzzles progress (stored in localStorage to persist page refreshes)
    const [completedPhases, setCompletedPhases] = useState(() => {
        const saved = localStorage.getItem('stella_anomaly_completed');
        return saved ? JSON.parse(saved) : { 1: false, 2: false, 3: false, 4: false };
    });
    
    // Track currently viewed phase tab
    const [selectedTab, setSelectedTab] = useState(1);
    
    useEffect(() => {
        // Automatically select the highest unlocked phase on first load
        const highestUnlocked = debugPhase && debugPhase >= 1 && debugPhase <= 4 ? debugPhase : getCalendarPhase();
        setSelectedTab(Math.min(highestUnlocked, 4));
    }, [debugPhase, currentTime]);

    // Save completed phases
    const markPhaseComplete = (phaseNum) => {
        const updated = { ...completedPhases, [phaseNum]: true };
        setCompletedPhases(updated);
        localStorage.setItem('stella_anomaly_completed', JSON.stringify(updated));
        playBeep('success');
    };

    const resetProgress = () => {
        if (window.confirm(t('stella_anomaly.reset_confirm') || 'Reset event progress?')) {
            const reset = { 1: false, 2: false, 3: false, 4: false };
            setCompletedPhases(reset);
            localStorage.setItem('stella_anomaly_completed', JSON.stringify(reset));
            playBeep('power');
            setSelectedTab(1);
        }
    };

    // Check if a phase is unlocked
    const isPhaseUnlocked = (phaseNum) => {
        if (debugPhase && debugPhase >= phaseNum) return true;
        
        // Calendrier d'ouverture
        const activeCal = getCalendarPhase();
        if (activeCal >= phaseNum) return true;
        
        return false;
    };

    // ==========================================
    // PHASE 1: Morse Code Puzzle States
    // ==========================================
    const [morseInput, setMorseInput] = useState('');
    const [morseError, setMorseError] = useState(false);
    
    const handleMorseSubmit = (e) => {
        e.preventDefault();
        const cleaned = morseInput.trim().toUpperCase().replace(/[^A-Z]/g, '');
        // Answer is "STELLAANOMALY" (STELLA ANOMALY)
        if (cleaned === 'STELLAANOMALY') {
            setMorseError(false);
            markPhaseComplete(1);
        } else {
            setMorseError(true);
            playBeep('error');
        }
    };

    // ==========================================
    // PHASE 2: Lore Trivia States
    // ==========================================
    const [triviaAnswers, setTriviaAnswers] = useState({ 0: '', 1: '', 2: '' });
    const [triviaError, setTriviaError] = useState(false);
    
    const triviaQuestions = [
        {
            q: 'stella_anomaly.q1_text',
            options: ['Border', 'Siwenna', 'Orun', 'Sol'],
            correct: 'Orun'
        },
        {
            q: 'stella_anomaly.q2_text',
            options: ['Cortana', 'Stella', 'HAL', 'GTC-9'],
            correct: 'Stella'
        },
        {
            q: 'stella_anomaly.q3_text',
            options: ['Kinetic', 'Beam', 'Plasma', 'Ion'],
            correct: 'Plasma'
        }
    ];

    const handleSelectTrivia = (qIdx, option) => {
        setTriviaAnswers({ ...triviaAnswers, [qIdx]: option });
        playBeep('click');
    };

    const handleTriviaSubmit = () => {
        const isAllCorrect = triviaQuestions.every((q, idx) => triviaAnswers[idx] === q.correct);
        if (isAllCorrect) {
            setTriviaError(false);
            markPhaseComplete(2);
        } else {
            setTriviaError(true);
            playBeep('error');
        }
    };

    // ==========================================
    // PHASE 3: Energy Grid Puzzle States
    // ==========================================
    const energyTypes = ['Kinetic', 'Beam', 'Ion'];
    const [grid, setGrid] = useState([
        ['Kinetic', 'Ion', 'Beam'],
        ['Beam', 'Kinetic', 'Ion'],
        ['Ion', 'Beam', 'Kinetic']
    ]);

    const handleCellClick = (row, col) => {
        if (completedPhases[3]) return;
        
        playBeep('click');
        const nextGrid = [...grid.map(r => [...r])];
        const currentType = nextGrid[row][col];
        const nextIdx = (energyTypes.indexOf(currentType) + 1) % energyTypes.length;
        nextGrid[row][col] = energyTypes[nextIdx];
        setGrid(nextGrid);
        
        // Verify solution:
        // Row 1 (Index 0): All Kinetic
        // Row 2 (Index 1): All Beam
        // Row 3 (Index 2): All Ion
        const solved = 
            nextGrid[0].every(c => c === 'Kinetic') &&
            nextGrid[1].every(c => c === 'Beam') &&
            nextGrid[2].every(c => c === 'Ion');
            
        if (solved) {
            markPhaseComplete(3);
        }
    };

    const getCellColor = (type) => {
        if (type === 'Kinetic') return '#FF5A5A'; // Glowing Red
        if (type === 'Beam') return '#4ECDC4';    // Glowing Teal
        return '#E8C96A';                         // Glowing Gold
    };

    const getCellIcon = (type) => {
        if (type === 'Kinetic') return <Swords size={20} />;
        if (type === 'Beam') return <Shield size={20} />;
        return <Coins size={20} />;
    };

    // ==========================================
    // PHASE 4: Game UID Submission States
    // ==========================================
    const [gameUid, setGameUid] = useState('');
    const [submitLoading, setSubmitLoading] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [submitSuccess, setSubmitSuccess] = useState(() => {
        return localStorage.getItem('stella_anomaly_submitted_uid') !== null;
    });

    const handleUidSubmit = async (e) => {
        e.preventDefault();
        setSubmitError('');
        const trimmed = gameUid.trim();
        
        // Regex: 8 to 12 digits
        if (!/^\d{8,12}$/.test(trimmed)) {
            setSubmitError(t('stella_anomaly.uid_invalid_error') || 'UID must be a number containing 8 to 12 digits.');
            playBeep('error');
            return;
        }

        setSubmitLoading(true);
        playBeep('click');

        try {
            // Save to Firebase (or skip if not initialized/env variables missing)
            try {
                await submitStellaAnomalyUid(trimmed, currentUser?.uid || null, i18n.language);
            } catch (firebaseErr) {
                console.warn('Firebase submission failed, fallback to localStorage saving:', firebaseErr);
            }

            // Success saving state
            localStorage.setItem('stella_anomaly_submitted_uid', trimmed);
            setSubmitSuccess(true);
            markPhaseComplete(4);
        } catch (err) {
            setSubmitError(t('stella_anomaly.submit_failed') || 'Database transmission error. Please try again.');
            playBeep('error');
        } finally {
            setSubmitLoading(false);
        }
    };

    // Determine Stella's system restoration percentage
    const getStellaRestoration = () => {
        let count = 0;
        if (completedPhases[1]) count += 25;
        if (completedPhases[2]) count += 25;
        if (completedPhases[3]) count += 25;
        if (completedPhases[4]) count += 25;
        return count;
    };

    const restorationPercent = getStellaRestoration();

    return (
        <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '2rem 1rem',
            fontFamily: 'var(--font-mono)',
            color: '#E8E4D9',
            position: 'relative'
        }}>
            {/* Retro scanlines and glitch overlays */}
            <div className="terminal-scanlines" style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
                backgroundSize: '100% 4px, 6px 100%',
                zIndex: 10,
                pointerEvents: 'none',
                opacity: 0.8
            }} />

            {/* Title block */}
            <div style={{
                textAlign: 'center',
                marginBottom: '3rem',
                borderBottom: '1px solid rgba(78, 205, 196, 0.15)',
                paddingBottom: '2rem',
                position: 'relative'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1rem',
                    color: 'var(--accent-teal)',
                    fontSize: 'var(--fs-2xl)',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    letterSpacing: '3px',
                    textShadow: '0 0 10px rgba(78, 205, 196, 0.5)'
                }}>
                    <Radio className="terminal-glow-pulse" style={{ animation: 'pulsate 2s infinite ease-in-out' }} />
                    <span>THE STELLA ANOMALY</span>
                </div>
                <p style={{
                    color: 'var(--text-secondary)',
                    marginTop: '1rem',
                    maxWidth: '600px',
                    marginInline: 'auto',
                    fontSize: 'var(--fs-sm)'
                }}>
                    {t('stella_anomaly.main_subtitle') || 'A critical bug has locked Stella’s security systems. Restore her matrices and log your UID to claim 1,000 Platinum Credits.'}
                </p>
                
                {/* Debug notice */}
                {debugPhase && (
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginTop: '1rem',
                        background: 'rgba(232, 201, 106, 0.1)',
                        border: '1px solid var(--gold)',
                        color: 'var(--gold-bright)',
                        padding: '0.4rem 1rem',
                        borderRadius: '4px',
                        fontSize: '0.75rem'
                    }}>
                        <AlertTriangle size={14} />
                        <span>DEBUG MODE ACTIVE: FORCED PHASE {debugPhase}</span>
                    </div>
                )}
            </div>

            {/* Main Terminal Dashboard */}
            <div className="terminal-dashboard-grid" style={{
                display: 'grid',
                gridTemplateColumns: '1fr 320px',
                gap: '2rem',
                alignItems: 'start'
            }}>
                
                {/* Left Side: Puzzles Console */}
                <div style={{
                    background: 'rgba(13, 14, 20, 0.85)',
                    border: '1px solid rgba(78, 205, 196, 0.2)',
                    borderRadius: '8px',
                    boxShadow: '0 0 30px rgba(0, 0, 0, 0.6), inset 0 0 15px rgba(78, 205, 196, 0.05)',
                    backdropFilter: 'blur(12px)',
                    overflow: 'hidden'
                }}>
                    {/* Console Header Tabs */}
                    <div style={{
                        display: 'flex',
                        background: 'rgba(6, 7, 16, 0.9)',
                        borderBottom: '1px solid rgba(78, 205, 196, 0.2)'
                    }}>
                        {[1, 2, 3, 4].map(phaseNum => {
                            const unlocked = isPhaseUnlocked(phaseNum);
                            const completed = completedPhases[phaseNum];
                            const active = selectedTab === phaseNum;
                            
                            return (
                                <button
                                    key={phaseNum}
                                    type="button"
                                    onClick={() => {
                                        if (unlocked) {
                                            setSelectedTab(phaseNum);
                                            playBeep('click');
                                        } else {
                                            playBeep('error');
                                        }
                                    }}
                                    style={{
                                        flex: 1,
                                        padding: '1.2rem 1rem',
                                        background: active ? 'rgba(78, 205, 196, 0.08)' : 'transparent',
                                        border: 'none',
                                        borderBottom: active ? '3px solid var(--accent-teal)' : '3px solid transparent',
                                        color: active ? '#FFFFFF' : (unlocked ? 'var(--text-secondary)' : 'rgba(255, 255, 255, 0.15)'),
                                        cursor: unlocked ? 'pointer' : 'not-allowed',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '0.4rem',
                                        fontSize: '0.8rem',
                                        transition: 'all 0.3s ease',
                                        outline: 'none'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                        {!unlocked ? <Lock size={12} /> : (completed ? <CheckCircle2 size={12} color="var(--accent-teal)" /> : <Unlock size={12} />)}
                                        <span style={{ fontWeight: 'bold' }}>PHASE {phaseNum}</span>
                                    </div>
                                    <span style={{ fontSize: '0.65rem', opacity: 0.6 }}>
                                        {phaseNum === 1 && 'SIGNAL'}
                                        {phaseNum === 2 && 'DATABASE'}
                                        {phaseNum === 3 && 'CORE'}
                                        {phaseNum === 4 && 'CLAIM'}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Console Viewport */}
                    <div style={{ padding: '2.5rem 2rem', minHeight: '400px', position: 'relative' }}>
                        {/* 1. If viewing locked phase */}
                        {!isPhaseUnlocked(selectedTab) ? (
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minHeight: '300px',
                                gap: '1rem',
                                color: 'rgba(255, 255, 255, 0.3)',
                                textAlign: 'center'
                            }}>
                                <Lock size={48} />
                                <div style={{ fontSize: '1.1rem', color: '#FF5A5A', fontWeight: 'bold' }}>ACCESS RESTRICTED</div>
                                <div style={{ fontSize: '0.8rem', maxWidth: '300px' }}>
                                    {selectedTab === 2 && 'Decrypt transmissions in Phase 1 and wait for July 16, 2026 to proceed.'}
                                    {selectedTab === 3 && 'Restore database sectors in Phase 2 and wait for August 1, 2026 to proceed.'}
                                    {selectedTab === 4 && 'Stabilize grid cores in Phase 3 and wait for August 16, 2026 to proceed.'}
                                </div>
                            </div>
                        ) : (
                            /* 2. Unlocked Phase contents */
                            <div>
                                {/* Active Phase Title */}
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    borderBottom: '1px dashed rgba(255, 255, 255, 0.1)',
                                    paddingBottom: '1rem',
                                    marginBottom: '2rem'
                                }}>
                                    <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--accent-teal)' }}>
                                        {selectedTab === 1 && 'ANOMALY DETECTED: DECRYPT SIGNAL'}
                                        {selectedTab === 2 && 'SECTOR RESTORATION: TRIVIA MATRIX'}
                                        {selectedTab === 3 && 'GRID STABILIZATION: SYNERGY REALIGNMENT'}
                                        {selectedTab === 4 && 'GTC CENTRAL NODE: AUTHORIZATION REQUEST'}
                                    </div>
                                    <div style={{
                                        fontSize: '0.75rem',
                                        background: completedPhases[selectedTab] ? 'rgba(78, 205, 196, 0.15)' : 'rgba(232, 201, 106, 0.1)',
                                        border: completedPhases[selectedTab] ? '1px solid var(--accent-teal)' : '1px solid var(--gold)',
                                        color: completedPhases[selectedTab] ? 'var(--accent-teal)' : 'var(--gold-bright)',
                                        padding: '0.2rem 0.6rem',
                                        borderRadius: '2px'
                                    }}>
                                        {completedPhases[selectedTab] ? 'STATUS: STABLE' : 'STATUS: CORRUPTED'}
                                    </div>
                                </div>

                                {/* Puzzle Renderers */}
                                
                                {/* PHASE 1 PUZZLE: Morse Decrypt */}
                                {selectedTab === 1 && (
                                    <div>
                                        <p style={{ fontSize: '0.85rem', lineHeight: '1.6', marginBottom: '2rem', opacity: 0.8 }}>
                                            {t('stella_anomaly.p1_desc') || 'A low-frequency space wave is emitting repeating sequences on all channels. Transcribe the Morse pulse code to log into the terminal:'}
                                        </p>
                                        
                                        {/* Morse Signal Box */}
                                        <div style={{
                                            background: 'rgba(6, 7, 16, 0.9)',
                                            border: '1px solid rgba(78, 205, 196, 0.3)',
                                            padding: '2rem',
                                            borderRadius: '4px',
                                            textAlign: 'center',
                                            marginBottom: '2.5rem',
                                            boxShadow: 'inset 0 0 20px rgba(78, 205, 196, 0.1)'
                                        }}>
                                            {/* Blinking signal bulb */}
                                            <div style={{
                                                width: '24px',
                                                height: '24px',
                                                borderRadius: '50%',
                                                background: 'var(--accent-teal)',
                                                margin: '0 auto 1.5rem',
                                                boxShadow: '0 0 20px var(--accent-teal)',
                                                animation: 'flicker 1.8s infinite'
                                            }} />
                                            
                                            {/* Morse Symbols code */}
                                            <div style={{
                                                fontSize: '1.8rem',
                                                letterSpacing: '6px',
                                                fontWeight: 'bold',
                                                color: '#FFFFFF',
                                                textShadow: '0 0 8px rgba(255, 255, 255, 0.6)'
                                            }}>
                                                ... - . .-.. .-.. .- / .- -. --- -- .- .-.. -.--
                                            </div>
                                        </div>

                                        {/* Decode input form */}
                                        {completedPhases[1] ? (
                                            <div style={{
                                                textAlign: 'center',
                                                color: 'var(--accent-teal)',
                                                background: 'rgba(78, 205, 196, 0.08)',
                                                padding: '1.5rem',
                                                borderRadius: '4px',
                                                border: '1px solid rgba(78, 205, 196, 0.2)'
                                            }}>
                                                <CheckCircle2 size={32} style={{ margin: '0 auto 0.8rem' }} />
                                                <div style={{ fontWeight: 'bold' }}>TRANSMISSION DECODED: "STELLA ANOMALY"</div>
                                                <div style={{ fontSize: '0.75rem', marginTop: '0.4rem', opacity: 0.8 }}>
                                                    Signal tunnel initialized. Proceed to Phase 2.
                                                </div>
                                            </div>
                                        ) : (
                                            <form onSubmit={handleMorseSubmit} style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                                                <div style={{ display: 'flex', gap: '1rem' }}>
                                                    <input
                                                        type="text"
                                                        placeholder={t('stella_anomaly.morse_placeholder') || "Enter decrypted message..."}
                                                        value={morseInput}
                                                        onChange={(e) => setMorseInput(e.target.value)}
                                                        style={{
                                                            flex: 1,
                                                            background: 'rgba(10, 10, 12, 0.9)',
                                                            border: morseError ? '1px solid #FF5A5A' : '1px solid rgba(78, 205, 196, 0.3)',
                                                            color: '#FFFFFF',
                                                            padding: '0.8rem 1rem',
                                                            fontFamily: 'var(--font-mono)',
                                                            fontSize: '0.9rem',
                                                            outline: 'none',
                                                            borderRadius: '4px'
                                                        }}
                                                    />
                                                    <button
                                                        type="submit"
                                                        className="btn-login-glow"
                                                        style={{
                                                            background: 'var(--accent-teal)',
                                                            border: 'none',
                                                            color: 'var(--bg-void)',
                                                            padding: '0 1.5rem',
                                                            cursor: 'pointer',
                                                            borderRadius: '4px',
                                                            fontWeight: 'bold',
                                                            fontFamily: 'var(--font-mono)',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '0.5rem'
                                                        }}
                                                    >
                                                        <Send size={16} />
                                                        <span>SUBMIT</span>
                                                    </button>
                                                </div>
                                                {morseError && (
                                                    <div style={{ color: '#FF5A5A', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                        <AlertTriangle size={12} />
                                                        <span>DECRYPTION FAILURE. INCORRECT SEQUENCE. TRY AGAIN.</span>
                                                    </div>
                                                )}
                                            </form>
                                        )}
                                    </div>
                                )}

                                {/* PHASE 2 PUZZLE: Lore Trivia */}
                                {selectedTab === 2 && (
                                    <div>
                                        <p style={{ fontSize: '0.85rem', lineHeight: '1.6', marginBottom: '2rem', opacity: 0.8 }}>
                                            {t('stella_anomaly.p2_desc') || 'Stella’s information nodes are missing context blocks. Input the correct core metrics to reconstruct the sector database:'}
                                        </p>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
                                            {triviaQuestions.map((question, qIdx) => (
                                                <div key={qIdx} style={{
                                                    background: 'rgba(6, 7, 16, 0.5)',
                                                    border: '1px solid rgba(255, 255, 255, 0.05)',
                                                    padding: '1.2rem',
                                                    borderRadius: '4px'
                                                }}>
                                                    <div style={{ fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.8rem', color: '#FFFFFF' }}>
                                                        {qIdx + 1}. {t(question.q)}
                                                    </div>
                                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                                                        {question.options.map(option => {
                                                            const selected = triviaAnswers[qIdx] === option;
                                                            const isCompleted = completedPhases[2];
                                                            return (
                                                                <button
                                                                    key={option}
                                                                    type="button"
                                                                    disabled={isCompleted}
                                                                    onClick={() => handleSelectTrivia(qIdx, option)}
                                                                    style={{
                                                                        padding: '0.6rem',
                                                                        background: selected ? 'rgba(78, 205, 196, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                                                                        border: selected ? '1px solid var(--accent-teal)' : '1px solid rgba(255, 255, 255, 0.1)',
                                                                        color: selected ? '#FFFFFF' : 'var(--text-secondary)',
                                                                        borderRadius: '2px',
                                                                        cursor: isCompleted ? 'not-allowed' : 'pointer',
                                                                        fontSize: '0.75rem',
                                                                        textAlign: 'left',
                                                                        fontFamily: 'var(--font-mono)',
                                                                        outline: 'none',
                                                                        transition: 'all 0.2s ease'
                                                                    }}
                                                                >
                                                                    [{selected ? 'X' : ' '}] {option}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {completedPhases[2] ? (
                                            <div style={{
                                                textAlign: 'center',
                                                color: 'var(--accent-teal)',
                                                background: 'rgba(78, 205, 196, 0.08)',
                                                padding: '1.5rem',
                                                borderRadius: '4px',
                                                border: '1px solid rgba(78, 205, 196, 0.2)'
                                            }}>
                                                <CheckCircle2 size={32} style={{ margin: '0 auto 0.8rem' }} />
                                                <div style={{ fontWeight: 'bold' }}>DATA INTEGRITY RESTORED</div>
                                                <div style={{ fontSize: '0.75rem', marginTop: '0.4rem', opacity: 0.8 }}>
                                                    Missing lore memory sectors re-compiled. Proceed to Phase 3.
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <button
                                                    type="button"
                                                    onClick={handleTriviaSubmit}
                                                    style={{
                                                        width: '100%',
                                                        background: 'var(--accent-teal)',
                                                        border: 'none',
                                                        color: 'var(--bg-void)',
                                                        padding: '0.8rem',
                                                        cursor: 'pointer',
                                                        borderRadius: '4px',
                                                        fontWeight: 'bold',
                                                        fontFamily: 'var(--font-mono)',
                                                        fontSize: '0.9rem'
                                                    }}
                                                >
                                                    VERIFY CONTEXT BLOCKS
                                                </button>
                                                {triviaError && (
                                                    <div style={{ color: '#FF5A5A', fontSize: '0.75rem', marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'center' }}>
                                                        <AlertTriangle size={12} />
                                                        <span>DATABASE ERROR: METRIC CONFLICTS DETECTED. RE-VERIFY.</span>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* PHASE 3 PUZZLE: Energy Grid */}
                                {selectedTab === 3 && (
                                    <div>
                                        <p style={{ fontSize: '0.85rem', lineHeight: '1.6', marginBottom: '1.5rem', opacity: 0.8 }}>
                                            {t('stella_anomaly.p3_desc') || 'The power distribution grid is misaligned. Align the node rows to match the energy flow protocols: Row 1 = Kinetic, Row 2 = Beam, Row 3 = Ion.'}
                                        </p>

                                        {/* Guide Legend */}
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-around',
                                            fontSize: '0.7rem',
                                            marginBottom: '2rem',
                                            background: 'rgba(6, 7, 16, 0.4)',
                                            padding: '0.6rem',
                                            borderRadius: '4px',
                                            border: '1px solid rgba(255, 255, 255, 0.05)'
                                        }}>
                                            <span style={{ color: '#FF5A5A', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Swords size={12}/> ROW 1: KINETIC</span>
                                            <span style={{ color: '#4ECDC4', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Shield size={12}/> ROW 2: BEAM</span>
                                            <span style={{ color: '#E8C96A', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Coins size={12}/> ROW 3: ION</span>
                                        </div>

                                        {/* Node Grid */}
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '0.8rem',
                                            maxWidth: '320px',
                                            margin: '0 auto 2.5rem'
                                        }}>
                                            {grid.map((rowArr, rowIdx) => (
                                                <div key={rowIdx} style={{ display: 'flex', gap: '0.8rem' }}>
                                                    {rowArr.map((type, colIdx) => {
                                                        const color = getCellColor(type);
                                                        const activeColor = completedPhases[3] ? 'rgba(78, 205, 196, 0.15)' : `${color}1A`;
                                                        return (
                                                            <button
                                                                key={colIdx}
                                                                type="button"
                                                                onClick={() => handleCellClick(rowIdx, colIdx)}
                                                                disabled={completedPhases[3]}
                                                                style={{
                                                                    flex: 1,
                                                                    aspectRatio: '1',
                                                                    background: activeColor,
                                                                    border: `1px solid ${completedPhases[3] ? 'var(--accent-teal)' : color}`,
                                                                    borderRadius: '8px',
                                                                    cursor: completedPhases[3] ? 'not-allowed' : 'pointer',
                                                                    display: 'flex',
                                                                    flexDirection: 'column',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    color: completedPhases[3] ? 'var(--accent-teal)' : color,
                                                                    gap: '0.4rem',
                                                                    boxShadow: completedPhases[3] ? '0 0 10px rgba(78, 205, 196, 0.2)' : `0 0 10px ${color}33`,
                                                                    transition: 'all 0.2s ease',
                                                                    outline: 'none'
                                                                }}
                                                            >
                                                                {getCellIcon(type)}
                                                                <span style={{ fontSize: '0.6rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
                                                                    {type}
                                                                </span>
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            ))}
                                        </div>

                                        {completedPhases[3] && (
                                            <div style={{
                                                textAlign: 'center',
                                                color: 'var(--accent-teal)',
                                                background: 'rgba(78, 205, 196, 0.08)',
                                                padding: '1.5rem',
                                                borderRadius: '4px',
                                                border: '1px solid rgba(78, 205, 196, 0.2)'
                                            }}>
                                                <CheckCircle2 size={32} style={{ margin: '0 auto 0.8rem' }} />
                                                <div style={{ fontWeight: 'bold' }}>GRID CIRCUITS COMPLETED</div>
                                                <div style={{ fontSize: '0.75rem', marginTop: '0.4rem', opacity: 0.8 }}>
                                                    Core alignment stabilized. Stella mainframe rebooted. Proceed to Phase 4.
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* PHASE 4: UID Claim */}
                                {selectedTab === 4 && (
                                    <div>
                                        <p style={{ fontSize: '0.85rem', lineHeight: '1.6', marginBottom: '2rem', opacity: 0.8 }}>
                                            {t('stella_anomaly.p4_desc') || 'System restored. Requesting authorization parameters. Input your Game UID to register for the 1,000 Platinum Credits award:'}
                                        </p>

                                        {submitSuccess ? (
                                            <div style={{
                                                textAlign: 'center',
                                                color: 'var(--accent-teal)',
                                                background: 'rgba(78, 205, 196, 0.08)',
                                                padding: '2rem',
                                                borderRadius: '8px',
                                                border: '1px solid rgba(78, 205, 196, 0.25)',
                                                boxShadow: '0 0 15px rgba(78, 205, 196, 0.1)'
                                            }}>
                                                <Sparkles size={36} className="terminal-glow-pulse" style={{ margin: '0 auto 1rem', color: 'var(--gold-bright)' }} />
                                                <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#FFFFFF' }}>TRANSMISSION SECURED</div>
                                                <div style={{ fontSize: '0.85rem', marginTop: '0.6rem', color: 'var(--accent-teal)' }}>
                                                    UID: {localStorage.getItem('stella_anomaly_submitted_uid')} REGISTERED
                                                </div>
                                                <div style={{ fontSize: '0.75rem', marginTop: '1rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                                                    {t('stella_anomaly.success_msg') || 'Verification complete. The 1,000 Platinum Credits will be sent to your in-game mailbox before September 30, 2026.'}
                                                </div>
                                            </div>
                                        ) : (
                                            <form onSubmit={handleUidSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                                <div>
                                                    <label style={{ display: 'block', fontSize: '0.75rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                                                        GAME USER ID (UID)
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="e.g. 106198421"
                                                        value={gameUid}
                                                        onChange={(e) => setGameUid(e.target.value.replace(/\D/g, ''))}
                                                        style={{
                                                            width: '100%',
                                                            background: 'rgba(10, 10, 12, 0.9)',
                                                            border: submitError ? '1px solid #FF5A5A' : '1px solid rgba(78, 205, 196, 0.3)',
                                                            color: '#FFFFFF',
                                                            padding: '0.8rem 1rem',
                                                            fontFamily: 'var(--font-mono)',
                                                            fontSize: '1rem',
                                                            outline: 'none',
                                                            borderRadius: '4px'
                                                        }}
                                                    />
                                                </div>

                                                {submitError && (
                                                    <div style={{ color: '#FF5A5A', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                        <AlertTriangle size={12} />
                                                        <span>{submitError}</span>
                                                    </div>
                                                )}

                                                <button
                                                    type="submit"
                                                    disabled={submitLoading}
                                                    style={{
                                                        background: 'var(--accent-teal)',
                                                        border: 'none',
                                                        color: 'var(--bg-void)',
                                                        padding: '0.9rem',
                                                        cursor: submitLoading ? 'not-allowed' : 'pointer',
                                                        borderRadius: '4px',
                                                        fontWeight: 'bold',
                                                        fontFamily: 'var(--font-mono)',
                                                        fontSize: '0.9rem',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        gap: '0.5rem',
                                                        opacity: submitLoading ? 0.7 : 1
                                                    }}
                                                >
                                                    {submitLoading ? (
                                                        <>
                                                            <RefreshCw size={16} className="terminal-glow-pulse" style={{ animation: 'spin 1.5s infinite linear' }} />
                                                            <span>TRANSMITTING DATA...</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Send size={16} />
                                                            <span>AUTHORIZE & LOG UID</span>
                                                        </>
                                                    )}
                                                </button>
                                            </form>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Side: Stella Terminal Status */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    
                    {/* Stella Portrait Card */}
                    <div style={{
                        background: 'rgba(13, 14, 20, 0.85)',
                        border: '1px solid rgba(78, 205, 196, 0.2)',
                        borderRadius: '8px',
                        padding: '1.5rem',
                        textAlign: 'center',
                        boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
                        backdropFilter: 'blur(12px)'
                    }}>
                        <div style={{ 
                            fontSize: '0.75rem', 
                            color: 'var(--text-secondary)', 
                            textTransform: 'uppercase', 
                            marginBottom: '1rem',
                            letterSpacing: '1px'
                        }}>
                            AI System Interface
                        </div>

                        {/* Interactive holographic avatar (SVG with CSS animations) */}
                        <div style={{
                            width: '160px',
                            height: '160px',
                            margin: '0 auto 1.5rem',
                            background: 'rgba(6, 7, 16, 0.9)',
                            border: '1px solid rgba(78, 205, 196, 0.3)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            position: 'relative',
                            boxShadow: 'inset 0 0 20px rgba(78, 205, 196, 0.2)'
                        }}>
                            {/* Static noise distortion lines depending on repair state */}
                            {restorationPercent < 100 && (
                                <div style={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    background: 'repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15) 1px, transparent 1px, transparent 2px)',
                                    pointerEvents: 'none',
                                    zIndex: 5
                                }} />
                            )}
                            
                            {/* Futuristic SVG Avatar */}
                            <svg 
                                width="120" 
                                height="120" 
                                viewBox="0 0 100 100" 
                                style={{
                                    // Apply blur/hue-rotate depending on restoration percent
                                    filter: `
                                        blur(${Math.max(0, (100 - restorationPercent) / 15)}px)
                                        hue-rotate(${(100 - restorationPercent) * 1.5}deg)
                                        contrast(${100 + (100 - restorationPercent)}%)
                                    `,
                                    transition: 'all 0.8s ease',
                                    zIndex: 2
                                }}
                            >
                                {/* Background glow grid */}
                                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(78, 205, 196, 0.15)" strokeWidth="1" strokeDasharray="3 3"/>
                                
                                {/* Neck */}
                                <path d="M42 75 L42 85 C42 88, 58 88, 58 85 L58 75 Z" fill="rgba(78, 205, 196, 0.3)" stroke="var(--accent-teal)" strokeWidth="1.5"/>
                                
                                {/* Face */}
                                <path d="M30 45 C30 25, 70 25, 70 45 C70 65, 62 75, 50 75 C38 75, 30 65, 30 45 Z" fill="rgba(6, 7, 16, 0.95)" stroke="var(--accent-teal)" strokeWidth="2" />
                                
                                {/* Cybernetic Hair / Helmet */}
                                <path d="M28 40 C28 20, 72 20, 72 40 C72 25, 68 20, 50 20 C32 20, 28 25, 28 40 Z" fill="var(--accent-teal)" opacity="0.6"/>
                                <path d="M30 35 L24 55 L30 48 Z" fill="var(--accent-teal)" opacity="0.8"/>
                                <path d="M70 35 L76 55 L70 48 Z" fill="var(--accent-teal)" opacity="0.8"/>
                                
                                {/* Cybernetic Visor / Eyes */}
                                <rect x="35" y="38" width="30" height="6" rx="3" fill="none" stroke="var(--accent-teal)" strokeWidth="1.5" />
                                <line x1="38" y1="41" x2="62" y2="41" stroke="var(--accent-teal)" strokeWidth="2" strokeDasharray="1 1" />
                                <circle cx="50" cy="41" r="2" fill="#FFFFFF" />
                                
                                {/* Mouth line */}
                                <line x1="45" y1="58" x2="55" y2="58" stroke="var(--accent-teal)" strokeWidth="1.5" strokeLinecap="round" />
                                
                                {/* Cyber Cheek Lines */}
                                <path d="M34 52 L38 58" stroke="var(--accent-teal)" strokeWidth="1" opacity="0.7"/>
                                <path d="M66 52 L62 58" stroke="var(--accent-teal)" strokeWidth="1" opacity="0.7"/>
                                
                                {/* Forehead Node */}
                                <circle cx="50" cy="30" r="1.5" fill="var(--accent-teal)" />
                            </svg>

                            {/* Glitch Overlay bars */}
                            {restorationPercent < 100 && (
                                <div style={{
                                    position: 'absolute',
                                    background: 'rgba(78, 205, 196, 0.25)',
                                    width: '100%',
                                    height: '6px',
                                    top: '40%',
                                    animation: 'flicker 1.2s infinite',
                                    zIndex: 4
                                }} />
                            )}
                        </div>

                        <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#FFFFFF', marginBottom: '0.4rem' }}>
                            SUPPORT NODE: STELLA
                        </div>
                        
                        {/* Restoration Status Indicator */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>SYSTEM STATUS:</span>
                                <span style={{ color: restorationPercent === 100 ? 'var(--accent-teal)' : 'var(--gold-bright)', fontWeight: 'bold' }}>
                                    {restorationPercent === 100 ? 'OPERATIONAL' : 'CORRUPTED'}
                                </span>
                            </div>
                            <div style={{
                                width: '100%',
                                height: '6px',
                                background: 'rgba(255, 255, 255, 0.05)',
                                borderRadius: '3px',
                                overflow: 'hidden',
                                border: '1px solid rgba(255, 255, 255, 0.1)'
                            }}>
                                <div style={{
                                    width: `${restorationPercent}%`,
                                    height: '100%',
                                    background: 'var(--accent-teal)',
                                    boxShadow: '0 0 10px var(--accent-teal)',
                                    transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                                }} />
                            </div>
                            <div style={{ fontSize: '0.65rem', textAlign: 'right', color: 'var(--accent-teal)' }}>
                                {restorationPercent}% RESTORED
                            </div>
                        </div>
                    </div>

                    {/* Event Calendar Log */}
                    <div style={{
                        background: 'rgba(13, 14, 20, 0.85)',
                        border: '1px solid rgba(78, 205, 196, 0.2)',
                        borderRadius: '8px',
                        padding: '1.5rem',
                        boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
                        backdropFilter: 'blur(12px)'
                    }}>
                        <div style={{
                            fontSize: '0.75rem',
                            fontWeight: 'bold',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                            paddingBottom: '0.6rem',
                            marginBottom: '1rem',
                            color: 'var(--accent-teal)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem'
                        }}>
                            <Cpu size={14} />
                            <span>TRANSMISSION SCHEDULE</span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.7rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', opacity: isPhaseUnlocked(1) ? 1 : 0.4 }}>
                                <span>PHASE 1 (Morse Decrypt):</span>
                                <span style={{ color: isPhaseUnlocked(1) ? 'var(--accent-teal)' : 'var(--text-secondary)' }}>
                                    {isPhaseUnlocked(1) ? 'UNLOCKED' : 'JULY 1, 2026'}
                                </span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', opacity: isPhaseUnlocked(2) ? 1 : 0.4 }}>
                                <span>PHASE 2 (Trivia Matrix):</span>
                                <span style={{ color: isPhaseUnlocked(2) ? 'var(--accent-teal)' : 'var(--text-secondary)' }}>
                                    {isPhaseUnlocked(2) ? 'UNLOCKED' : 'JULY 16, 2026'}
                                </span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', opacity: isPhaseUnlocked(3) ? 1 : 0.4 }}>
                                <span>PHASE 3 (Grid Alignment):</span>
                                <span style={{ color: isPhaseUnlocked(3) ? 'var(--accent-teal)' : 'var(--text-secondary)' }}>
                                    {isPhaseUnlocked(3) ? 'UNLOCKED' : 'AUG 1, 2026'}
                                </span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', opacity: isPhaseUnlocked(4) ? 1 : 0.4 }}>
                                <span>PHASE 4 (GTC Claim):</span>
                                <span style={{ color: isPhaseUnlocked(4) ? 'var(--accent-teal)' : 'var(--text-secondary)' }}>
                                    {isPhaseUnlocked(4) ? 'UNLOCKED' : 'AUG 16, 2026'}
                                </span>
                            </div>
                        </div>

                        {/* Reset button */}
                        <button
                            type="button"
                            onClick={resetProgress}
                            style={{
                                marginTop: '1.5rem',
                                width: '100%',
                                background: 'transparent',
                                border: '1px solid rgba(255, 90, 90, 0.4)',
                                color: '#FF5A5A',
                                padding: '0.5rem',
                                cursor: 'pointer',
                                borderRadius: '4px',
                                fontSize: '0.65rem',
                                fontFamily: 'var(--font-mono)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.3rem',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(255, 90, 90, 0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'transparent';
                            }}
                        >
                            <RefreshCw size={12} />
                            <span>RESET CONSOLE DATA</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
