import { useState, useEffect } from 'react'
import { Search, Pill, MapPin, Package } from 'lucide-react'
import { listMedicines, listPharmacies } from '../../services/api'
import { PageHeader, EmptyState } from '../../components/common/index'
import { STOCK_COLORS, debounce } from '../../utils/helpers'

export default function Medicines() {
  const [medicines,   setMedicines]   = useState([])
  const [pharmacies,  setPharmacies]  = useState([])
  const [search,      setSearch]      = useState('')
  const [filterStock, setFilterStock] = useState('all')
  const [loading,     setLoading]     = useState(true)

  useEffect(() => {
    Promise.all([listMedicines(), listPharmacies()])
      .then(([mRes, pRes]) => { setMedicines(mRes.data); setPharmacies(pRes.data) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const doSearch = debounce(async (q) => {
    try {
      const res = await listMedicines({ search: q })
      setMedicines(res.data)
    } catch {}
  }, 400)

  function handleSearch(e) {
    const v = e.target.value
    setSearch(v)
    doSearch(v)
  }

  const filtered = filterStock === 'all'
    ? medicines
    : medicines.filter(m => m.stock_status === filterStock)

  const stockLabel = { available: 'In Stock', low: 'Low Stock', out: 'Out of Stock' }

  return (
    <div className="space-y-6">
      <PageHeader title="Medicine Finder" subtitle="Search medicine availability across Nabha pharmacies" />

      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" value={search} onChange={handleSearch}
            placeholder="Search medicines…" className="input pl-10" />
        </div>
        <div className="flex gap-1.5">
          {[['all', 'All'], ['available', 'In Stock'], ['low', 'Low'], ['out', 'Out']].map(([id, lbl]) => (
            <button key={id} onClick={() => setFilterStock(id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all
                ${filterStock === id ? 'bg-brand-600 text-white' : 'bg-gray-100 dark:bg-dark-border text-gray-500 hover:bg-gray-200'}`}>
              {lbl}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Available', count: medicines.filter(m => m.stock_status === 'available').length, color: 'text-green-600' },
          { label: 'Low Stock', count: medicines.filter(m => m.stock_status === 'low').length,       color: 'text-amber-600' },
          { label: 'Out of Stock',count: medicines.filter(m => m.stock_status === 'out').length,      color: 'text-red-600'   },
        ].map(({ label, count, color }) => (
          <div key={label} className="card card-hover p-4 text-center">
            <p className={`text-2xl font-bold ${color}`}>{count}</p>
            <p className="text-xs text-gray-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Medicine list */}
      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading…</div>
      ) : filtered.length === 0 ? (
        <div className="card">
          <EmptyState icon={Pill} title="No medicines found" description="Try a different search" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filtered.map(med => {
            const sc = STOCK_COLORS[med.stock_status] || STOCK_COLORS.available
            return (
              <div key={med.id} className="card card-hover p-4 flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-dark-border flex items-center justify-center flex-shrink-0">
                  <Pill size={18} className="text-brand-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{med.name}</p>
                      <p className="text-xs text-gray-500">{med.category}</p>
                    </div>
                    <span className={`text-xs font-semibold ${sc.text} whitespace-nowrap`}>
                      {sc.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <MapPin size={11} /> {med.pharmacy?.name}
                    </span>
                    <span className="flex items-center gap-1">
                      <Package size={11} /> {med.quantity} units
                    </span>
                    {med.price > 0 && <span>₹{med.price}</span>}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Pharmacies map-like section */}
      <div>
        <h2 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">Nearby Pharmacies</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {pharmacies.map(ph => (
            <div key={ph.id} className="card p-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                  <MapPin size={16} className="text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-900 dark:text-white">{ph.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{ph.address}</p>
                  <a href={`tel:${ph.contact}`} className="text-xs text-brand-600 hover:underline mt-1 block">
                    📞 {ph.contact}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
