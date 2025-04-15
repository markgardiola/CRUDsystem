import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/AdminSideBar.css";
import logoImg from "/images/logo.png";

const AdminSideBar = () => (
  <div
    className="side-bar text-white d-flex flex-column position-fixed"
    style={{
      width: "250px",
      height: "100vh",
      padding: "1rem",
      top: 0,
      left: 0,
      zIndex: 1000,
    }}
  >
    <div className="d-flex justify-content-center mb-4">
      <img
        src={logoImg}
        className="img-fluid"
        style={{
          borderRadius: "50%",
          width: "100px",
          height: "100px",
          objectFit: "cover",
        }}
      />
    </div>
    <nav className=" container-fluid nav flex-column">
      <NavLink
        to="/adminDashboard"
        end
        className={({ isActive }) =>
          `nav-link ${isActive ? "active fw-bold text-dark" : "text-white"}`
        }
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/adminDashboard/users"
        className={({ isActive }) =>
          `nav-link ${isActive ? "active fw-bold text-dark" : "text-white"}`
        }
      >
        User Management
      </NavLink>
      <NavLink
        to="/adminDashboard/resorts"
        className={({ isActive }) =>
          `nav-link ${isActive ? "active fw-bold text-dark" : "text-white"}`
        }
      >
        Resort Listings
      </NavLink>
      <NavLink
        to="/adminDashboard/bookings"
        className={({ isActive }) =>
          `nav-link ${isActive ? "active fw-bold text-dark" : "text-white"}`
        }
      >
        Booking Requests
      </NavLink>
    </nav>
  </div>
);

export default AdminSideBar;
