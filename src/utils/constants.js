// src/utils/constants.js

/**
 * Application constants for Nabha Telemedicine
 * Centralized configuration and constant values
 */

// ============== APPLICATION INFO ==============

export const APP_INFO = {
  NAME: 'Nabha Telemedicine',
  VERSION: '1.0.0',
  DESCRIPTION: 'Telemedicine Access for Rural Healthcare',
  AUTHOR: 'Team Nabha',
  SUPPORT_EMAIL: 'support@nabhatelemedicine.in',
  SUPPORT_PHONE: '+91-1765-234567'
};

// ============== API CONFIGURATION ==============

export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api',
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000 // 1 second
};

// ============== ROUTES ==============

export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  DOCTORS: '/doctors',
  DOCTOR_PROFILE: '/doctors/:id',
  CONSULTATION_BOOKING: '/consultation/book/:doctorId',
  CONSULTATION: '/consultation/:id',
  VIDEO_CALL: '/consultation/:id/video',
  AUDIO_CALL: '/consultation/:id/audio',
  CHAT: '/consultation/:id/chat',
  CONSULTATION_HISTORY: '/consultation/history',
  HEALTH_RECORDS: '/health-records',
  HEALTH_RECORD_VIEW: '/health-records/:id',
  MEDICINE_TRACKER: '/medicine-tracker',
  PHARMACY_LOCATOR: '/pharmacy-locator',
  SYMPTOM_CHECKER: '/symptom-checker',
  ADMIN: '/admin',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  HELP: '/help',
  ABOUT: '/about'
};

// ============== LOCAL STORAGE KEYS ==============

export const STORAGE_KEYS = {
  USER_PROFILE: 'nabha_user_profile',
  AUTH_TOKEN: 'nabha_auth_token',
  REFRESH_TOKEN: 'nabha_refresh_token',
  LANGUAGE: 'nabha_language',
  THEME: 'nabha_theme',
  HEALTH_RECORDS: 'nabha_health_records',
  MEDICINE_REMINDERS: 'nabha_medicine_reminders',
  CONSULTATION_HISTORY: 'nabha_consultation_history',
  OFFLINE_QUEUE: 'nabha_offline_queue',
  LAST_SYNC: 'nabha_last_sync',
  SETTINGS: 'nabha_settings',
  CACHED_DOCTORS: 'nabha_cached_doctors',
  CACHED_MEDICINES: 'nabha_cached_medicines',
  SYMPTOM_HISTORY: 'nabha_symptom_history',
  NOTIFICATION_PREFERENCES: 'nabha_notification_preferences'
};

// ============== SUPPORTED LANGUAGES ==============

export const LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' }
];

export const DEFAULT_LANGUAGE = 'en';

// ============== THEMES ==============

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  HIGH_CONTRAST: 'high-contrast',
  EMERGENCY: 'emergency',
  WELLNESS: 'wellness'
};

export const DEFAULT_THEME = THEMES.LIGHT;

// ============== DOCTOR SPECIALIZATIONS ==============

export const SPECIALIZATIONS = [
  'General Physician',
  'Pediatrician',
  'Cardiologist',
  'Dermatologist',
  'Gynecologist',
  'Orthopedic',
  'Psychiatrist',
  'Dentist',
  'ENT Specialist',
  'Ophthalmologist',
  'Neurologist',
  'Diabetologist',
  'Pulmonologist',
  'Gastroenterologist',
  'Urologist'
];

// ============== CONSULTATION TYPES ==============

export const CONSULTATION_TYPES = {
  VIDEO: 'video',
  AUDIO: 'audio',
  CHAT: 'chat',
  IN_PERSON: 'in_person'
};

// ============== CONSULTATION STATUS ==============

export const CONSULTATION_STATUS = {
  SCHEDULED: 'scheduled',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  NO_SHOW: 'no_show',
  RESCHEDULED: 'rescheduled'
};

// ============== APPOINTMENT TIME SLOTS ==============

export const TIME_SLOTS = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM',
  '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM'
];

// ============== HEALTH RECORD TYPES ==============

export const HEALTH_RECORD_TYPES = {
  LAB_REPORT: 'lab_report',
  PRESCRIPTION: 'prescription',
  SCAN: 'scan',
  X_RAY: 'x_ray',
  VACCINATION: 'vaccination',
  MEDICAL_CERTIFICATE: 'medical_certificate',
  DISCHARGE_SUMMARY: 'discharge_summary',
  OTHER: 'other'
};

// ============== FILE UPLOAD LIMITS ==============

export const FILE_UPLOAD = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB in bytes
  MAX_SIZE_LABEL: '10MB',
  ALLOWED_TYPES: [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ],
  ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.gif', '.pdf', '.doc', '.docx']
};

