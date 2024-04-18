import React from 'react'
import { Link } from 'react-router-dom'
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";
import Minimal from '../../../images/events/minimal.jpg'
import Regular from '../../../images/events/regular.jpg'
import Deluxe from '../../../images/events/deluxe.jpg'

function WeddingEvents() {
    return (
        <div>
    
          {/* back nav */}
          <div className="ml-10 mt-0 flex justify-between gap-5 items-center">
          <div className="flex justify-center items-center">
            <Link to="/">
              <IoArrowBackCircleSharp className="w-10 h-10" />
            </Link>
            <p className="text-kwhite mt-2 mb-2 ml-2 text-lg font-[inter]">Back to Home</p>
          </div>
          </div>
    
          {/* event navigation */}
          <div className="events w-56 h-12 relative mt-15 ml-[26rem] flex justify-center">
            <Link to="/customer/event/WeddingEvents">
              <button className="Wedding w-56 h-12 left-0 top-0 absolute bg-kgray rounded-tl-3xl rounded-bl-3xl  text-center text-kwhite text-xl font-normal font-['Inter'] hover:bg-kyellow hover:text-kblack">Wedding</button>
            </Link>
            <Link to="/customer/event/BdayEvents">
              <button className="Bdayparty w-56 h-12 left-[232px] top-0 absolute bg-kgray text-center text-kwhite text-xl font-normal font-['Inter'] hover:bg-kyellow hover:text-kblack">Birthday Party</button>
            </Link>
            <Link to="/customer/event/SocialEvents">
              <button className="Socilaevents w-56 h-12 left-[464px] top-0 absolute bg-kgray rounded-tr-3xl rounded-br-3xl text-center text-kwhite text-xl font-normal font-['Inter'] hover:bg-kyellow hover:text-kblack">Social Events</button>
            </Link>
          </div>
    
          {/* packages */}
          <div className="card_container flex justify-center space-x-20 mt-7">
    
                {/* Minimal */}
                <div className="card2 w-80  h-[26rem] mb-8 bg-kgray backdrop-filter backdrop-blur-lg rounded-xl border-2 border-kyellow">
                        <img className="img2 w-72 mx-auto block rounded-lg mt-3 border-2 border-kwhite" src={Minimal}/>
                        <div className="decsription flex flex-col justify-center items-center text-kwhite mt-2 font-[inter]">
                            <p className="type text-2xl font-bold">Minimal Package</p>
                            <p className="desc">dummy data</p>
                            <p className="price text-3xl font-semibold">Rs 125 000</p>
                        </div>
                        <div className="button flex justify-center font-bold">
                          <Link to="/customer/event/BookingEvent">
                            <button className="btn_buy justify-end items-end w-28 h-12 bg-kyellow rounded-3xl text-center text-kwhite text-base font-bold font-['Inter'] hover:bg-kwhite hover:text-kblack">BUY</button>
                          </Link>
                        </div>
                </div>
    
                 {/* Regular */}
                <div className="card3 w-80 h-[26rem] mb-8 bg-kgray backdrop-filter backdrop-blur-lg rounded-xl border-2 border-kyellow">
                        <img className="img3 w-72 mx-auto block rounded-lg mt-3 border-2 border-kwhite" src={Regular}/>
                        <div className="decsription flex flex-col justify-center items-center text-kwhite mt-2 font-[inter]">
                            <p className="type text-2xl font-bold">Regular Package</p>
                            <p className="desc">dummy data</p>
                            <p className="price text-3xl font-semibold">Rs 300 000</p>
                        </div>
                        <div className="button flex justify-center font-bold">
                          <Link to="/customer/event/BookingEvent">
                            <button className="btn_buy justify-end items-end w-28 h-12 bg-kyellow rounded-3xl text-center text-kwhite text-base font-bold font-['Inter'] hover:bg-kwhite hover:text-kblack">BUY</button>
                          </Link>
                        </div>
                </div>
                
                {/* Deluxe */}
                <div className="card3 w-80 h-[26rem] mb-8 bg-kgray backdrop-filter backdrop-blur-lg rounded-xl border-2 border-kyellow">
                        <img className="img3 w-72 mx-auto block rounded-lg mt-3 border-2 border-kwhite" src={Deluxe}/>
                        <div className="decsription flex flex-col justify-center items-center text-kwhite mt-2 font-[inter]">
                            <p className="type text-2xl font-bold">De Luxe Package</p>
                            <p className="desc">dummy data</p>
                            <p className="price text-3xl font-semibold">Rs 350 000</p>
                        </div>
                        <div className="button flex justify-center font-bold">
                          <Link to="/customer/event/BookingEvent">
                            <button className="btn_buy justify-end items-end w-28 h-12 bg-kyellow rounded-3xl text-center text-kwhite text-base font-bold font-['Inter'] hover:bg-kwhite hover:text-kblack">BUY</button>
                          </Link>
                        </div>
                </div>
                
            </div>
    
          
        </div>
      )
}

export default WeddingEvents
