import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Inputs.jsx";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link } from "react-router-dom";
import { validateEmail } from "../../utils/helper.js";
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPaths.js";
import { UserContext } from "../../context/UseContext.jsx";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();

  if (!validateEmail(email)) return setError("Invalid email");
  if (!password) return setError("Enter password");

  try {
    const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
      email,
      password,
    });

    console.log("Login response:", response.data);

    const userData = response.data;
    updateUser(userData);

    if (userData.role === "admin") {
      navigate("/admin/dashboard");
    } else if (userData.role === "member") {
      navigate("/user/dashboard");
    } else {
      navigate("/login");
    }
  } catch (error) {
    console.error("Login error:", error);
    setError(
      error.response?.data?.message || error.message || "Something went wrong. Try again."
    );
  }
};

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6 ">
          Please enter your details to log in
        </p>

        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="text"
          />

          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            placeholder="Min 8 Characters"
            type="password"
          />
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          <button type="submit" className="btn-primary">
            LOGIN
          </button>
          <div className="flex gap-x-30">
          <p className="text-[13px] text-slate-800 mt-3">
            Dont have an account?{" "}
            <Link className="font-medium text-primary underline" to="/signup">
              SignUp
            </Link>
          </p>
           <p className="text-[13px] text-slate-800 mt-3">
            Forgot Password?{" "}
            <Link className="font-medium text-primary underline" to="/reset-pass">
              Reset Pass
            </Link>
          </p>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}

export default Login;
