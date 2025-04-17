import React from "react";

const ManageBooking = () => {
  return (
    <div className="container">
      <div>
        <h2 className="mb-3">Manage Bookings</h2>
        <table className="table table-bordered table-striped">
          <thead className="table-success">
            <tr>
              <th>Booking ID</th>
              <th>User</th>
              <th>Resort</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>101</td>
              <td>Jane Smith</td>
              <td>Sunny Beach Resort</td>
              <td>2023-10-15</td>
              <td>
                <span className="badge bg-success">Confirmed</span>
              </td>
              <td>
                <button className="btn btn-sm btn-success me-2">Approve</button>
                <button className="btn btn-sm btn-warning me-2">Cancel</button>
                <button className="btn btn-sm btn-info">View</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBooking;
