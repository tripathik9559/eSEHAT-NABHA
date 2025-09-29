// src/services/localStorage.js

/**
 * LocalStorage Service for Nabha Telemedicine
 * Provides utility functions for localStorage operations
 * Handles serialization, error handling, and data management
 */

// Storage keys constants
export const STORAGE_KEYS = {
  USER_PROFILE: 'nabha_user_profile',
  HEALTH_RECORDS: 'nabha_health_records',
  MEDICINE_REMINDERS: 'nabha_medicine_reminders',
  CONSULTATION_HISTORY: 'nabha_consultation_history',
  APPOINTMENTS: 'nabha_appointments',
  SYMPTOM_HISTORY: 'nabha_symptom_history',
  OFFLINE_QUEUE: 'nabha_offline_queue',
  SETTINGS: 'nabha_settings',
  LANGUAGE: 'nabha_language',
  THEME: 'nabha_theme',
  LAST_SYNC: 'nabha_last_sync',
  CACHED_DOCTORS: 'nabha_cached_doctors',
  CACHED_MEDICINES: 'nabha_cached_medicines'
};

/**
 * Get item from localStorage
 * @param {string} key - Storage key
 * @param {*} defaultValue - Default value if key doesn't exist
 * @returns {*} Parsed value or default value
 */
export const getItem = (key, defaultValue = null) => {
  try {
    const item = window.localStorage.getItem(key);
    
    if (item === null) {
      return defaultValue;
    }
    
    return JSON.parse(item);
  } catch (error) {
    console.error(`Error getting item from localStorage (${key}):`, error);
    return defaultValue;
  }
};

/**
 * Set item in localStorage
 * @param {string} key - Storage key
 * @param {*} value - Value to store
 * @returns {boolean} Success status
 */
export const setItem = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error setting item in localStorage (${key}):`, error);
    
    // Handle quota exceeded error
    if (error.name === 'QuotaExceededError') {
      console.warn('LocalStorage quota exceeded. Attempting cleanup...');
      cleanupOldData();
      
      // Retry once after cleanup
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (retryError) {
        console.error('Failed to save after cleanup:', retryError);
        return false;
      }
    }
    
    return false;
  }
};

/**
 * Remove item from localStorage
 * @param {string} key - Storage key
 * @returns {boolean} Success status
 */
export const removeItem = (key) => {
  try {
    window.localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing item from localStorage (${key}):`, error);
    return false;
  }
};

/**
 * Clear all localStorage data
 * @returns {boolean} Success status
 */
export const clear = () => {
  try {
    window.localStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
};

/**
 * Get all keys in localStorage
 * @returns {Array<string>} List of all keys
 */
export const getAllKeys = () => {
  try {
    return Object.keys(window.localStorage);
  } catch (error) {
    console.error('Error getting localStorage keys:', error);
    return [];
  }
};

/**
 * Get storage size in bytes
 * @returns {number} Storage size
 */
export const getStorageSize = () => {
  try {
    let size = 0;
    for (let key in window.localStorage) {
      if (window.localStorage.hasOwnProperty(key)) {
        size += window.localStorage[key].length + key.length;
      }
    }
    return size;
  } catch (error) {
    console.error('Error calculating storage size:', error);
    return 0;
  }
};

/**
 * Check if localStorage is available
 * @returns {boolean} Availability status
 */
export const isAvailable = () => {
  try {
    const test = '__localStorage_test__';
    window.localStorage.setItem(test, test);
    window.localStorage.removeItem(test);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Cleanup old data from localStorage
 * Removes data older than specified days
 * @param {number} daysOld - Number of days to keep data (default: 30)
 */
export const cleanupOldData = (daysOld = 30) => {
  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);
    
    // Clean old symptom history
    const symptomHistory = getItem(STORAGE_KEYS.SYMPTOM_HISTORY, []);
    const filteredSymptoms = symptomHistory.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate > cutoffDate;
    });
    setItem(STORAGE_KEYS.SYMPTOM_HISTORY, filteredSymptoms);
    
    // Clean old offline queue items
    const offlineQueue = getItem(STORAGE_KEYS.OFFLINE_QUEUE, []);
    const filteredQueue = offlineQueue.filter(item => {
      const itemDate = new Date(item.timestamp);
      return itemDate > cutoffDate;
    });
    setItem(STORAGE_KEYS.OFFLINE_QUEUE, filteredQueue);
    
    console.log('Cleanup completed successfully');
  } catch (error) {
    console.error('Error during cleanup:', error);
  }
};

/**
 * Export all data as JSON
 * @returns {Object} All localStorage data
 */
export const exportData = () => {
  try {
    const data = {};
    for (let key in window.localStorage) {
      if (window.localStorage.hasOwnProperty(key)) {
        try {
          data[key] = JSON.parse(window.localStorage[key]);
        } catch (e) {
          data[key] = window.localStorage[key];
        }
      }
    }
    return data;
  } catch (error) {
    console.error('Error exporting data:', error);
    return {};
  }
};

/**
 * Import data from JSON
 * @param {Object} data - Data to import
 * @returns {boolean} Success status
 */
export const importData = (data) => {
  try {
    for (let key in data) {
      setItem(key, data[key]);
    }
    return true;
  } catch (error) {
    console.error('Error importing data:', error);
    return false;
  }
};

