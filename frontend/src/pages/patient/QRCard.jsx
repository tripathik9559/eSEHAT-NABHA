import { useState, useEffect } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { Download, Printer, RefreshCw, Shield, CheckCircle } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { getPatient } from '../../services/api'
import { PageHeader } from '../../components/common/index'
import { fmtDate } from '../../utils/helpers'

export default function QRCard() {
  const { user }  = useAuth()
  const patientId = user?.ref_id
  const [patient, setPatient] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!patientId) return
    getPatient(patientId).then(r=>setPatient(r.data)).catch(()=>{}).finally(()=>setLoading(false))
  }, [patientId])

  const qrData = patient ? JSON.stringify({
    id: patient.id, qr_id: patient.qr_id, name: patient.name,
    phone: patient.phone, blood: patient.blood_group, age: patient.age,
  }) : ''

  function handlePrint() { window.print() }

  function handleDownload() {
    const canvas = document.querySelector('#qr-canvas canvas')
    if (!canvas) return
    const link = document.createElement('a')
    link.href     = canvas.toDataURL('image/png')
    link.download = `eseheat-${patient?.qr_id || 'card'}.png`
    link.click()
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 rounded-full border-2 border-brand-600 border-t-transparent animate-spin"/>
    </div>
  )

  return (
    <div className="space-y-6">
      <PageHeader
        title="QR Health Card"
        subtitle="Your digital health identity for Civil Hospital Nabha"
        actions={
          <div className="flex gap-2 no-print">
            <button onClick={handlePrint} className="btn-secondary"><Printer size={15}/> Print</button>
            <button onClick={handleDownload} className="btn-primary"><Download size={15}/> Download PNG</button>
          </div>
        }
      />

      <div className="flex flex-col items-center gap-6">
        {/* Card */}
        <div id="qr-canvas"
          className="w-full max-w-sm card p-0 overflow-hidden shadow-xl animate-scale-in">
          {/* Card header gradient */}
          <div className="bg-gradient-to-br from-brand-600 via-brand-700 to-indigo-700 px-6 pt-6 pb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-md bg-white/20 flex items-center justify-center">
                    <span className="text-white text-xs font-black">eS</span>
                  </div>
                  <span className="text-white font-bold text-sm">eSEHAT Nabha</span>
                </div>
                <p className="text-white/60 text-xs">Civil Hospital Nabha, Punjab</p>
              </div>
              <div className="text-right">
                <p className="text-white/50 text-[10px] uppercase tracking-wider">Blood Group</p>
                <p className="text-white text-2xl font-black mt-0.5">{patient?.blood_group || '—'}</p>
              </div>
            </div>
            <div>
              <p className="text-white text-xl font-bold leading-tight">{patient?.name}</p>
              <p className="text-white/60 text-xs mt-1">Age {patient?.age || '—'} yrs · {patient?.village || 'Nabha'}</p>
            </div>
          </div>

          {/* QR section */}
          <div className="bg-white dark:bg-gray-900 px-6 py-5">
            <div className="flex items-start gap-5">
              {/* QR code */}
              <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm flex-shrink-0">
                {qrData ? (
                  <QRCodeCanvas value={qrData} size={110} level="H" fgColor="#0F172A" bgColor="#FFFFFF" />
                ) : (
                  <div className="w-28 h-28 flex items-center justify-center">
                    <RefreshCw size={20} className="text-gray-300 animate-spin"/>
                  </div>
                )}
              </div>
              {/* Patient details */}
              <div className="flex-1 space-y-2.5 min-w-0">
                <DetailRow label="Patient ID" value={patient?.qr_id} mono />
                <DetailRow label="Mobile"     value={patient?.phone} />
                <DetailRow label="Issued"     value={fmtDate(new Date())} />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
              <Shield size={12} className="text-brand-600 flex-shrink-0"/>
              <p className="text-[10px] text-gray-400 leading-relaxed">
                Scan at reception for instant access to patient records.
              </p>
            </div>
          </div>
        </div>

        {/* How to use */}
        <div className="card p-5 max-w-sm w-full no-print">
          <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <CheckCircle size={16} className="text-brand-600"/> How to use
          </h3>
          <ol className="space-y-3">
            {['Download or print this card','Carry it to Civil Hospital Nabha','Show at reception — staff scan the QR','Your full health history loads instantly'].map((s,i)=>(
              <li key={i} className="flex gap-3 text-sm text-gray-600 dark:text-gray-300">
                <span className="w-5 h-5 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400
                  text-xs font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                  {i+1}
                </span>
                {s}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}

function DetailRow({ label, value, mono }) {
  return (
    <div>
      <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">{label}</p>
      <p className={`text-sm font-bold text-gray-900 dark:text-white mt-0.5 ${mono?'font-mono':''}`}>{value||'—'}</p>
    </div>
  )
}
