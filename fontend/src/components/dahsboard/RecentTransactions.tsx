import React from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Stack, 
  Avatar, 
  Chip 
} from '@mui/material';

import type { Transaction } from '../../types';

interface RecentTransactionsProps {
  transactions: Transaction[];
  formatCurrency: (amount: number) => string;
  formatDate: (dateString: string) => string;
  formatUserName: (userId: string) => string;
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ 
  transactions, 
  formatCurrency, 
  formatDate, 
  formatUserName 
}) => {
  return (
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
        {transactions.length > 0 ? (
          <Stack spacing={2}>
            {transactions.slice(0, 6).map((transaction) => (
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
  );
};

export default RecentTransactions;