import React, { useEffect, useState } from "react";
import axios from "axios";
import Intro from "../loyalty/Intro";
import "../../../Styles/Customer/reviewTable.css"



function ReviewTable() {
  const [reviews, setReviews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReview, setSelectedReview] = useState(null);
  const [updatedMessage, setUpdatedMessage] = useState("");

  useEffect(() => {
    // Fetch data from backend when component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.post("/review/display");
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredReviews = reviews.filter((review) =>
    review.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const updateReview = (index, currentMessage) => {
    setSelectedReview(reviews[index]);
    setUpdatedMessage(currentMessage);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    // Send updated review data to backend
    axios
      .patch(`/review/update/${selectedReview._id}`, {
        message: updatedMessage,
      }) // Corrected to access _id
      .then((response) => {
        console.log("Review updated successfully:", response.data);
        fetchData(); // Fetch updated data after update
        setSelectedReview(null); // Clear selected review
        setUpdatedMessage(""); // Clear updated message
      })
      .catch((error) => {
        console.error("Error updating review:", error);
      });
  };

  const deleteReview = async (index) => {
    try {
      // Send request to backend to delete review
      await axios.delete(`/review/delete/${reviews[index]._id}`);
      console.log("Review deleted successfully");
      // Update reviews state after deletion
      setReviews(reviews.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <div className="containerDisplay">
      <Intro />
      <div className="review-table-container">
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search by message..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <table className="review-table">
          <thead>
            <tr>
              <th>Message</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredReviews.map((review, index) => (
              <tr key={index}>
                <td>{review.message}</td>
                <td>{review.date}</td>
                <td>
                  <button onClick={() => updateReview(index, review.message)}>
                    Update Review
                  </button>
                  <button onClick={() => deleteReview(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedReview && (
        <div className="update-container">
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              value={updatedMessage}
              onChange={(e) => setUpdatedMessage(e.target.value)}
              placeholder="Updated message"
            />
            <button type="submit">Submit Update</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ReviewTable;
