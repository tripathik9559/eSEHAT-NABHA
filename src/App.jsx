import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { OfflineProvider } from './context/OfflineContext';
import OTPLogin from './components/auth/OTPLogin';
import Sidebar from './components/layout/Sidebar';
import TopBar from './components/layout/TopBar';
import PatientPortal from './pages/PatientPortal';
import DoctorPortal from './pages/DoctorPortal';
import AdminPortal from './pages/AdminPortal';
import ASHAPortal from './pages/ASHAPortal';
import PharmacyPortal from './pages/PharmacyPortal';
import LoadingSpinner from './components/common/LoadingSpinner';
import './App.css';

function AppContent() {
  const { isAuthenticated, loading, user } = useAuth();
  const [activePage, setActivePage] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <div className="text-5xl mb-4">🏥</div>
          <LoadingSpinner text="Starting eSEHAT Nabha..." />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return <OTPLogin />;

  const role = user?.role || 'patient';

  const renderPortal = () => {
    const props = { activePage, onNavigate: navigate };
    switch (role) {
      case 'doctor':   return <DoctorPortal   {...props} />;
      case 'asha':     return <ASHAPortal      {...props} />;
      case 'admin':    return <AdminPortal     {...props} />;
      case 'pharmacy': return <PharmacyPortal  {...props} />;
      default:         return <PatientPortal   {...props} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex">
      <Sidebar
        activePage={activePage}
        onNavigate={(page) => { navigate(page); setSidebarOpen(false); }}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(o => !o)}
      />
      <div className="flex-1 flex flex-col min-h-screen lg:ml-64 transition-all">
        <TopBar
          activePage={activePage}
          onMenuToggle={() => setSidebarOpen(o => !o)}
          onNavigate={navigate}
        />
        <main className="flex-1 p-4 sm:p-6 max-w-5xl w-full mx-auto page-enter">
          {renderPortal()}
        </main>
        <footer className={`text-center py-3 text-xs border-t text-gray-400 dark:text-gray-600 border-gray-100 dark:border-gray-800`}>
          eSEHAT Nabha v2.0 &nbsp;•&nbsp; Punjab Health Department &nbsp;•&nbsp; Offline-First PWA &nbsp;•&nbsp; 173 Villages
        </footer>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <OfflineProvider>
            <AppContent />
          </OfflineProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
