import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    const location = useLocation();

    // 1. Basic Check: Token chhe ke nahi?
    if (!token) {

        return <Navigate to="/Login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
