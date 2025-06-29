import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Avatar,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import {
  DataGrid,
  type GridColDef,
  GridToolbar,
} from '@mui/x-data-grid';
import {
  Search,
  FileDownload,
  FilterList,
  Clear,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import type { Transaction, TransactionFilters, PaginatedResponse } from '../types';
import { getTransactions, getUniqueUsers, exportTransactionsCSV, getExportPreview } from '../services/apiService';
import { useAlert } from '../contexts/AlertContext';

const TransactionsPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 20,
    total: 0,
  });
  
  // Filters
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
    limit: 20,
  });
  
  const [users, setUsers] = useState<{_id: string, name: string}[]>([]);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [exportColumns, setExportColumns] = useState([
    'id', 'date', 'amount', 'category', 'status', 'user_id'
  ]);
  const [exportPreview, setExportPreview] = useState<{ totalTransactions: number; message: string } | null>(null);
  const [exporting, setExporting] = useState(false);

  const { showAlert } = useAlert();

  const availableColumns = [
    { id: 'id', label: 'ID' },
    { id: 'date', label: 'Date' },
    { id: 'amount', label: 'Amount' },
    { id: 'category', label: 'Category' },
    { id: 'status', label: 'Status' },
    { id: 'user_id', label: 'User ID' },
    { id: 'user_profile', label: 'User Profile' },
  ];

  // Fetch data
  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      const response: PaginatedResponse<Transaction> = await getTransactions(filters);
      setTransactions(response.data);
      setPagination(prev => ({
        ...prev,
        total: response.pagination.totalItems,
        page: response.pagination.currentPage - 1, // DataGrid uses 0-based indexing
      }));
      setError('');
    } catch (err: any) {
      setError(err.message);
      showAlert(err.message, 'error');
    } finally {
      setLoading(false);
    }
  }, [filters, showAlert]);

  const fetchUsers = useCallback(async () => {
    try {
      const userList = await getUniqueUsers();
      setUsers(userList);
    } catch (err: any) {
      // Silently fail to fetch users
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Handle filter changes
  const handleFilterChange = (key: keyof TransactionFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1, // Reset to first page when filtering
    }));
  };

  const handlePageChange = (newPage: number) => {
    setFilters(prev => ({
      ...prev,
      page: newPage + 1, // Convert to 1-based indexing for API
    }));
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setFilters(prev => ({
      ...prev,
      limit: newPageSize,
      page: 1,
    }));
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
      limit: 20,
    });
  };

  // Export functionality
  const handleExportPreview = async () => {
    try {
      const preview = await getExportPreview(filters);
      setExportPreview(preview);
      setExportDialogOpen(true);
    } catch (err: any) {
      showAlert(err.message, 'error');
    }
  };

  const handleExport = async () => {
    try {
      setExporting(true);
      const blob = await exportTransactionsCSV(filters, exportColumns);
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `transactions-export-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      showAlert('Export completed successfully!', 'success');
      setExportDialogOpen(false);
    } catch (err: any) {
      showAlert(err.message, 'error');
    } finally {
      setExporting(false);
    }
  };

  const toggleExportColumn = (columnId: string) => {
    setExportColumns(prev => 
      prev.includes(columnId)
        ? prev.filter(id => id !== columnId)
        : [...prev, columnId]
    );
  };

  // DataGrid columns
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 80,
      sortable: false,
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 120,
      valueFormatter: (params) => {
        return new Date(params).toLocaleDateString();
      },
    },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 120,
      valueFormatter: (params) => {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(params);
      },
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === 'Revenue' ? 'success' : 'error'}
          size="small"
        />
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === 'Paid' ? 'success' : 'warning'}
          size="small"
        />
      ),
    },
    {
      field: 'user_id',
      headerName: 'User',
      width: 120,
    },
    {
      field: 'user_profile',
      headerName: 'Profile',
      width: 80,
      sortable: false,
      renderCell: (params) => (
        <Avatar
          src={params.value}
          alt={params.row.user_id}
          sx={{ width: 32, height: 32 }}
        />
      ),
    },
  ];

  if (error && !loading) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        <Typography variant="h4" gutterBottom>
          Transactions
        </Typography>

        {/* Filters */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <FilterList sx={{ mr: 1 }} />
            Filters
          </Typography>
          
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { 
              xs: '1fr', 
              md: '3fr 2fr 2fr 2fr 1.5fr 1.5fr' 
            },
            gap: 2,
            mb: 2 
          }}>
            <TextField
              fullWidth
              label="Search"
              value={filters.search || ''}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'action.active' }} />,
              }}
            />
            
            <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
              <Select
                value={filters.category || ''}
                label="Category"
                onChange={(e) => handleFilterChange('category', e.target.value || undefined)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Revenue">Revenue</MenuItem>
                <MenuItem value="Expense">Expense</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={filters.status || ''}
                label="Status"
                onChange={(e) => handleFilterChange('status', e.target.value || undefined)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Paid">Paid</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl fullWidth>
              <InputLabel>User</InputLabel>
              <Select
                value={filters.user_id || ''}
                label="User"
                onChange={(e) => handleFilterChange('user_id', e.target.value)}
              >
                <MenuItem value="">All Users</MenuItem>
                {users.map((user) => (
                  <MenuItem key={user._id} value={user._id}>
                    {user.name}
                  </MenuItem>
                  ))}
              </Select>
            </FormControl>
            
            <DatePicker
              label="From Date"
              value={filters.dateFrom ? new Date(filters.dateFrom) : null}
              onChange={(date) => handleFilterChange('dateFrom', date?.toISOString().split('T')[0])}
              slotProps={{ textField: { fullWidth: true } }}
            />
            
            <DatePicker
              label="To Date"
              value={filters.dateTo ? new Date(filters.dateTo) : null}
              onChange={(date) => handleFilterChange('dateTo', date?.toISOString().split('T')[0])}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </Box>
          
          <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<Clear />}
              onClick={clearFilters}
            >
              Clear Filters
            </Button>
            <Button
              variant="contained"
              startIcon={<FileDownload />}
              onClick={handleExportPreview}
            >
              Export CSV
            </Button>
          </Box>
        </Paper>

        {/* Data Table */}
        <Paper sx={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={transactions}
            columns={columns}
            loading={loading}
            pageSizeOptions={[10, 20, 50, 100]}
            paginationModel={{
              page: pagination.page,
              pageSize: pagination.pageSize,
            }}
            rowCount={pagination.total}
            paginationMode="server"
            onPaginationModelChange={(model) => {
              if (model.page !== pagination.page) {
                handlePageChange(model.page);
              }
              if (model.pageSize !== pagination.pageSize) {
                handlePageSizeChange(model.pageSize);
              }
            }}
            disableRowSelectionOnClick
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
          />
        </Paper>

        {/* Export Dialog */}
        <Dialog open={exportDialogOpen} onClose={() => setExportDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Export Transactions</DialogTitle>
          <DialogContent>
            {exportPreview && (
              <Alert severity="info" sx={{ mb: 2 }}>
                {exportPreview.message}
              </Alert>
            )}
            
            <Typography variant="h6" gutterBottom>
              Select Columns to Export:
            </Typography>
            
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr',
              gap: 1 
            }}>
              {availableColumns.map((column) => (
                <FormControlLabel
                  key={column.id}
                  control={
                    <Checkbox
                      checked={exportColumns.includes(column.id)}
                      onChange={() => toggleExportColumn(column.id)}
                    />
                  }
                  label={column.label}
                />
              ))}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setExportDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleExport}
              variant="contained"
              disabled={exporting || exportColumns.length === 0}
            >
              {exporting ? <CircularProgress size={20} /> : 'Export'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
};

export default TransactionsPage;
