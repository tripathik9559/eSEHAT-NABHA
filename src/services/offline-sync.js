// src/services/offline-sync.js

/**
 * Offline Sync Service for Nabha Telemedicine
 * Handles data synchronization when app goes offline/online
 * Manages offline queue and syncs data when connection is restored
 */

import { 
  getItem, 
  setItem, 
  addToOfflineQueue, 
  getOfflineQueue, 
  clearOfflineQueue,
  updateLastSync,
  getLastSync,
  STORAGE_KEYS 
} from './localStorage';

// Sync status constants
export const SYNC_STATUS = {
  IDLE: 'idle',
  SYNCING: 'syncing',
  SUCCESS: 'success',
  ERROR: 'error',
  OFFLINE: 'offline'
};

// Action types for offline queue
export const ACTION_TYPES = {
  BOOK_CONSULTATION: 'book_consultation',
  UPLOAD_HEALTH_RECORD: 'upload_health_record',
  ADD_MEDICINE_REMINDER: 'add_medicine_reminder',
  UPDATE_PROFILE: 'update_profile',
  CANCEL_APPOINTMENT: 'cancel_appointment',
  SUBMIT_SYMPTOMS: 'submit_symptoms',
  SEND_MESSAGE: 'send_message'
};

let syncStatus = SYNC_STATUS.IDLE;
let syncCallbacks = [];

/**
 * Get current sync status
 * @returns {string} Current sync status
 */
export const getSyncStatus = () => syncStatus;

/**
 * Set sync status and notify listeners
 * @param {string} status - New sync status
 */
const setSyncStatus = (status) => {
  syncStatus = status;
  syncCallbacks.forEach(callback => callback(status));
};

/**
 * Subscribe to sync status changes
 * @param {Function} callback - Callback function
 * @returns {Function} Unsubscribe function
 */
export const subscribeSyncStatus = (callback) => {
  syncCallbacks.push(callback);
  return () => {
    syncCallbacks = syncCallbacks.filter(cb => cb !== callback);
  };
};

/**
 * Check if device is online
 * @returns {boolean} Online status
 */
export const isOnline = () => {
  return navigator.onLine;
};

/**
 * Queue an action for offline sync
 * @param {string} type - Action type
 * @param {Object} data - Action data
 * @param {string} endpoint - API endpoint for sync
 * @returns {boolean} Success status
 */
export const queueAction = (type, data, endpoint) => {
  try {
    const action = {
      id: `ACTION${Date.now()}${Math.random()}`,
      type,
      data,
      endpoint,
      timestamp: new Date().toISOString(),
      attempts: 0,
      maxAttempts: 3,
      status: 'pending'
    };

    addToOfflineQueue(action);
    console.log('Action queued for offline sync:', type);
    return true;
  } catch (error) {
    console.error('Error queueing action:', error);
    return false;
  }
};

/**
 * Process a single queued action
 * @param {Object} action - Action to process
 * @returns {Promise<Object>} Result of processing
 */
const processAction = async (action) => {
  try {
    action.attempts += 1;

    // Simulate API call (replace with actual API calls in production)
    console.log(`Processing action: ${action.type}`, action.data);

    // Based on action type, call appropriate API
    switch (action.type) {
      case ACTION_TYPES.BOOK_CONSULTATION:
        // await api.bookConsultation(action.data);
        break;
      case ACTION_TYPES.UPLOAD_HEALTH_RECORD:
        // await api.uploadHealthRecord(action.data);
        break;
      case ACTION_TYPES.ADD_MEDICINE_REMINDER:
        // await api.addMedicineReminder(action.data);
        break;
      case ACTION_TYPES.UPDATE_PROFILE:
        // await api.updateProfile(action.data);
        break;
      case ACTION_TYPES.CANCEL_APPOINTMENT:
        // await api.cancelAppointment(action.data.id);
        break;
      case ACTION_TYPES.SUBMIT_SYMPTOMS:
        // await api.submitSymptoms(action.data);
        break;
      case ACTION_TYPES.SEND_MESSAGE:
        // await api.sendMessage(action.data);
        break;
      default:
        console.warn('Unknown action type:', action.type);
    }

    return {
      success: true,
      action
    };
  } catch (error) {
    console.error('Error processing action:', error);
    
    // Check if max attempts reached
    if (action.attempts >= action.maxAttempts) {
      return {
        success: false,
        action,
        error: 'Max attempts reached',
        shouldRetry: false
      };
    }

    return {
      success: false,
      action,
      error: error.message,
      shouldRetry: true
    };
  }
};

/**
 * Sync all queued actions
 * @returns {Promise<Object>} Sync results
 */
