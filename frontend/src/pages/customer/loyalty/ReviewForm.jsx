import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../Styles/addreveiw.css";
import axios from "axios";


axios.defaults.baseURL = "http://localhost:8010/";

function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const history = useNavigate();

  const handleStarClick = (value) => {
    setRating(value);
  };

  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/review/add", {
        rating: rating,
        message: message,
        date: getCurrentDate(),
      });

      setMessage(response.data.message);
      console.log("Review added successfully:", response.data);

      if (response.data.success) {
        setSuccessMessage("Review added successfully!");
        setTimeout(() => {
          history("/review");
        }, 2000);
      }

      setRating(0);
      setMessage("");
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="review-form-container">
      <p>{successMessage}</p>
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            className="star"
            onClick={() => handleStarClick(value)}
          >
            &#9733;
          </span>
        ))}
      </div>
      <div>
        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          min="0"
          max="5"
          value={rating || ""}
          readOnly
          onChange={(e) => setRating(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="message">Review Message:</label>
        <textarea
          id="message"
          className="review-message"
          value={message || ""}
          onChange={(e) => setMessage(e.target.value)}
            style={{ color: "black" }} // Apply inline style
/>

      </div>
      <div>
        <label htmlFor="date">Date:</label>
        <input
          type="text"
          id="date"
          className="date"
          value={getCurrentDate() || ""}
          readOnly
        />
      </div>
      
      <button type="submit">Submit Review</button>
    </form>
  );
}

export default ReviewForm;
