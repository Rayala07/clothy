import {createBrowserRouter} from "react-router-dom"
import Register from "./features/auth/pages/Register"
import VerifyUser from "./features/auth/pages/VerifyUser"
import Login from "./features/auth/pages/Login"
import Dashboard from "./features/products/pages/Dashboard"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <p>Home Page</p>
    }, 
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/verify-otp",
        element: <VerifyUser />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/dashboard",
        element: <Dashboard />
    }
])