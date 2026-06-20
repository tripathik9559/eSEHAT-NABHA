import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Phone, ShieldCheck, Loader2, Sun, Moon, ArrowRight, Sparkles, Heart } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import { useLang } from '../contexts/LangContext'
import { sendOtp, verifyOtp } from '../services/api'
import { ROLE_HOME } from '../utils/helpers'

const ROLES = [
  { id:'patient',  emoji:'🧑‍⚕️', label:'Patient'  },
  { id:'doctor',   emoji:'👨‍⚕️', label:'Doctor'   },
  { id:'asha',     emoji:'👩‍🦱', label:'ASHA'     },
  { id:'admin',    emoji:'🏥',  label:'Admin'    },
  { id:'pharmacy', emoji:'💊',  label:'Pharmacy' },
]

const LANGS = [{ code:'en', label:'EN' }, { code:'hi', label:'हि' }, { code:'pa', label:'ਪੰ' }]

export default function Login() {
  const navigate         = useNavigate()
  const { login }        = useAuth()
  const { dark, toggle } = useTheme()
  const { lang, setLang } = useLang()

  const [step,    setStep]    = useState('phone')
  const [phone,   setPhone]   = useState('')
  const [otp,     setOtp]     = useState('')
  const [role,    setRole]    = useState('patient')
  const [name,    setName]    = useState('')
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')
  const [msg,     setMsg]     = useState('')

  async function handleSendOtp(e) {
    e.preventDefault()
    if (phone.length < 10) { setError('Enter a valid 10-digit number'); return }
    setLoading(true); setError('')
    try {
      const res = await sendOtp(phone, role)
      setMsg(res.data.message)
      setStep('otp')
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to send OTP. Check that the backend server is running.')
    } finally { setLoading(false) }
  }

  async function handleVerify(e) {
    e.preventDefault()
    if (!otp) { setError('Enter the OTP'); return }
    setLoading(true); setError('')
    try {
      const res = await verifyOtp(phone, otp, role, name)
      const d = res.data
      login(d.access_token, { id:d.user_id, name:d.name||name||phone, role:d.role, ref_id:d.ref_id })
      navigate(ROLE_HOME[d.role] || '/')
    } catch (err) {
      setError(err.response?.data?.detail || 'Invalid OTP')
    } finally { setLoading(false) }
  }

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center p-4"
      style={{
        background: 'linear-gradient(135deg, #0f1f4d 0%, #1e3a8a 35%, #2563eb 70%, #1d4ed8 100%)',
      }}>

      {/* Decorative blurred circles — purely static, no mouse tracking */}
      <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-white/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-5%] w-[500px] h-[500px] rounded-full bg-indigo-400/15 blur-3xl pointer-events-none" />
      <div className="absolute top-[30%] right-[15%] w-[250px] h-[250px] rounded-full bg-sky-300/10 blur-3xl pointer-events-none" />

      {/* Top nav */}
      <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center">
            <span className="text-white font-black text-base">eS</span>
          </div>
          <span className="font-playfair italic text-white text-2xl font-semibold tracking-tight">eSEHAT Nabha</span>
        </div>
        <div className="flex items-center gap-2">
          {LANGS.map(l => (
            <button key={l.code} onClick={() => setLang(l.code)}
              className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all
                ${lang === l.code ? 'bg-white text-gray-900' : 'bg-white/15 text-white hover:bg-white/25'}`}>
              {l.label}
            </button>
          ))}
          <button onClick={toggle} className="p-2.5 rounded-lg bg-white/15 text-white hover:bg-white/25 transition-all ml-1">
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </nav>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between gap-10 mt-16">

        {/* Left: headline */}
        <div className="flex-1 text-left max-w-xl">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/25 text-white text-sm font-bold uppercase tracking-wide mb-6">
            <Sparkles size={14} className="text-amber-300" />
            AI-Powered Healthcare
          </span>
          <h1 className="text-white leading-[1.05]">
            <span className="block font-playfair italic font-normal text-6xl md:text-7xl">Healthcare for</span>
            <span className="block font-black text-5xl md:text-6xl mt-2">Every Village</span>
          </h1>
          <p className="text-white/80 text-lg mt-6 leading-relaxed max-w-md">
            Serving 173 villages around Nabha, Punjab with AI-powered diagnostics, telemedicine, and digital health records.
          </p>
          <div className="flex items-center gap-10 mt-10">
            {[['173','Villages'],['5','Portals'],['AI','Risk Engine']].map(([v,l]) => (
              <div key={l}>
                <p className="text-3xl font-black text-white leading-none">{v}</p>
                <p className="text-sm text-white/60 uppercase tracking-widest mt-1">{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: login card */}
        <div className="w-full max-w-md flex-shrink-0">
          <div className="bg-white rounded-3xl shadow-2xl p-8">

            {step === 'phone' ? (
              <form onSubmit={handleSendOtp} className="space-y-5">
                <div>
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Get Started</p>
                  <h2 className="text-gray-900 text-2xl font-black mt-1">Sign in to your portal</h2>
                </div>

                {/* Role selection */}
                <div>
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-3">Select your role</p>
                  <div className="grid grid-cols-5 gap-2">
                    {ROLES.map(r => (
                      <button type="button" key={r.id} onClick={() => setRole(r.id)}
                        className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border-2 transition-all
                          ${role === r.id ? 'border-brand-600 bg-brand-50 scale-105' : 'border-gray-200 hover:border-gray-300'}`}>
                        <span className="text-2xl">{r.emoji}</span>
                        <span className="text-[10px] font-bold text-gray-600 leading-none">{r.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">
                    Your Name <span className="text-gray-300 normal-case font-normal">(optional)</span>
                  </label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)}
                    placeholder="Full name"
                    className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 text-gray-900 text-base font-medium
                      placeholder-gray-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all" />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Mobile Number</label>
                  <div className="flex">
                    <span className="flex items-center px-4 rounded-l-xl bg-gray-100 border-2 border-r-0 border-gray-200 text-gray-500 text-base font-bold">+91</span>
                    <input type="tel" value={phone}
                      onChange={e => setPhone(e.target.value.replace(/\D/g,'').slice(0,10))}
                      placeholder="10-digit number" maxLength={10}
                      className="flex-1 px-4 py-3.5 rounded-r-xl border-2 border-gray-200 text-gray-900 text-base font-medium
                        placeholder-gray-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all" />
                  </div>
                </div>

                {error && (
                  <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-semibold">
                    <ShieldCheck size={16} /> {error}
                  </div>
                )}

                <button type="submit" disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-brand-600 text-white font-black text-base
                    hover:bg-brand-700 active:scale-[0.98] transition-all disabled:opacity-60">
                  {loading ? <Loader2 size={18} className="animate-spin" /> : <Phone size={17} />}
                  {loading ? 'Sending OTP…' : 'Send OTP'}
                  {!loading && <ArrowRight size={16} className="ml-auto" />}
                </button>

                <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-blue-50 border border-blue-200">
                  <Sparkles size={15} className="text-blue-500 flex-shrink-0" />
                  <p className="text-blue-700 text-sm font-semibold">Demo: any 10-digit number · OTP: <strong>1234</strong></p>
                </div>
              </form>

            ) : (
              <form onSubmit={handleVerify} className="space-y-5">
                <div>
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Verification</p>
                  <h2 className="text-gray-900 text-2xl font-black mt-1">Enter OTP</h2>
                  <p className="text-gray-500 text-base mt-1">Sent to +91 {phone}</p>
                </div>

                {msg && (
                  <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 text-sm font-semibold">{msg}</div>
                )}

                <div>
                  <label className="block text-gray-500 text-xs font-bold uppercase tracking-widest mb-3">One-Time Password</label>
                  <input type="text" value={otp}
                    onChange={e => setOtp(e.target.value.replace(/\D/g,'').slice(0,6))}
                    placeholder="••••" maxLength={6} autoFocus
                    className="w-full px-6 py-5 rounded-xl border-2 border-gray-200 text-gray-900
                      text-center text-4xl tracking-[0.5em] font-black placeholder-gray-300
                      focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all" />
                </div>

                {error && <p className="text-red-600 text-sm font-semibold px-1">{error}</p>}

                <button type="submit" disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-brand-600 text-white font-black text-base
                    hover:bg-brand-700 active:scale-[0.98] transition-all disabled:opacity-60">
                  {loading ? <Loader2 size={18} className="animate-spin" /> : <ShieldCheck size={17} />}
                  {loading ? 'Verifying…' : 'Verify & Login'}
                </button>

                <button type="button" onClick={() => { setStep('phone'); setOtp(''); setError('') }}
                  className="w-full py-3.5 rounded-xl bg-gray-100 border-2 border-gray-200 text-gray-600 text-base font-bold
                    hover:bg-gray-200 transition-all">
                  ← Change number or role
                </button>
              </form>
            )}

            <div className="flex items-center justify-center gap-2 mt-6 pt-5 border-t border-gray-100">
              <Heart size={13} className="text-red-400" />
              <p className="text-gray-400 text-xs">Civil Hospital Nabha · Punjab, India</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
