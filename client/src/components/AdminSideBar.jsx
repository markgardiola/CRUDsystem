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
    <div className="d-flex justify-content-center mb-3">
      <img src={logoImg} className="img-fluid" />
    </div>
    <div className="text-center mb-2">
      <p>Ala-Eh-scape</p>
    </div>
    <nav className=" container-fluid nav flex-column">
      <NavLink to="/adminDashboard" end className="nav-link">
        Dashboard
      </NavLink>
      <NavLink to="/adminDashboard/users" className="nav-link">
        User Management
      </NavLink>
      <NavLink to="/adminDashboard/resorts" className="nav-link">
        Resort Listings
      </NavLink>
      <NavLink to="/adminDashboard/bookings" className="nav-link">
        Booking Requests
      </NavLink>
      <NavLink to="/adminDashboard/feedbacks" className="nav-link">
        Feedbacks
      </NavLink>
    </nav>
  </div>
);

export default AdminSideBar;