export const syncQueuedActions = async () => {
  if (!isOnline()) {
    console.warn('Cannot sync: Device is offline');
    setSyncStatus(SYNC_STATUS.OFFLINE);
    return {
      success: false,
      message: 'Device is offline'
    };
  }

  if (syncStatus === SYNC_STATUS.SYNCING) {
    console.warn('Sync already in progress');
    return {
      success: false,
      message: 'Sync already in progress'
    };
  }

  setSyncStatus(SYNC_STATUS.SYNCING);

  try {
    const queue = getOfflineQueue();

    if (queue.length === 0) {
      console.log('No actions to sync');
      setSyncStatus(SYNC_STATUS.SUCCESS);
      updateLastSync();
      return {
        success: true,
        message: 'No actions to sync',
        synced: 0,
        failed: 0
      };
    }

    console.log(`Starting sync of ${queue.length} actions`);

    const results = [];
    const failedActions = [];

    // Process each action
    for (const action of queue) {
      const result = await processAction(action);
      results.push(result);

      if (!result.success && result.shouldRetry) {
        failedActions.push(action);
      }
    }

    // Update queue with failed actions only
    setItem(STORAGE_KEYS.OFFLINE_QUEUE, failedActions);

    // Update sync status
    const successCount = results.filter(r => r.success).length;
    const failedCount = results.filter(r => !r.success).length;

    if (failedCount === 0) {
      setSyncStatus(SYNC_STATUS.SUCCESS);
      updateLastSync();
    } else {
      setSyncStatus(SYNC_STATUS.ERROR);
    }

    console.log(`Sync completed: ${successCount} success, ${failedCount} failed`);

    return {
      success: failedCount === 0,
      message: `Synced ${successCount} actions, ${failedCount} failed`,
      synced: successCount,
      failed: failedCount,
      results
    };
  } catch (error) {
    console.error('Error during sync:', error);
    setSyncStatus(SYNC_STATUS.ERROR);
    return {
      success: false,
      message: error.message,
      error
    };
  }
};

/**
 * Auto sync when device comes online
 */
export const enableAutoSync = () => {
  window.addEventListener('online', async () => {
    console.log('Device is online - starting auto sync');
    await syncQueuedActions();
  });

  window.addEventListener('offline', () => {
    console.log('Device is offline');
    setSyncStatus(SYNC_STATUS.OFFLINE);
  });
};

/**
 * Disable auto sync
 */
export const disableAutoSync = () => {
  window.removeEventListener('online', syncQueuedActions);
  window.removeEventListener('offline', () => {});
};

/**
 * Get pending sync count
 * @returns {number} Number of pending actions
 */
export const getPendingSyncCount = () => {
  const queue = getOfflineQueue();
  return queue.length;
};

/**
 * Clear failed actions from queue
 * @returns {boolean} Success status
 */
export const clearFailedActions = () => {
  try {
    clearOfflineQueue();
    return true;
  } catch (error) {
    console.error('Error clearing failed actions:', error);
    return false;
  }
};

/**
 * Get last sync information
 * @returns {Object} Last sync info
 */
export const getLastSyncInfo = () => {
  const lastSync = getLastSync();
  const pendingCount = getPendingSyncCount();

  if (!lastSync) {
    return {
      lastSync: null,
      pendingCount,
      status: syncStatus,
      message: 'Never synced'
    };
  }

  const lastSyncDate = new Date(lastSync);
  const now = new Date();
  const diffMs = now - lastSyncDate;
  const diffMins = Math.floor(diffMs / 60000);

  let timeAgo;
  if (diffMins < 1) {
    timeAgo = 'Just now';
  } else if (diffMins < 60) {
    timeAgo = `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  } else {
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) {
      timeAgo = `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else {
      const diffDays = Math.floor(diffHours / 24);
      timeAgo = `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    }
  }

  return {
    lastSync,
    lastSyncDate,
    timeAgo,
    pendingCount,
    status: syncStatus,
    message: pendingCount > 0 
      ? `${pendingCount} action${pendingCount > 1 ? 's' : ''} pending` 
      : 'All synced'
  };
};

/**
 * Retry failed sync
 * @returns {Promise<Object>} Sync results
 */
export const retrySync = async () => {
  console.log('Retrying sync...');
  return await syncQueuedActions();
};

/**
 * Cache data for offline use
 * @param {string} key - Cache key
 * @param {*} data - Data to cache
 * @returns {boolean} Success status
 */
export const cacheData = (key, data) => {
  try {
    const cacheKey = `cache_${key}`;
    setItem(cacheKey, {
      data,
      cachedAt: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.error('Error caching data:', error);
    return false;
  }
};

/**
 * Get cached data
 * @param {string} key - Cache key
 * @param {number} maxAgeMs - Maximum age in milliseconds
 * @returns {*} Cached data or null
 */
export const getCachedData = (key, maxAgeMs = 3600000) => {
  try {
    const cacheKey = `cache_${key}`;
    const cached = getItem(cacheKey);

    if (!cached) {
      return null;
    }

    const cachedAt = new Date(cached.cachedAt);
    const now = new Date();
    const age = now - cachedAt;

    if (age > maxAgeMs) {
      console.log('Cache expired for:', key);
      return null;
    }

    return cached.data;
  } catch (error) {
    console.error('Error getting cached data:', error);
    return null;
  }
};

/**
 * Clear all cached data
 * @returns {boolean} Success status
 */
export const clearCache = () => {
  try {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('cache_')) {
        localStorage.removeItem(key);
      }
    });
    return true;
  } catch (error) {
    console.error('Error clearing cache:', error);
    return false;
  }
};

/**
 * Initialize offline sync service
 */
export const initializeOfflineSync = () => {
  // Enable auto sync
  enableAutoSync();

  // Set initial status
  if (isOnline()) {
    setSyncStatus(SYNC_STATUS.IDLE);
  } else {
    setSyncStatus(SYNC_STATUS.OFFLINE);
  }

  // Try to sync if there are pending actions
  if (isOnline() && getPendingSyncCount() > 0) {
    syncQueuedActions();
  }

  console.log('Offline sync service initialized');
};

export default {
  SYNC_STATUS,
  ACTION_TYPES,
  getSyncStatus,
  subscribeSyncStatus,
  isOnline,
  queueAction,
  syncQueuedActions,
  enableAutoSync,
  disableAutoSync,
  getPendingSyncCount,
  clearFailedActions,
  getLastSyncInfo,
  retrySync,
  cacheData,
  getCachedData,
  clearCache,
  initializeOfflineSync
};