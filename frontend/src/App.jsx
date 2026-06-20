import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { ThemeProvider }          from './contexts/ThemeContext'
import { LangProvider }           from './contexts/LangContext'
import Layout                     from './components/layout/Layout'

// Pages
import Login                 from './pages/Login'

// Patient
import PatientDashboard  from './pages/patient/Dashboard'
import PatientAppts      from './pages/patient/Appointments'
import HealthRecords     from './pages/patient/HealthRecords'
import SymptomChecker    from './pages/patient/SymptomChecker'
import QRCard            from './pages/patient/QRCard'
import Telemedicine      from './pages/patient/Telemedicine'
import Medicines         from './pages/patient/Medicines'

// Doctor
import DoctorDashboard   from './pages/doctor/Dashboard'
import DoctorAppts       from './pages/doctor/Appointments'
import DoctorQueue       from './pages/doctor/Queue'
import Prescriptions     from './pages/doctor/Prescriptions'
import PatientHistory    from './pages/doctor/PatientHistory'

// ASHA
import ASHADashboard     from './pages/asha/Dashboard'
import RegisterPatient   from './pages/asha/RegisterPatient'
import HealthCamps       from './pages/asha/HealthCamps'
import ASHATelemed       from './pages/asha/Telemedicine'

// Admin
import AdminDashboard    from './pages/admin/Dashboard'
import Analytics         from './pages/admin/Analytics'
import DoctorAvailability from './pages/admin/DoctorAvailability'
import DoctorWorkload    from './pages/admin/DoctorWorkload'
import AdminCamps        from './pages/admin/HealthCamps'

// Pharmacy
import { PharmacyDashboard, PharmacyInventory } from './pages/pharmacy/index'
import PharmacyLocator   from './pages/pharmacy/PharmacyLocator'

import { ROLE_HOME } from './utils/helpers'

// ── Auth Guard ────────────────────────────────────────────────────────────────
function RequireAuth({ children, role }) {
  const { user, loading } = useAuth()
  if (loading) return <SplashLoader />
  if (!user)   return <Navigate to="/login" replace />
  if (role && user.role !== role) return <Navigate to={ROLE_HOME[user.role] || '/login'} replace />
  return children
}

// ── Role Guard: redirect logged-in users away from login ──────────────────────
function PublicOnly({ children }) {
  const { user, loading } = useAuth()
  if (loading) return null
  if (user)    return <Navigate to={ROLE_HOME[user.role] || '/'} replace />
  return children
}

// ── Wrapped page helper ───────────────────────────────────────────────────────
function Page({ children, role }) {
  return (
    <RequireAuth role={role}>
      <Layout>{children}</Layout>
    </RequireAuth>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <LangProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* Public */}
              <Route path="/login" element={<PublicOnly><Login /></PublicOnly>} />
              <Route path="/"      element={<RootRedirect />} />

              {/* Patient */}
              <Route path="/patient"              element={<Page role="patient"><PatientDashboard /></Page>} />
              <Route path="/patient/appointments" element={<Page role="patient"><PatientAppts /></Page>} />
              <Route path="/patient/records"      element={<Page role="patient"><HealthRecords /></Page>} />
              <Route path="/patient/symptoms"     element={<Page role="patient"><SymptomChecker /></Page>} />
              <Route path="/patient/qr"           element={<Page role="patient"><QRCard /></Page>} />
              <Route path="/patient/telemedicine" element={<Page role="patient"><Telemedicine /></Page>} />
              <Route path="/patient/medicines"    element={<Page role="patient"><Medicines /></Page>} />

              {/* Doctor */}
              <Route path="/doctor"              element={<Page role="doctor"><DoctorDashboard /></Page>} />
              <Route path="/doctor/appointments" element={<Page role="doctor"><DoctorAppts /></Page>} />
              <Route path="/doctor/queue"        element={<Page role="doctor"><DoctorQueue /></Page>} />
              <Route path="/doctor/prescriptions"element={<Page role="doctor"><Prescriptions /></Page>} />
              <Route path="/doctor/history"      element={<Page role="doctor"><PatientHistory /></Page>} />

              {/* ASHA */}
              <Route path="/asha"              element={<Page role="asha"><ASHADashboard /></Page>} />
              <Route path="/asha/register"     element={<Page role="asha"><RegisterPatient /></Page>} />
              <Route path="/asha/camps"        element={<Page role="asha"><HealthCamps /></Page>} />
              <Route path="/asha/telemedicine" element={<Page role="asha"><ASHATelemed /></Page>} />

              {/* Admin */}
              <Route path="/admin"              element={<Page role="admin"><AdminDashboard /></Page>} />
              <Route path="/admin/analytics"    element={<Page role="admin"><Analytics /></Page>} />
              <Route path="/admin/availability" element={<Page role="admin"><DoctorAvailability /></Page>} />
              <Route path="/admin/workload"     element={<Page role="admin"><DoctorWorkload /></Page>} />
              <Route path="/admin/camps"        element={<Page role="admin"><AdminCamps /></Page>} />

              {/* Pharmacy */}
              <Route path="/pharmacy"           element={<Page role="pharmacy"><PharmacyDashboard /></Page>} />
              <Route path="/pharmacy/inventory" element={<Page role="pharmacy"><PharmacyInventory /></Page>} />
              <Route path="/pharmacy/locator"   element={<Page role="pharmacy"><PharmacyLocator /></Page>} />

              {/* Catch-all */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </LangProvider>
    </ThemeProvider>
  )
}

function SplashLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center mesh-bg-light dark:mesh-bg">
      <div className="flex flex-col items-center gap-4 animate-scale-in">
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-500 to-violet-600
            flex items-center justify-center shadow-lg shadow-brand-500/30 animate-pulse-soft">
            <span className="text-white font-black text-lg">eS</span>
          </div>
          <div className="absolute -inset-1.5 rounded-3xl border-2 border-brand-400/30 animate-spin-slow"/>
        </div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Loading eSEHAT Nabha…</p>
      </div>
    </div>
  )
}

function RootRedirect() {
  const { user, loading } = useAuth()
  if (loading) return null
  return <Navigate to={user ? (ROLE_HOME[user.role] || '/login') : '/login'} replace />
}
