import { useState } from 'react'
import { UserPlus, Loader2, CheckCircle } from 'lucide-react'
import { useLang } from '../../contexts/LangContext'
import { PageHeader, Alert } from '../../components/common/index'
import { BLOOD_GROUPS } from '../../utils/helpers'
import api from '../../services/api'

const VILLAGES = [
  'Nabha','Sanaur','Bhadson','Lohat Badi','Mandi Gobindgarh',
  'Patiala','Rajpura','Ghanaur','Samana','Fatehgarh Sahib',
]

export default function RegisterPatient() {
  const { t } = useLang()
  const [form, setForm] = useState({
    name: '', phone: '', blood_group: 'B+', age: '', village: 'Nabha', address: '', language_pref: 'pa',
  })
  const [saving,   setSaving]   = useState(false)
  const [success,  setSuccess]  = useState(null)
  const [error,    setError]    = useState('')

  function update(k, v) { setForm(f => ({ ...f, [k]: v })) }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name || !form.phone || form.phone.length < 10) {
      setError('Name and valid 10-digit phone are required'); return
    }
    setSaving(true); setError('')
    try {
      const res = await api.post('/api/patients', { ...form, age: Number(form.age) || 0 })
      setSuccess(res.data)
      setForm({ name: '', phone: '', blood_group: 'B+', age: '', village: 'Nabha', address: '', language_pref: 'pa' })
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed. Check if phone already exists.')
    } finally { setSaving(false) }
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <PageHeader title="Register Patient" subtitle="Register a new patient in the eSEHAT Nabha system" />

      {success && (
        <div className="card card-hover p-5 border-2 border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20">
          <div className="flex items-center gap-3 mb-3">
            <CheckCircle size={20} className="text-green-600" />
            <p className="font-semibold text-green-800 dark:text-green-300">Patient Registered Successfully!</p>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <InfoRow label="Name"   value={success.name} />
            <InfoRow label="QR ID"  value={success.qr_id} mono />
            <InfoRow label="Phone"  value={success.phone} />
            <InfoRow label="Blood"  value={success.blood_group} />
          </div>
          <button onClick={() => setSuccess(null)} className="btn-primary mt-4">Register Another</button>
        </div>
      )}

      {!success && (
        <div className="card p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <Alert variant="danger">{error}</Alert>}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Full Name *</label>
                <input value={form.name} onChange={e => update('name', e.target.value)}
                  placeholder="Patient full name" className="input" required />
              </div>
              <div>
                <label className="label">Mobile Number *</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium">+91</span>
                  <input value={form.phone} onChange={e => update('phone', e.target.value.replace(/\D/g,'').slice(0,10))}
                    placeholder="10-digit number" className="input pl-10" required maxLength={10} />
                </div>
              </div>
              <div>
                <label className="label">Blood Group</label>
                <select value={form.blood_group} onChange={e => update('blood_group', e.target.value)} className="input">
                  {BLOOD_GROUPS.map(b => <option key={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Age</label>
                <input type="number" value={form.age} onChange={e => update('age', e.target.value)}
                  placeholder="Age in years" min={0} max={120} className="input" />
              </div>
              <div>
                <label className="label">Village</label>
                <select value={form.village} onChange={e => update('village', e.target.value)} className="input">
                  {VILLAGES.map(v => <option key={v}>{v}</option>)}
                  <option value="">Other</option>
                </select>
              </div>
              <div>
                <label className="label">Language Preference</label>
                <select value={form.language_pref} onChange={e => update('language_pref', e.target.value)} className="input">
                  <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
                  <option value="hi">हिन्दी (Hindi)</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>

            <div>
              <label className="label">Address</label>
              <textarea value={form.address} onChange={e => update('address', e.target.value)}
                placeholder="Full address including village, district…" rows={2} className="input resize-none" />
            </div>

            <button type="submit" className="btn-primary w-full justify-center py-3" disabled={saving}>
              {saving ? <Loader2 size={16} className="animate-spin" /> : <UserPlus size={16} />}
              Register Patient
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

function InfoRow({ label, value, mono }) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className={`text-sm font-semibold text-gray-900 dark:text-white ${mono ? 'font-mono' : ''}`}>{value}</p>
    </div>
  )
}
