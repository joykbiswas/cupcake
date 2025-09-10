import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  AiFillHome,
  AiOutlineAppstore,
  AiOutlineShoppingCart,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";
import { FaPlus, FaEdit, FaList } from "react-icons/fa";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  
  const handleNavClick = () => {
    if (window.innerWidth < 1280) setIsOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-indigo-400 to-gray-200">
      {/* Overlay for mobile sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-opacity-60 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-1.5 bottom-2 pb-6 rounded-2xl h-[calc(100vh-1rem)] w-64 bg-white shadow-lg p-4 flex flex-col transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        {/* Close icon for mobile sidebar */}
        <div className="flex justify-end lg:hidden">
          <button
            onClick={() => setIsOpen(false)}
            className="text-2xl text-gray-500 hover:text-indigo-600"
            aria-label="Close sidebar"
          >
            <AiOutlineClose />
          </button>
        </div>
        <div>
          {/* Logo */}
          <div className="flex items-center justify-center py-4 border-b">
            <h1 className="text-xl font-bold text-indigo-600">CupCake</h1>
          </div>

          {/* Navigation */}
          <ul className="mt-6 space-y-2 text-gray-700 font-medium">
            <li>
              <NavLink
                to="/dashboard/adminHome"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-50 ${
                    isActive ? "bg-indigo-100 text-indigo-600" : ""
                  }`
                }
                onClick={handleNavClick}
              >
                <AiFillHome /> Dashboard
              </NavLink>
            </li>
           
            <li>
              <NavLink
                to="/dashboard/paymentsHistory"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-50 ${
                    isActive ? "bg-indigo-100 text-indigo-600" : ""
                  }`
                }
                onClick={handleNavClick}
              >
                <AiOutlineAppstore /> Payment History
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/applications"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-50 ${
                    isActive ? "bg-indigo-100 text-indigo-600" : ""
                  }`
                }
                onClick={handleNavClick}
              >
                <AiOutlineMenu /> Applications
              </NavLink>
            </li>
            {/* Products Dropdown */}
            <li>
              <button
                onClick={() => setIsProductsOpen(!isProductsOpen)}
                className="flex items-center w-full gap-3 px-3 py-2 rounded-lg hover:bg-indigo-50 focus:outline-none"
              >
                <AiOutlineShoppingCart className="text-green-600" />
                <span className="flex-1 text-left">Products</span>
                <span className="text-sm">
                  {isProductsOpen ? "▾" : "▸"}
                </span>
              </button>
              {isProductsOpen && (
                <ul className="ml-8 mt-2 space-y-1 text-gray-600">
                  <li>
                    <NavLink
                      to="/dashboard/products/create"
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-2 py-1 rounded-md hover:bg-indigo-50 ${
                          isActive ? "text-indigo-600 font-semibold" : ""
                        }`
                      }
                      onClick={handleNavClick}
                    >
                      <FaPlus /> Create Product
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/products/edit/:id"
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-2 py-1 rounded-md hover:bg-indigo-50 ${
                          isActive ? "text-indigo-600 font-semibold" : ""
                        }`
                      }
                      onClick={handleNavClick}
                    >
                      <FaEdit /> Edit Product
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/products/all"
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-2 py-1 rounded-md hover:bg-indigo-50 ${
                          isActive ? "text-indigo-600 font-semibold" : ""
                        }`
                      }
                      onClick={handleNavClick}
                    >
                      <FaList /> All Products
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-50 ${
                    isActive ? "bg-indigo-100 text-indigo-600" : ""
                  }`
                }
                onClick={handleNavClick}
              >
                <AiFillHome /> Home
              </NavLink>
            </li>
          </ul>
        </div>
        {/* Add bottom space */}
        <div className="h-8" />
      </div>

      {/* Main Content */}
      <div className="flex-1 min-h-screen ml-0 lg:ml-64">
        {/* Topbar */}
        <div className="text-white p-4 flex justify-between items-center shadow-md">
          <div className="flex items-center gap-2">
            <button
              className="lg:hidden text-2xl"
              onClick={() => setIsOpen(!isOpen)}
            >
              <AiOutlineMenu />
            </button>
            <h1 className="ml-2 text-lg font-semibold">Dashboard</h1>
          </div>
        </div>

        {/* Page content area */}
        <div className="p-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;