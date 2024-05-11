import React, { useEffect, useState } from "react";
import {Button} from "@material-tailwind/react"
import axios from "axios";
import "../../../Styles/customer/reviewTable.css";
import { HiOutlineArrowCircleLeft} from "react-icons/hi";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";


axios.defaults.baseURL = "http://localhost:8010/"

function ReviewTable() {
  const [reviews, setReviews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReview, setSelectedReview] = useState(null);
  const [updatedMessage, setUpdatedMessage] = useState("");

  useEffect(() => {
    // Fetch data from backend when component mounts
    fetchData();
  }, []);
  
    const GoBack = () => {
        window.location.href = "/review/";
    }


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
    
    <div className="mx-5 mb-5">
      
    
                      <Button
                                onClick={GoBack}
                                className="flex items-center space-x-2 bg-transparent text-kwhite px-3 py-2 rounded-md"
                            >
                                <HiOutlineArrowCircleLeft className="w-8 h-8" />
                                <span className="text-3xl">Review</span>
                            </Button>
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
          <thead className="bg-kblack text-kwhite h-[50px]">
            <tr>
              <th className="px-4 py-2">Item Name</th>
              <th className="px-4 py-2">Message</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody className="bg-kgray bg-opacity-100 h-[60px]">
            {filteredReviews.map((review, index) => (
              <tr key={index}>
                <td className="px-4 py-2 text-center">{review.message}</td>
                <td className="px-4 py-2 text-center">{review.date}</td>
                <td>
                <button className="p-3 mr-3 bg-kblue" onClick={() => updateReview(index, review.message)}>
                  <PencilIcon className="h-6 w-6 text-kwhite rounded-full" />
                  </button>
                  <button className="p-3 bg-kred" onClick={() => deleteReview(index)}>
                  <TrashIcon className="h-6 w-6 text-kwhite" />
                </button>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedReview && (
  <div className="update-container blur-background">
    <form onSubmit={handleUpdate}>
      <input 
        type="text"
        value={updatedMessage}
        onChange={(e) => setUpdatedMessage(e.target.value)}
        placeholder="Updated message"
      />
      <button className="bg-kblue text-kwhite p-3 px-5" type="submit">Submit Update</button>
    </form>
  </div>
)}

    </div>
  );
}

export default ReviewTable;
