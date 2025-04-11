import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const SignUp = () => {
  const [values, setValues] = useState({
    username: "",
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
      .post("http://localhost:5000/register_user", values)
      .then((res) => {
        alert(res.data.success);
        navigate("/signIn");
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100 vw-100">
      <div className="row">
        <div className="col">
          <form
            onSubmit={handleSubmit}
            className="form-control p-5 rounded-3 shadow"
          >
            <h1 className="text-center">Sign Up</h1>
            <div>
              <label htmlFor="username" className="mt-3">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username"
                required
                name="username"
                onChange={handleChange}
              />
            </div>
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
              <button className="btn btn-primary">Sign Up</button>
              <p className="mt-3 text-center">already have an account?</p>
              <Link to="/signIn" className="nav-link text-primary text-center">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
