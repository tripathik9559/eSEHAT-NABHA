// Location: src/components/admin/DoctorManagement.jsx

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Edit2, 
  Trash2, 
  UserCheck, 
  UserX,
  Phone,
  Mail,
  MapPin,
  Stethoscope,
  Calendar,
  Star,
  X,
  Check
} from 'lucide-react';

/**
 * DoctorManagement Component
 * Admin interface for managing doctors in the telemedicine platform
 * CRUD operations, status management, and doctor verification
 */
const DoctorManagement = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialization: '',
    experience: '',
    qualification: '',
    registrationNumber: '',
    location: '',
    consultationFee: '',
    languages: '',
    about: ''
  });

  useEffect(() => {
    loadDoctors();
  }, []);

  useEffect(() => {
    filterDoctors();
  }, [doctors, searchQuery, statusFilter]);

  const loadDoctors = () => {
    // Mock doctors data
    const mockDoctors = [
      {
        id: 1,
        name: 'Dr. Rajesh Sharma',
        email: 'rajesh.sharma@hospital.com',
        phone: '+91 98765 43210',
        specialization: 'General Physician',
        experience: 15,
        qualification: 'MBBS, MD',
        registrationNumber: 'MCI-12345',
        location: 'Nabha, Punjab',
        consultationFee: 500,
        languages: 'Hindi, English, Punjabi',
        status: 'active',
        verified: true,
        rating: 4.8,
        totalConsultations: 1250,
        joinedDate: '2024-01-15',
        about: 'Experienced general physician specializing in chronic disease management'
      },
      {
        id: 2,
        name: 'Dr. Priya Verma',
        email: 'priya.verma@hospital.com',
        phone: '+91 98765 43211',
        specialization: 'Pediatrician',
        experience: 10,
        qualification: 'MBBS, DCH',
        registrationNumber: 'MCI-12346',
        location: 'Patiala, Punjab',
        consultationFee: 600,
        languages: 'Hindi, English',
        status: 'active',
        verified: true,
        rating: 4.9,
        totalConsultations: 980,
        joinedDate: '2024-02-20',
        about: 'Specialist in child healthcare and vaccination'
      },
      {
        id: 3,
        name: 'Dr. Amit Kumar',
        email: 'amit.kumar@hospital.com',
        phone: '+91 98765 43212',
        specialization: 'Cardiologist',
        experience: 20,
        qualification: 'MBBS, MD, DM',
        registrationNumber: 'MCI-12347',
        location: 'Ludhiana, Punjab',
        consultationFee: 800,
        languages: 'Hindi, English, Punjabi',
        status: 'inactive',
        verified: true,
        rating: 4.7,
        totalConsultations: 2100,
        joinedDate: '2023-11-10',
        about: 'Expert in cardiovascular diseases and heart health'
      },
      {
        id: 4,
        name: 'Dr. Sunita Kaur',
        email: 'sunita.kaur@hospital.com',
        phone: '+91 98765 43213',
        specialization: 'Gynecologist',
        experience: 12,
        qualification: 'MBBS, MS',
        registrationNumber: 'MCI-12348',
        location: 'Nabha, Punjab',
        consultationFee: 700,
        languages: 'Hindi, Punjabi',
        status: 'active',
        verified: false,
        rating: 4.6,
        totalConsultations: 750,
        joinedDate: '2024-08-05',
        about: 'Women\'s health specialist and prenatal care expert'
      },
      {
        id: 5,
        name: 'Dr. Harpreet Singh',
        email: 'harpreet.singh@hospital.com',
        phone: '+91 98765 43214',
        specialization: 'Orthopedic',
        experience: 8,
        qualification: 'MBBS, MS Ortho',
        registrationNumber: 'MCI-12349',
        location: 'Sangrur, Punjab',
        consultationFee: 650,
        languages: 'Hindi, English, Punjabi',
        status: 'pending',
        verified: false,
        rating: 4.4,
        totalConsultations: 420,
        joinedDate: '2025-09-20',
        about: 'Specialist in bone and joint disorders'
      }
    ];

    setDoctors(mockDoctors);
    
    // Load from localStorage if available
    const savedDoctors = localStorage.getItem('doctors');
    if (savedDoctors) {
      setDoctors(JSON.parse(savedDoctors));
    } else {
      setDoctors(mockDoctors);
      localStorage.setItem('doctors', JSON.stringify(mockDoctors));
    }
  };

  const filterDoctors = () => {
    let filtered = [...doctors];

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(doc => doc.status === statusFilter);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(doc =>
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredDoctors(filtered);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddDoctor = (e) => {
    e.preventDefault();
    const newDoctor = {
      id: Date.now(),
      ...formData,
      experience: parseInt(formData.experience),
      consultationFee: parseInt(formData.consultationFee),
      status: 'pending',
      verified: false,
      rating: 0,
      totalConsultations: 0,
      joinedDate: new Date().toISOString().split('T')[0]
    };
    
    const updatedDoctors = [...doctors, newDoctor];
    setDoctors(updatedDoctors);
    localStorage.setItem('doctors', JSON.stringify(updatedDoctors));
    resetForm();
  };

  const handleUpdateDoctor = (e) => {
    e.preventDefault();
    const updatedDoctors = doctors.map(doc =>
      doc.id === editingDoctor.id
        ? { 
            ...doc, 
            ...formData,
            experience: parseInt(formData.experience),
            consultationFee: parseInt(formData.consultationFee)
          }
        : doc
    );
    
    setDoctors(updatedDoctors);
    localStorage.setItem('doctors', JSON.stringify(updatedDoctors));
    resetForm();
  };

  const handleDeleteDoctor = (id) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      const updatedDoctors = doctors.filter(doc => doc.id !== id);
      setDoctors(updatedDoctors);
      localStorage.setItem('doctors', JSON.stringify(updatedDoctors));
    }
  };

  const handleStatusChange = (id, newStatus) => {
    const updatedDoctors = doctors.map(doc =>
      doc.id === id ? { ...doc, status: newStatus } : doc
    );
    setDoctors(updatedDoctors);
    localStorage.setItem('doctors', JSON.stringify(updatedDoctors));
  };

  const handleVerificationToggle = (id) => {
    const updatedDoctors = doctors.map(doc =>
      doc.id === id ? { ...doc, verified: !doc.verified } : doc
    );
    setDoctors(updatedDoctors);
    localStorage.setItem('doctors', JSON.stringify(updatedDoctors));
  };

  const startEdit = (doctor) => {
    setEditingDoctor(doctor);
    setFormData({
      name: doctor.name,
      email: doctor.email,
      phone: doctor.phone,
      specialization: doctor.specialization,
      experience: doctor.experience.toString(),
      qualification: doctor.qualification,
      registrationNumber: doctor.registrationNumber,
      location: doctor.location,
      consultationFee: doctor.consultationFee.toString(),
      languages: doctor.languages,
      about: doctor.about
    });
    setShowAddModal(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      specialization: '',
      experience: '',
      qualification: '',
      registrationNumber: '',
      location: '',
      consultationFee: '',
      languages: '',
      about: ''
    });
    setShowAddModal(false);
    setEditingDoctor(null);
  };

  const getStatusBadge = (status) => {
    const styles = {
      active: 'bg-green-100 text-green-700',
      inactive: 'bg-gray-100 text-gray-700',
      pending: 'bg-yellow-100 text-yellow-700'
    };
    return styles[status] || styles.pending;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Doctor Management</h2>
          <p className="text-gray-600 mt-1">Manage doctors and their profiles</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Add Doctor</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, specialization, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="flex gap-2">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                statusFilter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All ({doctors.length})
            </button>
            <button
              onClick={() => setStatusFilter('active')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                statusFilter === 'active'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Active ({doctors.filter(d => d.status === 'active').length})
            </button>
            <button
              onClick={() => setStatusFilter('pending')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                statusFilter === 'pending'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pending ({doctors.filter(d => d.status === 'pending').length})
            </button>
          </div>
        </div>
      </div>

      {/* Doctors List */}
      <div className="space-y-4">
        {filteredDoctors.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <Stethoscope className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No doctors found</p>
          </div>
        ) : (
          filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Doctor Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-semibold text-gray-800">{doctor.name}</h3>
                        {doctor.verified && (
                          <span className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                            <Check className="w-3 h-3" />
                            Verified
                          </span>
                        )}
                        <span className={`px-3 py-1 text-sm font-medium rounded ${getStatusBadge(doctor.status)}`}>
                          {doctor.status.charAt(0).toUpperCase() + doctor.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-1">{doctor.specialization}</p>
                      <p className="text-sm text-gray-500 mt-1">{doctor.qualification}</p>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-semibold">{doctor.rating}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="w-4 h-4" />
                        <span>{doctor.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span>{doctor.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{doctor.location}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Stethoscope className="w-4 h-4" />
                        <span>{doctor.experience} years experience</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{doctor.totalConsultations} consultations</span>
                      </div>
                      <div className="text-gray-600">
                        <span className="font-semibold">₹{doctor.consultationFee}</span> per consultation
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm text-gray-600">{doctor.about}</p>
                  </div>

                  <div className="mt-3">
                    <span className="text-xs text-gray-500">Languages: {doctor.languages}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex lg:flex-col gap-2 lg:w-48">
                  {doctor.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleStatusChange(doctor.id, 'active')}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <UserCheck className="w-4 h-4" />
                        <span className="text-sm font-medium">Approve</span>
                      </button>
                      <button
                        onClick={() => handleStatusChange(doctor.id, 'inactive')}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <UserX className="w-4 h-4" />
                        <span className="text-sm font-medium">Reject</span>
                      </button>
                    </>
                  )}
                  
                  {doctor.status === 'active' && (
                    <button
                      onClick={() => handleStatusChange(doctor.id, 'inactive')}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                    >
                      <UserX className="w-4 h-4" />
                      <span className="text-sm font-medium">Deactivate</span>
                    </button>
                  )}
                  
                  {doctor.status === 'inactive' && (
                    <button
                      onClick={() => handleStatusChange(doctor.id, 'active')}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <UserCheck className="w-4 h-4" />
                      <span className="text-sm font-medium">Activate</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleVerificationToggle(doctor.id)}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      doctor.verified
                        ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    <Check className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {doctor.verified ? 'Verified' : 'Verify'}
                    </span>
                  </button>

                  <button
                    onClick={() => startEdit(doctor)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span className="text-sm font-medium">Edit</span>
                  </button>

                  <button
                    onClick={() => handleDeleteDoctor(doctor.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="text-sm font-medium">Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-800">
                {editingDoctor ? 'Edit Doctor' : 'Add New Doctor'}
              </h3>
              <button
                onClick={resetForm}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <form onSubmit={editingDoctor ? handleUpdateDoctor : handleAddDoctor} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone *
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Specialization *
                  </label>
                  <input
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Experience (years) *
                  </label>
                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Qualification *
                  </label>
                  <input
                    type="text"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Registration Number *
                  </label>
                  <input
                    type="text"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Consultation Fee (₹) *
                  </label>
                  <input
                    type="number"
                    name="consultationFee"
                    value={formData.consultationFee}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Languages
                  </label>
                  <input
                    type="text"
                    name="languages"
                    value={formData.languages}
                    onChange={handleInputChange}
                    placeholder="e.g., Hindi, English, Punjabi"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    About
                  </label>
                  <textarea
                    name="about"
                    value={formData.about}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Brief description about the doctor..."
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  {editingDoctor ? 'Update Doctor' : 'Add Doctor'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorManagement;