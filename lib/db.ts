import mongoose, { connect, connection } from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/taco-fiesta'

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      return
    }
    await mongoose.connect(MONGODB_URI)
    console.log('MongoDB connected')
  } catch (error) {
    console.error('MongoDB connection error:', error)
  }
} 