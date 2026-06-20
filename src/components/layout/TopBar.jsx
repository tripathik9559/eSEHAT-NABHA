import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

export default function TopBar({ activePage, onMenuToggle, onNavigate }) {
  const { user } = useAuth();
  const { t, language, changeLanguage, languages } = useLanguage();
  const { isDark } = useTheme();
  const [showNotif, setShowNotif] = useState(false);
  const [showLang, setShowLang] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const notifRef = useRef(null);
  const langRef = useRef(null);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    const handleClick = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotif(false);
      if (langRef.current && !langRef.current.contains(e.target)) setShowLang(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  const notifications = [
    { id: 1, type: 'appointment', icon: '📅', msg: 'Appointment with Dr. Rajesh in 30 min', time: '5m ago', unread: true },
    { id: 2, type: 'alert', icon: '🔴', msg: 'High-risk patient added to queue', time: '12m ago', unread: true },
    { id: 3, type: 'medicine', icon: '💊', msg: 'Insulin stock critically low — 8 units', time: '1h ago', unread: false },
  ];

  const pageTitles = {
    home: t('home'), 'symptom-checker': t('symptoms'), appointments: t('appointments'),
    doctors: t('doctors'), 'health-records': t('records'), medicines: t('medicines'),
    'qr-card': t('generateQR'), queue: t('priorityQueue'), patients: t('patients'),
    prescription: t('prescriptionPad'), register: t('registerPatient'), camps: t('camps'),
    sync: t('syncNow'), analytics: t('analytics'), workload: t('workload'),
    villages: t('village'), inventory: t('medicines'),
  };

  return (
    <header className={`h-16 flex items-center gap-4 px-4 lg:px-6 border-b ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} sticky top-0 z-30`}>
      {/* Hamburger */}
      <button onClick={onMenuToggle} className={`lg:hidden p-2 rounded-lg ${isDark ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-500 hover:bg-gray-100'}`}>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Page Title */}
      <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
        {pageTitles[activePage] || t('home')}
      </h2>

      <div className="ml-auto flex items-center gap-2">
        {/* Online Status */}
        <div className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${isOnline ? (isDark ? 'bg-emerald-900/40 text-emerald-400' : 'bg-emerald-50 text-emerald-700') : (isDark ? 'bg-red-900/40 text-red-400' : 'bg-red-50 text-red-600')}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></span>
          {isOnline ? t('online') : t('offline')}
        </div>

        {/* Language */}
        <div className="relative" ref={langRef}>
          <button onClick={() => { setShowLang(!showLang); setShowNotif(false); }}
            className={`p-2 rounded-lg text-sm font-medium transition-colors ${isDark ? 'text-gray-400 hover:bg-gray-800 hover:text-white' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}>
            {languages.find(l => l.code === language)?.flag || '🌐'} {language.toUpperCase()}
          </button>
          {showLang && (
            <div className={`absolute right-0 top-full mt-1 w-44 rounded-xl shadow-xl border py-1 z-50 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              {languages.map(l => (
                <button key={l.code} onClick={() => { changeLanguage(l.code); setShowLang(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${language === l.code ? (isDark ? 'bg-blue-900/40 text-blue-400' : 'bg-blue-50 text-blue-700') : (isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50')}`}>
                  <span>{l.flag}</span><span>{l.nativeLabel}</span>
                  {language === l.code && <span className="ml-auto">✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button onClick={() => { setShowNotif(!showNotif); setShowLang(false); }}
            className={`relative p-2 rounded-lg transition-colors ${isDark ? 'text-gray-400 hover:bg-gray-800 hover:text-white' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}>
            🔔
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-current"></span>
          </button>
          {showNotif && (
            <div className={`absolute right-0 top-full mt-1 w-80 rounded-xl shadow-xl border z-50 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`flex items-center justify-between px-4 py-3 border-b ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                <span className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>Notifications</span>
                <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">{notifications.filter(n => n.unread).length}</span>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.map(n => (
                  <div key={n.id} className={`flex gap-3 px-4 py-3 border-b last:border-0 ${n.unread ? (isDark ? 'bg-blue-900/20' : 'bg-blue-50/50') : ''} ${isDark ? 'border-gray-700' : 'border-gray-50'}`}>
                    <span className="text-xl flex-shrink-0">{n.icon}</span>
                    <div className="min-w-0">
                      <p className={`text-xs leading-snug ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{n.msg}</p>
                      <p className={`text-xs mt-0.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{n.time}</p>
                    </div>
                    {n.unread && <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1"></span>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Avatar */}
        <div className={`w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-bold cursor-pointer`}>
          {user?.name?.charAt(0) || 'U'}
        </div>
      </div>
    </header>
  );
}
