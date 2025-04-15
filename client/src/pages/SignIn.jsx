import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import formbg from "/images/form-bg.jpg";
import Footer from "./Footer";
import { toast } from "react-toastify";

const SignIn = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/login", {
        email: values.email,
        password: values.password,
      })
      .then((res) => {
        if (res.data.token && res.data.user) {
          const { token, user } = res.data;

          localStorage.setItem("token", token);
          localStorage.setItem("username", user.username);
          localStorage.setItem("email", user.email);
          localStorage.setItem("role", user.role);

          toast.success(res.data.success, {
            position: "top-right",
            autoClose: 3000,
          });

          toast.error(res.data.err, {
            position: "top-right",
            autoClose: 3000,
          });

          if (user.role === "admin") {
            navigate("/adminDashboard");
          } else {
            navigate("/");
          }
        } else {
          alert("Invalid server response.");
        }
      })
      .catch((err) => {
        console.log("Login error:", err);

        if (err.response?.data?.message) {
          toast.error(err.response.data.message, {
            position: "top-right",
            autoClose: 3000,
          });
        } else if (err.message === "Network Error") {
          toast.error("Unable to connect to the server.", {
            position: "top-right",
            autoClose: 3000,
          });
        } else {
          toast.error("An unexpected error occurred.", {
            position: "top-right",
            autoClose: 3000,
          });
        }
      });
  };

  return (
    <div>
      <div className="container-fluid d-flex justify-content-center align-items-center w-75 vh-100">
        <div
          className="row w-75 border-2 border-success rounded-4"
          style={{
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
          }}
        >
          <div className="col-md-6 border-end border-2 border-success d-flex justify-content-center align-items-center p-3">
            <img
              src={formbg}
              alt="Form Background"
              className="img-fluid border border-2 border-success rounded-3"
              style={{ maxHeight: "500px" }}
            />
          </div>
          <div className="col-md-6 d-flex justify-content-center align-items-center p-5">
            <form onSubmit={handleSubmit} className="w-100 py-5 my-5">
              <h1 className="text-center mb-4 text-white">Sign In</h1>
              <div>
                <label htmlFor="email" className="form-label text-white">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  required
                  name="email"
                  onChange={handleChange}
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    color: "white",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                  }}
                />
              </div>
              <div>
                <label htmlFor="password" className="mt-3 text-white">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  required
                  name="password"
                  onChange={handleChange}
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    color: "white",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                  }}
                />
              </div>
              <div className="d-flex flex-column justify-content-center mt-4">
                <button
                  className="btn btn-primary"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    color: "white",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                  }}
                >
                  Sign In
                </button>
                <p className="mt-3 text-center text-white">
                  Don't have an account yet?
                </p>
                <Link
                  to="/signUp"
                  className="nav-link text-primary text-center"
                  style={{ color: "white" }}
                >
                  Sign Up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignIn;
