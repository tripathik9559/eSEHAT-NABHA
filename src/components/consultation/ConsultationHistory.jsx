import React, { useState } from 'react';
import {
  Calendar,
  User,
  Video,
  Phone,
  MessageSquare,
  Clock,
  FileText,
  Download,
  Eye,
  Filter,
  Search,
  ChevronRight,
  Pill,
  Activity
} from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const ConsultationHistory = ({ onViewDetails }) => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // all, video, audio, chat
  const [filterStatus, setFilterStatus] = useState('all'); // all, completed, cancelled
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  
  // Mock consultation history data
  const [consultationHistory] = useLocalStorage('consultationHistory', [
    {
      id: 'CONS001',
      doctorName: 'Dr. Rajesh Kumar',
      specialty: 'General Physician',
      type: 'video',
      date: '2025-01-15',
      time: '10:30 AM',
      duration: '25 min',
      status: 'completed',
      symptoms: ['Fever', 'Cough', 'Headache'],
      diagnosis: 'Common Cold',
      prescription: [
        { name: 'Paracetamol 500mg', dosage: '1 tablet', frequency: 'Twice daily' },
        { name: 'Cough Syrup', dosage: '10ml', frequency: 'Three times daily' }
      ],
      notes: 'Patient showing improvement. Continue medication for 5 days.',
      followUp: '2025-01-22'
    },
    {
      id: 'CONS002',
      doctorName: 'Dr. Priya Sharma',
      specialty: 'Dermatologist',
      type: 'audio',
      date: '2025-01-10',
      time: '3:00 PM',
      duration: '15 min',
      status: 'completed',
      symptoms: ['Skin Rash', 'Itching'],
      diagnosis: 'Allergic Dermatitis',
      prescription: [
        { name: 'Antihistamine', dosage: '1 tablet', frequency: 'Once daily' },
        { name: 'Moisturizing Cream', dosage: 'Apply', frequency: 'Twice daily' }
      ],
      notes: 'Avoid allergens. Apply cream regularly.',
      followUp: null
    },
    {
      id: 'CONS003',
      doctorName: 'Dr. Amit Verma',
      specialty: 'Cardiologist',
      type: 'chat',
      date: '2025-01-05',
      time: '11:00 AM',
      duration: '20 min',
      status: 'completed',
      symptoms: ['Chest Discomfort', 'Breathlessness'],
      diagnosis: 'Anxiety-related symptoms',
      prescription: [],
      notes: 'Recommended stress management and regular exercise. No medication required.',
      followUp: '2025-02-05'
    },
    {
      id: 'CONS004',
      doctorName: 'Dr. Sarah Johnson',
      specialty: 'Pediatrician',
      type: 'video',
      date: '2024-12-28',
      time: '2:30 PM',
      duration: '18 min',
      status: 'cancelled',
      symptoms: ['Stomach Pain'],
      diagnosis: null,
      prescription: [],
      notes: 'Consultation cancelled by patient.',
      followUp: null
    }
  ]);

  // Filter consultations
  const filteredConsultations = consultationHistory.filter(consultation => {
    const matchesSearch = 
      consultation.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.diagnosis?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || consultation.type === filterType;
    const matchesStatus = filterStatus === 'all' || consultation.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  // Get consultation type icon
  const getTypeIcon = (type) => {
    switch (type) {
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'audio':
        return <Phone className="w-4 h-4" />;
      case 'chat':
        return <MessageSquare className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  // Get type label
  const getTypeLabel = (type) => {
    switch (type) {
      case 'video':
        return t?.videoCall || 'Video Call';
      case 'audio':
        return t?.audioCall || 'Audio Call';
      case 'chat':
        return t?.chat || 'Chat';
      default:
        return t?.consultation || 'Consultation';
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // View consultation details
  const handleViewDetails = (consultation) => {
    setSelectedConsultation(consultation);
    if (onViewDetails) {
      onViewDetails(consultation);
    }
  };

  // Download prescription
  const handleDownloadPrescription = (consultation) => {
    alert(`${t?.downloadingPrescription || 'Downloading prescription'}: ${consultation.id}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          {t?.consultationHistory || 'Consultation History'}
        </h1>
        <p className="text-gray-600">
          {t?.consultationHistoryDesc || 'View your past consultations and medical records'}
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={t?.searchConsultations || 'Search consultations...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Type Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">{t?.allTypes || 'All Types'}</option>
            <option value="video">{t?.videoCall || 'Video Call'}</option>
            <option value="audio">{t?.audioCall || 'Audio Call'}</option>
            <option value="chat">{t?.chat || 'Chat'}</option>
          </select>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">{t?.allStatus || 'All Status'}</option>
            <option value="completed">{t?.completed || 'Completed'}</option>
            <option value="cancelled">{t?.cancelled || 'Cancelled'}</option>
          </select>
        </div>
      </div>

      {/* Consultations List */}
      {filteredConsultations.length > 0 ? (
        <div className="space-y-4">
          {filteredConsultations.map((consultation) => (
            <div
              key={consultation.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 md:p-6 border border-gray-200"
            >
              <div className="flex flex-col md:flex-row gap-4">
                {/* Left Section - Doctor Info */}
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 text-lg">
                        {consultation.doctorName}
                      </h3>
                      <p className="text-sm text-gray-600">{consultation.specialty}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(consultation.date)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{consultation.time}</span>
                        </div>
                        <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold ${
                          consultation.type === 'video' ? 'bg-blue-100 text-blue-800' :
                          consultation.type === 'audio' ? 'bg-green-100 text-green-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {getTypeIcon(consultation.type)}
                          <span>{getTypeLabel(consultation.type)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Consultation Details */}
                  {consultation.status === 'completed' && (
                    <div className="space-y-2">
                      {consultation.symptoms && consultation.symptoms.length > 0 && (
                        <div className="flex items-start gap-2 text-sm">
                          <Activity className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-medium text-gray-700">{t?.symptoms || 'Symptoms'}:</span>
                            <span className="text-gray-600 ml-2">
                              {consultation.symptoms.join(', ')}
                            </span>
                          </div>
                        </div>
                      )}
                      {consultation.diagnosis && (
                        <div className="flex items-start gap-2 text-sm">
                          <FileText className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-medium text-gray-700">{t?.diagnosis || 'Diagnosis'}:</span>
                            <span className="text-gray-600 ml-2">{consultation.diagnosis}</span>
                          </div>
                        </div>
                      )}
                      {consultation.prescription && consultation.prescription.length > 0 && (
                        <div className="flex items-start gap-2 text-sm">
                          <Pill className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-medium text-gray-700">{t?.prescription || 'Prescription'}:</span>
                            <span className="text-gray-600 ml-2">
                              {consultation.prescription.length} {t?.medicines || 'medicines'}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Status Badge */}
                  <div className="mt-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                      consultation.status === 'completed' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {consultation.status === 'completed' ? t?.completed || 'Completed' : t?.cancelled || 'Cancelled'}
                    </span>
                  </div>
                </div>

                {/* Right Section - Actions */}
                <div className="flex md:flex-col gap-2 md:justify-between">
                  <button
                    onClick={() => handleViewDetails(consultation)}
                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium flex-1 md:flex-initial"
                  >
                    <Eye className="w-4 h-4" />
                    <span className="hidden sm:inline">{t?.viewDetails || 'View Details'}</span>
                  </button>
                  {consultation.status === 'completed' && consultation.prescription?.length > 0 && (
                    <button
                      onClick={() => handleDownloadPrescription(consultation)}
                      className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium flex-1 md:flex-initial"
                    >
                      <Download className="w-4 h-4" />
                      <span className="hidden sm:inline">{t?.download || 'Download'}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            {t?.noConsultations || 'No Consultations Found'}
          </h3>
          <p className="text-gray-500">
            {searchTerm || filterType !== 'all' || filterStatus !== 'all'
              ? t?.noMatchingConsultations || 'No consultations match your search criteria'
              : t?.noConsultationsYet || 'You haven\'t had any consultations yet'}
          </p>
        </div>
      )}
    </div>
  );
};

export default ConsultationHistory;