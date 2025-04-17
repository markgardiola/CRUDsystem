import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const resorts = [
  {
    id: 1,
    name: "Cocoons Laiya Club Resort",
    location: "San Juan, Batangas",
    description: "A beautiful beach resort.",
    rooms: [
      { type: "Standard Room", price: "₱3,500" },
      { type: "Family Room", price: "₱5,000" },
    ],
  },
  {
    id: 2,
    name: "Acuatico Beach Resort",
    location: "Laiya, Batangas",
    description: "Luxury and relaxation by the sea.",
    rooms: [{ type: "Deluxe Room", price: "₱6,800" }],
  },
];

const EditResort = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const resort = resorts.find((r) => r.id === parseInt(id));
  if (!resort) return <div>Resort not found!</div>;

  const [formData, setFormData] = useState({
    name: resort.name,
    location: resort.location,
    description: resort.description,
    rooms: [...resort.rooms],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoomChange = (index, field, value) => {
    const updatedRooms = [...formData.rooms];
    updatedRooms[index][field] = value;
    setFormData((prev) => ({ ...prev, rooms: updatedRooms }));
  };

  const addRoom = () => {
    setFormData((prev) => ({
      ...prev,
      rooms: [...prev.rooms, { type: "", price: "" }],
    }));
  };

  const removeRoom = (index) => {
    const updatedRooms = formData.rooms.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, rooms: updatedRooms }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Resort:", formData);
    navigate("/adminDashboard/resorts");
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Edit Resort</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Resort Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Location</label>
          <input
            type="text"
            name="location"
            className="form-control"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            rows="3"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <hr />
        <h5>Room Options</h5>
        {formData.rooms.map((room, index) => (
          <div className="row g-2 mb-2" key={index}>
            <div className="col-md-5">
              <input
                type="text"
                placeholder="Room Type"
                className="form-control"
                value={room.type}
                onChange={(e) =>
                  handleRoomChange(index, "type", e.target.value)
                }
              />
            </div>
            <div className="col-md-5">
              <input
                type="text"
                placeholder="Price (e.g. ₱3,500)"
                className="form-control"
                value={room.price}
                onChange={(e) =>
                  handleRoomChange(index, "price", e.target.value)
                }
              />
            </div>
            <div className="col-md-2">
              <button
                type="button"
                className="btn btn-outline-danger w-100"
                onClick={() => removeRoom(index)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        <div className="mb-3">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={addRoom}
          >
            Add Room
          </button>
        </div>

        <div className="text-end">
          <button type="submit" className="btn btn-success">
            Save Changes
          </button>
        </div>
      </form>

      <Link
        to="/adminDashboard/resorts"
        className="btn btn-outline-secondary mt-3"
      >
        ← Back to Listings
      </Link>
    </div>
  );
};

export default EditResort;
