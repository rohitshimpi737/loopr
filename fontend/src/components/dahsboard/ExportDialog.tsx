import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Alert,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import type { ExportPreview } from '../../types';

interface ExportDialogProps {
  open: boolean;
  onClose: () => void;
  exportPreview: ExportPreview | null;
  selectedColumns: string[];
  onColumnToggle: (column: string, checked: boolean) => void;
  onConfirm: () => void;
  loading?: boolean;
}

const ExportDialog: React.FC<ExportDialogProps> = ({
  open,
  onClose,
  exportPreview,
  selectedColumns,
  onColumnToggle,
  onConfirm,
  loading = false,
}) => {
  const availableColumns = [
    'date', 'amount', 'category', 'status', 'user_id', 'user_profile'
  ];

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: '#161B22',
          color: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.05)',
        }
      }}
    >
      <DialogTitle sx={{ 
        color: '#FFFFFF',
        fontWeight: 600,
        fontSize: '1.25rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        pb: 2
      }}>
        Export Transactions
      </DialogTitle>
      
      <DialogContent sx={{ py: 3 }}>
        {exportPreview && (
          <Alert 
            severity="info" 
            sx={{ 
              mb: 3,
              backgroundColor: 'rgba(116, 185, 255, 0.1)',
              borderColor: '#74B9FF',
              color: '#74B9FF',
              '& .MuiAlert-icon': {
                color: '#74B9FF'
              }
            }}
          >
            Ready to export {exportPreview.totalTransactions} transactions
          </Alert>
        )}
        
        <Typography 
          variant="subtitle2" 
          gutterBottom 
          sx={{ 
            color: '#FFFFFF',
            fontWeight: 600,
            mb: 2
          }}
        >
          Select columns to export:
        </Typography>
        
        <FormGroup>
          {availableColumns.map((column) => (
            <FormControlLabel
              key={column}
              control={
                <Checkbox
                  checked={selectedColumns.includes(column)}
                  onChange={(e) => onColumnToggle(column, e.target.checked)}
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    '&.Mui-checked': {
                      color: '#00D4AA',
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(0, 212, 170, 0.1)',
                    },
                  }}
                />
              }
              label={
                <Typography sx={{ 
                  color: '#FFFFFF',
                  fontSize: '0.875rem'
                }}>
                  {column.charAt(0).toUpperCase() + column.slice(1).replace('_', ' ')}
                </Typography>
              }
              sx={{ mb: 1 }}
            />
          ))}
        </FormGroup>
        
        {selectedColumns.length === 0 && (
          <Alert 
            severity="warning" 
            sx={{ 
              mt: 2,
              backgroundColor: 'rgba(255, 217, 61, 0.1)',
              borderColor: '#FFD93D',
              color: '#FFD93D',
              '& .MuiAlert-icon': {
                color: '#FFD93D'
              }
            }}
          >
            Please select at least one column to export.
          </Alert>
        )}
      </DialogContent>
      
      <DialogActions sx={{ 
        p: 3,
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        gap: 2
      }}>
        <Button 
          onClick={onClose}
          sx={{ 
            color: 'rgba(255, 255, 255, 0.7)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          disabled={selectedColumns.length === 0 || loading}
          sx={{
            backgroundColor: '#00D4AA',
            color: '#FFFFFF',
            fontWeight: 600,
            px: 3,
            '&:hover': {
              backgroundColor: '#00B894',
            },
            '&:disabled': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: 'rgba(255, 255, 255, 0.5)',
            }
          }}
        >
          {loading ? 'Exporting...' : 'Export'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExportDialog;
