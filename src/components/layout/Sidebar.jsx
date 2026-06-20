import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

const NAV_ITEMS = {
  patient: [
    { id: 'home', icon: '🏠', labelKey: 'home' },
    { id: 'symptom-checker', icon: '🔍', labelKey: 'symptoms' },
    { id: 'appointments', icon: '📅', labelKey: 'appointments' },
    { id: 'doctors', icon: '👨‍⚕️', labelKey: 'doctors' },
    { id: 'health-records', icon: '📋', labelKey: 'records' },
    { id: 'medicines', icon: '💊', labelKey: 'medicines' },
    { id: 'qr-card', icon: '🪪', labelKey: 'generateQR' },
  ],
  doctor: [
    { id: 'home', icon: '🏠', labelKey: 'home' },
    { id: 'queue', icon: '🔢', labelKey: 'priorityQueue' },
    { id: 'appointments', icon: '📅', labelKey: 'appointments' },
    { id: 'patients', icon: '👥', labelKey: 'patients' },
    { id: 'prescription', icon: '📝', labelKey: 'prescriptionPad' },
  ],
  asha: [
    { id: 'home', icon: '🏠', labelKey: 'home' },
    { id: 'register', icon: '➕', labelKey: 'registerPatient' },
    { id: 'camps', icon: '⛺', labelKey: 'camps' },
    { id: 'patients', icon: '👥', labelKey: 'patients' },
    { id: 'sync', icon: '🔄', labelKey: 'syncNow' },
  ],
  admin: [
    { id: 'home', icon: '🏠', labelKey: 'home' },
    { id: 'analytics', icon: '📊', labelKey: 'analytics' },
    { id: 'workload', icon: '⚖️', labelKey: 'workload' },
    { id: 'doctors', icon: '👨‍⚕️', labelKey: 'doctorAvailability' },
    { id: 'villages', icon: '🏘️', labelKey: 'village' },
  ],
  pharmacy: [
    { id: 'home', icon: '🏠', labelKey: 'home' },
    { id: 'inventory', icon: '📦', labelKey: 'medicines' },
    { id: 'orders', icon: '🛒', labelKey: 'appointments' },
    { id: 'analytics', icon: '📊', labelKey: 'analytics' },
  ],
};

const ROLE_COLORS = {
  patient: 'from-blue-600 to-blue-700',
  doctor: 'from-emerald-600 to-emerald-700',
  asha: 'from-purple-600 to-purple-700',
  admin: 'from-orange-500 to-orange-600',
  pharmacy: 'from-rose-600 to-rose-700',
};

export default function Sidebar({ activePage, onNavigate, isOpen, onToggle }) {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const { isDark, toggleTheme } = useTheme();

  const role = user?.role || 'patient';
  const navItems = NAV_ITEMS[role] || NAV_ITEMS.patient;
  const roleColor = ROLE_COLORS[role] || ROLE_COLORS.patient;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onToggle} />
      )}

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full z-50 flex flex-col transition-all duration-300
        ${isOpen ? 'w-64 translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-64'}
        ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-r shadow-xl lg:shadow-none`}>

        {/* Logo */}
        <div className={`flex items-center gap-3 p-4 border-b ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${roleColor} flex items-center justify-center text-xl shadow-md flex-shrink-0`}>🏥</div>
          <div className="min-w-0">
            <h1 className={`font-bold text-base leading-tight truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>eSEHAT Nabha</h1>
            <p className={`text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t(role)}</p>
          </div>
          <button onClick={onToggle} className={`lg:hidden ml-auto p-1 rounded-lg ${isDark ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-400 hover:bg-gray-100'}`}>✕</button>
        </div>

        {/* User Card */}
        <div className={`mx-3 my-3 p-3 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${roleColor} flex items-center justify-center text-white font-bold text-base mb-2`}>
            {user?.name?.charAt(0) || 'U'}
          </div>
          <p className={`font-semibold text-sm truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{user?.name || 'User'}</p>
          <p className={`text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{user?.village || user?.specialty || user?.location || 'Nabha'}</p>
          <div className="flex items-center gap-1 mt-1">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className={`text-xs ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>Online</span>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-3 py-2 overflow-y-auto space-y-1">
          {navItems.map(item => {
            const isActive = activePage === item.id;
            return (
              <button key={item.id} onClick={() => { onNavigate(item.id); if (window.innerWidth < 1024) onToggle(); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150
                  ${isActive
                    ? `bg-gradient-to-r ${roleColor} text-white shadow-md`
                    : isDark
                      ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}>
                <span className="text-base">{item.icon}</span>
                <span>{t(item.labelKey)}</span>
                {item.id === 'sync' && user?.role === 'asha' && (
                  <span className="ml-auto bg-amber-500 text-white text-xs px-1.5 py-0.5 rounded-full">3</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className={`p-3 border-t space-y-1 ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
          <button onClick={toggleTheme}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
              ${isDark ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}>
            <span>{isDark ? '☀️' : '🌙'}</span>
            <span>{isDark ? t('lightMode') : t('darkMode')}</span>
          </button>
          <button onClick={logout}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
              ${isDark ? 'text-red-400 hover:bg-red-900/20 hover:text-red-300' : 'text-red-500 hover:bg-red-50'}`}>
            <span>🚪</span>
            <span>{t('logout')}</span>
          </button>
        </div>
      </aside>
    </>
  );
}
