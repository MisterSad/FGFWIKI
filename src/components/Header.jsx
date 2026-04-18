import React from 'react';
import { User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Header({ onLoginClick }) {
    const { currentUser, logout } = useAuth();
    return (
        <header className="sticky-nav header-container">
            <div className="header-text-wrapper">
                <div className="header-title-main">
                    FOUNDATION
                </div>
                <div className="header-title-light">
                    GALACTIC FRONTIER
                </div>
                <div className="header-subtitle">
                    Encyclopedia Galactica
                </div>
            </div>
            <div className="header-auth-container">
                {currentUser ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{
                            fontSize: '0.8rem', color: 'var(--gold)',
                            fontFamily: 'var(--font-mono)'
                        }}>
                            {currentUser.email.split('@')[0]}
                        </span>
                        <button
                            onClick={logout}
                            style={{
                                background: 'transparent', border: '1px solid var(--border)',
                                color: 'var(--text-dim)', padding: '5px 10px',
                                borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center'
                            }}
                            title="Disconnect Link"
                        >
                            <LogOut size={16} />
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={onLoginClick}
                        style={{
                            background: 'var(--gold)', border: 'none',
                            color: '#000', padding: '6px 14px',
                            fontWeight: 'bold', fontFamily: 'var(--font-label)',
                            borderRadius: '2px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px'
                        }}
                    >
                        <User size={16} /> LOGIN
                    </button>
                )}
            </div>
        </header>
    );
}
