import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Calendar, FileText, Stethoscope, QrCode,
  Video, Pill, MapPin, ClipboardList, Users, Tent, UserPlus,
  BarChart3, UserCheck, Activity, Package, ChevronRight, Zap
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useLang } from '../../contexts/LangContext'

const MENUS = {
  patient:  [
    { to:'/patient',              icon:LayoutDashboard, label:'Dashboard'        },
    { to:'/patient/appointments', icon:Calendar,        label:'Appointments'     },
    { to:'/patient/records',      icon:FileText,        label:'Health Records'   },
    { to:'/patient/symptoms',     icon:Stethoscope,     label:'Symptom Checker'  },
    { to:'/patient/qr',          icon:QrCode,           label:'QR Health Card'   },
    { to:'/patient/telemedicine', icon:Video,            label:'Telemedicine'     },
    { to:'/patient/medicines',    icon:Pill,             label:'Medicines'        },
  ],
  doctor:   [
    { to:'/doctor',               icon:LayoutDashboard, label:'Dashboard'        },
    { to:'/doctor/appointments',  icon:Calendar,        label:'Appointments'     },
    { to:'/doctor/queue',         icon:ClipboardList,   label:'Priority Queue'   },
    { to:'/doctor/prescriptions', icon:FileText,        label:'Prescriptions'    },
    { to:'/doctor/history',       icon:Users,           label:'Patient History'  },
  ],
  asha:     [
    { to:'/asha',                 icon:LayoutDashboard, label:'Dashboard'        },
    { to:'/asha/register',        icon:UserPlus,        label:'Register Patient' },
    { to:'/asha/camps',           icon:Tent,            label:'Health Camps'     },
    { to:'/asha/telemedicine',    icon:Video,           label:'Telemedicine'     },
  ],
  admin:    [
    { to:'/admin',                icon:LayoutDashboard, label:'Dashboard'        },
    { to:'/admin/analytics',      icon:BarChart3,       label:'Analytics'        },
    { to:'/admin/availability',   icon:UserCheck,       label:'Availability'     },
    { to:'/admin/workload',       icon:Activity,        label:'Workload'         },
    { to:'/admin/camps',          icon:Tent,            label:'Health Camps'     },
  ],
  pharmacy: [
    { to:'/pharmacy',             icon:LayoutDashboard, label:'Dashboard'        },
    { to:'/pharmacy/inventory',   icon:Package,         label:'Inventory'        },
    { to:'/pharmacy/locator',     icon:MapPin,          label:'Pharmacies'       },
  ],
}

const ROLE_META = {
  patient:  { label:'Patient Portal',   grad:'from-sky-400 to-blue-600',       dot:'bg-blue-500',    accent:'border-blue-500/20 bg-blue-500/5'   },
  doctor:   { label:'Doctor Portal',    grad:'from-violet-400 to-purple-700',  dot:'bg-violet-500',  accent:'border-violet-500/20 bg-violet-500/5'},
  asha:     { label:'ASHA Portal',      grad:'from-teal-400 to-emerald-600',   dot:'bg-teal-500',    accent:'border-teal-500/20 bg-teal-500/5'   },
  admin:    { label:'Admin Portal',     grad:'from-orange-400 to-amber-600',   dot:'bg-orange-500',  accent:'border-orange-500/20 bg-orange-500/5'},
  pharmacy: { label:'Pharmacy Portal',  grad:'from-pink-400 to-rose-600',      dot:'bg-pink-500',    accent:'border-pink-500/20 bg-pink-500/5'   },
}

export default function Sidebar({ open, onClose }) {
  const { user } = useAuth()
  const role  = user?.role||'patient'
  const menu  = MENUS[role]||[]
  const meta  = ROLE_META[role]||ROLE_META.patient

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-20 lg:hidden" onClick={onClose}
          style={{background:'rgba(0,0,0,0.5)',backdropFilter:'blur(8px)'}}/>
      )}

      <aside className={`
        fixed top-14 left-0 bottom-0 z-20 w-56 flex flex-col
        bg-white dark:bg-[#0a0f1c]
        border-r border-gray-200/70 dark:border-white/[0.05]
        sidebar-transition
        ${open?'translate-x-0':'-translate-x-full'}
        lg:translate-x-0
      `}>

        {/* Role badge */}
        <div className="px-3 pt-4 pb-2">
          <div className={`relative overflow-hidden rounded-xl p-3.5 border ${meta.accent}`}>
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${meta.grad}
                  flex items-center justify-center shadow-sm text-white text-xs font-black`}>
                  {user?.name?.[0]?.toUpperCase()||'U'}
                </div>
                <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full ${meta.dot}
                  border-2 border-white dark:border-[#0a0f1c] animate-pulse-soft`}/>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-black text-gray-900 dark:text-white truncate leading-tight">{user?.name}</p>
                <p className="text-[10px] text-gray-400 mt-0.5 font-medium">{meta.label}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-2.5 py-2 space-y-0.5">
          {menu.map(({ to, icon:Icon, label }, idx) => (
            <NavLink key={to} to={to} end={to===`/${role}`||to==='/asha'}
              onClick={onClose}
              className={({ isActive }) => `
                group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold
                transition-all duration-200 relative overflow-hidden
                animate-slide-right stagger-${Math.min(idx+1,6)}
                ${isActive
                  ? `bg-gradient-to-r ${meta.grad} text-white shadow-sm`
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/[0.05] hover:text-gray-800 dark:hover:text-white'}
              `}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <div className="absolute inset-0 opacity-20"
                      style={{background:'linear-gradient(90deg,rgba(255,255,255,0.2) 0%,transparent 100%)'}}/>
                  )}
                  <Icon size={16} className={`relative z-10 flex-shrink-0 ${isActive?'text-white':'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200 transition-colors'}`}/>
                  <span className="relative z-10 flex-1 truncate">{label}</span>
                  {isActive && <ChevronRight size={12} className="relative z-10 text-white/60 flex-shrink-0"/>}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-gray-100 dark:border-white/[0.04]">
          <div className="flex items-center gap-2 px-2 py-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-soft flex-shrink-0"/>
            <p className="text-[10px] text-gray-400 font-medium">Civil Hospital Nabha · Punjab</p>
          </div>
        </div>
      </aside>
    </>
  )
}
