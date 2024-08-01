import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const url = process.env.MONGODB_URI

const connectDB = async () => {
    try {
        
        const connectionInstance = await mongoose.connect(url);
        console.log(`\nMongoDB Connected: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection failed: ", error);
        process.exit(1);
    }
}


export default connectDB;
