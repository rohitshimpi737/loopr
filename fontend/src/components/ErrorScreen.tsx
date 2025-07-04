import React from 'react';
import { Box, Alert, Typography, Button } from '@mui/material';
import { Refresh } from '@mui/icons-material';

interface ErrorScreenProps {
  error?: string;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({ error }) => (
  <Box sx={{ p: 3 }}>
    <Alert 
      severity="error" 
      sx={{ 
        mb: 2,
        backgroundColor: 'rgba(255, 107, 107, 0.1)',
        borderColor: '#FF6B6B',
        color: '#FFFFFF',
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
        '&:hover': { backgroundColor: '#00B894' }
      }}
    >
      Retry
    </Button>
  </Box>
);

export default ErrorScreen;