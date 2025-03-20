

import React from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";

const WelcomePage = () => {
  const navigate = useNavigate();
  const started = () => {
    navigate("/login");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card p-5 shadow-lg text-center w-75">
        {/* Logo Section */}
        <div className="mb-4">
          <img src={logo} alt="TSEEP Academy" className="img-fluid" style={{ maxWidth: "250px" }} />
        </div>

        {/* Welcome Text */}
        <div className="mb-4">
          <h1 className="fw-bold">
            Welcome to <span className="text-warning">TSEEP Mastery Box</span>
          </h1>
          <p className="text-secondary fs-5">
            Unlock your potential with <span className="fw-bold">AI-inspired tools</span>
          </p>
        </div>

        {/* Checkbox and Button Section */}
        <div className="form-check d-flex justify-content-center mb-3">
          <input type="checkbox" className="form-check-input me-2" id="terms" />
          <label className="form-check-label text-secondary" htmlFor="terms">
            I confirm that I have read and accept the terms and conditions and privacy policy.
          </label>
        </div>

        <button className="btn btn-dark px-5 py-2" onClick={started}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;