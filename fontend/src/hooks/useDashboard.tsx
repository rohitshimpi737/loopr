import { useState, useEffect } from 'react';
import  type { DashboardSummary } from '../types';
import * as apiService from '../services/apiService';
import { useAlert } from '../contexts/AlertContext';

export const useDashboard = () => {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { showAlert } = useAlert();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await apiService.getDashboardSummary();
        setSummary(data);
        setError('');
      } catch (err: any) {
        setError(err.message);
        showAlert(err.message, 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [showAlert]);

  return { summary, loading, error };
};