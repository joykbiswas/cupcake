import { useState } from "react";
import logo from "../../assets/cake.webp";
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart";
import CartDrawer from "../../components/SideBar/CartDrawer"; 
const SlideDown = (delay: number) => {
  return {
    initial: {
      y: -100, // Fixed: Use number instead of string
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        delay: delay,
        duration: 0.6,
      },
    },
  };
};

export default function Navbar() {
  const [cart] = useCart();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const auth = useAuth();
  const user = auth?.user;
  const logOut = auth?.logOut;

  const handleLogOut = () => {
    logOut?.()
      .then(() => {})
      .catch((error) => console.error(error));
  };

  const NavbarMenu = [
    {
      id: 1,
      title: "Home",
      path: "/",
      delay: 0.1,
    },
    {
      id: 2,
      title: "All Product",
      path: "all-product",
      delay: 0.3,
    },
    {
      id: 3,
      title: "About",
      path: "about",
      delay: 0.5,
    },
    {
      id: 4,
      title: "Dashboard",
      path: "/dashboard/adminHome",
      delay: 0.7,
    },
  ];

  return (
    <>
    <nav className="bg-[#3d1816b3] poppins dark:bg-gray-900 font- fixed w-full z-50 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-2xl mx-auto flex flex-wrap items-center justify-between px-12 py-4">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} className="h-8" alt="Cupcake Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              Cup Cake
            </span>
          </Link>
        </motion.div>

        {/* Right Buttons */}
        <div className="flex md:order-2 space-x-3 gap-4 md:space-x-0 rtl:space-x-reverse">
          {/* Cart Button (visible on all devices) */}
          <motion.div
              variants={SlideDown(1)}
              initial="initial"
              animate="animate"
              className="flex-none"
            >
              <button 
                onClick={() => setIsCartOpen(true)}
                className="btn btn-ghost btn-circle relative"
              >
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  {cart.length > 0 && (
                    <span className="badge badge-sm indicator-item bg-red-500 text-white">
                      {cart.length}
                    </span>
                  )}
                </div>
              </button>
            </motion.div>

          {/* Profile Image (hidden on small devices) */}
          <motion.div
            variants={SlideDown(1)}
            initial="initial"
            animate="animate"
            className="flex-none md:flex hidden"
          >
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={
                      user?.photoURL ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                  />
                </div>
              </div>
              {user ? (
                <div
                  tabIndex={0}
                  className="dropdown-content z-20 mt-3 w-80 rounded-xl bg-white/95 backdrop-blur shadow-2xl overflow-hidden border border-gray-100"
                >
                  <div className="p-4 flex items-center gap-3 border-b">
                    <div className="relative">
                      <img
                        src={
                          user.photoURL ||
                          "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        }
                        alt="avatar"
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full ring-2 ring-white" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-gray-900 truncate">
                        {user.displayName || user.email}
                      </div>
                      <div className="text-sm text-gray-500">Member</div>
                    </div>
                  </div>

                  <ul className="p-2 text-gray-700">
                    <li>
                      <a className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                        My Profile
                      </a>
                    </li>
                    <li>
                      <a className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <path d="M19.14 12.94a7.997 7.997 0 000-1.88l2.03-1.58a.5.5 0 00.12-.64l-1.92-3.32a.5.5 0 00-.6-.22l-2.39.96a7.994 7.994 0 00-1.62-.94l-.36-2.54A.5.5 0 0013.9 0h-3.8a.5.5 0 00-.49.42l-.36 2.54c-.58.22-1.12.53-1.62.94l-2.39-.96a.5.5 0 00-.6.22L.92 6.84a.5.5 0 00.12.64l2.03 1.58c-.04.31-.07.62-.07.94s.03.63.07.94l-2.03 1.58a.5.5 0 00-.12.64l1.92 3.32c.13.22.39.31.6.22l2.39-.96c.5.41 1.04.72 1.62.94l.36 2.54c.05.24.25.42.49.42h3.8c.24 0 .44-.18.49-.42l.36-2.54c.58-.22 1.12-.53 1.62-.94l2.39.96c.22.09.47 0 .6-.22l1.92-3.32a.5.5 0 00-.12-.64l-2.03-1.58zM12 15a3 3 0 110-6 3 3 0 010 6z" />
                        </svg>
                        Settings
                      </a>
                    </li>
                    <li>
                      <a className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" />
                        </svg>
                        Billing Plan
                        <span className="ml-auto inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1.5 text-xs font-semibold text-white">
                          4
                        </span>
                      </a>
                    </li>
                    <li>
                      <a className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          className="h-5 w-5"
                        >
                          <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm2.07-7.75l-.9.92A3.5 3.5 0 0013.5 12H12v-1h1.5c.83 0 1.5-.67 1.5-1.5 0-.66-.42-1.23-1-1.41V6.5h-2v1.09c-1.16.41-2 1.51-2 2.82h2c0-.55.45-1 1-1s1 .45 1 1c0 .55-.45 1-1 1H11v2h1.5a3.5 3.5 0 001.57-6.25z" />
                        </svg>
                        Pricing
                      </a>
                    </li>
                    <li>
                      <a className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          className="h-5 w-5"
                        >
                          <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                        </svg>
                        FAQ
                      </a>
                    </li>
                  </ul>
                  <div className="border-t p-3">
                    <button
                      onClick={handleLogOut}
                      className="w-full rounded-lg bg-red-500 px-4 py-2.5 font-semibold text-white hover:bg-red-600 active:scale-[0.99] flex items-center justify-center gap-2"
                    >
                      Logout
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-4 w-4"
                      >
                        <path d="M16 13v-2H7V8l-5 4 5 4v-3zM20 3h-8v2h8v14h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  tabIndex={0}
                  className="dropdown-content z-20 mt-3 w-80 rounded-xl bg-white/95 backdrop-blur shadow-2xl overflow-hidden border border-gray-100"
                >
                  <div className="p-5 flex items-center gap-3 border-b">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-100 flex items-center justify-center text-gray-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-6 w-6"
                      >
                        <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Welcome</div>
                      <div className="text-sm text-gray-500">
                        Sign in to access your account
                      </div>
                    </div>
                  </div>
                  <div className="p-4 grid grid-cols-2 gap-3">
                    <Link
                      to="/signup"
                      className="col-span-2 inline-flex items-center justify-center rounded-lg bg-black px-4 py-2.5 text-white font-semibold hover:bg-gray-900 active:scale-[0.99]"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="col-span-2 inline-flex items-center justify-center rounded-lg border border-gray-300 px-4 py-2.5 font-semibold text-gray-800 hover:bg-gray-50 active:scale-[0.99]"
                    >
                      Create account
                    </Link>
                  </div>

                  <div className="px-4 pb-4 text-xs text-gray-500 text-center">
                    By continuing, you agree to our Terms & Privacy Policy
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {/* Nav Links - Mobile Overlay */}
        <div
          className={`md:hidden ${
            isMenuOpen ? "block" : "hidden"
          } fixed inset-0 bg-[#3d1816b3] z-40`}
        >
          <div className="flex flex-col items-center justify-center h-full space-y-6">
            {NavbarMenu.map((item) => (
              <motion.div
                key={item.id}
                variants={SlideDown(item.delay)}
                initial="initial"
                animate="animate"
              >
                <Link
                  to={item.path}
                  className="text-white text-xl font-semibold hover:text-pink-200 transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.title}
                </Link>
              </motion.div>
            ))}

            {user ? (
              <>
                <motion.div
                  variants={SlideDown(0.9)}
                  initial="initial"
                  animate="animate"
                >
                  <Link
                    to="/profile"
                    className="text-white text-xl font-semibold hover:text-pink-200 transition-colors duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                </motion.div>

                <motion.div
                  variants={SlideDown(1.1)}
                  initial="initial"
                  animate="animate"
                >
                  <button
                    onClick={() => {
                      handleLogOut();
                      setIsMenuOpen(false);
                    }}
                    className="text-white text-xl font-semibold hover:text-red-400 transition-colors duration-300"
                  >
                    Logout
                  </button>
                </motion.div>
              </>
            ) : (
              <motion.div
                variants={SlideDown(0.9)}
                initial="initial"
                animate="animate"
              >
                <Link
                  to="/signup"
                  className="text-white text-xl font-semibold hover:text-pink-200 transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              </motion.div>
            )}

            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-4 right-10 text-white text-2xl font-bold bg-gray-700 hover:bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center"
            >
              ×
            </button>
          </div>
        </div>

        {/* Nav Links - Desktop */}
        <div
          className={`items-center justify-between ${
            isMenuOpen ? "hidden" : "hidden"
          } w-full md:flex md:w-auto md:order-1`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium text-white border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {NavbarMenu.map((item) => (
              <motion.li
                variants={SlideDown(item.delay)}
                initial="initial"
                animate="animate"
                key={item.id}
                data-delay={item.delay}
              >
                <Link
                  to={item.path}
                  className="block py-2 px-3 font-bold text-white rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-pink-200 md:p-0"
                >
                  {item.title}
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
     {/* Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cart}
      />
      </>
  );
}