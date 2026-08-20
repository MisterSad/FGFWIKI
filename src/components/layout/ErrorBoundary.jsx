import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const errStr = this.state.error?.toString() || '';
      const isChunkError = errStr.includes('dynamically imported module') || errStr.includes('Failed to fetch dynamically imported module');

      if (isChunkError) {
        return (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#0a0a0c', color: 'var(--text-primary, #fff)', fontFamily: 'var(--font-base, sans-serif)', textAlign: 'center', padding: '2rem' }}>
            <div style={{ padding: '8px 16px', background: 'rgba(201, 168, 76, 0.1)', border: '1px solid var(--gold, #C9A84C)', borderRadius: '20px', color: 'var(--gold, #C9A84C)', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '1.5rem', letterSpacing: '1px' }}>
              ✨ NEW VERSION DEPLOYED
            </div>
            <h1 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '1rem', fontFamily: 'var(--font-hero, sans-serif)' }}>
              Updating Galactic Frontier Guide
            </h1>
            <p style={{ color: 'var(--text-secondary, #8A8778)', maxWidth: '480px', marginBottom: '2rem', lineHeight: '1.6' }}>
              A new update was just released. Please refresh your browser to load the latest features and optimizations.
            </p>
            <button 
              onClick={() => {
                if (typeof window !== 'undefined' && window.sessionStorage) {
                  window.sessionStorage.removeItem('fgf_page_reloaded_for_chunk');
                }
                window.location.reload();
              }}
              style={{ background: 'var(--gold, #C9A84C)', color: '#000', border: 'none', padding: '0.8rem 2rem', cursor: 'pointer', fontWeight: 'bold', borderRadius: '8px', textTransform: 'uppercase', fontFamily: 'var(--font-label, sans-serif)', letterSpacing: '1px', boxShadow: '0 0 20px rgba(201, 168, 76, 0.4)' }}
            >
              🔄 Refresh Now
            </button>
          </div>
        );
      }

      return (
        <div style={{ padding: '2rem', background: '#0a0a0c', color: '#ff4d4d', fontFamily: 'monospace', minHeight: '100vh', boxSizing: 'border-box' }}>
          <h1 style={{ color: '#ff4d4d', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', fontFamily: 'var(--font-hero, sans-serif)', textTransform: 'uppercase' }}>FGF Wiki: Application Error</h1>
          <p style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '1.5rem 0' }}>{this.state.error?.toString()}</p>
          <pre style={{ background: '#121216', padding: '1rem', overflowX: 'auto', borderRadius: '4px', border: '1px solid #1a1a24', color: '#ccc', lineHeight: '1.5', fontSize: '0.9rem' }}>
            {this.state.error?.stack}
          </pre>
          <button 
            onClick={() => { window.location.href = '/'; }}
            style={{ marginTop: '2rem', background: 'var(--gold, #d4af37)', color: '#000', border: 'none', padding: '0.8rem 1.5rem', cursor: 'pointer', fontWeight: 'bold', textTransform: 'uppercase', fontFamily: 'var(--font-label, sans-serif)', letterSpacing: '1px' }}
          >
            Go to Home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
