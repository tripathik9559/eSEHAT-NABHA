import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Users, Calendar, Clock, CheckCircle, FileText,
         ChevronRight, Loader2, Video, MapPin, Phone, Zap } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { getPriorityQueue, updateApptStatus, createPrescription, listAppointments } from '../../services/api'
import { StatCard, PageHeader, Modal, RiskBadge, EmptyState, Alert, SkeletonCard } from '../../components/common/index'
import { fmtDateTime, fmtDate } from '../../utils/helpers'
import { generatePrescriptionPDF } from '../../utils/pdfGenerator'

const MODE_ICONS = { video: Video, audio: Phone, in_person: MapPin }
const PRIORITY_RINGS = { High: 'ring-red-200 dark:ring-red-500/30', Moderate: 'ring-amber-200 dark:ring-amber-500/30', Mild: 'ring-emerald-200 dark:ring-emerald-500/30' }
const PRIORITY_GRAD  = { High: 'from-red-500 to-rose-600', Moderate: 'from-amber-500 to-orange-500', Mild: 'from-emerald-500 to-teal-500' }

export default function DoctorDashboard() {
  const { user } = useAuth()
  const doctorId = user?.ref_id

  const [queue,   setQueue]   = useState([])
  const [allAppts,setAllAppts]= useState([])
  const [loading, setLoading] = useState(true)
  const [selAppt, setSelAppt] = useState(null)
  const [showPresc,setShowPresc]=useState(false)
  const [prescForm,setPrescForm]=useState({ medicines:[{name:'',dosage:'',duration:''}], notes:'' })
  const [saving,  setSaving]  = useState(false)
  const [error,   setError]   = useState('')

  useEffect(() => { fetchData() }, [doctorId])

  async function fetchData() {
    try {
      const [q, a] = await Promise.all([getPriorityQueue(doctorId), listAppointments({ doctor_id: doctorId })])
      setQueue(q.data); setAllAppts(a.data)
    } catch {} finally { setLoading(false) }
  }

  async function handleComplete(id) {
    try { await updateApptStatus(id, 'Completed'); fetchData() } catch {}
  }

  async function handlePrescribe(e) {
    e.preventDefault(); setSaving(true); setError('')
    const meds = prescForm.medicines.filter(m => m.name)
    const content = JSON.stringify({ medicines: meds, notes: prescForm.notes, date: new Date().toISOString() })
    try {
      await createPrescription({ appointment_id: selAppt.id, doctor_id: doctorId, patient_id: selAppt.patient_id, content })
      generatePrescriptionPDF({ doctor: user, patient: selAppt.patient, medicines: meds, notes: prescForm.notes, apptId: selAppt.id })
      setShowPresc(false); setPrescForm({ medicines:[{name:'',dosage:'',duration:''}], notes:'' }); setSelAppt(null)
    } catch { setError('Failed to save. Try again.') } finally { setSaving(false) }
  }

  function updateMed(i, f, v) {
    setPrescForm(p => { const m=[...p.medicines]; m[i]={...m[i],[f]:v}; return {...p,medicines:m} })
  }

  const stats = {
    total:     allAppts.length,
    today:     allAppts.filter(a => new Date(a.datetime).toDateString()===new Date().toDateString()).length,
    completed: allAppts.filter(a => a.status==='Completed').length,
    pending:   queue.length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Doctor Portal</p>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
            {user?.name}
          </h1>
          <p className="text-sm text-gray-400 mt-1">Civil Hospital Nabha</p>
        </div>
        <div className="flex gap-2">
          <Link to="/doctor/queue" className="btn-primary text-xs py-2">
            <Zap size={13} /> View Queue
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {loading ? [...Array(4)].map((_,i) => <SkeletonCard key={i} />) : <>
          <div className="animate-slide-up stagger-1"><StatCard icon={Calendar}    label="Total"     value={stats.total}     color="blue"   /></div>
          <div className="animate-slide-up stagger-2"><StatCard icon={Clock}       label="Today"     value={stats.today}     color="amber"  /></div>
          <div className="animate-slide-up stagger-3"><StatCard icon={CheckCircle} label="Completed" value={stats.completed} color="green"  /></div>
          <div className="animate-slide-up stagger-4"><StatCard icon={Users}       label="Queue"     value={stats.pending}   color="red"    /></div>
        </>}
      </div>

      {/* Priority Queue */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Priority Sorted</p>
            <h2 className="font-bold text-gray-900 dark:text-white">Patient Queue</h2>
          </div>
          <div className="flex items-center gap-2">
            {queue.length > 0 && <span className="badge-high">{queue.length} waiting</span>}
            <Link to="/doctor/queue" className="text-xs text-brand-600 dark:text-brand-400 font-semibold hover:underline flex items-center gap-1">
              Full view <ChevronRight size={12}/>
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="space-y-3">{[...Array(3)].map((_,i)=><div key={i} className="h-16 skeleton rounded-xl"/>)}</div>
        ) : queue.length === 0 ? (
          <EmptyState icon={Users} title="Queue is clear" description="All appointments are handled" />
        ) : (
          <div className="space-y-3">
            {queue.slice(0, 5).map((appt, idx) => {
              const MIcon = MODE_ICONS[appt.mode] || MapPin
              return (
                <div key={appt.id}
                  className={`flex items-center gap-4 p-4 rounded-xl
                    border border-gray-100 dark:border-white/[0.05]
                    ${idx === 0 ? 'bg-brand-50 dark:bg-brand-900/10 border-brand-100 dark:border-brand-500/20' : 'bg-gray-50 dark:bg-white/[0.02]'}`}>
                  {/* Position */}
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${PRIORITY_GRAD[appt.priority_level]}
                    flex items-center justify-center text-white text-sm font-black flex-shrink-0
                    ring-4 ${PRIORITY_RINGS[appt.priority_level]}`}>
                    {idx + 1}
                  </div>
                  {/* Mode */}
                  <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/[0.06] flex items-center justify-center flex-shrink-0">
                    <MIcon size={14} className="text-gray-500" />
                  </div>
                  {/* Patient */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-sm text-gray-900 dark:text-white truncate">{appt.patient?.name}</p>
                      <RiskBadge level={appt.priority_level} />
                      {idx===0 && <span className="badge-info animate-pulse-soft">Next</span>}
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{fmtDateTime(appt.datetime)}</p>
                  </div>
                  {/* Actions */}
                  <div className="flex gap-1.5 flex-shrink-0">
                    <button onClick={() => { setSelAppt(appt); setShowPresc(true) }}
                      className="btn-secondary py-1.5 px-3 text-xs">
                      <FileText size={12}/> Rx
                    </button>
                    <button onClick={() => handleComplete(appt.id)}
                      className="btn-primary py-1.5 px-3 text-xs">
                      <CheckCircle size={12}/> Done
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Prescription modal */}
      <Modal open={showPresc} onClose={() => { setShowPresc(false); setError('') }} title="Write Prescription" size="lg">
        <form onSubmit={handlePrescribe} className="space-y-5">
          {error && <Alert variant="danger">{error}</Alert>}

          {selAppt && (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.06]">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-violet-600
                flex items-center justify-center text-white font-black flex-shrink-0">
                {selAppt.patient?.name?.[0]}
              </div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white">{selAppt.patient?.name}</p>
                <p className="text-xs text-gray-400">Appt #{selAppt.id} · {fmtDate(selAppt.datetime)}</p>
              </div>
              <div className="ml-auto"><RiskBadge level={selAppt.priority_level} /></div>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="label">Medicines</label>
              <button type="button"
                onClick={() => setPrescForm(f => ({ ...f, medicines:[...f.medicines,{name:'',dosage:'',duration:''}] }))}
                className="text-xs text-brand-600 dark:text-brand-400 font-bold hover:underline">
                + Add Row
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-2">
              {['Medicine Name','Dosage','Duration'].map(h=>(
                <p key={h} className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">{h}</p>
              ))}
            </div>
            <div className="space-y-2">
              {prescForm.medicines.map((med, i) => (
                <div key={i} className="grid grid-cols-3 gap-2">
                  <input placeholder="Paracetamol 500mg" value={med.name}
                    onChange={e=>updateMed(i,'name',e.target.value)} className="input text-sm py-2" />
                  <input placeholder="1 tab BD" value={med.dosage}
                    onChange={e=>updateMed(i,'dosage',e.target.value)} className="input text-sm py-2" />
                  <input placeholder="5 days" value={med.duration}
                    onChange={e=>updateMed(i,'duration',e.target.value)} className="input text-sm py-2" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="label">Instructions & Notes</label>
            <textarea value={prescForm.notes}
              onChange={e=>setPrescForm(f=>({...f,notes:e.target.value}))}
              placeholder="Rest, dietary advice, follow-up date, special instructions…"
              rows={3} className="input resize-none leading-relaxed" />
          </div>

          <div className="flex gap-3 pt-1">
            <button type="button" onClick={()=>setShowPresc(false)} className="btn-secondary flex-1">Cancel</button>
            <button type="submit" className="btn-primary flex-1" disabled={saving}>
              {saving ? <><Loader2 size={14} className="animate-spin"/>Saving…</> : <><FileText size={14}/>Save & Download PDF</>}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
