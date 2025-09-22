import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config(); // Ensure dotenv is configured before using process.env
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
const connectDB = async () => {
    mongoose.connect(MONGO_URI) 
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.error('Database connection error:', err.message));
}
export default connectDB;

