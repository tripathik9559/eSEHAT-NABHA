import { useState, useEffect } from 'react'
import { Tent, Plus, Loader2, Users, CheckCircle, X } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { listCamps, createCamp, updateCamp } from '../../services/api'
import { PageHeader, Modal, EmptyState, Alert } from '../../components/common/index'
import { fmtDateTime } from '../../utils/helpers'

const VILLAGES = ['Nabha','Sanaur','Bhadson','Lohat Badi','Mandi Gobindgarh','Patiala','Rajpura','Ghanaur','Samana','Fatehgarh Sahib','Sirhind','Morinda']
const STATUS_STYLES = {
  Scheduled:  'badge-info',
  Ongoing:    'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  Completed:  'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
  Cancelled:  'badge-high',
}

export default function HealthCamps() {
  const { user }  = useAuth()
  const ashaId    = user?.id

  const [camps,    setCamps]   = useState([])
  const [loading,  setLoading] = useState(true)
  const [showAdd,  setShowAdd] = useState(false)
  const [saving,   setSaving]  = useState(false)
  const [error,    setError]   = useState('')
  const [filter,   setFilter]  = useState('all')

  const [form, setForm] = useState({ village: 'Nabha', scheduled_date: '', notes: '' })

  useEffect(() => { fetchCamps() }, [ashaId])

  async function fetchCamps() {
    try {
      const res = await listCamps()
      setCamps(res.data)
    } catch {} finally { setLoading(false) }
  }

  async function handleCreate(e) {
    e.preventDefault()
    if (!form.village || !form.scheduled_date) { setError('Village and date are required'); return }
    setSaving(true); setError('')
    try {
      await createCamp({ ...form, asha_id: ashaId, scheduled_date: new Date(form.scheduled_date).toISOString() })
      await fetchCamps()
      setShowAdd(false)
      setForm({ village: 'Nabha', scheduled_date: '', notes: '' })
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to schedule camp')
    } finally { setSaving(false) }
  }

  async function handleStatus(camp, status, attendees) {
    try {
      await updateCamp(camp.id, status, status === 'Completed' ? attendees : undefined)
      fetchCamps()
    } catch {}
  }

  const filtered = filter === 'all' ? camps : camps.filter(c => c.status === filter)

  return (
    <div className="space-y-6">
      <PageHeader
        title="Health Camps"
        subtitle="Schedule and manage health camps across villages"
        actions={
          <button onClick={() => setShowAdd(true)} className="btn-primary">
            <Plus size={16} /> Schedule Camp
          </button>
        }
      />

      {/* Filter */}
      <div className="flex gap-1.5 flex-wrap">
        {['all', 'Scheduled', 'Ongoing', 'Completed', 'Cancelled'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all
              ${filter === f ? 'bg-brand-600 text-white' : 'bg-gray-100 dark:bg-dark-border text-gray-500 hover:bg-gray-200'}`}>
            {f === 'all' ? `All (${camps.length})` : `${f} (${camps.filter(c => c.status === f).length})`}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading…</div>
      ) : filtered.length === 0 ? (
        <div className="card">
          <EmptyState icon={Tent} title="No health camps"
            action={<button onClick={() => setShowAdd(true)} className="btn-primary">Schedule First Camp</button>} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(camp => (
            <div key={camp.id} className="card card-hover p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center flex-shrink-0">
                    <Tent size={18} className="text-teal-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{camp.village}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{fmtDateTime(camp.scheduled_date)}</p>
                  </div>
                </div>
                <span className={STATUS_STYLES[camp.status] || 'badge-info'}>{camp.status}</span>
              </div>

              {camp.notes && <p className="text-xs text-gray-500 italic mb-3">"{camp.notes}"</p>}

              {camp.attendees > 0 && (
                <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
                  <Users size={12} /> {camp.attendees} attendees
                </div>
              )}

              {camp.status === 'Scheduled' && (
                <div className="flex gap-2">
                  <button onClick={() => handleStatus(camp, 'Ongoing')}
                    className="btn-primary py-1.5 px-3 text-xs flex-1 justify-center">
                    Start Camp
                  </button>
                  <button onClick={() => handleStatus(camp, 'Cancelled')}
                    className="btn-danger py-1.5 px-3 text-xs">
                    <X size={12} />
                  </button>
                </div>
              )}
              {camp.status === 'Ongoing' && (
                <button onClick={() => {
                  const n = prompt('Number of attendees?', '0')
                  if (n !== null) handleStatus(camp, 'Completed', parseInt(n) || 0)
                }} className="btn-primary py-1.5 px-3 text-xs w-full justify-center">
                  <CheckCircle size={12} /> Mark Completed
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Schedule Modal */}
      <Modal open={showAdd} onClose={() => { setShowAdd(false); setError('') }} title="Schedule Health Camp">
        <form onSubmit={handleCreate} className="space-y-4">
          {error && <Alert variant="danger">{error}</Alert>}

          <div>
            <label className="label">Village</label>
            <select value={form.village} onChange={e => setForm(f => ({ ...f, village: e.target.value }))} className="input">
              {VILLAGES.map(v => <option key={v}>{v}</option>)}
            </select>
          </div>

          <div>
            <label className="label">Date & Time</label>
            <input type="datetime-local" value={form.scheduled_date}
              onChange={e => setForm(f => ({ ...f, scheduled_date: e.target.value }))}
              min={new Date().toISOString().slice(0, 16)} className="input" />
          </div>

          <div>
            <label className="label">Notes / Activities</label>
            <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
              placeholder="Vaccination, blood pressure check, diabetes screening…"
              rows={3} className="input resize-none" />
          </div>

          <div className="flex gap-2 pt-2">
            <button type="button" onClick={() => setShowAdd(false)} className="btn-secondary flex-1 justify-center">Cancel</button>
            <button type="submit" className="btn-primary flex-1 justify-center" disabled={saving}>
              {saving && <Loader2 size={15} className="animate-spin" />} Schedule
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
