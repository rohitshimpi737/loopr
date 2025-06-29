import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button,
  Stack,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Avatar,
  InputAdornment,
  Tooltip,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  AccountBalance,
  Savings,
  Search,
  FileDownload,
  Clear,
  CalendarMonth,
  DateRange,
  CalendarToday,
  Refresh,
} from '@mui/icons-material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import type { GridColDef, GridSortModel } from '@mui/x-data-grid';
import { LineChart } from '@mui/x-charts';
import type {
  DashboardSummary,
  Transaction,
  TransactionFilters,
  PaginatedResponse,
  ExportPreview
} from '../types';
import * as apiService from '../services/apiService';
import { useAlert } from '../contexts/AlertContext';
import DeveloperFooter from '../components/DeveloperFooter';
import DeveloperBanner from '../components/DeveloperBanner';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
  gradient: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, gradient }) => (
  <Card sx={{ 
    height: '100%', 
    background: gradient,
    borderRadius: '16px',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3)',
    }
  }}>
    <CardContent sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography 
            color="white" 
            gutterBottom 
            variant="body2" 
            sx={{ 
              fontWeight: 500, 
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              opacity: 0.9,
              fontSize: '0.75rem',
              mb: 1
            }}
          >
            {title}
          </Typography>
          <Typography 
            variant="h4" 
            component="div" 
            sx={{ 
              color: 'white', 
              fontWeight: 700,
              fontSize: '2rem',
              lineHeight: 1.2,
              mb: 0.5
            }}
          >
            {value}
          </Typography>
          {trend && (
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'rgba(255,255,255,0.8)',
                fontSize: '0.8rem'
              }}
            >
              {trend}
            </Typography>
          )}
        </Box>
        <Box sx={{ 
          color: 'rgba(255, 255, 255, 0.9)', 
          display: 'flex', 
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          p: 1.5
        }}>
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const DashboardPage: React.FC = () => {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [transactions, setTransactions] = useState<PaginatedResponse<Transaction>>({
    data: [],
    pagination: { currentPage: 1, totalPages: 1, totalItems: 0, itemsPerPage: 10 }
  });
  const [loading, setLoading] = useState(true);
  const [transactionsLoading, setTransactionsLoading] = useState(false);
  const [error, setError] = useState('');
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [exportPreview, setExportPreview] = useState<ExportPreview | null>(null);

  // Filter states
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

  // Available export columns
  const availableColumns = [
    'date', 'amount', 'category', 'status', 'user_id', 'user_profile'
  ];
  const [selectedColumns, setSelectedColumns] = useState<string[]>(availableColumns);

  const [users, setUsers] = useState<{ _id: string, name: string }[]>([]);
  const [timePeriod, setTimePeriod] = useState<'month' | 'quarter' | 'year'>('month');

  // Add useEffect to fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await apiService.getUniqueUsers();
        setUsers(users || []);
      } catch (error) {
        // Error fetching users - silently fail
      }
    };
    fetchUsers();
  }, []);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
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

    fetchDashboardData();
  }, [showAlert]);

  // Fetch transactions with debounced search
  const fetchTransactions = useCallback(async () => {
    try {
      setTransactionsLoading(true);
      const data = await apiService.getTransactions(filters);
      setTransactions(data);
    } catch (err: any) {
      showAlert(err.message, 'error');
    } finally {
      setTransactionsLoading(false);
    }
  }, [filters, showAlert]);

  // Debounced effect for search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchTransactions();
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [fetchTransactions]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFilters(prev => ({ ...prev, search: value, page: 1 }));
  };

  const handleFilterChange = (field: keyof TransactionFilters, value: any) => {
    setFilters(prev => ({ ...prev, [field]: value, page: 1 }));
  };

  const handleSortChange = (sortModel: GridSortModel) => {
    if (sortModel.length > 0) {
      const { field, sort } = sortModel[0];
      setFilters(prev => ({
        ...prev,
        sortBy: field,
        sortOrder: sort as 'asc' | 'desc'
      }));
    }
  };

  const handlePageChange = (newPage: number) => {
    setFilters(prev => ({ ...prev, page: newPage + 1 }));
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setFilters(prev => ({ ...prev, limit: newPageSize, page: 1 }));
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

  const handleExport = async () => {
    try {
      const preview = await apiService.getExportPreview(filters);
      setExportPreview(preview);
      setExportDialogOpen(true);
    } catch (err: any) {
      showAlert(err.message, 'error');
    }
  };

  const confirmExport = async () => {
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatUserName = (userId: string) => {
    return userId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  // Process chart data based on selected time period (memoized for performance)
  const processChartData = useMemo(() => {
    return (data: any[], period: 'month' | 'quarter' | 'year'): { month: string; Revenue: number; Expenses: number }[] => {
      if (!data || data.length === 0) return [];

      interface ChartDataItem {
        month: string;
        Revenue: number;
        Expenses: number;
      }

      switch (period) {
        case 'quarter':
          // Group by quarter
          const quarterData: Record<string, ChartDataItem> = data.reduce((acc: Record<string, ChartDataItem>, item: any) => {
            const date = new Date(item.month + '-01');
            const quarter = Math.floor(date.getMonth() / 3) + 1;
            const year = date.getFullYear();
            const key = `Q${quarter} ${year}`;
            
            if (!acc[key]) {
              acc[key] = { month: key, Revenue: 0, Expenses: 0 };
            }
            acc[key].Revenue += item.revenue;
            acc[key].Expenses += item.expenses;
            return acc;
          }, {});
          return Object.values(quarterData).sort((a, b) => a.month.localeCompare(b.month));

        case 'year':
          // Group by year
          const yearData: Record<string, ChartDataItem> = data.reduce((acc: Record<string, ChartDataItem>, item: any) => {
            const year = item.month.substring(0, 4);
            
            if (!acc[year]) {
              acc[year] = { month: year, Revenue: 0, Expenses: 0 };
            }
            acc[year].Revenue += item.revenue;
            acc[year].Expenses += item.expenses;
            return acc;
          }, {});
          return Object.values(yearData).sort((a, b) => a.month.localeCompare(b.month));

        default:
          // Monthly data (default)
          return data.map(item => ({
            month: new Date(item.month + '-01').toLocaleDateString('en-US', { 
              month: 'short', 
              year: '2-digit' 
            }),
            Revenue: item.revenue,
            Expenses: item.expenses,
          })).sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());
      }
    };
  }, []);

  // Memoized chart data
  const chartData = useMemo(() => {
    if (!summary?.monthlyData) return [];
    return processChartData(summary.monthlyData, timePeriod);
  }, [summary?.monthlyData, timePeriod, processChartData]);

  // DataGrid columns with optimized styling
  const columns: GridColDef[] = [
    {
      field: 'date',
      headerName: 'Date',
      width: 140,
      minWidth: 120,
      flex: 0.8,
      valueFormatter: (value: string) => formatDate(value),
      renderCell: (params) => (
        <Typography 
          variant="body2" 
          sx={{ 
            fontWeight: 500,
            color: '#FFFFFF',
            fontSize: '0.875rem'
          }}
        >
          {formatDate(params.value)}
        </Typography>
      ),
    },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 140,
      minWidth: 120,
      flex: 0.9,
      align: 'right',
      headerAlign: 'right',
      renderCell: (params) => (
        <Typography 
          variant="body1" 
          sx={{ 
            fontWeight: 700,
            color: params.row.category === 'Revenue' ? '#00D4AA' : '#FF6B6B',
            fontSize: '0.95rem',
            textAlign: 'right',
            width: '100%'
          }}
        >
          {params.row.category === 'Revenue' ? '+' : '-'}{formatCurrency(Math.abs(params.value))}
        </Typography>
      ),
    },
    {
      field: 'category',
      headerName: 'Type',
      width: 120,
      minWidth: 100,
      flex: 0.7,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          sx={{
            backgroundColor: params.value === 'Revenue' 
              ? 'rgba(0, 212, 170, 0.15)' 
              : 'rgba(255, 107, 107, 0.15)',
            color: params.value === 'Revenue' ? '#00D4AA' : '#FF6B6B',
            border: `1px solid ${params.value === 'Revenue' ? '#00D4AA' : '#FF6B6B'}`,
            fontWeight: 600,
            fontSize: '0.75rem',
            height: '24px',
            '& .MuiChip-label': {
              px: 1.5
            }
          }}
        />
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 110,
      minWidth: 90,
      flex: 0.6,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          sx={{
            backgroundColor: params.value === 'Paid' 
              ? 'rgba(0, 212, 170, 0.15)' 
              : 'rgba(255, 217, 61, 0.15)',
            color: params.value === 'Paid' ? '#00D4AA' : '#FFD93D',
            border: `1px solid ${params.value === 'Paid' ? '#00D4AA' : '#FFD93D'}`,
            fontWeight: 600,
            fontSize: '0.75rem',
            height: '24px',
            '& .MuiChip-label': {
              px: 1.5
            }
          }}
        />
      ),
    },
    {
      field: 'user_id',
      headerName: 'User',
      width: 200,
      minWidth: 180,
      flex: 1.2,
      renderCell: (params) => (
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1.5,
          py: 0.5,
          width: '100%'
        }}>
          <Avatar
            src={params.row.user_profile}
            sx={{ 
              width: 36, 
              height: 36,
              border: '2px solid rgba(255, 255, 255, 0.1)',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            }}
          >
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 600 }}>
              {formatUserName(params.value)?.charAt(0)?.toUpperCase()}
            </Typography>
          </Avatar>
          <Box sx={{ flex: 1, overflow: 'hidden' }}>
            <Typography 
              variant="body2" 
              sx={{ 
                fontWeight: 600,
                color: '#FFFFFF',
                fontSize: '0.875rem',
                lineHeight: 1.2,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {formatUserName(params.value)}
            </Typography>
          </Box>
        </Box>
      ),
    },
  ];

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '60vh',
        gap: 3,
        p: 3
      }}>
        <CircularProgress 
          size={60} 
          sx={{ 
            color: '#00D4AA',
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
            }
          }} 
        />
        <Typography variant="h6" sx={{ color: '#FFFFFF', fontWeight: 500 }}>
          Loading Dashboard...
        </Typography>
        <Typography variant="body2" sx={{ color: '#A0A3B8', textAlign: 'center' }}>
          Fetching your financial data and analytics
        </Typography>
      </Box>
    );
  }

  if (error || !summary) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert 
          severity="error" 
          sx={{ 
            mb: 2,
            backgroundColor: 'rgba(255, 107, 107, 0.1)',
            borderColor: '#FF6B6B',
            color: '#FFFFFF',
            '& .MuiAlert-icon': {
              color: '#FF6B6B'
            }
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Dashboard Error
          </Typography>
          <Typography variant="body2">
            {error || 'Failed to load dashboard data. Please try refreshing the page.'}
          </Typography>
        </Alert>
        <Button 
          variant="contained"
          startIcon={<Refresh />}
          onClick={() => window.location.reload()}
          sx={{
            backgroundColor: '#00D4AA',
            '&:hover': {
              backgroundColor: '#00B894',
            }
          }}
        >
          Retry
        </Button>
      </Box>
    );
  }

  const activeFilterCount = Object.entries(filters).filter(([key, value]) => {
    if (key === 'page' || key === 'limit' || key === 'sortBy' || key === 'sortOrder') {
      return false; // Exclude pagination and sorting from filter count
    }
    return value !== undefined && value !== null && value !== '';
  }).length;

  const paginationModel = {
    page: transactions.pagination.currentPage - 1,
    pageSize: transactions.pagination.itemsPerPage,
  };

  return (
    <Box sx={{ p: 3 }}>
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
        {/* Monthly Revenue vs Expenses */}
        <Paper sx={{ 
          p: 3, 
          height: 420,
          borderRadius: '16px',
          background: 'linear-gradient(145deg, #161B22 0%, #1C2128 100%)',
          border: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600,
                color: '#FFFFFF',
                fontSize: '1.1rem',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              📈 Revenue vs Expenses 
              <Chip 
                label={`${timePeriod.charAt(0).toUpperCase() + timePeriod.slice(1)}ly View`}
                size="small"
                sx={{
                  backgroundColor: 'rgba(102, 126, 234, 0.2)',
                  color: '#667eea',
                  fontSize: '0.75rem',
                  height: '24px',
                  ml: 1
                }}
              />
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Tooltip title="Select time period for analysis">
                <FormControl size="small" sx={{ minWidth: 130 }}>
                  <InputLabel sx={{ color: '#A0A3B8', fontSize: '0.875rem' }}>Period</InputLabel>
                  <Select
                    value={timePeriod}
                    label="Period"
                    onChange={(e) => setTimePeriod(e.target.value as 'month' | 'quarter' | 'year')}
                    sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      borderRadius: '10px',
                      color: '#FFFFFF',
                      height: '38px',
                      transition: 'all 0.3s ease',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255, 255, 255, 0.15)',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(102, 126, 234, 0.6)',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#667eea',
                        borderWidth: '2px',
                      },
                      '& .MuiSelect-icon': {
                        color: '#A0A3B8',
                        transition: 'color 0.3s ease',
                      },
                      '&:hover .MuiSelect-icon': {
                        color: '#667eea',
                      },
                    }}
                  >
                    <MenuItem value="month" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CalendarToday sx={{ fontSize: 16 }} />
                      Monthly
                    </MenuItem>
                    <MenuItem value="quarter" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <DateRange sx={{ fontSize: 16 }} />
                      Quarterly
                    </MenuItem>
                    <MenuItem value="year" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CalendarMonth sx={{ fontSize: 16 }} />
                      Yearly
                    </MenuItem>
                  </Select>
                </FormControl>
              </Tooltip>
            </Box>
          </Box>
          

          <Box sx={{ height: 340 }}>
            {loading ? (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <CircularProgress sx={{ color: '#00D4AA' }} />
              </Box>
            ) : chartData.length > 0 ? (
              <LineChart
                dataset={chartData}
                xAxis={[{ 
                  scaleType: 'point', 
                  dataKey: 'month',
                }]}
                yAxis={[{}]}
                series={[
                  { 
                    dataKey: 'Revenue', 
                    label: 'Revenue', 
                    color: '#00D4AA',
                    curve: 'catmullRom',
                  },
                  { 
                    dataKey: 'Expenses', 
                    label: 'Expenses', 
                    color: '#FF6B6B',
                    curve: 'catmullRom',
                  },
                ]}
                height={320}
                margin={{ left: 80, right: 20, top: 20, bottom: 40 }}
                sx={{
                  '& .MuiChartsAxis-label': {
                    fill: '#FFFFFF',
                    fontSize: '12px',
                  },
                  '& .MuiChartsAxis-tick': {
                    stroke: 'rgba(255, 255, 255, 0.3)',
                  },
                  '& .MuiChartsAxis-line': {
                    stroke: 'rgba(255, 255, 255, 0.2)',
                  },
                  '& .MuiChartsLegend-root': {
                    '& text': {
                      fill: '#FFFFFF !important',
                    },
                  },
                  '& .MuiChartsTooltip-root': {
                    backgroundColor: 'rgba(26, 28, 34, 0.95)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    backdropFilter: 'blur(10px)',
                  },
                  '& .MuiLineElement-root': {
                    strokeWidth: 3,
                  },
                  '& .MuiMarkElement-root': {
                    r: 4,
                    strokeWidth: 2,
                    '&:hover': {
                      r: 6,
                    },
                  },
                  '& .MuiChartsGrid-line': {
                    stroke: 'rgba(255, 255, 255, 0.05)',
                  },
                }}
              />
            ) : (
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center', 
                justifyContent: 'center', 
                height: '100%',
                gap: 2
              }}>
                <Typography variant="h6" sx={{ color: '#A0A3B8' }}>
                  📊
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  No data available for {timePeriod}ly view
                </Typography>
                <Button 
                  size="small" 
                  onClick={() => window.location.reload()}
                  sx={{ color: '#00D4AA' }}
                >
                  Refresh Data
                </Button>
              </Box>
            )}
          </Box>
        </Paper>

        {/* Recent Transactions */}
        <Paper sx={{ 
          p: 3, 
          height: 420,
          borderRadius: '16px',
          background: 'linear-gradient(145deg, #161B22 0%, #1C2128 100%)',
          border: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          <Typography 
            variant="h6" 
            gutterBottom 
            sx={{ 
              fontWeight: 600,
              color: '#FFFFFF',
              mb: 3,
              fontSize: '1.1rem'
            }}
          >
            💳 Recent Transactions
          </Typography>
          <Box sx={{ height: 340, overflow: 'auto' }}>
            {transactions.data.length > 0 ? (
              <Stack spacing={2}>
                {transactions.data.slice(0, 6).map((transaction) => (
                  <Box
                    key={transaction.id || `temp-${Math.random()}`}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      p: 2.5,
                      background: 'linear-gradient(135deg, rgba(0, 212, 170, 0.05) 0%, rgba(108, 92, 231, 0.05) 100%)',
                      borderRadius: '12px',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        background: 'linear-gradient(135deg, rgba(0, 212, 170, 0.1) 0%, rgba(108, 92, 231, 0.1) 100%)',
                        transform: 'translateX(4px)',
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar
                        src={transaction.user_profile}
                        sx={{ width: 40, height: 40 }}
                      >
                        {formatUserName(transaction.user_id)?.charAt(0)?.toUpperCase()}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#FFFFFF' }}>
                          {formatUserName(transaction.user_id)}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.65)' }}>
                          {formatDate(transaction.date)}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 700,
                          color: transaction.category === 'Revenue' ? '#00D4AA' : '#FF6B6B',
                          fontSize: '1rem'
                        }}
                      >
                        {transaction.category === 'Revenue' ? '+' : '-'}{formatCurrency(Math.abs(transaction.amount))}
                      </Typography>
                      <Chip
                        label={transaction.status}
                        size="small"
                        sx={{
                          mt: 0.5,
                          backgroundColor: transaction.status === 'Paid' ? 'rgba(0, 212, 170, 0.2)' : 'rgba(255, 217, 61, 0.2)',
                          color: transaction.status === 'Paid' ? '#00D4AA' : '#FFD93D',
                          fontSize: '0.7rem',
                          height: '20px'
                        }}
                      />
                    </Box>
                  </Box>
                ))}
              </Stack>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <Typography color="text.secondary">No transactions available</Typography>
              </Box>
            )}
          </Box>
        </Paper>
      </Box>

      {/* Transactions Table */}
      <Card sx={{ 
        background: 'linear-gradient(135deg, #1A1C22 0%, #2A2C34 100%)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        overflow: 'hidden'
      }}>
        <CardContent sx={{ p: 0 }}>
          {/* Header */}
          <Box sx={{ 
            p: 3, 
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            background: 'rgba(0, 0, 0, 0.2)',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between' 
          }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700,
                color: '#FFFFFF',
                fontSize: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <Box sx={{ 
                width: 8, 
                height: 8, 
                borderRadius: '50%', 
                background: 'linear-gradient(135deg, #00D4AA, #667eea)' 
              }} />
              Recent Transactions
            </Typography>
            <Button
              variant="outlined"
              startIcon={<FileDownload />}
              onClick={handleExport}
              sx={{
                borderColor: 'rgba(102, 126, 234, 0.5)',
                color: '#667eea',
                '&:hover': {
                  borderColor: '#667eea',
                  backgroundColor: 'rgba(102, 126, 234, 0.1)',
                },
              }}
            >
              Export CSV
            </Button>
          </Box>

          {/* Filters Section */}
          <Box sx={{ p: 3, borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} flexWrap="wrap">
              <TextField
                label="Search transactions..."
                value={filters.search || ''}
                onChange={handleSearchChange}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: '#A0A3B8' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ 
                  minWidth: 200,
                  '& .MuiInputLabel-root': {
                    color: '#A0A3B8',
                  },
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    color: '#FFFFFF',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(102, 126, 234, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#667eea',
                    },
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: '#A0A3B8',
                    opacity: 1,
                  },
                }}
              />

              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel sx={{ color: '#A0A3B8' }}>User</InputLabel>
                <Select
                  value={filters.user_id || ''}
                  label="User"
                  onChange={(e) => handleFilterChange('user_id', e.target.value || undefined)}
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    color: '#FFFFFF',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(102, 126, 234, 0.5)',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#667eea',
                    },
                    '& .MuiSelect-icon': {
                      color: '#A0A3B8',
                    },
                  }}
                >
                  <MenuItem value="">All Users</MenuItem>
                  {users.map((user) => (
                    <MenuItem key={user._id} value={user._id}>
                      {user.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel sx={{ color: '#A0A3B8' }}>Type</InputLabel>
                <Select
                  value={filters.category || ''}
                  label="Type"
                  onChange={(e) => handleFilterChange('category', e.target.value || undefined)}
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    color: '#FFFFFF',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(102, 126, 234, 0.5)',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#667eea',
                    },
                    '& .MuiSelect-icon': {
                      color: '#A0A3B8',
                    },
                  }}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="Revenue">Revenue</MenuItem>
                  <MenuItem value="Expense">Expense</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel sx={{ color: '#A0A3B8' }}>Status</InputLabel>
                <Select
                  value={filters.status || ''}
                  label="Status"
                  onChange={(e) => handleFilterChange('status', e.target.value || undefined)}
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    color: '#FFFFFF',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(102, 126, 234, 0.5)',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#667eea',
                    },
                    '& .MuiSelect-icon': {
                      color: '#A0A3B8',
                    },
                  }}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="Paid">Paid</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                </Select>
              </FormControl>

              <TextField
                type="date"
                label="From Date"
                value={filters.dateFrom || ''}
                onChange={(e) => handleFilterChange('dateFrom', e.target.value || undefined)}
                size="small"
                InputLabelProps={{ 
                  shrink: true,
                  sx: { color: '#A0A3B8' }
                }}
                sx={{
                  minWidth: 140,
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    color: '#FFFFFF',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(102, 126, 234, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#667eea',
                    },
                  },
                }}
              />

              <TextField
                type="date"
                label="To Date"
                value={filters.dateTo || ''}
                onChange={(e) => handleFilterChange('dateTo', e.target.value || undefined)}
                size="small"
                InputLabelProps={{ 
                  shrink: true,
                  sx: { color: '#A0A3B8' }
                }}
                sx={{
                  minWidth: 140,
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    color: '#FFFFFF',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(102, 126, 234, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#667eea',
                    },
                  },
                }}
              />

              {activeFilterCount > 0 && (
                <Button
                  variant="outlined"
                  startIcon={<Clear />}
                  onClick={clearFilters}
                  size="small"
                  sx={{
                    borderColor: 'rgba(255, 107, 107, 0.5)',
                    color: '#FF6B6B',
                    '&:hover': {
                      borderColor: '#FF6B6B',
                      backgroundColor: 'rgba(255, 107, 107, 0.1)',
                    },
                  }}
                >
                  Clear ({activeFilterCount})
                </Button>
              )}
            </Stack>
          </Box>

          {/* Data Grid */}
          <Box sx={{ p: 2 }}>
            <Box sx={{ height: 600, width: '100%' }}>
              <DataGrid
                rows={transactions.data}
                columns={columns}
                getRowId={(row) => row.id || `temp-${Math.random()}`}
                loading={transactionsLoading}
                paginationMode="server"
                sortingMode="server"
                rowCount={transactions.pagination.totalItems}
                paginationModel={paginationModel}
                onPaginationModelChange={(model) => {
                  handlePageChange(model.page);
                  handlePageSizeChange(model.pageSize);
                }}
                onSortModelChange={handleSortChange}
                pageSizeOptions={[5, 10, 25, 50]}
                disableRowSelectionOnClick
                disableColumnResize={false}
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                  toolbar: {
                    showQuickFilter: false,
                  },
                }}
                sx={{
                  border: 'none',
                  borderRadius: '12px',
                  backgroundColor: 'transparent',
                  '& .MuiDataGrid-main': {
                    borderRadius: '12px',
                  },
                  '& .MuiDataGrid-columnHeaders': {
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    borderBottom: '2px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px 12px 0 0',
                    '& .MuiDataGrid-columnHeader': {
                      color: '#A0A3B8',
                      fontWeight: 700,
                      fontSize: '0.875rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    },
                    '& .MuiDataGrid-columnSeparator': {
                      color: 'rgba(255, 255, 255, 0.1)',
                    },
                  },
                  '& .MuiDataGrid-cell': {
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                    color: '#FFFFFF',
                    fontSize: '0.875rem',
                    py: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                  },
                  '& .MuiDataGrid-row': {
                    backgroundColor: 'transparent',
                    '&:hover': {
                      backgroundColor: 'rgba(102, 126, 234, 0.08)',
                      transform: 'translateY(-1px)',
                      transition: 'all 0.2s ease-in-out',
                    },
                    '&:nth-of-type(even)': {
                      backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    },
                  },
                  '& .MuiDataGrid-virtualScroller': {
                    backgroundColor: 'transparent',
                  },
                  '& .MuiDataGrid-footerContainer': {
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#A0A3B8',
                    '& .MuiTablePagination-root': {
                      color: '#A0A3B8',
                    },
                    '& .MuiTablePagination-selectIcon': {
                      color: '#A0A3B8',
                    },
                    '& .MuiIconButton-root': {
                      color: '#A0A3B8',
                      '&:hover': {
                        backgroundColor: 'rgba(102, 126, 234, 0.1)',
                      },
                    },
                  },
                  '& .MuiDataGrid-scrollbar': {
                    '&::-webkit-scrollbar': {
                      width: '8px',
                      height: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '10px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      borderRadius: '10px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                      background: 'linear-gradient(135deg, #5a67d8, #6b46c1)',
                    },
                  },
                  '& .MuiDataGrid-toolbarContainer': {
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                    color: '#A0A3B8',
                    '& .MuiButton-root': {
                      color: '#A0A3B8',
                      '&:hover': {
                        backgroundColor: 'rgba(102, 126, 234, 0.1)',
                      },
                    },
                  },
                }}
                getRowHeight={() => 72}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Export Dialog */}
      <Dialog open={exportDialogOpen} onClose={() => setExportDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Export Transactions</DialogTitle>
        <DialogContent>
          {exportPreview && (
            <Alert severity="info" sx={{ mb: 2 }}>
              Ready to export {exportPreview.totalTransactions} transactions
            </Alert>
          )}
          <Typography variant="subtitle2" gutterBottom>
            Select columns to export:
          </Typography>
          <FormGroup>
            {availableColumns.map((column) => (
              <FormControlLabel
                key={column}
                control={
                  <Checkbox
                    checked={selectedColumns.includes(column)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedColumns([...selectedColumns, column]);
                      } else {
                        setSelectedColumns(selectedColumns.filter(c => c !== column));
                      }
                    }}
                  />
                }
                label={column.charAt(0).toUpperCase() + column.slice(1).replace('_', ' ')}
              />
            ))}
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setExportDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={confirmExport}
            variant="contained"
            disabled={selectedColumns.length === 0}
          >
            Export
          </Button>
        </DialogActions>
      </Dialog>

      <DeveloperFooter />
      <DeveloperBanner />
    </Box>
  );
};

export default DashboardPage;