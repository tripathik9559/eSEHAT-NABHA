import React, { useState, useEffect } from 'react';
import {
  Pill,
  Plus,
  Calendar,
  Clock,
  Bell,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Search,
  Filter,
  MapPin,
  RefreshCw
} from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import MedicineCard from './MedicineCard';
import PharmacyLocator from './PharmacyLocator';
import RefillReminders from './RefillReminders';

const MedicineTracker = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('today'); // today, all, pharmacy, refills
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddMedicine, setShowAddMedicine] = useState(false);
  
  // Mock medicine data
  const [medicines, setMedicines] = useLocalStorage('medicines', [
    {
      id: 'MED001',
      name: 'Paracetamol 500mg',
      dosage: '1 tablet',
      frequency: 'Twice daily',
      timing: ['Morning', 'Night'],
      times: ['08:00 AM', '10:00 PM'],
      duration: '5 days',
      startDate: '2025-01-20',
      endDate: '2025-01-25',
      prescribedBy: 'Dr. Rajesh Kumar',
      instructions: 'Take after meals',
      stockLeft: 8,
      totalStock: 10,
      status: 'active',
      adherence: [
        { date: '2025-01-20', morning: true, night: true },
        { date: '2025-01-21', morning: true, night: false }
      ]
    },
    {
      id: 'MED002',
      name: 'Cough Syrup',
      dosage: '10ml',
      frequency: 'Three times daily',
      timing: ['Morning', 'Afternoon', 'Night'],
      times: ['08:00 AM', '02:00 PM', '10:00 PM'],
      duration: '7 days',
      startDate: '2025-01-18',
      endDate: '2025-01-25',
      prescribedBy: 'Dr. Rajesh Kumar',
      instructions: 'Shake well before use',
      stockLeft: 50,
      totalStock: 100,
      status: 'active',
      adherence: [
        { date: '2025-01-20', morning: true, afternoon: true, night: true },
        { date: '2025-01-21', morning: true, afternoon: false, night: false }
      ]
    },
    {
      id: 'MED003',
      name: 'Vitamin D3',
      dosage: '1 capsule',
      frequency: 'Once daily',
      timing: ['Morning'],
      times: ['09:00 AM'],
      duration: '30 days',
      startDate: '2025-01-01',
      endDate: '2025-01-31',
      prescribedBy: 'Dr. Priya Sharma',
      instructions: 'Take with breakfast',
      stockLeft: 5,
      totalStock: 30,
      status: 'active',
      adherence: []
    }
  ]);

  // Get today's date
  const today = new Date().toISOString().split('T')[0];

  // Filter medicines for today
  const todayMedicines = medicines.filter(med => {
    const start = new Date(med.startDate);
    const end = new Date(med.endDate);
    const current = new Date(today);
    return current >= start && current <= end && med.status === 'active';
  });

  // Calculate adherence percentage
  const calculateAdherence = (medicine) => {
    if (!medicine.adherence || medicine.adherence.length === 0) return 0;
    
    let taken = 0;
    let total = 0;
    
    medicine.adherence.forEach(day => {
      Object.keys(day).forEach(key => {
        if (key !== 'date') {
          total++;
          if (day[key]) taken++;
        }
      });
    });
    
    return total > 0 ? Math.round((taken / total) * 100) : 0;
  };

  // Mark medicine as taken
  const handleMarkAsTaken = (medicineId, timing) => {
    setMedicines(prevMedicines => {
      return prevMedicines.map(med => {
        if (med.id === medicineId) {
          const todayAdherence = med.adherence.find(a => a.date === today);
          if (todayAdherence) {
            todayAdherence[timing.toLowerCase()] = true;
          } else {
            med.adherence.push({
              date: today,
              [timing.toLowerCase()]: true
            });
          }
        }
        return med;
      });
    });
  };

  // Check if medicine is taken for specific timing
  const isTaken = (medicine, timing) => {
    const todayAdherence = medicine.adherence?.find(a => a.date === today);
    return todayAdherence?.[timing.toLowerCase()] || false;
  };

  // Get upcoming doses
  const getUpcomingDoses = () => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    const upcoming = [];
    todayMedicines.forEach(med => {
      med.times.forEach((time, index) => {
        const [hours, minutes] = time.split(':');
        const isPM = time.includes('PM');
        let hour = parseInt(hours);
        if (isPM && hour !== 12) hour += 12;
        if (!isPM && hour === 12) hour = 0;
        
        const medicineTime = hour * 60 + parseInt(minutes);
        if (medicineTime > currentTime) {
          upcoming.push({
            medicine: med,
            time: time,
            timing: med.timing[index],
            minutesUntil: medicineTime - currentTime
          });
        }
      });
    });
    
    return upcoming.sort((a, b) => a.minutesUntil - b.minutesUntil).slice(0, 3);
  };

  const upcomingDoses = getUpcomingDoses();

  // Calculate overall statistics
  const stats = {
    active: medicines.filter(m => m.status === 'active').length,
    todayDoses: todayMedicines.reduce((sum, med) => sum + med.times.length, 0),
    adherence: medicines.length > 0 
      ? Math.round(medicines.reduce((sum, med) => sum + calculateAdherence(med), 0) / medicines.length)
      : 0,
    lowStock: medicines.filter(m => (m.stockLeft / m.totalStock) < 0.3).length
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          {t?.medicineTracker || 'Medicine Tracker'}
        </h1>
        <p className="text-gray-600">
          {t?.medicineTrackerDesc || 'Track your medications and stay on schedule'}
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Pill className="w-5 h-5 text-blue-600" />
            <p className="text-sm text-blue-700 font-medium">{t?.activeMedicines || 'Active'}</p>
          </div>
          <p className="text-2xl font-bold text-blue-900">{stats.active}</p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-green-600" />
            <p className="text-sm text-green-700 font-medium">{t?.todayDoses || 'Today'}</p>
          </div>
          <p className="text-2xl font-bold text-green-900">{stats.todayDoses}</p>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <p className="text-sm text-purple-700 font-medium">{t?.adherence || 'Adherence'}</p>
          </div>
          <p className="text-2xl font-bold text-purple-900">{stats.adherence}%</p>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-5 h-5 text-orange-600" />
            <p className="text-sm text-orange-700 font-medium">{t?.lowStock || 'Low Stock'}</p>
          </div>
          <p className="text-2xl font-bold text-orange-900">{stats.lowStock}</p>
        </div>
      </div>

      {/* Upcoming Doses */}
      {upcomingDoses.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Bell className="w-5 h-5 text-blue-600" />
            {t?.upcomingDoses || 'Upcoming Doses'}
          </h3>
          <div className="space-y-2">
            {upcomingDoses.map((dose, index) => (
              <div key={index} className="flex items-center justify-between bg-white rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded">
                    <Pill className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{dose.medicine.name}</p>
                    <p className="text-xs text-gray-600">{dose.timing} • {dose.medicine.dosage}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-blue-600">{dose.time}</p>
                  <p className="text-xs text-gray-500">
                    {t?.in || 'in'} {Math.round(dose.minutesUntil / 60)}h {dose.minutesUntil % 60}m
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab('today')}
          className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
            activeTab === 'today'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {t?.today || 'Today'}
        </button>
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
            activeTab === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {t?.allMedicines || 'All Medicines'}
        </button>
        <button
          onClick={() => setActiveTab('pharmacy')}
          className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
            activeTab === 'pharmacy'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <MapPin className="w-4 h-4 inline mr-1" />
          {t?.pharmacies || 'Pharmacies'}
        </button>
        <button
          onClick={() => setActiveTab('refills')}
          className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
            activeTab === 'refills'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <RefreshCw className="w-4 h-4 inline mr-1" />
          {t?.refills || 'Refills'}
        </button>
      </div>

      {/* Tab Content */}
      {(activeTab === 'today' || activeTab === 'all') && (
        <>
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={t?.searchMedicines || 'Search medicines...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Medicine List */}
          <div className="space-y-4">
            {(activeTab === 'today' ? todayMedicines : medicines)
              .filter(med => 
                med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                med.prescribedBy?.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map(medicine => (
                <MedicineCard
                  key={medicine.id}
                  medicine={medicine}
                  onMarkTaken={handleMarkAsTaken}
                  isTaken={isTaken}
                  adherence={calculateAdherence(medicine)}
                />
              ))}
          </div>

          {/* Add Medicine Button */}
          <button
            onClick={() => setShowAddMedicine(true)}
            className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-colors"
          >
            <Plus className="w-6 h-6" />
          </button>
        </>
      )}

      {activeTab === 'pharmacy' && <PharmacyLocator />}
      {activeTab === 'refills' && <RefillReminders medicines={medicines} />}
    </div>
  );
};

export default MedicineTracker;