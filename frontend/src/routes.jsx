import {createBrowserRouter} from "react-router-dom"
import Register from "./features/auth/pages/Register"
import VerifyUser from "./features/auth/pages/VerifyUser"

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
    }
])