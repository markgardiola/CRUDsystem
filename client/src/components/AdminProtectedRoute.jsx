import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || role !== "admin") {
    return <Navigate to="/signIn" replace />;
  }

  return children;
};

export default AdminProtectedRoute;
