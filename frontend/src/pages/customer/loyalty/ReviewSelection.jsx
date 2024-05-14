import React from "react";
import { VscStarHalf } from "react-icons/vsc";

function ReviewSelection({ heading },{logo}) {
  return (
    <div className="text-kwhite bg-kblack border-4 border-kyellow rounded-3xl transition-transform flex flex-col justify-center items-center text-center hover:scale-105">
      <div >
      <VscStarHalf className="w-32 h-32 mb-5 mt-16" />

      </div>

      <span className="text-2xl mb-16">{heading}</span>
    </div>
  );
}

export default ReviewSelection;
