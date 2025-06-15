import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization?.split(" ")[1]; // Extract token safely

    console.log("Received Token:", token); // Debugging

    if (!token || token.split(".").length !== 3) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not set in environment variables");
      return res.status(500).json({ message: "Server configuration error" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(404).json({ message: "User not found" });
      }

      next();
    } catch (error) {
      console.error("JWT Verification Error:", error.message);
      return res.status(401).json({ message: "Token failed", error: error.message });
    }
  } catch (error) {
    console.error("Middleware Error:", error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const adminOnly = (req, res, next) => {
  console.log("User in adminOnly middleware:", req.user); // Ensure user is passed
  console.log("User Role:", req.user?.role); // Prevent errors if undefined
  
  if (!req.user) {
    return res.status(401).json({ message: "User not found in request" });
  }

  if (req.user.role === "admin") {
    return next();
  } else {
    return res.status(403).json({ message: "Access denied, admin only" });
  }
};