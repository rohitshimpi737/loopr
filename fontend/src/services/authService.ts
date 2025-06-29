import axios from 'axios';
import type { AuthResponse, User } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const authApi = axios.create({
  baseURL: `${API_BASE_URL}/auth`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await authApi.post('/login', { email, password });
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error('Login failed. Please try again.');
  }
};

export const register = async (email: string, password: string, name?: string): Promise<AuthResponse> => {
  try {
    const response = await authApi.post('/register', { email, password, name });
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error('Registration failed. Please try again.');
  }
};

export const verifyToken = async (token: string): Promise<{ user: User }> => {
  try {
    const response = await authApi.get('/verify', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error('Token verification failed.');
  }
};

export const logout = async (token: string): Promise<void> => {
  try {
    await authApi.post('/logout', {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    // Logout errors are not critical
    console.warn('Logout request failed:', error);
  }
};
