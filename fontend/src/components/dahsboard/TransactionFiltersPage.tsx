import React from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Stack,
  InputAdornment,
} from '@mui/material';
import { Search, Clear } from '@mui/icons-material';
import type { TransactionFilters as ITransactionFilters } from '../../types';

interface TransactionFiltersProps {
  filters: ITransactionFilters;
  users: { _id: string; name: string }[];
  activeFilterCount: number;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterChange: (field: keyof ITransactionFilters, value: any) => void;
  onClearFilters: () => void;
}

const TransactionFiltersPage: React.FC<TransactionFiltersProps> = ({
  filters,
  users,
  activeFilterCount,
  onSearchChange,
  onFilterChange,
  onClearFilters,
}) => {
  return (
    <Box sx={{ p: 3, borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} flexWrap="wrap">
        <TextField
          label="Search transactions..."
          value={filters.search || ''}
          onChange={onSearchChange}
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
          }}
        />

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel sx={{ color: '#A0A3B8' }}>User</InputLabel>
          <Select
            value={filters.user_id || ''}
            label="User"
            onChange={(e) => onFilterChange('user_id', e.target.value || undefined)}
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
            onChange={(e) => onFilterChange('category', e.target.value || undefined)}
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
            onChange={(e) => onFilterChange('status', e.target.value || undefined)}
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
          onChange={(e) => onFilterChange('dateFrom', e.target.value || undefined)}
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
          onChange={(e) => onFilterChange('dateTo', e.target.value || undefined)}
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
            onClick={onClearFilters}
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
  );
};

export default TransactionFiltersPage;