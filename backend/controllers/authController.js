import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import transporter from "../config/nodeMailer.js";
import User from "../models/User.js";
import {PASSWORD_RESET_TEMPLATE,CONGRATS_MSG_TEMPLATE } from '../config/emailTemplates.js'


const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, profileImageUrl, adminInviteToken } =
      req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    let role = "member";
    if (
      adminInviteToken &&
      adminInviteToken == process.env.ADMIN_INVITE_TOKEN
    ) {
      role = "admin";
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      profileImageUrl,
      role,
    });

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to Task Manager",
      html: CONGRATS_MSG_TEMPLATE({ email: user.email })
    };

    await transporter.sendMail(mailOptions);

    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImageUrl: user.profileImageUrl,
      token: generateToken(user._id),
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImageUrl: user.profileImageUrl,
      token: generateToken(user._id),
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const sendResetOtp = async(req,res) => {
    const {email} = req.body;

    if(!email){
      return res.status(400).json({message:'Email is required'})
    }

    try {
       const user =  await User.findOne({email});

       if(!user){
        return res.status(404).json({message:'User not found'})
       }

       
      const otp = String(Math.floor(100000 + Math.random()*900000)); 
      user.resetOtp = otp;
      user.resetOtpExpireAt = Date.now() + 15*60*1000;

      await user.save();

      const mailOption = {
        from:process.env.SENDER_EMAIL,
        to:user.email,
        subject:"Password Reset OTP",
        html:PASSWORD_RESET_TEMPLATE.replace("{{otp}}",otp).replace(
          "{{email}}",
          user.email
        ),
      };

      await transporter.sendMail(mailOption);


      return res.status(200).json({success:true, message:'OTP sent to your email'})
      

    } catch (error) {
       return res.status(500).json({ message: error.message });
    }
}


export const resetPassword = async(req,res) => {
    const {email,otp,newPassword} = req.body;

    if(!email|| !otp || !newPassword){
      return res.status(401).json({message:'email,otp & new password are required'})
    }

    try {
        const user = await User.findOne({email});

        if(!user){
          return res.status(403).json({message:"User not found"});
        }


        if(!user.resetOtp || user.resetOtp!=otp){
          return res.status(403).json({message:"Invalid OTP"});
        }

        if(user.resetOtpExpireAt < Date.now()){
           return res.status(403).json({message:"OTP expired"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword,salt);

        user.password = hashedPassword;
        user.resetOtp = "";
        user.resetOtpExpireAt = 0;

        await user.save();

        return res.status(200).json({success: true, message:"Password has been reset successfully"});

    } catch (error) {
         return res.status(500).json({ message: error.message });
    }


}



export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);

      const updateUser = await user.save();

      return res.json({
        _id: updateUser._id,
        name: updateUser.name,
        email: updateUser.email,
        role: updateUser.role,
        token: generateToken(updateUser._id),
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
