import React from "react";

const Bookings = () => {
  const bookings = [
    {
      id: 1,
      user: "Juan Dela Cruz",
      resort: "Sunset Bay",
      date: "2025-05-01",
      status: "Pending",
    },
  ];

  const getStatusBadge = (status) => {
    if (status === "Pending") return "warning";
    if (status === "Approved") return "success";
    if (status === "Rejected") return "danger";
    return "secondary";
  };

  return (
    <div>
      <h3>Booking Requests</h3>
      <table className="table mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Resort</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b, index) => (
            <tr key={b.id}>
              <td>{index + 1}</td>
              <td>{b.user}</td>
              <td>{b.resort}</td>
              <td>{b.date}</td>
              <td>
                <span className={`badge bg-${getStatusBadge(b.status)}`}>
                  {b.status}
                </span>
              </td>
              <td>
                <button className="btn btn-sm btn-success me-1">Approve</button>
                <button className="btn btn-sm btn-danger">Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Bookings;
