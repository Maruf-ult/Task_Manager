console.log("📍 START");

import './config/env.js'
console.log("env imported");

import express from 'express'
console.log("📍 express imported");

import cors from 'cors'
console.log("📍 cors imported");

import path from 'path'
console.log("📍 path imported");

import { fileURLToPath } from 'url'
console.log("📍 fileURLToPath imported");


import { connectDB } from './config/db.js'
console.log("📍 connectDB imported");

import authRoutes from './routes/authRoutes.js'
console.log("📍 authRoutes imported");

import userRoutes from './routes/userRoutes.js'
console.log("📍 userRoutes imported");

import taskRoutes from './routes/taskRoutes.js'
console.log("📍 taskRoutes imported");

import reportRoutes from './routes/reportRoutes.js'
console.log("📍 reportRoutes imported");

import { errorHandler } from './middlewares/errorMiddleware.js'
console.log("📍 errorHandler imported");

console.log("📍 Creating express app");
const app = express();


console.log("📍 Setting up CORS");
app.use(cors({
  origin: process.env.CLIENT_URL || "*",
  methods: ["GET","POST","PUT","DELETE"],
  allowedHeaders: ["Content-Type","Authorization"],
}));

console.log("📍 Setting up JSON parser");
app.use(express.json());

console.log("📍 Starting database connection");
try {
  await connectDB();
  console.log("📍 Database connected!");
} catch (error) {
  console.error("❌ Database connection failed:", error.message);
  process.exit(1);
}

console.log("📍 Setting up routes");
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/reports", reportRoutes);

console.log("📍 Setting up static files");
app.use("/uploads", express.static(path.join(path.dirname(fileURLToPath(import.meta.url)), "uploads")));

console.log("📍 Setting up global error handler");
app.use(errorHandler);

console.log("📍 Starting server");
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`\n✅ SERVER RUNNING ON PORT ${PORT}\n`);
  });
}

console.log("📍 END OF SETUP");

export default app;
