// src/services/notifications.js

/**
 * Notifications Service for Nabha Telemedicine
 * Handles scheduling, sending, and managing notifications
 * Supports browser notifications and in-app alerts
 */

import { getItem, setItem, STORAGE_KEYS } from './localStorage';

// Notification types
export const NOTIFICATION_TYPES = {
  MEDICINE_REMINDER: 'medicine_reminder',
  APPOINTMENT_REMINDER: 'appointment_reminder',
  HEALTH_CHECKUP: 'health_checkup',
  CONSULTATION_READY: 'consultation_ready',
  PRESCRIPTION_REFILL: 'prescription_refill',
  GENERAL: 'general'
};

// Notification priorities
export const NOTIFICATION_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent'
};

/**
 * Request notification permission from browser
 * @returns {Promise<boolean>} Permission granted status
 */
export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    console.warn('This browser does not support notifications');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
};

/**
 * Check if notifications are enabled
 * @returns {boolean} Notification permission status
 */
export const areNotificationsEnabled = () => {
  if (!('Notification' in window)) {
    return false;
  }
  return Notification.permission === 'granted';
};

/**
 * Show a browser notification
 * @param {Object} options - Notification options
 * @param {string} options.title - Notification title
 * @param {string} options.body - Notification body
 * @param {string} options.icon - Icon URL
 * @param {string} options.tag - Notification tag
 * @param {Object} options.data - Additional data
 * @param {Function} options.onClick - Click handler
 * @returns {Notification|null} Notification instance or null
 */
export const showNotification = (options) => {
  if (!areNotificationsEnabled()) {
    console.warn('Notifications are not enabled');
    return null;
  }

  try {
    const notification = new Notification(options.title, {
      body: options.body || '',
      icon: options.icon || '/logo192.png',
      badge: '/logo192.png',
      tag: options.tag || 'nabha-notification',
      requireInteraction: options.requireInteraction || false,
      silent: options.silent || false,
      data: options.data || {},
      ...options
    });

    // Handle click event
    if (options.onClick) {
      notification.onclick = (event) => {
        event.preventDefault();
        window.focus();
        notification.close();
        options.onClick(event);
      };
    }

    // Auto close after duration (default: 5 seconds)
    const duration = options.duration || 5000;
    if (duration > 0) {
      setTimeout(() => {
        notification.close();
      }, duration);
    }

    return notification;
  } catch (error) {
    console.error('Error showing notification:', error);
    return null;
  }
};

/**
 * Schedule a medicine reminder notification
 * @param {Object} reminder - Reminder details
 * @param {string} reminder.medicineName - Medicine name
 * @param {string} reminder.dosage - Dosage information
 * @param {string} reminder.time - Time to take medicine
 * @param {Date} reminder.scheduleTime - When to show notification
 * @returns {number|null} Timeout ID or null
 */
export const scheduleMedicineReminder = (reminder) => {
  const now = new Date();
  const scheduleTime = new Date(reminder.scheduleTime);
  const delay = scheduleTime - now;

  if (delay < 0) {
    console.warn('Cannot schedule notification in the past');
    return null;
  }

  const timeoutId = setTimeout(() => {
    showNotification({
      title: `💊 Medicine Reminder`,
      body: `Time to take ${reminder.medicineName} - ${reminder.dosage}`,
      icon: '/logo192.png',
      tag: `medicine-${reminder.id}`,
      requireInteraction: true,
      data: {
        type: NOTIFICATION_TYPES.MEDICINE_REMINDER,
        reminderId: reminder.id
      },
      onClick: () => {
        // Navigate to medicine tracker
        window.location.href = '/medicine-tracker';
      }
    });

    // Log the reminder
    logNotification({
      type: NOTIFICATION_TYPES.MEDICINE_REMINDER,
      title: 'Medicine Reminder',
      message: `${reminder.medicineName} - ${reminder.dosage}`,
      timestamp: new Date().toISOString(),
      reminderId: reminder.id
    });
  }, delay);

  // Store timeout ID for cancellation
  storeScheduledNotification({
    id: `med-${reminder.id}`,
    timeoutId,
    type: NOTIFICATION_TYPES.MEDICINE_REMINDER,
    scheduleTime: scheduleTime.toISOString(),
    data: reminder
  });

  return timeoutId;
};

