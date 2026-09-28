import ProtectedRoute from "./ProtectedRoute";


import { useRoutes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./RouteConfig";
function AppRoutes() {
    return useRoutes([...privateRoutes, ...publicRoutes]);
}

export default AppRoutes;