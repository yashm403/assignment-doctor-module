import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const user = process.env.MONGO_DB_USER as string;
const password = process.env.MONGO_DB_PASSWORD as string;

const MONGO_URI = `mongodb+srv://${user}:${password}@doctormodule.mnmd22h.mongodb.net/?appName=DoctorModule`;


const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("✅ MongoDB connected");
    } catch (error) {
        console.error("❌ Database connection failed:", error);
        process.exit(1);
    }
};

export default connectDB;
