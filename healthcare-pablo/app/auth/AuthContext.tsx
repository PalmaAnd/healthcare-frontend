import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

type AuthContextType = {
  token: string | null;
  setToken: (token: string | null) => void;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('userToken');
        if (storedToken) {
          setToken(storedToken);
        }
      } catch (e) {
        console.error('Failed to load token:', e);
      } finally {
        setIsLoading(false);
      }
    };

    loadToken();
  }, []);

  const login = async (username: string, password: string) => {
    // Simulate API call to backend
    setIsLoading(true);
    try {
      // Replace this with actual API call
      const response = await new Promise<{ token: string }>((resolve) =>
        setTimeout(() => resolve({ token: 'fake-jwt-token' }), 1000)
      );

      await AsyncStorage.setItem('userToken', response.token);
      setToken(response.token);
      router.replace('/(auth)/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login error (e.g., show error message)
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setToken(null);
    await AsyncStorage.removeItem('userToken');
    router.replace('/');
  };

  return (
    <AuthContext.Provider value={{ token, setToken, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthProvider;