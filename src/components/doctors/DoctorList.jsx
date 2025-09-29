import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  SortAsc, 
  SortDesc,
  Users,
  Clock,
  Star,
  MapPin,
  Stethoscope,
  RefreshCw,
  Grid,
  List,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import DoctorCard from './DoctorCard';
import { doctorSchedule } from '../../data/mockData';

const DoctorList = ({ 
  currentLanguage = 'en',
  onBookConsultation,
  onViewProfile
}) => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Enhanced translations
  const translations = {
    en: {
      title: 'Available Doctors',
      subtitle: 'Connect with qualified healthcare professionals',
      searchPlaceholder: 'Search doctors by name or specialty...',
      filters: 'Filters',
      clearFilters: 'Clear All',
      sortBy: 'Sort By',
      specialty: 'Specialty',
      status: 'Status',
      allSpecialties: 'All Specialties',
      allStatuses: 'All Statuses',
      available: 'Available',
      busy: 'Busy',
      offline: 'Offline',
      name: 'Name',
      rating: 'Rating',
      experience: 'Experience',
      consultationFee: 'Fee',
      gridView: 'Grid View',
      listView: 'List View',
      doctorsFound: 'doctors found',
      noDoctors: 'No doctors found',
      tryDifferentSearch: 'Try adjusting your search criteria',
      refreshList: 'Refresh List',
      onlineNow: 'Online Now',
      totalDoctors: 'Total Doctors'
    },
    hi: {
      title: 'उपलब्ध डॉक्टर',
      subtitle: 'योग्य स्वास्थ्य सेवा पेशेवरों से जुड़ें',
      searchPlaceholder: 'नाम या विशेषज्ञता से डॉक्टर खोजें...',
      filters: 'फिल्टर',
      clearFilters: 'सभी साफ करें',
      sortBy: 'क्रमबद्ध करें',
      specialty: 'विशेषज्ञता',
      status: 'स्थिति',
      allSpecialties: 'सभी विशेषज्ञताएं',
      allStatuses: 'सभी स्थितियां',
      available: 'उपलब्ध',
      busy: 'व्यस्त',
      offline: 'ऑफलाइन',
      name: 'नाम',
      rating: 'रेटिंग',
      experience: 'अनुभव',
      consultationFee: 'शुल्क',
      gridView: 'ग्रिड दृश्य',
      listView: 'सूची दृश्य',
      doctorsFound: 'डॉक्टर मिले',
      noDoctors: 'कोई डॉक्टर नहीं मिला',
      tryDifferentSearch: 'अपना खोज मानदंड बदलने का प्रयास करें',
      refreshList: 'सूची रीफ्रेश करें',
      onlineNow: 'अभी ऑनलाइन',
      totalDoctors: 'कुल डॉक्टर'
    },
    pa: {
      title: 'ਉਪਲਬਧ ਡਾਕਟਰ',
      subtitle: 'ਯੋਗ ਸਿਹਤ ਸੇਵਾ ਪੇਸ਼ੇਵਰਾਂ ਨਾਲ ਜੁੜੋ',
      searchPlaceholder: 'ਨਾਮ ਜਾਂ ਵਿਸ਼ੇਸ਼ਤਾ ਨਾਲ ਡਾਕਟਰ ਖੋਜੋ...',
      filters: 'ਫਿਲਟਰ',
      clearFilters: 'ਸਾਰੇ ਸਾਫ਼ ਕਰੋ',
      sortBy: 'ਕ੍ਰਮਬੱਧ ਕਰੋ',
      specialty: 'ਵਿਸ਼ੇਸ਼ਤਾ',
      status: 'ਸਥਿਤੀ',
      allSpecialties: 'ਸਾਰੀਆਂ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ',
      allStatuses: 'ਸਾਰੀਆਂ ਸਥਿਤੀਆਂ',
      available: 'ਉਪਲਬਧ',
      busy: 'ਰੁੱਝਿਆ',
      offline: 'ਆਫਲਾਈਨ',
      name: 'ਨਾਮ',
      rating: 'ਰੇਟਿੰਗ',
      experience: 'ਤਜਰਬਾ',
      consultationFee: 'ਫੀਸ',
      gridView: 'ਗਰਿੱਡ ਵਿਊ',
      listView: 'ਲਿਸਟ ਵਿਊ',
      doctorsFound: 'ਡਾਕਟਰ ਮਿਲੇ',
      noDoctors: 'ਕੋਈ ਡਾਕਟਰ ਨਹੀਂ ਮਿਲੇ',
      tryDifferentSearch: 'ਆਪਣੇ ਖੋਜ ਮਾਪਦੰਡ ਬਦਲਣ ਦੀ ਕੋਸ਼ਿਸ਼ ਕਰੋ',
      refreshList: 'ਸੂਚੀ ਰਿਫ੍ਰੈਸ਼ ਕਰੋ',
      onlineNow: 'ਹੁਣ ਆਨਲਾਈਨ',
      totalDoctors: 'ਕੁੱਲ ਡਾਕਟਰ'
    }
  };

  const t = translations[currentLanguage] || translations.en;

  // Initialize doctors data
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      const mockDoctors = [
        ...doctorSchedule.map(doc => ({
          ...doc,
          status: doc.currentStatus === 'available' ? 'available' : 
                 doc.currentStatus === 'in-consultation' ? 'busy' : 'offline',
          nextSlot: doc.nextAppointment,
          consultationFee: `₹${Math.floor(Math.random() * 300) + 200}`,
          location: doc.location,
          experience: `${Math.floor(Math.random() * 15) + 5} years`,
          image: null
        })),
        // Add more mock doctors
        {
          id: 4,
          name: 'Dr. Amit Sharma',
          nameHi: 'डॉ. अमित शर्मा',
          namePa: 'ਡਾ. ਅਮਿਤ ਸ਼ਰਮਾ',
          specialty: 'Orthopedics',
          specialtyHi: 'हड्डी रोग',
          specialtyPa: 'ਹੱਡੀਆਂ ਦੀ ਬਿਮਾਰੀ',
          status: 'available',
          rating: 4.6,
          experience: '10 years',
          languages: ['Hindi', 'English'],
          consultationFee: '₹400',
          location: 'Bhadson Clinic',
          nextSlot: 'Today 5:00 PM',
          consultationsToday: 5,
          avgConsultationTime: '16 min'
        },
        {
          id: 5,
          name: 'Dr. Sunita Kaur',
          nameHi: 'डॉ. सुनीता कौर',
          namePa: 'ਡਾ. ਸੁਨੀਤਾ ਕੌਰ',
          specialty: 'Gynecology',
          specialtyHi: 'स्त्री रोग',
          specialtyPa: 'ਔਰਤਾਂ ਦੀ ਬਿਮਾਰੀ',
          status: 'busy',
          rating: 4.9,
          experience: '12 years',
          languages: ['Punjabi', 'Hindi', 'English'],
          consultationFee: '₹350',
          location: 'Patran Women\'s Health Center',
          nextSlot: 'Tomorrow 9:00 AM',
          consultationsToday: 7,
          avgConsultationTime: '20 min'
        }
      ];
      setDoctors(mockDoctors);
      setFilteredDoctors(mockDoctors);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter and search functionality
  useEffect(() => {
    let filtered = doctors.filter(doctor => {
      const matchesSearch = 
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (doctor.nameHi && doctor.nameHi.includes(searchTerm)) ||
        (doctor.namePa && doctor.namePa.includes(searchTerm));
      
      const matchesSpecialty = selectedSpecialty === 'all' || 
        doctor.specialty.toLowerCase() === selectedSpecialty.toLowerCase();
      
      const matchesStatus = selectedStatus === 'all' || doctor.status === selectedStatus;
      
      return matchesSearch && matchesSpecialty && matchesStatus;
    });

    // Sort doctors
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'rating':
          aValue = a.rating;
          bValue = b.rating;
          break;
        case 'experience':
          aValue = parseInt(a.experience);
          bValue = parseInt(b.experience);
          break;
        case 'consultationFee':
          aValue = parseInt(a.consultationFee.replace('₹', ''));
          bValue = parseInt(b.consultationFee.replace('₹', ''));
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredDoctors(filtered);
  }, [doctors, searchTerm, selectedSpecialty, selectedStatus, sortBy, sortOrder]);

  const specialties = [...new Set(doctors.map(doctor => doctor.specialty))];
  const availableDoctors = doctors.filter(d => d.status === 'available').length;

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedSpecialty('all');
    setSelectedStatus('all');
    setSortBy('name');
    setSortOrder('asc');
  };

  const refreshDoctorList = () => {
    setIsLoading(true);
    setTimeout(() => {
      // Simulate updated data
      const updatedDoctors = doctors.map(doctor => ({
        ...doctor,
        status: Math.random() > 0.3 ? 'available' : 
               Math.random() > 0.5 ? 'busy' : 'offline'
      }));
      setDoctors(updatedDoctors);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{t.title}</h1>
              <p className="text-gray-600 mt-2">{t.subtitle}</p>
            </div>
            
            <button
              onClick={refreshDoctorList}
              className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              disabled={isLoading}
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{t.refreshList}</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-blue-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">{t.totalDoctors}</p>
                  <p className="text-2xl font-bold text-gray-900">{doctors.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
              <div className="flex items-center">
                <CheckCircle className="w-8 h-8 text-green-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">{t.onlineNow}</p>
                  <p className="text-2xl font-bold text-gray-900">{availableDoctors}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-purple-500">
              <div className="flex items-center">
                <Stethoscope className="w-8 h-8 text-purple-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Specialties</p>
                  <p className="text-2xl font-bold text-gray-900">{specialties.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span>{t.filters}</span>
              </button>

              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">{t.allSpecialties}</option>
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">{t.allStatuses}</option>
                <option value="available">{t.available}</option>
                <option value="busy">{t.busy}</option>
                <option value="offline">{t.offline}</option>
              </select>

              <button
                onClick={clearFilters}
                className="px-4 py-2 text-blue-600 hover:text-blue-800 transition-colors"
              >
                {t.clearFilters}
              </button>
            </div>

            <div className="flex items-center space-x-4">
              {/* Sort Controls */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">{t.sortBy}:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="name">{t.name}</option>
                  <option value="rating">{t.rating}</option>
                  <option value="experience">{t.experience}</option>
                  <option value="consultationFee">{t.consultationFee}</option>
                </select>
                
                <button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
                </button>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-50'} transition-colors`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-50'} transition-colors`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            <span className="font-semibold text-gray-900">{filteredDoctors.length}</span> {t.doctorsFound}
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Doctors Grid/List */}
        {!isLoading && filteredDoctors.length > 0 && (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'space-y-4'
          }>
            {filteredDoctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                currentLanguage={currentLanguage}
                onBookConsultation={onBookConsultation}
                onViewProfile={onViewProfile}
                variant={viewMode === 'list' ? 'compact' : 'default'}
              />
            ))}
          </div>
        )}

        {/* No Results */}
        {!isLoading && filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.noDoctors}</h3>
            <p className="text-gray-600 mb-4">{t.tryDifferentSearch}</p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              {t.clearFilters}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorList;