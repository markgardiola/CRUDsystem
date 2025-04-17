import React from "react";

const UsersManagement = () => {
  return (
    <div className="container">
      <h2>User Management</h2>
      <table className="table table-striped mt-3">
        <thead className="table-success">
          <tr>
            <th>#</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Sample user row */}
          <tr>
            <td>1</td>
            <td>Juan Dela Cruz</td>
            <td>juan@example.com</td>
            <td>User</td>
            <td>
              <button className="btn btn-sm btn-primary me-2">Edit</button>
              <button className="btn btn-sm btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UsersManagement;
