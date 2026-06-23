import express from 'express'
import { getUserProfile, loginUser, registerUser, resetPassword, sendResetOtp, updateUserProfile } from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';
import cloudinary from '../config/cloudinary.js';
import fs from 'fs';

const router = express.Router();


router.post("/register",registerUser);
router.post("/login",loginUser);
router.post("/send-reset-otp",sendResetOtp);
router.post("/reset-password",resetPassword);
router.get("/profile",protect,getUserProfile );
router.put("/profile",protect,updateUserProfile );

router.post("/upload-image", upload.single("image"), async (req, res, next) => {
  console.log("Uploaded File:", req.file);

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "task_manager",
    });

    // Delete local temporary file
    fs.unlink(req.file.path, (err) => {
      if (err) console.error("Failed to delete temp file:", err);
    });

    return res.status(200).json({ imageUrl: result.secure_url });
  } catch (error) {
    // Delete local temporary file even on error
    fs.unlink(req.file.path, (err) => {
      if (err) console.error("Failed to delete temp file:", err);
    });
    return next(error);
  }
});




export default router