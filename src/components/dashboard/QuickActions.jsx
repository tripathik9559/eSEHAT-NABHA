import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Stethoscope,
  Activity,
  Pill,
  FileText,
  Video,
  Phone,
  Users,
  Settings,
  AlertTriangle,
  Clock,
  MapPin,
  Star,
  ChevronRight,
  Zap,
  Shield,
  Heart,
  Calendar,
  MessageCircle,
  Download,
  Upload,
  RefreshCw,
  Bell,
  Search,
  Filter,
  MoreHorizontal,
  Bookmark,
  Share2,
  Eye,
  TrendingUp,
  Award,
  Target,
  Globe,
  Wifi,
  Database,
  BarChart3
} from 'lucide-react';

const QuickActions = ({ 
  actions = [], 
  currentLanguage = 'en',
  userRole = 'patient', // 'patient', 'doctor', 'admin'
  showRecommendations = true,
  customActions = []
}) => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [recentActions, setRecentActions] = useState([]);
  const [showAllActions, setShowAllActions] = useState(false);

  // Enhanced translations
  const translations = {
    en: {
      quickActions: "Quick Actions",
      subtitle: "Access key features with one click",
      popularActions: "Popular Actions",
      recentActions: "Recently Used",
      emergencyServices: "Emergency Services",
      emergencyCall: "Emergency: 108",
      emergencyNote: "For medical emergencies, call immediately",
      viewAll: "View All Actions",
      showLess: "Show Less",
      bookConsultation: "Book Consultation",
      consultationDesc: "Connect with available doctors instantly",
      symptomChecker: "Symptom Checker", 
      symptomDesc: "AI-powered health assessment",
      medicineStock: "Medicine Stock",
      medicineDesc: "Check medicine availability",
      healthRecords: "Health Records",
      recordsDesc: "Access patient medical history",
      videoCall: "Video Consultation",
      videoDesc: "Start face-to-face consultation",
      adminPanel: "Admin Dashboard",
      adminDesc: "System management and analytics",
      recommended: "Recommended for you"
    },
    hi: {
      quickActions: "त्वरित कार्य",
      subtitle: "एक क्लिक में मुख्य सुविधाओं तक पहुंच",
      popularActions: "लोकप्रिय कार्य",
      recentActions: "हाल ही में उपयोग किए गए",
      emergencyServices: "आपातकालीन सेवाएं",
      emergencyCall: "आपातकाल: 108",
      emergencyNote: "चिकित्सा आपातकाल के लिए तुरंत कॉल करें",
      viewAll: "सभी कार्य देखें",
      showLess: "कम दिखाएं",
      bookConsultation: "परामर्श बुक करें",
      consultationDesc: "उपलब्ध डॉक्टरों से तुरंत जुड़ें",
      symptomChecker: "लक्षण जांच",
      symptomDesc: "AI-संचालित स्वास्थ्य मूल्यांकन",
      medicineStock: "दवा स्टॉक",
      medicineDesc: "दवा उपलब्धता जांचें",
      healthRecords: "स्वास्थ्य रिकॉर्ड",
      recordsDesc: "रोगी चिकित्सा इतिहास तक पहुंच",
      videoCall: "वीडियो परामर्श",
      videoDesc: "आमने-सामने परामर्श शुरू करें",
      adminPanel: "एडमिन डैशबोर्ड",
      adminDesc: "सिस्टम प्रबंधन और एनालिटिक्स",
      recommended: "आपके लिए अनुशंसित"
    },
    pa: {
      quickActions: "ਤੁਰੰਤ ਕਾਰਵਾਈਆਂ",
      subtitle: "ਇੱਕ ਕਲਿੱਕ ਨਾਲ ਮੁੱਖ ਸੁਵਿਧਾਵਾਂ ਤੱਕ ਪਹੁੰਚ",
      popularActions: "ਪ੍ਰਸਿੱਧ ਕਾਰਵਾਈਆਂ",
      recentActions: "ਹਾਲ ਹੀ ਵਿੱਚ ਵਰਤੀਆਂ",
      emergencyServices: "ਐਮਰਜੈਂਸੀ ਸੇਵਾਵਾਂ",
      emergencyCall: "ਐਮਰਜੈਂਸੀ: 108",
      emergencyNote: "ਮੈਡੀਕਲ ਐਮਰਜੈਂਸੀ ਲਈ ਤੁਰੰਤ ਕਾਲ ਕਰੋ",
      viewAll: "ਸਾਰੀਆਂ ਕਾਰਵਾਈਆਂ ਦੇਖੋ",
      showLess: "ਘੱਟ ਦਿਖਾਓ",
      bookConsultation: "ਸਲਾਹ ਬੁੱਕ ਕਰੋ",
      consultationDesc: "ਉਪਲਬਧ ਡਾਕਟਰਾਂ ਨਾਲ ਤੁਰੰਤ ਜੁੜੋ",
      symptomChecker: "ਲੱਛਣ ਜਾਂਚ",
      symptomDesc: "AI-ਸੰਚਾਲਿਤ ਸਿਹਤ ਮੁਲਾਂਕਣ",
      medicineStock: "ਦਵਾਈ ਸਟਾਕ",
      medicineDesc: "ਦਵਾਈ ਉਪਲਬਧਤਾ ਜਾਂਚੋ",
      healthRecords: "ਸਿਹਤ ਰਿਕਾਰਡ",
      recordsDesc: "ਮਰੀਜ਼ ਦੇ ਮੈਡੀਕਲ ਇਤਿਹਾਸ ਤੱਕ ਪਹੁੰਚ",
      videoCall: "ਵੀਡੀਓ ਸਲਾਹ",
      videoDesc: "ਆਹਮੋ-ਸਾਹਮਣੇ ਸਲਾਹ ਸ਼ੁਰੂ ਕਰੋ",
      adminPanel: "ਐਡਮਿਨ ਡੈਸ਼ਬੋਰਡ",
      adminDesc: "ਸਿਸਟਮ ਪ੍ਰਬੰਧਨ ਅਤੇ ਵਿਸ਼ਲੇਸ਼ਣ",
      recommended: "ਤੁਹਾਡੇ ਲਈ ਸਿਫਾਰਸ਼ੀ"
    }
  };

  const t = translations[currentLanguage] || translations.en;

  // Default actions based on user role
  const getDefaultActions = () => {
    const baseActions = [
      {
        id: 'book-consultation',
        title: t.bookConsultation,
        description: t.consultationDesc,
        icon: Stethoscope,
        route: '/doctors',
        bgColor: 'bg-gradient-to-r from-blue-500 to-blue-600',
        hoverColor: 'hover:from-blue-600 hover:to-blue-700',
        category: 'consultation',
        popularity: 95,
        isPopular: true
      },
      {
        id: 'symptom-checker',
        title: t.symptomChecker,
        description: t.symptomDesc,
        icon: Activity,
        route: '/symptom-checker',
        bgColor: 'bg-gradient-to-r from-green-500 to-green-600',
        hoverColor: 'hover:from-green-600 hover:to-green-700',
        category: 'diagnosis',
        popularity: 87,
        isPopular: true
      },
      {
        id: 'medicine-tracker',
        title: t.medicineStock,
        description: t.medicineDesc,
        icon: Pill,
        route: '/medicine-tracker',
        bgColor: 'bg-gradient-to-r from-purple-500 to-purple-600',
        hoverColor: 'hover:from-purple-600 hover:to-purple-700',
        category: 'pharmacy',
        popularity: 76
      },
      {
        id: 'health-records',
        title: t.healthRecords,
        description: t.recordsDesc,
        icon: FileText,
        route: '/health-records',
        bgColor: 'bg-gradient-to-r from-orange-500 to-orange-600',
        hoverColor: 'hover:from-orange-600 hover:to-orange-700',
        category: 'records',
        popularity: 82
      }
    ];

    // Add role-specific actions
    if (userRole === 'admin') {
      baseActions.push({
        id: 'admin-panel',
        title: t.adminPanel,
        description: t.adminDesc,
        icon: Settings,
        route: '/admin',
        bgColor: 'bg-gradient-to-r from-red-500 to-red-600',
        hoverColor: 'hover:from-red-600 hover:to-red-700',
        category: 'admin',
        popularity: 65
      });
    }

    return baseActions;
  };

  const defaultActions = getDefaultActions();
  const actionsToRender = actions.length > 0 ? actions : defaultActions;
  const allActions = [...actionsToRender, ...customActions];

  const handleActionClick = (action) => {
    // Track recent actions
    const updatedRecent = [action.id, ...recentActions.filter(id => id !== action.id)].slice(0, 3);
    setRecentActions(updatedRecent);
    
    if (action.route && navigate) {
      navigate(action.route);
    }
    
    if (action.onClick) {
      action.onClick();
    }
  };

  const toggleFavorite = (actionId, e) => {
    e.stopPropagation();
    if (favorites.includes(actionId)) {
      setFavorites(favorites.filter(id => id !== actionId));
    } else {
      setFavorites([...favorites, actionId]);
    }
  };

  const getPopularActions = () => {
    return allActions
      .filter(action => action.isPopular || action.popularity > 80)
      .slice(0, 4);
  };

  const getRecentlyUsedActions = () => {
    return recentActions
      .map(id => allActions.find(action => action.id === id))
      .filter(Boolean)
      .slice(0, 3);
  };

  const ActionCard = ({ action, size = 'default', showStats = false }) => {
    const sizeClasses = {
      small: 'p-4',
      default: 'p-6',
      large: 'p-8'
    };

    const iconSizes = {
      small: 'w-8 h-8',
      default: 'w-12 h-12',
      large: 'w-16 h-16'
    };

    return (
      <button
        onClick={() => handleActionClick(action)}
        className={`
          ${action.bgColor} ${action.hoverColor}
          text-white ${sizeClasses[size]} rounded-xl shadow-lg
          transform transition-all duration-300
          hover:scale-105 hover:shadow-2xl
          focus:outline-none focus:ring-4 focus:ring-opacity-50
          active:scale-95
          group relative overflow-hidden
        `}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='m0 40l40-40V0H20L0 20z'/%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        {/* Favorite button */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => toggleFavorite(action.id, e)}
            className="p-1 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all"
          >
            <Bookmark 
              className={`w-4 h-4 ${favorites.includes(action.id) ? 'fill-current' : ''}`} 
            />
          </button>
        </div>

        {/* Main content */}
        <div className="relative z-10">
          {/* Icon */}
          <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
            {React.isValidElement(action.icon) ? 
              React.cloneElement(action.icon, { className: iconSizes[size] }) : 
              <action.icon className={iconSizes[size]} />
            }
          </div>
          
          {/* Title */}
          <h3 className="text-lg font-semibold mb-2 leading-tight">
            {action.title}
          </h3>
          
          {/* Description */}
          <p className="text-sm opacity-90 leading-relaxed mb-4">
            {action.description}
          </p>

          {/* Stats for popular actions */}
          {showStats && action.popularity && (
            <div className="flex items-center justify-between text-xs opacity-75 mb-2">
              <div className="flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                <span>{action.popularity}% popular</span>
              </div>
              {action.isPopular && (
                <div className="flex items-center">
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  <span>Top</span>
                </div>
              )}
            </div>
          )}
          
          {/* Arrow indicator */}
          <div className="flex justify-end">
            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-white bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300 group-hover:translate-x-1">
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </button>
    );
  };

  return (
    <div className="w-full">
      {/* Main Section Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.quickActions}</h2>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      {/* Popular Actions */}
      {showRecommendations && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
              <Star className="w-5 h-5 text-yellow-500 mr-2" />
              {t.popularActions}
            </h3>
            <span className="text-sm text-gray-500">{t.recommended}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {getPopularActions().map((action) => (
              <ActionCard key={action.id} action={action} showStats={true} />
            ))}
          </div>
        </div>
      )}

      {/* Recently Used Actions */}
      {recentActions.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Clock className="w-5 h-5 text-blue-500 mr-2" />
            {t.recentActions}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {getRecentlyUsedActions().map((action) => (
              <ActionCard key={`recent-${action.id}`} action={action} size="small" />
            ))}
          </div>
        </div>
      )}

      {/* All Actions Grid */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">All Services</h3>
          <button
            onClick={() => setShowAllActions(!showAllActions)}
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
          >
            {showAllActions ? t.showLess : t.viewAll}
            <ChevronRight className={`w-4 h-4 ml-1 transition-transform ${showAllActions ? 'rotate-90' : ''}`} />
          </button>
        </div>

        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500 ${
          showAllActions ? 'max-h-none' : 'max-h-96 overflow-hidden'
        }`}>
          {allActions.map((action) => (
            <ActionCard key={action.id} action={action} />
          ))}
        </div>
      </div>

      {/* Quick Access Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {[
          { icon: Video, label: 'Video Call', route: '/consultation', color: 'teal' },
          { icon: Phone, label: 'Audio Call', route: '/consultation?mode=audio', color: 'blue' },
          { icon: MessageCircle, label: 'Chat Support', route: '/support', color: 'green' },
          { icon: Calendar, label: 'Appointments', route: '/appointments', color: 'purple' }
        ].map((item, index) => (
          <button
            key={index}
            onClick={() => item.route && navigate && navigate(item.route)}
            className={`bg-white border-2 border-gray-200 hover:border-${item.color}-300 hover:bg-${item.color}-50 p-4 rounded-xl transition-all duration-300 text-center group`}
          >
            <item.icon className={`w-6 h-6 mx-auto mb-2 text-gray-600 group-hover:text-${item.color}-600 transition-colors`} />
            <span className={`text-sm font-medium text-gray-700 group-hover:text-${item.color}-700`}>
              {item.label}
            </span>
          </button>
        ))}
      </div>

      {/* Emergency Contact */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-semibold">{t.emergencyServices}</h4>
              <p className="text-red-100 text-sm">{t.emergencyNote}</p>
            </div>
          </div>
          <a 
            href="tel:108" 
            className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors flex items-center"
          >
            <Phone className="w-4 h-4 mr-2" />
            {t.emergencyCall}
          </a>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;