import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import NabhaTelemedicine from './App';
import reportWebVitals from './reportWebVitals';
import { LanguageProvider } from './context/LanguageContext';

// Import service worker for PWA functionality
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

// Error Boundary Component for graceful error handling
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error Boundary caught an error:', error, errorInfo);
    }

    // In production, you might want to send this to an error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry, LogRocket, etc.
      // errorReportingService.captureException(error, { extra: errorInfo });
    }
  }

  render() {
    if (this.state.hasError) {
      // Custom error UI with multilingual support
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FEF2F2',
          padding: '20px',
          fontFamily: 'Inter, system-ui, sans-serif'
        }}>
          <div style={{
            maxWidth: '500px',
            textAlign: 'center',
            backgroundColor: 'white',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            border: '2px solid #FECACA'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>🏥</div>
            
            <h1 style={{ 
              color: '#DC2626', 
              fontSize: '24px', 
              marginBottom: '16px',
              fontWeight: '600'
            }}>
              Oops! Something went wrong
            </h1>
            
            <p style={{ 
              color: '#7F1D1D', 
              fontSize: '16px', 
              lineHeight: '1.6',
              marginBottom: '20px'
            }}>
              We're sorry, but Nabha Health encountered an unexpected error. 
              Please try refreshing the page or contact support if the problem persists.
            </p>

            {/* Multilingual error messages */}
            <div style={{ 
              backgroundColor: '#FEF7FF', 
              padding: '16px', 
              borderRadius: '8px', 
              marginBottom: '20px',
              fontSize: '14px',
              color: '#6B21A8'
            }}>
              <p><strong>हिन्दी:</strong> क्षमा करें, नाभा स्वास्थ्य में एक त्रुटि हुई है। कृपया पृष्ठ को रीफ्रेश करें।</p>
              <p><strong>ਪੰਜਾਬੀ:</strong> ਮਾਫ਼ ਕਰਨਾ, ਨਾਭਾ ਸਿਹਤ ਵਿੱਚ ਇੱਕ ਤਰੁੱਟੀ ਹੋਈ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਪੰਨੇ ਨੂੰ ਤਾਜ਼ਾ ਕਰੋ।</p>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={() => window.location.reload()}
                style={{
                  backgroundColor: '#3B82F6',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#2563EB'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#3B82F6'}
              >
                🔄 Refresh Page
              </button>
              
              <button
                onClick={() => window.history.back()}
                style={{
                  backgroundColor: '#6B7280',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#4B5563'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#6B7280'}
              >
                ← Go Back
              </button>
            </div>

            {/* Show error details in development */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details style={{ 
                marginTop: '20px', 
                textAlign: 'left', 
                backgroundColor: '#F3F4F6', 
                padding: '16px', 
                borderRadius: '8px',
                fontSize: '12px',
                fontFamily: 'monospace'
              }}>
                <summary style={{ cursor: 'pointer', fontWeight: '600', marginBottom: '8px' }}>
                  Error Details (Development Only)
                </summary>
                <pre style={{ whiteSpace: 'pre-wrap', color: '#374151' }}>
                  {this.state.error && this.state.error.toString()}
                  <br />
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}

            <div style={{ 
              marginTop: '20px', 
              padding: '12px', 
              backgroundColor: '#F0F9FF', 
              borderRadius: '6px',
              fontSize: '12px',
              color: '#0369A1'
            }}>
              <strong>Emergency Contact:</strong> For urgent medical needs, please call 108 or visit your nearest healthcare facility.
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Performance measurement function
function sendToAnalytics(metric) {
  // Only send in production and if analytics is enabled
  if (process.env.NODE_ENV === 'production' && !localStorage.getItem('analytics-opt-out')) {
    // Example: Send to your analytics service
    console.log('Performance metric:', metric);
    
    // You can integrate with services like:
    // - Google Analytics 4
    // - Mixpanel
    // - Custom analytics endpoint
    /*
    fetch('/api/analytics/performance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(metric)
    }).catch(() => {}); // Fail silently
    */
  }
}

// Initialize performance monitoring
if (typeof window !== 'undefined' && 'performance' in window) {
  // Monitor Core Web Vitals
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.entryType === 'measure') {
        sendToAnalytics({
          name: entry.name,
          value: entry.duration,
          type: 'measure',
          timestamp: new Date().toISOString()
        });
      }
    });
  });
  
  try {
    observer.observe({ entryTypes: ['measure', 'navigation'] });
  } catch (e) {
    // Fallback for older browsers
    console.log('Performance Observer not supported');
  }
}

// React 18 Root API
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application with Error Boundary


root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <LanguageProvider>
        <NabhaTelemedicine />
      </LanguageProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
// Service Worker Registration for PWA functionality
serviceWorkerRegistration.register({
  onSuccess: (registration) => {
    console.log('SW registration successful');
    
    // Show user that app can work offline
    const showOfflineNotification = () => {
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Nabha Health is ready for offline use!', {
          body: 'You can now use the app even without internet connection.',
          icon: '/logo192.png',
          badge: '/logo192.png',
          tag: 'offline-ready',
          silent: false
        });
      }
    };

    // Ask for notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          showOfflineNotification();
        }
      });
    } else if (Notification.permission === 'granted') {
      showOfflineNotification();
    }
  },
  
  onUpdate: (registration) => {
    console.log('SW update available');
    
    // Show update notification
    const showUpdatePrompt = () => {
      if (window.confirm('A new version of Nabha Health is available. Update now?')) {
        // Skip waiting and reload
        const waitingWorker = registration.waiting;
        if (waitingWorker) {
          waitingWorker.postMessage({ type: 'SKIP_WAITING' });
          waitingWorker.addEventListener('statechange', (e) => {
            if (e.target.state === 'activated') {
              window.location.reload();
            }
          });
        }
      }
    };

    // Show update prompt after a delay to not interrupt user
    setTimeout(showUpdatePrompt, 3000);
  }
});

