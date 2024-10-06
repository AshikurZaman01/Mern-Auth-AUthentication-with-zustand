import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Roots from './Components/Roots/Roots';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import EmailVerification from './Components/EmailVerifyPage/EmailVerification';
import Protect from './ProtectedRouter/Protect';
import Dashboard from './Components/Dashboard/Dashboard';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Roots></Roots>,
    children: [
      {
        path: "/",
        element: <Login></Login>
      },
      {
        path: "/emailVerification",
        element: <Protect><EmailVerification></EmailVerification></Protect>
      },
      {
        path: "/register",
        element: <Register></Register>
      },
      {
        path: "/home",
        element: <Protect><Home></Home></Protect>,
      },
      {
        path: "/dashboard",
        element: <Protect><Dashboard></Dashboard></Protect>,
      }


    ]
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode >
)
