import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
    const location = useLocation();
    
    // Check both: Auth flag and the actual Token
    const isAdminAuthenticated = localStorage.getItem("adminAuth") === "true";
    const adminToken = localStorage.getItem("adminToken");

    // Jo authentication na hoy toh login par moklo ane original path save rakho
    if (!isAdminAuthenticated || !adminToken) {
        console.warn("🚫 Admin not authenticated, redirecting...");
        return <Navigate to="/AdminLogin" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedAdminRoute;
