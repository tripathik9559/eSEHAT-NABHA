import React, { createContext, useContext, useState, useEffect } from 'react';

export const LanguageContext = createContext();



export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [translations, setTranslations] = useState({});

  // Load translations on language change
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const translationModule = await import('../data/translations.js');
        setTranslations(translationModule.default || translationModule.translations);
      } catch (error) {
        console.error('Error loading translations:', error);
        setTranslations({});
      }
    };
    
    loadTranslations();
  }, [currentLanguage]);

  // Get saved language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage && ['en', 'hi', 'pa'].includes(savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (languageCode) => {
    if (['en', 'hi', 'pa'].includes(languageCode)) {
      setCurrentLanguage(languageCode);
      localStorage.setItem('selectedLanguage', languageCode);
    }
  };

  const translate = (key, fallback = key) => {
    if (!translations[currentLanguage]) {
      return fallback;
    }
    return translations[currentLanguage][key] || fallback;
  };

  const value = {
    currentLanguage,
    changeLanguage,
    translate,
    availableLanguages: [
      { code: 'en', name: 'English', nativeName: 'English' },
      { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
      { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' }
    ]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};