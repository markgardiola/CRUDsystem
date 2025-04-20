import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const SanJuanLaiya = () => {
  const [resorts, setResorts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/resorts/location/Mabini, Batangas")
      .then((response) => setResorts(response.data))
      .catch((error) => console.error("Error fetching resorts:", error));
  }, []);

  return (
    <div className="container mt-5 py-5">
      <h1
        className="mb-5 text-center text-uppercase fw-light"
        style={{
          letterSpacing: "8px",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        }}
      >
        Resorts in Mabini, Laiya
      </h1>
      <div className="row">
        {resorts.map((resort) => (
          <div className="col-12 mb-4" key={resort.id}>
            <div className="card w-100 shadow-sm">
              <div className="row g-0">
                <div className="col-md-4 d-flex flex-column justify-content-between w-25">
                  <img
                    src={`http://localhost:5000/uploads/${resort.image}`}
                    className="img-fluid rounded m-2 shadow"
                    alt={resort.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                </div>
                <div className="col-md-8 w-75">
                  <div className="card-body d-flex flex-column justify-content-between h-100">
                    <div>
                      <h5 className="card-title fw-bold">{resort.name}</h5>
                      <p className="card-text text-success mb-1">
                        <i className="bi bi-geo-alt-fill me-1"></i>
                        {resort.location}
                      </p>
                      <p className="card-text">{resort.description}</p>
                    </div>
                    <div className="mt-3 d-flex justify-content-between">
                      <Link
                        to={`/viewDetails/${resort.id}`}
                        className="btn btn-outline-success me-2"
                      >
                        View Details
                      </Link>
                      <button
                        className="btn btn-success"
                        onClick={() => {
                          const token = localStorage.getItem("token");
                          if (token) {
                            window.location.href = "/booking";
                          } else {
                            toast.warning(
                              "Please log in to proceed with booking.",
                              {
                                position: "top-center",
                                autoClose: 2300,
                              }
                            );
                          }
                        }}
                      >
                        Book Now!
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SanJuanLaiya;
