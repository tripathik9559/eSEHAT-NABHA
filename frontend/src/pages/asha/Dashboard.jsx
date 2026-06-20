import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Users, Tent, UserPlus, Video, Calendar, ChevronRight, MapPin } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { listPatients, listCamps } from '../../services/api'
import { StatCard, PageHeader, EmptyState, SkeletonCard } from '../../components/common/index'
import { fmtDate } from '../../utils/helpers'

const ACTIONS = [
  { to:'/asha/register',     icon:UserPlus, label:'Register Patient', grad:'from-brand-500 to-blue-600',    glow:'shadow-brand-500/25'  },
  { to:'/asha/camps',        icon:Tent,     label:'Health Camps',     grad:'from-teal-500 to-emerald-600',  glow:'shadow-teal-500/25'   },
  { to:'/asha/telemedicine', icon:Video,    label:'Telemedicine',     grad:'from-violet-500 to-purple-600', glow:'shadow-violet-500/25' },
]

export default function ASHADashboard() {
  const { user }  = useAuth()
  const [patients, setPatients] = useState([])
  const [camps,    setCamps]    = useState([])
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    Promise.all([listPatients(), listCamps()])
      .then(([p,c])=>{ setPatients(p.data); setCamps(c.data) })
      .catch(()=>{}).finally(()=>setLoading(false))
  }, [])

  const upcoming = camps.filter(c=>c.status==='Scheduled').slice(0,3)

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">ASHA Portal</p>
        <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
          Namaste, {user?.name?.split(' ')[0]} 🙏
        </h1>
        <p className="text-sm text-gray-400 mt-1">Community Health Worker · Nabha Block</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {loading ? [...Array(3)].map((_,i)=><SkeletonCard key={i}/>) : <>
          <div className="animate-slide-up stagger-1"><StatCard icon={Users}    label="Patients"  value={patients.length}  color="blue"  /></div>
          <div className="animate-slide-up stagger-2"><StatCard icon={Tent}     label="All Camps" value={camps.length}     color="teal"  /></div>
          <div className="animate-slide-up stagger-3"><StatCard icon={Calendar} label="Upcoming"  value={upcoming.length}  color="amber" /></div>
        </>}
      </div>

      {/* Quick Actions */}
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Quick Actions</p>
        <div className="grid grid-cols-3 gap-3">
          {ACTIONS.map(({to,icon:Icon,label,grad,glow})=>(
            <Link key={to} to={to}
              className="group card p-4 flex flex-col items-center gap-3 hover:shadow-card-hover transition-all duration-200">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${grad} flex items-center justify-center
                shadow-lg ${glow} group-hover:scale-110 transition-all duration-200`}>
                <Icon size={22} className="text-white"/>
              </div>
              <span className="text-xs font-bold text-gray-700 dark:text-gray-200 text-center leading-tight">{label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Recent patients */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Recent</p>
              <h2 className="font-bold text-gray-900 dark:text-white">Patients</h2>
            </div>
            <Link to="/asha/register" className="flex items-center gap-1 text-xs text-brand-600 dark:text-brand-400 font-semibold hover:underline">
              Register <ChevronRight size={12}/>
            </Link>
          </div>
          {patients.length===0 ? (
            <EmptyState icon={Users} title="No patients yet"/>
          ) : (
            <div className="space-y-2">
              {patients.slice(0,5).map(p=>(
                <div key={p.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-white/[0.03] transition-colors">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-500 to-violet-600
                    flex items-center justify-center text-white font-black text-xs flex-shrink-0">
                    {p.name[0].toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{p.name}</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <MapPin size={9}/> {p.village||'—'} · {p.phone}
                    </p>
                  </div>
                  <span className="text-xs font-black text-red-500">{p.blood_group}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming camps */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Upcoming</p>
              <h2 className="font-bold text-gray-900 dark:text-white">Health Camps</h2>
            </div>
            <Link to="/asha/camps" className="flex items-center gap-1 text-xs text-brand-600 dark:text-brand-400 font-semibold hover:underline">
              View all <ChevronRight size={12}/>
            </Link>
          </div>
          {upcoming.length===0 ? (
            <EmptyState icon={Tent} title="No upcoming camps"
              action={<Link to="/asha/camps" className="btn-primary text-xs py-2 px-4">Schedule Camp</Link>}/>
          ) : (
            <div className="space-y-3">
              {upcoming.map(camp=>(
                <div key={camp.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-teal-50 dark:bg-teal-900/10
                    border border-teal-100 dark:border-teal-500/20">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500
                    flex items-center justify-center flex-shrink-0">
                    <Tent size={16} className="text-white"/>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{camp.village}</p>
                    <p className="text-xs text-gray-500">{fmtDate(camp.scheduled_date)}</p>
                  </div>
                  <span className="badge-info">{camp.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
