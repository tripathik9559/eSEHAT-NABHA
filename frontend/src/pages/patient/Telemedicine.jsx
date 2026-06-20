import { useState, useEffect, useRef, useCallback } from 'react'
import { Video, Mic, MicOff, VideoOff, Wifi, WifiOff, PhoneOff,
         Monitor, Info, ChevronRight } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { listAppointments } from '../../services/api'
import { PageHeader, EmptyState, StatusBadge, RiskBadge } from '../../components/common/index'
import { fmtDateTime, jitsiRoom } from '../../utils/helpers'

function useJitsi() {
  const [ready, setReady] = useState(!!window.JitsiMeetExternalAPI)
  useEffect(() => {
    if (window.JitsiMeetExternalAPI) { setReady(true); return }
    if (document.getElementById('jitsi-api-script')) return
    const s=document.createElement('script')
    s.id='jitsi-api-script'; s.src='https://meet.jit.si/external_api.js'; s.async=true
    s.onload=()=>setReady(true)
    document.head.appendChild(s)
  }, [])
  return ready
}

function CallBanner({ appt, mode, onEnd, lowBW, onToggleBW, onToggleCamera, videoMuted }) {
  const [elapsed,setElapsed]=useState(0)
  useEffect(()=>{ const t=setInterval(()=>setElapsed(s=>s+1),1000); return()=>clearInterval(t) },[])
  const fmt=s=>`${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 animate-gradient"
        style={{background:'linear-gradient(120deg,#2563eb,#7c3aed,#2563eb)',backgroundSize:'200% 200%'}}/>
      <div className="relative flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-brand-600 flex items-center justify-center animate-call-ring">
          {mode==='video'?<Video size={15} className="text-white"/>:<Mic size={15} className="text-white"/>}
        </div>
        <div>
          <p className="text-white text-sm font-bold">{mode==='video'?'Video':'Voice'} Call · {appt.doctor?.name}</p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="flex items-center gap-1 text-xs text-emerald-400 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-soft"/>Live · {fmt(elapsed)}
            </span>
            <span className="text-white/25">·</span>
            <span className="text-xs text-white/50">{appt.doctor?.specialization}</span>
          </div>
        </div>
      </div>
      <div className="relative flex items-center gap-1.5">
        <button onClick={onToggleCamera}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all duration-200 hover:scale-105
            ${videoMuted?'bg-amber-500/25 border-amber-500/40 text-amber-300':'bg-white/10 border-white/20 text-white hover:bg-white/20'}`}>
          {videoMuted?<VideoOff size={13}/>:<Video size={13}/>}
          <span className="hidden sm:inline">{videoMuted?'Cam Off':'Cam On'}</span>
        </button>
        <button onClick={onToggleBW}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all duration-200 hover:scale-105
            ${lowBW?'bg-amber-500/25 border-amber-500/40 text-amber-300':'bg-white/10 border-white/20 text-white hover:bg-white/20'}`}>
          {lowBW?<WifiOff size={13}/>:<Wifi size={13}/>}
          <span className="hidden sm:inline">{lowBW?'Low BW':'HD'}</span>
        </button>
        <button onClick={onEnd}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-black
            bg-red-600 hover:bg-red-700 text-white transition-all duration-200 hover:shadow-lg hover:shadow-red-600/40 hover:scale-105">
          <PhoneOff size={13}/> End
        </button>
      </div>
    </div>
  )
}

export default function Telemedicine() {
  const { user } = useAuth()
  const patientId = user?.ref_id
  const jitsiReady = useJitsi()

  const [appointments,setAppts]   = useState([])
  const [loading,     setLoading] = useState(true)
  const [activeAppt,  setActive]  = useState(null)
  const [callMode,    setCallMode]= useState('video')
  const [videoMuted,  setVideoMuted]=useState(false)
  const [lowBW,       setLowBW]   = useState(false)
  const [callError,   setCallError]=useState('')

  const containerRef = useRef(null)
  const apiRef        = useRef(null)

  useEffect(()=>{ loadAppointments() },[patientId])

  async function loadAppointments() {
    try {
      const res = await listAppointments({ patient_id: patientId })
      setAppts(res.data.filter(a=>a.status==='Scheduled'&&['video','audio','in_person'].includes(a.mode)))
    } catch {} finally { setLoading(false) }
  }

  const initJitsi = useCallback((appt, mode, muted=false, bw=false) => {
    if (!containerRef.current||!window.JitsiMeetExternalAPI) {
      setCallError('Video system is loading. Please wait a moment and try again.'); return
    }
    if (apiRef.current) { try{apiRef.current.dispose()}catch{}; apiRef.current=null }
    containerRef.current.innerHTML=''; setCallError('')
    try {
      const api = new window.JitsiMeetExternalAPI('meet.jit.si', {
        roomName: jitsiRoom(appt.id), width:'100%', height:'100%', parentNode: containerRef.current,
        userInfo: { displayName: user?.name||'Patient' },
        configOverwrite: {
          startWithVideoMuted: mode==='voice'||muted, startWithAudioMuted:false,
          enableWelcomePage:false, prejoinPageEnabled:false, disableDeepLinking:true,
          enableClosePage:false, disableInviteFunctions:true,
          resolution: bw?360:720,
          constraints: { video:{ height:{ ideal:bw?240:720, max:bw?360:1080 } } },
        },
        interfaceConfigOverwrite: {
          TOOLBAR_BUTTONS:['microphone','camera','hangup','chat','raisehand','tileview','fullscreen'],
          SHOW_JITSI_WATERMARK:false, SHOW_BRAND_WATERMARK:false, SHOW_POWERED_BY:false,
          DEFAULT_BACKGROUND:'#111827', TOOLBAR_ALWAYS_VISIBLE:false,
        },
      })
      apiRef.current = api
      api.addEventListeners({
        videoConferenceLeft: endCall, readyToClose: endCall,
        errorOccurred: e=>setCallError(`Call error: ${e?.error?.type||'Unknown error'}`),
      })
    } catch { setCallError('Failed to start call. Check browser permissions and try again.') }
  }, [user])

  function startCall(appt, mode) {
    setActive(appt); setCallMode(mode); setVideoMuted(mode==='voice')
    setTimeout(()=>initJitsi(appt, mode, mode==='voice', lowBW), 250)
  }
  function endCall() {
    if (apiRef.current) { try{apiRef.current.dispose()}catch{}; apiRef.current=null }
    setActive(null); setCallError('')
  }
  function toggleCamera() {
    if (!apiRef.current) return
    setVideoMuted(v=>!v); apiRef.current.executeCommand('toggleVideo')
  }
  function toggleBW() {
    const next=!lowBW; setLowBW(next)
    if (activeAppt) initJitsi(activeAppt, callMode, videoMuted, next)
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Telemedicine" subtitle="Video & voice consultations with your doctor — from anywhere"/>

      {activeAppt && (
        <div className="card overflow-hidden border-gray-800 dark:border-white/10 animate-scale-in">
          <CallBanner appt={activeAppt} mode={callMode} onEnd={endCall} lowBW={lowBW}
            onToggleBW={toggleBW} onToggleCamera={toggleCamera} videoMuted={videoMuted}/>
          {callError && (
            <div className="px-4 py-3 bg-red-900/40 border-b border-red-500/25 text-red-300 text-sm flex items-center gap-2">
              <Info size={14}/> {callError}
            </div>
          )}
          {!jitsiReady ? (
            <div className="h-[420px] bg-gray-900 flex flex-col items-center justify-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-full border-2 border-brand-600 border-t-transparent animate-spin"/>
                <Video size={20} className="text-brand-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/>
              </div>
              <div className="text-center">
                <p className="text-white font-bold">Connecting to call…</p>
                <p className="text-gray-400 text-sm mt-1">Setting up secure connection</p>
              </div>
            </div>
          ) : <div ref={containerRef} className="bg-gray-900" style={{height:'480px'}}/>}
        </div>
      )}

      {!activeAppt && (
        <div className="card p-5 bg-gradient-to-br from-brand-50 to-indigo-50 dark:from-brand-900/8 dark:to-indigo-900/8
          border-brand-100 dark:border-brand-800/25 animate-slide-up">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-100 dark:bg-brand-900/25 flex items-center justify-center flex-shrink-0">
              <Monitor size={17} className="text-brand-600 dark:text-brand-400"/>
            </div>
            <div>
              <p className="font-bold text-sm text-gray-900 dark:text-white mb-2">Before you join</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
                {['📍 Join from a quiet, well-lit location','🎤 Test your microphone before joining',
                  '📶 Use Low BW mode on slow connections','📷 Voice-only uses much less data',
                  '⏱️ Doctor joins at scheduled time','🔒 Calls are end-to-end encrypted'].map((tip,i)=>(
                  <p key={i} className="text-xs text-gray-600 dark:text-gray-300">{tip}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="space-y-3">{[...Array(2)].map((_,i)=><div key={i} className="h-32 skeleton rounded-2xl"/>)}</div>
      ) : appointments.length===0 ? (
        <div className="card"><EmptyState icon={Video} title="No upcoming appointments"
          description="Book a video or audio appointment with a doctor to start a consultation"
          action={<a href="/patient/appointments" className="btn-primary">Book Appointment</a>}/></div>
      ) : (
        <div className="space-y-3">
          <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.12em]">Scheduled Consultations</h2>
          {appointments.map((appt,i)=>(
            <AppointmentCallCard key={appt.id} appt={appt} idx={i} isActive={activeAppt?.id===appt.id}
              onStartVideo={()=>startCall(appt,'video')} onStartVoice={()=>startCall(appt,'voice')} onEnd={endCall}/>
          ))}
        </div>
      )}
    </div>
  )
}

function AppointmentCallCard({ appt, idx, isActive, onStartVideo, onStartVoice, onEnd }) {
  return (
    <div className={`card card-hover p-4 transition-all duration-300 animate-slide-up stagger-${Math.min(idx+1,6)}
      ${isActive?'ring-2 ring-brand-500 ring-offset-2 dark:ring-offset-[#070c18]':''}`}>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-violet-600
          flex items-center justify-center text-white font-black text-lg flex-shrink-0 shadow-sm">
          {appt.doctor?.name?.[4]?.toUpperCase()||'D'}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-gray-900 dark:text-white truncate">{appt.doctor?.name}</p>
          <p className="text-xs text-gray-500 mt-0.5">{appt.doctor?.specialization}</p>
          <p className="text-xs text-gray-400 mt-0.5">{fmtDateTime(appt.datetime)}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <RiskBadge level={appt.priority_level}/>
          <StatusBadge status={appt.status}/>
        </div>
      </div>

      {!isActive ? (
        <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-white/[0.05]">
          <button onClick={onStartVideo}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white
              text-sm font-bold hover:shadow-lg hover:shadow-brand-600/30 active:scale-[0.98] transition-all duration-200 hover:scale-[1.01]">
            <Video size={15}/> Join Video Call
          </button>
          <button onClick={onStartVoice}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl
              bg-gray-100 dark:bg-white/[0.05] text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-white/[0.07]
              hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200
              dark:hover:bg-emerald-500/10 dark:hover:text-emerald-400 dark:hover:border-emerald-500/25
              text-sm font-bold active:scale-[0.98] transition-all duration-200 hover:scale-[1.02]">
            <Mic size={15}/><span className="hidden sm:inline">Voice Only</span>
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-brand-100 dark:border-brand-500/15">
          <span className="flex items-center gap-2 text-xs font-bold text-brand-600 dark:text-brand-400">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse-soft"/>Call in progress
          </span>
          <button onClick={onEnd} className="btn-danger py-1.5 px-4 text-xs"><PhoneOff size={13}/> End Call</button>
        </div>
      )}
    </div>
  )
}
