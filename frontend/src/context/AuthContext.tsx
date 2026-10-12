import React, { createContext, useContext, useState, useEffect } from 'react';
import { IUser } from '../types';
import { api, setAuthToken, removeAuthToken, getAuthToken } from '../services/api';
import { useToast } from './ToastContext';

interface AuthContextType {
  user: IUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (userData: { name: string; email: string; phone?: string; password: string }) => Promise<void>;
  logout: () => void;
  updateUser: (updatedData: Partial<IUser>) => void;
  demoLoginCustomer: () => Promise<void>;
  demoLoginAdmin: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(() => {
    const token = getAuthToken();
    const saved = localStorage.getItem('toyverse_user');
    if (!token) return null;
    try {
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState<boolean>(true);
  const { success, error } = useToast();

  useEffect(() => {
    const initAuth = async () => {
      const token = getAuthToken();
      if (!token) {
        setUser(null);
        localStorage.removeItem('toyverse_user');
        setLoading(false);
        return;
      }

      try {
        const res = await api.getProfile();
        if (res.success && res.data) {
          setUser(res.data);
          localStorage.setItem('toyverse_user', JSON.stringify(res.data));
        } else {
          removeAuthToken();
          localStorage.removeItem('toyverse_user');
          setUser(null);
        }
      } catch (err) {
        console.warn('Session expired or invalid, clearing auth');
        removeAuthToken();
        localStorage.removeItem('toyverse_user');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    const handleAuthExpired = () => {
      setUser(null);
    };

    window.addEventListener('toyverse_auth_expired', handleAuthExpired);
    initAuth();

    return () => {
      window.removeEventListener('toyverse_auth_expired', handleAuthExpired);
    };
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const res = await api.login(credentials);
      if (res.success && res.data) {
        setAuthToken(res.data.token);
        setUser(res.data);
        localStorage.setItem('toyverse_user', JSON.stringify(res.data));
        success(`Welcome back, ${res.data.name}!`);
      }
    } catch (err: any) {
      error(err.message || 'Login failed. Please check credentials.');
      throw err;
    }
  };

  const register = async (userData: { name: string; email: string; phone?: string; password: string }) => {
    try {
      const res = await api.register(userData);
      if (res.success && res.data) {
        setAuthToken(res.data.token);
        setUser(res.data);
        localStorage.setItem('toyverse_user', JSON.stringify(res.data));
        success(`Welcome to ToyVerse, ${res.data.name}!`);
      }
    } catch (err: any) {
      error(err.message || 'Registration failed');
      throw err;
    }
  };

  const logout = () => {
    removeAuthToken();
    localStorage.removeItem('toyverse_user');
    setUser(null);
    success('Logged out successfully');
    if (window.location.pathname !== '/login') {
      window.location.href = '/login';
    }
  };

  const updateUser = (updatedData: Partial<IUser>) => {
    if (user) {
      const updated = { ...user, ...updatedData };
      setUser(updated);
      localStorage.setItem('toyverse_user', JSON.stringify(updated));
    }
  };

  const demoLoginCustomer = async () => {
    await login({
      email: 'customer@toyverse.com',
      password: 'Customer@12345',
    });
  };

  const demoLoginAdmin = async () => {
    await login({
      email: 'admin@toyverse.com',
      password: 'Admin@12345',
    });
  };

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated: !!user && !!getAuthToken(),
    isAdmin: user?.role === 'admin' && !!getAuthToken(),
    login,
    register,
    logout,
    updateUser,
    demoLoginCustomer,
    demoLoginAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
