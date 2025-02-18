import React, { createContext, useState, useContext, ReactNode } from 'react';
import { CountryCode } from '../utils/countryNameRecord';

type Language = 'en' | 'fr' | 'cn';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
});

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Get language from localStorage, default to 'en'
    const storedLanguage = localStorage.getItem('appLanguage') as Language;
    return storedLanguage || 'en';
  });

  const updateLanguage = (newLanguage: Language) => {
    // Update localStorage
    localStorage.setItem('appLanguage', newLanguage);
    
    // Set language and reload page to apply translations
    setLanguage(newLanguage);
    window.location.reload();
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: updateLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

export const languageFlags: Record<Language, CountryCode> = {
  en: 'US',
  fr: 'FR',
  cn: 'CN'
};

export const translations = {
  en: {
    home: 'Home',
    portfolio: 'My Projects',
    contact: 'Contact',
    title: 'Full Stack Developer / Cyber Security Enthusiast / Low Code',
    description: 'Building secure and efficient applications with a blend of full-stack development, cybersecurity expertise, and low-code solutions.',
    downloadCV: 'Download CV',
  },
  fr: {
    home: 'Accueil',
    portfolio: 'Mes Projets',
    contact: 'Contact',
    title: 'Développeur Full Stack / Passionné de Cybersécurité / Low Code',
    description: 'Création d\'applications sécurisées et efficaces combinant développement full-stack, expertise en cybersécurité et solutions low-code.',
    downloadCV: 'Télécharger CV',
  },
  cn: {
    home: '主页',
    portfolio: '我的项目',
    contact: '联系',
    title: '全栈开发者 / 网络安全爱好者 / 低代码',
    description: '通过结合全栈开发、网络安全专业知识和低代码解决方案，构建安全高效的应用程序。',
    downloadCV: '下载简历',
  }
};
