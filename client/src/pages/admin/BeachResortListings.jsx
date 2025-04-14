import React from "react";

const BeachResortListings = () => {
  return (
    <div className="container">
      <div className="mb-5">
        <h2 className="mb-3">Beach Resort Listings</h2>
        <button className="btn btn-success mb-3">Add New Resort</button>
        <ul className="list-group">
          {/* Map through resort listings */}
          {/* Example listing */}
          <li className="list-group-item p-4">
            <h3>Cocoons Laiya Club Resort</h3>
            <p>
              <strong>Location:</strong> San Juan, Batangas
            </p>
            <p>
              <strong>Description:</strong> A beautiful beach resort.
            </p>
            <button className="btn btn-sm btn-primary me-2">Edit</button>
            <button className="btn btn-sm btn-danger">Delete</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BeachResortListings;
