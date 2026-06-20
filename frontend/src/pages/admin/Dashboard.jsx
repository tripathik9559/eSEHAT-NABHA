import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Users, Calendar, AlertTriangle, UserCheck,
         BarChart3, Activity, ChevronRight, Tent, TrendingUp } from 'lucide-react'
import { getAnalytics } from '../../services/api'
import { StatCard, PageHeader, SkeletonCard } from '../../components/common/index'
import { BarChart, LineChart, DonutChart, ProgressBar } from '../../components/charts/index'

const QUICK = [
  { to:'/admin/analytics',    icon:BarChart3,  label:'Analytics',     grad:'from-brand-500 to-blue-600',    glow:'shadow-brand-500/25'   },
  { to:'/admin/availability', icon:UserCheck,  label:'Availability',  grad:'from-violet-500 to-purple-600', glow:'shadow-violet-500/25'  },
  { to:'/admin/workload',     icon:Activity,   label:'Workload',      grad:'from-amber-500 to-orange-500',  glow:'shadow-amber-500/25'   },
  { to:'/admin/camps',        icon:Tent,       label:'Health Camps',  grad:'from-teal-500 to-emerald-500',  glow:'shadow-teal-500/25'    },
]

export default function AdminDashboard() {
  const [data,    setData]    = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAnalytics().then(r=>setData(r.data)).catch(()=>{}).finally(()=>setLoading(false))
  }, [])

  const riskDonut = data ? [
    { label:'High',     value: data.disease_trends?.find(d=>d.label==='High')?.count     || 0, color:'#EF4444' },
    { label:'Moderate', value: data.disease_trends?.find(d=>d.label==='Moderate')?.count || 0, color:'#F59E0B' },
    { label:'Mild',     value: data.disease_trends?.find(d=>d.label==='Mild')?.count     || 0, color:'#10B981' },
  ] : []

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Admin Portal</p>
        <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">System Overview</h1>
        <p className="text-sm text-gray-400 mt-1">Civil Hospital Nabha — Real-time dashboard</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {loading ? [...Array(4)].map((_,i)=><SkeletonCard key={i}/>) : <>
          <div className="animate-slide-up stagger-1"><StatCard icon={Users}         label="Patients"     value={data?.total_patients     ??'—'} color="blue"   /></div>
          <div className="animate-slide-up stagger-2"><StatCard icon={Calendar}      label="Appointments" value={data?.total_appointments ??'—'} color="violet" /></div>
          <div className="animate-slide-up stagger-3"><StatCard icon={TrendingUp}    label="Today"        value={data?.appointments_today ??'—'} color="green"  /></div>
          <div className="animate-slide-up stagger-4"><StatCard icon={AlertTriangle} label="High Risk"    value={data?.high_risk_patients ??'—'} color="red"    /></div>
        </>}
      </div>

      {/* Quick nav */}
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Modules</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {QUICK.map(({to,icon:Icon,label,grad,glow})=>(
            <Link key={to} to={to}
              className="group card p-4 flex flex-col items-center gap-3 hover:shadow-card-hover transition-all duration-200">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${grad} flex items-center justify-center
                shadow-lg ${glow} group-hover:scale-110 transition-all duration-200`}>
                <Icon size={21} className="text-white"/>
              </div>
              <span className="text-xs font-bold text-gray-700 dark:text-gray-200">{label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Weekly trend */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">7-Day Trend</p>
              <h2 className="font-bold text-gray-900 dark:text-white">Appointments</h2>
            </div>
            <Link to="/admin/analytics" className="text-xs text-brand-600 dark:text-brand-400 font-semibold hover:underline flex items-center gap-1">
              Full analytics <ChevronRight size={12}/>
            </Link>
          </div>
          {loading
            ? <div className="h-44 skeleton rounded-xl"/>
            : data?.weekly_trend?.length > 1
              ? <LineChart data={data.weekly_trend} height={170} labelKey="date" valueKey="count"/>
              : <p className="text-sm text-gray-400 text-center py-10">Insufficient data</p>}
        </div>

        {/* Risk donut */}
        <div className="card p-5">
          <div className="mb-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">30-Day Analysis</p>
            <h2 className="font-bold text-gray-900 dark:text-white">Risk Distribution</h2>
          </div>
          {loading
            ? <div className="h-44 skeleton rounded-xl"/>
            : (
              <div className="flex items-center gap-6">
                <DonutChart data={riskDonut} size={140}/>
                <div className="flex-1 space-y-3">
                  {riskDonut.map(d=>(
                    <div key={d.label}>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="font-bold text-gray-700 dark:text-gray-200">{d.label} Risk</span>
                        <span className="text-gray-400">{d.value}</span>
                      </div>
                      <ProgressBar value={d.value} max={Math.max(...riskDonut.map(x=>x.value),1)} color={d.color} showPct={false}/>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>
      </div>

      {/* Doctor workload mini */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Utilization</p>
            <h2 className="font-bold text-gray-900 dark:text-white">Doctor Workload</h2>
          </div>
          <Link to="/admin/workload" className="text-xs text-brand-600 dark:text-brand-400 font-semibold hover:underline flex items-center gap-1">
            Details <ChevronRight size={12}/>
          </Link>
        </div>
        {loading
          ? <div className="space-y-3">{[...Array(3)].map((_,i)=><div key={i} className="h-8 skeleton rounded-xl"/>)}</div>
          : (
            <div className="space-y-3">
              {(data?.doctor_utilization||[]).slice(0,5).map(doc=>(
                <div key={doc.doctor_id}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${doc.available ? 'bg-emerald-500':'bg-gray-300'}`}/>
                      <span className="font-semibold text-gray-700 dark:text-gray-200">{doc.name}</span>
                    </div>
                    <span className="text-gray-400">{doc.completed_appointments}/{doc.total_appointments} · <strong>{doc.utilization}%</strong></span>
                  </div>
                  <ProgressBar value={doc.utilization} max={100}
                    color={doc.utilization>75?'#EF4444':doc.utilization>50?'#F59E0B':'#10B981'}
                    showPct={false}/>
                </div>
              ))}
            </div>
          )}
      </div>
    </div>
  )
}
