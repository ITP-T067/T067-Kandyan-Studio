import React from 'react'
import { Link } from 'react-router-dom'
import { IoArrowBackCircleSharp } from "react-icons/io5";

function EventsList() {
  return (
    <div>

      {/* upper section */}
      <div className="ml-10 mt-0 flex justify-between gap-5 items-center">
        <div className="flex justify-center items-center">
          <Link to="/manager/eventdept">
            <IoArrowBackCircleSharp className="w-10 h-10 text-kwhite"/>
          </Link>
          <p className="text-kwhite mt-2 mb-2 ml-2 text-lg font-[inter]">All Events</p>
        </div>
        <div>
        {/* search bar */}
        <form className="max-w-md mx-auto">   
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-kwhite sr-only dark:text-kwhite">Search</label>
          <div className="relative w-96 items-center">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-kwhite dark:text-kgray" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input 
          type="search" 
          id="default-search" 
          className="block w-full p-4 ps-10 text-sm text-kwhite border border-kwhite rounded-lg bg-kgray focus:ring-kblue focus:border-kblue dark:bg-kgray dark:border-kgray dark:placeholder-kgray dark:text-kwhite dark:focus:ring-kblue dark:focus:border-kblue" 
          placeholder="Search Events..." 
          required 
          />
          <button 
          type="submit" 
          className="text-kwhite absolute end-2.5 bottom-2.5 bg-kblue hover:bg-kblue focus:ring-4 focus:outline-none focus:ring-kblue font-medium rounded-lg text-sm px-4 py-2 dark:bg-kblue dark:hover:bg-kblue dark:focus:ring-kblue"
          >
          Search
          </button>
          </div>
        </form>
        </div>
        <Link to="/manager/eventdept/AddPackages">
          <button className="addPackage text-xl text-kblack justify-center bg-kwhite rounded-lg w-48 h-12 flex pt-2  hover:bg-kyellow hover:text-kblack mr-6">
          Generate Report
          </button>
        </Link> 
      </div>

      {/* Events displaying section */}

      
      
    </div>
  )
}

export default EventsList
