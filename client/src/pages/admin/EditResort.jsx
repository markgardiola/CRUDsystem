import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const EditResort = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State for the form data, image, and amenities
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    rooms: [],
    amenities: [], // Added state for amenities
  });
  const [image, setImage] = useState(null);

  // Fetch resort data on load
  useEffect(() => {
    const fetchResort = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/resorts/${id}`
        );
        const resort = response.data;
        setFormData({
          name: resort.name,
          location: resort.location,
          description: resort.description,
          rooms: resort.rooms,
          amenities: resort.amenities, // Populate amenities
        });
      } catch (error) {
        console.error("Failed to fetch resort data:", error);
      }
    };
    fetchResort();
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle changes in room information
  const handleRoomChange = (index, field, value) => {
    const updatedRooms = [...formData.rooms];
    updatedRooms[index][field] = value;
    setFormData((prev) => ({ ...prev, rooms: updatedRooms }));
  };

  // Handle changes in amenities
  const handleAmenityChange = (index, checked) => {
    const updatedAmenities = [...formData.amenities];
    if (checked) {
      updatedAmenities.push(index); // Add the amenity ID to the list
    } else {
      const amenityIndex = updatedAmenities.indexOf(index);
      updatedAmenities.splice(amenityIndex, 1); // Remove the amenity ID
    }
    setFormData((prev) => ({ ...prev, amenities: updatedAmenities }));
  };

  // Add a new room
  const addRoom = () => {
    setFormData((prev) => ({
      ...prev,
      rooms: [...prev.rooms, { type: "", price: "" }],
    }));
  };

  // Remove a room
  const removeRoom = (index) => {
    const updatedRooms = formData.rooms.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, rooms: updatedRooms }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", formData.name);
    form.append("location", formData.location);
    form.append("description", formData.description);
    form.append("image", image);

    // Append room data
    formData.rooms.forEach((room, index) => {
      form.append(`rooms[${index}][type]`, room.type);
      form.append(`rooms[${index}][price]`, room.price);
    });

    // Append selected amenities
    formData.amenities.forEach((amenityId) => {
      form.append("amenities[]", amenityId); // Assuming amenity IDs are stored
    });

    try {
      await axios.put(`http://localhost:5000/api/resorts/${id}`, form);
      navigate("/adminDashboard/resorts");
    } catch (error) {
      console.error("Failed to update resort:", error);
    }
  };

  return (
    <div className="container py-4">
      <Link
        to="/adminDashboard/resorts"
        className="btn btn-outline-success mb-4"
      >
        ← Back to Listings
      </Link>
      <h2 className="mb-4">Edit Resort</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Resort Name */}
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

        {/* Resort Location */}
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

        {/* Resort Description */}
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

        {/* Resort Image */}
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

        {/* Amenities Section */}
        <hr />
        <h5>Amenities</h5>
        <div className="row">
          {formData.amenitiesList?.map((amenity, index) => (
            <div key={amenity.id} className="col-md-6">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={formData.amenities.includes(amenity.id)}
                  onChange={(e) =>
                    handleAmenityChange(amenity.id, e.target.checked)
                  }
                />
                <label className="form-check-label">{amenity.name}</label>
              </div>
            </div>
          ))}
        </div>

        {/* Save Changes Button */}
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
