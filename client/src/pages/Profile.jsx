import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
    address: "",
  });
  const [isEditing, setIsEditing] = useState(false); // To toggle between view/edit mode
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");

    if (!token || !username || !email) {
      navigate("/signIn"); // Redirect if not logged in or missing data
    } else {
      // Assuming your backend sends user info including mobile and address
      axios
        .get("http://localhost:5000/get_user_info", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          // Store user data from the database, including mobile and address
          const { username, email, phone, address } = res.data.user;
          setUser({
            username,
            email,
            phone: phone || "",
            address: address || "",
          });
        })
        .catch((err) => {
          console.error(err);
          alert("Error loading profile data.");
        });
    }
  }, [navigate]);

  // Handle changes to the form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  // Handle form submission for updating profile
  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedUser = {
      username: user.username,
      email: user.email,
      password: user.password,
      phone: user.phone,
      address: user.address,
    };

    // Send updated data to the backend
    axios
      .post("http://localhost:5000/update_user", updatedUser, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        // Update localStorage and state with new info
        localStorage.setItem("username", res.data.user.username);
        localStorage.setItem("email", res.data.user.email);
        localStorage.setItem("password", res.data.user.password);
        localStorage.setItem("phone", res.data.user.phone);
        localStorage.setItem("address", res.data.user.address);
        setUser(res.data.user);
        setIsEditing(false); // Switch back to view mode
        alert("Profile updated successfully!");
      })
      .catch((err) => {
        console.error(err);
        alert("Error updating profile!");
      });
  };

  return (
    <div className="container mt-5 pt-5">
      <h2 className="fs-2">Profile Page</h2>
      <div className="card p-4 mt-4 shadow-lg">
        {isEditing ? (
          <form onSubmit={handleUpdate}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                name="username"
                value={user.username}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="**********"
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Mobile
              </label>
              <input
                type="text"
                className="form-control"
                name="phone"
                value={user.phone || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <textarea
                className="form-control"
                name="address"
                value={user.address || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-success">
                Save Changes
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div>
            <h5 className="mb-3">
              <span className="fw-bold">👤 Username:</span> {user.username}
            </h5>
            <h5 className="mb-3">
              <span className="fw-bold">📧 Email:</span> {user.email}
            </h5>
            <h5 className="mb-3">
              <span className="fw-bold">🔒 Password:</span> **********
            </h5>
            <h5 className="mb-3">
              <span className="fw-bold">📱 Mobile:</span>{" "}
              {user.phone || "Not Available"}
            </h5>
            <h5 className="mb-3">
              <span className="fw-bold">🏠 Address:</span>{" "}
              {user.address || "Not Available"}
            </h5>
            <div className="text-center">
              <button
                className="btn btn-success mt-3"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
