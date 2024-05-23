import React, { createContext, ReactNode, useContext, useState } from 'react';

type Language = 'ja' | 'en';

interface LanguageContextProps {
    language: Language;
    setLanguage: (language: Language) => void;
  }
  
  interface LanguageProviderProps {
    children: ReactNode;
  }

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('ja');
  
    return (
      <LanguageContext.Provider value={{ language, setLanguage }}>
        {children}
      </LanguageContext.Provider>
    );
  };

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
