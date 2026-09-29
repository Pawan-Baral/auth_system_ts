import ProtectedRoute from "@/routes/ProtectedRoute";
import AdminRoute from "@/routes/AdminRoute";
import Dashboard from "@/pages/Dashboard"
import Profile from "@/pages/Profile"
import AdminDashboard from "@/pages/AdminDashboard";
import PublicLayout from "@/routes/PublicLayout";
import Home from "@/pages/Home";
import Service from "@/pages/Service";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ServiceDetails from "@/pages/ServiceDetails";
export const privateRoutes = [
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/profile",
                element: <Profile />,
            },
            {
                element: <AdminRoute />,
                children: [
                    {
                        path: "/admin",
                        element: <AdminDashboard />
                    },

                ]
            }
        ]
    }
]
export const publicRoutes = [
    {
        path: "/",
        element: <PublicLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "home",
                element: <Home />,
            },
            {
                path: "services",
                element: <Service />,
            },
            {
                // path: "services/:idOrSlug",
                // element: <ServiceDetails />,
            },
            {
                path: "contact",
                element: <Contact />,
            },
        ],
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "services/:idOrSlug",
        element: <ServiceDetails />,
    },
]