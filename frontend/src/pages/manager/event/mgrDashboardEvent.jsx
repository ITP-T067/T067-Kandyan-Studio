import React from 'react'
import { FaList } from "react-icons/fa";
import { MdManageHistory } from "react-icons/md";
import { Link } from 'react-router-dom';

function mgrDashboardEvent() {
  return (
    <div>

      {/* Container Section */}
      <br/>
      <div className="container flex justify-center items-center  space-x-10">
        <button className="Rectangle172 flex flex-col items-center justify-center w-80 h-96 rounded-lg text-kwhite bg-kblack  border-4 border-kyellow text-2xl font-bold hover:scale-105 transition-transform duration-300">
          <FaList  className="text-5xl mb-4 w-20 h-20 text-kwhite-default" />
          <Link to='/manager/event/EventsList'>Events List</Link>
        </button>
        <button className="Rectangle172 flex flex-col items-center justify-center w-80 h-96 rounded-lg  text-kwhite bg-kblack border-kyellow border-4 text-kwhite-default text-2xl font-bold hover:scale-105 transition-transform duration-300">
          <MdManageHistory className="text-5xl mb-4 text-white w-20 h-20" />
          <Link to='/manager/event/mgrDashWedding'>Manage Packages</Link>
          
        </button>
      </div>

      {/* Bottom Section */}
      <div className="badges flex justify-center mt-10 px-20 space-x-20  mb-10">
        <div className="badge1 flex items-center justify-center w-96 h-40 relative  bg-kblack rounded-lg border-2 border-kwhite">
          <div className="Rectangle173 absolute inset-0  rounded-lg"></div>
          <div className=" text-kwhite text-lg font-semibold absolute top-4 left-4">Total Event Requests</div>
          <div className=" text-kwhite text-3xl font-semibold">31</div>
        </div>
        <div className="Group9019 flex items-center justify-center w-96 h-40 relative bg-kblack rounded-lg border-2 border-kwhite">
          <div className="Rectangle174 absolute inset-0 rounded-lg"></div>
          <div className=" text-kwhite text-lg font-semibold absolute  top-4 left-4">Total Sales</div>
          <div className=" text-kwhite text-3xl font-semibold">LKR 1,340,000</div>
        </div>
      </div>

      
    </div>
  )
}

export default mgrDashboardEvent
