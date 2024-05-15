import React, { useState,useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import "../../../Styles/addreveiw.css";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8010/";

function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [hover, setHover] = useState(null); // State for hover effect
  const { itemId } = useParams(); // Extract item ID from URL parameters
  const [itemName, setItemName] = useState("");
  const history = useNavigate();

  // Function to get the current date in the format yyyy-mm-dd
  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    fetchItemDetails(itemId);
  }, [itemId]);
  const fetchItemDetails = async () => {
    try {
      const response = await axios.get(`/item/${itemId}`);
      setItemName(response.data.name);
    } catch (error) {
      console.error("Error fetching item details:", error);
    }
  };

// Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
// Validate rating
    if (!rating || rating < 1 || rating > 5) {
      setErrorMessage("Please select a valid rating (1-5).");
      return;
    }
 // Send POST request to add review
    if (!message.trim()) {
      setErrorMessage("Please enter a review message.");
      return;
    }

    try {
      const response = await axios.post("/review/add", {
        rating: rating,
        itemId: itemId,
        message: message,
        date: getCurrentDate(),
      });

      setMessage(response.data.message);

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
    <div className="feedback-container">
      
      <div className="star-rating">
        
      
      <form onSubmit={handleSubmit} className="review-form-container">
        <p>{successMessage}</p>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div>
              <div className="flex justify-center">
             <label className="border-b border-black margin">{itemId}</label>
              </div>
        
            <div className="flex justify-center">
          {[...Array(5)].map((_, index) => {
          const ratingValue = index + 1;
          return (
            
            <label key={index}>
              <input
                className="star-input"
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => {
                  setRating(ratingValue);
                  setErrorMessage("");
                }}
              />
              <FaStar
                className="star"
                color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                size={30}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
            
          );
        })}
          </div>
          <label htmlFor="rating">Rating:</label>
          <input type="text" id="rating" value={rating} readOnly />
        </div>
        <div>
                <label htmlFor="message">Review Message:</label>
                <textarea
                  id="message"
                  className="review-message"
                  value={message}
                  onChange={(e) => {
                    const input = e.target.value;
                    const onlyLetters = input.replace(/[^a-zA-Z\s]/g, ''); // Remove any characters that are not letters or spaces
                    setMessage(onlyLetters);
                  }}
                  style={{ color: "black" }} // Apply inline style
                />
          </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="text"
            id="date"
            className="date"
            value={getCurrentDate()}
            readOnly
          />
        </div>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  </div>
  );
}

export default ReviewForm;
