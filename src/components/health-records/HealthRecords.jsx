import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  QrCode as QrCodeIcon,
  Calendar,
  User,
  AlertCircle,
  CheckCircle,
  Clock,
  ChevronDown,
  X
} from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { mockHealthRecords, getRecentRecords, getRecordsByCategory } from '../../data/mockHealthRecords';
import RecordCard from './RecordCard';
import RecordViewer from './RecordViewer';
import LoadingSpinner from '../common/LoadingSpinner';


// Temporary hooks until you create the real ones
const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(initialValue);
  return [value, setValue];
};

const useOfflineStatus = () => {
  return { isOnline: navigator.onLine };
};

const useNotifications = () => {
  return {
    showNotification: (message, type) => {
      console.log(`${type}: ${message}`);
    }
  };
};



const HealthRecords = () => {
  const { translate : t } = useLanguage();
  const { isOnline } = useOfflineStatus();
  const { showNotification } = useNotifications();
  
  // State management
  const [records, setRecords] = useLocalStorage('healthRecords', mockHealthRecords);
  const [filteredRecords, setFilteredRecords] = useState(records);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Categories for filtering
  const categories = [
    { id: 'all', label: t.allRecords || 'All Records', icon: FileText },
    { id: 'routine', label: t.routine || 'Routine', icon: Calendar },
    { id: 'follow-up', label: t.followUp || 'Follow-up', icon: Clock },
    { id: 'emergency', label: t.emergency || 'Emergency', icon: AlertCircle },
    { id: 'chronic', label: t.chronic || 'Chronic', icon: Clock },
    { id: 'preventive', label: t.preventive || 'Preventive', icon: CheckCircle }
  ];

  // Sort options
  const sortOptions = [
    { id: 'date-desc', label: t.newestFirst || 'Newest First' },
    { id: 'date-asc', label: t.oldestFirst || 'Oldest First' },
    { id: 'doctor', label: t.byDoctor || 'By Doctor' },
    { id: 'type', label: t.byType || 'By Type' }
  ];

  // Filter and search logic
  useEffect(() => {
    let result = [...records];

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(record => record.category === selectedCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(record => 
        record.type.toLowerCase().includes(query) ||
        record.doctor.toLowerCase().includes(query) ||
        record.diagnosis.toLowerCase().includes(query) ||
        record.symptoms.some(symptom => symptom.toLowerCase().includes(query))
      );
    }

    // Sort records
    switch (sortBy) {
      case 'date-desc':
        result.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
        break;
      case 'date-asc':
        result.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
        break;
      case 'doctor':
        result.sort((a, b) => a.doctor.localeCompare(b.doctor));
        break;
      case 'type':
        result.sort((a, b) => a.type.localeCompare(b.type));
        break;
      default:
        break;
    }

    setFilteredRecords(result);
  }, [records, selectedCategory, searchQuery, sortBy]);

  // Handle record view
  const handleViewRecord = (record) => {
    setSelectedRecord(record);
    setIsViewerOpen(true);
  };

  // Handle export all records
  const handleExportRecords = () => {
    try {
      const dataStr = JSON.stringify(records, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `health-records-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
      showNotification(t.recordsExported || 'Records exported successfully', 'success');
    } catch (error) {
      showNotification(t.exportFailed || 'Export failed', 'error');
    }
  };

  // Clear filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSortBy('date-desc');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {t.healthRecords || 'Health Records'}
              </h1>
              <p className="text-gray-600">
                {t.recordsSubtitle || 'View and manage your medical history'}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={handleExportRecords}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">{t.export || 'Export'}</span>
              </button>
              
              {!isOnline && (
                <div className="flex items-center gap-2 px-3 py-2 bg-yellow-100 text-yellow-800 rounded-lg text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">{t.offlineMode || 'Offline'}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{t.totalRecords || 'Total Records'}</p>
                <p className="text-2xl font-bold text-gray-900">{records.length}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{t.recentVisits || 'Recent Visits'}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {getRecentRecords(30).length}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{t.pendingFollowups || 'Pending'}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {records.filter(r => r.status === 'pending').length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{t.uniqueDoctors || 'Doctors'}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {new Set(records.map(r => r.doctorId)).size}
                </p>
              </div>
              <User className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchRecords || 'Search by type, doctor, diagnosis...'}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                {sortOptions.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                showFilters 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Filter className="w-5 h-5" />
              <span>{t.filters || 'Filters'}</span>
            </button>
          </div>

          {/* Category Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {categories.map(category => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm">{category.label}</span>
                    </button>
                  );
                })}
              </div>

              {(searchQuery || selectedCategory !== 'all') && (
                <button
                  onClick={handleClearFilters}
                  className="mt-3 text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  {t.clearFilters || 'Clear all filters'}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Records List */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <LoadingSpinner />
          </div>
        ) : filteredRecords.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {t.noRecordsFound || 'No records found'}
            </h3>
            <p className="text-gray-600 mb-4">
              {searchQuery 
                ? t.tryDifferentSearch || 'Try a different search term'
                : t.noRecordsYet || 'No health records available yet'}
            </p>
            {(searchQuery || selectedCategory !== 'all') && (
              <button
                onClick={handleClearFilters}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                {t.clearFilters || 'Clear filters'}
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredRecords.map(record => (
              <RecordCard
                key={record.id}
                record={record}
                onView={handleViewRecord}
              />
            ))}
          </div>
        )}

        {/* Record Viewer Modal */}
        {isViewerOpen && selectedRecord && (
          <RecordViewer
            record={selectedRecord}
            onClose={() => {
              setIsViewerOpen(false);
              setSelectedRecord(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default HealthRecords;