import React from "react";
import ReviewForm from "../loyalty/ReviewForm";
import { Button } from "@material-tailwind/react";
import { HiOutlineArrowCircleLeft } from "react-icons/hi";

const GoBack = () => {
  window.location.href = "/review/";
}
function AddReview() {
  return (
            <div>
                 <Button onClick={GoBack}
                                className="flex items-center space-x-2 bg-transparent text-kwhite px-3 py-2 rounded-md">
                                <HiOutlineArrowCircleLeft className="w-8 h-8" />
                                <span className="text-3xl">Review</span>
                            </Button>
      <ReviewForm />
    </div>
  );
}

export default AddReview;
