export interface Transaction {
  id: string; // MongoDB ObjectId as string
  date: string;
  amount: number;
  category: 'Revenue' | 'Expense';
  status: 'Paid' | 'Pending';
  user_id: string;
  user_profile: string;
}

export interface User {
  id: string; // MongoDB ObjectId as string
  email: string;
  name: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface DashboardSummary {
  totalRevenue: number;
  totalExpenses: number;
  totalBalance: number;
  totalTransactions: number;
  monthlyData: MonthlyData[];
  categoryData: CategoryData[];
  userExpenses: UserExpenseData[];
}

export interface MonthlyData {
  month: string;
  revenue: number;
  expenses: number;
}

export interface CategoryData {
  category: string;
  amount: number;
  count: number;
}

export interface UserExpenseData {
  user_id: string;
  totalExpenses: number;
  transactionCount: number;
}

export interface TransactionFilters {
  search?: string;
  category?: 'Revenue' | 'Expense';
  status?: 'Paid' | 'Pending';
  user_id?: string;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export interface ExportConfig {
  columns: string[];
  filters?: TransactionFilters;
}

export interface ExportPreview {
  totalTransactions: number;
  message: string;
}

export interface AlertState {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';
}