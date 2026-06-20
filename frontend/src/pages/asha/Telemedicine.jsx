import { useState, useEffect, useRef, useCallback } from 'react'
import { Video, Mic, MicOff, VideoOff, Wifi, WifiOff, PhoneOff, Users } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { listAppointments } from '../../services/api'
import { PageHeader, EmptyState } from '../../components/common/index'
import { fmtDateTime, jitsiRoom } from '../../utils/helpers'

function useJitsi() {
  const [ready, setReady] = useState(!!window.JitsiMeetExternalAPI)
  useEffect(() => {
    if (window.JitsiMeetExternalAPI) { setReady(true); return }
    if (document.getElementById('jitsi-api-script')) return
    const s = document.createElement('script')
    s.id = 'jitsi-api-script'; s.src = 'https://meet.jit.si/external_api.js'; s.async = true
    s.onload = () => setReady(true)
    document.head.appendChild(s)
  }, [])
  return ready
}

export default function ASHATelemedicine() {
  const { user }   = useAuth()
  const jitsiReady = useJitsi()

  const [appointments, setAppts]    = useState([])
  const [loading,      setLoading]  = useState(true)
  const [activeAppt,   setActive]   = useState(null)
  const [callMode,     setMode]     = useState('video')
  const [videoMuted,   setVidMuted] = useState(false)
  const [lowBW,        setLowBW]    = useState(false)

  const containerRef = useRef(null)
  const apiRef       = useRef(null)

  useEffect(() => {
    listAppointments()
      .then(r => {
        const tele = r.data.filter(a => a.status === 'Scheduled')
        setAppts(tele)
      }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const initJitsi = useCallback((appt, mode, muted, bw) => {
    if (!containerRef.current || !window.JitsiMeetExternalAPI) return
    if (apiRef.current) { try { apiRef.current.dispose() } catch {}; apiRef.current = null }
    containerRef.current.innerHTML = ''
    try {
      const api = new window.JitsiMeetExternalAPI('meet.jit.si', {
        roomName:   jitsiRoom(appt.id),
        width:      '100%',
        height:     '100%',
        parentNode: containerRef.current,
        userInfo:   { displayName: `${user?.name} (ASHA)` },
        configOverwrite: {
          startWithVideoMuted: mode === 'voice' || muted,
          startWithAudioMuted: false,
          enableWelcomePage:   false,
          prejoinPageEnabled:  false,
          disableDeepLinking:  true,
          resolution:          bw ? 360 : 720,
        },
        interfaceConfigOverwrite: {
          TOOLBAR_BUTTONS: ['microphone', 'camera', 'hangup', 'chat', 'tileview', 'fullscreen'],
          SHOW_JITSI_WATERMARK: false,
          DEFAULT_BACKGROUND: '#111827',
        },
      })
      apiRef.current = api
      api.addEventListeners({ videoConferenceLeft: endCall, readyToClose: endCall })
    } catch {}
  }, [user])

  function startCall(appt, mode) {
    setActive(appt); setMode(mode); setVidMuted(mode === 'voice')
    setTimeout(() => initJitsi(appt, mode, mode === 'voice', lowBW), 250)
  }

  function endCall() {
    if (apiRef.current) { try { apiRef.current.dispose() } catch {}; apiRef.current = null }
    setActive(null)
  }

  function toggleCamera() {
    if (!apiRef.current) return
    const next = !videoMuted; setVidMuted(next)
    apiRef.current.executeCommand('toggleVideo')
  }

  function toggleBW() {
    const next = !lowBW; setLowBW(next)
    if (activeAppt) initJitsi(activeAppt, callMode, videoMuted, next)
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Assist Telemedicine" subtitle="Help patients connect with doctors via video or voice call" />

      {/* Active call */}
      {activeAppt && (
        <div className="card overflow-hidden animate-slide-up">
          {/* Call bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-gray-900 to-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center animate-call-ring">
                {callMode === 'video' ? <Video size={14} className="text-white" /> : <Mic size={14} className="text-white" />}
              </div>
              <div>
                <p className="text-white text-sm font-bold">
                  {callMode === 'video' ? 'Video' : 'Voice'} · {activeAppt.patient?.name} ↔ {activeAppt.doctor?.name}
                </p>
                <span className="flex items-center gap-1 text-xs text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-soft" />
                  Live Call
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button onClick={toggleCamera}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all
                  ${videoMuted ? 'bg-amber-500/30 border-amber-500/50 text-amber-300' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}`}>
                {videoMuted ? <VideoOff size={13} /> : <Video size={13} />}
              </button>
              <button onClick={toggleBW}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all
                  ${lowBW ? 'bg-amber-500/30 border-amber-500/50 text-amber-300' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}`}>
                {lowBW ? <WifiOff size={13} /> : <Wifi size={13} />}
              </button>
              <button onClick={endCall}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-red-600 hover:bg-red-700 text-white flex items-center gap-1.5">
                <PhoneOff size={13} /> End
              </button>
            </div>
          </div>

          {!jitsiReady ? (
            <div className="h-96 bg-gray-900 flex items-center justify-center">
              <div className="text-center">
                <div className="w-10 h-10 rounded-full border-2 border-brand-600 border-t-transparent animate-spin mx-auto mb-3" />
                <p className="text-white text-sm font-semibold">Connecting…</p>
              </div>
            </div>
          ) : (
            <div ref={containerRef} className="bg-gray-900" style={{ height: '460px' }} />
          )}
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="card p-8 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-brand-600 border-t-transparent animate-spin" />
        </div>
      ) : appointments.length === 0 ? (
        <div className="card">
          <EmptyState icon={Video} title="No appointments to assist"
            description="Scheduled appointments will appear here for you to assist patients" />
        </div>
      ) : (
        <div className="space-y-3">
          {appointments.map(appt => (
            <div key={appt.id} className={`card card-hover p-4 transition-all ${activeAppt?.id === appt.id ? 'ring-2 ring-brand-500' : ''}`}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600
                  flex items-center justify-center flex-shrink-0">
                  <Users size={20} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 dark:text-white">
                    {appt.patient?.name} <span className="text-gray-400 font-normal">↔</span> {appt.doctor?.name}
                  </p>
                  <p className="text-xs text-gray-500">{appt.doctor?.specialization} · {fmtDateTime(appt.datetime)}</p>
                </div>
              </div>

              {activeAppt?.id !== appt.id ? (
                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-white/[0.05]">
                  <button onClick={() => startCall(appt, 'video')}
                    className="flex-1 btn-primary py-2 text-xs">
                    <Video size={13} /> Join Video
                  </button>
                  <button onClick={() => startCall(appt, 'voice')}
                    className="btn-secondary py-2 px-4 text-xs">
                    <Mic size={13} /> Voice Only
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-brand-100 dark:border-brand-500/20">
                  <span className="flex items-center gap-2 text-xs font-bold text-brand-600 dark:text-brand-400">
                    <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse-soft" />
                    Call in progress
                  </span>
                  <button onClick={endCall} className="btn-danger py-1.5 px-3 text-xs">
                    <PhoneOff size={12} /> End
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
