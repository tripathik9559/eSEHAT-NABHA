import { useState, useEffect } from 'react'
import { Calendar, Video, Phone, MapPin, CheckCircle, XCircle, Clock } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { listAppointments, updateApptStatus } from '../../services/api'
import { PageHeader, EmptyState, RiskBadge, StatusBadge } from '../../components/common/index'
import { fmtDateTime } from '../../utils/helpers'

const STATUSES = ['Scheduled', 'Completed', 'Cancelled', 'Missed']
const MODE_ICON = { video: Video, audio: Phone, in_person: MapPin }

export default function DoctorAppointments() {
  const { user }  = useAuth()
  const doctorId  = user?.ref_id

  const [appts,      setAppts]   = useState([])
  const [loading,    setLoading] = useState(true)
  const [activeTab,  setTab]     = useState('Scheduled')
  const [updating,   setUpdating]= useState(null)

  useEffect(() => { fetchData() }, [doctorId])

  async function fetchData() {
    try {
      const res = await listAppointments({ doctor_id: doctorId })
      setAppts(res.data)
    } catch {} finally { setLoading(false) }
  }

  async function handleStatus(id, status) {
    setUpdating(id)
    try { await updateApptStatus(id, status); fetchData() }
    catch {} finally { setUpdating(null) }
  }

  const filtered = appts.filter(a => a.status === activeTab)
  const counts   = STATUSES.reduce((acc, s) => ({ ...acc, [s]: appts.filter(a => a.status === s).length }), {})

  return (
    <div className="space-y-6">
      <PageHeader title="Appointments" subtitle="Manage your patient appointments" />

      {/* Tabs */}
      <div className="flex gap-1 flex-wrap">
        {STATUSES.map(s => (
          <button key={s} onClick={() => setTab(s)}
            className={`px-4 py-1.5 rounded-xl text-sm font-medium transition-all
              ${activeTab === s ? 'bg-brand-600 text-white shadow-sm' : 'bg-gray-100 dark:bg-dark-border text-gray-500 hover:bg-gray-200 dark:hover:bg-dark-muted'}`}>
            {s} <span className="ml-1 opacity-70">({counts[s]})</span>
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading…</div>
      ) : filtered.length === 0 ? (
        <div className="card"><EmptyState icon={Calendar} title={`No ${activeTab.toLowerCase()} appointments`} /></div>
      ) : (
        <div className="space-y-3">
          {filtered.map(appt => {
            const MIcon = MODE_ICON[appt.mode] || MapPin
            return (
              <div key={appt.id} className="card card-hover p-4 flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="w-11 h-11 rounded-xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center flex-shrink-0">
                  <MIcon size={18} className="text-brand-600" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{appt.patient?.name}</p>
                      <p className="text-xs text-gray-500">{appt.patient?.phone} · {appt.mode.replace('_',' ')} · {fmtDateTime(appt.datetime)}</p>
                      {appt.notes && <p className="text-xs text-gray-400 italic mt-0.5">"{appt.notes}"</p>}
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <RiskBadge level={appt.priority_level} />
                      <StatusBadge status={appt.status} />
                    </div>
                  </div>
                </div>

                {appt.status === 'Scheduled' && (
                  <div className="flex gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => handleStatus(appt.id, 'Completed')}
                      disabled={updating === appt.id}
                      className="p-2 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-600 hover:bg-green-100 transition-colors"
                      title="Mark Completed">
                      <CheckCircle size={16} />
                    </button>
                    <button
                      onClick={() => handleStatus(appt.id, 'Missed')}
                      disabled={updating === appt.id}
                      className="p-2 rounded-xl bg-amber-50 dark:bg-amber-900/20 text-amber-600 hover:bg-amber-100 transition-colors"
                      title="Mark Missed">
                      <Clock size={16} />
                    </button>
                    <button
                      onClick={() => handleStatus(appt.id, 'Cancelled')}
                      disabled={updating === appt.id}
                      className="p-2 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 hover:bg-red-100 transition-colors"
                      title="Cancel">
                      <XCircle size={16} />
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
