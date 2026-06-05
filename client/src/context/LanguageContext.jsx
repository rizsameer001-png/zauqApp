// client/src/context/LanguageContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || 'en');
  const [isRTL, setIsRTL] = useState(false);

  const languages = {
    en: { name: 'English', native: 'English', flag: '🇬🇧', dir: 'ltr', rtl: false },
    hi: { name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳', dir: 'ltr', rtl: false },
    ur: { name: 'Urdu', native: 'اردو', flag: '🇵🇰', dir: 'rtl', rtl: true }
  };

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    setCurrentLanguage(langCode);
    localStorage.setItem('i18nextLng', langCode);
    
    const isRtlLanguage = languages[langCode]?.rtl || false;
    setIsRTL(isRtlLanguage);
    
    if (isRtlLanguage) {
      document.documentElement.dir = 'rtl';
      document.documentElement.setAttribute('dir', 'rtl');
      document.body.classList.add('rtl');
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.setAttribute('dir', 'ltr');
      document.body.classList.remove('rtl');
    }
  };

  useEffect(() => {
    const savedLang = localStorage.getItem('i18nextLng') || 'en';
    changeLanguage(savedLang);
  }, []);

  return (
    <LanguageContext.Provider value={{ currentLanguage, isRTL, changeLanguage, languages }}>
      {children}
    </LanguageContext.Provider>
  );
};