import { useState, useEffect } from 'react'
import { FileText, Download, Search } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { listPrescriptions } from '../../services/api'
import { PageHeader, EmptyState } from '../../components/common/index'
import { fmtDateTime } from '../../utils/helpers'
import { generatePrescriptionPDF } from '../../utils/pdfGenerator'

export default function DoctorPrescriptions() {
  const { user }  = useAuth()
  const doctorId  = user?.ref_id

  const [prescs,  setPrescs]  = useState([])
  const [search,  setSearch]  = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    listPrescriptions({ doctor_id: doctorId })
      .then(r => setPrescs(r.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [doctorId])

  function redownload(presc) {
    let medicines = [], notes = ''
    try { const c = JSON.parse(presc.content); medicines = c.medicines || []; notes = c.notes || '' } catch {}
    generatePrescriptionPDF({
      doctor:    user,
      patient:   presc.patient,
      medicines,
      notes,
      apptId:    presc.appointment_id || presc.id,
    })
  }

  const filtered = prescs.filter(p =>
    p.patient?.name?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <PageHeader title="Prescriptions" subtitle="All prescriptions you have written" />

      <div className="relative max-w-md">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by patient name…" className="input pl-10" />
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading…</div>
      ) : filtered.length === 0 ? (
        <div className="card"><EmptyState icon={FileText} title="No prescriptions found" /></div>
      ) : (
        <div className="space-y-3">
          {filtered.map(presc => {
            let medicines = [], notes = ''
            try { const c = JSON.parse(presc.content); medicines = c.medicines || []; notes = c.notes || '' } catch {}
            return (
              <div key={presc.id} className="card card-hover p-4 flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center flex-shrink-0">
                  <FileText size={18} className="text-violet-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{presc.patient?.name}</p>
                      <p className="text-xs text-gray-500">{fmtDateTime(presc.created_at)} · Rx #{presc.id}</p>
                    </div>
                    <button onClick={() => redownload(presc)} className="btn-secondary py-1.5 px-3 text-xs flex-shrink-0">
                      <Download size={12} /> PDF
                    </button>
                  </div>
                  {medicines.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {medicines.map((m, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-full text-xs bg-gray-100 dark:bg-dark-border text-gray-600 dark:text-gray-300">
                          {m.name} {m.dosage && `· ${m.dosage}`}
                        </span>
                      ))}
                    </div>
                  )}
                  {notes && <p className="text-xs text-gray-400 mt-1.5 italic">"{notes}"</p>}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
