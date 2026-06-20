import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import StatCard from '../components/common/StatCard';
import { DEMO_MEDICINES, DEMO_PHARMACIES } from '../data/demoData';

function InventoryManager({ onBack }) {
  const { isDark } = useTheme();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [editing, setEditing] = useState(null);
  const [medicines, setMedicines] = useState(DEMO_MEDICINES);
  const filtered = medicines.filter(m =>
    (filter === 'all' || m.status === filter) &&
    (search === '' || m.name.toLowerCase().includes(search.toLowerCase()) || m.category.toLowerCase().includes(search.toLowerCase()))
  );
  const statusCfg = {
    adequate: { label: '✓ Adequate', bg: isDark ? 'bg-emerald-900/40 text-emerald-400' : 'bg-emerald-100 text-emerald-700', bar: 'bg-emerald-500' },
    low:      { label: '⚠ Low',     bg: isDark ? 'bg-amber-900/40 text-amber-400'   : 'bg-amber-100 text-amber-700',   bar: 'bg-amber-500'   },
    critical: { label: '🔴 Critical',bg: isDark ? 'bg-red-900/40 text-red-400'       : 'bg-red-100 text-red-700',       bar: 'bg-red-500'     },
    out:      { label: '✗ Out',      bg: isDark ? 'bg-gray-700 text-gray-400'        : 'bg-gray-100 text-gray-600',     bar: 'bg-gray-400'    },
  };
  const updateStock = (id, newStock) => {
    setMedicines(prev => prev.map(m => m.id === id
      ? { ...m, stock: parseInt(newStock) || 0, status: parseInt(newStock) <= 0 ? 'out' : parseInt(newStock) < m.minStock ? (parseInt(newStock) < m.minStock / 2 ? 'critical' : 'low') : 'adequate' }
      : m
    ));
    setEditing(null);
  };
  return (
    <div className="space-y-5">
      <button onClick={onBack} className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}>← Back</button>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className={`flex-1 flex items-center gap-2 px-4 py-2.5 rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <span className="text-gray-400">🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search medicines..."
            className={`flex-1 outline-none text-sm bg-transparent ${isDark ? 'text-white placeholder-gray-500' : 'text-gray-800 placeholder-gray-400'}`} />
        </div>
        <div className={`flex rounded-xl border overflow-hidden ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          {[['all','All'],['low','Low'],['critical','Critical'],['out','Out']].map(([v, l]) => (
            <button key={v} onClick={() => setFilter(v)} className={`px-3 py-2 text-xs font-medium transition-colors ${filter === v ? 'bg-rose-600 text-white' : (isDark ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' : 'bg-white text-gray-500 hover:bg-gray-50')}`}>{l}</button>
          ))}
        </div>
      </div>
      <div className="grid gap-3">
        {filtered.map(med => {
          const sc = statusCfg[med.status] || statusCfg.adequate;
          const pct = Math.min(Math.round((med.stock / (med.minStock * 3)) * 100), 100);
          return (
            <div key={med.id} className={`rounded-2xl border p-4 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className={`font-bold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{med.name}</h3>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{med.category} • ₹{med.unitPrice}/unit</p>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium flex-shrink-0 ${sc.bg}`}>{sc.label}</span>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <div className={`flex-1 h-2 rounded-full overflow-hidden ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <div className={`h-full rounded-full transition-all ${sc.bar}`} style={{ width: `${pct}%` }}></div>
                </div>
                {editing === med.id ? (
                  <div className="flex items-center gap-1">
                    <input type="number" defaultValue={med.stock} min="0" id={`stock-${med.id}`}
                      className={`w-16 px-2 py-1 rounded-lg border text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`} />
                    <button onClick={() => updateStock(med.id, document.getElementById(`stock-${med.id}`).value)} className="text-emerald-500 text-lg">✓</button>
                    <button onClick={() => setEditing(null)} className="text-gray-400 text-sm">✕</button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{med.stock} units</span>
                    <button onClick={() => setEditing(med.id)} className={`text-xs px-2 py-0.5 rounded ${isDark ? 'text-blue-400 hover:bg-gray-700' : 'text-blue-600 hover:bg-blue-50'}`}>Edit</button>
                  </div>
                )}
              </div>
              <div className="flex justify-between text-xs">
                <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>Min: {med.minStock} • Expires: {med.expiryDate}</span>
                <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>Restocked: {med.lastRestocked}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function PharmacyPortal({ activePage, onNavigate }) {
  useAuth(); // session context
  const { isDark } = useTheme();
  useLanguage(); // i18n context
  const myPharmacy = DEMO_PHARMACIES[0];
  const myMeds = DEMO_MEDICINES.filter(m => m.pharmacyId === 1);
  const inStock = myMeds.filter(m => m.status === 'adequate').length;
  const lowStock = myMeds.filter(m => m.status === 'low').length;
  const critical = myMeds.filter(m => m.status === 'critical').length;
  const outStock = myMeds.filter(m => m.status === 'out').length;

  if (activePage === 'inventory') return <InventoryManager onBack={() => onNavigate('home')} />;

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-rose-600 via-rose-700 to-pink-700 rounded-2xl p-5 sm:p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white"></div>
          <div className="absolute bottom-0 left-1/3 w-28 h-28 rounded-full bg-pink-200"></div>
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-2xl">💊</div>
            <div>
              <p className="text-rose-100 text-sm">Pharmacy Dashboard</p>
              <h2 className="text-2xl font-bold">{myPharmacy.name}</h2>
              <p className="text-rose-100 text-sm">{myPharmacy.address}</p>
            </div>
          </div>
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg w-fit ${myPharmacy.open ? 'bg-emerald-500/30' : 'bg-red-500/30'}`}>
            <span className={`w-2 h-2 rounded-full ${myPharmacy.open ? 'bg-emerald-300 animate-pulse' : 'bg-red-300'}`}></span>
            <span className="text-sm font-semibold">{myPharmacy.open ? 'Open Now' : 'Closed'} • {myPharmacy.hours}</span>
          </div>
          <div className="grid grid-cols-4 gap-2 mt-4">
            {[
              { label: 'Total', value: myMeds.length, color: 'bg-white/10' },
              { label: 'In Stock', value: inStock, color: 'bg-emerald-500/20' },
              { label: 'Low', value: lowStock, color: 'bg-amber-500/20' },
              { label: 'Critical', value: critical + outStock, color: 'bg-red-500/30' },
            ].map(f => (
              <div key={f.label} className={`${f.color} backdrop-blur rounded-xl p-2 text-center`}>
                <div className="font-bold text-xl">{f.value}</div>
                <div className="text-rose-100 text-xs">{f.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard icon="📦" label="Total Medicines" value={myMeds.length} sub="Tracked items" color="blue" />
        <StatCard icon="✅" label="In Stock" value={inStock} sub="Adequate level" color="green" />
        <StatCard icon="⚠️" label="Low Stock" value={lowStock} sub="Need reorder" color="orange" />
        <StatCard icon="🔴" label="Critical / Out" value={critical + outStock} sub="Action needed" color="red" />
      </div>

      {/* Critical Alerts */}
      {(critical > 0 || outStock > 0) && (
        <div className="space-y-2">
          <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>🚨 Requires Immediate Action</h3>
          {myMeds.filter(m => m.status === 'critical' || m.status === 'out').map(med => (
            <div key={med.id} className={`flex items-center gap-3 p-3.5 rounded-xl border ${med.status === 'critical' ? (isDark ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200') : (isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200')}`}>
              <span className="text-xl">{med.status === 'critical' ? '🔴' : '⚫'}</span>
              <div className="flex-1 min-w-0">
                <p className={`font-semibold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{med.name}</p>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{med.stock} units remaining • Min: {med.minStock}</p>
              </div>
              <button className={`text-xs px-3 py-1.5 rounded-lg font-semibold ${med.status === 'critical' ? 'bg-red-500 text-white' : (isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700')}`}>
                Reorder
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div>
        <h3 className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Pharmacy Tools</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: '📦', label: 'Manage Inventory', sub: `${myMeds.length} items`, page: 'inventory', color: 'from-rose-500 to-rose-600' },
            { icon: '🛒', label: 'Pending Orders', sub: '2 requests', page: 'orders', color: 'from-blue-500 to-blue-600' },
            { icon: '📊', label: 'Demand Report', sub: 'Monthly trends', page: 'analytics', color: 'from-purple-500 to-purple-600' },
            { icon: '🔔', label: 'Low Stock Alert', sub: `${lowStock + critical} items`, page: 'inventory', color: 'from-amber-500 to-orange-500' },
          ].map(a => (
            <button key={a.label} onClick={() => onNavigate(a.page)} className={`bg-gradient-to-br ${a.color} text-white rounded-2xl p-4 text-left hover:shadow-lg hover:-translate-y-0.5 transition-all`}>
              <div className="text-2xl mb-2">{a.icon}</div>
              <div className="font-bold text-sm">{a.label}</div>
              <div className="text-white/70 text-xs">{a.sub}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Medicine List Preview */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Medicine Stock</h3>
          <button onClick={() => onNavigate('inventory')} className="text-sm text-rose-600 dark:text-rose-400 font-medium hover:underline">Manage all →</button>
        </div>
        <div className="grid gap-2">
          {myMeds.slice(0, 5).map(med => {
            const pct = Math.min(Math.round((med.stock / (med.minStock * 3)) * 100), 100);
            const barClr = med.status === 'adequate' ? 'bg-emerald-500' : med.status === 'low' ? 'bg-amber-500' : 'bg-red-500';
            return (
              <div key={med.id} className={`flex items-center gap-3 p-3 rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <span className="text-lg">💊</span>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{med.name}</p>
                  <div className={`h-1.5 rounded-full overflow-hidden mt-1 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <div className={`h-full rounded-full ${barClr}`} style={{ width: `${pct}%` }}></div>
                  </div>
                </div>
                <span className={`text-sm font-bold flex-shrink-0 ${med.status === 'adequate' ? (isDark ? 'text-emerald-400' : 'text-emerald-600') : med.status === 'low' ? (isDark ? 'text-amber-400' : 'text-amber-600') : (isDark ? 'text-red-400' : 'text-red-600')}`}>{med.stock}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
