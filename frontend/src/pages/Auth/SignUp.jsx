import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Inputs.jsx";
import ProfilePhotoSelector from "../../components/inputs/ProfilePhotoSelector.jsx";
import AuthLayout from "../../components/layouts/AuthLayout.jsx";
import { UserContext } from "../../context/UseContext.jsx";
import { API_PATHS } from "../../utils/apiPaths.js";
import axiosInstance from "../../utils/axiosInstance.js";
import { validateEmail } from "../../utils/helper";
import uploadImage from "../../utils/uploadImage.js";

function SignUp() {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminInviteToken, setAdminInviteToken] = useState("");

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);
const handleSignup = async (e) => {
  e.preventDefault();

  let profileImageUrl = "";

  if (!fullName) {
    setError("Please enter full name.");
    return;
  }

  if (!validateEmail(email)) {
    setError("Please enter a valid email address");
    return;
  }
  if (!password) {
    setError("Please enter the password");
    return;
  }

  setError("");

  try {
  
 if (profilePic && profilePic instanceof File) {
  try {
    const imgUploadRes = await uploadImage(profilePic);
    profileImageUrl = imgUploadRes?.imageUrl || "";
  } catch (err) {
    console.error("Image upload failed:", err);
    setError("Failed to upload profile image.");
    return;
  }
}

    const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
      name: fullName,
      email,
      password,
      profileImageUrl,
      adminInviteToken,
    });

    const userData = response.data; 

    if (userData.token) {
      localStorage.setItem("token", userData.token);
      updateUser(userData);

      if (userData.role === "admin") {
        navigate("/admin/dashboard");
      } else if (userData.role === "member") {
        navigate("/user/dashboard");
      } else {
        navigate("/login");
      }
    }
  } catch (error) {
    if (error.response && error.response.data.message) {
      setError(error.response.data.message);
    } else {
      setError("Something went wrong. Please try again.");
    }
  }
};


  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center  ">
        <h3 className="text-xl font-semibold text-black mt-16">
          Create an Account{" "}
        </h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignup} className="space-y-2 mb-20">
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                label="Full Name"
                placeholder="John"
                type="text"
                className="w-full"
              />
            </div>
            <div>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email Address"
                placeholder="john@example.com"
                type="text"
                className="w-full"
              />
            </div>
            <div>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                placeholder="Min 8 Characters"
                type="password"
                className="w-full"
              />
            </div>
            <div>
              <Input
                value={adminInviteToken}
                onChange={(e) => setAdminInviteToken(e.target.value)}
                label="Admin Invite Token"
                placeholder="6 Digit Code"
                type="text"
                className="w-full"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-xs">{error}</p>}

          <button type="submit" className="btn-primary w-full mt-4">
            SIGN UP
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Already have an account?{" "}
            <Link className="font-medium text-primary underline" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}

export default SignUp;
