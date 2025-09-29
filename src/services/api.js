// src/services/api.js

import { mockDoctors, mockConsultations, mockAppointments } from '../data/mockData';
import { mockHealthRecords } from '../data/mockHealthRecords';
import { medicines } from '../data/medicines';

/**
 * API Service for Nabha Telemedicine
 * Provides mock API functions for prototype
 * In production, replace with actual API endpoints
 */

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';
const USE_MOCK_DATA = true; // Set to false when backend is ready

// Simulate network delay
const simulateDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Generic API request wrapper
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Fetch options
 * @returns {Promise<Object>} Response data
 */
const apiRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Request failed:', error);
    throw error;
  }
};

// ============== DOCTOR SERVICES ==============

/**
 * Get all doctors
 * @param {Object} filters - Filter options (specialization, availability, etc.)
 * @returns {Promise<Array>} List of doctors
 */
export const getDoctors = async (filters = {}) => {
  await simulateDelay();

  if (USE_MOCK_DATA) {
    let doctors = [...mockDoctors];

    // Apply filters
    if (filters.specialization) {
      doctors = doctors.filter(d => d.specialization === filters.specialization);
    }
    if (filters.language) {
      doctors = doctors.filter(d => d.languages.includes(filters.language));
    }
    if (filters.available) {
      doctors = doctors.filter(d => d.available);
    }

    return doctors;
  }

  return apiRequest('/doctors', { params: filters });
};

/**
 * Get doctor by ID
 * @param {string} id - Doctor ID
 * @returns {Promise<Object>} Doctor details
 */
export const getDoctorById = async (id) => {
  await simulateDelay();

  if (USE_MOCK_DATA) {
    const doctor = mockDoctors.find(d => d.id === id);
    if (!doctor) {
      throw new Error('Doctor not found');
    }
    return doctor;
  }

  return apiRequest(`/doctors/${id}`);
};

/**
 * Get doctor's available slots
 * @param {string} doctorId - Doctor ID
 * @param {string} date - Date string (YYYY-MM-DD)
 * @returns {Promise<Array>} Available time slots
 */
export const getDoctorSlots = async (doctorId, date) => {
  await simulateDelay();

  if (USE_MOCK_DATA) {
    // Mock available slots
    const slots = [
      '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
      '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
      '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
    ];
    return slots;
  }

  return apiRequest(`/doctors/${doctorId}/slots?date=${date}`);
};

// ============== CONSULTATION SERVICES ==============

/**
 * Book a consultation
 * @param {Object} consultationData - Consultation details
 * @returns {Promise<Object>} Booked consultation
 */
export const bookConsultation = async (consultationData) => {
  await simulateDelay();

  if (USE_MOCK_DATA) {
    const newConsultation = {
      id: `CONS${Date.now()}`,
      ...consultationData,
      status: 'scheduled',
      createdAt: new Date().toISOString()
    };
    return newConsultation;
  }

  return apiRequest('/consultations', {
    method: 'POST',
    body: JSON.stringify(consultationData)
  });
};

/**
 * Get consultation history
 * @param {string} patientId - Patient ID
 * @returns {Promise<Array>} List of consultations
 */
export const getConsultationHistory = async (patientId) => {
  await simulateDelay();

  if (USE_MOCK_DATA) {
    return mockConsultations.filter(c => c.patientId === patientId);
  }

  return apiRequest(`/consultations/patient/${patientId}`);
};

/**
 * Get consultation by ID
 * @param {string} id - Consultation ID
 * @returns {Promise<Object>} Consultation details
 */
export const getConsultationById = async (id) => {
  await simulateDelay();

  if (USE_MOCK_DATA) {
    const consultation = mockConsultations.find(c => c.id === id);
    if (!consultation) {
      throw new Error('Consultation not found');
    }
    return consultation;
  }

  return apiRequest(`/consultations/${id}`);
};

/**
 * Update consultation status
 * @param {string} id - Consultation ID
 * @param {string} status - New status
 * @returns {Promise<Object>} Updated consultation
 */
