import React from "react";
import { Link } from "react-router-dom"; // assuming you're using react-router

const resorts = [
  {
    id: 1,
    name: "Cocoons Laiya Club Resort",
    location: "San Juan, Batangas",
    description: "A beautiful beach resort.",
  },
  {
    id: 2,
    name: "Acuatico Beach Resort",
    location: "Laiya, Batangas",
    description: "Luxury and relaxation by the sea.",
  },
  // Add more resorts here...
];

const BeachResortListings = () => {
  return (
    <div className="container">
      <h2 className="mb-4 ">Beach Resort Listings</h2>
      <div className="mb-3 text-end">
        <Link to="add">
          <button className="btn btn-success">
            <i className="bi bi-plus-circle pe-2"></i>Add New Resort
          </button>
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-hover table-bordered align-middle">
          <thead className="table-success">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Location</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {resorts.map((resort, index) => (
              <tr key={resort.id}>
                <td>{index + 1}</td>
                <td>{resort.name}</td>
                <td>{resort.location}</td>
                <td>{resort.description}</td>
                <td className="text-center">
                  <Link
                    to={`/adminDashboard/resorts/${resort.id}`}
                    className="btn btn-sm btn-outline-success me-2"
                  >
                    View
                  </Link>
                  <Link
                    to={`/adminDashboard/resorts/${resort.id}/edit`}
                    className="btn btn-sm btn-outline-primary me-2"
                  >
                    Edit
                  </Link>
                  <button className="btn btn-sm btn-outline-danger">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BeachResortListings;
