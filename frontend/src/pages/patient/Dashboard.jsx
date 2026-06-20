import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Stethoscope, QrCode, Video, FileText,
         AlertTriangle, Clock, ChevronRight, Heart, Sparkles } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { listAppointments, getPatient, getSymptomHistory } from '../../services/api'
import { StatCard, SkeletonCard, EmptyState, RiskBadge } from '../../components/common/index'
import { fmtDateTime, fromNow } from '../../utils/helpers'

const QUICK_ACTIONS = [
  { to:'/patient/symptoms',     icon:Stethoscope, label:'Check Symptoms',   grad:'from-violet-500 to-purple-600', glow:'hover:shadow-violet-500/30' },
  { to:'/patient/appointments', icon:Calendar,    label:'Book Appointment', grad:'from-brand-500 to-blue-600',   glow:'hover:shadow-brand-500/30'  },
  { to:'/patient/qr',          icon:QrCode,       label:'My QR Card',       grad:'from-teal-500 to-emerald-600', glow:'hover:shadow-teal-500/30'   },
  { to:'/patient/telemedicine', icon:Video,        label:'Video Consult',    grad:'from-pink-500 to-rose-600',   glow:'hover:shadow-pink-500/30'   },
]

export default function PatientDashboard() {
  const { user } = useAuth()
  const patientId = user?.ref_id
  const [patient,  setPatient]  = useState(null)
  const [appts,    setAppts]    = useState([])
  const [symptoms, setSymptoms] = useState([])
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    if (!patientId) return
    Promise.all([getPatient(patientId), listAppointments({ patient_id: patientId }), getSymptomHistory(patientId)])
      .then(([p,a,s]) => { setPatient(p.data); setAppts(a.data); setSymptoms(s.data) })
      .catch(()=>{}).finally(()=>setLoading(false))
  }, [patientId])

  const upcoming   = appts.filter(a => a.status==='Scheduled').slice(0,3)
  const latestRisk = symptoms[0]?.risk_level || null
  const highRisk   = latestRisk === 'High'

  return (
    <div className="space-y-6">
      {highRisk && (
        <div className="relative overflow-hidden rounded-2xl p-4 border border-red-200 dark:border-red-500/25
          bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/15 dark:to-rose-900/10 animate-slide-up">
          <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-red-500/10 animate-pulse-soft"/>
          <div className="relative flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-100 dark:bg-red-500/20 flex items-center justify-center flex-shrink-0 animate-call-ring">
              <AlertTriangle size={18} className="text-red-600 dark:text-red-400"/>
            </div>
            <div>
              <p className="font-bold text-red-700 dark:text-red-300">High Risk Detected</p>
              <p className="text-sm text-red-600/80 dark:text-red-400/80 mt-0.5">
                Your latest symptom check shows high risk. Please visit Civil Hospital Nabha or call 108 immediately.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-start justify-between gap-4 animate-slide-up">
        <div>
          <p className="text-xs font-black text-gray-400 uppercase tracking-[0.12em] mb-1 flex items-center gap-1.5">
            <Sparkles size={11} className="text-amber-400"/> Patient Portal
          </p>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
            Namaste, {patient?.name?.split(' ')[0]||user?.name?.split(' ')[0]} 🙏
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            {patient?.village||'Nabha'} · Blood Group <span className="font-bold text-red-500">{patient?.blood_group||'—'}</span>
          </p>
        </div>
        {latestRisk && (
          <div className="flex-shrink-0 text-right animate-scale-in">
            <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Risk Level</p>
            <RiskBadge level={latestRisk}/>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {loading ? [...Array(4)].map((_,i)=><SkeletonCard key={i}/>) : <>
          <div className="animate-slide-up stagger-1"><StatCard icon={Calendar}    label="Total Appts"    value={appts.length}    color="blue"  /></div>
          <div className="animate-slide-up stagger-2"><StatCard icon={Clock}       label="Upcoming"       value={upcoming.length} color="violet"/></div>
          <div className="animate-slide-up stagger-3"><StatCard icon={Stethoscope} label="Symptom Checks" value={symptoms.length} color="amber" /></div>
          <div className="animate-slide-up stagger-4">
            <StatCard icon={Heart} label="Risk Level" value={latestRisk||'N/A'}
              color={latestRisk==='High'?'red':latestRisk==='Moderate'?'amber':'green'}/>
          </div>
        </>}
      </div>

      <div>
        <p className="text-xs font-black text-gray-400 uppercase tracking-[0.12em] mb-3">Quick Actions</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {QUICK_ACTIONS.map(({to,icon:Icon,label,grad,glow},i)=>(
            <Link key={to} to={to}
              className={`group card card-hover p-4 flex flex-col items-center gap-3 cursor-pointer animate-scale-in stagger-${i+1}`}>
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${grad}
                flex items-center justify-center shadow-lg ${glow}
                group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300`}>
                <Icon size={22} className="text-white"/>
              </div>
              <span className="text-xs font-bold text-gray-700 dark:text-gray-200 text-center leading-tight">{label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="card p-5 animate-slide-up stagger-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-black text-gray-400 uppercase tracking-[0.12em]">Upcoming</p>
              <h2 className="font-bold text-gray-900 dark:text-white">Appointments</h2>
            </div>
            <Link to="/patient/appointments" className="flex items-center gap-1 text-xs text-brand-600 dark:text-brand-400 font-bold hover:underline">
              View all <ChevronRight size={12}/>
            </Link>
          </div>
          {loading ? (
            <div className="space-y-3">{[...Array(2)].map((_,i)=><div key={i} className="h-16 skeleton rounded-xl"/>)}</div>
          ) : upcoming.length===0 ? (
            <EmptyState icon={Calendar} title="No upcoming appointments"
              action={<Link to="/patient/appointments" className="btn-primary text-xs py-2 px-4">Book Now</Link>}/>
          ) : (
            <div className="space-y-3">
              {upcoming.map((appt,i)=>(
                <div key={appt.id}
                  className={`flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-white/[0.02]
                    border border-gray-100 dark:border-white/[0.05] hover:border-brand-200 dark:hover:border-brand-500/25
                    transition-all duration-200 hover:translate-x-1 animate-slide-right stagger-${i+1}`}>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-violet-600
                    flex items-center justify-center flex-shrink-0 shadow-sm">
                    {appt.mode==='video'?<Video size={16} className="text-white"/>:<Calendar size={16} className="text-white"/>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{appt.doctor?.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{fmtDateTime(appt.datetime)}</p>
                  </div>
                  <RiskBadge level={appt.priority_level}/>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card p-5 animate-slide-up stagger-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-black text-gray-400 uppercase tracking-[0.12em]">AI Analysis</p>
              <h2 className="font-bold text-gray-900 dark:text-white">Symptom History</h2>
            </div>
            <Link to="/patient/symptoms" className="flex items-center gap-1 text-xs text-brand-600 dark:text-brand-400 font-bold hover:underline">
              Check now <ChevronRight size={12}/>
            </Link>
          </div>
          {loading ? (
            <div className="space-y-3">{[...Array(2)].map((_,i)=><div key={i} className="h-14 skeleton rounded-xl"/>)}</div>
          ) : symptoms.length===0 ? (
            <EmptyState icon={Stethoscope} title="No checks yet"
              action={<Link to="/patient/symptoms" className="btn-primary text-xs py-2 px-4">Check Symptoms</Link>}/>
          ) : (
            <div className="space-y-2.5">
              {symptoms.slice(0,4).map((log,i)=>(
                <div key={i} className={`flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-white/[0.02]
                  border border-gray-100 dark:border-white/[0.05] animate-slide-right stagger-${i+1}`}>
                  <RiskBadge level={log.risk_level}/>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-600 dark:text-gray-300 truncate">{log.symptoms}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{log.suggested_specialization} · {fromNow(log.timestamp)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
