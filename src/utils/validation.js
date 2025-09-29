// src/utils/validation.js

/**
 * Validation utility functions for Nabha Telemedicine
 * Form validation and data validation functions
 */

import { VALIDATION } from './constants';

/**
 * Validate email address
 * @param {string} email - Email address to validate
 * @returns {Object} Validation result {isValid, error}
 */
export const validateEmail = (email) => {
  if (!email || email.trim() === '') {
    return { isValid: false, error: 'Email is required' };
  }

  if (!VALIDATION.EMAIL_REGEX.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }

  return { isValid: true, error: null };
};

/**
 * Validate phone number (Indian format)
 * @param {string} phone - Phone number to validate
 * @returns {Object} Validation result {isValid, error}
 */
export const validatePhone = (phone) => {
  if (!phone || phone.trim() === '') {
    return { isValid: false, error: 'Phone number is required' };
  }

  const cleaned = phone.replace(/\D/g, '');

  if (cleaned.length !== VALIDATION.PHONE_LENGTH) {
    return { isValid: false, error: `Phone number must be ${VALIDATION.PHONE_LENGTH} digits` };
  }

  if (!VALIDATION.PHONE_REGEX.test(cleaned)) {
    return { isValid: false, error: 'Please enter a valid Indian phone number' };
  }

  return { isValid: true, error: null };
};

/**
 * Validate name
 * @param {string} name - Name to validate
 * @returns {Object} Validation result {isValid, error}
 */
export const validateName = (name) => {
  if (!name || name.trim() === '') {
    return { isValid: false, error: 'Name is required' };
  }

  if (name.length < VALIDATION.NAME_MIN_LENGTH) {
    return { isValid: false, error: `Name must be at least ${VALIDATION.NAME_MIN_LENGTH} characters` };
  }

  if (name.length > VALIDATION.NAME_MAX_LENGTH) {
    return { isValid: false, error: `Name must not exceed ${VALIDATION.NAME_MAX_LENGTH} characters` };
  }

  if (!/^[a-zA-Z\s]+$/.test(name)) {
    return { isValid: false, error: 'Name must contain only letters and spaces' };
  }

  return { isValid: true, error: null };
};

/**
 * Validate password
 * @param {string} password - Password to validate
 * @returns {Object} Validation result {isValid, error}
 */
export const validatePassword = (password) => {
  if (!password || password.trim() === '') {
    return { isValid: false, error: 'Password is required' };
  }

  if (password.length < VALIDATION.PASSWORD_MIN_LENGTH) {
    return { isValid: false, error: `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters` };
  }

  if (password.length > VALIDATION.PASSWORD_MAX_LENGTH) {
    return { isValid: false, error: `Password must not exceed ${VALIDATION.PASSWORD_MAX_LENGTH} characters` };
  }

  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one uppercase letter' };
  }

  // Check for at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one lowercase letter' };
  }

  // Check for at least one number
  if (!/\d/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one number' };
  }

  // Check for at least one special character
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one special character' };
  }

  return { isValid: true, error: null };
};

/**
 * Validate password confirmation
 * @param {string} password - Original password
 * @param {string} confirmPassword - Confirmation password
 * @returns {Object} Validation result {isValid, error}
 */
export const validatePasswordConfirmation = (password, confirmPassword) => {
  if (!confirmPassword || confirmPassword.trim() === '') {
    return { isValid: false, error: 'Please confirm your password' };
  }

  if (password !== confirmPassword) {
    return { isValid: false, error: 'Passwords do not match' };
  }

  return { isValid: true, error: null };
};

/**
 * Validate age
 * @param {number} age - Age to validate
 * @param {number} minAge - Minimum age (default: 0)
 * @param {number} maxAge - Maximum age (default: 150)
 * @returns {Object} Validation result {isValid, error}
 */
export const validateAge = (age, minAge = 0, maxAge = 150) => {
  if (age === null || age === undefined || age === '') {
    return { isValid: false, error: 'Age is required' };
  }

  const numAge = Number(age);

  if (isNaN(numAge)) {
    return { isValid: false, error: 'Age must be a number' };
  }

  if (numAge < minAge) {
    return { isValid: false, error: `Age must be at least ${minAge}` };
  }

  if (numAge > maxAge) {
    return { isValid: false, error: `Age must not exceed ${maxAge}` };
  }

  return { isValid: true, error: null };
};

/**
 * Validate date of birth
 * @param {string|Date} dob - Date of birth
 * @returns {Object} Validation result {isValid, error}
 */
export const validateDateOfBirth = (dob) => {
  if (!dob) {
    return { isValid: false, error: 'Date of birth is required' };
  }

  const date = new Date(dob);

  if (isNaN(date.getTime())) {
    return { isValid: false, error: 'Please enter a valid date' };
  }

  const today = new Date();
  const minDate = new Date(today.getFullYear() - 150, today.getMonth(), today.getDate());

  if (date > today) {
    return { isValid: false, error: 'Date of birth cannot be in the future' };
  }

  if (date < minDate) {
    return { isValid: false, error: 'Please enter a valid date of birth' };
  }

  return { isValid: true, error: null };
};

