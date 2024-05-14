import React from 'react'
import { BsArrowLeft } from 'react-icons/bs';

const GoBack = () => {
  window.location.href = "/manager/employee/";
};

const monthlyReport = () => {
  return (
    <div className='flex flex-col'>
      <div onClick={GoBack} className="flex items-center">
        <div className="flex items-center justify-center bg-transparent rounded-full h-10 w-10 ml-7 border border-kwhite transition-transform duration-300 transform-gpu hover:scale-110">
          <BsArrowLeft className="text-kwhite stroke-2" />
        </div>
        <h1 className="text-left text-kwhite text-3xl pr-4 pb-4 ml-7 mt-4">Monthly Report</h1>
      </div>
    </div>
  )
}

export default monthlyReport