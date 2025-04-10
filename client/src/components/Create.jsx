import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Create = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
  });

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post("http://localhost:5000/add_user", values)
      .then((res) => {
        alert(res.data.success);
        navigate("/");
        console.log(res);
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="container p-5 vh-100 vw-100 bg-light">
      <div className="row">
        <h3>Add Student</h3>
        <div className="d-flex justify-content-end">
          <Link to="/" className="btn btn-success">
            Home
          </Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group d-flex justify-content-center my-3">
            <label className="me-3 fw-bold" htmlFor="name">
              Name
            </label>
            <input
              className="form-control w-25"
              type="text"
              name="name"
              required
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
          </div>
          <div className="form-group d-flex justify-content-center my-3">
            <label className="me-3 fw-bold" htmlFor="email">
              Email
            </label>
            <input
              className="form-control w-25"
              type="email"
              name="email"
              required
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>
          <div className="form-group d-flex justify-content-center my-3">
            <label className="me-3 fw-bold" htmlFor="gender">
              Gender
            </label>
            <select
              className="form-control w-25"
              name="gender"
              required
              onChange={(e) => setValues({ ...values, gender: e.target.value })}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="form-group d-flex justify-content-center my-3">
            <label className="me-3 fw-bold" htmlFor="age">
              Age
            </label>
            <input
              className="form-control w-25"
              type="number"
              name="age"
              required
              onChange={(e) => setValues({ ...values, age: e.target.value })}
            />
          </div>
          <div className="form-group d-flex justify-content-center my-3">
            <button type="submit" className="btn btn-success">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
