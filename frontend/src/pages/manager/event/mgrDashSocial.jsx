import React from 'react'
import { Link } from 'react-router-dom'
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";
import Standard from '../../../images/events/social1.jpg'
import Premium from '../../../images/events/social2.jpg'
import Diamond from '../../../images/events/social3.jpg'

function mgrDashSocial() {
  return (
    <div>

        {/* back nav */}
        <div className="ml-10 mt-0 flex justify-between gap-5 items-center">
        <div className="flex justify-center items-center">
            <Link to="/manager/eventdept/mgrDashboardEvent">
            <IoArrowBackCircleSharp className="w-10 h-10" />
            </Link>
            <p className="text-kblack mt-2 mb-2 ml-2 text-lg font-[inter]">Manage Packages</p>
        </div>
        <button className="addPackage text-xl text-kwhite hover:bg-kyellow hover:text-kblack justify-center bg-kblack rounded-lg w-48 h-12 flex pt-2  mr-6">
            <IoIosAddCircleOutline className="w-10 h-10 flex pb-2" />
            Add Package
        </button>
        </div>

      {/* event navigation */}
      <div className="events w-56 h-12 relative mt-15 ml-96 flex justify-center">
        <Link to="/manager/eventdept/mgrDashWedding">
          <button className="Wedding w-56 h-12 left-0 top-0 absolute bg-kblack rounded-tl-3xl rounded-bl-3xl  text-center text-kwhite text-xl font-normal font-['Inter'] hover:bg-kyellow hover:text-kblack">Wedding</button>
        </Link>
        <Link to="/manager/eventdept/mgrDashBdayParty">
          <button className="Bdayparty w-56 h-12 left-[232px] top-0 absolute bg-kblack text-center text-kwhite text-xl font-normal font-['Inter'] hover:bg-kyellow hover:text-kblack">Birthday Party</button>
        </Link>
        <Link to="/manager/eventdept/mgrDashSocial">
          <button className="Socilaevents w-56 h-12 left-[464px] top-0 absolute bg-kblack rounded-tr-3xl rounded-br-3xl text-center text-kwhite text-xl font-normal font-['Inter'] hover:bg-kyellow hover:text-kblack">Social Events</button>
        </Link>
      </div>

      {/* packages */}
      <div className="card_container flex justify-center space-x-20 mt-7 mb-8">
                
                {/* Standard */}
                <div className="card2 w-80  h-[26rem] bg-kgray rounded-lg backdrop-filter backdrop-blur-lg">
                    <img className="img 2 w-72 mx-auto block rounded-lg mt-3 border-2 border-kwhite" src={Standard}/>
                    <div className="decsription flex flex-col justify-center items-center text-kwhite mt-2 font-[inter]">
                        <p className="type text-2xl font-bold">Standard Package</p>
                        <p className="desc">dummy data</p>
                        <p className="price text-3xl font-semibold">Rs 18 000</p>
                    </div>
                    <div className="buttons flex justify-center gap-9  font-bold">
                        <Link to="">
                            <button className="btn_edit justify-end items-end w-28 h-12 bg-kblue rounded-3xl text-center text-kwhite text-base font-bold font-['Inter'] hover:bg-kwhite hover:text-kblack">Edit</button>
                        </Link>
                        <Link>
                            <button className="btn_delete w-28 h-12  bg-kred rounded-3xl text-center text-kwhite text-base font-bold font-['Inter'] hover:bg-kwhite hover:text-kblack">Delete</button>
                        </Link>
                    </div>
                </div>

                {/* Premium */}
                <div className="card3 w-80 h-[26rem] bg-kgray rounded-lg backdrop-filter backdrop-blur-lg">
                    <img className="img3 w-72 mx-auto block rounded-lg mt-3 border-2 border-kwhite" src={Premium}/>
                    <div className="decsription flex flex-col justify-center items-center text-kwhite mt-2 font-[inter]">
                        <p className="type text-2xl font-bold">Premium Package</p>
                        <p className="desc">dummy data</p>
                        <p className="price text-3xl font-semibold">Rs 50 000</p>
                    </div>
                    <div className="buttons flex justify-center gap-9  font-bold">
                        <Link to="">
                            <button className="btn_edit justify-end items-end w-28 h-12 bg-kblue rounded-3xl text-center text-kwhite text-base font-bold font-['Inter'] hover:bg-kwhite hover:text-kblack">Edit</button>
                        </Link>
                        <Link>
                            <button className="btn_delete w-28 h-12  bg-kred rounded-3xl text-center text-kwhite text-base font-bold font-['Inter'] hover:bg-kwhite hover:text-kblack">Delete</button>
                        </Link>
                    </div>
                </div>

                {/* Diamond */}
                <div className="card3 w-80 h-[26rem] bg-kgray rounded-lg backdrop-filter backdrop-blur-lg">
                    <img className="img3 w-72 mx-auto block rounded-lg mt-3 border-2 border-kwhite" src={Diamond}/>
                    <div className="decsription flex flex-col justify-center items-center text-kwhite mt-2 font-[inter]">
                        <p className="type text-2xl font-bold">Diamond Package</p>
                        <p className="desc">dummy data</p>
                        <p className="price text-3xl font-semibold">Rs 90 000</p>
                    </div>
                    <div className="buttons flex justify-center gap-9  font-bold">
                        <Link to="">
                            <button className="btn_edit justify-end items-end w-28 h-12 bg-kblue rounded-3xl text-center text-kwhite text-base font-bold font-['Inter'] hover:bg-kwhite hover:text-kblack">Edit</button>
                        </Link>
                        <Link>
                            <button className="btn_delete w-28 h-12  bg-kred rounded-3xl text-center text-kwhite text-base font-bold font-['Inter'] hover:bg-kwhite hover:text-kblack">Delete</button>
                        </Link>
                    </div>
                </div>
            
        </div>
      
      
    </div>
  )
}

export default mgrDashSocial
