import { useState, useEffect } from 'react'
import { Package, Search, Loader2, TrendingUp, TrendingDown, AlertTriangle, Edit2 } from 'lucide-react'
import { listMedicines, listPharmacies, updateStock } from '../../services/api'
import { PageHeader, Modal, EmptyState, Alert, StatCard, SkeletonCard } from '../../components/common/index'
import { STOCK_COLORS, debounce } from '../../utils/helpers'

/* ── Pharmacy Dashboard ──────────────────────────────────────────────────────── */
export function PharmacyDashboard() {
  const [medicines,  setMeds]      = useState([])
  const [pharmacies, setPharmacies]= useState([])
  const [loading,    setLoading]   = useState(true)

  useEffect(() => {
    Promise.all([listMedicines(), listPharmacies()])
      .then(([m,p])=>{ setMeds(m.data); setPharmacies(p.data) })
      .catch(()=>{}).finally(()=>setLoading(false))
  }, [])

  const counts = {
    available: medicines.filter(m=>m.stock_status==='available').length,
    low:       medicines.filter(m=>m.stock_status==='low').length,
    out:       medicines.filter(m=>m.stock_status==='out').length,
    total:     medicines.length,
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Pharmacy Portal</p>
        <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Dashboard</h1>
        <p className="text-sm text-gray-400 mt-1">Civil Hospital Nabha — Medicine Management</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {loading ? [...Array(4)].map((_,i)=><SkeletonCard key={i}/>) : <>
          <StatCard icon={Package}       label="Total Medicines"  value={counts.total}     color="blue"  />
          <StatCard icon={TrendingUp}    label="In Stock"         value={counts.available} color="green" />
          <StatCard icon={TrendingDown}  label="Low Stock"        value={counts.low}       color="amber" />
          <StatCard icon={AlertTriangle} label="Out of Stock"     value={counts.out}       color="red"   />
        </>}
      </div>

      {counts.out > 0 && <Alert variant="danger"><strong>{counts.out} medicines</strong> are out of stock. Please restock immediately.</Alert>}
      {counts.low > 0 && <Alert variant="warning"><strong>{counts.low} medicines</strong> are running low. Consider restocking soon.</Alert>}

      <div className="card p-5">
        <h2 className="font-bold text-gray-900 dark:text-white mb-4">Pharmacy Locations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pharmacies.map(ph=>(
            <div key={ph.id} className="p-4 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.06]">
              <p className="font-bold text-sm text-gray-900 dark:text-white">{ph.name}</p>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">{ph.address}</p>
              <a href={`tel:${ph.contact}`} className="text-xs text-brand-600 dark:text-brand-400 font-semibold mt-1.5 block hover:underline">
                📞 {ph.contact}
              </a>
              <p className="text-xs text-gray-400 mt-1">
                {medicines.filter(m=>m.pharmacy_id===ph.id).length} medicines
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Pharmacy Inventory ──────────────────────────────────────────────────────── */
export function PharmacyInventory() {
  const [medicines, setMeds]    = useState([])
  const [search,    setSearch]  = useState('')
  const [filter,    setFilter]  = useState('all')
  const [loading,   setLoading] = useState(true)
  const [editMed,   setEditMed] = useState(null)
  const [editForm,  setEditForm]= useState({ stock_status:'available', quantity:0 })
  const [saving,    setSaving]  = useState(false)
  const [error,     setError]   = useState('')

  useEffect(()=>{ fetchMeds() },[])

  async function fetchMeds() {
    try { const r = await listMedicines(); setMeds(r.data) }
    catch {} finally { setLoading(false) }
  }

  const doSearch = debounce(async q=>{
    try { const r = await listMedicines({ search:q }); setMeds(r.data) } catch {}
  },400)

  function handleSearch(e) { setSearch(e.target.value); doSearch(e.target.value) }

  async function handleSave(e) {
    e.preventDefault(); setSaving(true); setError('')
    try {
      await updateStock(editMed.id, editForm)
      setMeds(ms=>ms.map(m=>m.id===editMed.id?{...m,...editForm}:m))
      setEditMed(null)
    } catch { setError('Failed to update') } finally { setSaving(false) }
  }

  const filtered = (filter==='all'?medicines:medicines.filter(m=>m.stock_status===filter))
    .filter(m=>m.name.toLowerCase().includes(search.toLowerCase()))

  const STOCK_DOT = { available:'bg-emerald-500', low:'bg-amber-500', out:'bg-red-500' }

  return (
    <div className="space-y-5">
      <PageHeader title="Inventory Management" subtitle="Update medicine stock levels across all pharmacies"/>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"/>
          <input value={search} onChange={handleSearch} placeholder="Search medicines…" className="input pl-10"/>
        </div>
        <div className="flex gap-1.5">
          {[['all','All'],['available','In Stock'],['low','Low'],['out','Out']].map(([id,lbl])=>(
            <button key={id} onClick={()=>setFilter(id)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all
                ${filter===id?'bg-brand-600 text-white shadow-sm':'bg-gray-100 dark:bg-white/[0.06] text-gray-500 hover:bg-gray-200'}`}>
              {lbl}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="space-y-2">{[...Array(5)].map((_,i)=><div key={i} className="h-16 skeleton rounded-xl"/>)}</div>
      ) : filtered.length===0 ? (
        <div className="card"><EmptyState icon={Package} title="No medicines found"/></div>
      ) : (
        <div className="space-y-2">
          {filtered.map(med=>{
            const sc = STOCK_COLORS[med.stock_status]||STOCK_COLORS.available
            return (
              <div key={med.id}
                className="card card-hover p-4 flex items-center gap-4 hover:shadow-card-hover transition-all">
                <span className={`w-3 h-3 rounded-full flex-shrink-0 ${STOCK_DOT[med.stock_status]}`}/>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-gray-900 dark:text-white">{med.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{med.category} · {med.pharmacy?.name} · ₹{med.price}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className={`text-xs font-bold ${sc.text}`}>{sc.label}</p>
                  <p className="text-xs text-gray-400">{med.quantity} units</p>
                </div>
                <button onClick={()=>{ setEditMed(med); setEditForm({stock_status:med.stock_status,quantity:med.quantity}) }}
                  className="btn-secondary py-1.5 px-3 text-xs flex-shrink-0">
                  <Edit2 size={12}/> Update
                </button>
              </div>
            )
          })}
        </div>
      )}

      <Modal open={!!editMed} onClose={()=>setEditMed(null)} title={`Update Stock: ${editMed?.name}`}>
        <form onSubmit={handleSave} className="space-y-4">
          {error && <Alert variant="danger">{error}</Alert>}
          <div>
            <label className="label">Stock Status</label>
            <div className="grid grid-cols-3 gap-2">
              {[['available','In Stock','text-emerald-600'],['low','Low Stock','text-amber-600'],['out','Out of Stock','text-red-600']].map(([id,lbl,col])=>(
                <button type="button" key={id}
                  onClick={()=>setEditForm(f=>({...f,stock_status:id}))}
                  className={`p-3 rounded-xl border-2 text-sm font-bold transition-all
                    ${editForm.stock_status===id?'border-brand-600 bg-brand-50 dark:bg-brand-900/20':'border-gray-200 dark:border-white/[0.08]'}`}>
                  <span className={col}>{lbl}</span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="label">Quantity (units)</label>
            <input type="number" min={0} value={editForm.quantity}
              onChange={e=>setEditForm(f=>({...f,quantity:parseInt(e.target.value)||0}))}
              className="input"/>
          </div>
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={()=>setEditMed(null)} className="btn-secondary flex-1">Cancel</button>
            <button type="submit" className="btn-primary flex-1" disabled={saving}>
              {saving?<><Loader2 size={14} className="animate-spin"/>Saving…</>:<>Save Changes</>}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default PharmacyDashboard
