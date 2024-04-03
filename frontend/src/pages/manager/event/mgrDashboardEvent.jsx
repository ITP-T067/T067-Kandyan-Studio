import React from 'react'
import { Link } from 'react-router-dom'

const mgrDashboardEvent = () => {
  return (
    <div>

<div className="bg-cover bg-center backdrop-filter backdrop-blur-lg bg-[url] ">
      {/* Container Section */}
      <br/><br/><br/>
      <div className="container flex justify-center items-center mt-10 space-x-10">
        <button className="Rectangle172 flex flex-col items-center justify-center w-80 h-96 rounded-lg bg-kyellow-default text-kwhite hover:bg-kgray-700">
          <FormatListBulletedIcon className="text-5xl mb-4" />
          <Link to='/'>Events List</Link>
        </button>
        <button className="Rectangle172 flex flex-col items-center justify-center w-80 h-96 rounded-lg  bg-kyellow-default text-kwhite hover:bg-kgray-700">
          <ManageHistoryIcon className="text-5xl mb-4 text-white" />
          <Link to='/mgrDashWedding'>Manage Packages</Link>
        </button>
      </div>

      {/* Bottom Section */}
      <div className="badges flex justify-center mt-10 px-20 space-x-9  mb-10">
        <div className="badge1 flex items-center justify-center w-96 h-40 relative  bg-kgray-default rounded-lg">
          <div className="Rectangle173 absolute inset-0 bg-gray rounded-lg"></div>
          <div className=" text-kwhite-default text-lg font-semibold absolute top-4 left-4">Total Event Requests</div>
          <div className=" text-kwhite-default text-3xl font-semibold">31</div>
        </div>
        <div className="Group9019 flex items-center justify-center w-96 h-40 relative bg-kgray-default rounded-lg">
          <div className="Rectangle174 absolute inset-0 bg-gray rounded-lg"></div>
          <div className=" text-kwhite-default text-lg font-semibold absolute  top-4 left-4">Total Sales</div>
          <div className=" text-kwhite-default text-3xl font-semibold">LKR 1,340,000</div>
        </div>
      </div>

    
    </div>
      
    </div>
  )
}

export default mgrDashboardEvent
