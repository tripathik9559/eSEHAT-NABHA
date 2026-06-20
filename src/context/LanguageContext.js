import React, { createContext, useContext, useState } from 'react';
import { TRANSLATIONS } from '../data/demoData';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('esehat_lang') || 'en';
  });

  const t = (key) => {
    const lang = TRANSLATIONS[language] || TRANSLATIONS.en;
    return lang[key] || TRANSLATIONS.en[key] || key;
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('esehat_lang', lang);
  };

  const languages = [
    { code: 'en', label: 'English', nativeLabel: 'English', flag: '🇬🇧' },
    { code: 'hi', label: 'Hindi', nativeLabel: 'हिंदी', flag: '🇮🇳' },
    { code: 'pa', label: 'Punjabi', nativeLabel: 'ਪੰਜਾਬੀ', flag: '🏳️' },
  ];

  return (
    <LanguageContext.Provider value={{ language, t, changeLanguage, languages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
