import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
})

// Attach JWT from localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('nabha_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// On 401, clear auth and redirect to login
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('nabha_token')
      localStorage.removeItem('nabha_user')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

// ── Auth ──────────────────────────────────────────────────────────────────────
export const sendOtp    = (phone, role) => api.post('/api/auth/send-otp', { phone, role })
export const verifyOtp  = (phone, otp, role, name) => api.post('/api/auth/verify-otp', { phone, otp, role, name })
export const logoutApi  = () => api.post('/api/auth/logout')

// ── Patients ──────────────────────────────────────────────────────────────────
export const getPatient       = (id)       => api.get(`/api/patients/${id}`)
export const updatePatient    = (id, data) => api.put(`/api/patients/${id}`, data)
export const listPatients     = ()         => api.get('/api/patients')
export const getHealthRecords = (id)       => api.get(`/api/patients/${id}/records`)
export const addHealthRecord  = (id, data) => api.post(`/api/patients/${id}/records`, data)

// ── Doctors ───────────────────────────────────────────────────────────────────
export const listDoctors        = (availableOnly = false) => api.get(`/api/doctors?available_only=${availableOnly}`)
export const getDoctor          = (id)    => api.get(`/api/doctors/${id}`)
export const updateAvailability = (id, status) => api.put(`/api/doctors/${id}/availability`, { available_status: status })
export const getDoctorWorkload  = ()      => api.get('/api/doctors/workload/all')

// ── Appointments ──────────────────────────────────────────────────────────────
export const listAppointments   = (params) => api.get('/api/appointments', { params })
export const getAppointment     = (id)     => api.get(`/api/appointments/${id}`)
export const createAppointment  = (data)   => api.post('/api/appointments', data)
export const updateAppointment  = (id, data) => api.put(`/api/appointments/${id}`, data)
export const updateApptStatus   = (id, status) => api.put(`/api/appointments/${id}/status`, { status })
export const cancelAppointment  = (id)     => api.delete(`/api/appointments/${id}`)
export const getPriorityQueue   = (doctor_id) => api.get('/api/appointments/queue', { params: { doctor_id } })

// ── Prescriptions ─────────────────────────────────────────────────────────────
export const listPrescriptions  = (params) => api.get('/api/prescriptions', { params })
export const getPrescription    = (id)     => api.get(`/api/prescriptions/${id}`)
export const createPrescription = (data)   => api.post('/api/prescriptions', data)

// ── Pharmacy ──────────────────────────────────────────────────────────────────
export const listPharmacies = ()       => api.get('/api/pharmacy')
export const listMedicines  = (params) => api.get('/api/pharmacy/medicines', { params })
export const updateStock    = (id, data) => api.put(`/api/pharmacy/medicines/${id}/stock`, data)

// ── Symptom ───────────────────────────────────────────────────────────────────
export const analyzeSymptoms  = (patient_id, symptoms) => api.post('/api/symptom/analyze', { patient_id, symptoms })
export const getSymptomHistory = (patient_id) => api.get(`/api/symptom/history/${patient_id}`)

// ── Notifications ─────────────────────────────────────────────────────────────
export const getNotifications = ()    => api.get('/api/notifications')
export const getUnreadCount   = ()    => api.get('/api/notifications/unread-count')
export const markNotifRead    = (id)  => api.put(`/api/notifications/${id}/read`)
export const markAllRead      = ()    => api.put('/api/notifications/mark-all-read')
export const sendNotification = (data) => api.post('/api/notifications/send', data)

// ── Admin ─────────────────────────────────────────────────────────────────────
export const getAnalytics  = () => api.get('/api/admin/analytics')
export const listCamps     = (asha_id) => api.get('/api/admin/camps', { params: { asha_id } })
export const createCamp    = (data)    => api.post('/api/admin/camps', data)
export const updateCamp    = (id, status, attendees) =>
  api.put(`/api/admin/camps/${id}/status`, null, { params: { status, attendees } })

export default api
