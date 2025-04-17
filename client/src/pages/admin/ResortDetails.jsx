import React from "react";
import { useParams, Link } from "react-router-dom";
import cocoonsImg from "/images/cocoons.jpg";

const mockResorts = [
  {
    id: 1,
    name: "Cocoons Laiya Club Resort",
    location: "San Juan, Batangas",
    description: "A beautiful beach resort perfect for relaxation.",
    amenities: ["Wi-Fi", "Pool", "Beachfront", "Free Parking", "Restaurant"],
    pricing: [
      { room: "Standard Room", price: "₱3,500 per night" },
      { room: "Deluxe Room", price: "₱5,500 per night" },
      { room: "Suite", price: "₱7,800 per night" },
    ],
    images: [cocoonsImg, cocoonsImg],
  },
  {
    id: 2,
    name: "Acuatico Beach Resort",
    location: "Laiya, Batangas",
    description: "Luxury and relaxation by the sea.",
    amenities: ["Infinity Pool", "Spa", "Private Rooms", "Bar"],
    pricing: [
      { room: "Standard Room", price: "₱6,800 per night" },
      { room: "Ocean View Room", price: "₱9,200 per night" },
    ],
    images: [cocoonsImg, cocoonsImg],
  },
];

const ResortDetails = () => {
  const { id } = useParams();
  const resort = mockResorts.find((r) => r.id === parseInt(id));

  if (!resort) {
    return (
      <div className="container py-5">
        <h3 className="text-danger">Resort not found.</h3>
        <Link
          to="/adminDashboard/resorts"
          className="btn btn-outline-success mt-3"
        >
          Back to Listings
        </Link>
      </div>
    );
  }

  return (
    <div className="container pb-5">
      <Link
        to="/adminDashboard/resorts"
        className="btn btn-outline-success mb-4"
      >
        ← Back to Listings
      </Link>

      <h2 className="fw-bold text-success">{resort.name}</h2>
      <p className="fs-5 text-muted mb-2">
        <strong>Location:</strong> {resort.location}
      </p>
      <p className="fs-5 mb-4">{resort.description}</p>

      {/* Carousel Component with Fixed Height */}
      <div
        id="resortCarousel"
        className="carousel slide mb-4"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {resort.images.map((img, index) => (
            <div
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              key={index}
            >
              <img
                src={img}
                alt={`resort-img-${index}`}
                className="d-block w-100 img-fluid rounded-4 shadow-sm"
                style={{ height: "480px", objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
        {/* Carousel controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#resortCarousel"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#resortCarousel"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <h5 className="fw-semibold text-success">Amenities:</h5>
      <ul className="list-group list-group-flush mb-4">
        {resort.amenities.map((amenity, i) => (
          <li className="list-group-item" key={i}>
            ✅ {amenity}
          </li>
        ))}
      </ul>

      <h5 className="fw-semibold text-success">Room Options & Pricing:</h5>
      <ul className="list-group list-group-flush mb-4">
        {resort.pricing.map((room, i) => (
          <li className="list-group-item" key={i}>
            <strong>{room.room}:</strong> {room.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResortDetails;
