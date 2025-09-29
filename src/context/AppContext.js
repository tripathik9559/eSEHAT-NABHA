// Location: src/context/AppContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * AppContext
 * Global application state management
 * Manages user data, appointments, notifications, and app-wide settings
 */

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // User state
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState('patient'); // 'patient', 'doctor', 'admin'
  
  // Appointments state
  const [appointments, setAppointments] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  
  // Notifications state
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  
  // App settings
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');
  
  // Loading states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize app data on mount
  useEffect(() => {
    initializeApp();
  }, []);

  // Update unread notifications count
  useEffect(() => {
    const unread = notifications.filter(n => !n.read).length;
    setUnreadCount(unread);
  }, [notifications]);

  // Update upcoming appointments
  useEffect(() => {
    const upcoming = appointments.filter(apt => {
      const aptDate = new Date(apt.date);
      const today = new Date();
      return aptDate >= today && apt.status !== 'cancelled';
    }).sort((a, b) => new Date(a.date) - new Date(b.date));
    setUpcomingAppointments(upcoming);
  }, [appointments]);

  const initializeApp = () => {
    try {
      // Load user data from localStorage
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        // Set mock user data
        const mockUser = {
          id: 1,
          name: 'Rajesh Kumar',
          email: 'rajesh.kumar@example.com',
          phone: '+91 98765 43210',
          age: 35,
          gender: 'male',
          location: 'Nabha, Punjab',
          bloodGroup: 'B+',
          avatar: null,
          joinedDate: '2024-01-15'
        };
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
      }

      // Load appointments
      const savedAppointments = localStorage.getItem('appointments');
      if (savedAppointments) {
        setAppointments(JSON.parse(savedAppointments));
      } else {
        // Initialize with mock appointments
        const mockAppointments = [
          {
            id: 1,
            doctorId: 1,
            doctorName: 'Dr. Rajesh Sharma',
            specialization: 'General Physician',
            date: '2025-10-05',
            time: '10:00 AM',
            type: 'video',
            status: 'scheduled',
            reason: 'Regular checkup',
            createdAt: '2025-09-25'
          },
          {
            id: 2,
            doctorId: 2,
            doctorName: 'Dr. Priya Verma',
            specialization: 'Pediatrician',
            date: '2025-10-08',
            time: '2:00 PM',
            type: 'audio',
            status: 'scheduled',
            reason: 'Child vaccination',
            createdAt: '2025-09-26'
          }
        ];
        setAppointments(mockAppointments);
        localStorage.setItem('appointments', JSON.stringify(mockAppointments));
      }

      // Load notifications
      const savedNotifications = localStorage.getItem('notifications');
      if (savedNotifications) {
        setNotifications(JSON.parse(savedNotifications));
      } else {
        // Initialize with mock notifications
        const mockNotifications = [
          {
            id: 1,
            type: 'appointment',
            title: 'Upcoming Appointment',
            message: 'You have an appointment with Dr. Rajesh Sharma tomorrow at 10:00 AM',
            timestamp: new Date().toISOString(),
            read: false,
            priority: 'high'
          },
          {
            id: 2,
            type: 'medicine',
            title: 'Medicine Reminder',
            message: 'Time to take your Metformin 500mg',
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            read: false,
            priority: 'medium'
          },
          {
            id: 3,
            type: 'report',
            title: 'Lab Report Ready',
            message: 'Your blood test results are now available',
            timestamp: new Date(Date.now() - 86400000).toISOString(),
            read: true,
            priority: 'low'
          }
        ];
        setNotifications(mockNotifications);
        localStorage.setItem('notifications', JSON.stringify(mockNotifications));
      }

      // Load theme preference
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        setTheme(savedTheme);
      }

      // Load language preference
      const savedLanguage = localStorage.getItem('language');
      if (savedLanguage) {
        setLanguage(savedLanguage);
      }

    } catch (err) {
      console.error('Error initializing app:', err);
      setError('Failed to load app data');
    }
  };

  // User functions
  const updateUser = (userData) => {
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    // Keep other data intact for demo purposes
  };

  // Appointment functions
  const addAppointment = (appointment) => {
    const newAppointment = {
      ...appointment,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      status: 'scheduled'
    };
    const updatedAppointments = [...appointments, newAppointment];
    setAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    
    // Add notification
    addNotification({
      type: 'appointment',
      title: 'Appointment Confirmed',
      message: `Your appointment with ${appointment.doctorName} is scheduled for ${appointment.date} at ${appointment.time}`,
      priority: 'high'
    });
  };

  const updateAppointment = (appointmentId, updates) => {
    const updatedAppointments = appointments.map(apt =>
      apt.id === appointmentId ? { ...apt, ...updates } : apt
    );
    setAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
  };

  const cancelAppointment = (appointmentId) => {
    const updatedAppointments = appointments.map(apt =>
      apt.id === appointmentId ? { ...apt, status: 'cancelled' } : apt
    );
    setAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    
    // Add notification
    addNotification({
      type: 'appointment',
      title: 'Appointment Cancelled',
      message: 'Your appointment has been cancelled',
      priority: 'medium'
    });
  };

  const getAppointmentById = (appointmentId) => {
    return appointments.find(apt => apt.id === appointmentId);
  };

  // Notification functions
  const addNotification = (notification) => {
    const newNotification = {
      ...notification,
      id: Date.now(),
      timestamp: new Date().toISOString(),
      read: false
    };
    const updatedNotifications = [newNotification, ...notifications];
    setNotifications(updatedNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  const markNotificationAsRead = (notificationId) => {
    const updatedNotifications = notifications.map(notif =>
      notif.id === notificationId ? { ...notif, read: true } : notif
    );
    setNotifications(updatedNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  const markAllNotificationsAsRead = () => {
    const updatedNotifications = notifications.map(notif => ({ ...notif, read: true }));
    setNotifications(updatedNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  const deleteNotification = (notificationId) => {
    const updatedNotifications = notifications.filter(notif => notif.id !== notificationId);
    setNotifications(updatedNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    localStorage.setItem('notifications', JSON.stringify([]));
  };

  // Settings functions
  const updateTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const updateLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  // Utility functions
  const showError = (message) => {
    setError(message);
    setTimeout(() => setError(null), 5000);
  };

  const showLoading = (isLoading) => {
    setLoading(isLoading);
  };

  // Get statistics
  const getStatistics = () => {
    const totalAppointments = appointments.length;
    const completedAppointments = appointments.filter(apt => apt.status === 'completed').length;
    const cancelledAppointments = appointments.filter(apt => apt.status === 'cancelled').length;
    const scheduledAppointments = appointments.filter(apt => apt.status === 'scheduled').length;

    return {
      totalAppointments,
      completedAppointments,
      cancelledAppointments,
      scheduledAppointments,
      upcomingCount: upcomingAppointments.length,
      unreadNotifications: unreadCount
    };
  };

  const value = {
    // User state
    user,
    userType,
    setUserType,
    updateUser,
    logout,

    // Appointments state
    appointments,
    upcomingAppointments,
    addAppointment,
    updateAppointment,
    cancelAppointment,
    getAppointmentById,

    // Notifications state
    notifications,
    unreadCount,
    addNotification,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification,
    clearAllNotifications,

    // Settings
    theme,
    language,
    updateTheme,
    updateLanguage,

    // Utility
    loading,
    error,
    showError,
    showLoading,
    getStatistics
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;