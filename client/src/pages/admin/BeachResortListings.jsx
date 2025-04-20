import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BeachResortListings = () => {
  const [resorts, setResorts] = useState([]);

  const fetchResorts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/resorts");
      setResorts(response.data);
    } catch (error) {
      console.error("Failed to fetch resorts:", error);
    }
  };

  useEffect(() => {
    fetchResorts();
  }, []);

  const showDeleteConfirm = (onConfirm) => {
    toast.warning(
      ({ closeToast }) => (
        <div className="text-center">
          <p>Are you sure you want to delete this resort?</p>
          <div className="d-flex justify-content-center gap-2 mt-2">
            <button
              className="btn btn-danger btn-sm"
              onClick={() => {
                onConfirm();
                toast.dismiss();
              }}
            >
              Yes
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => toast.dismiss()}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
        draggable: false,
      }
    );
  };

  const handleDeleteResort = (resortId) => {
    showDeleteConfirm(async () => {
      try {
        await axios.delete(`http://localhost:5000/api/resorts/${resortId}`);
        setResorts((prev) => prev.filter((resort) => resort.id !== resortId));
        toast.success("Resort deleted successfully!");
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete resort.");
      }
    });
  };

  return (
    <div className="container">
      <h2 className="mb-4">Beach Resort Listings</h2>
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
              <th>Image</th>
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
                <td className="d-flex justify-content-center">
                  <img
                    src={`http://localhost:5000/uploads/${resort.image}`}
                    alt={resort.name}
                    style={{
                      width: "100px",
                      height: "70px",
                      objectFit: "cover",
                    }}
                  />
                </td>
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
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteResort(resort.id)}
                  >
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