/**
 * Validate pincode (Indian)
 * @param {string} pincode - Pincode to validate
 * @returns {Object} Validation result {isValid, error}
 */
export const validatePincode = (pincode) => {
  if (!pincode || pincode.trim() === '') {
    return { isValid: false, error: 'Pincode is required' };
  }

  if (!VALIDATION.PINCODE_REGEX.test(pincode)) {
    return { isValid: false, error: 'Please enter a valid 6-digit pincode' };
  }

  return { isValid: true, error: null };
};

/**
 * Validate Aadhar number (Indian)
 * @param {string} aadhar - Aadhar number to validate
 * @returns {Object} Validation result {isValid, error}
 */
export const validateAadhar = (aadhar) => {
  if (!aadhar || aadhar.trim() === '') {
    return { isValid: false, error: 'Aadhar number is required' };
  }

  const cleaned = aadhar.replace(/\s/g, '');

  if (!VALIDATION.AADHAR_REGEX.test(cleaned)) {
    return { isValid: false, error: 'Please enter a valid 12-digit Aadhar number' };
  }

  return { isValid: true, error: null };
};

/**
 * Validate required field
 * @param {*} value - Value to validate
 * @param {string} fieldName - Field name for error message
 * @returns {Object} Validation result {isValid, error}
 */
export const validateRequired = (value, fieldName = 'This field') => {
  if (value === null || value === undefined || value === '' || 
      (typeof value === 'string' && value.trim() === '')) {
    return { isValid: false, error: `${fieldName} is required` };
  }

  return { isValid: true, error: null };
};

/**
 * Validate URL
 * @param {string} url - URL to validate
 * @returns {Object} Validation result {isValid, error}
 */
export const validateURL = (url) => {
  if (!url || url.trim() === '') {
    return { isValid: false, error: 'URL is required' };
  }

  try {
    new URL(url);
    return { isValid: true, error: null };
  } catch (error) {
    return { isValid: false, error: 'Please enter a valid URL' };
  }
};

/**
 * Validate file size
 * @param {File} file - File to validate
 * @param {number} maxSize - Maximum size in bytes
 * @returns {Object} Validation result {isValid, error}
 */
export const validateFileSize = (file, maxSize) => {
  if (!file) {
    return { isValid: false, error: 'No file selected' };
  }

  if (file.size > maxSize) {
    const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(2);
    return { isValid: false, error: `File size must not exceed ${maxSizeMB}MB` };
  }

  return { isValid: true, error: null };
};

/**
 * Validate file type
 * @param {File} file - File to validate
 * @param {Array<string>} allowedTypes - Allowed MIME types
 * @returns {Object} Validation result {isValid, error}
 */
export const validateFileType = (file, allowedTypes) => {
  if (!file) {
    return { isValid: false, error: 'No file selected' };
  }

  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, error: 'Invalid file type. Please upload a supported file.' };
  }

  return { isValid: true, error: null };
};

/**
 * Validate number range
 * @param {number} value - Value to validate
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @param {string} fieldName - Field name for error message
 * @returns {Object} Validation result {isValid, error}
 */
export const validateRange = (value, min, max, fieldName = 'Value') => {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: `${fieldName} is required` };
  }

  const numValue = Number(value);

  if (isNaN(numValue)) {
    return { isValid: false, error: `${fieldName} must be a number` };
  }

  if (numValue < min || numValue > max) {
    return { isValid: false, error: `${fieldName} must be between ${min} and ${max}` };
  }

  return { isValid: true, error: null };
};

/**
 * Validate string length
 * @param {string} value - String to validate
 * @param {number} minLength - Minimum length
 * @param {number} maxLength - Maximum length
 * @param {string} fieldName - Field name for error message
 * @returns {Object} Validation result {isValid, error}
 */
export const validateLength = (value, minLength, maxLength, fieldName = 'This field') => {
  if (!value || value.trim() === '') {
    return { isValid: false, error: `${fieldName} is required` };
  }

  if (value.length < minLength) {
    return { isValid: false, error: `${fieldName} must be at least ${minLength} characters` };
  }

  if (value.length > maxLength) {
    return { isValid: false, error: `${fieldName} must not exceed ${maxLength} characters` };
  }

  return { isValid: true, error: null };
};

/**
 * Validate blood pressure
 * @param {number} systolic - Systolic value
 * @param {number} diastolic - Diastolic value
 * @returns {Object} Validation result {isValid, error}
 */
