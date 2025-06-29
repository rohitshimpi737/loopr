import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://shimpirohit02:1234@backendapi.kymt5.mongodb.net/FinanceDB?retryWrites=true&w=majority&appName=backEndApi';
    
    await mongoose.connect(mongoURI);
    
    console.log('✅ MongoDB connected successfully');
    console.log(`📍 Database: ${mongoose.connection.name}`);
    
  } catch (error: any) {
    console.error('❌ MongoDB connection failed:', error?.message || error);
    process.exit(1);
  }
};

export default connectDB;
