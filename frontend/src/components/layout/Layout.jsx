import { useState } from 'react'
import TopBar from './TopBar'
import Sidebar from './Sidebar'
import { OfflineBanner } from '../common/index'

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <div className="min-h-screen mesh-bg-light dark:mesh-bg">
      <TopBar onMenuClick={() => setSidebarOpen(s => !s)} sidebarOpen={sidebarOpen} />
      <OfflineBanner />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="lg:ml-56 min-h-[calc(100vh-3.5rem)]">
        <div className="p-4 md:p-6 max-w-7xl mx-auto animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  )
}
