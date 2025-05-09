// context/HeaderContext.tsx
"use client";
import React, { createContext, useContext, useState } from "react";

interface HeaderContextProps {
  showHeader: boolean;
  setShowHeader: (value: boolean) => void;
}

const HeaderContext = createContext<HeaderContextProps>({
  showHeader: true,
  setShowHeader: () => {},
});

export const HeaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [showHeader, setShowHeader] = useState(true);

  return (
    <HeaderContext.Provider value={{ showHeader, setShowHeader }}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeaderContext = () => useContext(HeaderContext);
