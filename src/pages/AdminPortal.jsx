import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import StatCard from '../components/common/StatCard';

import { DEMO_DOCTORS, DEMO_VILLAGES, ANALYTICS_DATA } from '../data/demoData';

/* ─── Mini Bar Chart (SVG) ─── */
function BarChart({ data, height = 120, colorFn }) {
  const { isDark } = useTheme();
  const max = Math.max(...data.map(d => d.value));
  const W = 300, H = height, pad = 10, barW = (W - pad * 2) / data.length - 4;
  return (
    <svg viewBox={`0 0 ${W} ${H + 24}`} className="w-full" style={{ maxHeight: H + 24 }}>
      {data.map((d, i) => {
        const bh = max > 0 ? ((d.value / max) * (H - 20)) : 0;
        const x = pad + i * ((W - pad * 2) / data.length) + 2;
        const y = H - bh;
        const color = colorFn ? colorFn(d, i) : '#3B82F6';
        return (
          <g key={i}>
            <rect x={x} y={y} width={barW} height={bh} rx={3} fill={color} fillOpacity={0.85} />
            <text x={x + barW / 2} y={H + 14} textAnchor="middle"
              className="text-xs" style={{ fontSize: 8, fill: isDark ? '#9CA3AF' : '#6B7280' }}>
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ─── Donut Chart (SVG) ─── */
function DonutChart({ segments, size = 100 }) {
  const total = segments.reduce((s, d) => s + d.value, 0);
  let cumAngle = -90;
  const cx = size / 2, cy = size / 2, r = size * 0.38, inner = size * 0.24;
  const toXY = (angle, radius) => {
    const rad = (angle * Math.PI) / 180;
    return [cx + radius * Math.cos(rad), cy + radius * Math.sin(rad)];
  };
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
      {segments.map((seg, i) => {
        const angle = (seg.value / total) * 360;
        const start = cumAngle;
        const end = cumAngle + angle - 1;
        cumAngle += angle;
        const [x1, y1] = toXY(start, r);
        const [x2, y2] = toXY(end, r);
        const [ix1, iy1] = toXY(end, inner);
        const [ix2, iy2] = toXY(start, inner);
        const large = angle > 180 ? 1 : 0;
        return (
          <path key={i}
            d={`M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} L ${ix1} ${iy1} A ${inner} ${inner} 0 ${large} 0 ${ix2} ${iy2} Z`}
            fill={seg.color} />
        );
      })}
      <circle cx={cx} cy={cy} r={inner - 2} fill="none" />
    </svg>
  );
}

/* ─── Line Sparkline (SVG) ─── */
function Sparkline({ data, color = '#3B82F6', height = 50 }) {
  const max = Math.max(...data); const min = Math.min(...data);
  const W = 200; const H = height;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * W;
    const y = H - ((v - min) / (max - min + 1)) * (H - 8) - 4;
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts.split(' ').pop().split(',')[0]} cy={pts.split(' ').pop().split(',')[1]} r="3" fill={color} />
    </svg>
  );
}

/* ─── Doctor Workload Dashboard ─── */
function WorkloadDashboard({ onBack }) {
  const { isDark } = useTheme();
  return (
    <div className="space-y-5">
      <button onClick={onBack} className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}>← Back</button>
      <div className="grid gap-4">
        {DEMO_DOCTORS.map(doc => {
          const load = doc.workload;
          const barColor = load >= 90 ? '#EF4444' : load >= 70 ? '#F59E0B' : '#22C55E';
          const statusBg = load >= 90 ? (isDark ? 'bg-red-900/30 text-red-400' : 'bg-red-50 text-red-700') : load >= 70 ? (isDark ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-50 text-amber-700') : (isDark ? 'bg-emerald-900/30 text-emerald-400' : 'bg-emerald-50 text-emerald-700');
          return (
            <div key={doc.id} className={`rounded-2xl border p-4 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0 ${doc.status === 'available' ? 'bg-gradient-to-br from-emerald-500 to-emerald-600' : doc.status === 'in-consultation' ? 'bg-gradient-to-br from-blue-500 to-blue-600' : 'bg-gradient-to-br from-gray-400 to-gray-500'}`}>
                    {doc.name.charAt(4)}
                  </div>
                  <div>
                    <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{doc.name}</h3>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{doc.specialty}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold`} style={{ color: barColor }}>{load}%</div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusBg}`}>
                    {load >= 90 ? 'Overloaded' : load >= 70 ? 'High Load' : 'Manageable'}
                  </span>
                </div>
              </div>
              <div className={`h-3 rounded-full overflow-hidden mb-2 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <div className="h-full rounded-full transition-all duration-700" style={{ width: `${load}%`, backgroundColor: barColor }}></div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                {[
                  { label: 'Today', value: doc.consultationsToday },
                  { label: 'Avg Time', value: doc.avgTime },
                  { label: 'Status', value: doc.status === 'available' ? '🟢 Ready' : doc.status === 'in-consultation' ? '🔵 Busy' : '⚫ Off' },
                ].map(f => (
                  <div key={f.label} className={`p-2 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{f.value}</div>
                    <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{f.label}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Village Map View ─── */
function VillageView({ onBack }) {
  const { isDark } = useTheme();
  const [filter, setFilter] = useState('all');
  const filtered = DEMO_VILLAGES.filter(v => filter === 'all' || v.status === filter);
  const statusCfg = {
    active: { dot: 'bg-emerald-500', badge: isDark ? 'bg-emerald-900/40 text-emerald-400' : 'bg-emerald-100 text-emerald-700', label: 'Active' },
    maintenance: { dot: 'bg-amber-500', badge: isDark ? 'bg-amber-900/40 text-amber-400' : 'bg-amber-100 text-amber-700', label: 'Maintenance' },
    offline: { dot: 'bg-red-500 animate-pulse', badge: isDark ? 'bg-red-900/40 text-red-400' : 'bg-red-100 text-red-700', label: 'Offline' },
  };
  return (
    <div className="space-y-5">
      <button onClick={onBack} className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}>← Back</button>
      <div className={`flex gap-1 p-1 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
        {['all', 'active', 'maintenance', 'offline'].map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`flex-1 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${filter === f ? 'bg-blue-600 text-white shadow' : (isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700')}`}>{f}</button>
        ))}
      </div>
      <div className="grid gap-3">
        {filtered.map((v, i) => {
          const sc = statusCfg[v.status] || statusCfg.active;
          return (
            <div key={i} className={`rounded-2xl border p-4 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${isDark ? 'bg-gray-700' : 'bg-blue-50'}`}>🏘️</div>
                  <div>
                    <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{v.name}</h3>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{v.distance} from Nabha</p>
                  </div>
                </div>
                <span className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium ${sc.badge}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`}></span>{sc.label}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { icon: '👥', label: 'Patients', value: v.patients },
                  { icon: '👨‍⚕️', label: 'Doctors', value: v.doctors },
                  { icon: v.emergencyLevel === 'high' ? '🔴' : v.emergencyLevel === 'medium' ? '🟡' : '🟢', label: 'Emergency', value: v.emergencyLevel },
                ].map(f => (
                  <div key={f.label} className={`p-2 rounded-xl text-center ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="text-base mb-0.5">{f.icon}</div>
                    <div className={`font-bold text-sm capitalize ${isDark ? 'text-white' : 'text-gray-900'}`}>{f.value}</div>
                    <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{f.label}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Analytics Dashboard ─── */
function AnalyticsDashboard({ onBack }) {
  const { isDark } = useTheme();
  const monthData = ANALYTICS_DATA.consultationsByMonth.map(m => ({ label: m.month, value: m.video + m.audio + m.chat }));
  const riskData = ANALYTICS_DATA.riskDistribution;
  const conditions = ANALYTICS_DATA.commonConditions;
  const village = ANALYTICS_DATA.villageWiseConsultations;

  return (
    <div className="space-y-5">
      <button onClick={onBack} className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}>← Back</button>

      {/* Consultations Over Time */}
      <div className={`rounded-2xl border p-5 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <h3 className={`font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>📈 Monthly Consultations</h3>
        <p className={`text-xs mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Last 6 months — Video + Audio + Chat</p>
        <BarChart data={monthData} height={110}
          colorFn={(d, i) => i === monthData.length - 1 ? '#3B82F6' : isDark ? '#374151' : '#BFDBFE'} />
        <div className="grid grid-cols-3 gap-3 mt-3">
          {ANALYTICS_DATA.consultationsByMonth.slice(-1)[0] && (() => {
            const last = ANALYTICS_DATA.consultationsByMonth.slice(-1)[0];
            return [
              { label: 'Video', value: last.video, color: isDark ? 'text-blue-400' : 'text-blue-600' },
              { label: 'Audio', value: last.audio, color: isDark ? 'text-emerald-400' : 'text-emerald-600' },
              { label: 'Chat', value: last.chat, color: isDark ? 'text-purple-400' : 'text-purple-600' },
            ].map(f => (
              <div key={f.label} className={`p-3 rounded-xl text-center ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className={`font-bold text-lg ${f.color}`}>{f.value}</div>
                <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{f.label} (Nov)</div>
              </div>
            ));
          })()}
        </div>
      </div>

      {/* Risk Distribution */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className={`rounded-2xl border p-5 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <h3 className={`font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>🎯 Risk Distribution</h3>
          <p className={`text-xs mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>All active patients</p>
          <div className="flex gap-4">
            <div className="w-24 h-24 flex-shrink-0">
              <DonutChart segments={riskData.map(r => ({ value: r.count, color: r.color }))} size={96} />
            </div>
            <div className="flex flex-col justify-center gap-2">
              {riskData.map(r => (
                <div key={r.level} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: r.color }}></div>
                  <div>
                    <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{r.count}</span>
                    <span className={`text-xs ml-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{r.level}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Village Demand */}
        <div className={`rounded-2xl border p-5 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <h3 className={`font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>🏘️ Village Demand</h3>
          <p className={`text-xs mb-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Consultations by location</p>
          <div className="space-y-2">
            {village.map((v, i) => {
              const pct = Math.round((v.count / village[0].count) * 100);
              const barClr = v.risk === 'high' ? '#EF4444' : v.risk === 'medium' ? '#F59E0B' : '#22C55E';
              return (
                <div key={v.village} className="flex items-center gap-2">
                  <div className={`text-xs w-16 truncate font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{v.village}</div>
                  <div className={`flex-1 h-2 rounded-full overflow-hidden ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: barClr }}></div>
                  </div>
                  <div className={`text-xs w-8 text-right font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{v.count}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Common Conditions */}
      <div className={`rounded-2xl border p-5 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <h3 className={`font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>🦠 Top Conditions</h3>
        <p className={`text-xs mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Most common diagnoses across the district</p>
        <div className="space-y-3">
          {conditions.map((c, i) => {
            const pct = Math.round((c.cases / conditions[0].cases) * 100);
            const trendClr = c.trend === 'increasing' ? (isDark ? 'text-red-400' : 'text-red-600') : c.trend === 'seasonal' ? (isDark ? 'text-amber-400' : 'text-amber-600') : (isDark ? 'text-emerald-400' : 'text-emerald-600');
            return (
              <div key={c.condition} className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 ${i === 0 ? 'bg-red-500' : i === 1 ? 'bg-orange-500' : i === 2 ? 'bg-amber-500' : 'bg-blue-400'}`}>#{i+1}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className={`text-sm font-medium truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{c.condition}</span>
                    <div className="flex items-center gap-2 ml-2">
                      <span className={`text-xs font-medium capitalize ${trendClr}`}>{c.trend === 'increasing' ? '↑' : c.trend === 'seasonal' ? '~' : '→'} {c.trend}</span>
                      <span className={`text-xs font-bold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{c.cases}</span>
                    </div>
                  </div>
                  <div className={`h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <div className="h-full rounded-full bg-blue-500 transition-all" style={{ width: `${pct}%` }}></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Doctor Availability Summary */}
      <div className={`rounded-2xl border p-5 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>👨‍⚕️ Doctor Availability</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {DEMO_DOCTORS.map(doc => (
            <div key={doc.id} className={`p-3 rounded-xl border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-100'}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${doc.status === 'available' ? 'bg-emerald-500 animate-pulse' : doc.status === 'in-consultation' ? 'bg-blue-500' : 'bg-gray-400'}`}></span>
                <span className={`text-xs font-semibold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{doc.name.replace('Dr. ', '')}</span>
              </div>
              <div className={`text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{doc.specialty}</div>
              <div className={`mt-1.5 h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-gray-600' : 'bg-gray-200'}`}>
                <div className="h-full rounded-full" style={{ width: `${doc.workload}%`, backgroundColor: doc.workload >= 90 ? '#EF4444' : doc.workload >= 70 ? '#F59E0B' : '#22C55E' }}></div>
              </div>
              <div className={`text-xs mt-0.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{doc.workload}% load</div>
            </div>
          ))}
        </div>
        <div className={`mt-4 p-3 rounded-xl flex items-center gap-3 ${isDark ? 'bg-red-900/20 border border-red-800' : 'bg-red-50 border border-red-200'}`}>
          <span className="text-xl">⚠️</span>
          <div>
            <p className={`text-sm font-semibold ${isDark ? 'text-red-400' : 'text-red-700'}`}>Doctor Shortage Alert</p>
            <p className={`text-xs ${isDark ? 'text-red-400/70' : 'text-red-600'}`}>Only 11 of 23 sanctioned posts filled. 2 doctors above 90% workload.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Admin Home ─── */
export default function AdminPortal({ activePage, onNavigate }) {
  const { isDark } = useTheme();
  useLanguage(); // i18n context
  const s = ANALYTICS_DATA.dashboardStats;
  const sparkData = [312, 345, 389, 412, 445, 478];

  if (activePage === 'analytics') return <AnalyticsDashboard onBack={() => onNavigate('home')} />;
  if (activePage === 'workload') return <WorkloadDashboard onBack={() => onNavigate('home')} />;
  if (activePage === 'villages') return <VillageView onBack={() => onNavigate('home')} />;
  if (activePage === 'doctors') return (
    <div className="space-y-5">
      <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Doctor Availability</h2>
      <div className={`p-4 rounded-2xl border-2 ${isDark ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'}`}>
        <div className="flex items-center gap-3">
          <span className="text-2xl">🚨</span>
          <div>
            <p className={`font-bold ${isDark ? 'text-red-400' : 'text-red-700'}`}>Severe Doctor Shortage</p>
            <p className={`text-sm ${isDark ? 'text-red-400/80' : 'text-red-600'}`}>11 of 23 sanctioned posts filled — only 47.8% staffed</p>
          </div>
        </div>
      </div>
      <div className="grid gap-3">
        {DEMO_DOCTORS.map(doc => (
          <div key={doc.id} className={`flex items-center gap-4 p-4 rounded-2xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0 ${doc.status === 'available' ? 'bg-emerald-500' : doc.status === 'in-consultation' ? 'bg-blue-500' : 'bg-gray-400'}`}>{doc.name.charAt(4)}</div>
            <div className="flex-1 min-w-0">
              <p className={`font-semibold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{doc.name}</p>
              <p className={`text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{doc.specialty} • {doc.location}</p>
            </div>
            <div className="text-right">
              <div className={`text-xs px-2 py-1 rounded-full ${doc.status === 'available' ? (isDark ? 'bg-emerald-900/40 text-emerald-400' : 'bg-emerald-100 text-emerald-700') : doc.status === 'in-consultation' ? (isDark ? 'bg-blue-900/40 text-blue-400' : 'bg-blue-100 text-blue-700') : (isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500')}`}>
                {doc.status === 'available' ? '🟢 Available' : doc.status === 'in-consultation' ? '🔵 Busy' : '⚫ Offline'}
              </div>
              <div className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{doc.consultationsToday} today</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Admin Banner */}
      <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 rounded-2xl p-5 sm:p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full bg-white"></div>
          <div className="absolute bottom-0 left-1/3 w-28 h-28 rounded-full bg-yellow-200"></div>
        </div>
        <div className="relative z-10">
          <p className="text-orange-100 text-sm">Punjab Health Department</p>
          <h2 className="text-2xl font-bold mt-1">Rural Health Analytics</h2>
          <p className="text-orange-100 text-sm">Nabha District • 173 Villages</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
            {[
              { icon: '🏥', label: 'Total Consults', value: s.totalConsultations.toLocaleString() },
              { icon: '📅', label: 'Today', value: s.consultationsToday },
              { icon: '👥', label: 'Patients Reg.', value: s.patientsRegistered.toLocaleString() },
              { icon: '🚨', label: 'Emergencies', value: s.emergenciesToday },
            ].map(f => (
              <div key={f.label} className="bg-white/10 backdrop-blur rounded-xl p-3 text-center">
                <div className="text-xl mb-1">{f.icon}</div>
                <div className="font-bold text-lg">{f.value}</div>
                <div className="text-orange-100 text-xs">{f.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard icon="👨‍⚕️" label="Doctors Available" value={`${s.doctorsAvailable}/${s.doctorsTotal}`} sub="Severe shortage" color="red" />
        <StatCard icon="🏘️" label="Villages Served" value={s.villagesServed} sub="Connected" color="blue" trend={8} />
        <StatCard icon="⚡" label="Avg Response" value={s.avgResponseTime} sub="This week" color="green" />
        <StatCard icon="⭐" label="Satisfaction" value={`${s.satisfactionRate}/5`} sub="Patient rating" color="orange" trend={5} />
      </div>

      {/* Consultation Trend Sparkline */}
      <div className={`rounded-2xl border p-5 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Consultation Trend</h3>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Monthly growth (Jun–Nov)</p>
          </div>
          <div className={`px-3 py-1.5 rounded-xl text-xs font-bold ${isDark ? 'bg-emerald-900/40 text-emerald-400' : 'bg-emerald-50 text-emerald-700'}`}>↑ +52.8% YoY</div>
        </div>
        <Sparkline data={sparkData} color="#3B82F6" height={60} />
        <div className="flex justify-between text-xs mt-1">
          {ANALYTICS_DATA.consultationsByMonth.map(m => (
            <span key={m.month} className={isDark ? 'text-gray-500' : 'text-gray-400'}>{m.month}</span>
          ))}
        </div>
      </div>

      {/* Quick Navigation */}
      <div>
        <h3 className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Admin Tools</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: '📊', label: 'Analytics', sub: 'Deep insights', page: 'analytics', color: 'from-blue-500 to-blue-600' },
            { icon: '⚖️', label: 'Dr. Workload', sub: '2 overloaded', page: 'workload', color: 'from-red-500 to-red-600' },
            { icon: '👨‍⚕️', label: 'Dr. Availability', sub: `${s.doctorsAvailable} online`, page: 'doctors', color: 'from-emerald-500 to-emerald-600' },
            { icon: '🏘️', label: 'Villages', sub: '173 tracked', page: 'villages', color: 'from-purple-500 to-purple-600' },
          ].map(a => (
            <button key={a.page} onClick={() => onNavigate(a.page)} className={`bg-gradient-to-br ${a.color} text-white rounded-2xl p-4 text-left hover:shadow-lg hover:-translate-y-0.5 transition-all`}>
              <div className="text-2xl mb-2">{a.icon}</div>
              <div className="font-bold text-sm">{a.label}</div>
              <div className="text-white/70 text-xs">{a.sub}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Critical Alerts */}
      <div>
        <h3 className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Critical Alerts</h3>
        <div className="space-y-2">
          {[
            { icon: '🚨', msg: 'Insulin stock at 8 units — critically low at Nabha Primary Pharmacy', type: 'critical' },
            { icon: '👨‍⚕️', msg: 'Rajpura village has 0 doctors — 156 patients unserved', type: 'critical' },
            { icon: '⚖️', msg: 'Dr. Kavita Verma at 95% workload — needs load balancing', type: 'warning' },
            { icon: '📡', msg: 'Rajpura connectivity offline — 156 patients in offline mode', type: 'warning' },
          ].map((a, i) => (
            <div key={i} className={`flex items-start gap-3 p-3.5 rounded-xl border ${a.type === 'critical' ? (isDark ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200') : (isDark ? 'bg-amber-900/20 border-amber-800' : 'bg-amber-50 border-amber-200')}`}>
              <span className="text-xl flex-shrink-0">{a.icon}</span>
              <p className={`text-sm ${a.type === 'critical' ? (isDark ? 'text-red-300' : 'text-red-700') : (isDark ? 'text-amber-300' : 'text-amber-700')}`}>{a.msg}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
