import { Typography, Box, Avatar, Chip } from '@mui/material';
import type { GridColDef } from '@mui/x-data-grid';
export const getDataGridColumns = (
  formatCurrency: (amount: number) => string,
  formatDate: (dateString: string) => string,
  formatUserName: (userId: string) => string
): GridColDef[] => [
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