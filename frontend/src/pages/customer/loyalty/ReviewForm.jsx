import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import "../../../Styles/addreveiw.css";

axios.defaults.baseURL = "http://localhost:8010/";

function ReviewForm() {
  const [productRating, setProductRating] = useState(0);
  const [deliveryRating, setDeliveryRating] = useState(0);
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [productHover, setProductHover] = useState(null); // State for hover effect of product rating stars
  const [deliveryHover, setDeliveryHover] = useState(null); // State for hover effect of delivery rating stars
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
    // Validate ratings
    if (
      !productRating ||
      productRating < 1 ||
      productRating > 5 ||
      !deliveryRating ||
      deliveryRating < 1 ||
      deliveryRating > 5
    ) {
      setErrorMessage(
        "Please select valid ratings (1-5) for both product quality and delivery quality."
      );
      return;
    }
    // Send POST request to add review
    if (!message.trim()) {
      setErrorMessage("Please enter a review message.");
      return;
    }

    try {
      const response = await axios.post("/review/add", {
        productRating: productRating,
        deliveryRating: deliveryRating,
        name: itemId,
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

      setProductRating(0);
      setDeliveryRating(0);
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

            {/* Product Quality Rating */}
            <div className="flex justify-center">
              <label htmlFor="productRating">Product Quality Rating:</label>
              {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                  <label key={index}>
                    <input
                      className="star-input"
                      type="radio"
                      name="productRating"
                      value={ratingValue}
                      onClick={() => {
                        setProductRating(ratingValue);
                        setErrorMessage("");
                      }}
                    />
                    <FaStar
                      className="star"
                      color={ratingValue <= (productHover || productRating) ? "#ffc107" : "#e4e5e9"}
                      size={30}
                      onMouseEnter={() => setProductHover(ratingValue)}
                      onMouseLeave={() => setProductHover(null)}
                    />
                  </label>
                );
              })}
            </div>

            <br /> {/* Add a line break here */}

            {/* Delivery Quality Rating */}
            <div className="flex justify-center">
              <label htmlFor="deliveryRating">Delivery Quality Rating:</label>
              {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                  <label key={index}>
                    <input
                      className="star-input"
                      type="radio"
                      name="deliveryRating"
                      value={ratingValue}
                      onClick={() => {
                        setDeliveryRating(ratingValue);
                        setErrorMessage("");
                      }}
                    />
                    <FaStar
                      className="star"
                      color={ratingValue <= (deliveryHover || deliveryRating) ? "#ffc107" : "#e4e5e9"}
                      size={30}
                      onMouseEnter={() => setDeliveryHover(ratingValue)}
                      onMouseLeave={() => setDeliveryHover(null)}
                    />
                  </label>
                );
              })}
            </div>

            <label htmlFor="message">Review Message:</label>
            <textarea
              id="message"
              className="review-message"
              value={message}
              onChange={(e) => {
                const input = e.target.value;
                const onlyLetters = input.replace(/[^a-zA-Z\s]/g, ""); // Remove any characters that are not letters or spaces
                setMessage(onlyLetters);
              }}
              style={{ color: "black" }} // Apply inline style
            />
          </div>

          <div>
            <label htmlFor="date">Date:</label>
            <input type="text" id="date" className="date text-kblack" value={getCurrentDate()} readOnly />
          </div>

          <button type="submit">Submit Review</button>
        </form>
      </div>
    </div>
  );
}

export default ReviewForm;
