import { useState, useEffect } from 'react'
import { UserCheck, ToggleLeft, ToggleRight } from 'lucide-react'
import { listDoctors, updateAvailability } from '../../services/api'
import { PageHeader } from '../../components/common/index'

export default function DoctorAvailability() {
  const [doctors,  setDoctors]  = useState([])
  const [loading,  setLoading]  = useState(true)
  const [toggling, setToggling] = useState(null)

  useEffect(() => {
    listDoctors().then(r => setDoctors(r.data)).catch(() => {}).finally(() => setLoading(false))
  }, [])

  async function handleToggle(doc) {
    setToggling(doc.id)
    try {
      await updateAvailability(doc.id, !doc.available_status)
      setDoctors(ds => ds.map(d => d.id === doc.id ? { ...d, available_status: !d.available_status } : d))
    } catch {} finally { setToggling(null) }
  }

  const available   = doctors.filter(d => d.available_status).length
  const unavailable = doctors.length - available

  return (
    <div className="space-y-6">
      <PageHeader title="Doctor Availability" subtitle="Real-time toggle of doctor availability status" />

      <div className="flex gap-4">
        <div className="card card-hover p-4 flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-sm font-semibold">{available} Available</span>
        </div>
        <div className="card card-hover p-4 flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span className="text-sm font-semibold">{unavailable} Unavailable</span>
        </div>
      </div>

      {/* Department grouping */}
      {loading ? (
        <div className="space-y-3">{[...Array(6)].map((_, i) => (
          <div key={i} className="h-16 bg-gray-100 dark:bg-dark-border rounded-2xl animate-pulse" />
        ))}</div>
      ) : (
        <div className="space-y-3">
          {doctors.map(doc => (
            <div key={doc.id} className={`card card-hover p-4 flex items-center gap-4 hover:shadow-md transition-all
              ${doc.available_status ? 'border-green-200 dark:border-green-800' : 'opacity-75'}`}>
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0
                ${doc.available_status ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-dark-border'}`}>
                <UserCheck size={20} className={doc.available_status ? 'text-green-600' : 'text-gray-400'} />
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 dark:text-white">{doc.name}</p>
                <p className="text-xs text-gray-500">{doc.specialization} · {doc.department}</p>
                <p className="text-xs text-gray-400">{doc.qualification} · {doc.experience_years} yrs exp.</p>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                <span className={`text-xs font-semibold ${doc.available_status ? 'text-green-600' : 'text-red-500'}`}>
                  {doc.available_status ? 'Available' : 'Unavailable'}
                </span>
                <button
                  onClick={() => handleToggle(doc)}
                  disabled={toggling === doc.id}
                  className={`transition-colors ${toggling === doc.id ? 'opacity-50' : ''}`}
                  title="Toggle availability"
                >
                  {doc.available_status
                    ? <ToggleRight size={32} className="text-green-500 hover:text-green-600" />
                    : <ToggleLeft  size={32} className="text-gray-400 hover:text-gray-500" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
