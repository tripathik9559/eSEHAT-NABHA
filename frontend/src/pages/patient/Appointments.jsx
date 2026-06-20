import { useState, useEffect } from 'react'
import { Calendar, Plus, Video, Phone, MapPin, Loader2, X } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { listAppointments, listDoctors, createAppointment, cancelAppointment } from '../../services/api'
import { Modal, EmptyState, StatusBadge, RiskBadge, PageHeader, Alert } from '../../components/common/index'
import { fmtDateTime } from '../../utils/helpers'

const MODES = [
  { id:'in_person', icon:MapPin, label:'In-Person' },
  { id:'video',     icon:Video,  label:'Video Call' },
  { id:'audio',     icon:Phone,  label:'Audio Call' },
]
const PRIORITIES = ['Mild','Moderate','High']
const MODE_ICON  = { video:Video, audio:Phone, in_person:MapPin }
const MODE_GRAD  = { video:'from-brand-500 to-blue-600', audio:'from-violet-500 to-purple-600', in_person:'from-teal-500 to-emerald-600' }

export default function PatientAppointments() {
  const { user } = useAuth()
  const patientId = user?.ref_id

  const [appts,   setAppts]   = useState([])
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [showBook,setShowBook]= useState(false)
  const [saving,  setSaving]  = useState(false)
  const [error,   setError]   = useState('')
  const [tab,     setTab]     = useState('upcoming')
  const [form,    setForm]    = useState({ doctor_id:'', datetime:'', mode:'in_person', priority_level:'Mild', notes:'' })

  useEffect(()=>{ fetchData() },[patientId])

  async function fetchData() {
    try {
      const [a,d] = await Promise.all([listAppointments({patient_id:patientId}), listDoctors()])
      setAppts(a.data); setDoctors(d.data)
    } catch {} finally { setLoading(false) }
  }

  async function handleBook(e) {
    e.preventDefault()
    if (!form.doctor_id||!form.datetime) { setError('Select a doctor and date/time'); return }
    setSaving(true); setError('')
    try {
      await createAppointment({ ...form, patient_id:patientId, doctor_id:Number(form.doctor_id) })
      await fetchData(); setShowBook(false)
      setForm({ doctor_id:'', datetime:'', mode:'in_person', priority_level:'Mild', notes:'' })
    } catch(err) { setError(err.response?.data?.detail||'Failed to book appointment') }
    finally { setSaving(false) }
  }

  async function handleCancel(id) {
    if (!confirm('Cancel this appointment?')) return
    try { await cancelAppointment(id); fetchData() } catch {}
  }

  const upcoming  = appts.filter(a=>a.status==='Scheduled')
  const past      = appts.filter(a=>a.status!=='Scheduled')
  const displayed = tab==='upcoming'?upcoming:past

  return (
    <div className="space-y-6">
      <PageHeader title="Appointments" subtitle="Manage your medical appointments"
        actions={<button onClick={()=>setShowBook(true)} className="btn-primary"><Plus size={16}/>Book Appointment</button>}/>

      {/* Tabs */}
      <div className="inline-flex gap-1 bg-gray-100 dark:bg-white/[0.04] p-1 rounded-2xl">
        {[['upcoming',`Upcoming (${upcoming.length})`],['past',`Past (${past.length})`]].map(([id,label])=>(
          <button key={id} onClick={()=>setTab(id)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200
              ${tab===id?'bg-white dark:bg-[#0f1623] shadow-sm text-gray-900 dark:text-white':'text-gray-500 hover:text-gray-700'}`}>
            {label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(3)].map((_,i)=><div key={i} className="h-24 skeleton rounded-2xl"/>)}</div>
      ) : displayed.length===0 ? (
        <div className="card">
          <EmptyState icon={Calendar} title={tab==='upcoming'?'No upcoming appointments':'No past appointments'}
            description={tab==='upcoming'?'Book your first appointment with a doctor':''}
            action={tab==='upcoming'?<button onClick={()=>setShowBook(true)} className="btn-primary">Book Now</button>:null}/>
        </div>
      ) : (
        <div className="space-y-3">
          {displayed.map((appt,i)=>{
            const MIcon = MODE_ICON[appt.mode]||MapPin
            return (
              <div key={appt.id} className={`card card-hover p-4 flex items-start gap-4 animate-slide-up stagger-${Math.min(i+1,6)}`}>
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${MODE_GRAD[appt.mode]} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                  <MIcon size={20} className="text-white"/>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">{appt.doctor?.name}</p>
                      <p className="text-sm text-gray-500">{appt.doctor?.specialization} · {appt.mode.replace('_',' ')}</p>
                      <p className="text-xs text-gray-400 mt-1">{fmtDateTime(appt.datetime)}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <RiskBadge level={appt.priority_level}/>
                      <StatusBadge status={appt.status}/>
                    </div>
                  </div>
                  {appt.notes && <p className="text-xs text-gray-500 mt-2 italic">"{appt.notes}"</p>}
                </div>
                {appt.status==='Scheduled' && (
                  <button onClick={()=>handleCancel(appt.id)}
                    className="p-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 text-gray-400 hover:text-red-600
                      transition-all duration-200 flex-shrink-0 hover:scale-110" title="Cancel">
                    <X size={16}/>
                  </button>
                )}
              </div>
            )
          })}
        </div>
      )}

      <Modal open={showBook} onClose={()=>{setShowBook(false);setError('')}} title="Book Appointment">
        <form onSubmit={handleBook} className="space-y-4">
          {error && <Alert variant="danger">{error}</Alert>}

          <div>
            <label className="label">Select Doctor</label>
            <select value={form.doctor_id} onChange={e=>setForm(f=>({...f,doctor_id:e.target.value}))} className="input">
              <option value="">Choose a doctor…</option>
              {doctors.map(d=>(
                <option key={d.id} value={d.id} disabled={!d.available_status}>
                  {d.name} — {d.specialization} {!d.available_status?'(Unavailable)':''}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">Date & Time</label>
            <input type="datetime-local" value={form.datetime}
              onChange={e=>setForm(f=>({...f,datetime:e.target.value}))}
              min={new Date().toISOString().slice(0,16)} className="input"/>
          </div>

          <div>
            <label className="label">Mode</label>
            <div className="grid grid-cols-3 gap-2">
              {MODES.map(({id,icon:Icon,label})=>(
                <button type="button" key={id} onClick={()=>setForm(f=>({...f,mode:id}))}
                  className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all text-sm font-semibold
                    ${form.mode===id?'border-brand-600 bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300 scale-[1.02]':'border-gray-200 dark:border-white/[0.08]'}`}>
                  <Icon size={15}/> {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="label">Symptom Severity</label>
            <div className="flex gap-2">
              {PRIORITIES.map(p=>(
                <button type="button" key={p} onClick={()=>setForm(f=>({...f,priority_level:p}))}
                  className={`flex-1 py-2.5 rounded-xl border-2 text-sm font-bold transition-all
                    ${form.priority_level===p
                      ? p==='High'?'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 scale-[1.02]'
                        : p==='Moderate'?'border-amber-500 bg-amber-50 dark:bg-amber-900/20 text-amber-700 scale-[1.02]'
                        : 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 scale-[1.02]'
                      : 'border-gray-200 dark:border-white/[0.08] text-gray-600 dark:text-gray-300'}`}>
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="label">Notes (optional)</label>
            <textarea value={form.notes} onChange={e=>setForm(f=>({...f,notes:e.target.value}))}
              placeholder="Describe your symptoms briefly…" rows={2} className="input resize-none"/>
          </div>

          <div className="flex gap-3 pt-1">
            <button type="button" onClick={()=>setShowBook(false)} className="btn-secondary flex-1">Cancel</button>
            <button type="submit" className="btn-primary flex-1" disabled={saving}>
              {saving?<><Loader2 size={15} className="animate-spin"/>Booking…</>:'Book Appointment'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
