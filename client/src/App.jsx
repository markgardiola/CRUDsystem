import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import About from "./pages/About";
import Booking from "./pages/Booking";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Layout from "./components/UserLayout";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/admin/AdminDashboard";

// Admin pages
import UsersManagement from "./pages/admin/UsersManagement";
import BeachResortListings from "./pages/admin/BeachResortListings";
import ManageBooking from "./pages/admin/ManageBooking";
import Dashboard from "./pages/admin/Dashboard";
import AdminSignIn from "./pages/adminSignIn";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="signIn" element={<SignIn />} />
            <Route path="signUp" element={<SignUp />} />
            <Route path="adminSignIn" element={<AdminSignIn />} />
            <Route path="homepage" element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="about" element={<About />} />
            <Route path="booking" element={<Booking />} />
          </Route>
          <Route path="adminDashboard" element={<AdminDashboard />}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<UsersManagement />} />
            <Route path="resorts" element={<BeachResortListings />} />
            <Route path="bookings" element={<ManageBooking />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
};

export default App;
