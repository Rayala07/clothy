import { createBrowserRouter } from "react-router-dom";
import Register from "./features/auth/pages/Register";
import VerifyUser from "./features/auth/pages/VerifyUser";
import Login from "./features/auth/pages/Login";
import SellerRoute from "./components/auth/SellerRoute";
import ProductsDashboard from "./features/products/pages/seller/ProductsDashboard";
import DashboardLanding from "./features/products/pages/seller/DashboardLanding";
import CreateProduct from "./features/products/pages/seller/CreateProduct";
import ViewProducts from "./features/products/pages/seller/ViewProducts";

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
        element: (
          <SellerRoute>
            <ProductsDashboard />
          </SellerRoute>
        ),
        children: [
            { index: true, element: <DashboardLanding /> },
            { path: "create", element: <CreateProduct /> },
            { path: "view", element: <ViewProducts /> }
        ]
    }
]);