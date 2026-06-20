import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import StatCard from '../components/common/StatCard';
import RiskBadge from '../components/common/RiskBadge';
import { DEMO_PATIENTS, DEMO_HEALTH_CAMPS } from '../data/demoData';

/* ─── Register Patient Form ─── */
function RegisterPatient({ onBack }) {
  const { isDark } = useTheme();
  const [form, setForm] = useState({ name: '', age: '', gender: '', phone: '', village: '', blood: '', language: 'pa' });
  const [saved, setSaved] = useState(false);
  const offline = !navigator.onLine;
  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }));
  const inputCls = `w-full px-3 py-2.5 rounded-xl border text-sm outline-none transition-colors ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500 focus:border-purple-500' : 'bg-white border-gray-200 text-gray-800 placeholder-gray-400 focus:border-purple-500'}`;
  const labelCls = `block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`;
  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };
  return (
    <div className="max-w-lg mx-auto space-y-5">
      <button onClick={onBack} className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}>← Back</button>
      {!navigator.onLine && (
        <div className={`p-3 rounded-xl flex items-center gap-2 ${isDark ? 'bg-amber-900/30 border border-amber-800 text-amber-400' : 'bg-amber-50 border border-amber-200 text-amber-700'}`}>
          <span>📵</span><p className="text-sm">Offline mode — data will sync when connected</p>
        </div>
      )}
      {saved && <div className="bg-purple-500 text-white p-3 rounded-xl text-center font-medium">✓ Patient registered! {offline ? '(Queued for sync)' : 'Record saved.'}</div>}
      <div className={`rounded-2xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-5 rounded-t-2xl text-white">
          <h2 className="text-xl font-bold">Register New Patient</h2>
          <p className="text-purple-200 text-sm">ASHA Worker: Sukhmani Kaur • Nabha</p>
        </div>
        <div className="p-5 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className={labelCls}>Full Name *</label><input className={inputCls} placeholder="Patient's full name" value={form.name} onChange={e => set('name', e.target.value)} /></div>
            <div><label className={labelCls}>Phone Number *</label><input className={inputCls} placeholder="+91 98765 XXXXX" value={form.phone} onChange={e => set('phone', e.target.value)} /></div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div><label className={labelCls}>Age</label><input type="number" className={inputCls} placeholder="Age" value={form.age} onChange={e => set('age', e.target.value)} /></div>
            <div>
              <label className={labelCls}>Gender</label>
              <select className={inputCls} value={form.gender} onChange={e => set('gender', e.target.value)}>
                <option value="">Select</option>
                <option>Male</option><option>Female</option><option>Other</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Blood Group</label>
              <select className={inputCls} value={form.blood} onChange={e => set('blood', e.target.value)}>
                <option value="">Select</option>
                {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(b => <option key={b}>{b}</option>)}
              </select>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className={labelCls}>Village *</label><input className={inputCls} placeholder="Village name" value={form.village} onChange={e => set('village', e.target.value)} /></div>
            <div>
              <label className={labelCls}>Preferred Language</label>
              <select className={inputCls} value={form.language} onChange={e => set('language', e.target.value)}>
                <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
                <option value="hi">हिंदी (Hindi)</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
          <div><label className={labelCls}>Known Conditions / Notes</label><textarea className={`${inputCls} h-20 resize-none`} placeholder="Chronic conditions, allergies, notes..." /></div>
          <button onClick={save} className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold hover:shadow-lg transition-all">
            {offline ? '💾 Save Offline (Auto-sync later)' : '✅ Register Patient'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Health Camps ─── */
function HealthCamps({ onBack }) {
  const { isDark } = useTheme();
  const [showForm, setShowForm] = useState(false);
  const statusCfg = {
    scheduled: { bg: isDark ? 'bg-blue-900/40 text-blue-400' : 'bg-blue-100 text-blue-700', icon: '📅' },
    completed: { bg: isDark ? 'bg-emerald-900/40 text-emerald-400' : 'bg-emerald-100 text-emerald-700', icon: '✅' },
    cancelled: { bg: isDark ? 'bg-red-900/40 text-red-400' : 'bg-red-100 text-red-700', icon: '❌' },
  };
  return (
    <div className="space-y-5">
      <button onClick={onBack} className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}>← Back</button>
      <div className="flex items-center justify-between">
        <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Health Camps</h2>
        <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 bg-purple-600 text-white rounded-xl text-sm font-semibold hover:bg-purple-700 transition-colors">+ Schedule Camp</button>
      </div>
      {showForm && (
        <div className={`rounded-2xl border p-5 ${isDark ? 'bg-gray-800 border-purple-700 border' : 'bg-purple-50 border-purple-200'}`}>
          <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Schedule New Camp</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {[{ label: 'Village', placeholder: 'Village name', type: 'text' }, { label: 'Date', type: 'date' }, { label: 'Expected Participants', placeholder: '0', type: 'number' }].map(f => (
              <div key={f.label}>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{f.label}</label>
                <input type={f.type} placeholder={f.placeholder} className={`w-full px-3 py-2 rounded-xl border text-sm outline-none ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-800'} focus:border-purple-500`} />
              </div>
            ))}
          </div>
          <button onClick={() => setShowForm(false)} className="mt-3 w-full py-2.5 bg-purple-600 text-white rounded-xl font-semibold text-sm hover:bg-purple-700">Schedule Camp</button>
        </div>
      )}
      <div className="grid gap-4">
        {DEMO_HEALTH_CAMPS.map(camp => {
          const sc = statusCfg[camp.status] || statusCfg.scheduled;
          return (
            <div key={camp.id} className={`rounded-2xl border p-5 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${isDark ? 'bg-gray-700' : 'bg-purple-50'}`}>⛺</div>
                  <div>
                    <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{camp.village} Health Camp</h3>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{camp.date}</p>
                  </div>
                </div>
                <span className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium ${sc.bg}`}>{sc.icon} {camp.status}</span>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className={`p-3 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Expected</p>
                  <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{camp.expectedParticipants} patients</p>
                </div>
                {camp.actualParticipants && (
                  <div className={`p-3 rounded-xl ${isDark ? 'bg-emerald-900/30' : 'bg-emerald-50'}`}>
                    <p className={`text-xs ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>Actual Attended</p>
                    <p className={`font-bold ${isDark ? 'text-emerald-300' : 'text-emerald-700'}`}>{camp.actualParticipants} patients</p>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {camp.specialties.map(s => (
                  <span key={s} className={`text-xs px-2.5 py-1 rounded-full font-medium ${isDark ? 'bg-purple-900/40 text-purple-400' : 'bg-purple-100 text-purple-700'}`}>{s}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Offline Sync Panel ─── */
function SyncPanel({ onBack }) {
  const { isDark } = useTheme();
  const [syncing, setSyncing] = useState(false);
  const [synced, setSynced] = useState(false);
  const pendingItems = [
    { type: 'Patient Registration', name: 'Gurmail Singh, Ghagga', time: '2h ago', size: '2.1 KB' },
    { type: 'Health Record Update', name: 'Sunita Devi - Follow up', time: '45m ago', size: '1.4 KB' },
    { type: 'Camp Attendance', name: 'Bhadson Camp 2024-11-20', time: '3h ago', size: '0.8 KB' },
  ];
  const doSync = async () => {
    setSyncing(true);
    await new Promise(r => setTimeout(r, 2500));
    setSyncing(false); setSynced(true);
  };
  return (
    <div className="max-w-lg mx-auto space-y-5">
      <button onClick={onBack} className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}>← Back</button>
      <div className={`rounded-2xl border p-5 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-xl">🔄</div>
          <div>
            <h2 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Offline Data Sync</h2>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{synced ? 'All data synced ✓' : `${pendingItems.length} items pending upload`}</p>
          </div>
        </div>
        {synced ? (
          <div className={`p-4 rounded-xl text-center ${isDark ? 'bg-emerald-900/30' : 'bg-emerald-50'}`}>
            <div className="text-3xl mb-2">✅</div>
            <p className={`font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>All data synced successfully!</p>
            <p className={`text-sm ${isDark ? 'text-emerald-400/70' : 'text-emerald-600'}`}>3 records uploaded to server</p>
          </div>
        ) : (
          <>
            <div className="space-y-2 mb-4">
              {pendingItems.map((item, i) => (
                <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-amber-50'}`}>
                  <span className="text-xl">📄</span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.type}</p>
                    <p className={`text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{item.name} • {item.time}</p>
                  </div>
                  <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{item.size}</span>
                </div>
              ))}
            </div>
            <button onClick={doSync} disabled={syncing} className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold disabled:opacity-60">
              {syncing ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
                  Syncing data...
                </span>
              ) : '🔄 Sync Now'}
            </button>
          </>
        )}
      </div>
      <div className={`rounded-2xl border p-4 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <h3 className={`font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Sync History</h3>
        <div className="space-y-2">
          {[
            { time: '2024-11-24 14:32', records: 12, status: 'success' },
            { time: '2024-11-23 09:15', records: 8, status: 'success' },
            { time: '2024-11-22 16:45', records: 5, status: 'partial' },
          ].map((h, i) => (
            <div key={i} className={`flex items-center justify-between p-2.5 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="flex items-center gap-2">
                <span>{h.status === 'success' ? '✅' : '⚠️'}</span>
                <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{h.time}</span>
              </div>
              <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{h.records} records</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── ASHA Home ─── */
export default function ASHAPortal({ activePage, onNavigate }) {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const { t } = useLanguage();

  if (activePage === 'register') return <RegisterPatient onBack={() => onNavigate('home')} />;
  if (activePage === 'camps') return <HealthCamps onBack={() => onNavigate('home')} />;
  if (activePage === 'sync') return <SyncPanel onBack={() => onNavigate('home')} />;
  if (activePage === 'patients') return (
    <div className="space-y-5">
      <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Registered Patients</h2>
      <div className="grid gap-3">
        {DEMO_PATIENTS.map(p => (
          <div key={p.id} className={`rounded-2xl border p-4 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold flex-shrink-0`}>{p.name.charAt(0)}</div>
              <div className="flex-1 min-w-0">
                <p className={`font-bold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{p.name}</p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{p.age}y • {p.gender} • {p.village} • {p.bloodGroup}</p>
              </div>
              <RiskBadge level={p.riskLevel} size="sm" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* ASHA Banner */}
      <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 rounded-2xl p-5 sm:p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white"></div>
          <div className="absolute bottom-0 left-1/4 w-32 h-32 rounded-full bg-indigo-200"></div>
        </div>
        <div className="relative z-10">
          <p className="text-purple-100 text-sm">ASHA Worker Portal</p>
          <h2 className="text-2xl font-bold">{user?.name || 'Sukhmani Kaur'}</h2>
          <p className="text-purple-100 text-sm">{user?.village || 'Nabha'} Village • ASHA ID: ASHA001</p>
          <div className="grid grid-cols-3 gap-3 mt-5">
            {[
              { icon: '👥', label: 'Registered', value: 87 },
              { icon: '⛺', label: 'Camps', value: 12 },
              { icon: '🔄', label: 'Pending Sync', value: 3 },
            ].map(f => (
              <div key={f.label} className="bg-white/10 backdrop-blur rounded-xl p-3 text-center">
                <div className="text-xl mb-1">{f.icon}</div>
                <div className="font-bold text-lg">{f.value}</div>
                <div className="text-purple-100 text-xs">{f.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard icon="👥" label="Patients Registered" value="87" sub="Your village" color="purple" trend={14} />
        <StatCard icon="⛺" label="Camps Organized" value="12" sub="This year" color="blue" />
        <StatCard icon="🔄" label="Pending Sync" value="3" sub="Offline records" color="orange" />
        <StatCard icon="✅" label="Telemedicine" value="23" sub="Assisted sessions" color="green" />
      </div>

      {/* Pending Sync Alert */}
      <div className={`flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer hover:shadow-sm transition-all ${isDark ? 'bg-amber-900/20 border-amber-700' : 'bg-amber-50 border-amber-300'}`} onClick={() => onNavigate('sync')}>
        <span className="text-2xl">📵</span>
        <div className="flex-1">
          <p className={`font-semibold ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>3 records pending sync</p>
          <p className={`text-sm ${isDark ? 'text-amber-400/70' : 'text-amber-600'}`}>Connect to internet to upload offline data</p>
        </div>
        <button className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${isDark ? 'bg-amber-600 text-white' : 'bg-amber-500 text-white'}`}>Sync →</button>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: '➕', label: t('registerPatient'), sub: 'Add new patient', page: 'register', color: 'from-purple-500 to-purple-600' },
            { icon: '⛺', label: t('camps'), sub: `${DEMO_HEALTH_CAMPS.filter(c => c.status === 'scheduled').length} upcoming`, page: 'camps', color: 'from-indigo-500 to-indigo-600' },
            { icon: '👥', label: t('patients'), sub: '87 registered', page: 'patients', color: 'from-blue-500 to-blue-600' },
            { icon: '🔄', label: t('syncNow'), sub: '3 pending', page: 'sync', color: 'from-amber-500 to-orange-500' },
          ].map(a => (
            <button key={a.page} onClick={() => onNavigate(a.page)} className={`bg-gradient-to-br ${a.color} text-white rounded-2xl p-4 text-left hover:shadow-lg hover:-translate-y-0.5 transition-all`}>
              <div className="text-2xl mb-2">{a.icon}</div>
              <div className="font-bold text-sm">{a.label}</div>
              <div className="text-white/70 text-xs">{a.sub}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Upcoming Camps */}
      <div>
        <h3 className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Upcoming Camps</h3>
        <div className="space-y-3">
          {DEMO_HEALTH_CAMPS.filter(c => c.status === 'scheduled').map(camp => (
            <div key={camp.id} className={`flex items-center gap-4 p-4 rounded-2xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center text-xl flex-shrink-0">⛺</div>
              <div className="flex-1 min-w-0">
                <p className={`font-bold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{camp.village}</p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{camp.date} • {camp.expectedParticipants} expected</p>
                <div className="flex gap-1 mt-1">
                  {camp.specialties.map(s => <span key={s} className={`text-xs px-2 py-0.5 rounded-full ${isDark ? 'bg-purple-900/40 text-purple-400' : 'bg-purple-100 text-purple-700'}`}>{s}</span>)}
                </div>
              </div>
              <button className="text-xs px-3 py-1.5 bg-purple-600 text-white rounded-lg font-medium">Details</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
