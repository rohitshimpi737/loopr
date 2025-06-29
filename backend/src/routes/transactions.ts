import express, { Request, Response, NextFunction } from 'express';
import { authenticateToken } from '../middleware/auth';
import transactionService from '../services/transactionService';
import { TransactionFilters } from '../types';

const router = express.Router();

// Get unique users (place before /:id route)
router.get('/users', authenticateToken, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await transactionService.getUniqueUsers();
    res.json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get unique users (alternative route for backwards compatibility)
router.get('/users/list', authenticateToken, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await transactionService.getUniqueUsers();
    res.json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all transactions with filtering and pagination
router.get('/', authenticateToken, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const filters: TransactionFilters = {
      dateFrom: req.query.dateFrom as string,
      dateTo: req.query.dateTo as string,
      category: req.query.category as 'Revenue' | 'Expense',
      status: req.query.status as 'Paid' | 'Pending',
      user_id: req.query.user_id as string,
      search: req.query.search as string,
      sortBy: req.query.sortBy as 'date' | 'amount',
      sortOrder: req.query.sortOrder as 'asc' | 'desc',
      page: req.query.page ? parseInt(req.query.page as string) : 1,
      limit: req.query.limit ? parseInt(req.query.limit as string) : 20
    };

    const result = await transactionService.getFilteredTransactions(filters);
    res.json(result);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get transaction by ID
router.get('/:id', authenticateToken, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id;
    if (!id || typeof id !== 'string') {
      res.status(400).json({ error: 'Invalid transaction ID' });
      return;
    }

    const transaction = await transactionService.getTransactionById(id);
    if (!transaction) {
      res.status(404).json({ error: 'Transaction not found' });
      return;
    }

    res.json(transaction);
  } catch (error) {
    console.error('Error fetching transaction:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
