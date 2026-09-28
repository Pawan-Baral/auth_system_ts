import ProtectedRoute from "@/routes/ProtectedRoute";
import AdminRoute from "@/routes/AdminRoute";

export const privateRoutes = [
    {
        element: <ProtectedRoute />
        children: [
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/profile",
                element: <Profile />,
            }
            {
                element: <AdminRoute />,
                children: [
                    {
                        path: "/admin",
                        element: <AdminDashoard />
                    },

                ]
            }
        ]
    }
]