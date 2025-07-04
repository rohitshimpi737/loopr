import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
} from '@mui/material';
import { FileDownload } from '@mui/icons-material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import type { GridColDef, GridSortModel } from '@mui/x-data-grid';
import type {
  Transaction,
  TransactionFilters,
  PaginatedResponse,
} from '../../types';
import TransactionFiltersPage from './TransactionFiltersPage';
import { getDataGridColumns } from '../../utils/dataGridColumns';

interface TransactionsTableProps {
  transactions: PaginatedResponse<Transaction>;
  loading: boolean;
  filters: TransactionFilters;
  users: { _id: string; name: string }[];
  activeFilterCount: number;
  formatCurrency: (amount: number) => string;
  formatDate: (dateString: string) => string;
  formatUserName: (userId: string) => string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterChange: (field: keyof TransactionFilters, value: any) => void;
  onClearFilters: () => void;
  onSortChange: (sortModel: GridSortModel) => void;
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newPageSize: number) => void;
  onExport: () => void;
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({
  transactions,
  loading,
  filters,
  users,
  activeFilterCount,
  formatCurrency,
  formatDate,
  formatUserName,
  onSearchChange,
  onFilterChange,
  onClearFilters,
  onSortChange,
  onPageChange,
  onPageSizeChange,
  onExport,
}) => {
  const paginationModel = {
    page: transactions.pagination.currentPage - 1,
    pageSize: transactions.pagination.itemsPerPage,
  };

  const columns: GridColDef[] = getDataGridColumns(formatCurrency, formatDate, formatUserName);

  return (
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
            onClick={onExport}
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

        {/* Filters */}
        <TransactionFiltersPage
          filters={filters}
          users={users}
          activeFilterCount={activeFilterCount}
          onSearchChange={onSearchChange}
          onFilterChange={onFilterChange}
          onClearFilters={onClearFilters}
        />

        {/* Data Grid */}
        <Box sx={{ p: 2 }}>
          <Box sx={{ height: 600, width: '100%' }}>
            <DataGrid
              rows={transactions.data}
              columns={columns}
              getRowId={(row) => row.id || `temp-${Math.random()}`}
              loading={loading}
              paginationMode="server"
              sortingMode="server"
              rowCount={transactions.pagination.totalItems}
              paginationModel={paginationModel}
              onPaginationModelChange={(model) => {
                onPageChange(model.page);
                onPageSizeChange(model.pageSize);
              }}
              onSortModelChange={onSortChange}
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
  );
};

export default TransactionsTable;
