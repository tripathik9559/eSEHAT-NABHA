import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import StatCard from '../components/common/StatCard';
import { DEMO_MEDICINES, DEMO_PHARMACIES } from '../data/demoData';
import RiskBadge from '../components/common/RiskBadge';
import { DEMO_DOCTORS, DEMO_APPOINTMENTS, ANALYTICS_DATA } from '../data/demoData';
import QRCode from 'qrcode.react';

/* ── Symptom Checker ── */
import { DEMO_SYMPTOMS, RISK_ENGINE } from '../data/demoData';

function SymptomChecker({ onBack }) {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const [selected, setSelected] = useState([]);
  const [result, setResult] = useState(null);
  const [step, setStep] = useState('select');
  const [loading, setLoading] = useState(false);

  const toggle = (id) => setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const analyze = async () => {
    if (selected.length === 0) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1800));
    const r = RISK_ENGINE.classify(selected, DEMO_SYMPTOMS);
    setResult(r); setStep('result'); setLoading(false);
  };

  const riskColorMap = {
    high: { card: isDark ? 'bg-red-900/30 border-red-700' : 'bg-red-50 border-red-300', icon: '🔴', title: isDark ? 'text-red-400' : 'text-red-700' },
    moderate: { card: isDark ? 'bg-amber-900/30 border-amber-700' : 'bg-amber-50 border-amber-300', icon: '🟡', title: isDark ? 'text-amber-400' : 'text-amber-700' },
    mild: { card: isDark ? 'bg-emerald-900/30 border-emerald-700' : 'bg-emerald-50 border-emerald-300', icon: '🟢', title: isDark ? 'text-emerald-400' : 'text-emerald-600' },
  };

  if (step === 'result' && result) {
    const rc = riskColorMap[result.level] || riskColorMap.mild;
    return (
      <div className="max-w-2xl mx-auto space-y-5">
        <button onClick={() => { setStep('select'); setResult(null); setSelected([]); }} className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}>← {t('back')}</button>
        <div className={`rounded-2xl border-2 p-6 text-center ${rc.card}`}>
          <div className="text-5xl mb-3">{rc.icon}</div>
          <div className={`text-2xl font-bold mb-2 ${rc.title}`}>{t(result.level)}</div>
          <div className="text-4xl font-bold mb-1" style={{color: result.level==='high'?'#EF4444':result.level==='moderate'?'#F59E0B':'#22C55E'}}>{result.totalWeight} pts</div>
          <p className={`text-sm mt-3 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{result.recommendation}</p>
        </div>
        <div className={`rounded-2xl border p-5 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <h3 className={`font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>🧬 Possible Conditions</h3>
          <div className="space-y-2">
            {result.possibleConditions.map((c, i) => (
              <div key={i} className={`flex items-center justify-between p-3 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <span>{c.urgent ? '⚠️' : 'ℹ️'}</span>
                  <span className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-800'}`}>{c.name}</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${c.probability === 'High' ? (isDark ? 'bg-red-900/40 text-red-400' : 'bg-red-100 text-red-700') : (isDark ? 'bg-amber-900/40 text-amber-400' : 'bg-amber-100 text-amber-700')}`}>{c.probability}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={`rounded-2xl border p-5 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <h3 className={`font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>📋 Symptoms Reported ({selected.length})</h3>
          <div className="flex flex-wrap gap-2">
            {DEMO_SYMPTOMS.filter(s => selected.includes(s.id)).map(s => (
              <span key={s.id} className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-blue-50 text-blue-700'}`}>
                {s.icon} {s.name}
              </span>
            ))}
          </div>
        </div>
        <button className={`w-full py-4 rounded-2xl font-bold text-white text-base transition-all ${result.level === 'high' ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700' : result.level === 'moderate' ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600' : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'} hover:shadow-lg`}>
          {result.action} →
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <button onClick={onBack} className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}>← {t('back')}</button>
      <div className={`rounded-2xl border p-5 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-xl">🔍</div>
          <div>
            <h2 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('checkSymptoms')}</h2>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Select all symptoms you are experiencing</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {DEMO_SYMPTOMS.map(s => {
            const sel = selected.includes(s.id);
            const isHighWeight = s.weight >= 4;
            return (
              <button key={s.id} onClick={() => toggle(s.id)}
                className={`flex items-center gap-2 p-3 rounded-xl border-2 text-sm font-medium text-left transition-all duration-150 ${sel ? 'border-blue-500 bg-blue-500 text-white shadow-md' : isHighWeight ? (isDark ? 'border-red-800 bg-red-900/20 text-gray-300 hover:border-red-600' : 'border-red-200 bg-red-50 text-gray-700 hover:border-red-400') : (isDark ? 'border-gray-700 bg-gray-700/50 text-gray-300 hover:border-gray-500' : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-400')}`}>
                <span className="text-base">{s.icon}</span>
                <span className="text-xs leading-tight">{s.name}</span>
                {isHighWeight && !sel && <span className="ml-auto text-red-400 text-xs">⚠</span>}
              </button>
            );
          })}
        </div>
        {selected.length > 0 && (
          <div className={`mt-4 p-3 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-blue-50'}`}>
            <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-blue-700'}`}>{selected.length} symptom(s) selected. Click Analyze to get AI risk assessment.</p>
          </div>
        )}
      </div>
      <button onClick={analyze} disabled={selected.length === 0 || loading}
        className="w-full py-4 rounded-2xl font-bold text-white text-base bg-gradient-to-r from-blue-600 to-blue-700 disabled:opacity-40 disabled:cursor-not-allowed hover:from-blue-700 hover:to-blue-800 transition-all hover:shadow-lg">
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
            Analyzing symptoms with AI...
          </span>
        ) : `🤖 ${t('aiAnalysis')} →`}
      </button>
    </div>
  );
}

