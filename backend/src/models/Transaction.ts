import mongoose, { Schema, Document } from 'mongoose';

export interface ITransaction extends Document {
  _id: string;
  date: Date;
  amount: number;
  category: 'Revenue' | 'Expense';
  status: 'Paid' | 'Pending';
  user_id: string;
  user_profile: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TransactionSchema: Schema = new Schema({
  // Remove the id field since MongoDB uses _id by default
  date: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
    enum: ['Revenue', 'Expense'],
  },
  status: {
    type: String,
    required: true,
    enum: ['Paid', 'Pending'],
  },
  user_id: {
    type: String,
    required: true,
    trim: true,
  },
  user_profile: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
  collection: 'transactions' // Explicitly set collection name
});

// Create indexes for better query performance
TransactionSchema.index({ user_id: 1 });
TransactionSchema.index({ category: 1 });
TransactionSchema.index({ status: 1 });
TransactionSchema.index({ date: -1 });
TransactionSchema.index({ amount: 1 });

export default mongoose.model<ITransaction>('Transaction', TransactionSchema);