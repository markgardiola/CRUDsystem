import React, { useEffect, useState } from "react";
import axios from "axios";

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchBookings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/my-bookings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBookings(res.data);
      } catch (error) {
        console.error("Error fetching user bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <p>Loading your bookings...</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">My Bookings</h2>
      {bookings.length === 0 ? (
        <p>You have no bookings yet.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>Resort Name</th>
                <th>Check-In</th>
                <th>Check-Out</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking.booking_id}>
                  <td>{index + 1}</td>
                  <td>{booking.resort_name}</td>
                  <td>{new Date(booking.check_in).toLocaleDateString()}</td>
                  <td>{new Date(booking.check_out).toLocaleDateString()}</td>
                  <td>
                    <span
                      className={`badge ${
                        booking.status === "pending"
                          ? "bg-warning"
                          : booking.status === "approved"
                          ? "bg-success"
                          : "bg-secondary"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyBooking;
