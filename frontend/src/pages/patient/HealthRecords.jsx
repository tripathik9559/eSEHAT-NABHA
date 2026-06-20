import { useState, useEffect } from 'react'
import { FileText, Plus, Heart, Activity, Pill, AlertCircle, Loader2 } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { getHealthRecords, addHealthRecord } from '../../services/api'
import { PageHeader, Modal, EmptyState, Alert } from '../../components/common/index'
import { fmtDateTime } from '../../utils/helpers'

const TYPES = [
  { id: 'vitals',    icon: Activity,     label: 'Vitals',         color: 'text-blue-500'  },
  { id: 'diagnosis', icon: FileText,     label: 'Diagnosis',      color: 'text-violet-500' },
  { id: 'allergy',   icon: AlertCircle,  label: 'Allergy',        color: 'text-red-500'   },
  { id: 'chronic',   icon: Heart,        label: 'Chronic Disease', color: 'text-pink-500'  },
  { id: 'medicine',  icon: Pill,         label: 'Medicine',       color: 'text-green-500' },
]

export default function HealthRecords() {
  const { user }  = useAuth()
  const patientId = user?.ref_id

  const [records,  setRecords]  = useState([])
  const [loading,  setLoading]  = useState(true)
  const [showAdd,  setShowAdd]  = useState(false)
  const [saving,   setSaving]   = useState(false)
  const [error,    setError]    = useState('')
  const [filter,   setFilter]   = useState('all')

  const [form, setForm] = useState({ type: 'vitals', data: '' })

  useEffect(() => {
    if (!patientId) return
    getHealthRecords(patientId).then(r => setRecords(r.data)).catch(() => {}).finally(() => setLoading(false))
  }, [patientId])

  async function handleAdd(e) {
    e.preventDefault()
    if (!form.data.trim()) { setError('Enter record details'); return }
    setSaving(true); setError('')
    try {
      const res = await addHealthRecord(patientId, form)
      setRecords(prev => [res.data, ...prev])
      setShowAdd(false)
      setForm({ type: 'vitals', data: '' })
    } catch { setError('Failed to save. Try again.') }
    finally { setSaving(false) }
  }

  const filtered = filter === 'all' ? records : records.filter(r => r.type === filter)
  const getType  = (id) => TYPES.find(t => t.id === id) || TYPES[0]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Health Records"
        subtitle="Your complete medical history vault"
        actions={
          <button onClick={() => setShowAdd(true)} className="btn-primary">
            <Plus size={16} /> Add Record
          </button>
        }
      />

      {/* Filter tabs */}
      <div className="flex gap-1.5 flex-wrap">
        <button onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all
            ${filter === 'all' ? 'bg-brand-600 text-white' : 'bg-gray-100 dark:bg-dark-border text-gray-600 dark:text-gray-300 hover:bg-gray-200'}`}>
          All ({records.length})
        </button>
        {TYPES.map(t => (
          <button key={t.id} onClick={() => setFilter(t.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all
              ${filter === t.id ? 'bg-brand-600 text-white' : 'bg-gray-100 dark:bg-dark-border text-gray-600 dark:text-gray-300 hover:bg-gray-200'}`}>
            {t.label} ({records.filter(r => r.type === t.id).length})
          </button>
        ))}
      </div>

      {/* Records */}
      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading…</div>
      ) : filtered.length === 0 ? (
        <div className="card">
          <EmptyState icon={FileText} title="No records found"
            action={<button onClick={() => setShowAdd(true)} className="btn-primary">Add Record</button>} />
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(rec => {
            const typeInfo = getType(rec.type)
            return (
              <div key={rec.id} className="card card-hover p-4 flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-dark-border flex items-center justify-center flex-shrink-0">
                  <typeInfo.icon size={18} className={typeInfo.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{typeInfo.label}</span>
                    <span className="text-xs text-gray-400">{fmtDateTime(rec.created_at)}</span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">{rec.data}</p>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Add Record Modal */}
      <Modal open={showAdd} onClose={() => { setShowAdd(false); setError('') }} title="Add Health Record">
        <form onSubmit={handleAdd} className="space-y-4">
          {error && <Alert variant="danger">{error}</Alert>}

          <div>
            <label className="label">Record Type</label>
            <div className="grid grid-cols-3 gap-2">
              {TYPES.map(type => (
                <button type="button" key={type.id}
                  onClick={() => setForm(f => ({ ...f, type: type.id }))}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all text-xs
                    ${form.type === type.id ? 'border-brand-600 bg-brand-50 dark:bg-brand-900/20' : 'border-gray-200 dark:border-dark-border hover:border-brand-200'}`}>
                  <type.icon size={18} className={type.color} />
                  <span className="font-medium text-gray-700 dark:text-gray-200">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="label">Details</label>
            <textarea
              value={form.data}
              onChange={e => setForm(f => ({ ...f, data: e.target.value }))}
              placeholder={
                form.type === 'vitals'    ? 'BP: 120/80, Temp: 98.6°F, Pulse: 72 bpm…' :
                form.type === 'diagnosis' ? 'Diagnosed with…' :
                form.type === 'allergy'   ? 'Allergic to: Penicillin, Dust…' :
                form.type === 'chronic'   ? 'Diabetes Type 2, Hypertension…' :
                'Medicine name, dosage, duration…'
              }
              rows={4}
              className="input resize-none"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button type="button" onClick={() => setShowAdd(false)} className="btn-secondary flex-1 justify-center">Cancel</button>
            <button type="submit" className="btn-primary flex-1 justify-center" disabled={saving}>
              {saving && <Loader2 size={15} className="animate-spin" />} Save Record
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
