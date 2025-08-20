import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  AiFillHome,
  AiOutlineAppstore,
  AiOutlineShoppingCart,
  AiOutlineMenu,
} from "react-icons/ai";
import { FaBoxOpen, FaPlus, FaEdit, FaList } from "react-icons/fa";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-indigo-500 to-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-4 transform transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center justify-center py-4 border-b">
          <h1 className="text-xl font-bold text-indigo-600">
            Argon Dashboard 2 PRO
          </h1>
        </div>

        {/* Navigation */}
        <ul className="mt-6 space-y-2 text-gray-700 font-medium">
          <li>
            <NavLink
              to="/dashboard/home"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-50 ${
                  isActive ? "bg-indigo-100 text-indigo-600" : ""
                }`
              }
            >
              <AiFillHome /> Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/pages"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-50 ${
                  isActive ? "bg-indigo-100 text-indigo-600" : ""
                }`
              }
            >
              <AiOutlineAppstore /> Pages
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
                  >
                    <FaPlus /> Create Product
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/products/edit"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-2 py-1 rounded-md hover:bg-indigo-50 ${
                        isActive ? "text-indigo-600 font-semibold" : ""
                      }`
                    }
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
                  >
                    <FaList /> All Products
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 min-h-screen">
        {/* Topbar */}
        <div className=" text-white p-4 flex justify-between items-center shadow-md">
          <div className="flex items-center gap-2">
            <button
              className="md:hidden text-2xl"
              onClick={() => setIsOpen(!isOpen)}
            >
              <AiOutlineMenu />
            </button>
            <h1 className="ml-2 text-lg font-semibold">Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
  <input
    type="text"
    placeholder="Type here..."
    className="px-3 py-1 rounded-md bg-white text-gray-800 placeholder-gray-400 focus:outline-none"
  />
  <button className="bg-white text-indigo-600 px-3 py-1 rounded-md shadow">
    Sign In
  </button>
</div>

        </div>

        {/* Page content area */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
