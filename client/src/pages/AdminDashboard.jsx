import { Navigate } from "react-router-dom";

const AdminDashboard = () => {
  const role = localStorage.getItem("role");

  if (role !== "admin") {
    return <Navigate to="/homepage" />;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* Add your management UI here */}
    </div>
  );
};

export default AdminDashboard;
