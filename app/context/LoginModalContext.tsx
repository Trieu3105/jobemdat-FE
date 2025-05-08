// context/LoginModalContext.tsx
'use client'

import { createContext, useContext, useState } from "react";

interface LoginModalContextType {
  isLoginModalOpen: boolean;
  toggleLoginModal: () => void;
}

const LoginModalContext = createContext<LoginModalContextType | undefined>(undefined);

export const useLoginModal = () => {
  const context = useContext(LoginModalContext);
  if (!context) {
    throw new Error("useLoginModal must be used within a LoginModalProvider");
  }
  return context;
};

export const LoginModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const toggleLoginModal = () => setIsLoginModalOpen(!isLoginModalOpen);

  return (
    <LoginModalContext.Provider value={{ isLoginModalOpen, toggleLoginModal }}>
      {children}
    </LoginModalContext.Provider>
  );
};
