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
      .post("http://localhost:5000/api/auth/register", values)
      .then((res) => {
        alert(res.data.success);
        navigate("/");
        console.log(res);
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="container-fluid p-5 mt-5 vh-100 bg-light">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10 d-flex flex-column align-items-center">
          <h1 className="text-center m-4">Add Student</h1>
          <Link to="/" className="btn btn-success mb-3">
            Back
          </Link>
          <form
            onSubmit={handleSubmit}
            className="p-4 w-50 border rounded bg-white shadow-sm"
          >
            <div className="form-group mb-3">
              <label className="fw-bold" htmlFor="name">
                Name
              </label>
              <input
                className="form-control"
                type="text"
                name="name"
                required
                onChange={(e) => setValues({ ...values, name: e.target.value })}
              />
            </div>
            <div className="form-group mb-3">
              <label className="fw-bold" htmlFor="email">
                Email
              </label>
              <input
                className="form-control"
                type="email"
                name="email"
                required
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
              />
            </div>
            <div className="form-group mb-3">
              <label className="fw-bold" htmlFor="gender">
                Gender
              </label>
              <select
                className="form-control"
                name="gender"
                required
                onChange={(e) =>
                  setValues({ ...values, gender: e.target.value })
                }
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="form-group mb-3">
              <label className="fw-bold" htmlFor="age">
                Age
              </label>
              <input
                className="form-control"
                type="number"
                name="age"
                required
                onChange={(e) => setValues({ ...values, age: e.target.value })}
              />
            </div>
            <div className="form-group text-center">
              <button type="submit" className="btn btn-success w-100">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;
