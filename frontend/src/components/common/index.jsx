import { useEffect, useState } from 'react'
import { X, WifiOff, Wifi, AlertCircle, TrendingUp, Info, Activity } from 'lucide-react'

/* ── Badge ─────────────────────────────────────────────────────────────── */
export function Badge({ variant='info', children, className='' }) {
  const S = {
    high:    'badge-high', moderate:'badge-moderate', mild:'badge-mild',
    info:    'badge-info',
    success: 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400',
    warning: 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400',
    danger:  'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400',
    gray:    'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
  }
  return <span className={`${S[variant]||S.info} ${className}`}>{children}</span>
}

/* ── Skeleton ─────────────────────────────────────────────────────────── */
export function Skeleton({ className='' }) {
  return <div className={`skeleton ${className}`}/>
}

export function SkeletonCard() {
  return (
    <div className="card p-5 space-y-4 overflow-hidden">
      <div className="flex justify-between items-start">
        <div className="space-y-2 flex-1">
          <Skeleton className="h-2.5 w-20"/>
          <Skeleton className="h-8 w-14"/>
        </div>
        <Skeleton className="w-11 h-11 rounded-xl"/>
      </div>
      <Skeleton className="h-2 w-3/4"/>
    </div>
  )
}

/* ── EmptyState ───────────────────────────────────────────────────────── */
export function EmptyState({ icon:Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center px-6">
      {Icon && (
        <div className="relative mb-5">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-white/[0.04]
            flex items-center justify-center border border-gray-200 dark:border-white/[0.06]">
            <Icon size={26} className="text-gray-300 dark:text-gray-600"/>
          </div>
          <div className="absolute -inset-2 rounded-3xl border border-gray-100 dark:border-white/[0.03] opacity-60"/>
        </div>
      )}
      <h3 className="text-sm font-bold text-gray-700 dark:text-gray-200">{title}</h3>
      {description && <p className="text-sm text-gray-400 mt-1.5 max-w-xs leading-relaxed">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}

/* ── Modal ────────────────────────────────────────────────────────────── */
export function Modal({ open, onClose, title, children, size='md' }) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])
  if (!open) return null
  const sizes = { sm:'max-w-sm', md:'max-w-lg', lg:'max-w-2xl', xl:'max-w-4xl' }
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose}/>
      <div className={`relative w-full ${sizes[size]}
        bg-white dark:bg-[#0f1623]
        rounded-t-2xl sm:rounded-2xl shadow-[0_32px_100px_rgba(0,0,0,0.35)]
        animate-slide-up max-h-[92vh] overflow-y-auto
        border border-gray-200/60 dark:border-white/[0.07]`}>
        <div className="flex items-center justify-between px-5 py-4
          border-b border-gray-100 dark:border-white/[0.05]
          sticky top-0 bg-white dark:bg-[#0f1623] z-10 rounded-t-2xl">
          <h2 className="font-bold text-gray-900 dark:text-white tracking-tight">{title}</h2>
          <button onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center
              hover:bg-gray-100 dark:hover:bg-white/[0.07] transition-colors text-gray-400 hover:text-gray-700 dark:hover:text-white">
            <X size={15}/>
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  )
}

/* ── Offline Banner ───────────────────────────────────────────────────── */
export function OfflineBanner() {
  const [online,   setOnline]   = useState(navigator.onLine)
  const [justBack, setJustBack] = useState(false)
  useEffect(() => {
    const onOnline  = () => { setOnline(true);  setJustBack(true); setTimeout(()=>setJustBack(false),3500) }
    const onOffline = () => { setOnline(false); setJustBack(false) }
    window.addEventListener('online',  onOnline)
    window.addEventListener('offline', onOffline)
    return () => { window.removeEventListener('online',onOnline); window.removeEventListener('offline',onOffline) }
  }, [])
  if (online && !justBack) return null
  return (
    <div className={`lg:ml-56 flex items-center gap-2.5 px-5 py-2.5 text-xs font-bold
      ${!online?'bg-amber-500 text-white':'bg-emerald-500 text-white'}`}>
      {!online?<WifiOff size={13}/>:<Wifi size={13}/>}
      {!online?'You are offline — data will sync when reconnected':'Back online — syncing your data…'}
    </div>
  )
}
export default OfflineBanner

