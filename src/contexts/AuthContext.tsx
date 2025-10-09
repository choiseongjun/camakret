'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface User {
  id: number;
  email: string;
  name: string;
  profileImage?: string;
  googleId: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: () => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
  getAccessToken: () => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const getAccessToken = () => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('access_token');
  };

  const getRefreshToken = () => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('refresh_token');
  };

  const setTokens = (accessToken: string, refreshToken: string) => {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
  };

  const clearTokens = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    // next-auth 잔여물 제거
    localStorage.removeItem('jwtToken');
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('nextauth.')) {
        localStorage.removeItem(key);
      }
    });
  };

  const refreshAccessToken = async () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) return false;

    try {
      const response = await fetch(`${API_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      const data = await response.json();

      if (data.success && data.accessToken) {
        localStorage.setItem('access_token', data.accessToken);
        return true;
      }

      return false;
    } catch (error) {
      console.error('토큰 갱신 실패:', error);
      return false;
    }
  };

  const fetchCurrentUser = async () => {
    const accessToken = getAccessToken();

    if (!accessToken) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/current-user`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.status === 401) {
        // Access token 만료, refresh 시도
        const refreshed = await refreshAccessToken();
        if (refreshed) {
          // 재시도
          await fetchCurrentUser();
          return;
        } else {
          // Refresh 실패, 로그아웃
          clearTokens();
          setUser(null);
          setLoading(false);
          return;
        }
      }

      const data = await response.json();

      if (data.success && data.user) {
        setUser(data.user);
      } else {
        setUser(null);
        clearTokens();
      }
    } catch (error) {
      console.error('사용자 정보 조회 실패:', error);
      setUser(null);
      clearTokens();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // next-auth 잔여물 한 번 정리
    if (typeof window !== 'undefined') {
      localStorage.removeItem('jwtToken');
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('nextauth.')) {
          localStorage.removeItem(key);
        }
      });
    }

    fetchCurrentUser();
  }, []);

  const login = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  const logout = async () => {
    try {
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        await fetch(`${API_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken }),
        });
      }

      clearTokens();
      setUser(null);
      window.location.href = '/';
    } catch (error) {
      console.error('로그아웃 실패:', error);
      clearTokens();
      setUser(null);
    }
  };

  const refreshUser = async () => {
    await fetchCurrentUser();
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshUser, getAccessToken }}>
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
