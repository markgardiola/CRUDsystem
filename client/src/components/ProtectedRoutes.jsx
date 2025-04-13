import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Not logged in
  if (!token) {
    return <Navigate to="/signIn" />;
  }

  // Logged in but not allowed
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/signIn" />;
  }

  return children;
};

export default ProtectedRoute;
