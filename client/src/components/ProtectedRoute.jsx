import React from "react";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, ...rest }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/signIn" replace />;
  }
  return <Route {...rest} element={element} />;
};

export default ProtectedRoute;
