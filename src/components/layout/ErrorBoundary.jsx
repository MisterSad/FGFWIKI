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
