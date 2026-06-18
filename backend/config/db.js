import mongoose from "mongoose";

// Tracks connection state across serverless invocations
let isConnected = false; 

export const connectDB = async () => {
    // If already connected, do not open a new connection
    if (isConnected) {
        console.log("Using existing Database connection");
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGO_URI, { 
            dbName: "TaskManager",
            maxPoolSize: 10,                 // Prevents connection limits from crashing Atlas
            serverSelectionTimeoutMS: 5000,   // Fails quickly instead of hanging on timeouts
        });
        
        isConnected = db.connections[0].readyState;
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Error connecting to Database", error);
        // REMOVED: process.exit(1) - Let the function live so it can retry later
    }
};
