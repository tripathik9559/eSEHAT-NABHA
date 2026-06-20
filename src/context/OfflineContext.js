import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const OfflineContext = createContext();

export const useOffline = () => {
  const ctx = useContext(OfflineContext);
  if (!ctx) throw new Error('useOffline must be used within OfflineProvider');
  return ctx;
};

export const OfflineProvider = ({ children }) => {
  const [isOnline, setIsOnline]       = useState(navigator.onLine);
  const [syncQueue, setSyncQueue]     = useState([]);
  const [offlineData, setOfflineData] = useState({});
  const [isSyncing, setIsSyncing]     = useState(false);
  const [lastSynced, setLastSynced]   = useState(null);

  const syncData = useCallback(async () => {
    if (!isOnline || syncQueue.length === 0 || isSyncing) return;
    setIsSyncing(true);
    try {
      // In production: await api.post('/sync/batch', syncQueue);
      await new Promise(r => setTimeout(r, 1000));
      setSyncQueue([]);
      setLastSynced(new Date().toISOString());
    } catch (err) {
      console.error('Sync failed:', err);
    } finally {
      setIsSyncing(false);
    }
  }, [isOnline, syncQueue, isSyncing]);

  useEffect(() => {
    const handleOnline  = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online',  handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online',  handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (isOnline && syncQueue.length > 0) {
      syncData();
    }
  }, [isOnline, syncQueue.length, syncData]);

  const loadOfflineData = useCallback(() => {
    try {
      const saved = localStorage.getItem('esehat_offlineData');
      if (saved) setOfflineData(JSON.parse(saved));
    } catch (e) {
      console.warn('Could not load offline data', e);
    }
  }, []);

  const saveOfflineData = useCallback((key, data) => {
    try {
      const updated = { ...offlineData, [key]: data };
      setOfflineData(updated);
      localStorage.setItem('esehat_offlineData', JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not save offline data', e);
    }
  }, [offlineData]);

  const addToSyncQueue = useCallback((item) => {
    setSyncQueue(prev => [...prev, { ...item, queuedAt: new Date().toISOString(), id: `sync_${Date.now()}` }]);
  }, []);

  useEffect(() => { loadOfflineData(); }, [loadOfflineData]);

  return (
    <OfflineContext.Provider value={{
      isOnline, syncQueue, offlineData, isSyncing, lastSynced,
      syncData, saveOfflineData, addToSyncQueue,
      pendingCount: syncQueue.length,
    }}>
      {children}
    </OfflineContext.Provider>
  );
};

export default OfflineContext;