// ============== MEDICINE REMINDER FREQUENCIES ==============

export const REMINDER_FREQUENCIES = {
  ONCE_DAILY: 'once_daily',
  TWICE_DAILY: 'twice_daily',
  THREE_TIMES_DAILY: 'three_times_daily',
  FOUR_TIMES_DAILY: 'four_times_daily',
  EVERY_X_HOURS: 'every_x_hours',
  CUSTOM: 'custom'
};

// ============== MEDICINE DOSAGE FORMS ==============

export const DOSAGE_FORMS = [
  'Tablet',
  'Capsule',
  'Syrup',
  'Injection',
  'Drops',
  'Cream',
  'Ointment',
  'Inhaler',
  'Spray',
  'Powder',
  'Gel'
];

// ============== MEDICINE INTAKE TIMES ==============

export const INTAKE_TIMES = {
  BEFORE_BREAKFAST: 'before_breakfast',
  AFTER_BREAKFAST: 'after_breakfast',
  BEFORE_LUNCH: 'before_lunch',
  AFTER_LUNCH: 'after_lunch',
  BEFORE_DINNER: 'before_dinner',
  AFTER_DINNER: 'after_dinner',
  BEDTIME: 'bedtime',
  CUSTOM: 'custom'
};

// ============== SYMPTOM SEVERITY LEVELS ==============

export const SEVERITY_LEVELS = {
  MILD: 'mild',
  MODERATE: 'moderate',
  SEVERE: 'severe',
  CRITICAL: 'critical'
};

// ============== SYMPTOM CATEGORIES ==============

export const SYMPTOM_CATEGORIES = {
  GENERAL: 'General',
  RESPIRATORY: 'Respiratory',
  DIGESTIVE: 'Digestive',
  CARDIOVASCULAR: 'Cardiovascular',
  NEUROLOGICAL: 'Neurological',
  MUSCULOSKELETAL: 'Musculoskeletal',
  SKIN: 'Skin',
  MENTAL_HEALTH: 'Mental Health'
};

// ============== BLOOD GROUPS ==============

export const BLOOD_GROUPS = [
  'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'
];

// ============== GENDER OPTIONS ==============

export const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
  { value: 'prefer_not_to_say', label: 'Prefer not to say' }
];

// ============== NOTIFICATION TYPES ==============

export const NOTIFICATION_TYPES = {
  MEDICINE_REMINDER: 'medicine_reminder',
  APPOINTMENT_REMINDER: 'appointment_reminder',
  HEALTH_CHECKUP: 'health_checkup',
  CONSULTATION_READY: 'consultation_ready',
  PRESCRIPTION_REFILL: 'prescription_refill',
  GENERAL: 'general',
  SYSTEM: 'system'
};

// ============== NOTIFICATION PRIORITY ==============

export const NOTIFICATION_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent'
};

// ============== DATE FORMATS ==============

export const DATE_FORMATS = {
  SHORT: 'DD/MM/YYYY',
  LONG: 'DD MMMM YYYY',
  WITH_TIME: 'DD/MM/YYYY hh:mm A',
  TIME_ONLY: 'hh:mm A',
  ISO: 'YYYY-MM-DD',
  DISPLAY: 'MMM DD, YYYY'
};

// ============== PAGINATION ==============

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50],
  MAX_PAGE_SIZE: 100
};

// ============== VALIDATION RULES ==============

export const VALIDATION = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 50,
  PHONE_LENGTH: 10,
  OTP_LENGTH: 6,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^[6-9]\d{9}$/,
  PINCODE_REGEX: /^\d{6}$/,
  AADHAR_REGEX: /^\d{12}$/
};

// ============== ERROR MESSAGES ==============

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your internet connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  FILE_TOO_LARGE: `File size should not exceed ${FILE_UPLOAD.MAX_SIZE_LABEL}.`,
  INVALID_FILE_TYPE: 'Invalid file type. Please upload a supported file.',
  SESSION_EXPIRED: 'Your session has expired. Please login again.',
  GENERIC_ERROR: 'Something went wrong. Please try again.'
};

// ============== SUCCESS MESSAGES ==============

export const SUCCESS_MESSAGES = {
  CONSULTATION_BOOKED: 'Consultation booked successfully!',
  RECORD_UPLOADED: 'Health record uploaded successfully!',
  REMINDER_ADDED: 'Medicine reminder added successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  SETTINGS_SAVED: 'Settings saved successfully!',
  MESSAGE_SENT: 'Message sent successfully!',
  APPOINTMENT_CANCELLED: 'Appointment cancelled successfully!',
  RECORD_DELETED: 'Record deleted successfully!'
};

// ============== CONTACT INFO ==============

