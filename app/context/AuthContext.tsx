import React, { createContext, useState, ReactNode, useContext } from 'react';

interface AuthContextValue {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`User logged in with email: ${email}`);
    setIsAuthenticated(true);
  };

  const logout = () => {
    console.log("User logged out");
    setIsAuthenticated(false);
  };

  const register = async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`User registered with email: ${email} and password: ${password}`);
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
