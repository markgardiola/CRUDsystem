import React from "react";
import "../styles/search.css";

const Search = () => {
  return (
    <div class="container mt-5">
      <h2 class="text-center mb-5 fw-normal display-5 text-uppercase find-resort-title">
        Find Your Perfect Beach Resort
      </h2>
      <form action="filterResorts.php" method="GET" class="row g-3">
        <div class="col-md-4">
          <label for="destination" class="form-label">
            Area Destination
          </label>
          <input
            type="text"
            class="form-control"
            id="destination"
            name="destination"
            placeholder="Enter destination"
            required
          />
        </div>
        <div class="col-md-4">
          <label for="checkin" class="form-label">
            Check-In Date
          </label>
          <input
            type="date"
            class="form-control"
            id="checkin"
            name="checkin"
            required
          />
        </div>
        <div class="col-md-4">
          <label for="checkout" class="form-label">
            Check-Out Date
          </label>
          <input
            type="date"
            class="form-control"
            id="checkout"
            name="checkout"
            required
          />
        </div>
      </form>
      <div class="col-12 text-center mt-5">
        <button type="submit" class="btn btn-success">
          Search
        </button>
      </div>
    </div>
  );
};

export default Search;
