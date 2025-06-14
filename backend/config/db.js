import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { dbName: "TaskManager" });
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Error connecting to Database", error);
        process.exit(1);
    }
};