// src/utils/dateUtils.js

/**
 * Date utility functions for Nabha Telemedicine
 * Provides date formatting, manipulation, and calculation functions
 */

import { DATE_FORMATS } from './constants';

/**
 * Format a date according to specified format
 * @param {Date|string|number} date - Date to format
 * @param {string} format - Format string (default: DD/MM/YYYY)
 * @returns {string} Formatted date string
 */
export const formatDate = (date, format = DATE_FORMATS.SHORT) => {
  if (!date) return '';

  const d = new Date(date);
  
  if (isNaN(d.getTime())) {
    console.error('Invalid date:', date);
    return '';
  }

  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  const hours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const monthNamesShort = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  // Replace format tokens
  let formatted = format
    .replace('YYYY', year)
    .replace('YY', String(year).slice(-2))
    .replace('MMMM', monthNames[d.getMonth()])
    .replace('MMM', monthNamesShort[d.getMonth()])
    .replace('MM', month)
    .replace('DD', day)
    .replace('hh', String(hours12).padStart(2, '0'))
    .replace('mm', minutes)
    .replace('A', ampm);

  return formatted;
};

/**
 * Get relative time from now (e.g., "2 hours ago", "in 3 days")
 * @param {Date|string|number} date - Date to compare
 * @returns {string} Relative time string
 */
export const getRelativeTime = (date) => {
  if (!date) return '';

  const d = new Date(date);
  const now = new Date();
  const diffMs = d - now;
  const diffSeconds = Math.floor(Math.abs(diffMs) / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  const isPast = diffMs < 0;
  const prefix = isPast ? '' : 'in ';
  const suffix = isPast ? ' ago' : '';

  if (diffSeconds < 60) {
    return isPast ? 'just now' : 'in a moment';
  } else if (diffMinutes < 60) {
    return `${prefix}${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}${suffix}`;
  } else if (diffHours < 24) {
    return `${prefix}${diffHours} hour${diffHours > 1 ? 's' : ''}${suffix}`;
  } else if (diffDays < 7) {
    return `${prefix}${diffDays} day${diffDays > 1 ? 's' : ''}${suffix}`;
  } else if (diffWeeks < 4) {
    return `${prefix}${diffWeeks} week${diffWeeks > 1 ? 's' : ''}${suffix}`;
  } else if (diffMonths < 12) {
    return `${prefix}${diffMonths} month${diffMonths > 1 ? 's' : ''}${suffix}`;
  } else {
    return `${prefix}${diffYears} year${diffYears > 1 ? 's' : ''}${suffix}`;
  }
};

/**
 * Check if a date is today
 * @param {Date|string|number} date - Date to check
 * @returns {boolean} True if date is today
 */
export const isToday = (date) => {
  if (!date) return false;

  const d = new Date(date);
  const today = new Date();

  return d.getDate() === today.getDate() &&
         d.getMonth() === today.getMonth() &&
         d.getFullYear() === today.getFullYear();
};

/**
 * Check if a date is tomorrow
 * @param {Date|string|number} date - Date to check
 * @returns {boolean} True if date is tomorrow
 */
export const isTomorrow = (date) => {
  if (!date) return false;

  const d = new Date(date);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  return d.getDate() === tomorrow.getDate() &&
         d.getMonth() === tomorrow.getMonth() &&
         d.getFullYear() === tomorrow.getFullYear();
};

/**
 * Check if a date is in the past
 * @param {Date|string|number} date - Date to check
 * @returns {boolean} True if date is in the past
 */
export const isPast = (date) => {
  if (!date) return false;
  return new Date(date) < new Date();
};

/**
 * Check if a date is in the future
 * @param {Date|string|number} date - Date to check
 * @returns {boolean} True if date is in the future
 */
export const isFuture = (date) => {
  if (!date) return false;
  return new Date(date) > new Date();
};

/**
 * Add days to a date
 * @param {Date|string|number} date - Starting date
 * @param {number} days - Number of days to add
 * @returns {Date} New date
 */
export const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

/**
 * Add months to a date
 * @param {Date|string|number} date - Starting date
 * @param {number} months - Number of months to add
 * @returns {Date} New date
 */
export const addMonths = (date, months) => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
};

/**
 * Get difference between two dates in days
 * @param {Date|string|number} date1 - First date
 * @param {Date|string|number} date2 - Second date
 * @returns {number} Difference in days
 */
export const getDaysDifference = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2 - d1);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Get start of day
 * @param {Date|string|number} date - Date
 * @returns {Date} Start of day
 */
export const startOfDay = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

/**
 * Get end of day
 * @param {Date|string|number} date - Date
 * @returns {Date} End of day
 */
export const endOfDay = (date) => {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
};

/**
 * Get start of month
 * @param {Date|string|number} date - Date
 * @returns {Date} Start of month
 */
export const startOfMonth = (date) => {
  const d = new Date(date);
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d;
};

/**
 * Get end of month
 * @param {Date|string|number} date - Date
 * @returns {Date} End of month
 */
export const endOfMonth = (date) => {
  const d = new Date(date);
  d.setMonth(d.getMonth() + 1);
  d.setDate(0);
  d.setHours(23, 59, 59, 999);
  return d;
};

/**
 * Get age from date of birth
 * @param {Date|string|number} dateOfBirth - Date of birth
 * @returns {number} Age in years
 */
