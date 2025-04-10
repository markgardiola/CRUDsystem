import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Edit = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/get_student/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post(`http://localhost:5000/edit_user/${id}`, data[0])
      .then((res) => {
        alert(res.data.success);
        navigate("/");
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="container p-5 vw-100 vh-100 bg-light">
      <h1 className="m-2">Student ID: {id}</h1>
      <Link to="/" className="btn btn-success m-2">
        Back
      </Link>
      {data.map((student) => {
        return (
          <form onSubmit={handleSubmit} className="m-2 w-50">
            <div className="form-group my-3">
              <label htmlFor="name">Name</label>
              <input
                className="form-control"
                value={student.name}
                type="text"
                name="name"
                required
                onChange={(e) =>
                  setData([{ ...data[0], name: e.target.value }])
                }
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="email">Email</label>
              <input
                className="form-control"
                value={student.email}
                type="email"
                name="email"
                required
                onChange={(e) =>
                  setData([{ ...data[0], email: e.target.value }])
                }
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="gender">Gender</label>
              <select
                className="form-control w-25"
                name="gender"
                required
                onChange={(e) =>
                  setData([{ ...data[0], gender: e.target.value }])
                }
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="form-group my-3">
              <label htmlFor="age">Age</label>
              <input
                className="form-control"
                value={student.age}
                type="number"
                name="age"
                required
                onChange={(e) => setData([{ ...data[0], age: e.target.value }])}
              />
            </div>
            <div className="form-group my-3">
              <button type="submit" className="btn btn-success">
                Save
              </button>
            </div>
          </form>
        );
      })}
    </div>
  );
};

export default Edit;
