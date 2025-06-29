import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  Link,
  Divider,
  Stack,
} from '@mui/material';
import {
  GitHub,
  LinkedIn,
  Web,
  Email,
} from '@mui/icons-material';

interface DeveloperFooterProps {
  variant?: 'auth' | 'dashboard';
}

const DeveloperFooter: React.FC<DeveloperFooterProps> = ({ variant = 'auth' }) => {
  const isDashboard = variant === 'dashboard';

  const profileLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/rohitshimpi737',
      icon: <GitHub />,
      color: '#333',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/rohit-shimpi-9940b0253/',
      icon: <LinkedIn />,
      color: '#0077B5',
    },
    {
      name: 'Portfolio',
      url: 'https://rohit-drab.vercel.app/', // Replace with your actual portfolio URL
      icon: <Web />,
      color: '#1976d2',
    },
    {
      name: 'Email',
      url: 'mailto:shimpirohit02@gmail.com', // Replace with your email
      icon: <Email />,
      color: '#EA4335',
    },
  ];

  return (
    <Box
      sx={{
        mt: isDashboard ? 2 : 4,
        py: isDashboard ? 1 : 3,
        textAlign: 'center',
        borderTop: isDashboard ? '1px solid' : 'none',
        borderTopColor: 'divider',
      }}
    >
      {!isDashboard && <Divider sx={{ mb: 2 }} />}
      
      <Stack spacing={1} alignItems="center">
        <Typography
          variant={isDashboard ? 'caption' : 'body2'}
          color="text.secondary"
          sx={{ fontWeight: 500 }}
        >
          Developed by Rohit Shimpi
        </Typography>
        
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mb: 1 }}
        >
          Full-Stack Developer • MERN Stack • TypeScript
        </Typography>

        <Stack direction="row" spacing={1}>
          {profileLinks.map((link) => (
            <Tooltip key={link.name} title={link.name} arrow>
              <IconButton
                component={Link}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                size={isDashboard ? 'small' : 'medium'}
                sx={{
                  color: 'text.secondary',
                  '&:hover': {
                    color: link.color,
                    transform: 'translateY(-2px)',
                    transition: 'all 0.2s ease-in-out',
                  },
                }}
              >
                {link.icon}
              </IconButton>
            </Tooltip>
          ))}
        </Stack>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 1 }}
        >
          💡 Built with React • TypeScript • Material-UI • Node.js • MongoDB
        </Typography>

        {!isDashboard && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ 
              mt: 1,
              fontStyle: 'italic',
              opacity: 0.8 
            }}
          >
            "Transforming ideas into digital solutions"
          </Typography>
        )}
      </Stack>
    </Box>
  );
};

export default DeveloperFooter;
