import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";
import Standard from '../../../images/events/party1.jpg'
import Premium from '../../../images/events/party2.png'
import Diamond from '../../../images/events/party3.jpg'
import axios from 'axios';



function BdayEvents({packageName}) {
    const [addSection, setAddSection] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [formData, setFormData] = useState({
        pkg_category: "",
        date: "",
        cus_name: "",
        venue: "",
        cus_contact: "",
        description: "",
        pkg_name: "",
        payment_slip: "",
    })

    const handleOnChange = (e) => {
        const {value,name} = e.target
        setFormData((preve)=>{
            return {
                ...preve,
                [name] : value
            }
        })
    }

    const handleSubmit = async(e) =>{
      e.preventDefault()
      const data = await axios.post("/create", formData)
      console.log(data)
    }

    const selectPackage = (packageName) => {
      setSelectedPackage(packageName);
      setFormData(prev => ({
        ...prev,
        pkg_name: packageName
      }));
      setAddSection(true);
    };
  
    return (
      <div>
        <div className={`container ${addSection ? 'blur' : ''}`}>
        {/* back nav */}
        <div className="ml-10 mt-0 flex justify-between gap-5 items-center">
          <div className="flex justify-center items-center">
            <Link to="/">
              <IoArrowBackCircleSharp className="w-10 h-10"/>
            </Link>
            <p className="text-kwhite mt-2 mb-2 ml-2 text-lg font-[inter]">Back to home</p>
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
        <div className="card_container flex justify-center space-x-20 mt-7 mb-8">
                  
                  {/* Standard */}
                  <div className="card2 w-80  h-[26rem] bg-kgray rounded-lg backdrop-filter backdrop-blur-lg border-2 border-kyellow">
                      <img className="img 2 w-72 mx-auto block rounded-lg mt-3 border-2 border-kwhite" src={Standard}/>
                      <div className="decsription flex flex-col justify-center items-center text-kwhite mt-2 font-[inter]">
                          <p className="type text-2xl font-bold">Standard Package</p>
                          <p className="desc">dummy data</p>
                          <p className="price text-3xl font-semibold">Rs 25 000</p>
                      </div>
                      <div className="button flex justify-center font-bold">  
                          <button className="btn_buy justify-end items-end w-28 h-12 bg-kyellow rounded-3xl text-center text-kwhite text-base font-bold font-['Inter'] hover:bg-kwhite hover:text-kblack" onClick={() => { selectPackage("Standard"); setAddSection(true); }}>BUY</button>
                      </div>
                  </div>
  
                  {/* Premium */}
                  <div className="card3 w-80 h-[26rem] bg-kgray rounded-lg backdrop-filter backdrop-blur-lg border-2 border-kyellow">
                      <img className="img3 w-72 mx-auto block rounded-lg mt-3 border-2 border-kwhite" src={Premium}/>
                      <div className="decsription flex flex-col justify-center items-center text-kwhite mt-2 font-[inter]">
                          <p className="type text-2xl font-bold">Premium Package</p>
                          <p className="desc">dummy data</p>
                          <p className="price text-3xl font-semibold">Rs 75 000</p>
                      </div>
                      <div className="button flex justify-center font-bold">  
                          <button className="btn_buy justify-end items-end w-28 h-12 bg-kyellow rounded-3xl text-center text-kwhite text-base font-bold font-['Inter'] hover:bg-kwhite hover:text-kblack" onClick={() => { selectPackage("Premium"); setAddSection(true); }}>BUY</button>
                      </div>
                  </div>
  
                  {/* Diamond */}
                  <div className="card3 w-80 h-[26rem] bg-kgray rounded-lg backdrop-filter backdrop-blur-lg border-2 border-kyellow">
                      <img className="img3 w-72 mx-auto block rounded-lg mt-3 border-2 border-kwhite" src={Diamond}/>
                      <div className="decsription flex flex-col justify-center items-center text-kwhite mt-2 font-[inter]">
                          <p className="type text-2xl font-bold">Diamond Package</p>
                          <p className="desc">dummy data</p>
                          <p className="price text-3xl font-semibold">Rs 100 000</p>
                      </div>
                      <div className="button flex justify-center font-bold">  
                          <button className="btn_buy justify-end items-end w-28 h-12 bg-kyellow rounded-3xl text-center text-kwhite text-base font-bold font-['Inter'] hover:bg-kwhite hover:text-kblack" onClick={() => { selectPackage("Diamond"); setAddSection(true); }}>BUY</button>
                      </div>
                  </div>
              
          </div>
          </div>
        
          {
            addSection && (
        
                <form onSubmit={handleSubmit} className="form-container fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-100 bg-kgray rounded-2xl flex justify-center items-center border-2 border-kyellow">
                  <div className="outer_box flex-auto mt-5 ml-7 mr-10 max-w-4xl flex-col h-[26rem]  mb-10 rounded-xl ">
                    <div className="grid grid-cols-2 gap-7 mt-7 items-center ml-5 mr-5 font-['inter'] text-mdfont-semibold ">
                    <div>
                      <label htmlFor="pkg_category" className="block text-kwhite">Event Category</label>
                      <input type="text" id="pkg_category" name="pkg_category" value="Birthday Event" className="block w-80 mt-1 rounded-md h-8 text-md bg-kwhite  p-1" />
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
                      <input type="text" id="pkg_name" name="pkg_name" value={formData.pkg_name} className="block w-80 mt-1 rounded-md h-8 text-md bg-kwhite p-1" />
                    </div>
                    <div>
                      <label htmlFor="payment_slip" className="block text-kwhite">Add Payment Slip</label>
                      <input type="file" id="payment_slip" name="payment_slip" className="block w-80 mt-1 rounded-md h-8 text-sm bg-kwhite p-1" />
                    </div>
                    </div>
                    <div className="flex justify-between">
                        <Link className="flex justify-start" to="">
                        <button className="btn_submit w-28 h-12 text-lg font-['inter'] bg-kyellow text-kwhite mt-8 ml-5 mbflex justify-center items-center rounded-lg" onClick={()=>setAddSection(false)}>Close</button>
                        </Link>
                        <Link className="flex justify-end" to="">
                        <button className="btn_submit w-28 h-12 text-lg font-['inter'] bg-kyellow text-kwhite mt-8 mr-5 mbflex justify-center items-center rounded-lg">Submit</button>
                        </Link>
                    </div>
                  </div>
                </form>
            )
          }
      </div>
    )
}

export default BdayEvents
