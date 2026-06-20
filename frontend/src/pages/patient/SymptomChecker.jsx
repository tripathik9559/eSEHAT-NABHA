import { useState, useEffect, useRef } from 'react'
import { Mic, MicOff, Loader2, AlertTriangle, CheckCircle, Info,
         Stethoscope, Sparkles, RefreshCw, ChevronRight } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useLang } from '../../contexts/LangContext'
import { analyzeSymptoms, getSymptomHistory } from '../../services/api'
import { PageHeader, RiskBadge } from '../../components/common/index'
import { fromNow } from '../../utils/helpers'

const RISK_CONFIG = {
  High:     { icon:AlertTriangle, grad:'from-red-500 to-rose-600',    bg:'bg-red-50 dark:bg-red-900/15',     border:'border-red-200 dark:border-red-500/25'     },
  Moderate: { icon:Info,          grad:'from-amber-500 to-orange-500', bg:'bg-amber-50 dark:bg-amber-900/15', border:'border-amber-200 dark:border-amber-500/25' },
  Mild:     { icon:CheckCircle,   grad:'from-emerald-500 to-teal-500', bg:'bg-emerald-50 dark:bg-emerald-900/15', border:'border-emerald-200 dark:border-emerald-500/25' },
}
const QUICK_SYMPTOMS = ['Fever','Headache','Chest pain','Cough','Vomiting','Dizziness','Body ache','Sore throat','Breathlessness','Fatigue']

