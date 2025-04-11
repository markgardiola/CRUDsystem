import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="bg-dark py-5 sticky mt-auto">
        <div className="container text-light text-center">
          <p
            className="display-5 mb-3"
            style={{
              fontFamily: "'Merienda', sans-serif",
              fontWeight: 500,
            }}
          >
            Ala-Eh-scape
          </p>
          <small className="text-white-50">
            &copy; Copyright by Team Ala-Eh. All rights reserved.
          </small>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
