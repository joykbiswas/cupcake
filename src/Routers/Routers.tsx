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
// import Login from "../pages/login/login";
import SignUp from "../pages/signUp/SignUp";

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
            element:<AllProductPage />
        },
      //  {
      //     path:'/login',
      //     element:<Login />
      //   },
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
        // normal user routes
        // {
        //   path:'userHome',
        //   element:<UserHome></UserHome>
        // },
    //     {
    //       path:'cart',
    //       element:<Cart></Cart>
    //     },
    //     {
    //       path: 'payment',
    //       element: <Payment></Payment>
    //     },
    //     {
    //       path:"paymentHistory",
    //       element:<PaymentHistory></PaymentHistory>
    //     },


    //     // admin router
        {
          path: 'adminHome',
          element: <AdminHome />
        },
        {
          path: 'products/create',
          element: <AddItem />
        },
        {
          path: 'products/all',
          element: <AllItems />,
          loader: () => fetch('http://localhost:5000/cake')
        },
    //     {
    //       path:'addItems',
    //       element:<AdminRoute><AddItems></AddItems></AdminRoute>
    //     },
        
      ]
    }
    
  ]);
