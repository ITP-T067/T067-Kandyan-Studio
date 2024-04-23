import React from "react";
import Intro from "../loyalty/Intro";
import ReviewSelection from "../loyalty/ReviewSelection";
import { Link } from "react-router-dom";
import "../../../Styles/customer/Review.css";

function Review() {
  return (
    <div>
      <Intro heading="Review" />
      <div className="container">
        <Link to="/addreview">
          <ReviewSelection heading="Add Review" />
        </Link>
        <Link to="/viewreview">
          <ReviewSelection heading="Review List" />
        </Link>
      </div>
    </div>
  );
}

export default Review;
