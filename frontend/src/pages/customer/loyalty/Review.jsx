import React from "react";
import ReviewSelection from "../loyalty/ReviewSelection";
import { Link } from "react-router-dom";
import "../../../Styles/Customer/Review.css";

import { VscStarHalf } from "react-icons/vsc";

function Review() {
  return (
    <div className="mt-40">
     
      <div className ="grid grid-cols-2 flex justify-center items-center gap-16 mx-40 px-10">
        <Link to="/completerview">
          <ReviewSelection heading="Add Review" logo="VscStarHalf" />
        </Link>
        <Link to="/viewreview">
          <ReviewSelection heading="Review List" />
        </Link>
      </div>
    </div>
  );
}

export default Review;
