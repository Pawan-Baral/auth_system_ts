import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/providers/AuthContext";
import AdminSidebar from "@/components/functional/AdminSidebar";

function AdminRoute() {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.role !== "admin") {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div className="min-h-screen bg-slate-100">
            <AdminSidebar />

            <main className="min-h-screen pl-16 p-8">
                <Outlet />
            </main>
        </div>
    );
}

export default AdminRoute;