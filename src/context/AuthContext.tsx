import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:5001/api';

export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  location: string;
  profileImage: string;
  assessmentProgress: number;
  currentCourseId: string;
  completedDays: Record<string, number>;
  performanceScores: Record<string, number[]>;
  createdAt: string;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<AuthUser>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('jobsim_token'));
  const [isLoading, setIsLoading] = useState(true);

  // Attach token to all axios requests
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // On mount: if we have a stored token, fetch the current user
  const fetchCurrentUser = useCallback(async () => {
    if (!token) { setIsLoading(false); return; }
    try {
      const res = await axios.get(`${API_BASE}/auth/me`);
      if (res.data.success) setUser(res.data.user);
    } catch {
      // Token invalid / expired — clear it
      localStorage.removeItem('jobsim_token');
      setToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => { fetchCurrentUser(); }, [fetchCurrentUser]);

  const signup = async (name: string, email: string, password: string) => {
    try {
      const res = await axios.post(`${API_BASE}/auth/signup`, { name, email, password });
      if (res.data.success) {
        const { token: newToken, user: newUser } = res.data;
        localStorage.setItem('jobsim_token', newToken);
        setToken(newToken);
        setUser(newUser);
        return { success: true };
      }
      return { success: false, message: res.data.message };
    } catch (err: any) {
      return { success: false, message: err.response?.data?.message || 'Signup failed' };
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post(`${API_BASE}/auth/login`, { email, password });
      if (res.data.success) {
        const { token: newToken, user: newUser } = res.data;
        localStorage.setItem('jobsim_token', newToken);
        setToken(newToken);
        setUser(newUser);
        return { success: true };
      }
      return { success: false, message: res.data.message };
    } catch (err: any) {
      return { success: false, message: err.response?.data?.message || 'Login failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('jobsim_token');
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  const updateProfile = async (data: Partial<AuthUser>) => {
    try {
      const res = await axios.put(`${API_BASE}/auth/profile`, data);
      if (res.data.success) setUser(res.data.user);
    } catch (err) {
      console.error('Profile update failed:', err);
    }
  };

  return (
    <AuthContext.Provider value={{
      user, token, isLoading, isAuthenticated: !!user,
      signup, login, logout, updateProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
