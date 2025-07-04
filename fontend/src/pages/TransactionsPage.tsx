import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import type { GridSortModel } from '@mui/x-data-grid';
import * as apiService from '../services/apiService';
import { formatCurrency, formatDate, formatUserName } from '../utils/formatUtils';
import { useTransactions } from '../hooks/useTransactions';
import { useExport } from '../hooks/useExport';
import LoadingScreen from '../components/LoadingScreen';
import ErrorScreen from '../components/ErrorScreen';
import TransactionsTable from '../components/dahsboard/TransactionsTable';
import ExportDialog from '../components/dahsboard/ExportDialog';

const TransactionsPage: React.FC = () => {
  // Custom hooks
  const { transactions, loading, filters, updateFilters, clearFilters, setFilters } = useTransactions();
  const { 
    exportDialogOpen, 
    exportPreview, 
    selectedColumns, 
    setSelectedColumns, 
    setExportDialogOpen, 
    handleExport, 
    confirmExport 
  } = useExport();

  // Local state
  const [users, setUsers] = useState<{ _id: string, name: string }[]>([]);
  const [error, setError] = useState('');

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userList = await apiService.getUniqueUsers();
        setUsers(userList || []);
      } catch (err: any) {
        setError(err.message);
      }
    };
    fetchUsers();
  }, []);

  // Event handlers using hook functions
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    updateFilters({ search: value });
  };

  const handleFilterChange = (field: keyof typeof filters, value: any) => {
    updateFilters({ [field]: value });
  };

  const handleSortChange = (sortModel: GridSortModel) => {
    if (sortModel.length > 0) {
      const { field, sort } = sortModel[0];
      updateFilters({
        sortBy: field,
        sortOrder: sort as 'asc' | 'desc'
      });
    }
  };

  const handlePageChange = (newPage: number) => {
    setFilters(prev => ({ ...prev, page: newPage + 1 }));
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setFilters(prev => ({ ...prev, limit: newPageSize, page: 1 }));
  };

  // Calculate active filter count
  const activeFilterCount = Object.entries(filters).filter(([key, value]) => {
    if (key === 'page' || key === 'limit' || key === 'sortBy' || key === 'sortOrder') {
      return false;
    }
    return value !== undefined && value !== null && value !== '';
  }).length;

  // Export handlers
  const handleExportClick = () => {
    handleExport(filters);
  };

  const handleConfirmExport = () => {
    confirmExport(filters);
  };

  const handleColumnToggle = (column: string, checked: boolean) => {
    if (checked) {
      setSelectedColumns([...selectedColumns, column]);
    } else {
      setSelectedColumns(selectedColumns.filter(c => c !== column));
    }
  };

  // Loading state
  if (loading) {
    return <LoadingScreen message="Loading Transactions..." />;
  }

  // Error state
  if (error) {
    return <ErrorScreen error={error} />;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        <Typography variant="h4" gutterBottom>
          💳 All Transactions
        </Typography>

        {/* Transactions Table */}
        <TransactionsTable
          transactions={transactions}
          loading={loading}
          filters={filters}
          users={users}
          activeFilterCount={activeFilterCount}
          formatCurrency={formatCurrency}
          formatDate={formatDate}
          formatUserName={formatUserName}
          onSearchChange={handleSearchChange}
          onFilterChange={handleFilterChange}
          onClearFilters={clearFilters}
          onSortChange={handleSortChange}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          onExport={handleExportClick}
        />

        {/* Export Dialog */}
        <ExportDialog
          open={exportDialogOpen}
          onClose={() => setExportDialogOpen(false)}
          exportPreview={exportPreview}
          selectedColumns={selectedColumns}
          onColumnToggle={handleColumnToggle}
          onConfirm={handleConfirmExport}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default TransactionsPage;
