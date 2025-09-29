import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, 
  Users, 
  Calendar, 
  MessageCircle, 
  FileText, 
  Pill, 
  BarChart3,
  Phone,
  Video,
  Clock,
  MapPin,
  Star,
  Search,
  CheckCircle,
  AlertCircle,
  Wifi,
  WifiOff,
  Globe,
  Stethoscope,
  UserCircle,
  Download,
  QrCode,
  Shield,
  RefreshCw,
  Menu,
  X,
  ChevronRight,
  Activity,
  Building,
  Plus,
  Filter,
  Zap,
  TrendingUp,
  Bell
} from 'lucide-react';

import StatsCard from './StatsCard';
import QuickActions from './QuickActions';
import { dashboardStats, quickActionsData, recentActivities, villageData } from '../../data/mockData';

const DashboardHome = ({ currentLanguage = 'en', isOnline = true }) => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [stats, setStats] = useState(dashboardStats);
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'info', message: 'System maintenance scheduled for tonight', priority: 'low' },
    { id: 2, type: 'warning', message: 'Medicine stock running low in 3 locations', priority: 'medium' },
    { id: 3, type: 'success', message: '5 new doctors joined this week', priority: 'low' }
  ]);

  // Enhanced translations
  const translations = {
    en: {
      welcome: "Welcome to Nabha Telemedicine",
      subtitle: "Connecting Rural Communities to Quality Healthcare",
      quickStats: "Quick Statistics",
      recentActivity: "Recent Activity",
      systemStatus: "System Status",
      emergencyContact: "Emergency Services",
      villageOverview: "Village Network Overview",
      notifications: "Notifications",
      lastUpdated: "Last updated",
      viewAll: "View All",
      emergency: "Emergency: 108"
    },
    hi: {
      welcome: "नाभा टेलीमेडिसिन में आपका स्वागत है",
      subtitle: "ग्रामीण समुदायों को गुणवत्तापूर्ण स्वास्थ्य सेवा से जोड़ना",
      quickStats: "त्वरित आंकड़े",
      recentActivity: "हाल की गतिविधि",
      systemStatus: "सिस्टम स्थिति",
      emergencyContact: "आपातकालीन सेवाएं",
      villageOverview: "गांव नेटवर्क अवलोकन",
      notifications: "सूचनाएं",
      lastUpdated: "अंतिम अद्यतन",
      viewAll: "सभी देखें",
      emergency: "आपातकाल: 108"
    },
    pa: {
      welcome: "ਨਾਭਾ ਟੈਲੀਮੈਡੀਸਿਨ ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ",
      subtitle: "ਪਿੰਡੀ ਭਾਈਚਾਰਿਆਂ ਨੂੰ ਗੁਣਵੱਤਾ ਸਿਹਤ ਸੇਵਾ ਨਾਲ ਜੋੜਨਾ",
      quickStats: "ਤੁਰੰਤ ਅੰਕੜੇ",
      recentActivity: "ਹਾਲ ਦੀ ਗਤੀਵਿਧੀ",
      systemStatus: "ਸਿਸਟਮ ਸਥਿਤੀ",
      emergencyContact: "ਐਮਰਜੈਂਸੀ ਸੇਵਾਵਾਂ",
      villageOverview: "ਪਿੰਡਾਂ ਦਾ ਨੈਟਵਰਕ ਨਜ਼ਰੀਆ",
      notifications: "ਸੂਚਨਾਵਾਂ",
      lastUpdated: "ਆਖਰੀ ਅਪਡੇਟ",
      viewAll: "ਸਭ ਦੇਖੋ",
      emergency: "ਐਮਰਜੈਂਸੀ: 108"
    }
  };

  const t = translations[currentLanguage] || translations.en;

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Enhanced Hero Banner */}
      <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <div className="flex justify-center items-center mb-6">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Heart className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              {t.welcome}
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              {t.subtitle}
            </p>
            
            {/* Status Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-blue-100">
              <div className="flex items-center gap-3 bg-white bg-opacity-10 px-4 py-2 rounded-full backdrop-blur-sm">
                <Calendar className="w-5 h-5" />
                <span className="font-medium">{formatDate(currentTime)}</span>
              </div>
              <div className="flex items-center gap-3 bg-white bg-opacity-10 px-4 py-2 rounded-full backdrop-blur-sm">
                <Clock className="w-5 h-5" />
                <span className="font-medium">{formatTime(currentTime)}</span>
              </div>
              <div className="flex items-center gap-3 bg-white bg-opacity-10 px-4 py-2 rounded-full backdrop-blur-sm">
                {isOnline ? <Wifi className="w-5 h-5" /> : <WifiOff className="w-5 h-5" />}
                <span className="font-medium">{isOnline ? 'Online' : 'Offline'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        {/* Enhanced Dashboard Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Available Doctors"
            value={`${stats.doctorsAvailable.current}/${stats.doctorsAvailable.total}`}
            subtitle={`${stats.doctorsAvailable.percentage}% available`}
            icon={<Stethoscope className="w-8 h-8" />}
            bgColor="bg-gradient-to-br from-blue-500 to-blue-600"
            textColor="text-white"
            iconColor="text-blue-100"
            trend={stats.doctorsAvailable.current > 8 ? "High Availability" : "Limited"}
            trendColor={stats.doctorsAvailable.current > 8 ? "text-green-300" : "text-yellow-300"}
          />
          
          <StatsCard
            title="Villages Connected"
            value={stats.villagesServed}
            subtitle="Active connections"
            icon={<MapPin className="w-8 h-8" />}
            bgColor="bg-gradient-to-br from-green-500 to-green-600"
            textColor="text-white"
            iconColor="text-green-100"
            trend="+12 this month"
            trendColor="text-green-300"
          />
          
          <StatsCard
            title="Medicine Stock"
            value={`${stats.medicineStock.percentage}%`}
            subtitle={`${stats.medicineStock.inStock}/${stats.medicineStock.total} available`}
            icon={<Pill className="w-8 h-8" />}
            bgColor="bg-gradient-to-br from-purple-500 to-purple-600"
            textColor="text-white"
            iconColor="text-purple-100"
            trend={stats.medicineStock.percentage > 70 ? "Well Stocked" : "Needs Attention"}
            trendColor={stats.medicineStock.percentage > 70 ? "text-green-300" : "text-yellow-300"}
          />
          
          <StatsCard
            title="Patients Served"
            value={stats.patientsServed.toLocaleString()}
            subtitle={`${stats.consultationsToday} today`}
            icon={<Users className="w-8 h-8" />}
            bgColor="bg-gradient-to-br from-orange-500 to-orange-600"
            textColor="text-white"
            iconColor="text-orange-100"
            trend="+47 today"
            trendColor="text-green-300"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 mb-8">
          {/* Quick Actions - Takes up 3 columns */}
          <div className="xl:col-span-3">
            <QuickActions actions={quickActionsData} />
          </div>

          {/* Right Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            {/* Notifications Panel */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5 text-blue-500" />
                {t.notifications}
              </h3>
              
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {notifications.map((notification) => (
                  <div key={notification.id} className={`p-3 rounded-lg border-l-4 ${
                    notification.type === 'warning' ? 'border-orange-400 bg-orange-50' :
                    notification.type === 'success' ? 'border-green-400 bg-green-50' :
                    'border-blue-400 bg-blue-50'
                  }`}>
                    <p className="text-sm font-medium text-gray-800 mb-1">
                      {notification.message}
                    </p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      notification.priority === 'high' ? 'bg-red-100 text-red-700' :
                      notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {notification.priority} priority
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-500" />
                {t.recentActivity}
              </h3>
              
              <div className="space-y-4 max-h-80 overflow-y-auto">
                {recentActivities.slice(0, 5).map((activity) => (
                  <div key={activity.id} className="border-l-4 border-gray-200 pl-4 pb-4">
                    <div className={`w-2 h-2 rounded-full -ml-6 mt-2 ${
                      activity.priority === 'high' ? 'bg-red-500' :
                      activity.priority === 'medium' ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}></div>
                    <p className="text-sm text-gray-800 font-medium mb-1">
                      {activity.message}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => navigate && navigate('/admin')}
                className="w-full mt-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-300 text-sm font-medium"
              >
                {t.viewAll}
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Villages Overview */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Building className="w-6 h-6 text-blue-500" />
              {t.villageOverview}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <RefreshCw className="w-4 h-4" />
              {t.lastUpdated}: 2 min ago
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            {villageData.map((village, index) => (
              <div key={index} className="group p-4 bg-gradient-to-br from-gray-50 to-white rounded-lg border hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-4 h-4 rounded-full ${
                    village.status === 'active' ? 'bg-green-500' : 
                    village.status === 'maintenance' ? 'bg-yellow-500' : 'bg-red-500'
                  } animate-pulse`}></div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{village.name}</h4>
                <p className="text-sm text-gray-600 mb-1">{village.patients} patients</p>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  village.status === 'active' ? 'bg-green-100 text-green-700' :
                  village.status === 'maintenance' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {village.status}
                </span>
              </div>
            ))}
          </div>

          {/* Village Network Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {villageData.filter(v => v.status === 'active').length}
              </div>
              <p className="text-sm text-green-700">Active Villages</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600 mb-1">
                {villageData.filter(v => v.status === 'maintenance').length}
              </div>
              <p className="text-sm text-yellow-700">Under Maintenance</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {villageData.reduce((sum, v) => sum + v.patients, 0)}
              </div>
              <p className="text-sm text-blue-700">Total Patients</p>
            </div>
          </div>
        </div>

        {/* Enhanced System Status */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-6 text-center">
            <CheckCircle className="w-8 h-8 mx-auto mb-3 text-green-100" />
            <h4 className="font-semibold mb-1">{t.systemStatus}</h4>
            <p className="text-sm opacity-90">All systems operational</p>
          </div>
          
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-6 text-center">
            <Globe className="w-8 h-8 mx-auto mb-3 text-blue-100" />
            <h4 className="font-semibold mb-1">Network Status</h4>
            <p className="text-sm opacity-90">Connected to all hubs</p>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg p-6 text-center">
            <Zap className="w-8 h-8 mx-auto mb-3 text-purple-100" />
            <h4 className="font-semibold mb-1">Performance</h4>
            <p className="text-sm opacity-90">Optimal response time</p>
          </div>
          
          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg p-6 text-center">
            <Phone className="w-8 h-8 mx-auto mb-3 text-red-100" />
            <h4 className="font-semibold mb-1">{t.emergencyContact}</h4>
            <p className="text-sm opacity-90">{t.emergency}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;