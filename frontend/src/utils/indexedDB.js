const DB_NAME    = 'eseheat_nabha'
const DB_VERSION = 1

let dbInstance = null

function openDB() {
  if (dbInstance) return Promise.resolve(dbInstance)
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onupgradeneeded = (e) => {
      const db = e.target.result
      if (!db.objectStoreNames.contains('records'))
        db.createObjectStore('records', { keyPath: 'id', autoIncrement: true })
      if (!db.objectStoreNames.contains('appointments'))
        db.createObjectStore('appointments', { keyPath: 'id' })
      if (!db.objectStoreNames.contains('sync_queue'))
        db.createObjectStore('sync_queue', { keyPath: 'id', autoIncrement: true })
      if (!db.objectStoreNames.contains('cache'))
        db.createObjectStore('cache', { keyPath: 'key' })
    }
    req.onsuccess  = (e) => { dbInstance = e.target.result; resolve(dbInstance) }
    req.onerror    = (e) => reject(e.target.error)
  })
}

export async function dbGet(store, key) {
  const db  = await openDB()
  return new Promise((resolve, reject) => {
    const tx  = db.transaction(store, 'readonly')
    const req = tx.objectStore(store).get(key)
    req.onsuccess = () => resolve(req.result)
    req.onerror   = () => reject(req.error)
  })
}

export async function dbPut(store, value) {
  const db  = await openDB()
  return new Promise((resolve, reject) => {
    const tx  = db.transaction(store, 'readwrite')
    const req = tx.objectStore(store).put(value)
    req.onsuccess = () => resolve(req.result)
    req.onerror   = () => reject(req.error)
  })
}

export async function dbGetAll(store) {
  const db  = await openDB()
  return new Promise((resolve, reject) => {
    const tx  = db.transaction(store, 'readonly')
    const req = tx.objectStore(store).getAll()
    req.onsuccess = () => resolve(req.result)
    req.onerror   = () => reject(req.error)
  })
}

export async function dbDelete(store, key) {
  const db  = await openDB()
  return new Promise((resolve, reject) => {
    const tx  = db.transaction(store, 'readwrite')
    const req = tx.objectStore(store).delete(key)
    req.onsuccess = () => resolve()
    req.onerror   = () => reject(req.error)
  })
}

// Cache API response for offline
export async function cacheSet(key, value) {
  await dbPut('cache', { key, value, timestamp: Date.now() })
}

export async function cacheGet(key) {
  const row = await dbGet('cache', key)
  if (!row) return null
  // Expire cache after 10 minutes
  if (Date.now() - row.timestamp > 10 * 60 * 1000) return null
  return row.value
}

// Offline sync queue
export async function enqueueSync(action) {
  await dbPut('sync_queue', { ...action, queued_at: Date.now() })
}

export async function flushSyncQueue() {
  const items = await dbGetAll('sync_queue')
  return items
}

export async function clearSyncItem(id) {
  await dbDelete('sync_queue', id)
}
