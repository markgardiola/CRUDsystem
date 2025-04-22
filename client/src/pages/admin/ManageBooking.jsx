import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ManageBooking = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = () => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("Error fetching bookings:", err));
  };

  useEffect(() => {
    fetchBookings();
  }, []);

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
            {bookings.map((booking) => (
              <tr key={booking.booking_id}>
                <td>{booking.booking_id}</td>
                <td>{booking.username}</td>
                <td>{booking.resort_name}</td>
                <td>
                  {new Date(booking.check_in).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  to{" "}
                  {new Date(booking.check_out).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </td>
                <td>
                  <span
                    className={`badge bg-${
                      booking.status === "Confirmed"
                        ? "success"
                        : booking.status === "Cancelled"
                        ? "danger"
                        : "secondary"
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td>
                  <button className="btn btn-sm btn-outline-primary me-2">
                    View
                  </button>
                  <button className="btn btn-sm btn-outline-success me-2">
                    Approve
                  </button>
                  <button className="btn btn-sm btn-danger">Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBooking;
