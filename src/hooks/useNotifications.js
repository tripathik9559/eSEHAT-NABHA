// src/hooks/useNotifications.js

import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for managing notifications
 * Handles browser notifications, permission requests, and in-app notification state
 * 
 * @returns {Object} Notification utilities
 * @returns {boolean} hasPermission - Whether browser notifications are allowed
 * @returns {Function} requestPermission - Request notification permission
 * @returns {Function} showNotification - Display a notification
 * @returns {Array} notifications - List of in-app notifications
 * @returns {Function} addNotification - Add in-app notification
 * @returns {Function} removeNotification - Remove in-app notification
 * @returns {Function} clearAllNotifications - Clear all in-app notifications
 */
export const useNotifications = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // Check initial notification permission
  useEffect(() => {
    if ('Notification' in window) {
      setHasPermission(Notification.permission === 'granted');
    }
  }, []);

  /**
   * Request browser notification permission
   * @returns {Promise<boolean>} Whether permission was granted
   */
  const requestPermission = useCallback(async () => {
    if (!('Notification' in window)) {
      console.warn('This browser does not support notifications');
      return false;
    }

    if (Notification.permission === 'granted') {
      setHasPermission(true);
      return true;
    }

    if (Notification.permission !== 'denied') {
      try {
        const permission = await Notification.requestPermission();
        const granted = permission === 'granted';
        setHasPermission(granted);
        return granted;
      } catch (error) {
        console.error('Error requesting notification permission:', error);
        return false;
      }
    }

    return false;
  }, []);

  /**
   * Show a browser notification
   * @param {string} title - Notification title
   * @param {Object} options - Notification options
   * @param {string} options.body - Notification body text
   * @param {string} options.icon - Notification icon URL
   * @param {string} options.tag - Notification tag for grouping
   * @param {Function} options.onClick - Click handler
   */
  const showNotification = useCallback(async (title, options = {}) => {
    // Check if notifications are supported
    if (!('Notification' in window)) {
      console.warn('This browser does not support notifications');
      addNotification({ title, message: options.body, type: 'info' });
      return;
    }

    // Request permission if not granted
    if (Notification.permission !== 'granted') {
      const granted = await requestPermission();
      if (!granted) {
        // Fallback to in-app notification
        addNotification({ title, message: options.body, type: 'info' });
        return;
      }
    }

    try {
      // Create notification
      const notification = new Notification(title, {
        body: options.body || '',
        icon: options.icon || '/logo192.png',
        tag: options.tag || 'nabha-notification',
        badge: '/logo192.png',
        requireInteraction: false,
        ...options
      });

      // Handle click event
      if (options.onClick) {
        notification.onclick = options.onClick;
      }

      // Auto close after 5 seconds
      setTimeout(() => {
        notification.close();
      }, 5000);

    } catch (error) {
      console.error('Error showing notification:', error);
      // Fallback to in-app notification
      addNotification({ title, message: options.body, type: 'info' });
    }
  }, [requestPermission]);

  /**
   * Add an in-app notification
   * @param {Object} notification - Notification object
   * @param {string} notification.title - Notification title
   * @param {string} notification.message - Notification message
   * @param {string} notification.type - Notification type (success, error, warning, info)
   * @param {number} notification.duration - Auto-dismiss duration in ms (default: 5000)
   */
  const addNotification = useCallback((notification) => {
    const id = Date.now() + Math.random();
    const newNotification = {
      id,
      title: notification.title || '',
      message: notification.message || '',
      type: notification.type || 'info',
      timestamp: new Date(),
      duration: notification.duration || 5000
    };

    setNotifications(prev => [...prev, newNotification]);

    // Auto remove after duration
    if (newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, newNotification.duration);
    }

    return id;
  }, []);

  /**
   * Remove an in-app notification by ID
   * @param {number} id - Notification ID
   */
  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  /**
   * Clear all in-app notifications
   */
  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  return {
    hasPermission,
    requestPermission,
    showNotification,
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications
  };
};

export default useNotifications;