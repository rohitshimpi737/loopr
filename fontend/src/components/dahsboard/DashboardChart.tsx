import React from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Chip, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  CircularProgress,
  Button,
  Tooltip
} from '@mui/material';
import { CalendarToday, DateRange, CalendarMonth } from '@mui/icons-material';
import { LineChart } from '@mui/x-charts';

interface ChartData {
  month: string;
  Revenue: number;
  Expenses: number;
  [key: string]: string | number; // Add index signature for compatibility
}

interface DashboardChartProps {
  chartData: ChartData[];
  timePeriod: 'month' | 'quarter' | 'year';
  setTimePeriod: (period: 'month' | 'quarter' | 'year') => void;
  loading: boolean;
}

const DashboardChart: React.FC<DashboardChartProps> = ({ 
  chartData, 
  timePeriod, 
  setTimePeriod, 
  loading 
}) => {
  return (
    <Paper sx={{ 
      p: 3, 
      height: 420,
      borderRadius: '16px',
      background: 'linear-gradient(145deg, #161B22 0%, #1C2128 100%)',
      border: '1px solid rgba(255, 255, 255, 0.05)'
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 600,
            color: '#FFFFFF',
            fontSize: '1.1rem',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          📈 Revenue vs Expenses 
          <Chip 
            label={`${timePeriod.charAt(0).toUpperCase() + timePeriod.slice(1)}ly View`}
            size="small"
            sx={{
              backgroundColor: 'rgba(102, 126, 234, 0.2)',
              color: '#667eea',
              fontSize: '0.75rem',
              height: '24px',
              ml: 1
            }}
          />
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Tooltip title="Select time period for analysis">
            <FormControl size="small" sx={{ minWidth: 130 }}>
              <InputLabel sx={{ color: '#A0A3B8', fontSize: '0.875rem' }}>Period</InputLabel>
              <Select
                value={timePeriod}
                label="Period"
                onChange={(e) => setTimePeriod(e.target.value as 'month' | 'quarter' | 'year')}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  borderRadius: '10px',
                  color: '#FFFFFF',
                  height: '38px',
                  transition: 'all 0.3s ease',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.15)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(102, 126, 234, 0.6)',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#667eea',
                    borderWidth: '2px',
                  },
                  '& .MuiSelect-icon': {
                    color: '#A0A3B8',
                    transition: 'color 0.3s ease',
                  },
                  '&:hover .MuiSelect-icon': {
                    color: '#667eea',
                  },
                }}
              >
                <MenuItem value="month" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CalendarToday sx={{ fontSize: 16 }} />
                  Monthly
                </MenuItem>
                <MenuItem value="quarter" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <DateRange sx={{ fontSize: 16 }} />
                  Quarterly
                </MenuItem>
                <MenuItem value="year" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CalendarMonth sx={{ fontSize: 16 }} />
                  Yearly
                </MenuItem>
              </Select>
            </FormControl>
          </Tooltip>
        </Box>   
      </Box>

      <Box sx={{ height: 340 }}>
        {loading ? (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <CircularProgress sx={{ color: '#00D4AA' }} />
          </Box>
        ) : chartData.length > 0 ? (
          <LineChart
            dataset={chartData}
            xAxis={[{ 
              scaleType: 'point', 
              dataKey: 'month',
            }]}
            yAxis={[{}]}
            series={[
              { 
                dataKey: 'Revenue', 
                label: 'Revenue', 
                color: '#00D4AA',
                curve: 'catmullRom',
              },
              { 
                dataKey: 'Expenses', 
                label: 'Expenses', 
                color: '#FF6B6B',
                curve: 'catmullRom',
              },
            ]}
            height={320}
            margin={{ left: 80, right: 20, top: 20, bottom: 40 }}
            sx={{
              '& .MuiChartsAxis-label': {
                fill: '#FFFFFF',
                fontSize: '12px',
              },
              '& .MuiChartsAxis-tick': {
                stroke: 'rgba(255, 255, 255, 0.3)',
              },
              '& .MuiChartsAxis-line': {
                stroke: 'rgba(255, 255, 255, 0.2)',
              },
              '& .MuiChartsLegend-root': {
                '& text': {
                  fill: '#FFFFFF !important',
                },
              },
              '& .MuiChartsTooltip-root': {
                backgroundColor: 'rgba(26, 28, 34, 0.95)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                backdropFilter: 'blur(10px)',
              },
              '& .MuiLineElement-root': {
                strokeWidth: 3,
              },
              '& .MuiMarkElement-root': {
                r: 4,
                strokeWidth: 2,
                '&:hover': {
                  r: 6,
                },
              },
              '& .MuiChartsGrid-line': {
                stroke: 'rgba(255, 255, 255, 0.05)',
              },
            }}
          />
        ) : (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100%',
            gap: 2
          }}>
            
            <Typography variant="h6" sx={{ color: '#A0A3B8' }}>
              📊
            </Typography>
            <Typography color="text.secondary" variant="body2">
              No data available for {timePeriod}ly view
            </Typography>
            <Button 
              size="small" 
              onClick={() => window.location.reload()}
              sx={{ color: '#00D4AA' }}
            >
              Refresh Data
            </Button>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default DashboardChart;