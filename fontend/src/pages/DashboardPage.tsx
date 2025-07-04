import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Typography,
  Button,
  Tooltip,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  AccountBalance,
  Savings,
  Refresh,
} from '@mui/icons-material';

import type { GridSortModel } from '@mui/x-data-grid';
import type { TransactionFilters } from '../types';
import * as apiService from '../services/apiService';
import DeveloperFooter from '../components/DeveloperFooter';
import DeveloperBanner from '../components/DeveloperBanner';
import LoadingScreen from '../components/LoadingScreen';
import ErrorScreen from '../components/ErrorScreen';
import StatCard from '../components/dahsboard/StatCard';
import DashboardChart from '../components/dahsboard/DashboardChart';
import RecentTransactions from '../components/dahsboard/RecentTransactions';
import TransactionsTable from '../components/dahsboard/TransactionsTable';
import ExportDialog from '../components/dahsboard/ExportDialog';
import { processChartData } from '../utils/chartUtils';
import { formatCurrency, formatDate, formatUserName } from '../utils/formatUtils';
import { useDashboard } from '../hooks/useDashboard';
import { useTransactions } from '../hooks/useTransactions';
import { useExport } from '../hooks/useExport';


const DashboardPage: React.FC =() => {
  // Custom hooks
  const { summary, loading, error } = useDashboard();
  const { transactions, loading: transactionsLoading, filters, updateFilters, clearFilters, setFilters } = useTransactions();
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
  const [timePeriod, setTimePeriod] = useState<'month' | 'quarter' | 'year'>('month');
  const [users, setUsers] = useState<{ _id: string, name: string }[]>([]);

  // Memoized chart data
  const chartData = useMemo(() => {
    if (!summary?.monthlyData) return [];
    return processChartData(summary.monthlyData, timePeriod);
  }, [summary?.monthlyData, timePeriod]);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await apiService.getUniqueUsers();
        console.log('Fetched users:', users);
        setUsers(users || []);
      } catch (error) {
        // Error fetching users - silently fail
      }
    }
    fetchUsers();
  }, []);

  // Event handlers
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    updateFilters({ search: value });
  }

  const handleFilterChange = (field: keyof TransactionFilters, value: any) => {
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

  // Calculate active filter count
  const activeFilterCount = Object.entries(filters).filter(([key, value]) => {
    if (key === 'page' || key === 'limit' || key === 'sortBy' || key === 'sortOrder') {
      return false;
    }
    return value !== undefined && value !== null && value !== '';
  }).length;

  // Loading state
  if (loading) {
    return <LoadingScreen 
      message="Loading Dashboard..." 
      description="Fetching your financial data and analytics"
    />;
  }

  // Error state
  if (error || !summary) {
    return <ErrorScreen error={error} />;
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#FFFFFF' }}>
          💎 Penta Dashboard
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Tooltip title="Refresh all dashboard data">
            <Button
              variant="outlined"
              startIcon={<Refresh />}
              onClick={() => window.location.reload()}
              sx={{
                borderColor: '#00D4AA',
                color: '#00D4AA',
                minWidth: 'auto',
                px: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: '#00B894',
                  backgroundColor: 'rgba(0, 212, 170, 0.1)',
                  transform: 'scale(1.05)',
                }
              }}
            >
              Refresh
            </Button>
          </Tooltip>
        </Box>
      </Box>

      {/* Summary Cards */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr 1fr' },
        gap: 3,
        mb: 4
      }}>
        <StatCard
          title="Total Revenue"
          value={formatCurrency(summary.totalRevenue)}
          icon={<TrendingUp sx={{ fontSize: 32 }} />}
          gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        />
        <StatCard
          title="Total Expenses"
          value={formatCurrency(summary.totalExpenses)}
          icon={<TrendingDown sx={{ fontSize: 32 }} />}
          gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
        />
        <StatCard
          title="Net Balance"
          value={formatCurrency(summary.totalBalance)}
          icon={<AccountBalance sx={{ fontSize: 32 }} />}
          gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
        />
        <StatCard
          title="Total Savings"
          value={formatCurrency(summary.totalBalance > 0 ? summary.totalBalance * 0.15 : 0)}
          icon={<Savings sx={{ fontSize: 32 }} />}
          gradient="linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
        />
      </Box>

      {/* Charts */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' },
        gap: 3,
        mb: 4
      }}>
        <DashboardChart
          chartData={chartData}
          timePeriod={timePeriod}
          setTimePeriod={setTimePeriod}
          loading={loading}
        />
        <RecentTransactions
          transactions={transactions.data}
          formatCurrency={formatCurrency}
          formatDate={formatDate}
          formatUserName={formatUserName}
        />
      </Box>

      {/* Transactions Table */}
      <TransactionsTable
        transactions={transactions}
        loading={transactionsLoading}
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

      <DeveloperFooter />
      <DeveloperBanner />
    </Box>
  );
};

export default DashboardPage;