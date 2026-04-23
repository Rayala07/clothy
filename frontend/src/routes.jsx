import { createBrowserRouter, Outlet } from "react-router-dom";
import Register from "./features/auth/pages/Register";
import VerifyUser from "./features/auth/pages/VerifyUser";
import Login from "./features/auth/pages/Login";
import SellerRoute from "./components/auth/SellerRoute";
import GuestRoute from "./components/auth/GuestRoute";
import MainLayout from "./components/layout/MainLayout";
import Home from "./features/products/pages/buyer/Home";
import DashboardLanding from "./features/products/pages/seller/DashboardLanding";
import CreateProduct from "./features/products/pages/seller/CreateProduct";
import ViewProducts from "./features/products/pages/seller/ViewProducts";

export const router = createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/dashboard",
                element: (
                  <SellerRoute>
                    <Outlet />
                  </SellerRoute>
                ),
                children: [
                    { index: true, element: <DashboardLanding /> },
                    { path: "create", element: <CreateProduct /> },
                    { path: "view", element: <ViewProducts /> }
                ]
            }
        ]
    },
    {
        path: "/register",
        element: (
          <GuestRoute>
            <Register />
          </GuestRoute>
        )
    },
    {
        path: "/verify-otp",
        element: (
          <GuestRoute>
            <VerifyUser />
          </GuestRoute>
        )
    },
    {
        path: "/login",
        element: (
          <GuestRoute>
            <Login />
          </GuestRoute>
        )
    }
]);