// ============== SPECIFIC DATA OPERATIONS ==============

/**
 * Save user profile
 * @param {Object} profile - User profile data
 * @returns {boolean} Success status
 */
export const saveUserProfile = (profile) => {
  return setItem(STORAGE_KEYS.USER_PROFILE, {
    ...profile,
    lastUpdated: new Date().toISOString()
  });
};

/**
 * Get user profile
 * @returns {Object|null} User profile or null
 */
export const getUserProfile = () => {
  return getItem(STORAGE_KEYS.USER_PROFILE);
};

/**
 * Add health record to storage
 * @param {Object} record - Health record data
 * @returns {boolean} Success status
 */
export const addHealthRecord = (record) => {
  const records = getItem(STORAGE_KEYS.HEALTH_RECORDS, []);
  records.unshift({
    ...record,
    id: record.id || `REC${Date.now()}`,
    savedAt: new Date().toISOString()
  });
  return setItem(STORAGE_KEYS.HEALTH_RECORDS, records);
};

/**
 * Get all health records
 * @returns {Array} List of health records
 */
export const getHealthRecords = () => {
  return getItem(STORAGE_KEYS.HEALTH_RECORDS, []);
};

/**
 * Delete health record
 * @param {string} id - Record ID
 * @returns {boolean} Success status
 */
export const deleteHealthRecord = (id) => {
  const records = getItem(STORAGE_KEYS.HEALTH_RECORDS, []);
  const filtered = records.filter(r => r.id !== id);
  return setItem(STORAGE_KEYS.HEALTH_RECORDS, filtered);
};

/**
 * Add medicine reminder
 * @param {Object} reminder - Reminder data
 * @returns {boolean} Success status
 */
export const addMedicineReminder = (reminder) => {
  const reminders = getItem(STORAGE_KEYS.MEDICINE_REMINDERS, []);
  reminders.push({
    ...reminder,
    id: reminder.id || `MED${Date.now()}`,
    createdAt: new Date().toISOString()
  });
  return setItem(STORAGE_KEYS.MEDICINE_REMINDERS, reminders);
};

/**
 * Get all medicine reminders
 * @returns {Array} List of medicine reminders
 */
export const getMedicineReminders = () => {
  return getItem(STORAGE_KEYS.MEDICINE_REMINDERS, []);
};

/**
 * Update medicine reminder
 * @param {string} id - Reminder ID
 * @param {Object} updates - Updates to apply
 * @returns {boolean} Success status
 */
export const updateMedicineReminder = (id, updates) => {
  const reminders = getItem(STORAGE_KEYS.MEDICINE_REMINDERS, []);
  const index = reminders.findIndex(r => r.id === id);
  
  if (index !== -1) {
    reminders[index] = {
      ...reminders[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    return setItem(STORAGE_KEYS.MEDICINE_REMINDERS, reminders);
  }
  
  return false;
};

/**
 * Delete medicine reminder
 * @param {string} id - Reminder ID
 * @returns {boolean} Success status
 */
export const deleteMedicineReminder = (id) => {
  const reminders = getItem(STORAGE_KEYS.MEDICINE_REMINDERS, []);
  const filtered = reminders.filter(r => r.id !== id);
  return setItem(STORAGE_KEYS.MEDICINE_REMINDERS, filtered);
};

/**
 * Add to offline queue
 * @param {Object} action - Action to queue
 * @returns {boolean} Success status
 */
export const addToOfflineQueue = (action) => {
  const queue = getItem(STORAGE_KEYS.OFFLINE_QUEUE, []);
  queue.push({
    ...action,
    timestamp: new Date().toISOString(),
    id: `QUEUE${Date.now()}`
  });
  return setItem(STORAGE_KEYS.OFFLINE_QUEUE, queue);
};

/**
 * Get offline queue
 * @returns {Array} Offline queue items
 */
export const getOfflineQueue = () => {
  return getItem(STORAGE_KEYS.OFFLINE_QUEUE, []);
};

/**
 * Clear offline queue
 * @returns {boolean} Success status
 */
export const clearOfflineQueue = () => {
  return setItem(STORAGE_KEYS.OFFLINE_QUEUE, []);
};

/**
 * Update last sync timestamp
 * @returns {boolean} Success status
 */
export const updateLastSync = () => {
  return setItem(STORAGE_KEYS.LAST_SYNC, new Date().toISOString());
};

/**
 * Get last sync timestamp
 * @returns {string|null} Last sync timestamp
 */
export const getLastSync = () => {
  return getItem(STORAGE_KEYS.LAST_SYNC);
};

export default {
  STORAGE_KEYS,
  getItem,
  setItem,
  removeItem,
  clear,
  getAllKeys,
  getStorageSize,
  isAvailable,
  cleanupOldData,
  exportData,
  importData,
  saveUserProfile,
  getUserProfile,
  addHealthRecord,
  getHealthRecords,
  deleteHealthRecord,
  addMedicineReminder,
  getMedicineReminders,
  updateMedicineReminder,
  deleteMedicineReminder,
  addToOfflineQueue,
  getOfflineQueue,
  clearOfflineQueue,
  updateLastSync,
  getLastSync
};