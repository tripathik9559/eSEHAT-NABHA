/**
 * eSEHAT Nabha - Offline Sync Service
 * Handles IndexedDB operations and background sync
 */

const DB_NAME = 'esehat_nabha_db';
const DB_VERSION = 2;

const STORES = {
  PATIENTS:      'patients',
  APPOINTMENTS:  'appointments',
  HEALTH_RECORDS:'health_records',
  SYNC_QUEUE:    'sync_queue',
  SYMPTOM_LOGS:  'symptom_logs',
  CAMPS:         'health_camps',
};

let db = null;

export const initDB = () => new Promise((resolve, reject) => {
  if (db) { resolve(db); return; }
  const req = indexedDB.open(DB_NAME, DB_VERSION);

  req.onupgradeneeded = (e) => {
    const database = e.target.result;
    Object.values(STORES).forEach(storeName => {
      if (!database.objectStoreNames.contains(storeName)) {
        const store = database.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
        if (storeName === STORES.SYNC_QUEUE) {
          store.createIndex('status', 'status', { unique: false });
          store.createIndex('timestamp', 'timestamp', { unique: false });
        }
        if (storeName === STORES.PATIENTS) {
          store.createIndex('phone', 'phone', { unique: false });
        }
      }
    });
  };

  req.onsuccess = (e) => { db = e.target.result; resolve(db); };
  req.onerror = (e) => {
    console.warn('IndexedDB unavailable, using localStorage fallback');
    resolve(null);
  };
});

export const saveOffline = async (storeName, data) => {
  try {
    const database = await initDB();
    if (!database) {
      // localStorage fallback
      const key = `esehat_${storeName}`;
      const existing = JSON.parse(localStorage.getItem(key) || '[]');
      const item = { ...data, id: data.id || `offline_${Date.now()}`, offline: true };
      localStorage.setItem(key, JSON.stringify([...existing, item]));
      return item;
    }
    return new Promise((resolve, reject) => {
      const tx = database.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const item = { ...data, id: data.id || `offline_${Date.now()}`, offline: true, savedAt: new Date().toISOString() };
      const req = store.put(item);
      req.onsuccess = () => resolve(item);
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.error('saveOffline error:', err);
    return null;
  }
};

export const getOfflineData = async (storeName) => {
  try {
    const database = await initDB();
    if (!database) {
      return JSON.parse(localStorage.getItem(`esehat_${storeName}`) || '[]');
    }
    return new Promise((resolve, reject) => {
      const tx = database.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => resolve([]);
    });
  } catch (err) {
    return [];
  }
};

export const addToSyncQueue = async (operation) => {
  const item = {
    id: `sync_${Date.now()}`,
    type: operation.type,
    payload: operation.payload,
    status: 'pending',
    timestamp: new Date().toISOString(),
    retries: 0,
  };
  await saveOffline(STORES.SYNC_QUEUE, item);
  return item;
};

export const processSyncQueue = async () => {
  const queue = await getOfflineData(STORES.SYNC_QUEUE);
  const pending = queue.filter(item => item.status === 'pending');
  let synced = 0;

  for (const item of pending) {
    try {
      // In production: await api.post('/sync', item)
      await new Promise(r => setTimeout(r, 200)); // simulate API
      synced++;
    } catch (err) {
      console.error('Sync failed for:', item.id);
    }
  }

  return { total: pending.length, synced };
};

export const getPendingSyncCount = async () => {
  const queue = await getOfflineData(STORES.SYNC_QUEUE);
  return queue.filter(item => item.status === 'pending').length;
};

export const OFFLINE_STORES = STORES;
export default { initDB, saveOffline, getOfflineData, addToSyncQueue, processSyncQueue, getPendingSyncCount };
