import { useState, useEffect } from 'react'
import { Tent, Users, MapPin } from 'lucide-react'
import { listCamps, updateCamp } from '../../services/api'
import { PageHeader, EmptyState } from '../../components/common/index'
import { fmtDateTime } from '../../utils/helpers'

const STATUS_STYLES = {
  Scheduled: 'badge-info',
  Ongoing:   'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  Completed: 'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
  Cancelled: 'badge-high',
}

export default function AdminHealthCamps() {
  const [camps,   setCamps]   = useState([])
  const [loading, setLoading] = useState(true)
  const [filter,  setFilter]  = useState('all')

  useEffect(() => {
    listCamps().then(r => setCamps(r.data)).catch(() => {}).finally(() => setLoading(false))
  }, [])

  async function handleStatus(id, status) {
    try { await updateCamp(id, status); setCamps(cs => cs.map(c => c.id === id ? { ...c, status } : c)) } catch {}
  }

  const filtered = filter === 'all' ? camps : camps.filter(c => c.status === filter)

  return (
    <div className="space-y-6">
      <PageHeader title="Health Camps" subtitle="All scheduled health camps across villages" />

      <div className="flex gap-1.5 flex-wrap">
        {['all', 'Scheduled', 'Ongoing', 'Completed', 'Cancelled'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all
              ${filter === f ? 'bg-brand-600 text-white' : 'bg-gray-100 dark:bg-dark-border text-gray-500 hover:bg-gray-200'}`}>
            {f === 'all' ? `All (${camps.length})` : `${f} (${camps.filter(c => c.status === f).length})`}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading…</div>
      ) : filtered.length === 0 ? (
        <div className="card"><EmptyState icon={Tent} title="No health camps" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(camp => (
            <div key={camp.id} className="card card-hover p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center flex-shrink-0">
                    <Tent size={18} className="text-teal-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{camp.village}</p>
                    <p className="text-xs text-gray-500">{fmtDateTime(camp.scheduled_date)}</p>
                  </div>
                </div>
                <span className={STATUS_STYLES[camp.status] || 'badge-info'}>{camp.status}</span>
              </div>
              {camp.notes && <p className="text-xs text-gray-500 italic mb-3">"{camp.notes}"</p>}
              {camp.attendees > 0 && (
                <p className="text-xs text-gray-400 flex items-center gap-1.5 mb-3">
                  <Users size={11} /> {camp.attendees} attended
                </p>
              )}
              {camp.status === 'Scheduled' && (
                <div className="flex gap-2">
                  <button onClick={() => handleStatus(camp.id, 'Ongoing')} className="btn-primary py-1.5 px-3 text-xs">Activate</button>
                  <button onClick={() => handleStatus(camp.id, 'Cancelled')} className="btn-danger py-1.5 px-3 text-xs">Cancel</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
