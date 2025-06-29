import Transaction from '../models/Transaction';
import { DashboardSummary, MonthlyData, CategoryData, UserExpenseData } from '../types';

interface ITransaction {
  id: string;
  date: string;
  amount: number;
  category: 'Revenue' | 'Expense';
  status: 'Paid' | 'Pending';
  user_id: string;
  user_profile: string;
}

class DashboardService {
  async getAllTransactions(): Promise<ITransaction[]> {
    try {
      const transactions = await Transaction.find({}).lean();
      return transactions.map(t => ({
        id: t._id?.toString() || '',
        date: t.date instanceof Date ? t.date.toISOString() : t.date,
        amount: t.amount,
        category: t.category,
        status: t.status,
        user_id: t.user_id,
        user_profile: t.user_profile
      }));
    } catch (error) {
      console.error('Error reading transactions from MongoDB:', error);
      return [];
    }
  }

  async getDashboardSummary(): Promise<DashboardSummary> {
    try {
      const transactions = await this.getAllTransactions();
      console.log(`Dashboard service: Found ${transactions.length} transactions`); // Debug log

      const totalRevenue = transactions
        .filter((t) => t.category === 'Revenue' && t.status === 'Paid')
        .reduce((sum, t) => sum + t.amount, 0);

      const totalExpenses = transactions
        .filter((t) => t.category === 'Expense' && t.status === 'Paid')
        .reduce((sum, t) => sum + t.amount, 0);

      const totalBalance = totalRevenue - totalExpenses;
      const totalTransactions = transactions.length;

      const monthlyData = this.getMonthlyData(transactions);
      const categoryData = this.getCategoryBreakdown(transactions);
      const userExpenses = this.getUserExpenses(transactions);

      const summary = {
        totalRevenue,
        totalExpenses,
        totalBalance,
        totalTransactions,
        monthlyData,
        categoryData,
        userExpenses
      };

      console.log('Dashboard service: Generated summary:', summary); // Debug log
      return summary;
    } catch (error) {
      console.error('Error generating dashboard summary:', error);
      return {
        totalRevenue: 0,
        totalExpenses: 0,
        totalBalance: 0,
        totalTransactions: 0,
        monthlyData: [],
        categoryData: [],
        userExpenses: []
      };
    }
  }

  private getMonthlyData(transactions: ITransaction[]): MonthlyData[] {
    const monthlyMap = new Map<string, { revenue: number; expenses: number }>();
    
    transactions.forEach(transaction => {
      const date = new Date(transaction.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!monthlyMap.has(monthKey)) {
        monthlyMap.set(monthKey, { revenue: 0, expenses: 0 });
      }
      
      const monthData = monthlyMap.get(monthKey)!;
      
      if (transaction.category === 'Revenue' && transaction.status === 'Paid') {
        monthData.revenue += transaction.amount;
      } else if (transaction.category === 'Expense' && transaction.status === 'Paid') {
        monthData.expenses += transaction.amount;
      }
    });

    return Array.from(monthlyMap.entries())
      .map(([month, data]) => ({
        month,
        revenue: data.revenue,
        expenses: data.expenses
      }))
      .sort((a, b) => a.month.localeCompare(b.month));
  }

  private getCategoryBreakdown(transactions: ITransaction[]): CategoryData[] {
    const paidTransactions = transactions.filter(t => t.status === 'Paid');
    
    const categoryTotals = paidTransactions.reduce((acc, transaction) => {
      if (!acc[transaction.category]) {
        acc[transaction.category] = 0;
      }
      acc[transaction.category] += transaction.amount;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categoryTotals).map(([category, amount]) => ({
      category,
      amount: amount as number,
      count: paidTransactions.filter(t => t.category === category).length
    }));
  }

  private getUserExpenses(transactions: ITransaction[]): UserExpenseData[] {
    const userMap = new Map<string, { amount: number; count: number }>();
    
    transactions
      .filter(t => t.category === 'Expense' && t.status === 'Paid')
      .forEach(transaction => {
        if (!userMap.has(transaction.user_id)) {
          userMap.set(transaction.user_id, { amount: 0, count: 0 });
        }
        
        const userData = userMap.get(transaction.user_id)!;
        userData.amount += transaction.amount;
        userData.count += 1;
      });

    return Array.from(userMap.entries())
      .map(([user_id, data]) => ({
        user_id,
        totalExpenses: data.amount,
        transactionCount: data.count
      }))
      .sort((a, b) => b.totalExpenses - a.totalExpenses);
  }
}

export default new DashboardService();