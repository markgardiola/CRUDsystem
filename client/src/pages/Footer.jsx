import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer className="bg-dark py-5 sticky mt-auto">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <div className="container text-light text-start ps-5">
                <h5 className="text-capitalize">
                  you can contact us via email
                </h5>
                <p className="fst-italic">alaehscape@gmail.com</p>
              </div>
            </div>
            <div className="col">
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
            </div>
            <div className="col">
              <div className="container text-light text-end">
                <Link
                  to="/adminSignIn"
                  className="btn btn-outline-light btn-sm"
                >
                  Sign in as Admin
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
