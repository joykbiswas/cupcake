import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Eye, EyeOff, Upload, User, Mail, Lock } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as
  | string
  | undefined;
const uploadPreset =
  (import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string | undefined) ||
  "cake_upload";

interface FormData {
  name: string;
  email: string;
  password: string;
  photo: File | null;
}

// Demo credentials for admin and user
const DEMO_CREDENTIALS = {
  admin: {
    email: "admin@demo.com",
    password: "admin123",
  },
  user: {
    email: "user@demo.com",
    password: "user123",
  },
};

const SignUp: React.FC = () => {
  const [signin, toggle] = useState(true);
  const [signUpData, setSignUpData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    photo: null,
  });
  const [signInData, setSignInData] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);

  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!signUpData.name || !signUpData.email || !signUpData.password) {
      alert("Please fill in all fields");
      return;
    }

    if (!signUpData.photo) {
      alert("Please select a profile image to upload");
      return;
    }

    const createUser = auth?.createUser;
    const updateUserprofile = auth?.updateUserprofile;

    if (!createUser || !updateUserprofile) {
      alert("Authentication is not ready. Please try again in a moment.");
      return;
    }

    try {
      let uploadedPhotoUrl = "";
      if (signUpData.photo) {
        if (!cloudName) {
          alert(
            "Cloudinary cloud name is missing. Set VITE_CLOUDINARY_CLOUD_NAME."
          );
          return;
        }
        const data = new FormData();
        data.append("file", signUpData.photo);
        data.append("upload_preset", uploadPreset);
        data.append("cloud_name", cloudName);
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: data,
          }
        );
        if (!res.ok) {
          const text = await res.text();
          console.error("Cloudinary upload failed", text);
          alert("Image upload failed. Please try again.");
          return;
        }
        const uploaded = await res.json();
        uploadedPhotoUrl = uploaded?.secure_url || uploaded?.url || "";
        if (!uploadedPhotoUrl) {
          alert("Could not get uploaded image URL from Cloudinary response.");
          return;
        }
      }

      const userCred = await createUser(signUpData.email, signUpData.password);
      await updateUserprofile(signUpData.name, uploadedPhotoUrl);
      try {
        await userCred.user.reload();
      } catch (e) {
        console.warn("user reload failed", e);
      }

      const userInfo = {
        name: signUpData.name,
        email: signUpData.email,
        photo: uploadedPhotoUrl || "",
      };
      try {
        await axiosPublic.post("/users", userInfo);
      } catch {
        /* optional */
      }

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "User created successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      setSignUpData({ name: "", email: "", password: "", photo: null });
      navigate("/");
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        alert(error.message || "Failed to sign up");
      } else {
        alert("Failed to sign up");
      }
    }
  };

  const signIn = auth?.signIn;
  const location = useLocation();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const from = location.state?.from?.pathname || "/";

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!signInData.email || !signInData.password) {
      setError("Please fill in both email and password");
      return;
    }

    setError("");
    setIsLoading(true);

    if (!signIn) {
      setError("Authentication is not ready. Please try again in a moment.");
      setIsLoading(false);
      return;
    }

    signIn(signInData.email, signInData.password)
      .then((result) => {
        const user = result.user;
        console.log(user);

        // Clear form only on successful login
        setSignInData({ email: "", password: "" });

        Swal.fire({
          title: "User login successful",
          showClass: {
            popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `,
          },
          hideClass: {
            popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `,
          },
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setError(error.message);
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSignUpInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignUpPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
    setSignUpData((prev) => ({
      ...prev,
      photo: file,
    }));
  };

  const handleSignInInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignInData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Function to fill demo credentials
  const fillDemoCredentials = (type: "admin" | "user") => {
    setSignInData({
      email: DEMO_CREDENTIALS[type].email,
      password: DEMO_CREDENTIALS[type].password,
    });
  };

  return (
      <div className="min-h-screen flex items-center justify-center py-8 bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-40" />

      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white rounded-lg shadow-[0_14px_28px_rgba(0,0,0,0.25),0_10px_10px_rgba(0,0,0,0.22)] relative overflow-hidden w-[800px] max-w-full min-h-[600px]"
      >
        {/* Sign Up Container */}
        <div
          className={`absolute top-0 h-full transition-all duration-600 ease-in-out left-0 w-1/2 opacity-0 z-1 ${
            !signin ? "transform translate-x-full opacity-100 z-5" : ""
          }`}
        >
          <form
            onSubmit={handleSignUpSubmit}
            className="bg-white flex items-center justify-center flex-col px-12 h-full text-center space-y-6"
          >
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="font-bold text-3xl text-gray-800 mb-2"
            >
              Create Account
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-600 text-sm mb-6"
            >
              Join our sweet community
            </motion.p>

            {/* Name Input */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="relative w-full"
            >
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-teal-700" />
              </div>
              <input
                className="pl-10 peer/name block w-full rounded-xl border-2 border-gray-300 bg-gray-50 p-3.5 shadow-sm outline-none transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                type="text"
                name="name"
                value={signUpData.name}
                onChange={handleSignUpInputChange}
                placeholder=""
                id="navigate_ui_name_33"
                required
              />
              <label
                className="absolute -top-2 left-8 rounded-md bg-gray-300 px-2 text-xs text-gray-700 font-medium duration-300 peer-placeholder-shown/name:top-3.5 peer-placeholder-shown/name:bg-transparent peer-placeholder-shown/name:text-sm peer-placeholder-shown/name:text-gray-500 peer-focus/name:-top-2 peer-focus/name:bg-blue-600 peer-focus/name:text-xs peer-focus/name:text-white"
                htmlFor="navigate_ui_name_33"
              >
                Full Name
              </label>
            </motion.div>

            {/* Email Input */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="relative w-full"
            >
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-teal-700" />
              </div>
              <input
                className="pl-10 peer/email block w-full rounded-xl border-2 border-gray-300 bg-gray-50 p-3.5 shadow-sm outline-none transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                type="email"
                name="email"
                value={signUpData.email}
                onChange={handleSignUpInputChange}
                placeholder=""
                id="navigate_ui_email_33"
                required
              />
              <label
                className="absolute -top-2 left-8 rounded-md bg-gray-300 px-2 text-xs text-gray-700 font-medium duration-300 peer-placeholder-shown/email:top-3.5 peer-placeholder-shown/email:bg-transparent peer-placeholder-shown/email:text-sm peer-placeholder-shown/email:text-gray-500 peer-focus/email:-top-2 peer-focus/email:bg-blue-600 peer-focus/email:text-xs peer-focus/email:text-white"
                htmlFor="navigate_ui_email_33"
              >
                Email Address
              </label>
            </motion.div>

            {/* Password Input */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="relative w-full"
            >
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-teal-700" />
              </div>
              <input
                className="pl-10 pr-10 peer/pass block w-full rounded-xl border-2 border-gray-300 bg-gray-50 p-3.5 shadow-sm outline-none transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                type={showSignUpPassword ? "text" : "password"}
                name="password"
                value={signUpData.password}
                onChange={handleSignUpInputChange}
                placeholder=""
                id="navigate_ui_password_33"
                required
              />
              <label
                className="absolute -top-2 left-8 rounded-md bg-gray-300 px-2 text-xs text-gray-700 font-medium duration-300 peer-placeholder-shown/pass:top-3.5 peer-placeholder-shown/pass:bg-transparent peer-placeholder-shown/pass:text-sm peer-placeholder-shown/pass:text-gray-500 peer-focus/pass:-top-2 peer-focus/pass:bg-blue-600 peer-focus/pass:text-xs peer-focus/pass:text-white"
                htmlFor="navigate_ui_password_33"
              >
                Password
              </label>
              <button
                type="button"
                className="absolute right-3 top-3.5 text-gray-500 hover:text-teal-600 transition-colors"
                onClick={() => setShowSignUpPassword(!showSignUpPassword)}
              >
                {showSignUpPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </motion.div>

            {/* Photo Input */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="relative w-full"
            >
              <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                Profile Photo
              </label>
              <div className="relative">
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handleSignUpPhotoChange}
                  className="block w-full rounded-xl border-2 border-gray-300 bg-gray-50 p-3.5 shadow-sm outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 opacity-0 absolute inset-0 z-10 cursor-pointer"
                />
                <div className="bg-gray-50 border-2 border-gray-300 rounded-xl p-3 text-center flex items-center justify-center gap-2">
                  <Upload className="h-5 w-5 text-teal-700" />
                  <span className="text-gray-700 font-medium">
                    {signUpData.photo
                      ? signUpData.photo.name
                      : "Choose profile photo"}
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-teal-600 to-blue-800 text-white font-semibold px-8 py-4 tracking-wide uppercase transition-all duration-300 hover:from-teal-700 hover:to-blue-900 hover:shadow-lg transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
            >
              Create Account
            </motion.button>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
              className="w-full"
            >
              <SocialLogin />
            </motion.div>
          </form>
        </div>

        {/* Sign In Container */}
        <div
          className={`absolute top-0 h-full transition-all duration-600 ease-in-out left-0 w-1/2 z-2 ${
            !signin ? "transform translate-x-full" : ""
          }`}
        >
          <form
            onSubmit={handleSignInSubmit}
            className="bg-white flex items-center justify-center flex-col px-12 h-full text-center space-y-4"
          >
            <motion.h1
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="font-bold text-3xl text-gray-800 mb-2"
            >
              Welcome Back
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-600 text-sm mb-6"
            >
              Sign in to your account
            </motion.p>

            {/* Email Input */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="relative w-full"
            >
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-teal-700" />
              </div>
              <input
                className="pl-10 peer/email block w-full rounded-xl border-2 border-gray-300 bg-gray-50 p-3.5 shadow-sm outline-none transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                type="email"
                name="email"
                value={signInData.email}
                onChange={handleSignInInputChange}
                placeholder=""
                id="signin_email_33"
                required
                disabled={isLoading}
              />
              <label
                className="absolute -top-2 left-8 rounded-md bg-gray-300 px-2 text-xs text-gray-700 font-medium duration-300 peer-placeholder-shown/email:top-3.5 peer-placeholder-shown/email:bg-transparent peer-placeholder-shown/email:text-sm peer-placeholder-shown/email:text-gray-500 peer-focus/email:-top-2 peer-focus/email:bg-blue-600 peer-focus/email:text-xs peer-focus/email:text-white"
                htmlFor="signin_email_33"
              >
                Email Address
              </label>
            </motion.div>

            {/* Password Input */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="relative w-full"
            >
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-teal-700" />
              </div>
              <input
                className="pl-10 pr-10 peer/pass block w-full rounded-xl border-2 border-gray-300 bg-gray-50 p-3.5 shadow-sm outline-none transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                type={showPassword ? "text" : "password"}
                name="password"
                value={signInData.password}
                onChange={handleSignInInputChange}
                placeholder=""
                id="signin_password_33"
                required
                disabled={isLoading}
              />
              <label
                className="absolute -top-2 left-8 rounded-md bg-gray-300 px-2 text-xs text-gray-700 font-medium duration-300 peer-placeholder-shown/pass:top-3.5 peer-placeholder-shown/pass:bg-transparent peer-placeholder-shown/pass:text-sm peer-placeholder-shown/pass:text-gray-500 peer-focus/pass:-top-2 peer-focus/pass:bg-blue-600 peer-focus/pass:text-xs peer-focus/pass:text-white"
                htmlFor="signin_password_33"
              >
                Password
              </label>
              <button
                type="button"
                className="absolute right-3 top-3.5 text-gray-500 hover:text-teal-600 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </motion.div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0, x: 30 }}
                  animate={{ opacity: 1, height: "auto", x: 0 }}
                  exit={{ opacity: 0, height: 0, x: 30 }}
                  className="w-full text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-200"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.a
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              href="#"
              className="text-teal-600 text-sm no-underline hover:text-teal-700 hover:underline transition-colors"
            >
              Forgot your password?
            </motion.a>

            <motion.button
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              type="submit"
              disabled={isLoading}
              className={`w-full rounded-xl font-semibold px-8 py-4 tracking-wide uppercase transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isLoading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-teal-600 to-blue-800 text-white hover:from-teal-700 hover:to-blue-900 hover:shadow-lg focus:ring-teal-400"
              }`}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </motion.button>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="w-full"
            >
              <SocialLogin />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
              className="text-gray-700"
            >
              New Here?{" "}
              <button
                type="button"
                onClick={() => toggle(false)}
                className="text-teal-600 font-semibold hover:text-teal-700 hover:underline transition-colors"
              >
                Create an account
              </button>
            </motion.p>

            {/* Admin/User Presets */}
            <div className="border-t border-gray-200 pt-4 w-full">
              <p className="text-center text-sm text-gray-600 mb-4">
                Quick login options
              </p>
              <div className="flex space-x-4 justify-center">
                <button
                  type="button"
                  onClick={() => fillDemoCredentials("admin")}
                  className="bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-900 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm"
                >
                  Admin Login
                </button>
                <button
                  type="button"
                  onClick={() => fillDemoCredentials("user")}
                  className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-sm"
                >
                  User Login
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Overlay Container */}
        <div
          className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-600 ease-in-out z-100 ${
            !signin ? "transform -translate-x-full" : ""
          }`}
        >
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`bg-gradient-to-r from-teal-600 via-blue-800 to-teal-600 text-white relative left-[-100%] h-full w-[200%] transform transition-transform duration-600 ease-in-out ${
              !signin ? "transform translate-x-1/2" : ""
            }`}
          >
            {/* Left Overlay Panel */}
            <div
              className={`group absolute flex items-center justify-center flex-col px-10 text-center top-0 h-full w-1/2 transform transition-transform duration-600 ease-in-out ${
                !signin
                  ? "transform translate-x-0"
                  : "transform -translate-x-1/5"
              }`}
            >
              <span className="absolute -left-8 -top-8 z-20 h-32 w-32 rounded-full bg-blue-800/20 duration-500 group-hover:h-56 group-hover:w-56"></span>
              <span className="absolute -left-5 -top-5 z-10 h-36 w-36 rounded-full bg-blue-800/50"></span>

              <motion.h1
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="font-bold text-2xl mb-4"
              >
                Welcome Back!
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="text-blue-100 text-sm leading-5 tracking-wide mb-8"
              >
                To keep connected with us please login with your personal info
              </motion.p>
              <motion.button
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                onClick={() => toggle(true)}
                className="rounded-xl border-2 border-white bg-transparent text-white font-semibold px-8 py-3 tracking-wide uppercase transition-all duration-300 hover:bg-white hover:text-teal-700 transform hover:-translate-y-0.5"
              >
                Sign In
              </motion.button>
            </div>

            {/* Right Overlay Panel */}
            <div
              className={`group absolute flex items-center justify-center flex-col px-10 text-center top-0 h-full w-1/2 right-0 transform transition-transform duration-600 ease-in-out ${
                !signin
                  ? "transform translate-x-1/5"
                  : "transform translate-x-0"
              }`}
            >
              <span className="absolute -right-8 -top-8 z-20 h-32 w-32 rounded-full bg-blue-800/20 duration-500 group-hover:h-56 group-hover:w-56"></span>
              <span className="absolute -right-5 -top-5 z-10 h-36 w-36 rounded-full bg-blue-800/50"></span>

              <motion.h1
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="font-bold text-2xl mb-4"
              >
                Hello, Friend!
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="text-blue-100 text-sm leading-5 tracking-wide mb-8"
              >
                Enter your personal details and start your sweet journey with us
              </motion.p>
              <motion.button
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                onClick={() => toggle(false)}
                className="rounded-xl border-2 border-white bg-transparent text-white font-semibold px-8 py-3 tracking-wide uppercase transition-all duration-300 hover:bg-white hover:text-teal-900 transform hover:-translate-y-0.5"
              >
                Sign Up
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