// Report Web Vitals for performance monitoring
reportWebVitals(sendToAnalytics);

// Additional initialization for healthcare app
document.addEventListener('DOMContentLoaded', () => {
  // Set up global error handling
  window.addEventListener('error', (event) => {
    if (process.env.NODE_ENV === 'production') {
      // Log error for monitoring
      sendToAnalytics({
        type: 'error',
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        timestamp: new Date().toISOString()
      });
    }
  });

  // Monitor network status for rural connectivity
  const updateNetworkStatus = () => {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
      sendToAnalytics({
        type: 'network',
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
        online: navigator.onLine,
        timestamp: new Date().toISOString()
      });
    }
  };

  // Initial network status
  updateNetworkStatus();
  
  // Monitor network changes
  window.addEventListener('online', updateNetworkStatus);
  window.addEventListener('offline', updateNetworkStatus);
  
  if (navigator.connection) {
    navigator.connection.addEventListener('change', updateNetworkStatus);
  }
});

// Cleanup and memory management
window.addEventListener('beforeunload', () => {
  // Clear any intervals, timeouts, or subscriptions
  // This helps prevent memory leaks
});

// Keyboard shortcuts for accessibility
document.addEventListener('keydown', (event) => {
  // Alt + H = Home
  if (event.altKey && event.key === 'h') {
    event.preventDefault();
    window.location.hash = '#/';
  }
  
  // Alt + D = Doctors
  if (event.altKey && event.key === 'd') {
    event.preventDefault();
    window.location.hash = '#/doctors';
  }
  
  // Alt + R = Records
  if (event.altKey && event.key === 'r') {
    event.preventDefault();
    window.location.hash = '#/records';
  }
  
  // Alt + S = Symptoms
  if (event.altKey && event.key === 's') {
    event.preventDefault();
    window.location.hash = '#/symptoms';
  }
  
  // Alt + M = Medicines
  if (event.altKey && event.key === 'm') {
    event.preventDefault();
    window.location.hash = '#/medicines';
  }
});

// Development helpers
if (process.env.NODE_ENV === 'development') {
  // Add development tools to window for debugging
  window.nabhaDebug = {
    clearStorage: () => {
      localStorage.clear();
      sessionStorage.clear();
      console.log('Storage cleared');
    },
    enableAnalytics: () => {
      localStorage.removeItem('analytics-opt-out');
      console.log('Analytics enabled');
    },
    disableAnalytics: () => {
      localStorage.setItem('analytics-opt-out', 'true');
      console.log('Analytics disabled');
    },
    showNetworkInfo: () => {
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      console.log('Network Info:', {
        online: navigator.onLine,
        connection: connection ? {
          effectiveType: connection.effectiveType,
          downlink: connection.downlink,
          rtt: connection.rtt
        } : 'not available'
      });
    }
  };
  
  console.log('🏥 Nabha Health Development Mode');
  console.log('Available debug commands: window.nabhaDebug');
}