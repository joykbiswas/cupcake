import { useState } from "react";
import logo from "../../assets/cake.webp";
// import { PiShoppingCartSimpleDuotone } from "react-icons/pi";
import { motion } from "framer-motion";

const SlideDown = (delay: number) => {
  return {
    initial: {
      y: "-100",
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const ProfileMenu = [
    { id: 15, title: "Profile", path: "#", delay: 0.9 },
    { id: 17, title: "Login", path: "/login", delay: 1.3 },
  ];

  return (
    <nav className="bg-[#3d1816b3] poppins dark:bg-gray-900 font- fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-2xl mx-auto flex flex-wrap items-center justify-between px-12 py-4">
        {/* Logo */}
        <motion.a
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          href=""
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={logo} className="h-8" alt="Cupcake Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            Cup Cake
          </span>
        </motion.a>

        {/* Right Buttons */}
        <div className="flex md:order-2 space-x-3 gap-4 md:space-x-0 rtl:space-x-reverse">
          {/* Cart (visible on all devices) */}
          <motion.div
            variants={SlideDown(1)}
            initial="initial"
            animate="animate"
            className="flex-none"
          >
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn ghost btn-circle">
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
                  <span className="badge badge-sm indicator-item">8</span>
                </div>
              </div>
              <div
                tabIndex={0}
                className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow"
              >
                <div className="card-body">
                  <span className="text-lg font-bold">8 Items</span>
                  <span className="text-info">Subtotal: $999</span>
                  <div className="card-actions">
                    <button className="btn btn-primary btn-block">View cart</button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Profile Image (hidden on small devices) */}
          <motion.div
            variants={SlideDown(1)}
            initial="initial"
            animate="animate"
            className="flex-none md:flex hidden"
          >
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile
                  </a>
                </li>
                <li>
                  <a href="/login">Login</a>
                </li>
                <li>
                  <a href="/signup">Signup</a>
                </li>
              </ul>
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
          className={`md:hidden ${isMenuOpen ? "block" : "hidden"} fixed inset-0 bg-[#3d1816b3] z-30`}
        >
          <div className="flex flex-col items-center justify-center h-full space-y-6">
            {[...NavbarMenu, ...ProfileMenu].map((item) => (
              <motion.a
                key={item.id}
                variants={SlideDown(item.delay)}
                initial="initial"
                animate="animate"
                href={item.path}
                className="text-white text-xl font-semibold hover:text-pink-200 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.title}
              </motion.a>
            ))}
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
                <a
                  href={item.path}
                  className="block py-2 px-3 font-bold text-white rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-pink-200 md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  {item.title}
                </a>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}