export const updateConsultationStatus = async (id, status) => {
  await simulateDelay();

  if (USE_MOCK_DATA) {
    return { id, status, updatedAt: new Date().toISOString() };
  }

  return apiRequest(`/consultations/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status })
  });
};

// ============== HEALTH RECORDS SERVICES ==============

/**
 * Get patient health records
 * @param {string} patientId - Patient ID
 * @returns {Promise<Array>} List of health records
 */
export const getHealthRecords = async (patientId) => {
  await simulateDelay();

  if (USE_MOCK_DATA) {
    return mockHealthRecords;
  }

  return apiRequest(`/health-records/patient/${patientId}`);
};

/**
 * Upload health record
 * @param {Object} recordData - Record data
 * @returns {Promise<Object>} Uploaded record
 */
export const uploadHealthRecord = async (recordData) => {
  await simulateDelay();

  if (USE_MOCK_DATA) {
    const newRecord = {
      id: `REC${Date.now()}`,
      ...recordData,
      uploadedAt: new Date().toISOString()
    };
    return newRecord;
  }

  return apiRequest('/health-records', {
    method: 'POST',
    body: JSON.stringify(recordData)
  });
};

/**
 * Delete health record
 * @param {string} id - Record ID
 * @returns {Promise<Object>} Deletion confirmation
 */
export const deleteHealthRecord = async (id) => {
  await simulateDelay();

  if (USE_MOCK_DATA) {
    return { success: true, id };
  }

  return apiRequest(`/health-records/${id}`, {
    method: 'DELETE'
  });
};

// ============== MEDICINE SERVICES ==============

/**
 * Get medicine list
 * @param {string} search - Search query
 * @returns {Promise<Array>} List of medicines
 */
export const getMedicines = async (search = '') => {
  await simulateDelay();

  if (USE_MOCK_DATA) {
    if (!search) return medicines;
    return medicines.filter(m => 
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.genericName.toLowerCase().includes(search.toLowerCase())
    );
  }

  return apiRequest(`/medicines?search=${search}`);
};

/**
 * Get medicine reminders
 * @param {string} patientId - Patient ID
 * @returns {Promise<Array>} List of medicine reminders
 */
export const getMedicineReminders = async (patientId) => {
  await simulateDelay();

  if (USE_MOCK_DATA) {
    // Return mock reminders from localStorage
    const stored = localStorage.getItem('medicineReminders');
    return stored ? JSON.parse(stored) : [];
  }

  return apiRequest(`/medicines/reminders/${patientId}`);
};

/**
 * Add medicine reminder
 * @param {Object} reminderData - Reminder details
 * @returns {Promise<Object>} Created reminder
 */
export const addMedicineReminder = async (reminderData) => {
  await simulateDelay();

  if (USE_MOCK_DATA) {
    const newReminder = {
      id: `MED${Date.now()}`,
      ...reminderData,
      createdAt: new Date().toISOString()
    };
    return newReminder;
  }

  return apiRequest('/medicines/reminders', {
    method: 'POST',
    body: JSON.stringify(reminderData)
  });
};

// ============== APPOINTMENT SERVICES ==============

/**
 * Get appointments
 * @param {string} patientId - Patient ID
 * @returns {Promise<Array>} List of appointments
 */
export const getAppointments = async (patientId) => {
  await simulateDelay();

  if (USE_MOCK_DATA) {
    return mockAppointments.filter(a => a.patientId === patientId);
  }

  return apiRequest(`/appointments/patient/${patientId}`);
};

/**
 * Cancel appointment
 * @param {string} id - Appointment ID
 * @returns {Promise<Object>} Cancellation confirmation
 */
export const cancelAppointment = async (id) => {
  await simulateDelay();

  if (USE_MOCK_DATA) {
    return { id, status: 'cancelled', cancelledAt: new Date().toISOString() };
  }

  return apiRequest(`/appointments/${id}/cancel`, {
    method: 'POST'
  });
};

// ============== SYMPTOM CHECKER SERVICES ==============

/**
 * Get AI recommendations based on symptoms
 * @param {Array} symptoms - List of symptom IDs
 * @returns {Promise<Object>} AI recommendations
 */
export const getSymptomRecommendations = async (symptoms) => {
  await simulateDelay(1000); // Longer delay to simulate AI processing

  if (USE_MOCK_DATA) {
    // Mock AI recommendations
    const severity = symptoms.length > 5 ? 'high' : symptoms.length > 2 ? 'medium' : 'low';
    
    return {
      severity,
      possibleConditions: [
        { name: 'Common Cold', probability: 75 },
        { name: 'Viral Fever', probability: 60 },
        { name: 'Seasonal Flu', probability: 45 }
      ],
      recommendations: [
        'Stay hydrated and rest',
        'Monitor temperature regularly',
        'Take over-the-counter fever medication if needed',
        'Consult a doctor if symptoms worsen'
      ],
      urgency: severity === 'high' ? 'Consult doctor immediately' : 'Monitor symptoms for 24-48 hours'
    };
  }

  return apiRequest('/symptoms/analyze', {
    method: 'POST',
    body: JSON.stringify({ symptoms })
  });
};

// ============== PHARMACY SERVICES ==============

/**
 * Find nearby pharmacies
 * @param {Object} location - User location {lat, lng}
 * @returns {Promise<Array>} List of pharmacies
 */
export const findNearbyPharmacies = async (location) => {
  await simulateDelay();

  if (USE_MOCK_DATA) {
    return [
      {
        id: 'PH001',
        name: 'Nabha Medical Store',
        address: 'Main Bazaar, Nabha, Punjab',
        phone: '+91-1765-234567',
        distance: '0.5 km',
        open: true,
        timing: '8:00 AM - 10:00 PM'
      },
      {
        id: 'PH002',
        name: 'City Pharmacy',
        address: 'Near Civil Hospital, Nabha',
        phone: '+91-1765-234568',
        distance: '1.2 km',
        open: true,
        timing: '24 Hours'
      },
      {
        id: 'PH003',
        name: 'Care Chemist',
        address: 'Bus Stand Road, Nabha',
        phone: '+91-1765-234569',
        distance: '2.0 km',
        open: false,
        timing: '9:00 AM - 9:00 PM'
      }
    ];
  }

  return apiRequest(`/pharmacies/nearby?lat=${location.lat}&lng=${location.lng}`);
};

export default {
  getDoctors,
  getDoctorById,
  getDoctorSlots,
  bookConsultation,
  getConsultationHistory,
  getConsultationById,
  updateConsultationStatus,
  getHealthRecords,
  uploadHealthRecord,
  deleteHealthRecord,
  getMedicines,
  getMedicineReminders,
  addMedicineReminder,
  getAppointments,
  cancelAppointment,
  getSymptomRecommendations,
  findNearbyPharmacies
};