

import React, { useState, useEffect } from "react";
import { addFeedbackAPI } from "../services/allAPI";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Feedback() {
  const [rating, setRating] = useState(0);
  const [emoji, setEmoji] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [token, setToken] = useState("");
  const [jumpingEmoji, setJumpingEmoji] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    setToken(storedToken || "");
  }, []);

  const handleReview = async (e) => {
    e.preventDefault();

    if (!feedbackText || rating === 0) {
      alert("Please fill out all fields.");
      return;
    }

    const reqBody = new FormData();
    reqBody.append("rating", rating);
    reqBody.append("emoji", emoji);
    reqBody.append("feedbackText", feedbackText);
    reqBody.append("doctor", "784962");

    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const result = await addFeedbackAPI(reqBody, reqHeader);
      if (result.status === 200) {
        alert("Feedback submitted successfully!");
        navigate("/home");
      } else {
        alert("Failed to submit feedback. Try again.");
      }
    }
  };

  const emojiList = ["😡", "😞", "😐", "😊", "😁"];

  const handleEmojiClick = (index, emojiIcon) => {
    setRating(index + 1);
    setEmoji(emojiIcon);
    setJumpingEmoji(index); 

    setTimeout(() => {
      setJumpingEmoji(null);
    }, 500);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow-lg text-center w-100 border border-muted" style={{ maxWidth: "500px" }}>
        <h1 className="text-dark fw-bold">TSEEP Academy</h1>
        <h2 className="fs-5 fw-semibold text-secondary mt-2">
          🎉 Congratulations! You have Successfully Completed The Test
        </h2>

        {/* Feedback Section */}
        <div className="mt-4">
          <h3 className="fw-bold text-dark">Feedback</h3>
          <p className="text-muted">Your input is important for us. We take customer feedback very seriously.</p>

          {/* Emoji Rating System with Jump Effect */}
          <div className="d-flex justify-content-center gap-2 mb-3">
            {emojiList.map((emojiIcon, index) => (
              <span
                key={index}
                className={`fs-3 cursor-pointer ${rating === index + 1 ? "text-warning" : "text-secondary"}`}
                style={{
                  cursor: "pointer",
                  display: "inline-block",
                  transform: jumpingEmoji === index ? "translateY(-10px)" : "translateY(0)",
                  transition: "transform 0.3s ease-in-out",
                }}
                onClick={() => handleEmojiClick(index, emojiIcon)}
              >
                {emojiIcon}
              </span>
            ))}
          </div>

          {/* Feedback Textbox */}
          <textarea
            className="form-control mb-3 border-muted"
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            placeholder="Add a comment..."
            rows="3"
          ></textarea>

          {/* Submit Button */}
          <button className="btn btn-dark w-100" onClick={handleReview}>
            Submit Feedback
          </button>
        </div>

        {/* Back to Home Button */}
        <button className="btn btn-outline-dark mt-3" onClick={() => navigate("/home")}>
          ⬅️ Back to Home
        </button>
      </div>
    </div>
  );
}

export default Feedback;
