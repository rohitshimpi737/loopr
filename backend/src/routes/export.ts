import express, { Request, Response, NextFunction } from 'express';
import { Parser } from 'json2csv';
import { authenticateToken } from '../middleware/auth';
import transactionService from '../services/transactionService';
import { TransactionFilters } from '../types';

const router = express.Router();

// Export transactions as CSV
router.post('/csv', authenticateToken, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const filters: TransactionFilters = req.body.filters || {};
    const selectedColumns = req.body.columns || ['id', 'date', 'amount', 'category', 'status', 'user_id'];

    // Get filtered transactions without pagination
    const result = await transactionService.getFilteredTransactions({
      ...filters,
      limit: 10000 // Large limit to get all results
    });

    if (result.data.length === 0) {
      res.status(404).json({ error: 'No transactions found for export' });
      return;
    }

    // Format data for CSV
    const csvData = result.data.map(transaction => {
      const formatted: any = {};
      
      selectedColumns.forEach((column: string) => {
        if (column === 'date') {
          formatted[column] = new Date(transaction.date).toLocaleDateString();
        } else if (column === 'amount') {
          formatted[column] = `$${transaction.amount.toFixed(2)}`;
        } else {
          formatted[column] = (transaction as any)[column];
        }
      });
      
      return formatted;
    });

    // Create CSV
    const json2csvParser = new Parser({ fields: selectedColumns });
    const csv = json2csvParser.parse(csvData);

    // Set headers for file download
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `transactions-export-${timestamp}.csv`;

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    
    res.send(csv);
  } catch (error) {
    console.error('Error exporting CSV:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get export preview (count of transactions that will be exported)
router.post('/preview', authenticateToken, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const filters: TransactionFilters = req.body.filters || {};
    
    const result = await transactionService.getFilteredTransactions({
      ...filters,
      limit: 1 // Just get count
    });

    res.json({
      totalTransactions: result.pagination.totalItems,
      message: `${result.pagination.totalItems} transactions will be exported`
    });
  } catch (error) {
    console.error('Error getting export preview:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