/* ── Stat Card ────────────────────────────────────────────────────────── */
export function StatCard({ icon:Icon, label, value, sub, color='blue', loading, trend }) {
  const P = {
    blue:   { icon:'bg-blue-100   dark:bg-blue-500/12  text-blue-600   dark:text-blue-400',   ring:'ring-blue-100   dark:ring-blue-500/15',   grad:'from-blue-500   to-blue-600'   },
    green:  { icon:'bg-emerald-100 dark:bg-emerald-500/12 text-emerald-600 dark:text-emerald-400', ring:'ring-emerald-100 dark:ring-emerald-500/15', grad:'from-emerald-500 to-teal-600'  },
    red:    { icon:'bg-red-100    dark:bg-red-500/12   text-red-600    dark:text-red-400',    ring:'ring-red-100    dark:ring-red-500/15',    grad:'from-red-500    to-rose-600'   },
    amber:  { icon:'bg-amber-100  dark:bg-amber-500/12 text-amber-600  dark:text-amber-400',  ring:'ring-amber-100  dark:ring-amber-500/15',  grad:'from-amber-500  to-orange-500' },
    violet: { icon:'bg-violet-100 dark:bg-violet-500/12 text-violet-600 dark:text-violet-400', ring:'ring-violet-100 dark:ring-violet-500/15', grad:'from-violet-500 to-purple-600' },
    teal:   { icon:'bg-teal-100   dark:bg-teal-500/12  text-teal-600   dark:text-teal-400',   ring:'ring-teal-100   dark:ring-teal-500/15',   grad:'from-teal-500   to-cyan-600'   },
  }
  const c = P[color]||P.blue
  if (loading) return <SkeletonCard/>
  return (
    <div className="card card-hover p-5 group cursor-default">
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.12em] leading-none">{label}</p>
          <p className="text-2xl font-black text-gray-900 dark:text-white mt-2 leading-none animate-count-up">{value??'—'}</p>
          {sub && <p className="text-xs text-gray-400 mt-1.5 font-medium">{sub}</p>}
          {trend !== undefined && (
            <div className={`flex items-center gap-1 mt-2 text-[11px] font-bold ${trend>=0?'text-emerald-600 dark:text-emerald-400':'text-red-600 dark:text-red-400'}`}>
              <TrendingUp size={10} className={trend<0?'rotate-180':''}/>{Math.abs(trend)}% vs last week
            </div>
          )}
        </div>
        <div className={`w-11 h-11 rounded-2xl ${c.icon} flex items-center justify-center flex-shrink-0
          ring-4 ${c.ring}
          group-hover:scale-110 group-hover:rotate-[-6deg]
          transition-all duration-300 ease-out`}>
          <Icon size={19}/>
        </div>
      </div>
      {/* Bottom accent */}
      <div className={`h-0.5 mt-4 rounded-full bg-gradient-to-r ${c.grad} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}/>
    </div>
  )
}

/* ── Page Header ──────────────────────────────────────────────────────── */
export function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="flex items-start justify-between mb-6 gap-4">
      <div>
        <h1 className="text-xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">{title}</h1>
        {subtitle && <p className="text-sm text-gray-400 mt-1 leading-relaxed">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>}
    </div>
  )
}

/* ── Risk Badge ───────────────────────────────────────────────────────── */
export function RiskBadge({ level }) {
  const map  = { High:'badge-high', Moderate:'badge-moderate', Mild:'badge-mild' }
  const dot  = { High:'bg-red-500', Moderate:'bg-amber-500',   Mild:'bg-emerald-500' }
  return (
    <span className={map[level]||'badge-info'}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot[level]||'bg-blue-500'} animate-pulse-soft`}/>
      {level}
    </span>
  )
}

/* ── Status Badge ─────────────────────────────────────────────────────── */
export function StatusBadge({ status }) {
  const S = {
    Scheduled: 'badge-info',
    Completed: 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400',
    Cancelled: 'badge-gray',
    Missed:    'badge-high',
  }
  return <span className={S[status]||'badge-info'}>{status}</span>
}

/* ── Alert ────────────────────────────────────────────────────────────── */
export function Alert({ variant='info', children }) {
  const icons = { info:Info, success:TrendingUp, warning:AlertCircle, danger:AlertCircle }
  const S = {
    info:    'bg-blue-50    border-blue-200/60   text-blue-800    dark:bg-blue-500/10  dark:border-blue-500/25  dark:text-blue-300',
    success: 'bg-emerald-50 border-emerald-200/60 text-emerald-800 dark:bg-emerald-500/10 dark:border-emerald-500/25 dark:text-emerald-300',
    warning: 'bg-amber-50   border-amber-200/60  text-amber-800   dark:bg-amber-500/10 dark:border-amber-500/25  dark:text-amber-300',
    danger:  'bg-red-50     border-red-200/60    text-red-800     dark:bg-red-500/10   dark:border-red-500/25    dark:text-red-300',
  }
  const Icon = icons[variant]||AlertCircle
  return (
    <div className={`flex gap-3 p-4 rounded-xl border text-sm font-medium ${S[variant]}`}>
      <Icon size={15} className="mt-0.5 flex-shrink-0"/>
      <div>{children}</div>
    </div>
  )
}
