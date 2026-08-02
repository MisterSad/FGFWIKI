import React from 'react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Home, AlertTriangle } from 'lucide-react';

export default function NotFound() {
    const { t } = useTranslation();

    return (
        <div className="container fade-in" style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: 'clamp(4rem, 12vw, 8rem) 1rem',
            textAlign: 'center'
        }}>
            <AlertTriangle size={48} style={{ color: 'var(--gold)', margin: '0 auto 1.5rem' }} />
            <h1 style={{
                fontFamily: 'var(--font-hero)',
                textTransform: 'uppercase',
                letterSpacing: '4px',
                fontSize: 'clamp(2rem, 6vw, 3.5rem)',
                color: 'var(--gold-bright)',
                margin: '0 0 1rem'
            }}>
                404
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2.5rem' }}>
                {t('not_found.message', 'This sector of the galaxy has not been mapped yet.')}
            </p>
            <Link
                to="/home"
                className="btn-login-glow"
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    background: 'var(--gold)',
                    color: 'var(--bg-void)',
                    padding: '0.8rem 2rem',
                    fontWeight: 'bold',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    borderRadius: '2px'
                }}
            >
                <Home size={18} />
                {t('not_found.home_link', 'Return to base')}
            </Link>
        </div>
    );
}
