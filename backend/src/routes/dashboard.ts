import express, { Request, Response, NextFunction } from 'express';
import { authenticateToken } from '../middleware/auth';
import dashboardService from '../services/dashboardService';

const router = express.Router();

// Get dashboard summary
router.get('/summary', authenticateToken, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const summary = await dashboardService.getDashboardSummary();
    res.json(summary);
  } catch (error) {
    console.error('Error fetching dashboard summary:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
