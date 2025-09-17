import {
    
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main/Main";
import HomePage from "../pages/homePage/homePage";
import About from "../pages/About/About";
import AllProductPage from "../pages/AllProduct/AllProduct";
import Dashboard from "../Layout/Dashboard/Dashboard";
import AdminHome from "../pages/Dashboard/adminHome/AdminHome";
import AddItem from "../pages/Dashboard/AddItem/AddItem";
import AllItems from "../pages/Dashboard/AllItems/AllItems";
import SignUp from "../pages/signUp/SignUp";
import EditItem from "../pages/Dashboard/EditItem/EditItem";
import AdminProfile from "../pages/Dashboard/AdminProfile/AdminProfile";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AllPaymentHistory from "../pages/Dashboard/AllPaymentHistory/AllPaymentHistory";

  export const router = createBrowserRouter([
    {
      path: "/",
      element:<Main></Main>,
      children: [
        {
            path:'/',
            element:<HomePage />
        },
        {
            path:'/about',
            element:<About />
        },
        {
            path:'/all-product',
            element:<AllProductPage />,
        },
      
        {
          path:'/signup',
          element:<SignUp />
        },
        
      ]
    },
    {
      path: '/dashboard',
      element: <Dashboard />,
      children:[

        // admin router
        {
          path: 'adminHome',
          element: <AdminHome />
        },
         {
          path:"all-paymentsHistory",
          element:<AllPaymentHistory />
        },
         {
          path:"all-users",
          element:<AllUsers />
        },
        {
          path: 'products/create',
          element: <AddItem />
        },
        {
          path: 'products/edit/:id',
          element: <EditItem />,
          loader: ({params}) => fetch(`https://cupcake-backend.vercel.app/api/cake/${params.id}`)
        },
        {
          path: 'products/all',
          element: <AllItems />,
        },
        {
          path: 'adminProfile',
          element: <AdminProfile />
        },
    //     {
    //       path:'addItems',
    //       element:<AdminRoute><AddItems></AddItems></AdminRoute>
    //     },
        
      ]
    }
    
  ]);
