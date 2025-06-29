import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  IconButton,
  Chip,
  Divider,
  Avatar,
  Badge,
} from '@mui/material';
import {
  GitHub,
  LinkedIn,
  Web,
  Email,
  Info,
  Psychology,
  Code,
  Star,
  Favorite,
  TrendingUp,
} from '@mui/icons-material';

const ProjectInfo: React.FC = () => {
  const features = [
    { name: 'Real-time Transaction Management', icon: <TrendingUp fontSize="small" /> },
    { name: 'Advanced Data Visualization', icon: <Code fontSize="small" /> },
    { name: 'CSV Export Functionality', icon: <Star fontSize="small" /> },
    { name: 'Role-based Authentication', icon: <Psychology fontSize="small" /> },
    { name: 'Responsive Material-UI Design', icon: <Favorite fontSize="small" /> },
    { name: 'RESTful API Integration', icon: <Web fontSize="small" /> },
  ];

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
      url: 'https://rohitshimpi.dev',
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
    { name: 'React', color: '#61DAFB' },
    { name: 'TypeScript', color: '#3178C6' },
    { name: 'Node.js', color: '#339933' },
    { name: 'MongoDB', color: '#47A248' },
    { name: 'Express', color: '#000000' },
    { name: 'Material-UI', color: '#007FFF' },
    { name: 'Vite', color: '#646CFF' },
  ];

  return (
    <Card 
      sx={{ 
        mt: 6,
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 3,
        overflow: 'hidden',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
        },
      }}
    >
      <CardContent sx={{ p: 2, pt: 20 }}>
        <Stack spacing={1.5}>
          {/* Header Section */}
          <Box sx={{ textAlign: 'center' }}>
            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" sx={{ mb: 1 }}>
              <Avatar
                sx={{
                  bgcolor: 'primary.main',
                  width: 48,
                  height: 48,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                }}
              >
                <Psychology fontSize="medium" />
              </Avatar>
              <Box sx={{ textAlign: 'left' }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
                  Loopr Finance Dashboard
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  A modern financial management solution
                </Typography>
              </Box>
            </Stack>
          </Box>

          <Divider sx={{ borderStyle: 'dashed' }} />

          {/* Tech Stack Section */}
          <Box>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
              <Code fontSize="small" color="primary" />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Tech Stack
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center">
              {techStack.map((tech) => (
                <Chip
                  key={tech.name}
                  label={tech.name}
                  size="small"
                  sx={{
                    mb: 1,
                    bgcolor: `${tech.color}15`,
                    color: tech.color,
                    border: `1px solid ${tech.color}30`,
                    fontWeight: 600,
                    '&:hover': {
                      bgcolor: `${tech.color}25`,
                      transform: 'translateY(-1px)',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                />
              ))}
            </Stack>
          </Box>

          <Divider sx={{ borderStyle: 'dashed' }} />

          {/* Features Section */}
          <Box>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
              <Star fontSize="small" color="primary" />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Key Features
              </Typography>
            </Stack>
            <Stack spacing={1}>
              {features.map((feature) => (
                <Stack 
                  key={feature.name} 
                  direction="row" 
                  spacing={1.5} 
                  alignItems="center"
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                    '&:hover': {
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                      transform: 'translateX(4px)',
                      '& .feature-icon': {
                        color: 'primary.contrastText',
                      },
                    },
                    transition: 'all 0.3s ease-in-out',
                  }}
                >
                  <Box className="feature-icon" sx={{ color: 'primary.main' }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {feature.name}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Box>

          <Divider sx={{ borderStyle: 'dashed' }} />

          {/* Developer Section */}
          <Box sx={{ textAlign: 'center' }}>
            <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" sx={{ mb: 1.5 }}>
              <Info fontSize="small" color="primary" />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                About the Developer
              </Typography>
            </Stack>
            
            <Stack spacing={1.5} alignItems="center">
              <Avatar
                sx={{
                  width: 56,
                  height: 56,
                  bgcolor: 'primary.main',
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                }}
              >
                RS
              </Avatar>
              
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                  Rohit Shimpi
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                  Full-Stack Developer | MERN Stack Specialist | UI/UX Enthusiast
                </Typography>
              </Box>

              <Stack direction="row" spacing={1} justifyContent="center">
                {profileLinks.map((link) => (
                  <Badge
                    key={link.name}
                    overlap="circular"
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    badgeContent={
                      <Star 
                        sx={{ 
                          fontSize: 12, 
                          color: 'gold',
                          filter: 'drop-shadow(0 0 2px rgba(255,215,0,0.5))',
                        }} 
                      />
                    }
                  >
                    <IconButton
                      component="a"
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: 'text.secondary',
                        bgcolor: 'background.paper',
                        border: '2px solid',
                        borderColor: 'divider',
                        '&:hover': {
                          color: link.color,
                          borderColor: link.color,
                          transform: 'translateY(-3px)',
                          boxShadow: `0 8px 25px ${link.color}25`,
                        },
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    >
                      {link.icon}
                    </IconButton>
                  </Badge>
                ))}
              </Stack>
            </Stack>
          </Box>

          {/* Quote Section */}
          <Box
            sx={{
              textAlign: 'center',
              pt: 1.5,
              borderTop: '1px dashed',
              borderTopColor: 'divider',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontStyle: 'italic',
                color: 'text.secondary',
                opacity: 0.8,
              }}
            >
              "Building innovative solutions with modern technology"
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProjectInfo;
