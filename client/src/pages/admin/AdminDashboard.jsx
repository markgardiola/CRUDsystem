import React from "react";
import { Outlet } from "react-router-dom";
import AdminSideBar from "../../components/AdminSideBar";
import AdminTopBar from "../../components/AdminTopBar";

const AdminDashboard = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || role !== "admin") {
    return <Navigate to="/signIn" replace />;
  }
  return (
    <div className="d-flex">
      <AdminSideBar />
      <div className="flex-grow-1" style={{ marginLeft: "250px" }}>
        <AdminTopBar />
        <div className="container-fluid py-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