/* ── QR Health Card ── */
function QRHealthCard({ user, onBack }) {
  const { isDark } = useTheme();
  const qrData = JSON.stringify({ id: user?.id || 'PT001', name: user?.name, phone: user?.phone, blood: user?.bloodGroup, platform: 'eSEHAT Nabha' });
  return (
    <div className="max-w-md mx-auto space-y-5">
      <button onClick={onBack} className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}>← Back</button>
      <div className={`rounded-2xl border overflow-hidden ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-5 text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl">🏥</div>
            <div><h3 className="font-bold">eSEHAT Nabha</h3><p className="text-blue-200 text-xs">Digital Health Card</p></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold">{user?.name?.charAt(0) || 'P'}</div>
            <div>
              <h2 className="text-2xl font-bold">{user?.name || 'Harjit Singh'}</h2>
              <p className="text-blue-200 text-sm">ID: {user?.id || 'PT001'} • {user?.bloodGroup || 'B+'}</p>
            </div>
          </div>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-2 gap-3 mb-5">
            {[
              { label: 'Age / Gender', value: `${user?.age || 45} / ${user?.gender || 'Male'}` },
              { label: 'Blood Group', value: user?.bloodGroup || 'B+' },
              { label: 'Village', value: user?.village || 'Nabha' },
              { label: 'Phone', value: user?.phone || '+91 98765 43210' },
            ].map(f => (
              <div key={f.label} className={`p-3 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{f.label}</p>
                <p className={`font-semibold text-sm mt-0.5 ${isDark ? 'text-white' : 'text-gray-900'}`}>{f.value}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center mb-5">
            <div className={`p-3 rounded-2xl ${isDark ? 'bg-white' : 'bg-gray-50'} shadow-inner`}>
              <QRCode value={qrData} size={160} level="H" includeMargin={true} fgColor="#1E3A8A" />
            </div>
          </div>
          <p className={`text-xs text-center mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Scan to instantly retrieve patient health records</p>
          <button className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold hover:from-blue-700 hover:to-blue-800 transition-all">
            📥 Download Health Card PDF
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Doctor List ── */
function DoctorList({ onBack }) {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const filtered = DEMO_DOCTORS.filter(d =>
    (filter === 'all' || (filter === 'available' && d.available) || (filter === 'unavailable' && !d.available)) &&
    (search === '' || d.name.toLowerCase().includes(search.toLowerCase()) || d.specialty.toLowerCase().includes(search.toLowerCase()))
  );
  return (
    <div className="space-y-5">
      <button onClick={onBack} className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}>← {t('back')}</button>
      <div className={`flex flex-col sm:flex-row gap-3`}>
        <div className={`flex-1 flex items-center gap-2 px-4 py-2.5 rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <span className="text-gray-400">🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder={`${t('search')} doctors...`}
            className={`flex-1 outline-none text-sm bg-transparent ${isDark ? 'text-white placeholder-gray-500' : 'text-gray-800 placeholder-gray-400'}`} />
        </div>
        <div className={`flex rounded-xl border overflow-hidden ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          {['all', 'available', 'unavailable'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2.5 text-sm font-medium capitalize transition-colors ${filter === f ? 'bg-blue-600 text-white' : (isDark ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' : 'bg-white text-gray-500 hover:bg-gray-50')}`}>
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-4">
        {filtered.map(doc => (
          <div key={doc.id} className={`rounded-2xl border p-4 sm:p-5 transition-all hover:shadow-md ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold text-white flex-shrink-0 shadow-md ${doc.available ? 'bg-gradient-to-br from-emerald-500 to-emerald-600' : 'bg-gradient-to-br from-gray-400 to-gray-500'}`}>
                {doc.name.charAt(3)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div>
                    <h3 className={`font-bold text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>{doc.name}</h3>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{doc.specialty} • {doc.experience}</p>
                  </div>
                  <span className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium flex-shrink-0 ${doc.available ? (isDark ? 'bg-emerald-900/40 text-emerald-400' : 'bg-emerald-50 text-emerald-700') : doc.status === 'in-consultation' ? (isDark ? 'bg-blue-900/40 text-blue-400' : 'bg-blue-50 text-blue-700') : (isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500')}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${doc.available ? 'bg-emerald-500 animate-pulse' : doc.status === 'in-consultation' ? 'bg-blue-500' : 'bg-gray-400'}`}></span>
                    {doc.status === 'available' ? t('available') : doc.status === 'in-consultation' ? t('busy') : t('unavailable')}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 mt-3 text-sm">
                  <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>⭐ {doc.rating}</span>
                  <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>👥 {doc.patients.toLocaleString()} patients</span>
                  <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>⏱ {doc.avgTime}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {doc.languages.map(l => <span key={l} className={`text-xs px-2 py-0.5 rounded-full ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>{l}</span>)}
                </div>
                <div className="flex gap-2 mt-3">
                  <button className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${doc.available ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 hover:shadow-md' : (isDark ? 'bg-gray-700 text-gray-500' : 'bg-gray-100 text-gray-400')} disabled:cursor-not-allowed`} disabled={!doc.available}>
                    {doc.available ? `📹 ${t('consultNow')}` : `📅 ${doc.nextSlot}`}
                  </button>
                  <button className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                    ₹{doc.consultationFee}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Appointments View ── */
function AppointmentView({ onBack }) {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  useAuth(); // session
  
  return (
    <div className="space-y-5">
      <button onClick={onBack} className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}>← {t('back')}</button>
      <div className="grid gap-4">
        {DEMO_APPOINTMENTS.map(apt => (
          <div key={apt.id} className={`rounded-2xl border p-4 sm:p-5 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
              <div>
                <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{apt.doctorName}</h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{apt.specialty}</p>
              </div>
              <RiskBadge level={apt.riskLevel} />
            </div>
            <div className={`grid grid-cols-2 gap-3 p-3 rounded-xl mb-3 ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
              <div><p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Date & Time</p><p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>{apt.date} • {apt.time}</p></div>
              <div><p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Mode</p><p className={`text-sm font-semibold capitalize ${isDark ? 'text-white' : 'text-gray-800'}`}>{apt.mode === 'video' ? '📹 Video' : '📞 Audio'}</p></div>
              <div><p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Priority</p><p className={`text-sm font-semibold capitalize ${isDark ? 'text-white' : 'text-gray-800'}`}>{apt.priority}</p></div>
              <div><p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Status</p><p className={`text-sm font-semibold capitalize ${apt.status === 'in-progress' ? 'text-blue-500' : apt.status === 'scheduled' ? 'text-emerald-500' : 'text-gray-500'}`}>{apt.status.replace('-', ' ')}</p></div>
            </div>
            <p className={`text-sm p-3 rounded-xl ${isDark ? 'bg-gray-700/50 text-gray-300' : 'bg-blue-50/50 text-gray-600'}`}><span className="font-medium">Symptoms:</span> {apt.symptoms}</p>
            {apt.status === 'scheduled' && (
              <div className="flex gap-2 mt-3">
                <button className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold text-sm hover:shadow-md transition-all">📹 Join Consultation</button>
                <button className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors ${isDark ? 'border-gray-600 text-gray-400 hover:bg-gray-700' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}>Cancel</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Health Records ── */
function HealthRecords({ onBack }) {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  return (
    <div className="space-y-5">
      <button onClick={onBack} className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}>← {t('back')}</button>
      {[
        { icon: '🩺', date: '2024-11-20', doctor: 'Dr. Rajesh Kumar', type: 'Emergency Visit', diagnosis: 'Hypertensive Crisis', meds: ['Amlodipine 5mg', 'Metoprolol 25mg', 'Aspirin 75mg'], risk: 'high' },
        { icon: '📋', date: '2024-10-15', doctor: 'Dr. Rajesh Kumar', type: 'Follow-up', diagnosis: 'Hypertension Stage 2', meds: ['Amlodipine 5mg', 'Losartan 50mg'], risk: 'moderate' },
        { icon: '💉', date: '2024-09-08', doctor: 'Dr. Gurdeep Kaur', type: 'Cardiology Consult', diagnosis: 'ECG Normal — Stress Related', meds: ['Metoprolol 12.5mg'], risk: 'mild' },
      ].map((r, i) => (
        <div key={i} className={`rounded-2xl border p-5 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-start justify-between gap-3 flex-wrap mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${isDark ? 'bg-gray-700' : 'bg-blue-50'}`}>{r.icon}</div>
              <div><h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{r.type}</h3><p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{r.date} • {r.doctor}</p></div>
            </div>
            <RiskBadge level={r.risk} />
          </div>
          <div className={`p-3 rounded-xl mb-3 ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <p className={`text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Diagnosis</p>
            <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{r.diagnosis}</p>
          </div>
          <div>
            <p className={`text-xs mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Prescribed Medicines</p>
            <div className="flex flex-wrap gap-1.5">
              {r.meds.map(m => <span key={m} className={`text-xs px-2.5 py-1 rounded-full font-medium ${isDark ? 'bg-blue-900/40 text-blue-400' : 'bg-blue-100 text-blue-700'}`}>💊 {m}</span>)}
            </div>
          </div>
          <button className={`mt-3 w-full py-2 rounded-xl text-sm font-medium border transition-colors ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>📥 Download Prescription PDF</button>
        </div>
      ))}
    </div>
  );
}

/* ── Medicine Tracker ── */
function MedicineTracker({ onBack }) {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const filtered = DEMO_MEDICINES.filter(m => search === '' || m.name.toLowerCase().includes(search.toLowerCase()) || m.category.toLowerCase().includes(search.toLowerCase()));
  const statusConfig = { adequate: { dot: 'bg-emerald-500', text: isDark ? 'text-emerald-400' : 'text-emerald-700', bg: isDark ? 'bg-emerald-900/30 text-emerald-400' : 'bg-emerald-50 text-emerald-700' }, low: { dot: 'bg-amber-500', text: isDark ? 'text-amber-400' : 'text-amber-700', bg: isDark ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-50 text-amber-700' }, critical: { dot: 'bg-red-500 animate-pulse', text: isDark ? 'text-red-400' : 'text-red-700', bg: isDark ? 'bg-red-900/30 text-red-400' : 'bg-red-50 text-red-700' }, out: { dot: 'bg-gray-500', text: isDark ? 'text-gray-400' : 'text-gray-600', bg: isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600' } };
  return (
    <div className="space-y-5">
      <button onClick={onBack} className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}>← {t('back')}</button>
      <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <span className="text-gray-400">🔍</span>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search medicines..." className={`flex-1 outline-none text-sm bg-transparent ${isDark ? 'text-white placeholder-gray-500' : 'text-gray-800 placeholder-gray-400'}`} />
      </div>
      <div className="grid gap-3">
        {filtered.map(med => {
          const sc = statusConfig[med.status] || statusConfig.adequate;
          const pct = Math.round((med.stock / (med.minStock * 3)) * 100);
          const pharmacy = DEMO_PHARMACIES.find(p => p.id === med.pharmacyId);
          return (
            <div key={med.id} className={`rounded-2xl border p-4 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{med.name}</h3>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{med.category} • {pharmacy?.name}</p>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${sc.bg}`}>
                  {med.status === 'adequate' ? '✓ In Stock' : med.status === 'low' ? '⚠ Low Stock' : med.status === 'critical' ? '🔴 Critical' : '✗ Out of Stock'}
                </span>
              </div>
              <div className="flex items-center gap-3 mb-1">
                <div className={`flex-1 h-2 rounded-full overflow-hidden ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <div className={`h-full rounded-full transition-all ${med.status === 'adequate' ? 'bg-emerald-500' : med.status === 'low' ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${Math.min(pct, 100)}%` }}></div>
                </div>
                <span className={`text-sm font-bold ${sc.text}`}>{med.stock} units</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>Min: {med.minStock} • ₹{med.unitPrice}/unit</span>
                <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>Expires: {med.expiryDate}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Main Patient Portal ── */
export default function PatientPortal({ activePage, onNavigate }) {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const stats = ANALYTICS_DATA.dashboardStats;

  if (activePage === 'symptom-checker') return <SymptomChecker onBack={() => onNavigate('home')} />;
  if (activePage === 'qr-card') return <QRHealthCard user={user} onBack={() => onNavigate('home')} />;
  if (activePage === 'doctors') return <DoctorList onBack={() => onNavigate('home')} />;
  if (activePage === 'appointments') return <AppointmentView onBack={() => onNavigate('home')} />;
  if (activePage === 'health-records') return <HealthRecords onBack={() => onNavigate('home')} />;
  if (activePage === 'medicines') return <MedicineTracker onBack={() => onNavigate('home')} />;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-teal-700 rounded-2xl p-5 sm:p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white"></div>
          <div className="absolute bottom-0 left-1/3 w-32 h-32 rounded-full bg-teal-300"></div>
        </div>
        <div className="relative z-10">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-blue-100 text-sm font-medium">ਸਤ ਸ੍ਰੀ ਅਕਾਲ 🙏</p>
              <h2 className="text-2xl sm:text-3xl font-bold mt-1">Hello, {user?.name?.split(' ')[0] || 'Harjit'}!</h2>
              <p className="text-blue-100 mt-1 text-sm">How are you feeling today?</p>
            </div>
            <div className={`px-3 py-1.5 rounded-xl text-xs font-medium ${user?.riskLevel === 'high' ? 'bg-red-500/30 text-red-100' : user?.riskLevel === 'moderate' ? 'bg-amber-500/30 text-amber-100' : 'bg-emerald-500/30 text-emerald-100'}`}>
              Health Status: {user?.riskLevel === 'high' ? '🔴 High' : user?.riskLevel === 'moderate' ? '🟡 Moderate' : '🟢 Good'}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-5">
            {[
              { label: 'Next Appointment', value: 'Today 9:00 AM', icon: '📅' },
              { label: 'Blood Group', value: user?.bloodGroup || 'B+', icon: '🩸' },
              { label: 'Last Visit', value: '5 days ago', icon: '📋' },
            ].map(f => (
              <div key={f.label} className="bg-white/10 backdrop-blur rounded-xl p-3 text-center">
                <div className="text-xl mb-1">{f.icon}</div>
                <div className="font-bold text-sm">{f.value}</div>
                <div className="text-blue-200 text-xs">{f.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('quickActions')}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { icon: '🔍', label: t('symptoms'), sub: '2-3 min', page: 'symptom-checker', color: 'from-blue-500 to-blue-600' },
            { icon: '👨‍⚕️', label: t('doctors'), sub: `${DEMO_DOCTORS.filter(d=>d.available).length} available`, page: 'doctors', color: 'from-emerald-500 to-emerald-600' },
            { icon: '📅', label: t('appointments'), sub: '2 upcoming', page: 'appointments', color: 'from-purple-500 to-purple-600' },
            { icon: '📋', label: t('records'), sub: '3 records', page: 'health-records', color: 'from-orange-500 to-orange-600' },
            { icon: '💊', label: t('medicines'), sub: '10 tracked', page: 'medicines', color: 'from-rose-500 to-rose-600' },
            { icon: '🪪', label: 'QR Card', sub: 'Health ID', page: 'qr-card', color: 'from-teal-500 to-teal-600' },
          ].map(q => (
            <button key={q.page} onClick={() => onNavigate(q.page)} className={`rounded-2xl p-4 text-left bg-gradient-to-br ${q.color} text-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.98]`}>
              <div className="text-2xl mb-2">{q.icon}</div>
              <div className="font-bold text-sm">{q.label}</div>
              <div className="text-white/70 text-xs mt-0.5">{q.sub}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard icon="🏥" label="Total Consultations" value="2,847" sub="Platform-wide" color="blue" />
        <StatCard icon="👨‍⚕️" label="Doctors Online" value={`${stats.doctorsAvailable}/${stats.doctorsTotal}`} sub="Civil Hospital" color="green" trend={12} />
        <StatCard icon="🏘️" label="Villages Covered" value={stats.villagesServed} sub="Nabha district" color="purple" />
        <StatCard icon="🚨" label="Emergencies Today" value={stats.emergenciesToday} sub="High priority" color="red" />
      </div>

      {/* Available Doctors */}
      <div>
        <h3 className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Available Doctors</h3>
        <div className="grid gap-3">
          {DEMO_DOCTORS.filter(d => d.available).slice(0, 3).map(doc => (
            <div key={doc.id} onClick={() => onNavigate('doctors')} className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer hover:shadow-md transition-all ${isDark ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-blue-200'}`}>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-md">{doc.name.charAt(4)}</div>
              <div className="flex-1 min-w-0">
                <h4 className={`font-bold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{doc.name}</h4>
                <p className={`text-sm truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{doc.specialty} • ⭐ {doc.rating}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <div className={`text-xs px-2 py-1 rounded-full ${isDark ? 'bg-emerald-900/40 text-emerald-400' : 'bg-emerald-50 text-emerald-700'}`}>Available</div>
                <div className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>₹{doc.consultationFee}</div>
              </div>
            </div>
          ))}
          <button onClick={() => onNavigate('doctors')} className={`py-3 rounded-2xl text-sm font-semibold border-2 border-dashed transition-colors ${isDark ? 'border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-300' : 'border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-600'}`}>
            View all {DEMO_DOCTORS.length} doctors →
          </button>
        </div>
      </div>
    </div>
  );
}
