import express from 'express'
import { getUserProfile, loginUser, registerUser, resetPassword, sendResetOtp, updateUserProfile } from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';
import cloudinary from '../config/cloudinary.js';
import multer from 'multer';

const router = express.Router();

const uploadSingleImage = (req, res, next) => {
  upload.single("image")(req, res, (error) => {
    if (!error) {
      return next();
    }

    const message =
      error instanceof multer.MulterError && error.code === "LIMIT_FILE_SIZE"
        ? "Image must be smaller than 5MB"
        : error.message || "Image upload failed";

    return res.status(400).json({ message });
  });
};

const uploadBufferToCloudinary = (fileBuffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "task_manager",
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(result);
      }
    );

    stream.end(fileBuffer);
  });

router.post("/register",registerUser);
router.post("/login",loginUser);
router.post("/send-reset-otp",sendResetOtp);
router.post("/reset-password",resetPassword);
router.get("/profile",protect,getUserProfile );
router.put("/profile",protect,updateUserProfile );

router.post("/upload-image", uploadSingleImage, async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  if (
    !process.env.CLOUDINARY_CLOUD_NAME ||
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET
  ) {
    return res.status(500).json({ message: "Cloudinary is not configured" });
  }

  try {
    const result = await uploadBufferToCloudinary(req.file.buffer);
    return res.status(200).json({ imageUrl: result.secure_url });
  } catch (error) {
    return next(error);
  }
});




export default router
