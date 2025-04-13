import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Create from "./pages/Create";
import Read from "./pages/Read";
import Edit from "./pages/Edit";
import About from "./pages/About";
import Booking from "./pages/Booking";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoutes"; // Adjust path as needed

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

          {/* Admin route has NO Layout */}
          <Route
            path="/adminDashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
