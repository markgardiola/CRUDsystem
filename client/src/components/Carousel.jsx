import React from "react";
import tagaytayVolcano from "../assets/tagaytay-Volcano.webp";
import "../styles/carousel.css";

const Carousel = () => {
  return (
    <div
      id="carouselExampleCaptions"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active c-item" data-bs-interval="5000">
          <img className="d-block w-100 c-img" src={tagaytayVolcano} />
          <div className="carousel-caption c-caption d-flex justify-content-center align-items-center">
            <h1 className="display-1 text-capitalize fw-bold">Ala-Eh-scape</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
