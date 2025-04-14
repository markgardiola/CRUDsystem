import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import About from "./pages/About";
import Booking from "./pages/Booking";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoutes";

// Admin pages
import UsersManagement from "./pages/admin/UsersManagement";
import BeachResortListings from "./pages/admin/BeachResortListings";
import ManageBooking from "./pages/admin/ManageBooking";
import Dashboard from "./pages/admin/Dashboard";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Layout for USERS only */}
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="signIn" element={<SignIn />} />
            <Route path="signUp" element={<SignUp />} />
            <Route
              path="homepage"
              element={
                <ProtectedRoute allowedRoles={["user"]}>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="profile"
              element={
                <ProtectedRoute allowedRoles={["user"]}>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="about" element={<About />} />
            <Route path="booking" element={<Booking />} />
          </Route>

          {/* Admin layout route with nested pages */}
          <Route
            path="adminDashboard"
            element={
              <AdminProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </AdminProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="users" element={<UsersManagement />} />
            <Route path="resorts" element={<BeachResortListings />} />
            <Route path="bookings" element={<ManageBooking />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
