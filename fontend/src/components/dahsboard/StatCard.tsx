import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
  gradient: string;
}

const StatCard: React.FC<StatCardProps> = React.memo(({ title, value, icon, trend, gradient }) => (
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
));

export default StatCard;