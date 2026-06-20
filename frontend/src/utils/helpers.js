// Date formatting
export function fmtDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
  })
}

export function fmtDateTime(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

export function fmtTime(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleTimeString('en-IN', {
    hour: '2-digit', minute: '2-digit',
  })
}

export function fromNow(dateStr) {
  if (!dateStr) return '—'
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1)   return 'Just now'
  if (mins < 60)  return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24)   return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  return `${days}d ago`
}

// Risk level helpers
export const RISK_COLORS = {
  High:     { bg: 'bg-red-100 dark:bg-red-900/20',    text: 'text-red-700 dark:text-red-400',    dot: 'bg-red-500'    },
  Moderate: { bg: 'bg-amber-100 dark:bg-amber-900/20',text: 'text-amber-700 dark:text-amber-400',dot: 'bg-amber-500'  },
  Mild:     { bg: 'bg-green-100 dark:bg-green-900/20',text: 'text-green-700 dark:text-green-400',dot: 'bg-green-500'  },
}

export const STATUS_COLORS = {
  Scheduled: { bg: 'bg-blue-100 dark:bg-blue-900/20',   text: 'text-blue-700 dark:text-blue-400'   },
  Completed: { bg: 'bg-green-100 dark:bg-green-900/20', text: 'text-green-700 dark:text-green-400' },
  Cancelled: { bg: 'bg-gray-100 dark:bg-gray-700',      text: 'text-gray-600 dark:text-gray-300'   },
  Missed:    { bg: 'bg-red-100 dark:bg-red-900/20',     text: 'text-red-700 dark:text-red-400'     },
}

export const STOCK_COLORS = {
  available: { text: 'text-green-600 dark:text-green-400', label: 'In Stock'     },
  low:       { text: 'text-amber-600 dark:text-amber-400', label: 'Low Stock'    },
  out:       { text: 'text-red-600 dark:text-red-400',     label: 'Out of Stock' },
}

// Role → home path
export const ROLE_HOME = {
  patient:  '/patient',
  doctor:   '/doctor',
  asha:     '/asha',
  admin:    '/admin',
  pharmacy: '/pharmacy',
}

// Blood group options
export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

// Generate appointment room name
export function jitsiRoom(apptId) {
  return `eseheat-nabha-${apptId}`
}

// Truncate text
export function truncate(str, n = 60) {
  return str?.length > n ? str.slice(0, n) + '…' : str
}

// Debounce
export function debounce(fn, ms = 300) {
  let t
  return (...args) => {
    clearTimeout(t)
    t = setTimeout(() => fn(...args), ms)
  }
}
