import {
    
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main/Main";
import HomePage from "../pages/homePage/homePage";
import About from "../pages/About/About";
import AllProductPage from "../pages/AllProduct/AllProduct";
import Dashboard from "../Layout/Dashboard/Dashboard";
import AdminHome from "../pages/Dashboard/adminHome/AdminHome";

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
    //     {
    //       path:'addItems',
    //       element:<AdminRoute><AddItems></AddItems></AdminRoute>
    //     },
        
      ]
    }
    
  ]);
