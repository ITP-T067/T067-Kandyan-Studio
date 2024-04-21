import React from "react";
import ReviewForm from "../loyalty/ReviewForm";
import Intro from "../loyalty/Intro";

function AddReview() {
  return (
    <div>
      <Intro heading="Add Review" />
      <ReviewForm />
    </div>
  );
}

export default AddReview;
