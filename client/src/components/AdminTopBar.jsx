import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const AdminTopBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Assume admin is logged in by default
  const navigate = useNavigate(); // Initialize navigate hook

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    sessionStorage.removeItem("authToken");

    setIsLoggedIn(false);

    window.location.href = "/signIn";
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
                className="btn btn-light dropdown-toggle"
                id="adminDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Welcome, Admin
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="adminDropdown"
              >
                <li>
                  <button
                    className="dropdown-item text-danger"
                    onClick={handleLogout} // Bind the logout function
                  >
                    Logout
                  </button>
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