export default function SymptomChecker() {
  const { user }    = useAuth()
  const { lang }    = useLang()
  const patientId   = user?.ref_id

  const [symptoms,  setSymptoms]  = useState('')
  const [result,    setResult]    = useState(null)
  const [history,   setHistory]   = useState([])
  const [loading,   setLoading]   = useState(false)
  const [listening, setListening] = useState(false)
  const [voiceOk,   setVoiceOk]   = useState(false)
  const recRef = useRef(null)

  useEffect(() => {
    fetchHistory()
    setVoiceOk(!!(window.SpeechRecognition||window.webkitSpeechRecognition))
  }, [])

  async function fetchHistory() {
    try { const r=await getSymptomHistory(patientId); setHistory(r.data) } catch {}
  }

  function startVoice() {
    const SR = window.SpeechRecognition||window.webkitSpeechRecognition
    if (!SR) return
    const rec = new SR()
    rec.lang = {en:'en-IN',hi:'hi-IN',pa:'pa-IN'}[lang]||'en-IN'
    rec.continuous=false; rec.interimResults=false
    rec.onstart=()=>setListening(true)
    rec.onend=()=>setListening(false)
    rec.onerror=()=>setListening(false)
    rec.onresult=e=>{ const text=e.results[0][0].transcript; setSymptoms(p=>p?`${p}, ${text}`:text) }
    recRef.current=rec; rec.start()
  }
  function stopVoice() { recRef.current?.stop(); setListening(false) }

  async function handleAnalyze(e) {
    e.preventDefault()
    if (!symptoms.trim()) return
    setLoading(true); setResult(null)
    try { const r=await analyzeSymptoms(patientId,symptoms); setResult(r.data); fetchHistory() }
    catch { setResult({ risk_level:'Mild', recommendation:'Could not analyze. Please consult a doctor.', suggested_specialization:'General Medicine', symptoms_detected:[] }) }
    finally { setLoading(false) }
  }

  const cfg = result ? RISK_CONFIG[result.risk_level]||RISK_CONFIG.Mild : null

  return (
    <div className="space-y-6">
      <PageHeader title="AI Symptom Checker" subtitle="Describe your symptoms — our AI assesses risk and recommends specialists"/>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-4">
          <div className="card p-5 animate-slide-up">
            <form onSubmit={handleAnalyze} className="space-y-4">
              <div>
                <label className="label">Describe your symptoms</label>
                <div className="relative">
                  <textarea value={symptoms} onChange={e=>setSymptoms(e.target.value)}
                    placeholder="e.g. I have chest pain, shortness of breath and mild fever since yesterday…"
                    rows={5} className="input resize-none pr-14 leading-relaxed"/>
                  {voiceOk && (
                    <button type="button" onClick={listening?stopVoice:startVoice}
                      className={`absolute right-3 bottom-3 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200
                        ${listening
                          ? 'bg-red-500 text-white shadow-lg shadow-red-500/40 animate-pulse-soft scale-110'
                          : 'bg-gray-100 dark:bg-white/[0.06] text-gray-500 hover:bg-brand-100 hover:text-brand-600 dark:hover:bg-brand-500/15 dark:hover:text-brand-400 hover:scale-105'}`}
                      title={listening?'Stop listening':'Voice input'}>
                      {listening?<MicOff size={17}/>:<Mic size={17}/>}
                    </button>
                  )}
                </div>
                {listening && (
                  <div className="flex items-center gap-2 mt-2 text-xs text-red-600 dark:text-red-400 font-bold">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"/>
                    Listening… speak now
                    <span className="text-gray-400 font-medium ml-1">({lang==='hi'?'Hindi':lang==='pa'?'Punjabi':'English'})</span>
                  </div>
                )}
              </div>

              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.12em] mb-2">Quick Add</p>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_SYMPTOMS.map(s=>(
                    <button type="button" key={s}
                      onClick={()=>setSymptoms(p=>p?`${p}, ${s.toLowerCase()}`:s.toLowerCase())}
                      className="px-3 py-1.5 rounded-full text-xs font-bold
                        bg-gray-100 dark:bg-white/[0.05] text-gray-600 dark:text-gray-300
                        hover:bg-brand-100 hover:text-brand-700 dark:hover:bg-brand-500/15 dark:hover:text-brand-300
                        border border-gray-200 dark:border-white/[0.06] hover:border-brand-200 dark:hover:border-brand-500/25
                        hover:scale-105 transition-all duration-150">
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={()=>{setSymptoms('');setResult(null)}} className="btn-secondary">
                  <RefreshCw size={14}/> Clear
                </button>
                <button type="submit" className="btn-primary flex-1" disabled={loading||!symptoms.trim()}>
                  {loading?<><Loader2 size={15} className="animate-spin"/>Analyzing…</>:<><Sparkles size={15}/>Analyze Symptoms</>}
                </button>
              </div>
            </form>
          </div>

          {result && cfg && (
            <div className={`card p-5 border-2 ${cfg.border} ${cfg.bg} animate-scale-in`}>
              <div className="flex items-center gap-4 mb-5">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cfg.grad} flex items-center justify-center shadow-lg flex-shrink-0 animate-call-ring`}>
                  <cfg.icon size={26} className="text-white"/>
                </div>
                <div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-[0.12em]">AI Assessment</p>
                  <div className="flex items-center gap-2 mt-1">
                    <RiskBadge level={result.risk_level}/>
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-200">detected</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/70 dark:bg-black/20">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.12em] mb-2">Recommendation</p>
                  <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">{result.recommendation}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-white/70 dark:bg-black/20">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.12em] mb-1.5">See Specialist</p>
                    <span className="badge-info text-sm">{result.suggested_specialization}</span>
                  </div>
                  {result.symptoms_detected?.length>0 && (
                    <div className="p-3 rounded-xl bg-white/70 dark:bg-black/20">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.12em] mb-1.5">Detected</p>
                      <div className="flex flex-wrap gap-1">
                        {result.symptoms_detected.slice(0,4).map((s,i)=>(
                          <span key={i} className="px-2 py-0.5 rounded-full text-xs bg-white dark:bg-black/30
                            border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 font-bold">{s}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="card p-5 animate-slide-up stagger-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-black text-gray-400 uppercase tracking-[0.12em]">Past Checks</p>
              <h3 className="font-bold text-gray-900 dark:text-white">History</h3>
            </div>
            <span className="badge-info">{history.length}</span>
          </div>
          {history.length===0 ? (
            <div className="text-center py-10">
              <Stethoscope size={28} className="mx-auto text-gray-300 dark:text-gray-600 mb-2"/>
              <p className="text-sm text-gray-400">No checks yet</p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {history.map((log,i)=>(
                <div key={i} className={`p-3 rounded-xl bg-gray-50 dark:bg-white/[0.02]
                  border border-gray-100 dark:border-white/[0.05] hover:border-brand-200 dark:hover:border-brand-500/20
                  transition-all duration-200 hover:translate-x-1 animate-slide-right stagger-${Math.min(i+1,6)}`}>
                  <div className="flex items-center justify-between mb-1.5">
                    <RiskBadge level={log.risk_level}/>
                    <span className="text-[10px] text-gray-400">{fromNow(log.timestamp)}</span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">{log.symptoms}</p>
                  <p className="text-[11px] text-brand-600 dark:text-brand-400 font-bold mt-1.5 flex items-center gap-1">
                    <ChevronRight size={10}/> {log.suggested_specialization}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
