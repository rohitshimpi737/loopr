import axios from 'axios';
import type { 
  Transaction, 
  DashboardSummary, 
  TransactionFilters, 
  PaginatedResponse, 
  ExportPreview 
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle auth errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Dashboard API
export const getDashboardSummary = async (): Promise<DashboardSummary> => {
  try {
    const response = await api.get('/dashboard/summary');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Failed to fetch dashboard data');
  }
};

// Transactions API
export const getTransactions = async (filters: TransactionFilters = {}): Promise<PaginatedResponse<Transaction>> => {
  try {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString());
      }
    });

    const response = await api.get(`/transactions?${params.toString()}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Failed to fetch transactions');
  }
};

export const getTransactionById = async (id: string): Promise<Transaction> => {
  try {
    const response = await api.get(`/transactions/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Failed to fetch transaction');
  }
};

export const getUniqueUsers = async (): Promise<{_id: string, name: string}[]> => {
  try {
    const response = await api.get('/transactions/users');
    return response.data.users;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Failed to fetch users');
  }
};

// Export API
export const exportTransactionsCSV = async (filters: TransactionFilters = {}, selectedColumns: string[] = []): Promise<Blob> => {
  try {
    const response = await api.post('/export/csv', {
      filters,
      columns: selectedColumns,
    }, {
      responseType: 'blob',
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Failed to export transactions');
  }
};

export const getExportPreview = async (filters: TransactionFilters = {}): Promise<ExportPreview> => {
  try {
    const response = await api.post('/export/preview', { filters });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Failed to get export preview');
  }
};

// Auth API
export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Login failed');
  }
};

export const register = async (email: string, password: string, name: string) => {
  try {
    const response = await api.post('/auth/register', { email, password, name });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Registration failed');
  }
};

export const verifyToken = async () => {
  try {
    const response = await api.get('/auth/verify');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Token verification failed');
  }
};

export const logout = async () => {
  try {
    await api.post('/auth/logout');
    localStorage.removeItem('token');
  } catch (error: any) {
    // Still remove token even if API call fails
    localStorage.removeItem('token');
    throw new Error(error.response?.data?.error || 'Logout failed');
  }
};