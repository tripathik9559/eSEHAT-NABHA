import { useState, useEffect } from 'react'
import { BarChart3, MapPin, AlertTriangle } from 'lucide-react'
import { getAnalytics } from '../../services/api'
import { PageHeader, StatCard } from '../../components/common/index'
import { BarChart, LineChart, DonutChart, ProgressBar } from '../../components/charts/index'

export default function Analytics() {
  const [data,    setData]    = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAnalytics().then(r => setData(r.data)).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const riskDonut = data ? [
    { label: 'High',     value: data.disease_trends?.find(d => d.label === 'High')?.count     || 0, color: '#DC2626' },
    { label: 'Moderate', value: data.disease_trends?.find(d => d.label === 'Moderate')?.count || 0, color: '#D97706' },
    { label: 'Mild',     value: data.disease_trends?.find(d => d.label === 'Mild')?.count     || 0, color: '#16A34A' },
  ] : []

  return (
    <div className="space-y-6">
      <PageHeader title="Rural Analytics" subtitle="Disease trends, village demand, and system utilization" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={BarChart3}    label="Total Patients"      value={data?.total_patients      ?? '—'} color="blue"   loading={loading} />
        <StatCard icon={BarChart3}    label="Total Appointments"  value={data?.total_appointments  ?? '—'} color="violet" loading={loading} />
        <StatCard icon={BarChart3}    label="Today"               value={data?.appointments_today  ?? '—'} color="green"  loading={loading} />
        <StatCard icon={AlertTriangle}label="High Risk"           value={data?.high_risk_patients  ?? '—'} color="red"    loading={loading} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly trend */}
        <div className="card p-5">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Weekly Appointment Trend</h2>
          {loading ? <div className="h-48 bg-gray-100 dark:bg-dark-border rounded-xl animate-pulse" /> : (
            data?.weekly_trend?.length > 1
              ? <LineChart data={data.weekly_trend} height={200} labelKey="date" valueKey="count" color="#2563EB" />
              : <p className="text-sm text-gray-400 text-center py-12">Not enough data yet</p>
          )}
        </div>

        {/* Risk distribution */}
        <div className="card p-5">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Risk Level Distribution (30 days)</h2>
          {loading ? <div className="h-48 bg-gray-100 dark:bg-dark-border rounded-xl animate-pulse" /> : (
            <div className="flex items-center gap-8">
              <DonutChart data={riskDonut} size={160} />
              <div className="flex-1 space-y-4">
                {riskDonut.map(d => (
                  <div key={d.label}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-semibold">{d.label} Risk</span>
                      <span className="text-gray-400">{d.value} cases</span>
                    </div>
                    <ProgressBar value={d.value} max={riskDonut.reduce((s, x) => s + x.value, 0) || 1} color={d.color} showPct={false} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Village demand */}
        <div className="card p-5">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <MapPin size={16} className="text-brand-600" /> Village Patient Demand
          </h2>
          {loading ? <div className="h-48 bg-gray-100 dark:bg-dark-border rounded-xl animate-pulse" /> : (
            data?.village_stats?.length > 0 ? (
              <div className="space-y-3">
                {data.village_stats.map(v => (
                  <div key={v.village}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">{v.village}</span>
                      <span className="text-gray-400">{v.count} patients</span>
                    </div>
                    <ProgressBar value={v.count} max={data.village_stats[0]?.count || 1} color="#2563EB" showPct={false} />
                  </div>
                ))}
              </div>
            ) : <p className="text-sm text-gray-400 text-center py-12">Village data will appear once patients register with village info</p>
          )}
        </div>

        {/* Doctor utilization bar chart */}
        <div className="card p-5">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Doctor Utilization (%)</h2>
          {loading ? <div className="h-48 bg-gray-100 dark:bg-dark-border rounded-xl animate-pulse" /> : (
            data?.doctor_utilization?.length > 0 ? (
              <BarChart
                data={data.doctor_utilization.map(d => ({ label: d.name.split(' ').pop(), count: d.utilization }))}
                height={200} color="#2563EB" labelKey="label" valueKey="count"
              />
            ) : <p className="text-sm text-gray-400 text-center py-12">No utilization data yet</p>
          )}
        </div>
      </div>
    </div>
  )
}
