import { useState, useEffect, useRef } from 'react'
import { Bell, Sun, Moon, Globe, Menu, X, LogOut, ChevronDown, Settings } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useTheme } from '../../contexts/ThemeContext'
import { useLang } from '../../contexts/LangContext'
import { getNotifications, markAllRead, markNotifRead } from '../../services/api'
import { fromNow } from '../../utils/helpers'

const ROLE_GRAD = {
  patient:'from-sky-400 to-blue-600', doctor:'from-violet-400 to-purple-700',
  asha:'from-teal-400 to-emerald-600', admin:'from-orange-400 to-amber-600', pharmacy:'from-pink-400 to-rose-600',
}
const NOTIF_ICONS = { appointment_reminder:'📅', appointment_update:'✅', medicine_refill:'💊', health_camp:'🏕️' }

export default function TopBar({ onMenuClick, sidebarOpen }) {
  const { user, logout }     = useAuth()
  const { dark, toggle }     = useTheme()
  const { lang, setLang }    = useLang()
  const [notifs,    setNotifs]   = useState([])
  const [unread,    setUnread]   = useState(0)
  const [openNotif, setOpenNotif]= useState(false)
  const [openLang,  setOpenLang] = useState(false)
  const [openProf,  setOpenProf] = useState(false)
  const notifRef=useRef(null), langRef=useRef(null), profRef=useRef(null)

  useEffect(()=>{ fetchNotifs(); const id=setInterval(fetchNotifs,30000); return()=>clearInterval(id) },[])

  useEffect(()=>{
    function h(e){
      if(notifRef.current&&!notifRef.current.contains(e.target)) setOpenNotif(false)
      if(langRef.current&&!langRef.current.contains(e.target))   setOpenLang(false)
      if(profRef.current&&!profRef.current.contains(e.target))   setOpenProf(false)
    }
    document.addEventListener('mousedown',h)
    return ()=>document.removeEventListener('mousedown',h)
  },[])

  async function fetchNotifs(){
    try{ const r=await getNotifications(); setNotifs(r.data); setUnread(r.data.filter(n=>!n.is_read).length) }catch{}
  }
  async function markAll(){ try{await markAllRead();setNotifs(n=>n.map(x=>({...x,is_read:true})));setUnread(0)}catch{} }
  async function markOne(id){ try{await markNotifRead(id);setNotifs(n=>n.map(x=>x.id===id?{...x,is_read:true}:x));setUnread(u=>Math.max(0,u-1))}catch{} }

  const LANGS=[{code:'en',label:'English'},{code:'hi',label:'हिन्दी'},{code:'pa',label:'ਪੰਜਾਬੀ'}]
  const grad=ROLE_GRAD[user?.role]||ROLE_GRAD.patient

  return (
    <header className="h-14 flex items-center justify-between px-4 sticky top-0 z-30
      bg-white/85 dark:bg-[#080d1a]/90 backdrop-blur-xl
      border-b border-gray-200/50 dark:border-white/[0.04]
      shadow-[0_1px_0_rgba(0,0,0,0.04)]">

      {/* Left */}
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="btn-ghost p-2 lg:hidden">
          <div className="relative w-5 h-4 flex flex-col justify-between">
            <span className={`block h-0.5 bg-current rounded-full transition-all duration-300 origin-center
              ${sidebarOpen?'rotate-45 translate-y-[7px]':''}`}/>
            <span className={`block h-0.5 bg-current rounded-full transition-all duration-300
              ${sidebarOpen?'opacity-0 scale-x-0':''}`}/>
            <span className={`block h-0.5 bg-current rounded-full transition-all duration-300 origin-center
              ${sidebarOpen?'-rotate-45 -translate-y-[7px]':''}`}/>
          </div>
        </button>
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${grad} flex items-center justify-center shadow-sm`}>
            <span className="text-white text-xs font-black">eS</span>
          </div>
          <div className="hidden sm:block">
            <span className="font-black text-sm text-gray-900 dark:text-white tracking-tight">eSEHAT</span>
            <span className="text-sm text-gray-400 dark:text-gray-500 font-medium ml-1">Nabha</span>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-0.5">

        {/* Language */}
        <div className="relative" ref={langRef}>
          <button onClick={()=>setOpenLang(s=>!s)} className="btn-ghost p-2.5">
            <Globe size={17}/>
          </button>
          {openLang && (
            <div className="absolute right-0 top-11 w-40 bg-white dark:bg-[#0f1623]
              rounded-2xl shadow-[0_16px_50px_rgba(0,0,0,0.15)] border border-gray-200/60 dark:border-white/[0.07]
              py-1.5 animate-slide-down z-50 overflow-hidden">
              {LANGS.map(l=>(
                <button key={l.code} onClick={()=>{setLang(l.code);setOpenLang(false)}}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors font-medium
                    ${lang===l.code
                      ?'bg-brand-50 dark:bg-brand-500/12 text-brand-700 dark:text-brand-400 font-bold'
                      :'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/[0.04]'}`}>
                  {l.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Theme */}
        <button onClick={toggle} className="btn-ghost p-2.5">
          {dark
            ? <Sun  size={17} className="text-amber-400"/>
            : <Moon size={17}/>}
        </button>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button onClick={()=>setOpenNotif(s=>!s)} className="btn-ghost p-2.5 relative">
            <Bell size={17}/>
            {unread>0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white
                text-[9px] font-black rounded-full flex items-center justify-center
                ring-2 ring-white dark:ring-[#080d1a]">
                {unread>9?'9+':unread}
              </span>
            )}
          </button>

          {openNotif && (
            <div className="absolute right-0 top-11 w-80 bg-white dark:bg-[#0f1623]
              rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.18)] border border-gray-200/60 dark:border-white/[0.07]
              animate-slide-down z-50 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-100 dark:border-white/[0.05]">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-gray-900 dark:text-white">Notifications</span>
                  {unread>0 && <span className="badge-info">{unread} new</span>}
                </div>
                {unread>0 && (
                  <button onClick={markAll} className="text-xs text-brand-600 dark:text-brand-400 font-bold hover:underline">
                    Mark all read
                  </button>
                )}
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-gray-50 dark:divide-white/[0.03]">
                {notifs.length===0 ? (
                  <div className="py-10 text-center">
                    <Bell size={22} className="mx-auto text-gray-300 dark:text-gray-600 mb-2"/>
                    <p className="text-sm text-gray-400">No notifications</p>
                  </div>
                ) : notifs.map(n=>(
                  <button key={n.id} onClick={()=>!n.is_read&&markOne(n.id)}
                    className={`w-full flex gap-3 px-4 py-3.5 text-left transition-colors hover:bg-gray-50 dark:hover:bg-white/[0.03]
                      ${!n.is_read?'bg-brand-50/50 dark:bg-brand-900/8':''}`}>
                    <span className="text-lg mt-0.5 flex-shrink-0">{NOTIF_ICONS[n.type]||'🔔'}</span>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm leading-snug ${!n.is_read?'font-semibold text-gray-900 dark:text-white':'text-gray-500 dark:text-gray-400'}`}>
                        {n.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5 font-medium">{fromNow(n.created_at)}</p>
                    </div>
                    {!n.is_read && <div className="w-2 h-2 rounded-full bg-brand-500 mt-1.5 flex-shrink-0"/>}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative ml-1" ref={profRef}>
          <button onClick={()=>setOpenProf(s=>!s)}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl
              hover:bg-gray-100 dark:hover:bg-white/[0.06] transition-all duration-200">
            <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${grad}
              flex items-center justify-center text-white text-xs font-black shadow-sm flex-shrink-0`}>
              {user?.name?.[0]?.toUpperCase()||'U'}
            </div>
            <div className="hidden sm:block text-left min-w-0 max-w-[90px]">
              <p className="text-[11px] font-bold text-gray-800 dark:text-white truncate leading-tight">{user?.name}</p>
              <p className="text-[10px] text-gray-400 capitalize">{user?.role}</p>
            </div>
            <ChevronDown size={12} className="text-gray-400 hidden sm:block flex-shrink-0"/>
          </button>

          {openProf && (
            <div className="absolute right-0 top-12 w-52 bg-white dark:bg-[#0f1623]
              rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.18)] border border-gray-200/60 dark:border-white/[0.07]
              py-1.5 animate-slide-down z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 dark:border-white/[0.05]">
                <div className={`h-1 w-10 rounded-full bg-gradient-to-r ${grad} mb-2.5`}/>
                <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{user?.name}</p>
                <p className="text-xs text-gray-400 capitalize mt-0.5">{user?.role} Portal</p>
              </div>
              <button onClick={logout}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 dark:text-red-400
                  hover:bg-red-50 dark:hover:bg-red-500/8 transition-colors font-semibold">
                <LogOut size={14}/> Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
