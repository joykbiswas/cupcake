import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
 
const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string | undefined;
const uploadPreset = (import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string | undefined) || 'cake_upload';

interface FormData {
  name: string;
  email: string;
  password: string;
  photo: File | null;
}

const SignUp: React.FC = () => {
  const [signin, toggle] = useState(true);
  const [signUpData, setSignUpData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    photo: null,
  });
  const [signInData, setSignInData] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const  axiosPublic = useAxiosPublic();
  console.log("axiosPublic", axiosPublic);
  // const { register, handleSubmit,reset, formState: { errors }} = useForm()
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data FIRST
    if (!signUpData.name || !signUpData.email || !signUpData.password) {
      alert("Please fill in all fields");
      return;
    }
    
    // Optional: require photo for profile
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
      // Upload image if provided
      let uploadedPhotoUrl = "";
      if (signUpData.photo) {
        if (!cloudName) {
          alert('Cloudinary cloud name is missing. Set VITE_CLOUDINARY_CLOUD_NAME.');
          return;
        }
        const data = new FormData();
        data.append('file', signUpData.photo);
        data.append('upload_preset', uploadPreset);
        data.append('cloud_name', cloudName);
        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: 'POST',
          body: data,
        });
        if (!res.ok) {
          const text = await res.text();
          console.error('Cloudinary upload failed', text);
          alert('Image upload failed. Please try again.');
          return;
        }
        const uploaded = await res.json();
        console.log('cloudinary response', uploaded);
        uploadedPhotoUrl = uploaded?.secure_url || uploaded?.url || '';
        if (!uploadedPhotoUrl) {
          alert('Could not get uploaded image URL from Cloudinary response.');
          return;
        }
      }

      const userCred = await createUser(signUpData.email, signUpData.password);
      console.log('signed up user', userCred.user);
      await updateUserprofile(signUpData.name, uploadedPhotoUrl);
      try { await userCred.user.reload(); } catch (e) { console.warn('user reload failed', e); }
      console.log('updated profile photoURL', userCred.user.photoURL);

      const userInfo = { name: signUpData.name, email: signUpData.email, photo: uploadedPhotoUrl || "" };
      try { await axiosPublic.post('/users', userInfo); } catch { /* optional */ }

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "User created successfully",
        showConfirmButton: false,
        timer: 1500
      });
      setSignUpData({ name: "", email: "", password: "", photo: null });
      navigate('/');
    } catch (error) {
      console.error(error);
      alert(error.message || 'Failed to sign up');
    }
  };
// -------------- Sign In Auth Functionality  --------------
  const signIn = auth?.signIn;
  const location = useLocation();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const from = location.state?.from?.pathname || "/";
  console.log('user location login', location.state);

  // const handleSignInSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
    
  //   // Validate form data FIRST
  //   if (!signInData.email || !signInData.password) {
  //     setError("Please fill in both email and password");
  //     return;
  //   }

  //   // Clear any previous errors
  //   setError('');
  //   setIsLoading(true);

  //   // Log data to console
  //   console.log("Sign In Data:", signInData);

  //   // Call Firebase sign in
  //   signIn?.(signInData.email, signInData.password)
  //       .then(result =>{
  //         const user = result.user;
  //         console.log(user);
          
  //         // Clear form only on successful login
  //         setSignInData({ email: "", password: "" });
  //         setIsLoading(false);
          
  //         Swal.fire({
  //           title: "User login successful",
  //           showClass: {
  //             popup: `
  //               animate__animated
  //               animate__fadeInUp
  //               animate__faster
  //             `
  //           },
  //           hideClass: {
  //             popup: `
  //               animate__animated
  //               animate__fadeOutDown
  //               animate__faster
  //             `
  //           }
  //         });
  //         navigate(from, {replace: true});
  //       })
  //       .catch(error=>{
  //         setError(error.message);
  //         setIsLoading(false);
  //         console.error(error);
  //       });
  // };
  
  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data FIRST
    if (!signInData.email || !signInData.password) {
      setError("Please fill in both email and password");
      return;
    }

    // Clear any previous errors
    setError('');
    setIsLoading(true);

    // Log data to console
    console.log("Sign In Data:", signInData);

    // Call Firebase sign in
    if (!signIn) {
      setError('Authentication is not ready. Please try again in a moment.');
      setIsLoading(false);
      return;
    }

    signIn(signInData.email, signInData.password)
        .then(result =>{
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
              `
            },
            hideClass: {
              popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `
            }
          });
          navigate(from, {replace: true});
        })
        .catch(error=>{
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

  return (
    <div className="min-h-screen flex items-center justify-center ">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-40" />
      <div className="bg-white rounded-lg shadow-[0_14px_28px_rgba(0,0,0,0.25),0_10px_10px_rgba(0,0,0,0.22)] relative overflow-hidden w-[678px] max-w-full min-h-[400px]">
        {/* Sign Up Container */}
        <div
          className={`absolute top-0 h-full transition-all duration-600 ease-in-out left-0 w-1/2 opacity-0 z-1 ${
            !signin? "transform translate-x-full opacity-100 z-5" : ""
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
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleSignUpPhotoChange}
              className="bg-[#eee] border-none px-[15px] py-3 my-2 w-full"
            />
            <button
              type="submit"
              className="rounded-2xl border border-[#ff4b2b] bg-[#ff4b2b] text-white text-xs font-bold px-[45px] py-3 tracking-wide uppercase transition-transform duration-80 ease-in active:scale-95 focus:outline-none"
            >
              Sign Up
            </button>
            <SocialLogin />
           
          </form>
        </div>

        {/* Sign In Container */}
        <div
          className={`absolute top-0 h-full transition-all duration-600 ease-in-out left-0 w-1/2 z-2 ${
            !signin? "transform translate-x-full" : ""
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
              disabled={isLoading}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={signInData.password}
              onChange={handleSignInInputChange}
              className="bg-[#eee] border-none px-[15px] py-3 my-2 w-full"
              required
              disabled={isLoading}
            />
            {error && (
              <div className="text-red-500 text-sm mt-2 mb-2">
                {error}
              </div>
            )}
            <a href="#" className="text-[#333] text-sm no-underline my-[15px]">
              Forgot your password?
            </a>
            <button
              type="submit"
              disabled={isLoading}
              className={`rounded-2xl border border-[#ff4b2b] text-white text-xs font-bold px-[45px] py-3 tracking-wide uppercase transition-transform duration-80 ease-in active:scale-95 focus:outline-none ${
                isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-[#ff4b2b] hover:bg-[#ff416c]'
              }`}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
            <SocialLogin />
            <p
            onClick={() => toggle(false)}
             className='pb-4 pl-3 md:pl-8'><>New Here? <Link className='text-red-400   hover:underline' to='/signup'>Create an account</Link></></p>
          </form>
         
        </div>

        {/* Overlay Container */}
        <div
          className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-600 ease-in-out z-100 ${
            !signin? "transform -translate-x-full" : ""
          }`}
        >
          <div
            className={`bg-gradient-to-r from-[#ff4b2b] to-[#ff416c] text-white relative left-[-100%] h-full w-[200%] transform transition-transform duration-600 ease-in-out ${
              !signin? "transform translate-x-1/2" : ""
            }`}
          >
            {/* Left Overlay Panel */}
            <div
              className={`absolute flex items-center justify-center flex-col px-10 text-center top-0 h-full w-1/2 transform transition-transform duration-600 ease-in-out ${
                !signin
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
                !signin
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