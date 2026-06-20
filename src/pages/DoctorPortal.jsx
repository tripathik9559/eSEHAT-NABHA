import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import StatCard from '../components/common/StatCard';
import RiskBadge from '../components/common/RiskBadge';
import { DEMO_APPOINTMENTS } from '../data/demoData';

/* ── Priority Queue ── */
function PriorityQueue({ onBack }) {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const sorted = [...DEMO_APPOINTMENTS].sort((a, b) => {
    const order = { high: 0, moderate: 1, mild: 2 };
    return (order[a.riskLevel] ?? 3) - (order[b.riskLevel] ?? 3);
  });
  const priorityConfig = {
    high: { bar: 'bg-red-500', badge: 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400 border border-red-300 dark:border-red-800', label: '🔴 Immediate' },
    moderate: { bar: 'bg-amber-400', badge: 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-800', label: '🟡 Medium' },
    mild: { bar: 'bg-emerald-500', badge: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800', label: '🟢 Standard' },
  };
  return (
    <div className="space-y-5">
      <button onClick={onBack} className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}>← {t('back')}</button>
      <div className={`rounded-2xl border p-4 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-xl shadow-md">🔢</div>
          <div><h2 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>Smart Priority Queue</h2><p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>AI-sorted by risk level — high risk seen first</p></div>
        </div>
        <div className="flex gap-3 text-sm">
          <div className={`flex-1 text-center p-2 rounded-xl ${isDark ? 'bg-red-900/30' : 'bg-red-50'}`}><div className="font-bold text-red-500 text-xl">{sorted.filter(a => a.riskLevel === 'high').length}</div><div className={isDark ? 'text-gray-400' : 'text-gray-600'}>High Risk</div></div>
          <div className={`flex-1 text-center p-2 rounded-xl ${isDark ? 'bg-amber-900/30' : 'bg-amber-50'}`}><div className="font-bold text-amber-500 text-xl">{sorted.filter(a => a.riskLevel === 'moderate').length}</div><div className={isDark ? 'text-gray-400' : 'text-gray-600'}>Moderate</div></div>
          <div className={`flex-1 text-center p-2 rounded-xl ${isDark ? 'bg-emerald-900/30' : 'bg-emerald-50'}`}><div className="font-bold text-emerald-500 text-xl">{sorted.filter(a => a.riskLevel === 'mild').length}</div><div className={isDark ? 'text-gray-400' : 'text-gray-600'}>Standard</div></div>
        </div>
      </div>
      <div className="space-y-3">
        {sorted.map((apt, idx) => {
          const pc = priorityConfig[apt.riskLevel] || priorityConfig.mild;
          return (
            <div key={apt.id} className={`rounded-2xl border overflow-hidden transition-all hover:shadow-md ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`h-1 ${pc.bar}`}></div>
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 text-white shadow ${apt.riskLevel === 'high' ? 'bg-red-500' : apt.riskLevel === 'moderate' ? 'bg-amber-500' : 'bg-emerald-500'}`}>#{idx + 1}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div>
                        <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{apt.patientName}</h3>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{apt.village} • {apt.time}</p>
                      </div>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium flex-shrink-0 ${pc.badge}`}>{pc.label}</span>
                    </div>
                    <p className={`text-sm mt-2 p-2 rounded-lg ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-50 text-gray-600'}`}>"{apt.symptoms}"</p>
                    <div className="flex gap-2 mt-3">
                      <button className={`flex-1 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:shadow-md ${apt.mode === 'video' ? 'bg-gradient-to-r from-blue-600 to-blue-700' : 'bg-gradient-to-r from-emerald-600 to-emerald-700'}`}>
                        {apt.mode === 'video' ? '📹 Start Video Call' : '📞 Start Audio Call'}
                      </button>
                      <button className={`px-3 py-2 rounded-xl text-sm border transition-colors ${isDark ? 'border-gray-600 text-gray-400 hover:bg-gray-700' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}>View</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Prescription Pad ── */
function PrescriptionPad({ onBack }) {
  const { isDark } = useTheme();
  const [patient, setPatient] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [medicines, setMedicines] = useState([{ name: '', dose: '', freq: '', duration: '' }]);
  const [notes, setNotes] = useState('');
  const [saved, setSaved] = useState(false);
  const addMed = () => setMedicines([...medicines, { name: '', dose: '', freq: '', duration: '' }]);
  const removeMed = (i) => setMedicines(medicines.filter((_, idx) => idx !== i));
  const updateMed = (i, f, v) => { const m = [...medicines]; m[i][f] = v; setMedicines(m); };
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 3000); };
  const inputCls = `w-full px-3 py-2 rounded-xl border text-sm outline-none transition-colors ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500 focus:border-blue-500' : 'bg-white border-gray-200 text-gray-800 placeholder-gray-400 focus:border-blue-500'}`;
  const labelCls = `block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`;
  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <button onClick={onBack} className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}>← Back</button>
      {saved && <div className="bg-emerald-500 text-white p-3 rounded-xl text-center font-medium">✓ Prescription saved and sent to patient</div>}
      <div className={`rounded-2xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-5 rounded-t-2xl text-white">
          <div className="flex items-center justify-between">
            <div><h2 className="text-xl font-bold">Digital Prescription</h2><p className="text-emerald-100 text-sm">eSEHAT Nabha • Civil Hospital</p></div>
            <div className="text-right text-sm text-emerald-100"><div>Date: {new Date().toLocaleDateString('en-IN')}</div><div>Dr. Rajesh Kumar</div><div>General Medicine</div></div>
          </div>
        </div>
        <div className="p-5 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className={labelCls}>Patient Name / ID</label><input className={inputCls} placeholder="Enter patient name..." value={patient} onChange={e => setPatient(e.target.value)} /></div>
            <div><label className={labelCls}>Diagnosis</label><input className={inputCls} placeholder="Primary diagnosis..." value={diagnosis} onChange={e => setDiagnosis(e.target.value)} /></div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2"><label className={labelCls}>Medicines Prescribed</label><button onClick={addMed} className="text-xs text-blue-500 hover:text-blue-600 font-medium">+ Add Medicine</button></div>
            <div className="space-y-2">
              {medicines.map((m, i) => (
                <div key={i} className={`grid grid-cols-4 gap-2 p-3 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <input className={inputCls} placeholder="Medicine" value={m.name} onChange={e => updateMed(i, 'name', e.target.value)} />
                  <input className={inputCls} placeholder="Dose" value={m.dose} onChange={e => updateMed(i, 'dose', e.target.value)} />
                  <input className={inputCls} placeholder="Frequency" value={m.freq} onChange={e => updateMed(i, 'freq', e.target.value)} />
                  <div className="flex gap-1">
                    <input className={`${inputCls} flex-1`} placeholder="Days" value={m.duration} onChange={e => updateMed(i, 'duration', e.target.value)} />
                    {i > 0 && <button onClick={() => removeMed(i)} className="text-red-400 hover:text-red-500 px-1">✕</button>}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div><label className={labelCls}>Additional Notes</label><textarea className={`${inputCls} h-20 resize-none`} placeholder="Instructions, dietary advice, follow-up..." value={notes} onChange={e => setNotes(e.target.value)} /></div>
          <div className="flex gap-3">
            <button onClick={save} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold hover:shadow-lg transition-all">💾 Save & Send Prescription</button>
            <button className={`px-4 py-3 rounded-xl border font-medium text-sm transition-colors ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>📥 PDF</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Doctor Home ── */
export default function DoctorPortal({ activePage, onNavigate }) {
  const { user } = useAuth();
  const { isDark } = useTheme();
  useLanguage(); // i18n context

  if (activePage === 'queue') return <PriorityQueue onBack={() => onNavigate('home')} />;
  if (activePage === 'prescription') return <PrescriptionPad onBack={() => onNavigate('home')} />;
  if (activePage === 'appointments') return (
    <div className="space-y-5">
      <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Today's Appointments</h2>
      <div className="grid gap-4">
        {DEMO_APPOINTMENTS.map(apt => (
          <div key={apt.id} className={`rounded-2xl border p-4 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex items-start justify-between gap-3 mb-3">
              <div><h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{apt.patientName}</h3><p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{apt.village} • {apt.time}</p></div>
              <RiskBadge level={apt.riskLevel} />
            </div>
            <p className={`text-sm mb-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{apt.symptoms}</p>
            <div className="flex gap-2">
              <button className="flex-1 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-sm font-semibold">
                {apt.mode === 'video' ? '📹 Start Call' : '📞 Start Call'}
              </button>
              <button onClick={() => onNavigate('prescription')} className={`px-4 py-2 rounded-xl text-sm border ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>📝 Rx</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const highRisk = DEMO_APPOINTMENTS.filter(a => a.riskLevel === 'high').length;
  const inProgress = DEMO_APPOINTMENTS.filter(a => a.status === 'in-progress').length;

  return (
    <div className="space-y-6">
      {/* Doctor Welcome */}
      <div className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 rounded-2xl p-5 sm:p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full bg-white"></div>
          <div className="absolute bottom-0 left-1/4 w-28 h-28 rounded-full bg-teal-200"></div>
        </div>
        <div className="relative z-10">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-emerald-100 text-sm">Good morning, Doctor</p>
              <h2 className="text-2xl font-bold">{user?.name || 'Dr. Rajesh Kumar'}</h2>
              <p className="text-emerald-100 text-sm">{user?.specialty || 'General Medicine'} • Civil Hospital Nabha</p>
            </div>
            <div className="flex items-center gap-2 bg-emerald-500/30 px-4 py-2 rounded-xl">
              <span className="w-2.5 h-2.5 bg-emerald-300 rounded-full animate-pulse"></span>
              <span className="font-semibold">On Duty</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-5">
            <div className="bg-white/10 backdrop-blur rounded-xl p-3 text-center"><div className="text-2xl font-bold">{DEMO_APPOINTMENTS.length}</div><div className="text-emerald-100 text-xs">Today's Patients</div></div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-3 text-center"><div className="text-2xl font-bold text-red-300">{highRisk}</div><div className="text-emerald-100 text-xs">High Risk</div></div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-3 text-center"><div className="text-2xl font-bold text-yellow-300">{inProgress}</div><div className="text-emerald-100 text-xs">In Progress</div></div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard icon="📅" label="Today's Queue" value={DEMO_APPOINTMENTS.length} sub="Appointments" color="green" />
        <StatCard icon="🔴" label="High Risk" value={highRisk} sub="Immediate attention" color="red" />
        <StatCard icon="⏳" label="Avg Consult" value="12 min" sub="Per patient" color="blue" />
        <StatCard icon="✅" label="Completed" value="3" sub="This morning" color="teal" />
      </div>

      {/* Priority Queue Preview */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Priority Queue</h3>
          <button onClick={() => onNavigate('queue')} className="text-sm text-emerald-600 dark:text-emerald-400 font-medium hover:underline">View full queue →</button>
        </div>
        <div className="space-y-2">
          {[...DEMO_APPOINTMENTS].sort((a, b) => ({ high: 0, moderate: 1, mild: 2 }[a.riskLevel] - { high: 0, moderate: 1, mild: 2 }[b.riskLevel])).slice(0, 3).map((apt, idx) => (
            <div key={apt.id} className={`flex items-center gap-4 p-4 rounded-2xl border transition-all hover:shadow-sm ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white flex-shrink-0 ${apt.riskLevel === 'high' ? 'bg-red-500' : apt.riskLevel === 'moderate' ? 'bg-amber-500' : 'bg-emerald-500'}`}>#{idx+1}</div>
              <div className="flex-1 min-w-0">
                <p className={`font-semibold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{apt.patientName}</p>
                <p className={`text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{apt.symptoms?.slice(0, 45)}...</p>
              </div>
              <RiskBadge level={apt.riskLevel} size="sm" />
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: '🔢', label: 'Priority Queue', page: 'queue', color: 'from-blue-500 to-blue-600' },
            { icon: '📝', label: 'Prescription', page: 'prescription', color: 'from-emerald-500 to-emerald-600' },
            { icon: '📅', label: 'Appointments', page: 'appointments', color: 'from-purple-500 to-purple-600' },
            { icon: '👥', label: 'Patient History', page: 'patients', color: 'from-orange-500 to-orange-600' },
          ].map(a => (
            <button key={a.page} onClick={() => onNavigate(a.page)} className={`bg-gradient-to-br ${a.color} text-white rounded-2xl p-4 text-center hover:shadow-lg hover:-translate-y-0.5 transition-all`}>
              <div className="text-2xl mb-2">{a.icon}</div>
              <div className="font-semibold text-sm">{a.label}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
