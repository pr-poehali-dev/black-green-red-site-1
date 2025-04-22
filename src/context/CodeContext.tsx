import React, { createContext, useState, useContext, ReactNode } from 'react';

type CodeData = {
  code: string;
  description: string;
  images: string[];
};

interface CodeContextType {
  codes: Record<string, CodeData>;
  addCode: (code: string, description: string, images: string[]) => void;
  getCode: (code: string) => CodeData | null;
}

const CodeContext = createContext<CodeContextType | undefined>(undefined);

export const CodeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [codes, setCodes] = useState<Record<string, CodeData>>({});

  const addCode = (code: string, description: string, images: string[]) => {
    setCodes(prev => ({
      ...prev,
      [code]: { code, description, images }
    }));
  };

  const getCode = (code: string) => {
    return codes[code] || null;
  };

  return (
    <CodeContext.Provider value={{ codes, addCode, getCode }}>
      {children}
    </CodeContext.Provider>
  );
};

export const useCodeContext = () => {
  const context = useContext(CodeContext);
  if (context === undefined) {
    throw new Error('useCodeContext must be used within a CodeProvider');
  }
  return context;
};
