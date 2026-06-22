import mongoose from "mongoose";

// Tracks connection state across serverless invocations
let isConnected = false; 

export const connectDB = async (retries = 3) => {
    // If already connected, do not open a new connection
    if (isConnected) {
        console.log("Using existing Database connection");
        return;
    }

    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is not configured in the environment.");
    }

    console.log("🔄 Attempting to connect to MongoDB Atlas...");

    for (let i = 0; i < retries; i++) {
        try {
            const db = await mongoose.connect(process.env.MONGO_URI, {
                dbName: "TaskManager",
                maxPoolSize: 10,
                minPoolSize: 5,
                serverSelectionTimeoutMS: 60000,
                connectTimeoutMS: 60000,
                socketTimeoutMS: 60000,
                retryWrites: true,
                w: "majority",
            });

            isConnected = db.connections[0].readyState;
            console.log("✅ Database connected successfully!");
            return;
        } catch (error) {
            console.error(`\n❌ Connection attempt ${i + 1} failed:`);
            console.error(`   Error: ${error.message}`);
            console.error(`   Code: ${error.code}`);

            if (i < retries - 1) {
                const delay = Math.pow(2, i) * 1000;
                console.log(`⏳ Retrying in ${delay}ms...\n`);
                await new Promise(resolve => setTimeout(resolve, delay));
            } else {
                console.error("\n⛔ All connection attempts failed");
                console.error("\n📋 TROUBLESHOOTING CHECKLIST:");
                console.error("   1. Check MongoDB Atlas IP Whitelist (Network Access)");
                console.error("   2. Verify MONGO_URI credentials in .env file");
                console.error("   3. Ensure MongoDB cluster is active (not paused)");
                console.error("   4. Check your internet connection\n");
                throw error;
            }
        }
    }
};
