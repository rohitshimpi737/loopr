import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  IconButton,
  Chip,
  Avatar,
  Button,
  Tooltip,
} from '@mui/material';
import {
  GitHub,
  LinkedIn,
  Web,
  Email,
  Code,
  Star,
} from '@mui/icons-material';

const DeveloperBanner: React.FC = () => {
  const profileLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/rohitshimpi737',
      icon: <GitHub />,
      color: '#333',
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/rohitshimpi737',
      icon: <LinkedIn />,
      color: '#0077B5',
    },
    {
      name: 'Portfolio',
      url: 'https://rohitshimpi.dev', // Replace with your actual portfolio URL
      icon: <Web />,
      color: '#1976d2',
    },
    {
      name: 'Email',
      url: 'mailto:rohitshimpi737@gmail.com',
      icon: <Email />,
      color: '#EA4335',
    },
  ];

  const techStack = [
    'React', 'TypeScript', 'Node.js', 'MongoDB', 'Express', 'Material-UI', 'Vite'
  ];

  return (
    <Card 
      sx={{ 
        mb: 3, 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 100,
          height: 100,
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
          transform: 'translate(50%, -50%)',
        }}
      />
      <CardContent>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems="center">
          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Stack direction="row" spacing={1} alignItems="center" justifyContent={{ xs: 'center', md: 'flex-start' }}>
              <Avatar
                sx={{
                  width: 48,
                  height: 48,
                  bgcolor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                }}
              >
                <Code />
              </Avatar>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Loopr Finance Dashboard
                </Typography>
                <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                  Developed by Rohit Shimpi
                </Typography>
              </Box>
            </Stack>
            
            <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
              Full-Stack Developer | MERN Stack Specialist | TypeScript Enthusiast
            </Typography>
            
            <Stack direction="row" spacing={0.5} sx={{ mt: 1.5 }} flexWrap="wrap" justifyContent={{ xs: 'center', md: 'flex-start' }}>
              {techStack.map((tech) => (
                <Chip
                  key={tech}
                  label={tech}
                  size="small"
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    mb: 0.5,
                  }}
                />
              ))}
            </Stack>
          </Box>

          <Stack spacing={2} alignItems="center">
            <Stack direction="row" spacing={1}>
              {profileLinks.map((link) => (
                <Tooltip key={link.name} title={`Visit ${link.name}`} arrow>
                  <IconButton
                    component="a"
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: 'white',
                      bgcolor: 'rgba(255,255,255,0.1)',
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.2)',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.2s ease-in-out',
                    }}
                  >
                    {link.icon}
                  </IconButton>
                </Tooltip>
              ))}
            </Stack>
            
            <Button
              variant="outlined"
              size="small"
              startIcon={<Star />}
              component="a"
              href="https://github.com/rohitshimpi737/loopr-backend"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: 'white',
                borderColor: 'rgba(255,255,255,0.5)',
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              Star on GitHub
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default DeveloperBanner;
