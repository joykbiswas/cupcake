import React, { useState } from "react";

interface FormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const [signIn, toggle] = useState(true);
  const [signUpData, setSignUpData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });
  const [signInData, setSignInData] = useState<Omit<FormData, "name">>({
    email: "",
    password: "",
  });

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    if (!signUpData.name || !signUpData.email || !signUpData.password) {
      alert("Please fill in all fields");
      return;
    }

    // Log data to console
    console.log("Sign Up Data:", signUpData);

    // Show success message
    alert(
      `Account created successfully!\nName: ${signUpData.name}\nEmail: ${signUpData.email}`
    );

    // Clear form
    setSignUpData({ name: "", email: "", password: "" });

    // Don't toggle the slide - form stays on sign up page
  };

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    if (!signInData.email || !signInData.password) {
      alert("Please fill in both email and password");
      return;
    }

    // Log data to console
    console.log("Sign In Data:", signInData);

    // Show success message
    alert(`Signed in successfully!\nEmail: ${signInData.email}`);

    // Clear form
    setSignInData({ email: "", password: "" });

    // Don't toggle the slide - form stays on sign in page
  };

  const handleSignUpInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignInInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignInData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-40" />
      <div className="bg-white rounded-lg shadow-[0_14px_28px_rgba(0,0,0,0.25),0_10px_10px_rgba(0,0,0,0.22)] relative overflow-hidden w-[678px] max-w-full min-h-[400px]">
        {/* Sign Up Container */}
        <div
          className={`absolute top-0 h-full transition-all duration-600 ease-in-out left-0 w-1/2 opacity-0 z-1 ${
            !signIn ? "transform translate-x-full opacity-100 z-5" : ""
          }`}
        >
          <form
            onSubmit={handleSignUpSubmit}
            className="bg-white flex items-center justify-center flex-col px-[50px] h-full text-center"
          >
            <h1 className="font-bold m-0">Create Account</h1>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={signUpData.name}
              onChange={handleSignUpInputChange}
              className="bg-[#eee] border-none px-[15px] py-3 my-2 w-full"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={signUpData.email}
              onChange={handleSignUpInputChange}
              className="bg-[#eee] border-none px-[15px] py-3 my-2 w-full"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={signUpData.password}
              onChange={handleSignUpInputChange}
              className="bg-[#eee] border-none px-[15px] py-3 my-2 w-full"
              required
            />
            <button
              type="submit"
              className="rounded-2xl border border-[#ff4b2b] bg-[#ff4b2b] text-white text-xs font-bold px-[45px] py-3 tracking-wide uppercase transition-transform duration-80 ease-in active:scale-95 focus:outline-none"
            >
              Sign Up
            </button>
          </form>
        </div>

        {/* Sign In Container */}
        <div
          className={`absolute top-0 h-full transition-all duration-600 ease-in-out left-0 w-1/2 z-2 ${
            !signIn ? "transform translate-x-full" : ""
          }`}
        >
          <form
            onSubmit={handleSignInSubmit}
            className="bg-white flex items-center justify-center flex-col px-[50px] h-full text-center"
          >
            <h1 className="font-bold m-0">Sign in</h1>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={signInData.email}
              onChange={handleSignInInputChange}
              className="bg-[#eee] border-none px-[15px] py-3 my-2 w-full"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={signInData.password}
              onChange={handleSignInInputChange}
              className="bg-[#eee] border-none px-[15px] py-3 my-2 w-full"
              required
            />
            <a href="#" className="text-[#333] text-sm no-underline my-[15px]">
              Forgot your password?
            </a>
            <button
              type="submit"
              className="rounded-2xl border border-[#ff4b2b] bg-[#ff4b2b] text-white text-xs font-bold px-[45px] py-3 tracking-wide uppercase transition-transform duration-80 ease-in active:scale-95 focus:outline-none"
            >
              Sign In
            </button>
          </form>
        </div>

        {/* Overlay Container */}
        <div
          className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-600 ease-in-out z-100 ${
            !signIn ? "transform -translate-x-full" : ""
          }`}
        >
          <div
            className={`bg-gradient-to-r from-[#ff4b2b] to-[#ff416c] text-white relative left-[-100%] h-full w-[200%] transform transition-transform duration-600 ease-in-out ${
              !signIn ? "transform translate-x-1/2" : ""
            }`}
          >
            {/* Left Overlay Panel */}
            <div
              className={`absolute flex items-center justify-center flex-col px-10 text-center top-0 h-full w-1/2 transform transition-transform duration-600 ease-in-out ${
                !signIn
                  ? "transform translate-x-0"
                  : "transform -translate-x-1/5"
              }`}
            >
              <h1 className="font-bold m-0">Welcome Back!</h1>
              <p className="text-sm font-thin leading-5 tracking-wide my-5">
                To keep connected with us please login with your personal info
              </p>
              <button
                onClick={() => toggle(true)}
                className="rounded-2xl border border-white bg-transparent text-white text-xs font-bold px-[45px] py-3 tracking-wide uppercase transition-transform duration-80 ease-in active:scale-95 focus:outline-none"
              >
                Sign In
              </button>
            </div>

            {/* Right Overlay Panel */}
            <div
              className={`absolute flex items-center justify-center flex-col px-10 text-center top-0 h-full w-1/2 right-0 transform transition-transform duration-600 ease-in-out ${
                !signIn
                  ? "transform translate-x-1/5"
                  : "transform translate-x-0"
              }`}
            >
              <h1 className="font-bold m-0">Hello, Friend!</h1>
              <p className="text-sm font-thin leading-5 tracking-wide my-5">
                Enter your personal details and start journey with us
              </p>
              <button
                onClick={() => toggle(false)}
                className="rounded-2xl border border-white bg-transparent text-white text-xs font-bold px-[45px] py-3 tracking-wide uppercase transition-transform duration-80 ease-in active:scale-95 focus:outline-none"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;