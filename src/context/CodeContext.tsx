import { createContext, useContext, useState, ReactNode } from "react";

type CodeItem = {
  code: string;
  description: string;
  images: string[];
};

type CodeContextType = {
  codes: CodeItem[];
  addCode: (code: CodeItem) => void;
  getCode: (code: string) => CodeItem | undefined;
};

const CodeContext = createContext<CodeContextType | undefined>(undefined);

export const useCodeContext = () => {
  const context = useContext(CodeContext);
  if (context === undefined) {
    throw new Error("useCodeContext must be used within a CodeProvider");
  }
  return context;
};

export const CodeProvider = ({ children }: { children: ReactNode }) => {
  const [codes, setCodes] = useState<CodeItem[]>([
    {
      code: "matrix",
      description: "Матрица (англ. The Matrix) — американский научно-фантастический боевик 1999 года. В фильме представлен мир, в котором реальность, существующая для большинства людей, является на самом деле симуляцией типа «мозг в колбе», созданной разумными машинами.",
      images: ["/placeholder.svg", "/placeholder.svg"]
    }
  ]);

  const addCode = (newCode: CodeItem) => {
    setCodes((prevCodes) => [...prevCodes, newCode]);
  };

  const getCode = (searchCode: string) => {
    return codes.find((item) => item.code.toLowerCase() === searchCode.toLowerCase());
  };

  return (
    <CodeContext.Provider value={{ codes, addCode, getCode }}>
      {children}
    </CodeContext.Provider>
  );
};
