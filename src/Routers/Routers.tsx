import {
    
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main/Main";
import HomePage from "../pages/homePage/homePage";
import About from "../pages/About/About";
import AllProductPage from "../pages/AllProduct/AllProduct";

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
    // {
    //   path: '/dashboard',
    //   element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    //   children:[
    //     // normal user routes
    //     {
    //       path:'userHome',
    //       element:<UserHome></UserHome>
    //     },
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
    //     {
    //       path: 'adminHome',
    //       element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
    //     },
    //     {
    //       path:'addItems',
    //       element:<AdminRoute><AddItems></AddItems></AdminRoute>
    //     },
        
    //   ]
    // }
    
  ]);
