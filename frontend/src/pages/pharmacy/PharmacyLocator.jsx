import { useState, useEffect } from 'react'
import { MapPin, Phone, Clock, Package } from 'lucide-react'
import { listPharmacies, listMedicines } from '../../services/api'
import { PageHeader, EmptyState } from '../../components/common/index'

export default function PharmacyLocator() {
  const [pharmacies, setPharmacies] = useState([])
  const [medicines,  setMedicines]  = useState([])
  const [selected,   setSelected]   = useState(null)
  const [loading,    setLoading]    = useState(true)

  useEffect(() => {
    Promise.all([listPharmacies(), listMedicines()])
      .then(([pRes, mRes]) => { setPharmacies(pRes.data); setMedicines(mRes.data) })
      .catch(() => {}).finally(() => setLoading(false))
  }, [])

  function getMeds(pharmacyId) { return medicines.filter(m => m.pharmacy_id === pharmacyId) }

  const STOCK_DOT = { available: 'bg-green-500', low: 'bg-amber-500', out: 'bg-red-500' }

  return (
    <div className="space-y-6">
      <PageHeader title="Pharmacy Locator" subtitle="Find pharmacies and check medicine availability in Nabha" />

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading…</div>
      ) : pharmacies.length === 0 ? (
        <div className="card"><EmptyState icon={MapPin} title="No pharmacies found" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pharmacies.map(ph => {
            const meds    = getMeds(ph.id)
            const inStock = meds.filter(m => m.stock_status === 'available').length
            const isOpen  = selected?.id === ph.id

            return (
              <div key={ph.id} className={`card overflow-hidden hover:shadow-md transition-all
                ${isOpen ? 'ring-2 ring-brand-500' : ''}`}>
                <div className="p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center flex-shrink-0">
                      <MapPin size={18} className="text-brand-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 dark:text-white">{ph.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{ph.address}</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <a href={`tel:${ph.contact}`} className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-brand-600 transition-colors">
                      <Phone size={13} className="text-gray-400" /> {ph.contact}
                    </a>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <Package size={13} className="text-gray-400" />
                      <span className="text-green-600 font-semibold">{inStock}</span>/{meds.length} medicines in stock
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <Clock size={13} className="text-gray-400" /> Open 8AM – 8PM
                    </div>
                  </div>

                  <button
                    onClick={() => setSelected(isOpen ? null : ph)}
                    className={`w-full mt-4 py-2 rounded-xl text-sm font-medium transition-colors
                      ${isOpen ? 'bg-brand-600 text-white' : 'bg-gray-100 dark:bg-dark-border text-gray-700 dark:text-gray-200 hover:bg-gray-200'}`}>
                    {isOpen ? 'Hide Stock' : 'View Stock'}
                  </button>
                </div>

                {isOpen && (
                  <div className="border-t border-gray-100 dark:border-dark-border p-4 bg-gray-50 dark:bg-dark-border/50">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Medicine Stock</p>
                    {meds.length === 0 ? (
                      <p className="text-xs text-gray-400">No medicines listed</p>
                    ) : (
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {meds.map(med => (
                          <div key={med.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${STOCK_DOT[med.stock_status]}`} />
                              <span className="text-xs text-gray-700 dark:text-gray-200">{med.name}</span>
                            </div>
                            <span className="text-xs text-gray-400">{med.quantity} units · ₹{med.price}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Map placeholder */}
      <div className="card p-5">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <MapPin size={16} className="text-brand-600" /> Nabha Area Map
        </h3>
        <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-dark-border h-64 bg-gray-100 dark:bg-dark-border flex items-center justify-center">
          <div className="text-center text-gray-400">
            <MapPin size={32} className="mx-auto mb-2 opacity-40" />
            <p className="text-sm font-medium">Map view</p>
            <p className="text-xs mt-1">Civil Hospital Nabha, Punjab</p>
            <p className="text-xs text-gray-300 mt-1">30.3752°N, 76.1544°E</p>
          </div>
        </div>
      </div>
    </div>
  )
}
