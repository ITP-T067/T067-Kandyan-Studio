import React from 'react'
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';

function BookingEvent() {
  return (
    <div>
      
      {/* back navigation */}
      <div className="backnaviagtion flex ml-10 mt-7 gap-3 items-center" >
        <Link to=""  className=" flex items-center text-kwhite">
          <IoArrowBackCircleSharp className="w-10 h-10 " />
          <p className="label text-kwhite mt-2 mb-2 ml-2 text-lg font-[inter]" >Add Details</p>
        </Link>
      </div>

      {/* form section */}
      <div className="form-container flex justify-center items-center h-full ">
        <div className="outer_box flex-auto mt-5 ml-10 mr-10 bg-kgray max-w-4xl flex-col h-[26rem]  mb-10 rounded-xl border-2 border-kyellow">
          <div className="grid grid-cols-2 gap-4 mt-7 items-center ml-20 font-['inter'] text-mdfont-semibold ">
          <div>
            <label htmlFor="pkg_category" className="block text-kwhite">Event Category</label>
            <input type="text" id="pkg_category" name="pkg_category" className="block w-80 mt-1 rounded-md h-8 text-md bg-kwhite  p-1" />
          </div>
          <div>
            <label htmlFor="date" className="block text-kwhite">Date</label>
            <input type="date" id="date" name="date" className="block w-80 mt-1 rounded-md h-8 text-md bg-kwhite p-1" />
          </div>
          <div>
            <label htmlFor="cus_name" className="block text-kwhite">Customer Name</label>
            <input type="text" id="cus_name" name="cus_name" className="block w-80 mt-1 rounded-md h-8 text-md bg-kwhite p-1" />
          </div>
          <div>
            <label htmlFor="venue" className="block text-kwhite">Venue</label>
            <input type="text" id="venue" name="venue" className="block w-80 mt-1 rounded-md h-8 text-md bg-kwhite p-1" />
          </div>
          <div>
            <label htmlFor="cus_contact" className="block text-kwhite">Contact No</label>
            <input type="text" id="cus_contact" name="cus_contact" className="block w-80 mt-1 rounded-md h-8 text-md bg-kwhite p-1" />
          </div>
          <div>
            <label htmlFor="decsription" className="block text-kwhite">Description (optional)</label>
            <input type="text" id="decsription" name="decsription" className="block w-80 mt-1 rounded-md h-8 text-md bg-kwhite p-1" />
          </div>
          <div>
            <label htmlFor="pkg_name" className="block text-kwhite">Package Name</label>
            <input type="text" id="pkg_name" name="pkg_name" className="block w-80 mt-1 rounded-md h-8 text-md bg-kwhite p-1" />
          </div>
          <div>
            <label htmlFor="payment_slip" className="block text-kwhite">Add Payment Slip</label>
            <input type="file" id="payment_slip" name="payment_slip" className="block w-80 mt-1 rounded-md h-8 text-sm bg-kwhite p-1" />
          </div>
          </div>
          <Link className="flex justify-end" to="">
            <button className="btn_submit w-28 h-12 text-lg font-['inter'] bg-kyellow text-kwhite mt-8 mr-10 flex justify-center items-center rounded-lg">Submit</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BookingEvent
