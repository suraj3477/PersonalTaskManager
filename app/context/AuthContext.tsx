// context/AuthContext.tsx
import React, { createContext, useState, ReactNode, useContext } from 'react';

// Define the shape of your context value
interface AuthContextValue {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string) => Promise<void>; // Define register function
}

// Create the AuthContext with an initial undefined value
export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// Props for AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider component to wrap your application with authentication context
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Dummy login function (replace with actual implementation)
  const login = async (email: string, password: string) => {
    // Example: Simulating login with a delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`User logged in with email: ${email}`);
    setIsAuthenticated(true); // Set isAuthenticated to true upon successful login
  };

  // Dummy logout function (replace with actual implementation)
  const logout = () => {
    // Example: Simulating logout
    console.log("User logged out");
    setIsAuthenticated(false); // Set isAuthenticated to false upon logout
  };

  // Dummy register function (replace with actual implementation)
  const register = async (email: string, password: string) => {
    // Example: Simulating registration with a delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`User registered with email: ${email} and password: ${password}`);
    setIsAuthenticated(true); // Assuming registration also logs in the user
  };

  // Provide the context value to consuming components
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, register }}>
      {children}  
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider'); // Ensure useAuth is used within AuthProvider
  }
  return context;
};