/**
 * Schedule an appointment reminder notification
 * @param {Object} appointment - Appointment details
 * @param {number} minutesBefore - Minutes before appointment to remind (default: 30)
 * @returns {number|null} Timeout ID or null
 */
export const scheduleAppointmentReminder = (appointment, minutesBefore = 30) => {
  const appointmentTime = new Date(appointment.date + ' ' + appointment.time);
  const reminderTime = new Date(appointmentTime.getTime() - (minutesBefore * 60 * 1000));
  const now = new Date();
  const delay = reminderTime - now;

  if (delay < 0) {
    console.warn('Cannot schedule notification in the past');
    return null;
  }

  const timeoutId = setTimeout(() => {
    showNotification({
      title: `📅 Appointment Reminder`,
      body: `Your appointment with Dr. ${appointment.doctorName} is in ${minutesBefore} minutes`,
      icon: '/logo192.png',
      tag: `appointment-${appointment.id}`,
      requireInteraction: true,
      data: {
        type: NOTIFICATION_TYPES.APPOINTMENT_REMINDER,
        appointmentId: appointment.id
      },
      onClick: () => {
        // Navigate to consultation
        window.location.href = `/consultation/${appointment.id}`;
      }
    });

    // Log the reminder
    logNotification({
      type: NOTIFICATION_TYPES.APPOINTMENT_REMINDER,
      title: 'Appointment Reminder',
      message: `Appointment with Dr. ${appointment.doctorName}`,
      timestamp: new Date().toISOString(),
      appointmentId: appointment.id
    });
  }, delay);

  // Store timeout ID for cancellation
  storeScheduledNotification({
    id: `apt-${appointment.id}`,
    timeoutId,
    type: NOTIFICATION_TYPES.APPOINTMENT_REMINDER,
    scheduleTime: reminderTime.toISOString(),
    data: appointment
  });

  return timeoutId;
};

/**
 * Schedule a health checkup reminder
 * @param {Object} checkup - Checkup details
 * @returns {number|null} Timeout ID or null
 */
export const scheduleHealthCheckupReminder = (checkup) => {
  const checkupDate = new Date(checkup.dueDate);
  const reminderDate = new Date(checkupDate.getTime() - (24 * 60 * 60 * 1000)); // 1 day before
  const now = new Date();
  const delay = reminderDate - now;

  if (delay < 0) {
    console.warn('Cannot schedule notification in the past');
    return null;
  }

  const timeoutId = setTimeout(() => {
    showNotification({
      title: `🏥 Health Checkup Reminder`,
      body: `Your ${checkup.type} is due tomorrow. Please schedule an appointment.`,
      icon: '/logo192.png',
      tag: `checkup-${checkup.id}`,
      requireInteraction: true,
      data: {
        type: NOTIFICATION_TYPES.HEALTH_CHECKUP,
        checkupId: checkup.id
      },
      onClick: () => {
        // Navigate to doctors list
        window.location.href = '/doctors';
      }
    });

    // Log the reminder
    logNotification({
      type: NOTIFICATION_TYPES.HEALTH_CHECKUP,
      title: 'Health Checkup Reminder',
      message: `${checkup.type} checkup due`,
      timestamp: new Date().toISOString(),
      checkupId: checkup.id
    });
  }, delay);

  // Store timeout ID for cancellation
  storeScheduledNotification({
    id: `checkup-${checkup.id}`,
    timeoutId,
    type: NOTIFICATION_TYPES.HEALTH_CHECKUP,
    scheduleTime: reminderDate.toISOString(),
    data: checkup
  });

  return timeoutId;
};

/**
 * Cancel a scheduled notification
 * @param {string} notificationId - Notification ID
 * @returns {boolean} Success status
 */
