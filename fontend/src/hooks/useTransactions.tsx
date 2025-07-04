import { useState, useEffect, useCallback } from 'react';
import type { Transaction, TransactionFilters, PaginatedResponse } from '../types';
import * as apiService from '../services/apiService';
import { useAlert } from '../contexts/AlertContext';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<PaginatedResponse<Transaction>>({
    data: [],
    pagination: { currentPage: 1, totalPages: 1, totalItems: 0, itemsPerPage: 10 }
  });
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<TransactionFilters>({
    search: '',
    category: undefined,
    status: undefined,
    user_id: '',
    dateFrom: undefined,
    dateTo: undefined,
    sortBy: 'date',
    sortOrder: 'desc',
    page: 1,
    limit: 10,
  });
  
  const { showAlert } = useAlert();

  // debounced fetch for transactions
  // This will prevent excessive API calls when filters change rapidly
  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      const data = await apiService.getTransactions(filters);
      setTransactions(data);
    } catch (err: any) {
      showAlert(err.message, 'error');
    } finally {
      setLoading(false);
    }
  }, [filters, showAlert]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchTransactions();
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [fetchTransactions]);

  const updateFilters = (newFilters: Partial<TransactionFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 1 }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: undefined,
      status: undefined,
      user_id: '',
      dateFrom: undefined,
      dateTo: undefined,
      sortBy: 'date',
      sortOrder: 'desc',
      page: 1,
      limit: 10,
    });
  };

  return {
    transactions,
    loading,
    filters,
    updateFilters,
    clearFilters,
    setFilters
  };
};