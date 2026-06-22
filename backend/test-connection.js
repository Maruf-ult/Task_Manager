console.log("🔍 Test script started...");

import dotenv from 'dotenv';
console.log("✅ dotenv imported");

dotenv.config();
console.log("✅ dotenv configured");
console.log("MONGO_URI exists:", !!process.env.MONGO_URI);

import mongoose from 'mongoose';
console.log("✅ mongoose imported");

const testConnection = async () => {
  console.log("\n🔄 Attempting MongoDB connection...");
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "TaskManager",
      serverSelectionTimeoutMS: 60000,
      connectTimeoutMS: 60000,
      socketTimeoutMS: 60000,
    });
    console.log("✅ Connected successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Connection failed:");
    console.error("Error:", error.message);
    console.error("Code:", error.code);
    process.exit(1);
  }
};

testConnection();
