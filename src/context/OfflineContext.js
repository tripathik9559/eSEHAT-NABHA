// Location: src/context/OfflineContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * OfflineContext
 * Manages offline functionality and data synchronization
 * Handles offline detection, data queuing, and sync operations
 */

const OfflineContext = createContext();

export const useOffline = () => {
  const context = useContext(OfflineContext);
  if (!context) {
    throw new Error('useOffline must be used within an OfflineProvider');
  }
  return context;
};

export const OfflineProvider = ({ children }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [syncQueue, setSyncQueue] = useState([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(null);
  const [offlineData, setOfflineData] = useState({
    appointments: [],
    healthRecords: [],
    medicines: [],
    consultations: []
  });

  // Initialize offline context
  useEffect(() => {
    loadOfflineData();
    loadSyncQueue();
    
    // Set up online/offline event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Auto-sync when coming back online
  useEffect(() => {
    if (isOnline && syncQueue.length > 0) {
      syncData();
    }
  }, [isOnline]);

  const loadOfflineData = () => {
    try {
      const saved = localStorage.getItem('offlineData');
      if (saved) {
        setOfflineData(JSON.parse(saved));
      }
      
      const lastSync = localStorage.getItem('lastSyncTime');
      if (lastSync) {
        setLastSyncTime(new Date(lastSync));
      }
    } catch (error) {
      console.error('Error loading offline data:', error);
    }
  };

  const loadSyncQueue = () => {
    try {
      const saved = localStorage.getItem('syncQueue');
      if (saved) {
        setSyncQueue(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading sync queue:', error);
    }
  };

  const saveOfflineData = (data) => {
    try {
      localStorage.setItem('offlineData', JSON.stringify(data));
      setOfflineData(data);
    } catch (error) {
      console.error('Error saving offline data:', error);
    }
  };

  const saveSyncQueue = (queue) => {
    try {
      localStorage.setItem('syncQueue', JSON.stringify(queue));
      setSyncQueue(queue);
    } catch (error) {
      console.error('Error saving sync queue:', error);
    }
  };

  const handleOnline = () => {
    console.log('Connection restored - Online');
    setIsOnline(true);
  };

  const handleOffline = () => {
    console.log('Connection lost - Offline');
    setIsOnline(false);
  };

  // Add operation to sync queue
  const addToSyncQueue = (operation) => {
    const queueItem = {
      id: Date.now(),
      operation,
      timestamp: new Date().toISOString(),
      retryCount: 0,
      status: 'pending'
    };

    const updatedQueue = [...syncQueue, queueItem];
    saveSyncQueue(updatedQueue);
    
    return queueItem.id;
  };

  // Remove operation from sync queue
  const removeFromSyncQueue = (operationId) => {
    const updatedQueue = syncQueue.filter(item => item.id !== operationId);
    saveSyncQueue(updatedQueue);
  };

  // Sync all pending operations
  const syncData = async () => {
    if (isSyncing || !isOnline || syncQueue.length === 0) {
      return;
    }

    setIsSyncing(true);

    try {
      console.log(`Starting sync of ${syncQueue.length} operations...`);
      
      for (const item of syncQueue) {
        try {
          // Simulate API call for each operation
          await processSyncOperation(item);
          
          // Remove successfully synced item
          removeFromSyncQueue(item.id);
          
        } catch (error) {
          console.error(`Failed to sync operation ${item.id}:`, error);
          
          // Update retry count
          const updatedQueue = syncQueue.map(qItem =>
            qItem.id === item.id
              ? { ...qItem, retryCount: qItem.retryCount + 1, status: 'failed' }
              : qItem
          );
          saveSyncQueue(updatedQueue);
        }
      }

      // Update last sync time
      const now = new Date();
      setLastSyncTime(now);
      localStorage.setItem('lastSyncTime', now.toISOString());
      
      console.log('Sync completed successfully');
      
    } catch (error) {
      console.error('Sync failed:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  // Process individual sync operation
  const processSyncOperation = async (item) => {
    return new Promise((resolve) => {
      // Simulate API call with delay
      setTimeout(() => {
        console.log('Synced operation:', item.operation.type);
        resolve();
      }, 500);
    });
  };

  // Save data for offline use
  const saveForOffline = (dataType, data) => {
    const updatedData = {
      ...offlineData,
      [dataType]: data
    };
    saveOfflineData(updatedData);
  };

  // Get offline data by type
  const getOfflineData = (dataType) => {
    return offlineData[dataType] || [];
  };

  // Cache appointment for offline access
  const cacheAppointment = (appointment) => {
    const appointments = [...offlineData.appointments];
    const existingIndex = appointments.findIndex(apt => apt.id === appointment.id);
    
    if (existingIndex >= 0) {
      appointments[existingIndex] = appointment;
    } else {
      appointments.push(appointment);
    }
    
    saveForOffline('appointments', appointments);
  };

  // Cache health record for offline access
  const cacheHealthRecord = (record) => {
    const records = [...offlineData.healthRecords];
    const existingIndex = records.findIndex(rec => rec.id === record.id);
    
    if (existingIndex >= 0) {
      records[existingIndex] = record;
    } else {
      records.push(record);
    }
    
    saveForOffline('healthRecords', records);
  };

  // Cache medicine for offline access
  const cacheMedicine = (medicine) => {
    const medicines = [...offlineData.medicines];
    const existingIndex = medicines.findIndex(med => med.id === medicine.id);
    
    if (existingIndex >= 0) {
      medicines[existingIndex] = medicine;
    } else {
      medicines.push(medicine);
    }
    
    saveForOffline('medicines', medicines);
  };

  // Cache consultation for offline access
  const cacheConsultation = (consultation) => {
    const consultations = [...offlineData.consultations];
    const existingIndex = consultations.findIndex(con => con.id === consultation.id);
    
    if (existingIndex >= 0) {
      consultations[existingIndex] = consultation;
    } else {
      consultations.push(consultation);
    }
    
    saveForOffline('consultations', consultations);
  };

  // Create appointment offline
  const createAppointmentOffline = (appointmentData) => {
    const appointment = {
      ...appointmentData,
      id: `offline_${Date.now()}`,
      offline: true,
      createdAt: new Date().toISOString()
    };

    cacheAppointment(appointment);
    
    addToSyncQueue({
      type: 'CREATE_APPOINTMENT',
      data: appointment
    });

    return appointment;
  };

  // Update appointment offline
  const updateAppointmentOffline = (appointmentId, updates) => {
    const appointments = [...offlineData.appointments];
    const index = appointments.findIndex(apt => apt.id === appointmentId);
    
    if (index >= 0) {
      appointments[index] = { ...appointments[index], ...updates };
      saveForOffline('appointments', appointments);
      
      addToSyncQueue({
        type: 'UPDATE_APPOINTMENT',
        data: { id: appointmentId, updates }
      });
    }
  };

  // Add health record offline
  const addHealthRecordOffline = (recordData) => {
    const record = {
      ...recordData,
      id: `offline_${Date.now()}`,
      offline: true,
      createdAt: new Date().toISOString()
    };

    cacheHealthRecord(record);
    
    addToSyncQueue({
      type: 'CREATE_HEALTH_RECORD',
      data: record
    });

    return record;
  };

  // Add medicine reminder offline
  const addMedicineOffline = (medicineData) => {
    const medicine = {
      ...medicineData,
      id: `offline_${Date.now()}`,
      offline: true,
      createdAt: new Date().toISOString()
    };

    cacheMedicine(medicine);
    
    addToSyncQueue({
      type: 'CREATE_MEDICINE',
      data: medicine
    });

    return medicine;
  };

  // Clear all offline data
  const clearOfflineData = () => {
    const emptyData = {
      appointments: [],
      healthRecords: [],
      medicines: [],
      consultations: []
    };
    saveOfflineData(emptyData);
  };

  // Clear sync queue
  const clearSyncQueue = () => {
    saveSyncQueue([]);
  };

  // Get sync status
  const getSyncStatus = () => {
    const pending = syncQueue.filter(item => item.status === 'pending').length;
    const failed = syncQueue.filter(item => item.status === 'failed').length;
    
    return {
      total: syncQueue.length,
      pending,
      failed,
      isSyncing,
      lastSyncTime
    };
  };

  // Check if data needs sync
  const needsSync = () => {
    return syncQueue.length > 0;
  };

  // Get time since last sync
  const getTimeSinceLastSync = () => {
    if (!lastSyncTime) return null;
    
    const now = new Date();
    const diffMs = now - lastSyncTime;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minutes ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hours ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} days ago`;
  };

  // Retry failed sync operations
  const retryFailedSync = async () => {
    const failedItems = syncQueue.filter(item => item.status === 'failed');
    
    if (failedItems.length === 0) return;
    
    // Reset status to pending
    const updatedQueue = syncQueue.map(item =>
      item.status === 'failed' ? { ...item, status: 'pending' } : item
    );
    saveSyncQueue(updatedQueue);
    
    // Trigger sync
    await syncData();
  };

  // Download data for offline use
  const downloadForOffline = async (dataTypes = ['appointments', 'healthRecords', 'medicines']) => {
    try {
      // Simulate downloading data
      console.log('Downloading data for offline use...');
      
      // In a real app, this would fetch from API
      const mockData = {
        appointments: JSON.parse(localStorage.getItem('appointments') || '[]'),
        healthRecords: JSON.parse(localStorage.getItem('healthRecords') || '[]'),
        medicines: JSON.parse(localStorage.getItem('medicineReminders') || '[]')
      };

      dataTypes.forEach(type => {
        if (mockData[type]) {
          saveForOffline(type, mockData[type]);
        }
      });

      console.log('Data downloaded for offline use');
      return true;
    } catch (error) {
      console.error('Error downloading offline data:', error);
      return false;
    }
  };

  const value = {
    // Connection state
    isOnline,
    
    // Sync state
    syncQueue,
    isSyncing,
    lastSyncTime,
    
    // Offline data
    offlineData,
    
    // Sync operations
    syncData,
    addToSyncQueue,
    removeFromSyncQueue,
    clearSyncQueue,
    retryFailedSync,
    
    // Data operations
    saveForOffline,
    getOfflineData,
    clearOfflineData,
    downloadForOffline,
    
    // Cache operations
    cacheAppointment,
    cacheHealthRecord,
    cacheMedicine,
    cacheConsultation,
    
    // Offline CRUD operations
    createAppointmentOffline,
    updateAppointmentOffline,
    addHealthRecordOffline,
    addMedicineOffline,
    
    // Status and utilities
    getSyncStatus,
    needsSync,
    getTimeSinceLastSync
  };

  return (
    <OfflineContext.Provider value={value}>
      {children}
    </OfflineContext.Provider>
  );
};

export default OfflineContext;