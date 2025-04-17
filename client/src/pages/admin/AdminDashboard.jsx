import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import AdminSideBar from "../../components/AdminSideBar";
import AdminTopBar from "../../components/AdminTopBar";

const AdminDashboard = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/signIn" replace />;
  }
  return (
    <div
      className="d-flex bg-light"
      style={{ minHeight: "100vh", overflow: "auto" }}
    >
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
