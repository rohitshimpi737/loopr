import TransactionModel from '../models/Transaction';
import { Transaction, TransactionFilters, PaginatedResponse } from '../types';

class TransactionService {
  // Helper method to transform MongoDB document to our Transaction interface
  private transformTransaction(transaction: any): Transaction {
    return {
      id: transaction._id?.toString() || '',
      date: transaction.date instanceof Date ? transaction.date.toISOString() : (transaction.date || ''),
      amount: transaction.amount,
      category: transaction.category,
      status: transaction.status,
      user_id: transaction.user_id,
      user_profile: transaction.user_profile
    };
  }
  async getAllTransactions(): Promise<Transaction[]> {
    try {
      const transactions = await TransactionModel.find({}).lean();
      return transactions.map(transaction => this.transformTransaction(transaction));
    } catch (error) {
      console.error('Error reading transactions from MongoDB:', error);
      return [];
    }
  }

  async getFilteredTransactions(filters: TransactionFilters): Promise<PaginatedResponse<Transaction>> {
    try {
      // Build MongoDB query
      const query: any = {};
      
      // Apply filters
      if (filters.search) {
        const searchTerm = filters.search.trim();
        const searchRegex = new RegExp(searchTerm, 'i');
        const searchConditions: any[] = [
          { user_id: searchRegex },
          { category: searchRegex },
          { status: searchRegex }
        ];

        // Handle numeric searches for amount
        const numericSearch = parseFloat(searchTerm);
        if (!isNaN(numericSearch) && isFinite(numericSearch)) {
          // Exact match for the numeric value
          searchConditions.push({ amount: numericSearch });
          
          // Also search for amounts that contain this number as a substring
          // (e.g., searching "100" will find "1100", "100.50", etc.)
          if (searchTerm.length > 0) {
            try {
              searchConditions.push({
                $expr: {
                  $regexMatch: {
                    input: { $toString: "$amount" },
                    regex: searchTerm,
                    options: "i"
                  }
                }
              });
            } catch (error) {
              // If regex fails, just use exact match
              console.warn('Amount regex search failed, using exact match only');
            }
          }
        }

        query.$or = searchConditions;
      }

      if (filters.category) {
        query.category = filters.category;
      }

      if (filters.status) {
        query.status = filters.status;
      }

      if (filters.user_id) {
        query.user_id = filters.user_id;
      }

      if (filters.dateFrom || filters.dateTo) {
        query.date = {};
        if (filters.dateFrom) {
          query.date.$gte = new Date(filters.dateFrom);
        }
        if (filters.dateTo) {
          query.date.$lte = new Date(filters.dateTo);
        }
      }

      // Sort options
      const sortField = filters.sortBy || 'date';
      const sortOrder = filters.sortOrder === 'asc' ? 1 : -1;
      const sort: any = {};
      sort[sortField] = sortOrder;

      // Pagination
      const page = filters.page || 1;
      const limit = filters.limit || 10;
      const skip = (page - 1) * limit;

      // Execute queries
      const [transactions, totalCount] = await Promise.all([
        TransactionModel.find(query)
          .sort(sort)
          .skip(skip)
          .limit(limit)
          .lean(),
        TransactionModel.countDocuments(query)
      ]);

      // Transform data
      const transformedTransactions = transactions.map((transaction: any) => ({
        id: transaction._id?.toString() || '',
        date: transaction.date instanceof Date ? transaction.date.toISOString() : transaction.date,
        amount: transaction.amount,
        category: transaction.category,
        status: transaction.status,
        user_id: transaction.user_id,
        user_profile: transaction.user_profile
      }));

      return {
        data: transformedTransactions,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalCount / limit),
          totalItems: totalCount,
          itemsPerPage: limit
        }
      };
    } catch (error) {
      console.error('Error fetching filtered transactions:', error);
      return {
        data: [],
        pagination: {
          currentPage: 1,
          totalPages: 1,
          totalItems: 0,
          itemsPerPage: filters.limit || 10
        }
      };
    }
  }

  async getTransactionById(id: string): Promise<Transaction | null> {
    try {
      const transaction = await TransactionModel.findById(id).lean();
      if (!transaction) return null;
      
      return {
        id: transaction._id?.toString() || '',
        date: transaction.date instanceof Date ? transaction.date.toISOString() : transaction.date,
        amount: transaction.amount,
        category: transaction.category,
        status: transaction.status,
        user_id: transaction.user_id,
        user_profile: transaction.user_profile
      };
    } catch (error) {
      console.error('Error fetching transaction by ID:', error);
      return null;
    }
  }

  async getUniqueUsers(): Promise<{_id: string, name: string}[]> {
    try {
      // Use MongoDB aggregation for better performance
      const users = await TransactionModel.distinct('user_id');
      
      const formattedUsers = users.map(userId => ({
        _id: userId,
        name: userId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
      })).sort((a, b) => {
        // Extract numeric part for proper numerical sorting
        const aMatch = a._id.match(/\d+/);
        const bMatch = b._id.match(/\d+/);
        
        if (aMatch && bMatch) {
          const aNum = parseInt(aMatch[0]);
          const bNum = parseInt(bMatch[0]);
          return aNum - bNum;
        }
        
        // Fallback to alphabetical sorting if no numbers found
        return a.name.localeCompare(b.name);
      });
      
      console.log('Sorted users:', formattedUsers); // Debug log
      return formattedUsers;
    } catch (error) {
      console.error('Error fetching unique users:', error);
      return [];
    }
  }
}

export default new TransactionService();