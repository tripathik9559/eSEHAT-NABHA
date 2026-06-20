import { useState, useEffect } from 'react'
import { Search, Users, FileText, Calendar, ChevronDown, ChevronUp } from 'lucide-react'
import { listPatients, listAppointments, listPrescriptions, getHealthRecords } from '../../services/api'
import { PageHeader, EmptyState, RiskBadge, StatusBadge } from '../../components/common/index'
import { fmtDateTime, fmtDate } from '../../utils/helpers'

export default function PatientHistory() {
  const [patients,   setPatients]  = useState([])
  const [search,     setSearch]    = useState('')
  const [selected,   setSelected]  = useState(null)
  const [appts,      setAppts]     = useState([])
  const [prescs,     setPrescs]    = useState([])
  const [records,    setRecords]   = useState([])
  const [loading,    setLoading]   = useState(true)
  const [detailLoading, setDetailLoading] = useState(false)

  useEffect(() => {
    listPatients().then(r => setPatients(r.data)).catch(() => {}).finally(() => setLoading(false))
  }, [])

  async function selectPatient(p) {
    if (selected?.id === p.id) { setSelected(null); return }
    setSelected(p); setDetailLoading(true)
    try {
      const [aRes, pRes, rRes] = await Promise.all([
        listAppointments({ patient_id: p.id }),
        listPrescriptions({ patient_id: p.id }),
        getHealthRecords(p.id),
      ])
      setAppts(aRes.data)
      setPrescs(pRes.data)
      setRecords(rRes.data)
    } catch {} finally { setDetailLoading(false) }
  }

  const filtered = patients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.phone.includes(search)
  )

  return (
    <div className="space-y-6">
      <PageHeader title="Patient History" subtitle="Full consultation history for all your patients" />

      <div className="relative">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search patients by name or phone…" className="input pl-10 max-w-md" />
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading…</div>
      ) : filtered.length === 0 ? (
        <div className="card"><EmptyState icon={Users} title="No patients found" /></div>
      ) : (
        <div className="space-y-2">
          {filtered.map(p => (
            <div key={p.id} className="card overflow-hidden">
              <button
                onClick={() => selectPatient(p)}
                className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-dark-border transition-colors text-left"
              >
                <div className="w-10 h-10 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center font-bold text-brand-700 dark:text-brand-400 flex-shrink-0">
                  {p.name[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 dark:text-white">{p.name}</p>
                  <p className="text-xs text-gray-500">{p.phone} · Age {p.age || '—'} · {p.blood_group || '—'} · {p.village || '—'}</p>
                </div>
                <span className="text-xs text-gray-400 font-mono">{p.qr_id}</span>
                {selected?.id === p.id ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
              </button>

              {selected?.id === p.id && (
                <div className="border-t border-gray-100 dark:border-dark-border p-4 bg-gray-50 dark:bg-dark-border/50">
                  {detailLoading ? (
                    <div className="text-center py-6 text-gray-400 text-sm">Loading patient data…</div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Appointments */}
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-2 flex items-center gap-1.5">
                          <Calendar size={12} /> Appointments ({appts.length})
                        </p>
                        {appts.length === 0 ? <p className="text-xs text-gray-400">No appointments</p> : (
                          <div className="space-y-1.5">
                            {appts.slice(0, 4).map(a => (
                              <div key={a.id} className="text-xs p-2 rounded-lg bg-white dark:bg-dark-card flex items-center justify-between gap-2">
                                <span className="text-gray-600 dark:text-gray-300 truncate">{fmtDate(a.datetime)}</span>
                                <StatusBadge status={a.status} />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Prescriptions */}
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-2 flex items-center gap-1.5">
                          <FileText size={12} /> Prescriptions ({prescs.length})
                        </p>
                        {prescs.length === 0 ? <p className="text-xs text-gray-400">No prescriptions</p> : (
                          <div className="space-y-1.5">
                            {prescs.slice(0, 4).map(pr => {
                              let meds = []
                              try { meds = JSON.parse(pr.content).medicines || [] } catch {}
                              return (
                                <div key={pr.id} className="text-xs p-2 rounded-lg bg-white dark:bg-dark-card">
                                  <p className="text-gray-600 dark:text-gray-300">{fmtDate(pr.created_at)}</p>
                                  <p className="text-gray-400">{meds.map(m => m.name).join(', ') || 'Prescription'}</p>
                                </div>
                              )
                            })}
                          </div>
                        )}
                      </div>

                      {/* Health Records */}
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">Records ({records.length})</p>
                        {records.length === 0 ? <p className="text-xs text-gray-400">No records</p> : (
                          <div className="space-y-1.5">
                            {records.slice(0, 4).map(r => (
                              <div key={r.id} className="text-xs p-2 rounded-lg bg-white dark:bg-dark-card">
                                <p className="font-semibold capitalize text-gray-600 dark:text-gray-300">{r.type}</p>
                                <p className="text-gray-400 truncate">{r.data}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
