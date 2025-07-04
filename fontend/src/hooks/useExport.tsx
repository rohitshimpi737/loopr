import { useState } from 'react';
import type { TransactionFilters, ExportPreview } from '../types';
import * as apiService from '../services/apiService';
import { useAlert } from '../contexts/AlertContext';

export const useExport = () => {
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [exportPreview, setExportPreview] = useState<ExportPreview | null>(null);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    'date', 'amount', 'category', 'status', 'user_id', 'user_profile'
  ]);
  
  const { showAlert } = useAlert();

  const handleExport = async (filters: TransactionFilters) => {
    try {
      const preview = await apiService.getExportPreview(filters);
      setExportPreview(preview);
      setExportDialogOpen(true);
    } catch (err: any) {
      showAlert(err.message, 'error');
    }
  };

  const confirmExport = async (filters: TransactionFilters) => {
    try {
      const blob = await apiService.exportTransactionsCSV(filters, selectedColumns);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `transactions-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      setExportDialogOpen(false);
      showAlert('Export completed successfully!', 'success');
    } catch (err: any) {
      showAlert(err.message, 'error');
    }
  };

  return {
    exportDialogOpen,
    exportPreview,
    selectedColumns,
    setSelectedColumns,
    setExportDialogOpen,
    handleExport,
    confirmExport
  };
};