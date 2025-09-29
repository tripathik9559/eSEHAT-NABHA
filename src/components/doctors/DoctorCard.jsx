import React from 'react';
import { 
  Star, 
  Clock, 
  MapPin, 
  Phone, 
  Video, 
  MessageCircle, 
  Calendar,
  Award,
  Users,
  Heart,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const DoctorCard = ({ 
  doctor, 
  onBookConsultation, 
  onViewProfile, 
  currentLanguage = 'en',
  showActions = true,
  variant = 'default' // 'default', 'compact', 'detailed'
}) => {
  // Enhanced translations
  const translations = {
    en: {
      available: 'Available',
      busy: 'Busy',
      offline: 'Offline',
      experience: 'Experience',
      rating: 'Rating',
      languages: 'Languages',
      nextSlot: 'Next Slot',
      consultationFee: 'Consultation Fee',
      bookNow: 'Book Now',
      viewProfile: 'View Profile',
      videoCall: 'Video Call',
      audioCall: 'Audio Call',
      chatConsult: 'Chat',
      patientsToday: 'Patients Today',
      avgConsultation: 'Avg Consultation',
      responseTime: 'Response Time',
      specialization: 'Specialization'
    },
    hi: {
      available: 'उपलब्ध',
      busy: 'व्यस्त',
      offline: 'ऑफलाइन',
      experience: 'अनुभव',
      rating: 'रेटिंग',
      languages: 'भाषाएं',
      nextSlot: 'अगला स्लॉट',
      consultationFee: 'परामर्श शुल्क',
      bookNow: 'अभी बुक करें',
      viewProfile: 'प्रोफाइल देखें',
      videoCall: 'वीडियो कॉल',
      audioCall: 'ऑडियो कॉल',
      chatConsult: 'चैट',
      patientsToday: 'आज के मरीज़',
      avgConsultation: 'औसत परामर्श',
      responseTime: 'जवाब का समय',
      specialization: 'विशेषज्ञता'
    },
    pa: {
      available: 'ਉਪਲਬਧ',
      busy: 'ਰੁੱਝਿਆ',
      offline: 'ਆਫਲਾਈਨ',
      experience: 'ਤਜਰਬਾ',
      rating: 'ਰੇਟਿੰਗ',
      languages: 'ਭਾਸ਼ਾਵਾਂ',
      nextSlot: 'ਅਗਲਾ ਸਲਾਟ',
      consultationFee: 'ਸਲਾਹ ਫੀਸ',
      bookNow: 'ਹੁਣੇ ਬੁੱਕ ਕਰੋ',
      viewProfile: 'ਪ੍ਰੋਫਾਈਲ ਦੇਖੋ',
      videoCall: 'ਵੀਡੀਓ ਕਾਲ',
      audioCall: 'ਆਡੀਓ ਕਾਲ',
      chatConsult: 'ਚੈਟ',
      patientsToday: 'ਅੱਜ ਦੇ ਮਰੀਜ਼',
      avgConsultation: 'ਔਸਤ ਸਲਾਹ',
      responseTime: 'ਜਵਾਬ ਦਾ ਸਮਾਂ',
      specialization: 'ਵਿਸ਼ੇਸ਼ਤਾ'
    }
  };

  const t = translations[currentLanguage] || translations.en;

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'busy':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'offline':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available':
        return <CheckCircle className="w-3 h-3" />;
      case 'busy':
        return <Clock className="w-3 h-3" />;
      case 'offline':
        return <AlertCircle className="w-3 h-3" />;
      default:
        return <Clock className="w-3 h-3" />;
    }
  };

  const getDoctorName = () => {
    if (currentLanguage === 'hi' && doctor.nameHi) return doctor.nameHi;
    if (currentLanguage === 'pa' && doctor.namePa) return doctor.namePa;
    return doctor.name;
  };

  const getSpecialty = () => {
    if (currentLanguage === 'hi' && doctor.specialtyHi) return doctor.specialtyHi;
    if (currentLanguage === 'pa' && doctor.specialtyPa) return doctor.specialtyPa;
    return doctor.specialty;
  };

  if (variant === 'compact') {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-all duration-300 border border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-lg font-semibold">
            {doctor.image || doctor.name.charAt(0)}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">{getDoctorName()}</h3>
            <p className="text-sm text-blue-600">{getSpecialty()}</p>
          </div>
          
          <div className="text-right">
            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(doctor.status)}`}>
              {getStatusIcon(doctor.status)}
              <span className="ml-1">{t[doctor.status]}</span>
            </div>
            {showActions && (
              <button
                onClick={() => onBookConsultation?.(doctor)}
                disabled={doctor.status !== 'available'}
                className="mt-2 w-full px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {t.bookNow}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 group">
      {/* Header with Doctor Info */}
      <div className="p-6">
        <div className="flex items-start space-x-4 mb-4">
          {/* Doctor Avatar */}
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-semibold shadow-lg">
              {doctor.image || doctor.name.charAt(0)}
            </div>
            
            {/* Online Status Indicator */}
            <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${
              doctor.status === 'available' ? 'bg-green-400' : 
              doctor.status === 'busy' ? 'bg-yellow-400' : 'bg-red-400'
            }`}></div>
          </div>
          
          {/* Doctor Details */}
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
              {getDoctorName()}
            </h3>
            <p className="text-blue-600 font-medium mb-2">{getSpecialty()}</p>
            
            {/* Status Badge */}
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(doctor.status)}`}>
              {getStatusIcon(doctor.status)}
              <span className="ml-2">{t[doctor.status]}</span>
            </div>
          </div>
          
          {/* Fee Display */}
          {doctor.consultationFee && (
            <div className="text-right">
              <p className="text-sm text-gray-500">{t.consultationFee}</p>
              <p className="text-2xl font-bold text-green-600">{doctor.consultationFee}</p>
            </div>
          )}
        </div>

        {/* Doctor Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center space-x-2 mb-1">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">{t.rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-lg font-bold text-gray-900">{doctor.rating}</span>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-3 h-3 ${
                      star <= Math.floor(doctor.rating) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center space-x-2 mb-1">
              <Award className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-gray-700">{t.experience}</span>
            </div>
            <p className="text-lg font-bold text-gray-900">{doctor.experience}</p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="space-y-3">
          {doctor.languages && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">{t.languages}:</p>
              <div className="flex flex-wrap gap-2">
                {doctor.languages.map((lang, index) => (
                  <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs font-medium">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          )}

          {doctor.location && (
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{doctor.location}</span>
            </div>
          )}

          {doctor.nextSlot && doctor.status === 'available' && (
            <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
              <div className="flex items-center text-sm text-green-800">
                <Clock className="w-4 h-4 mr-2" />
                <span className="font-medium">{t.nextSlot}: {doctor.nextSlot}</span>
              </div>
            </div>
          )}

          {doctor.consultationsToday && (
            <div className="flex justify-between text-sm text-gray-600">
              <span>{t.patientsToday}: <span className="font-semibold">{doctor.consultationsToday}</span></span>
              {doctor.avgConsultationTime && (
                <span>{t.avgConsultation}: <span className="font-semibold">{doctor.avgConsultationTime}</span></span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      {showActions && (
        <div className="px-6 pb-6">
          <div className="flex space-x-2 mb-3">
            <button
              onClick={() => onBookConsultation?.(doctor, 'video')}
              disabled={doctor.status !== 'available'}
              className="flex-1 flex items-center justify-center space-x-2 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-medium"
            >
              <Video className="w-4 h-4" />
              <span>{t.videoCall}</span>
            </button>
            
            <button
              onClick={() => onBookConsultation?.(doctor, 'audio')}
              disabled={doctor.status !== 'available'}
              className="flex-1 flex items-center justify-center space-x-2 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-medium"
            >
              <Phone className="w-4 h-4" />
              <span>{t.audioCall}</span>
            </button>

            <button
              onClick={() => onBookConsultation?.(doctor, 'chat')}
              disabled={doctor.status !== 'available'}
              className="flex-1 flex items-center justify-center space-x-2 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-medium"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t.chatConsult}</span>
            </button>
          </div>

          <button
            onClick={() => onViewProfile?.(doctor)}
            className="w-full py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            {t.viewProfile}
          </button>
        </div>
      )}
    </div>
  );
};

export default DoctorCard;