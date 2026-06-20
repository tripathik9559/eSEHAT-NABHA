import { useState, useEffect } from 'react'
import { Activity } from 'lucide-react'
import { getDoctorWorkload } from '../../services/api'
import { PageHeader, EmptyState } from '../../components/common/index'
import { BarChart, ProgressBar } from '../../components/charts/index'

export default function DoctorWorkload() {
  const [workload, setWorkload] = useState([])
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    getDoctorWorkload().then(r => setWorkload(r.data)).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const sorted = [...workload].sort((a, b) => b.utilization - a.utilization)

  return (
    <div className="space-y-6">
      <PageHeader title="Doctor Workload" subtitle="Appointment utilization across all doctors" />

      {/* Summary bar chart */}
      <div className="card p-5">
        <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Utilization Overview (%)</h2>
        {loading ? (
          <div className="h-48 bg-gray-100 dark:bg-dark-border rounded-xl animate-pulse" />
        ) : workload.length > 0 ? (
          <BarChart
            data={sorted.map(d => ({ label: d.name.split(' ').slice(-1)[0], count: d.utilization }))}
            height={200} color="#2563EB"
          />
        ) : (
          <EmptyState icon={Activity} title="No workload data yet" />
        )}
      </div>

      {/* Detailed table */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(6)].map((_, i) => <div key={i} className="h-24 bg-gray-100 dark:bg-dark-border rounded-2xl animate-pulse" />)}
        </div>
      ) : (
        <div className="space-y-3">
          {sorted.map(doc => (
            <div key={doc.doctor_id} className="card p-5">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center font-bold text-brand-700 dark:text-brand-400 flex-shrink-0">
                  {doc.name.split(' ').slice(-1)[0][0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{doc.name}</p>
                      <p className="text-xs text-gray-500">{doc.specialization} · {doc.department}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-semibold ${doc.available ? 'text-green-600' : 'text-red-500'}`}>
                        {doc.available ? '● Available' : '● Unavailable'}
                      </span>
                      <span className={`badge-${doc.utilization > 75 ? 'high' : doc.utilization > 40 ? 'moderate' : 'mild'}`}>
                        {doc.utilization}% utilized
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                {[
                  { label: 'Total', value: doc.total_appointments,     color: 'text-brand-600' },
                  { label: 'Completed', value: doc.completed_appointments, color: 'text-green-600' },
                  { label: 'Pending',   value: doc.total_appointments - doc.completed_appointments, color: 'text-amber-600' },
                ].map(({ label, value, color }) => (
                  <div key={label} className="p-2 rounded-xl bg-gray-50 dark:bg-dark-border">
                    <p className={`text-xl font-bold ${color}`}>{value}</p>
                    <p className="text-xs text-gray-400">{label}</p>
                  </div>
                ))}
              </div>

              <ProgressBar
                value={doc.utilization} max={100}
                color={doc.utilization > 75 ? '#DC2626' : doc.utilization > 40 ? '#D97706' : '#16A34A'}
                label="Completion rate"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
