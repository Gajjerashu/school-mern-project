import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
    const isAdminAuthenticated = localStorage.getItem("adminAuth") === "true";

    if (!isAdminAuthenticated) {
        return <Navigate to="/AdminLogin" replace />;
    }

    return children;
};

export default ProtectedAdminRoute;