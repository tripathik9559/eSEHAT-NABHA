import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { useNotifications } from '../../hooks/useNotifications';
import mockData  from '../../data/mockData';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  FileText,
  CreditCard,
  Video,
  MessageCircle,
  PhoneCall,
  ChevronLeft,
  Check,
  AlertCircle
} from 'lucide-react';

const ConsultationBooking = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { showNotification } = useNotifications();

  const [formData, setFormData] = useState({
    doctorId: '',
    consultationType: 'video',
    date: '',
    time: '',
    patientName: '',
    patientAge: '',
    patientGender: 'male',
    phone: '',
    email: '',
    symptoms: '',
    previousVisit: 'no',
    paymentMethod: 'online'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);

  const consultationTypes = [
    { id: 'video', name: t('videoConsultation'), icon: Video, price: 500, color: 'blue' },
    { id: 'audio', name: t('audioConsultation'), icon: PhoneCall, price: 350, color: 'green' },
    { id: 'chat', name: t('chatConsultation'), icon: MessageCircle, price: 200, color: 'purple' }
  ];

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
    '05:00 PM', '05:30 PM'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate booking process
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const selectedDoctor = mockData.doctors.find(doc => doc.id === parseInt(formData.doctorId));
      const consultationType = consultationTypes.find(type => type.id === formData.consultationType);
      
      showNotification(
        t('consultationBooked', { 
          doctor: selectedDoctor?.name || 'Doctor',
          type: consultationType?.name || 'Consultation',
          date: formData.date,
          time: formData.time
        }),
        'success'
      );

      // Redirect to consultation history or dashboard
      setTimeout(() => {
        navigate('/consultation-history');
      }, 3000);
      
    } catch (error) {
      showNotification(t('bookingError'), 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const selectedConsultationType = consultationTypes.find(type => type.id === formData.consultationType);
  const selectedDoctor = mockData.doctors.find(doc => doc.id === parseInt(formData.doctorId));

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
          
          <h1 className="text-2xl font-bold text-gray-800">
            {t('bookConsultation')}
          </h1>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between">
              {[1, 2, 3].map((stepNum) => (
                <div key={stepNum} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step >= stepNum
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {step > stepNum ? <Check className="w-4 h-4" /> : stepNum}
                  </div>
                  {stepNum < 3 && (
                    <div
                      className={`w-full h-1 mx-4 ${
                        step > stepNum ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>{t('selectDoctor')}</span>
              <span>{t('patientDetails')}</span>
              <span>{t('confirmation')}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Doctor & Consultation Type Selection */}
          {step === 1 && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                {t('selectDoctorAndType')}
              </h2>

              {/* Doctor Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  {t('selectDoctor')}
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockData.doctors.slice(0, 4).map((doctor) => (
                    <div
                      key={doctor.id}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        formData.doctorId === doctor.id.toString()
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, doctorId: doctor.id.toString() }))}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
                          {doctor.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">{doctor.name}</h3>
                          <p className="text-sm text-gray-600">{doctor.specialization}</p>
                          <p className="text-sm text-gray-500">{doctor.experience}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Consultation Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  {t('consultationType')}
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {consultationTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <div
                        key={type.id}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                          formData.consultationType === type.id
                            ? `border-${type.color}-500 bg-${type.color}-50`
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setFormData(prev => ({ ...prev, consultationType: type.id }))}
                      >
                        <div className="text-center">
                          <Icon className={`w-8 h-8 mx-auto mb-2 text-${type.color}-600`} />
                          <h3 className="font-medium text-gray-800">{type.name}</h3>
                          <p className="text-sm text-gray-600">₹{type.price}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('selectDate')}
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('selectTime')}
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">{t('selectTime')}</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!formData.doctorId || !formData.date || !formData.time}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  {t('next')}
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Patient Details */}
          {step === 2 && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                {t('patientDetails')}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('patientName')}
                  </label>
                  <input
                    type="text"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('age')}
                  </label>
                  <input
                    type="number"
                    name="patientAge"
                    value={formData.patientAge}
                    onChange={handleInputChange}
                    required
                    min="1"
                    max="120"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('gender')}
                  </label>
                  <select
                    name="patientGender"
                    value={formData.patientGender}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="male">{t('male')}</option>
                    <option value="female">{t('female')}</option>
                    <option value="other">{t('other')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('phone')}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('email')}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('symptoms')}
                </label>
                <textarea
                  name="symptoms"
                  value={formData.symptoms}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder={t('describeSymptomsPlaceholder')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  {t('previous')}
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!formData.patientName || !formData.patientAge || !formData.phone || !formData.email}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  {t('next')}
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                {t('confirmBooking')}
              </h2>

              {/* Booking Summary */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-gray-800 mb-4">{t('bookingSummary')}</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{t('doctor')}</span>
                    <span className="font-medium">{selectedDoctor?.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{t('specialization')}</span>
                    <span className="font-medium">{selectedDoctor?.specialization}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{t('consultationType')}</span>
                    <span className="font-medium">{selectedConsultationType?.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{t('date')}</span>
                    <span className="font-medium">{formData.date}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{t('time')}</span>
                    <span className="font-medium">{formData.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{t('patient')}</span>
                    <span className="font-medium">{formData.patientName}</span>
                  </div>
                  <hr className="my-3" />
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span>{t('totalFee')}</span>
                    <span className="text-blue-600">₹{selectedConsultationType?.price}</span>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  {t('paymentMethod')}
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      formData.paymentMethod === 'online'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'online' }))}
                  >
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-6 h-6 text-blue-600" />
                      <div>
                        <h3 className="font-medium">{t('onlinePayment')}</h3>
                        <p className="text-sm text-gray-600">{t('payNow')}</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      formData.paymentMethod === 'cash'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'cash' }))}
                  >
                    <div className="flex items-center space-x-3">
                      <User className="w-6 h-6 text-green-600" />
                      <div>
                        <h3 className="font-medium">{t('payAtConsultation')}</h3>
                        <p className="text-sm text-gray-600">{t('payLater')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div className="mb-6">
                <div className="flex items-start space-x-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-medium mb-1">{t('importantNote')}</p>
                    <ul className="space-y-1 text-xs">
                      <li>• {t('arriveOnTime')}</li>
                      <li>• {t('cancellationPolicy')}</li>
                      <li>• {t('technicalRequirements')}</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  {t('previous')}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      {t('booking')}...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      {t('confirmAndBook')}
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default ConsultationBooking;