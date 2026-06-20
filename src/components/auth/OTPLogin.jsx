import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

const ROLES = [
  { id: 'patient', icon: '🧑‍🦰', color: 'from-blue-500 to-blue-600', border: 'border-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/30' },
  { id: 'doctor', icon: '👨‍⚕️', color: 'from-emerald-500 to-emerald-600', border: 'border-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/30' },
  { id: 'asha', icon: '👩‍🏫', color: 'from-purple-500 to-purple-600', border: 'border-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/30' },
  { id: 'admin', icon: '🏛️', color: 'from-orange-500 to-orange-600', border: 'border-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/30' },
  { id: 'pharmacy', icon: '💊', color: 'from-rose-500 to-rose-600', border: 'border-rose-500', bg: 'bg-rose-50 dark:bg-rose-900/30' },
];

export default function OTPLogin() {
  const { sendOTP, verifyOTP } = useAuth();
  const { t, language, changeLanguage, languages } = useLanguage();
  const { isDark, toggleTheme } = useTheme();

  const [step, setStep] = useState('role'); // role | phone | otp
  const [selectedRole, setSelectedRole] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  // otpSent handled inline
  const [resendTimer, setResendTimer] = useState(0);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setStep('phone');
  };

  const handleSendOTP = async () => {
    if (phone.length < 10) { setError('Enter a valid 10-digit number'); return; }
    setLoading(true); setError('');
    const result = await sendOTP(phone);
    setLoading(false);
    if (result.success) {
      
      setStep('otp');
      setResendTimer(30);
      const interval = setInterval(() => {
        setResendTimer(prev => { if (prev <= 1) { clearInterval(interval); return 0; } return prev - 1; });
      }, 1000);
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 3) document.getElementById(`otp-${index+1}`)?.focus();
    if (!value && index > 0) document.getElementById(`otp-${index-1}`)?.focus();
  };

  const handleVerify = async () => {
    const otpStr = otp.join('');
    if (otpStr.length < 4) { setError('Enter all 4 digits'); return; }
    setLoading(true); setError('');
    const result = await verifyOTP(phone, otpStr, selectedRole);
    setLoading(false);
    if (!result.success) setError(result.message);
  };

  const roleObj = ROLES.find(r => r.id === selectedRole);

  return (
    <div className={`min-h-screen flex ${isDark ? 'bg-gray-950' : 'bg-gradient-to-br from-blue-50 via-white to-teal-50'}`}>
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-700 via-blue-800 to-teal-800 flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-white"></div>
          <div className="absolute bottom-32 right-10 w-48 h-48 rounded-full bg-teal-300"></div>
          <div className="absolute top-1/2 left-1/3 w-32 h-32 rounded-full bg-blue-300"></div>
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">🏥</div>
            <div>
              <h1 className="text-white text-2xl font-bold">eSEHAT Nabha</h1>
              <p className="text-blue-200 text-sm">AI-Powered Rural Healthcare</p>
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-white text-4xl font-bold leading-tight">
              Healthcare for<br/>Every Village,<br/>Every Family
            </h2>
            <p className="text-blue-100 text-lg leading-relaxed">
              Connecting 173 villages across Nabha with quality doctors, real-time medicine tracking, and AI-powered health assessment — even offline.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-10">
            {[
              { icon: '🏘️', label: '173 Villages', sub: 'Connected' },
              { icon: '👨‍⚕️', label: '11 Doctors', sub: 'Available Now' },
              { icon: '📋', label: '2,847', sub: 'Consultations' },
              { icon: '🌐', label: 'Offline', sub: 'First Design' },
            ].map(s => (
              <div key={s.label} className="bg-white/10 backdrop-blur rounded-xl p-4">
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="text-white font-bold">{s.label}</div>
                <div className="text-blue-200 text-sm">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-blue-200 text-sm">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
            <span>System Online • Offline Mode Available</span>
          </div>
          <p className="text-blue-300 text-xs mt-2">Punjab Health Department • Nabha Civil Hospital</p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center px-6 py-4">
          <div className="lg:hidden flex items-center gap-2">
            <span className="text-xl">🏥</span>
            <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>eSEHAT Nabha</span>
          </div>
          <div className="flex items-center gap-3 ml-auto">
            {/* Language Switcher */}
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1 gap-1">
              {languages.map(l => (
                <button key={l.code} onClick={() => changeLanguage(l.code)}
                  className={`px-2 py-1 rounded-md text-xs font-medium transition-all ${language === l.code ? 'bg-blue-600 text-white shadow' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}>
                  {l.nativeLabel}
                </button>
              ))}
            </div>
            <button onClick={toggleTheme} className={`p-2 rounded-lg transition-colors ${isDark ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              {isDark ? '☀️' : '🌙'}
            </button>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 py-8">
          <div className="w-full max-w-md">

            {/* STEP: Role Selection */}
            {step === 'role' && (
              <div className="animate-fadeIn">
                <div className="text-center mb-8">
                  <h2 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Welcome to eSEHAT</h2>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t('continueAs')}</p>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {ROLES.map(role => (
                    <button key={role.id} onClick={() => handleRoleSelect(role.id)}
                      className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200 hover:scale-[1.02] hover:shadow-md ${isDark ? 'border-gray-700 hover:border-gray-500 bg-gray-800/50' : `border-gray-200 hover:${role.border} ${role.bg}`} `}>
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center text-2xl shadow-md`}>{role.icon}</div>
                      <div className="text-left">
                        <div className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-800'}`}>{t(role.id)}</div>
                        <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {role.id === 'patient' && 'Book appointments, check symptoms'}
                          {role.id === 'doctor' && 'Manage consultations & prescriptions'}
                          {role.id === 'asha' && 'Register patients & manage camps'}
                          {role.id === 'admin' && 'Analytics & health department'}
                          {role.id === 'pharmacy' && 'Manage medicine inventory'}
                        </div>
                      </div>
                      <span className="ml-auto text-gray-400">›</span>
                    </button>
                  ))}
                </div>
                <div className={`mt-6 p-3 rounded-xl text-center text-xs ${isDark ? 'bg-gray-800 text-gray-400' : 'bg-blue-50 text-blue-600'}`}>
                  🔒 Secured by OTP Authentication • Demo OTP: 1234
                </div>
              </div>
            )}

            {/* STEP: Phone */}
            {step === 'phone' && (
              <div className="animate-fadeIn">
                <button onClick={() => setStep('role')} className={`mb-6 flex items-center gap-2 text-sm ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}>
                  ← {t('back')}
                </button>
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${roleObj?.color} flex items-center justify-center text-3xl shadow-lg mb-6`}>
                  {roleObj?.icon}
                </div>
                <h2 className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t(selectedRole)}</h2>
                <p className={`text-sm mb-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t('phone')}</p>

                <div className="space-y-4">
                  <div className={`flex rounded-xl border-2 overflow-hidden ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} focus-within:border-blue-500 transition-colors`}>
                    <div className={`flex items-center px-4 border-r ${isDark ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
                      <span className="text-sm font-medium">🇮🇳 +91</span>
                    </div>
                    <input type="tel" value={phone} onChange={e => { setPhone(e.target.value.replace(/\D/g, '').slice(0, 10)); setError(''); }}
                      placeholder="98765 43210" maxLength={10}
                      className={`flex-1 px-4 py-4 outline-none text-base ${isDark ? 'bg-gray-800 text-white placeholder-gray-600' : 'bg-white text-gray-900 placeholder-gray-400'}`} />
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <button onClick={handleSendOTP} disabled={loading || phone.length < 10}
                    className={`w-full py-4 rounded-xl font-semibold text-white text-base transition-all bg-gradient-to-r ${roleObj?.color} disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:scale-[1.01] active:scale-[0.99]`}>
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
                        Sending...
                      </span>
                    ) : t('sendOtp')}
                  </button>
                </div>
                <p className={`mt-4 text-xs text-center ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  💡 Demo mode: any 10-digit number works
                </p>
              </div>
            )}

            {/* STEP: OTP Verify */}
            {step === 'otp' && (
              <div className="animate-fadeIn">
                <button onClick={() => setStep('phone')} className={`mb-6 flex items-center gap-2 text-sm ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}>
                  ← {t('back')}
                </button>
                <div className="text-center mb-8">
                  <div className="text-4xl mb-4">📱</div>
                  <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('otp')}</h2>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Sent to +91 {phone}
                  </p>
                  <div className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-emerald-900/40 text-emerald-400' : 'bg-emerald-50 text-emerald-700'}`}>
                    Demo OTP: 1234
                  </div>
                </div>

                <div className="flex gap-3 justify-center mb-6">
                  {otp.map((digit, i) => (
                    <input key={i} id={`otp-${i}`} type="text" inputMode="numeric" value={digit} maxLength={1}
                      onChange={e => handleOtpChange(i, e.target.value)}
                      onKeyDown={e => { if (e.key === 'Backspace' && !digit && i > 0) { document.getElementById(`otp-${i-1}`)?.focus(); } }}
                      className={`w-14 h-14 text-center text-2xl font-bold rounded-xl border-2 outline-none transition-all ${digit ? 'border-blue-500 ' + (isDark ? 'bg-blue-900/30 text-white' : 'bg-blue-50 text-blue-700') : (isDark ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-200 bg-white text-gray-800')} focus:border-blue-500`} />
                  ))}
                </div>

                {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

                <button onClick={handleVerify} disabled={loading || otp.join('').length < 4}
                  className={`w-full py-4 rounded-xl font-semibold text-white text-base transition-all bg-gradient-to-r ${roleObj?.color} disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg`}>
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
                      Verifying...
                    </span>
                  ) : t('verify')}
                </button>

                <div className="text-center mt-4">
                  {resendTimer > 0
                    ? <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Resend in {resendTimer}s</p>
                    : <button onClick={handleSendOTP} className="text-blue-500 text-sm font-medium hover:text-blue-600">{t('resend')}</button>
                  }
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
