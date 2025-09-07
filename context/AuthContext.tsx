"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';

interface User {
  id: number;
}

interface AppContextType {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }){
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        const decodedUser = jwtDecode<User>(storedToken);
        setUser(decodedUser);
        setToken(storedToken);
      } catch (error) {
        console.error("Invalid token found", error);
        localStorage.removeItem('token');
      }
    }
  }, []);

  const login = (newToken: string) => {
    try {
      const decodedUser = jwtDecode<User>(newToken);
      localStorage.setItem('token', newToken);
      setUser(decodedUser);
      setToken(newToken);
    } catch (error) {
      console.error("Failed to decode token on login", error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  };

  const value = {
    user,
    token,
    isLoggedIn: !!user,
    login,
    logout,
  };

   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}