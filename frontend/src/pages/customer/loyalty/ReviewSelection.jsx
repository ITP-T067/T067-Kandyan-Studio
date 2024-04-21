import React from "react";
import { FaStar } from "react-icons/fa";

function ReviewSelection({ heading }) {
  return (
    <div className="selection">
      <span className="icon">
        <FaStar />
      </span>

      <h2>{heading}</h2>
    </div>
  );
}

export default ReviewSelection;
