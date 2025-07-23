import axios from "axios";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import reset_pass_img from "../../assets/images/reset_pass_img.svg";


const ResetPass = () => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  const inputRefs = useRef([]);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.post(API_PATHS.AUTH.SEND_OTP, {
        email,
      });
      console.log(data)
      console.log(data);
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && setIsEmailSent(true);
    } catch (error) {
      console.error("API error:", error);
      toast.error(error.response?.data?.message || "An unexpected error occurred.");
    }
  };

  const onSubmitOtp = (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map((input) => input?.value || "");
    setOtp(otpArray.join(""));
    setIsOtpSubmitted(true);
  };

 const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.post(API_PATHS.AUTH.RESET_PASS,{
       email,
        otp,
        newPassword,
      })
       
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && navigate("/");
    } catch (error) {
      toast.error(error.message);
    } 
  };



 return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      
      <img
        onClick={() => navigate("/")}
        src={reset_pass_img}
        alt="Logo"
        className="absolute left-5  sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />

      <h1 className="absolute right-5 sm:right-20 top-5 font-bold text-4xl">Task Manager</h1>


  {!isEmailSent && (
        <form onSubmit={onSubmitEmail} className="bg-white p-8 rounded-lg shadow-lg w-96 text-sm">
          <h1 className="text-black text-2xl font-semibold text-center mb-4">Email Verify OTP</h1>
          <p className="text-center mb-6 text-gray-600">Enter your registered email address</p>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-gray-200">
            <input
              type="email"
              placeholder="Email id"
              className="bg-transparent outline-none text-black w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button className="w-full py-2.5 bg-[#6A38C2] text-white rounded-full mt-3 cursor-pointer">
            Submit
          </button>
        </form>
      )}

      {!isOtpSubmitted && isEmailSent && (
        <form onSubmit={onSubmitOtp} className="bg-white p-8 rounded-lg shadow-lg w-96 text-sm">
          <h1 className="text-black text-2xl font-semibold text-center mb-4">Reset Password OTP</h1>
          <p className="text-center mb-6 text-gray-600">Enter the 6-digit code sent to your email.</p>
          <div className="flex justify-between mb-8">
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  className="w-12 h-12 bg-gray-200 text-black text-center text-xl rounded-md border border-gray-300"
                  type="text"
                  maxLength="1"
                  key={index}
                  required
                  ref={(el) => (inputRefs.current[index] = el)}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                />
              ))}
          </div>
          <button
            type="submit"
            className="w-full py-2.5 bg-[#6A38C2] text-white rounded-full cursor-pointer"
          >
            Submit
          </button>
        </form>
      )}

      {isOtpSubmitted && isEmailSent && (
        <form onSubmit={onSubmitNewPassword} className="bg-white p-8 rounded-lg shadow-lg w-96 text-sm">
          <h1 className="text-black text-2xl font-semibold text-center mb-4">New Password</h1>
          <p className="text-center mb-6 text-gray-600">Enter the new password below</p>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-gray-200">
            <input
              type="text"
              placeholder="Password"
              className="bg-transparent outline-none text-black"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button className="w-full py-2.5 bg-[#6A38C2] text-white rounded-full mt-3 cursor-pointer">
            Submit
          </button>
        </form>
      )}

    </div>
  );
};

export default ResetPass;
