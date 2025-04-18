import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingUser, setEditingUser] = useState(null); // for modal

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch users");
      setLoading(false);
    }
  };

  const handleEditChange = (e) => {
    setEditingUser({ ...editingUser, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/users/${editingUser.id}`,
        editingUser
      );
      toast.success("User updated successfully!");
      setEditingUser(null);
      fetchUsers();

      // Programmatically close the modal
      document.getElementById("modalCloseBtn").click();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update user.");
    }
  };

  const showDeleteConfirm = (onConfirm) => {
    toast.info(
      ({ closeToast }) => (
        <div className="text-center">
          <p>Are you sure you want to delete this user?</p>
          <div className="d-flex justify-content-center gap-2 mt-2">
            <button
              className="btn btn-danger btn-sm"
              onClick={() => {
                onConfirm();
                toast.dismiss(); // close toast
              }}
            >
              Yes
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={toast.dismiss}
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

  const handleDeleteUser = (userId) => {
    showDeleteConfirm(async () => {
      try {
        await axios.delete(`http://localhost:5000/api/users/${userId}`);
        toast.success("User deleted successfully!");
        fetchUsers();
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete user.");
      }
    });
  };

  return (
    <div className="container">
      <h2>User Management</h2>

      {loading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <table className="table table-striped mt-3">
          <thead className="table-success">
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Email</th>
              <th>Password</th>
              <th>Mobile No.</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>**********</td>
                  <td>{user.phone}</td>
                  <td>{user.address}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => setEditingUser(user)}
                      data-bs-toggle="modal"
                      data-bs-target="#editModal"
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      {/* Edit Modal */}
      <div
        className="modal fade"
        id="editModal"
        tabIndex="-1"
        aria-labelledby="editModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          {editingUser && (
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editModalLabel">
                  Edit User
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setEditingUser(null)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label>Username</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={editingUser.username}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="mb-3">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={editingUser.email}
                    onChange={handleEditChange}
                  />
                  <div className="mb-3">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={editingUser.password || ""}
                      placeholder="**********"
                      onChange={handleEditChange}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label>Mobile No.</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={editingUser.phone}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="mb-3">
                  <label>Address</label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    value={editingUser.address}
                    onChange={handleEditChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => setEditingUser(null)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleEditSubmit}>
                  Save Changes
                </button>

                <button
                  type="button"
                  id="modalCloseBtn"
                  className="btn btn-secondary d-none"
                  data-bs-dismiss="modal"
                ></button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersManagement;
