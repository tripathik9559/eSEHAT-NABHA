// Location: src/components/medicine-tracker/PharmacyLocator.jsx

import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Clock, Navigation, Search, Filter } from 'lucide-react';

/**
 * PharmacyLocator Component
 * Helps users find nearby pharmacies with medicine availability
 * Uses mock data for rural healthcare context
 */
const PharmacyLocator = ({ medicineName = '' }) => {
  const [searchQuery, setSearchQuery] = useState(medicineName);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [userLocation, setUserLocation] = useState(null);
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock pharmacy data for rural areas
  const mockPharmacies = [
    {
      id: 1,
      name: 'Nabha Medical Store',
      address: 'Main Market Road, Nabha',
      distance: '0.5 km',
      phone: '+91 98765 43210',
      hours: '8:00 AM - 10:00 PM',
      isOpen: true,
      hasStock: true,
      coordinates: { lat: 30.3752, lng: 76.1534 },
      medicines: ['Paracetamol', 'Amoxicillin', 'Cetirizine'],
      rating: 4.5
    },
    {
      id: 2,
      name: 'Jan Aushadhi Kendra',
      address: 'Civil Hospital Road, Nabha',
      distance: '1.2 km',
      phone: '+91 98765 43211',
      hours: '9:00 AM - 6:00 PM',
      isOpen: true,
      hasStock: true,
      coordinates: { lat: 30.3780, lng: 76.1550 },
      medicines: ['Metformin', 'Atorvastatin', 'Losartan'],
      rating: 4.7
    },
    {
      id: 3,
      name: 'Bharti Medical Hall',
      address: 'Bus Stand, Nabha',
      distance: '2.0 km',
      phone: '+91 98765 43212',
      hours: '7:00 AM - 11:00 PM',
      isOpen: true,
      hasStock: false,
      coordinates: { lat: 30.3720, lng: 76.1580 },
      medicines: ['Insulin', 'Aspirin', 'Ibuprofen'],
      rating: 4.3
    },
    {
      id: 4,
      name: 'Apollo Pharmacy',
      address: 'Patiala Road, Nabha',
      distance: '3.5 km',
      phone: '+91 98765 43213',
      hours: '24 Hours',
      isOpen: true,
      hasStock: true,
      coordinates: { lat: 30.3800, lng: 76.1600 },
      medicines: ['Paracetamol', 'Azithromycin', 'Omeprazole'],
      rating: 4.8
    },
    {
      id: 5,
      name: 'Sharma Medical Store',
      address: 'Grain Market, Nabha',
      distance: '1.8 km',
      phone: '+91 98765 43214',
      hours: '8:00 AM - 8:00 PM',
      isOpen: false,
      hasStock: true,
      coordinates: { lat: 30.3740, lng: 76.1520 },
      medicines: ['Vitamin D', 'Calcium', 'Iron supplements'],
      rating: 4.2
    }
  ];

  useEffect(() => {
    // Simulate getting user location
    setLoading(true);
    setTimeout(() => {
      setUserLocation({ lat: 30.3752, lng: 76.1534 });
      filterPharmacies();
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    filterPharmacies();
  }, [selectedFilter, searchQuery]);

  const filterPharmacies = () => {
    let filtered = [...mockPharmacies];

    // Filter by status
    if (selectedFilter === 'open') {
      filtered = filtered.filter(p => p.isOpen);
    } else if (selectedFilter === 'stock') {
      filtered = filtered.filter(p => p.hasStock);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.medicines.some(m => m.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setPharmacies(filtered);
  };

  const handleGetDirections = (pharmacy) => {
    // Open Google Maps with directions
    const url = `https://www.google.com/maps/dir/?api=1&destination=${pharmacy.coordinates.lat},${pharmacy.coordinates.lng}`;
    window.open(url, '_blank');
  };

  const handleCallPharmacy = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Find Nearby Pharmacies</h2>
        <p className="text-gray-600">Locate pharmacies and check medicine availability</p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search pharmacy or medicine..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedFilter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedFilter('open')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedFilter === 'open'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Open Now
            </button>
            <button
              onClick={() => setSelectedFilter('stock')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedFilter === 'stock'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              In Stock
            </button>
          </div>
        </div>
      </div>

      {/* Pharmacy List */}
      <div className="space-y-4">
        {pharmacies.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No pharmacies found matching your criteria</p>
          </div>
        ) : (
          pharmacies.map((pharmacy) => (
            <div
              key={pharmacy.id}
              className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row justify-between gap-4">
                {/* Pharmacy Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{pharmacy.name}</h3>
                      <div className="flex items-center text-yellow-500 text-sm mt-1">
                        <span>★ {pharmacy.rating}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {pharmacy.isOpen && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                          Open
                        </span>
                      )}
                      {pharmacy.hasStock && searchQuery && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                          In Stock
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{pharmacy.address} • {pharmacy.distance}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{pharmacy.hours}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>{pharmacy.phone}</span>
                    </div>
                  </div>

                  {/* Available Medicines */}
                  {searchQuery && (
                    <div className="mt-3">
                      <p className="text-xs text-gray-500 mb-1">Available medicines:</p>
                      <div className="flex flex-wrap gap-1">
                        {pharmacy.medicines.map((med, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                          >
                            {med}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex md:flex-col gap-2">
                  <button
                    onClick={() => handleGetDirections(pharmacy)}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Navigation className="w-4 h-4" />
                    <span className="text-sm font-medium">Directions</span>
                  </button>
                  <button
                    onClick={() => handleCallPharmacy(pharmacy.phone)}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span className="text-sm font-medium">Call</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Help Text */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Tip:</strong> Call ahead to confirm medicine availability and pricing. Jan Aushadhi Kendras offer generic medicines at discounted rates.
        </p>
      </div>
    </div>
  );
};

export default PharmacyLocator;