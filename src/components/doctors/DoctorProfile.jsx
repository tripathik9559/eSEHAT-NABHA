import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { useNotifications } from '../../hooks/useNotifications';
import mockData from '../../data/mockData';
import { 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Clock, 
  Award,
  BookOpen,
  Users,
  ChevronLeft,
  Video,
  MessageCircle,
  PhoneCall
} from 'lucide-react';

const DoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { showNotification } = useNotifications();
  const [selectedDay, setSelectedDay] = useState('today');
  
  // Find doctor by ID
  const doctor = mockData.doctors.find(doc => doc.id === parseInt(id));
  
  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('doctorNotFound')}</h2>
          <button 
            onClick={() => navigate('/doctors')}
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            {t('backToDoctors')}
          </button>
        </div>
      </div>
    );
  }

  const availabilityDays = [
    { key: 'today', label: t('today'), slots: ['09:00', '10:30', '02:00', '04:30'] },
    { key: 'tomorrow', label: t('tomorrow'), slots: ['09:00', '11:00', '03:00', '05:00'] },
    { key: 'dayAfter', label: t('dayAfter'), slots: ['10:00', '01:00', '03:30'] }
  ];

  const handleConsultationBook = (type, time = null) => {
    const message = time 
      ? t('consultationScheduledWithTime', { type, time, doctor: doctor.name })
      : t('consultationScheduled', { type, doctor: doctor.name });
    
    showNotification(message, 'success');
    
    setTimeout(() => {
      navigate('/consultation');
    }, 2000);
  };

  const renderRating = (rating) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating 
                ? 'text-yellow-400 fill-current' 
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">({rating}.0)</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button 
            onClick={() => navigate('/doctors')}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors mb-4"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            {t('back')}
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Doctor Info Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-2xl md:text-3xl font-bold">
              {doctor.name.charAt(0)}
            </div>
            
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                {doctor.name}
              </h1>
              <p className="text-lg text-blue-600 font-medium mb-2">
                {doctor.specialization}
              </p>
              <div className="flex flex-wrap items-center space-x-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center">
                  <Award className="w-4 h-4 mr-1" />
                  {doctor.experience} {t('experience')}
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {doctor.patients}+ {t('patients')}
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {doctor.location}
                </div>
              </div>
              {renderRating(doctor.rating)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                {t('about')}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {doctor.bio || `Dr. ${doctor.name} is a highly experienced ${doctor.specialization.toLowerCase()} with over ${doctor.experience} of practice. Known for providing comprehensive and compassionate care to patients, Dr. ${doctor.name} stays updated with the latest medical advances and treatment protocols.`}
              </p>
            </div>

            {/* Qualifications */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2 text-blue-600" />
                {t('qualifications')}
              </h2>
              <div className="space-y-2">
                {(doctor.qualifications || [
                  'MBBS - Government Medical College',
                  `MD ${doctor.specialization} - AIIMS`,
                  'Fellowship in Advanced Medicine'
                ]).map((qual, index) => (
                  <div key={index} className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    {qual}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {t('contactInformation')}
              </h2>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Phone className="w-5 h-5 mr-3 text-blue-600" />
                  <span>{doctor.phone || '+91 98765 43210'}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="w-5 h-5 mr-3 text-blue-600" />
                  <span>{doctor.email || `dr.${doctor.name.toLowerCase().replace(' ', '.')}@hospital.com`}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-3 text-blue-600" />
                  <span>{doctor.address || `${doctor.location} Medical Center`}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                {t('quickConsultation')}
              </h2>
              <div className="space-y-3">
                <button
                  onClick={() => handleConsultationBook('video')}
                  className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Video className="w-5 h-5 mr-2" />
                  {t('videoCall')}
                </button>
                <button
                  onClick={() => handleConsultationBook('audio')}
                  className="w-full flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <PhoneCall className="w-5 h-5 mr-2" />
                  {t('audioCall')}
                </button>
                <button
                  onClick={() => handleConsultationBook('chat')}
                  className="w-full flex items-center justify-center px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {t('chatConsultation')}
                </button>
              </div>
            </div>

            {/* Availability */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                {t('availability')}
              </h2>
              
              {/* Day Selection */}
              <div className="flex space-x-2 mb-4">
                {availabilityDays.map((day) => (
                  <button
                    key={day.key}
                    onClick={() => setSelectedDay(day.key)}
                    className={`flex-1 px-3 py-2 text-sm rounded-lg transition-colors ${
                      selectedDay === day.key
                        ? 'bg-blue-100 text-blue-700 border-2 border-blue-200'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {day.label}
                  </button>
                ))}
              </div>

              {/* Time Slots */}
              <div className="space-y-2">
                {availabilityDays
                  .find(day => day.key === selectedDay)
                  ?.slots.map((time, index) => (
                    <button
                      key={index}
                      onClick={() => handleConsultationBook('scheduled', time)}
                      className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-blue-50 hover:border-blue-200 border border-gray-200 rounded-lg transition-colors group"
                    >
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-gray-500 group-hover:text-blue-600" />
                        <span className="text-gray-700 group-hover:text-blue-700">
                          {time}
                        </span>
                      </div>
                      <span className="text-sm text-green-600 font-medium">
                        {t('available')}
                      </span>
                    </button>
                  ))}
              </div>
            </div>

            {/* Consultation Fee */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {t('consultationFee')}
              </h3>
              <div className="text-2xl font-bold text-blue-600 mb-1">
                ₹{doctor.fee || '500'}
              </div>
              <p className="text-sm text-gray-600">
                {t('perConsultation')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;