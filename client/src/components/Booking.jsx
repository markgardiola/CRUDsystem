import React from "react";
import "../styles/booking.css";

const Booking = () => {
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
      <form
        className="row border border-2 rounded-5 border-success m-5 p-5 g-3"
        method="post"
        action="booking.php"
      >
        <h1 className="mt-0 mb-4 text-center text-uppercase fw-light">
          Booking Form
        </h1>
        <div className="col-md-6">
          <label for="inputEmail4" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="inputEmail4"
            name="email"
            required
          />
        </div>

        <div className="col-md-6">
          <label for="inputAddress" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            name="address"
            placeholder="1234 Main St"
            required
          />
        </div>

        <div className="col-md-3 mb-3">
          <label for="adultCount" className="form-label">
            Number of Adults
          </label>
          <input
            type="number"
            className="form-control"
            id="adultCount"
            name="adultCount"
            min="0"
            value="0"
            required
          />
        </div>

        <div className="col-md-3 mb-3">
          <label for="childCount" className="form-label">
            Number of Children
          </label>
          <input
            type="number"
            className="form-control"
            id="childCount"
            name="childCount"
            min="0"
            value="0"
            required
          />
        </div>

        <div className="col-md-3">
          <label for="dateInput" className="form-label">
            Check in date
          </label>
          <input
            type="date"
            className="form-control"
            id="dateInput"
            name="checkin_date"
            required
          />
        </div>

        <div className="col-md-3">
          <label for="dateInput" className="form-label">
            Check out date
          </label>
          <input
            type="date"
            className="form-control"
            id="dateInput"
            name="checkout_date"
            required
          />
        </div>

        <div className="col-md-4">
          <label for="service" className="form-label">
            Service
          </label>
          <select id="service" className="form-select" name="service" required>
            <option selected>Choose Service...</option>
            <option value="staycation">Staycation</option>
            <option value="adventure">Adventure</option>
            <option value="camping">Camping</option>
          </select>
        </div>

        <div className="col-md-4">
          <label for="destination" className="form-label">
            Destination
          </label>
          <select
            id="destination"
            className="form-select"
            name="destination"
            required
          >
            <option selected>Choose Destination...</option>
          </select>
        </div>

        <div className="col-md-4">
          <label for="resort" className="form-label">
            Resort Name
          </label>
          <select id="resort" className="form-select" name="resort" required>
            <option selected>Choose Resort...</option>
          </select>
        </div>

        <div className="col-12">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="gridCheck"
              name="send_email_confirmation"
              required
            />
            <label className="form-check-label" for="gridCheck">
              Send me an email confirmation
            </label>
          </div>
        </div>

        <div className="col-12 mt-5 d-flex justify-content-end">
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Booking;
