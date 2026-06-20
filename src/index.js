import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error, info) { console.error('eSEHAT Error:', error, info); }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', backgroundColor:'#FEF2F2', fontFamily:'Inter,sans-serif' }}>
          <div style={{ maxWidth:480, textAlign:'center', background:'white', padding:40, borderRadius:16, border:'2px solid #FECACA' }}>
            <div style={{ fontSize:48, marginBottom:16 }}>🏥</div>
            <h2 style={{ color:'#DC2626', marginBottom:12 }}>Something went wrong</h2>
            <p style={{ color:'#7F1D1D', marginBottom:8 }}>ਕਿਰਪਾ ਕਰਕੇ ਪੰਨੇ ਨੂੰ ਤਾਜ਼ਾ ਕਰੋ</p>
            <p style={{ color:'#7F1D1D', marginBottom:20 }}>कृपया पृष्ठ को रीफ्रेश करें</p>
            <button onClick={() => window.location.reload()} style={{ background:'#3B82F6', color:'white', border:'none', padding:'12px 24px', borderRadius:8, cursor:'pointer', fontSize:14 }}>
              🔄 Refresh Page
            </button>
            <p style={{ marginTop:16, fontSize:12, color:'#6B7280' }}>Emergency: Call 108 or visit nearest health facility</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

serviceWorkerRegistration.register({
  onSuccess: () => console.log('✅ eSEHAT PWA ready for offline use'),
  onUpdate: (reg) => {
    if (reg && reg.waiting) {
      reg.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
  }
});

reportWebVitals();
