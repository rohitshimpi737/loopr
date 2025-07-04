import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingScreenProps {
  message?: string;
  description?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  message = "Loading...", 
  description 
}) => (
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
      {message}
    </Typography>
    {description && (
      <Typography variant="body2" sx={{ color: '#A0A3B8', textAlign: 'center' }}>
        {description}
      </Typography>
    )}
  </Box>
);

export default LoadingScreen;