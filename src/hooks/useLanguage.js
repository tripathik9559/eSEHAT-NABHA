// src/hooks/useLanguage.js

import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

/**
 * Custom hook to access language context
 * Provides current language, translation function, and language switching
 * 
 * @returns {Object} Language context value
 * @returns {string} language - Current language code (e.g., 'en', 'hi', 'pa')
 * @returns {Function} setLanguage - Function to change language
 * @returns {Function} t - Translation function that takes a key and returns translated text
 * @returns {Object} translations - All translations for current language
 */
export const useLanguage = () => {
  const context = useContext(LanguageContext);

  // Throw error if hook is used outside LanguageProvider
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }

  return context;
};

export default useLanguage;