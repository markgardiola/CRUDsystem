import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddResort = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [roomPrice, setRoomPrice] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleAddRoom = () => {
    if (!roomName || !roomPrice) return;

    setRooms([...rooms, { name: roomName, price: roomPrice }]);
    setRoomName("");
    setRoomPrice("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("location", location);
      formData.append("description", description);
      formData.append("image", image);
      formData.append("rooms", JSON.stringify(rooms)); // Send as JSON string

      const response = await axios.post(
        "http://localhost:5000/api/resorts",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      navigate("/adminDashboard/resorts");
    } catch (err) {
      console.error(err);
      setError("Error adding resort. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2 className="mb-4">Add New Resort</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Resort Name
          </label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <input
            type="text"
            id="location"
            className="form-control"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image
          </label>
          <input
            type="file"
            id="image"
            className="form-control"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Add Rooms</label>
          <div className="d-flex gap-2 mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Room Name"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
            <input
              type="number"
              className="form-control"
              placeholder="Room Price"
              value={roomPrice}
              onChange={(e) => setRoomPrice(e.target.value)}
            />
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAddRoom}
            >
              Add
            </button>
          </div>
          {rooms.length > 0 && (
            <ul className="list-group">
              {rooms.map((room, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between"
                >
                  {room.name} - ₱{room.price}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button type="submit" className="btn btn-success">
          Save Resort
        </button>
      </form>
    </div>
  );
};

export default AddResort;