export const getAge = (dateOfBirth) => {
  if (!dateOfBirth) return 0;

  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

/**
 * Parse time string to Date object
 * @param {string} timeString - Time string (e.g., "09:30 AM")
 * @param {Date} baseDate - Base date (default: today)
 * @returns {Date} Date object with time set
 */
export const parseTimeString = (timeString, baseDate = new Date()) => {
  if (!timeString) return null;

  const [time, period] = timeString.split(' ');
  const [hours, minutes] = time.split(':').map(Number);

  const date = new Date(baseDate);
  let hour24 = hours;

  if (period === 'PM' && hours !== 12) {
    hour24 = hours + 12;
  } else if (period === 'AM' && hours === 12) {
    hour24 = 0;
  }

  date.setHours(hour24, minutes, 0, 0);
  return date;
};

/**
 * Format time from Date object
 * @param {Date|string|number} date - Date object
 * @param {boolean} includeSeconds - Include seconds in output
 * @returns {string} Formatted time string (e.g., "09:30 AM")
 */
export const formatTime = (date, includeSeconds = false) => {
  if (!date) return '';

  const d = new Date(date);
  const hours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;

  if (includeSeconds) {
    return `${String(hours12).padStart(2, '0')}:${minutes}:${seconds} ${ampm}`;
  }

  return `${String(hours12).padStart(2, '0')}:${minutes} ${ampm}`;
};

/**
 * Get day name from date
 * @param {Date|string|number} date - Date
 * @param {boolean} short - Use short form (Mon, Tue, etc.)
 * @returns {string} Day name
 */
export const getDayName = (date, short = false) => {
  if (!date) return '';

  const d = new Date(date);
  const days = short
    ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return days[d.getDay()];
};

/**
 * Get month name from date
 * @param {Date|string|number} date - Date
 * @param {boolean} short - Use short form (Jan, Feb, etc.)
 * @returns {string} Month name
 */
export const getMonthName = (date, short = false) => {
  if (!date) return '';

  const d = new Date(date);
  const months = short
    ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  return months[d.getMonth()];
};

/**
 * Check if date is within range
 * @param {Date|string|number} date - Date to check
 * @param {Date|string|number} startDate - Start of range
 * @param {Date|string|number} endDate - End of range
 * @returns {boolean} True if date is within range
 */
export const isDateInRange = (date, startDate, endDate) => {
  const d = new Date(date);
  const start = new Date(startDate);
  const end = new Date(endDate);

  return d >= start && d <= end;
};

/**
 * Get date range for a period
 * @param {string} period - Period ('today', 'week', 'month', 'year')
 * @returns {Object} Object with start and end dates
 */
export const getDateRange = (period) => {
  const now = new Date();
  let start, end;

  switch (period) {
    case 'today':
      start = startOfDay(now);
      end = endOfDay(now);
      break;
    case 'week':
      start = addDays(startOfDay(now), -7);
      end = endOfDay(now);
      break;
    case 'month':
      start = startOfMonth(now);
      end = endOfMonth(now);
      break;
    case 'year':
      start = new Date(now.getFullYear(), 0, 1);
      end = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
      break;
    default:
      start = startOfDay(now);
      end = endOfDay(now);
  }

  return { start, end };
};

/**
 * Validate date string
 * @param {string} dateString - Date string to validate
 * @returns {boolean} True if valid date
 */
export const isValidDate = (dateString) => {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
};

/**
 * Get calendar weeks for a month
 * @param {number} year - Year
 * @param {number} month - Month (0-11)
 * @returns {Array<Array<Date>>} Array of weeks, each containing array of dates
 */
export const getCalendarWeeks = (year, month) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const weeks = [];
  let week = [];

  // Fill first week with empty days
  for (let i = 0; i < firstDay.getDay(); i++) {
    week.push(null);
  }

  // Fill all days
  for (let day = 1; day <= lastDay.getDate(); day++) {
    week.push(new Date(year, month, day));
    
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }

  // Fill last week with empty days
  if (week.length > 0) {
    while (week.length < 7) {
      week.push(null);
    }
    weeks.push(week);
  }

  return weeks;
};

/**
 * Convert 24-hour time to 12-hour format
 * @param {string} time24 - Time in 24-hour format (HH:MM)
 * @returns {string} Time in 12-hour format (hh:mm AM/PM)
 */
export const convert24To12Hour = (time24) => {
  if (!time24) return '';

  const [hours, minutes] = time24.split(':').map(Number);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;

  return `${String(hours12).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${ampm}`;
};

/**
 * Convert 12-hour time to 24-hour format
 * @param {string} time12 - Time in 12-hour format (hh:mm AM/PM)
 * @returns {string} Time in 24-hour format (HH:MM)
 */
export const convert12To24Hour = (time12) => {
  if (!time12) return '';

  const [time, period] = time12.split(' ');
  const [hours, minutes] = time.split(':').map(Number);

  let hour24 = hours;
  if (period === 'PM' && hours !== 12) {
    hour24 = hours + 12;
  } else if (period === 'AM' && hours === 12) {
    hour24 = 0;
  }

  return `${String(hour24).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};

export default {
  formatDate,
  getRelativeTime,
  isToday,
  isTomorrow,
  isPast,
  isFuture,
  addDays,
  addMonths,
  getDaysDifference,
  startOfDay,
  endOfDay,
  startOfMonth,
  endOfMonth,
  getAge,
  parseTimeString,
  formatTime,
  getDayName,
  getMonthName,
  isDateInRange,
  getDateRange,
  isValidDate,
  getCalendarWeeks,
  convert24To12Hour,
  convert12To24Hour
};