export const CONTACT_INFO = {
  EMERGENCY_NUMBER: '108',
  HELPLINE: '+91-1765-234567',
  EMAIL: 'support@nabhatelemedicine.in',
  ADDRESS: 'Civil Hospital Road, Nabha, Punjab - 147201',
  WORKING_HOURS: 'Mon-Sat: 9:00 AM - 8:00 PM',
  EMERGENCY_HOURS: '24x7'
};

// ============== SOCIAL MEDIA LINKS ==============

export const SOCIAL_MEDIA = {
  FACEBOOK: 'https://facebook.com/nabhatelemedicine',
  TWITTER: 'https://twitter.com/nabhatelemedicine',
  INSTAGRAM: 'https://instagram.com/nabhatelemedicine',
  YOUTUBE: 'https://youtube.com/nabhatelemedicine'
};

// ============== FEATURE FLAGS ==============

export const FEATURES = {
  VIDEO_CALL_ENABLED: true,
  AUDIO_CALL_ENABLED: true,
  CHAT_ENABLED: true,
  SYMPTOM_CHECKER_ENABLED: true,
  MEDICINE_TRACKER_ENABLED: true,
  PHARMACY_LOCATOR_ENABLED: true,
  HEALTH_RECORDS_ENABLED: true,
  QR_CODE_ENABLED: true,
  OFFLINE_MODE_ENABLED: true,
  MULTI_LANGUAGE_ENABLED: true,
  DARK_MODE_ENABLED: true,
  NOTIFICATIONS_ENABLED: true,
  ADMIN_PANEL_ENABLED: true
};

// ============== DEFAULT SETTINGS ==============

export const DEFAULT_SETTINGS = {
  language: DEFAULT_LANGUAGE,
  theme: DEFAULT_THEME,
  notifications: {
    medicineReminders: true,
    appointmentReminders: true,
    healthCheckups: true,
    systemNotifications: true,
    sound: true,
    vibration: true
  },
  privacy: {
    shareHealthData: false,
    allowAnalytics: true,
    showOnlineStatus: true
  },
  display: {
    fontSize: 'medium',
    reducedMotion: false,
    highContrast: false
  }
};

// ============== CACHE DURATION ==============

export const CACHE_DURATION = {
  DOCTORS: 3600000, // 1 hour in milliseconds
  MEDICINES: 86400000, // 24 hours
  CONSULTATIONS: 1800000, // 30 minutes
  HEALTH_RECORDS: 3600000, // 1 hour
  USER_PROFILE: 3600000 // 1 hour
};

// ============== SYNC INTERVALS ==============

export const SYNC_INTERVALS = {
  ONLINE_CHECK: 5000, // 5 seconds
  AUTO_SYNC: 300000, // 5 minutes
  BACKGROUND_SYNC: 600000 // 10 minutes
};

// ============== RATING RANGES ==============

export const RATING = {
  MIN: 1,
  MAX: 5,
  DEFAULT: 0
};

// ============== DISTANCE UNITS ==============

export const DISTANCE_UNITS = {
  KILOMETERS: 'km',
  METERS: 'm',
  MILES: 'mi'
};

export const DEFAULT_DISTANCE_UNIT = DISTANCE_UNITS.KILOMETERS;

// ============== AGE GROUPS ==============

export const AGE_GROUPS = [
  { min: 0, max: 12, label: 'Child' },
  { min: 13, max: 19, label: 'Teenager' },
  { min: 20, max: 39, label: 'Adult' },
  { min: 40, max: 59, label: 'Middle Age' },
  { min: 60, max: 150, label: 'Senior' }
];

// ============== EXPORT ALL ==============

export default {
  APP_INFO,
  API_CONFIG,
  ROUTES,
  STORAGE_KEYS,
  LANGUAGES,
  DEFAULT_LANGUAGE,
  THEMES,
  DEFAULT_THEME,
  SPECIALIZATIONS,
  CONSULTATION_TYPES,
  CONSULTATION_STATUS,
  TIME_SLOTS,
  HEALTH_RECORD_TYPES,
  FILE_UPLOAD,
  REMINDER_FREQUENCIES,
  DOSAGE_FORMS,
  INTAKE_TIMES,
  SEVERITY_LEVELS,
  SYMPTOM_CATEGORIES,
  BLOOD_GROUPS,
  GENDER_OPTIONS,
  NOTIFICATION_TYPES,
  NOTIFICATION_PRIORITY,
  DATE_FORMATS,
  PAGINATION,
  VALIDATION,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  CONTACT_INFO,
  SOCIAL_MEDIA,
  FEATURES,
  DEFAULT_SETTINGS,
  CACHE_DURATION,
  SYNC_INTERVALS,
  RATING,
  DISTANCE_UNITS,
  DEFAULT_DISTANCE_UNIT,
  AGE_GROUPS
};