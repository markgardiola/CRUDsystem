import React from "react";
import { Route, Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ element, ...rest }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Check if the user is authenticated and has an admin role
  if (!token || role !== "admin") {
    return <Navigate to="/signIn" replace />;
  }

  return <Route {...rest} element={element} />;
};

export default AdminProtectedRoute;
