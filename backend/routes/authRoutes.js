import express from 'express'
import { getUserProfile, loginUser, registerUser, updateUserProfile } from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();


router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/profile",protect,getUserProfile );
router.put("/profile",protect,updateUserProfile );

router.post("/upload-image",upload.single("image"), (req,res) =>{
     console.log(req.file)
     if(!req.file){
          return res.status(400).json({message:"No file uploaded"});
     }
     const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
     return res.status(200).json({imageUrl});
} )



export default router