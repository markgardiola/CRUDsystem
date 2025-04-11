import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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
      .post("http://localhost:5000/validate_user", values)
      .then((res) => {
        alert(res.data.success);
        navigate("/");
        console.log(res);
      })
      .catch((err) => {
        alert(err.response.data.message);
        console.log(err);
      });
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100 vw-100">
      <div className="row">
        <div className="col">
          <form
            onSubmit={handleSubmit}
            className="form-control p-5 rounded-3 shadow"
          >
            <h1 className="text-center">Sign In</h1>
            <div>
              <label htmlFor="email" className="mt-3">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                required
                name="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="mt-3">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                required
                name="password"
                onChange={handleChange}
              />
            </div>
            <div className="d-flex flex-column justify-content-center mt-4">
              <button className="btn btn-primary">Sign In</button>
              <p className="mt-3 text-center">don't have an account yet?</p>
              <Link to="/signUp" className="nav-link text-primary text-center">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
