
import { useState } from "react";
import logo from "../../assets/cake.webp"
import { PiShoppingCartSimpleDuotone } from "react-icons/pi";
import {motion} from "framer-motion";

const SlideDown = (delay: number) => {
  return{
    initial:{
      y: "-100",
      opacity:0,
    },
    animate:{
      y: 0,
      opacity:1,
      transition:{
        delay:delay,
        duration:0.6,
        
      },
    }
  }
}
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
      title: "Contact Us",
      path: "/",
      delay: 0.4,
    },
  ];

  return (
    <nav className="bg-[#3d1816b3] poppins dark:bg-gray-900 font- fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-2xl mx-auto  flex flex-wrap items-center justify-between px-12 py-4">
        {/* Logo */}
        <motion.a
        initial={{opacity:0}}
          animate={{opacity:1}}
          transition={{duration:0.8, delay:0.5}}
          href=""
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
          
            src={logo}
            className="h-8"
            alt="Cupcake Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            Cup Cake
          </span>
        </motion.a>

        {/* Right Buttons */}
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <motion.div
          variants={SlideDown(1)}
              initial="initial"
              animate="animate"
>
            <button
            type="button"
            className="text-white bg-gray-600 p-2 rounded-full hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
           <PiShoppingCartSimpleDuotone />
          </button>
          </motion.div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 
            rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 
            focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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

        {/* Nav Links */}
        <div
          className={`items-center justify-between ${
            isMenuOpen ? "flex" : "hidden"
          } w-full md:flex md:w-auto md:order-1`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium text-white border border-gray-100 rounded-lg 
           md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 
           dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {NavbarMenu.map((item) => (
              <motion.li 
              variants={SlideDown(item.delay)}
              initial="initial"
              animate="animate"
              key={item.id} data-delay={item.delay}>
                
                <a
                  href={item.path}
                  className="block py-2 px-3 font-bold text-white rounded-sm hover:bg-gray-100 
                  md:hover:bg-transparent md:hover:text-pink-200 md:p-0 
                  dark:text-white dark:hover:bg-gray-700 dark:hover:text-white 
                  md:dark:hover:bg-transparent dark:border-gray-700"
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
