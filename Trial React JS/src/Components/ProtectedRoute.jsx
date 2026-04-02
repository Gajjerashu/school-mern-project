import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");

    if (!token) {
        // Redirect to login if not logged in
        return <Navigate to="/Login" replace />;
    }

    return children;
};

export default ProtectedRoute;
