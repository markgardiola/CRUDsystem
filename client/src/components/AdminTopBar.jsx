import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const AdminTopBar = () => {
  const navigate = useNavigate(); // Initialize navigate hook

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("admin");

    navigate("/adminSignIn");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light mb-4 shadow-sm">
      <div className="container-fluid px-4">
        <span className="navbar-brand fw-bold">Admin Dashboard</span>

        {/* Toggler for small screens */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#adminNavbar"
          aria-controls="adminNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible content */}
        <div
          className="collapse navbar-collapse justify-content-end"
          id="adminNavbar"
        >
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <button
                className="btn btn-outline-success dropdown-toggle"
                id="adminDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Welcome, Admin
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <Link
                    className="dropdown-item text-capitalize text-danger"
                    onClick={handleLogout}
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AdminTopBar;
