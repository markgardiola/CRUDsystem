import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [data, setData] = useState([]);
  const [deleted, setDeleted] = useState(true);
  useEffect(() => {
    if (deleted) {
      setDeleted(false);
      axios
        .get("http://localhost:5000/students")
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [deleted]);

  function handleDelete(id) {
    axios
      .delete(`http://localhost:5000/delete/${id}`)
      .then((res) => {
        alert(res.data.success);
        setDeleted(true);
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="container bg-light p-5 vh-100 vw-100">
      <h3>Students</h3>
      <div className="d-flex justify-content-end mb-3">
        <Link className="btn btn-success" to="/create">
          Add Student
        </Link>
      </div>
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((student) => {
            return (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.age}</td>
                <td>{student.gender}</td>
                <td>
                  <Link
                    className="btn btn-sm btn-success mx-1"
                    to={`/read/${student.id}`}
                  >
                    Read
                  </Link>
                  <Link
                    className="btn btn-sm btn-primary mx-1"
                    to={`/edit/${student.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="btn btn-sm btn-danger mx-1"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