export const validateBloodPressure = (systolic, diastolic) => {
  if (!systolic || !diastolic) {
    return { isValid: false, error: 'Both systolic and diastolic values are required' };
  }

  if (systolic < 70 || systolic > 250) {
    return { isValid: false, error: 'Systolic value must be between 70 and 250' };
  }

  if (diastolic < 40 || diastolic > 150) {
    return { isValid: false, error: 'Diastolic value must be between 40 and 150' };
  }

  if (systolic <= diastolic) {
    return { isValid: false, error: 'Systolic value must be greater than diastolic value' };
  }

  return { isValid: true, error: null };
};

/**
 * Validate temperature
 * @param {number} temperature - Temperature in Celsius
 * @returns {Object} Validation result {isValid, error}
 */
export const validateTemperature = (temperature) => {
  if (temperature === null || temperature === undefined || temperature === '') {
    return { isValid: false, error: 'Temperature is required' };
  }

  const temp = Number(temperature);

  if (isNaN(temp)) {
    return { isValid: false, error: 'Temperature must be a number' };
  }

  if (temp < 35 || temp > 43) {
    return { isValid: false, error: 'Temperature must be between 35°C and 43°C' };
  }

  return { isValid: true, error: null };
};

/**
 * Validate heart rate
 * @param {number} heartRate - Heart rate in BPM
 * @returns {Object} Validation result {isValid, error}
 */
export const validateHeartRate = (heartRate) => {
  if (heartRate === null || heartRate === undefined || heartRate === '') {
    return { isValid: false, error: 'Heart rate is required' };
  }

  const rate = Number(heartRate);

  if (isNaN(rate)) {
    return { isValid: false, error: 'Heart rate must be a number' };
  }

  if (rate < 30 || rate > 250) {
    return { isValid: false, error: 'Heart rate must be between 30 and 250 BPM' };
  }

  return { isValid: true, error: null };
};

/**
 * Validate weight
 * @param {number} weight - Weight in kg
 * @returns {Object} Validation result {isValid, error}
 */
export const validateWeight = (weight) => {
  if (weight === null || weight === undefined || weight === '') {
    return { isValid: false, error: 'Weight is required' };
  }

  const w = Number(weight);

  if (isNaN(w)) {
    return { isValid: false, error: 'Weight must be a number' };
  }

  if (w < 1 || w > 500) {
    return { isValid: false, error: 'Weight must be between 1 and 500 kg' };
  }

  return { isValid: true, error: null };
};

/**
 * Validate height
 * @param {number} height - Height in cm
 * @returns {Object} Validation result {isValid, error}
 */
export const validateHeight = (height) => {
  if (height === null || height === undefined || height === '') {
    return { isValid: false, error: 'Height is required' };
  }

  const h = Number(height);

  if (isNaN(h)) {
    return { isValid: false, error: 'Height must be a number' };
  }

  if (h < 30 || h > 300) {
    return { isValid: false, error: 'Height must be between 30 and 300 cm' };
  }

  return { isValid: true, error: null };
};

/**
 * Validate form data
 * @param {Object} data - Form data to validate
 * @param {Object} rules - Validation rules
 * @returns {Object} Validation result {isValid, errors}
 */
export const validateForm = (data, rules) => {
  const errors = {};
  let isValid = true;

  Object.keys(rules).forEach(field => {
    const rule = rules[field];
    const value = data[field];

    if (rule.required) {
      const result = validateRequired(value, rule.label || field);
      if (!result.isValid) {
        errors[field] = result.error;
        isValid = false;
        return;
      }
    }

    if (rule.type === 'email' && value) {
      const result = validateEmail(value);
      if (!result.isValid) {
        errors[field] = result.error;
        isValid = false;
      }
    }

    if (rule.type === 'phone' && value) {
      const result = validatePhone(value);
      if (!result.isValid) {
        errors[field] = result.error;
        isValid = false;
      }
    }

    if (rule.minLength && value) {
      const result = validateLength(value, rule.minLength, rule.maxLength || 1000, rule.label || field);
      if (!result.isValid) {
        errors[field] = result.error;
        isValid = false;
      }
    }

    if (rule.min !== undefined && rule.max !== undefined && value) {
      const result = validateRange(value, rule.min, rule.max, rule.label || field);
      if (!result.isValid) {
        errors[field] = result.error;
        isValid = false;
      }
    }

    if (rule.custom && value) {
      const result = rule.custom(value);
      if (!result.isValid) {
        errors[field] = result.error;
        isValid = false;
      }
    }
  });

  return { isValid, errors };
};

export default {
  validateEmail,
  validatePhone,
  validateName,
  validatePassword,
  validatePasswordConfirmation,
  validateAge,
  validateDateOfBirth,
  validatePincode,
  validateAadhar,
  validateRequired,
  validateURL,
  validateFileSize,
  validateFileType,
  validateRange,
  validateLength,
  validateBloodPressure,
  validateTemperature,
  validateHeartRate,
  validateWeight,
  validateHeight,
  validateForm
};