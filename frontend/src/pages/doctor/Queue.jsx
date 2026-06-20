import { useState, useEffect } from 'react'
import { ClipboardList, Video, Phone, MapPin, FileText, CheckCircle } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { getPriorityQueue, updateApptStatus, createPrescription } from '../../services/api'
import { PageHeader, EmptyState, RiskBadge, Modal, Alert } from '../../components/common/index'
import { fmtDateTime } from '../../utils/helpers'
import { generatePrescriptionPDF } from '../../utils/pdfGenerator'

const MODE_ICON = { video: Video, audio: Phone, in_person: MapPin }
const PRIORITY_COLOR = { High: 'bg-red-500', Moderate: 'bg-amber-500', Mild: 'bg-emerald-500' }
const PRIORITY_GRAD  = { High: 'from-red-500 to-rose-600', Moderate: 'from-amber-500 to-orange-500', Mild: 'from-emerald-500 to-teal-500' }
const PRIORITY_RING  = { High: 'ring-red-200 dark:ring-red-500/25', Moderate: 'ring-amber-200 dark:ring-amber-500/25', Mild: 'ring-emerald-200 dark:ring-emerald-500/25' }

export default function DoctorQueue() {
  const { user }  = useAuth()
  const doctorId  = user?.ref_id

  const [queue,    setQueue]   = useState([])
  const [loading,  setLoading] = useState(true)
  const [selAppt,  setSelAppt] = useState(null)
  const [showPresc,setShowPresc]= useState(false)
  const [prescForm,setPrescForm]= useState({ medicines: [{ name: '', dosage: '', duration: '' }], notes: '' })
  const [saving,   setSaving]  = useState(false)
  const [error,    setError]   = useState('')

  useEffect(() => { fetchQueue() }, [doctorId])

  async function fetchQueue() {
    try {
      const res = await getPriorityQueue(doctorId)
      setQueue(res.data)
    } catch {} finally { setLoading(false) }
  }

  async function handleComplete(id) {
    try { await updateApptStatus(id, 'Completed'); fetchQueue() } catch {}
  }

  async function handlePrescribe(e) {
    e.preventDefault()
    if (!selAppt) return
    setSaving(true); setError('')
    const content = JSON.stringify({
      medicines: prescForm.medicines.filter(m => m.name),
      notes: prescForm.notes,
      date: new Date().toISOString(),
    })
    try {
      await createPrescription({ appointment_id: selAppt.id, doctor_id: doctorId, patient_id: selAppt.patient_id, content })
      generatePrescriptionPDF({ doctor: user, patient: selAppt.patient, medicines: prescForm.medicines.filter(m => m.name), notes: prescForm.notes, apptId: selAppt.id })
      setShowPresc(false)
      setPrescForm({ medicines: [{ name: '', dosage: '', duration: '' }], notes: '' })
      fetchQueue()
    } catch { setError('Failed to save prescription') }
    finally { setSaving(false) }
  }

  function updateMed(i, field, val) {
    setPrescForm(f => { const m = [...f.medicines]; m[i] = { ...m[i], [field]: val }; return { ...f, medicines: m } })
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Priority Queue"
        subtitle="Patients sorted by High → Moderate → Mild risk"
        actions={
          <button onClick={fetchQueue} className="btn-secondary text-sm">Refresh</button>
        }
      />

      {/* Legend */}
      <div className="flex items-center gap-4 text-xs text-gray-500">
        {['High', 'Moderate', 'Mild'].map(p => (
          <span key={p} className="flex items-center gap-1.5">
            <span className={`w-2.5 h-2.5 rounded-full ${PRIORITY_COLOR[p]}`} />
            {p} Risk
          </span>
        ))}
        <span className="text-gray-300 dark:text-gray-600">·</span>
        <span>Sorted by severity then time</span>
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(4)].map((_,i)=><div key={i} className="h-20 skeleton rounded-2xl"/>)}</div>
      ) : queue.length === 0 ? (
        <div className="card">
          <EmptyState icon={ClipboardList} title="Queue is empty" description="No scheduled appointments at this time" />
        </div>
      ) : (
        <div className="space-y-3">
          {queue.map((appt, idx) => {
            const MIcon = MODE_ICON[appt.mode] || MapPin
            return (
              <div key={appt.id}
                className={`card card-hover p-4 flex items-center gap-4 animate-slide-up stagger-${Math.min(idx+1,6)}
                  ${idx === 0 ? 'ring-2 ring-brand-400 dark:ring-brand-500/40' : ''}`}>
                {/* Position badge */}
                <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${PRIORITY_GRAD[appt.priority_level]}
                  flex items-center justify-center text-white text-sm font-black flex-shrink-0
                  ring-4 ${PRIORITY_RING[appt.priority_level]} ${idx===0?'animate-call-ring':''}`}>
                  {idx + 1}
                </div>

                {/* Mode icon */}
                <div className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-white/[0.05] flex items-center justify-center flex-shrink-0">
                  <MIcon size={16} className="text-gray-500" />
                </div>

                {/* Patient info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-bold text-gray-900 dark:text-white">{appt.patient?.name}</p>
                    <RiskBadge level={appt.priority_level} />
                    {idx === 0 && (
                      <span className="badge-info animate-pulse-soft">Next</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {appt.patient?.phone} · {appt.mode.replace('_', ' ')} · {fmtDateTime(appt.datetime)}
                  </p>
                  {appt.notes && <p className="text-xs text-gray-400 italic mt-0.5">"{appt.notes}"</p>}
                </div>

                {/* Actions */}
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => { setSelAppt(appt); setShowPresc(true) }}
                    className="btn-secondary py-1.5 px-3 text-xs hover:scale-105 transition-transform">
                    <FileText size={12} /> Prescribe
                  </button>
                  <button
                    onClick={() => handleComplete(appt.id)}
                    className="btn-primary py-1.5 px-3 text-xs hover:scale-105 transition-transform">
                    <CheckCircle size={12} /> Done
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Prescribe Modal */}
      <Modal open={showPresc} onClose={() => { setShowPresc(false); setError('') }} title="Write Prescription" size="lg">
        <form onSubmit={handlePrescribe} className="space-y-4">
          {error && <Alert variant="danger">{error}</Alert>}

          {selAppt && (
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-dark-border text-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center font-bold text-brand-700 flex-shrink-0">
                {selAppt.patient?.name?.[0]}
              </div>
              <div>
                <p className="font-semibold">{selAppt.patient?.name}</p>
                <p className="text-xs text-gray-400">Appointment #{selAppt.id} · <RiskBadge level={selAppt.priority_level} /></p>
              </div>
            </div>
          )}

          <div>
            <div className="flex justify-between mb-2">
              <label className="label">Medicines</label>
              <button type="button"
                onClick={() => setPrescForm(f => ({ ...f, medicines: [...f.medicines, { name: '', dosage: '', duration: '' }] }))}
                className="text-xs text-brand-600 hover:underline">
                + Add Row
              </button>
            </div>
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-2 text-xs font-semibold text-gray-400 px-1">
                <span>Medicine</span><span>Dosage</span><span>Duration</span>
              </div>
              {prescForm.medicines.map((med, i) => (
                <div key={i} className="grid grid-cols-3 gap-2">
                  <input placeholder="e.g. Paracetamol" value={med.name}
                    onChange={e => updateMed(i, 'name', e.target.value)} className="input text-sm" />
                  <input placeholder="e.g. 500mg BD" value={med.dosage}
                    onChange={e => updateMed(i, 'dosage', e.target.value)} className="input text-sm" />
                  <input placeholder="e.g. 5 days" value={med.duration}
                    onChange={e => updateMed(i, 'duration', e.target.value)} className="input text-sm" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="label">Notes / Instructions</label>
            <textarea value={prescForm.notes}
              onChange={e => setPrescForm(f => ({ ...f, notes: e.target.value }))}
              placeholder="Rest, diet advice, follow-up date…" rows={3} className="input resize-none" />
          </div>

          <div className="flex gap-2 pt-2">
            <button type="button" onClick={() => setShowPresc(false)} className="btn-secondary flex-1 justify-center">Cancel</button>
            <button type="submit" className="btn-primary flex-1 justify-center" disabled={saving}>
              {saving ? 'Saving…' : 'Save & Download PDF'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