export const cancelScheduledNotification = (notificationId) => {
  try {
    const scheduled = getScheduledNotifications();
    const notification = scheduled.find(n => n.id === notificationId);

    if (notification && notification.timeoutId) {
      clearTimeout(notification.timeoutId);
      
      // Remove from storage
      const updated = scheduled.filter(n => n.id !== notificationId);
      setItem('scheduled_notifications', updated);
      
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error canceling notification:', error);
    return false;
  }
};

/**
 * Store a scheduled notification
 * @param {Object} notification - Notification details
 */
const storeScheduledNotification = (notification) => {
  try {
    const scheduled = getScheduledNotifications();
    // Don't store timeoutId as it can't be serialized
    const { timeoutId, ...notificationData } = notification;
    scheduled.push(notificationData);
    setItem('scheduled_notifications', scheduled);
  } catch (error) {
    console.error('Error storing scheduled notification:', error);
  }
};

/**
 * Get all scheduled notifications
 * @returns {Array} List of scheduled notifications
 */
export const getScheduledNotifications = () => {
  return getItem('scheduled_notifications', []);
};

/**
 * Clear all scheduled notifications
 * @returns {boolean} Success status
 */
export const clearAllScheduledNotifications = () => {
  try {
    const scheduled = getScheduledNotifications();
    
    // Clear all timeouts
    scheduled.forEach(notification => {
      if (notification.timeoutId) {
        clearTimeout(notification.timeoutId);
      }
    });

    setItem('scheduled_notifications', []);
    return true;
  } catch (error) {
    console.error('Error clearing scheduled notifications:', error);
    return false;
  }
};

/**
 * Log a notification to history
 * @param {Object} notification - Notification details
 */
const logNotification = (notification) => {
  try {
    const history = getNotificationHistory();
    history.unshift({
      ...notification,
      id: `LOG${Date.now()}`,
      read: false
    });

    // Keep only last 50 notifications
    if (history.length > 50) {
      history.splice(50);
    }

    setItem('notification_history', history);
  } catch (error) {
    console.error('Error logging notification:', error);
  }
};

/**
 * Get notification history
 * @returns {Array} List of past notifications
 */
export const getNotificationHistory = () => {
  return getItem('notification_history', []);
};

/**
 * Mark notification as read
 * @param {string} notificationId - Notification ID
 * @returns {boolean} Success status
 */
export const markNotificationAsRead = (notificationId) => {
  try {
    const history = getNotificationHistory();
    const notification = history.find(n => n.id === notificationId);

    if (notification) {
      notification.read = true;
      setItem('notification_history', history);
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error marking notification as read:', error);
    return false;
  }
};

/**
 * Get unread notification count
 * @returns {number} Count of unread notifications
 */
export const getUnreadCount = () => {
  const history = getNotificationHistory();
  return history.filter(n => !n.read).length;
};

/**
 * Clear notification history
 * @returns {boolean} Success status
 */
export const clearNotificationHistory = () => {
  try {
    setItem('notification_history', []);
    return true;
  } catch (error) {
    console.error('Error clearing notification history:', error);
    return false;
  }
};

/**
 * Send a general notification
 * @param {string} title - Notification title
 * @param {string} message - Notification message
 * @param {string} priority - Notification priority
 * @returns {Notification|null} Notification instance
 */
export const sendNotification = (title, message, priority = NOTIFICATION_PRIORITY.MEDIUM) => {
  const notification = showNotification({
    title,
    body: message,
    requireInteraction: priority === NOTIFICATION_PRIORITY.HIGH || priority === NOTIFICATION_PRIORITY.URGENT,
    data: {
      type: NOTIFICATION_TYPES.GENERAL,
      priority
    }
  });

  // Log the notification
  logNotification({
    type: NOTIFICATION_TYPES.GENERAL,
    title,
    message,
    priority,
    timestamp: new Date().toISOString()
  });

  return notification;
};

/**
 * Initialize notification service
 * Reschedule any missed notifications on app start
 */
export const initializeNotificationService = async () => {
  try {
    // Request permission if not already granted
    await requestNotificationPermission();

    // Clean up past scheduled notifications
    const scheduled = getScheduledNotifications();
    const now = new Date();
    
    const active = scheduled.filter(notification => {
      const scheduleTime = new Date(notification.scheduleTime);
      return scheduleTime > now;
    });

    setItem('scheduled_notifications', active);

    console.log('Notification service initialized');
  } catch (error) {
    console.error('Error initializing notification service:', error);
  }
};

export default {
  NOTIFICATION_TYPES,
  NOTIFICATION_PRIORITY,
  requestNotificationPermission,
  areNotificationsEnabled,
  showNotification,
  scheduleMedicineReminder,
  scheduleAppointmentReminder,
  scheduleHealthCheckupReminder,
  cancelScheduledNotification,
  getScheduledNotifications,
  clearAllScheduledNotifications,
  getNotificationHistory,
  markNotificationAsRead,
  getUnreadCount,
  clearNotificationHistory,
  sendNotification,
  initializeNotificationService
};