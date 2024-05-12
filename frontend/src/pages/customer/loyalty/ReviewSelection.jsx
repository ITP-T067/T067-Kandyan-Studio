import React from "react";
import { VscStarHalf } from "react-icons/vsc";

function ReviewSelection({ heading }) {
  return (
    <div className="selection">
      <span className="icon">
      <VscStarHalf />

      </span>

      <h2>{heading}</h2>
    </div>
  );
}

export default ReviewSelection;
