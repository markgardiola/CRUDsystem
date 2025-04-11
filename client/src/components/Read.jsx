import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Read = () => {
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
  return (
    <div className="container-fluid p-5 vw-100 vh-100 bg-light">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="m-4 text-center">Student Details</h1>
          <Link to="/" className="btn btn-success mb-4">
            Back
          </Link>
          {data.map((student) => {
            return (
              <ul className="list-group w-50 mb-4 mx-auto">
                <li className="list-group-item">
                  <b>ID: </b>
                  {student["id"]}
                </li>
                <li className="list-group-item">
                  <b>Name: </b>
                  {student["name"]}
                </li>
                <li className="list-group-item">
                  <b>Email: </b>
                  {student["email"]}
                </li>
                <li className="list-group-item">
                  <b>Age: </b>
                  {student["age"]}
                </li>
                <li className="list-group-item">
                  <b>Gender: </b>
                  {student["gender"]}
                </li>
              </ul>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Read;
