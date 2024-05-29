import React, { createContext, useState, useContext, ReactNode } from 'react';

interface CheckContextProps {
  isCheckedBool: boolean;
  setIsCheckedBool: (checked: boolean) => void;
}

const CheckContext = createContext<CheckContextProps | undefined>(undefined);

export const useCheckContext = () => {
  const context = useContext(CheckContext);
  if (!context) {
    throw new Error('useCheckContext must be used within a CheckProvider');
  }
  return context;
};

export const CheckProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isCheckedBool, setIsCheckedBool] = useState<boolean>(false);

  return (
    <CheckContext.Provider value={{ isCheckedBool, setIsCheckedBool }}>
      {children}
    </CheckContext.Provider>
  );
};
