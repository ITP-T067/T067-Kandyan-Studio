import React, { useState, useEffect } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";
import Standard from '../../../images/events/party1.jpg'
import Premium from '../../../images/events/party2.png'
import Diamond from '../../../images/events/party3.jpg'
import axios from 'axios';
import DatePicker from 'react-datepicker';

axios.defaults.baseURL = "http://localhost:8010/";

function BdayEvents({ packageName }) {

  const location = useLocation();
  const [addSection, setAddSection] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [packageNameLabel, setPackageNameLabel] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [dataList, setDataList] = useState([]);
  const [selectedPackageId, setSelectedPackageId] = useState(''); // Add package_id state

  const { package_id } = useParams();
  const [formData, setFormData] = useState({
    cus_name: "",
    venue: "",
    cus_contact: "",
    additional: "",
    file: null,
    date: new Date(),
    package_id: "", // Add package_id to the form data
  });

  useEffect(() => {
    setSelectedPackageId(package_id);
  }, [package_id]);

  //including package_id into event data
  const handleId = (id) => {
    setSelectedPackageId(id);
    setAddSection(true);
    console.log("Selected Package ID: ", id);
  };

  // Fetch packages by category when the selectedCategory state changes
  const fetchPackagesByCategory = async () => {
    try {
      const response = await axios.get("/package/");
      const { data } = response;

      //Filter packages by category
      const filteredPackages = data.filter(pkg => pkg.pkg_category === 'Birthday Party');
      //console.log(filteredPackages); // Check the response data in the console
      if ({ filteredPackages }) {
        setDataList(filteredPackages);
      }
    } catch (error) {
      console.error("Error Fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchPackagesByCategory();
  }, [dataList]);

  const handleOnChange = (e) => {
    const { value, name } = e.target;

    if (name === 'file') {
      setFormData((prev) => ({
        ...prev,
        [name]: e.target.files[0]
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        package_id: selectedPackageId
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // // Check if date is null or undefined
    // if (!formData.date) {
    //   alert('Please select a date.');
    //   return;
    // }

    // Set the package_id from selectedPackageId
    setFormData((prev) => ({
      ...prev,
      package_id: selectedPackageId,
    }));

    const formDataSend = new FormData();
    formDataSend.append("cus_name", formData.cus_name);
    formDataSend.append("cus_contact", formData.cus_contact);
    formDataSend.append("date", formData.date);
    formDataSend.append("venue", formData.venue);
    formDataSend.append("additional", formData.additional);
    formDataSend.append("file", formData.file);
    formDataSend.append("package_id", formData.package_id);

    console.log("Form Data: ", formData);

    try {
      const response = await axios.post("/event/create", formDataSend);
      console.log("Response: ", response.data); // Log the response from the server

      //handle response
      console.log("Response: ", response.data);

      if (response.data.success) {
        alert("Event added successfully");

        setAddSection(false);
      } else {
        alert("Failed to add Event");
      }
    } catch (error) {
      console.log(error.response.data);
      alert("An error occured while adding event")
    }
  };

  const selectPackage = (packageName) => {
    setSelectedPackage(packageName);
    setPackageNameLabel(packageName); // Update label based on selected package
    setAddSection(true);
  };

  return (
    <div>
      <div className={`container ${addSection ? 'blur' : ''}`}>
        {/* back nav */}
        <div className="ml-10 mt-0 flex justify-between gap-5 items-center">
          <div className="flex justify-center items-center">
            <Link to="/">
              <IoArrowBackCircleSharp className="w-10 h-10" />
            </Link>
            <p className="text-kwhite mt-2 mb-2 ml-2 text-lg font-[inter]">Back to home</p>
          </div>
        </div>

        {/* event navigation */}
        <div className="events w-56 h-12 relative mt-15 ml-96 flex justify-center">
          <Link to="/customer/event/WeddingEvents">
            <button className={`Wedding w-56 h-12 left-0 top-0 absolute bg-kgray rounded-tl-3xl rounded-bl-3xl text-center text-kwhite text-xl font-normal hover:bg-kyellow hover:text-kblack ${location.pathname === '/customer/event/WeddingEvents' ? 'active' : ''}`}>Wedding</button>
          </Link>
          <Link to="/customer/event/BdayEvents">
            <button className={`Bdayparty w-56 h-12 left-[232px] top-0 absolute bg-kgray text-center text-kwhite text-xl font-normal  hover:bg-kyellow hover:text-kblack ${location.pathname === '/customer/event/BdayEvents' ? 'bg-kyellow text-kblack' : ''}`}>Birthday Party</button>
          </Link>
          <Link to="/customer/event/SocialEvents">
            <button className={`Socilaevents w-56 h-12 left-[464px] top-0 absolute bg-kgray rounded-tr-3xl rounded-br-3xl text-center text-kwhite text-xl font-normal  hover:bg-kyellow hover:text-kblack ${location.pathname === '/customer/event/SocialEvents' ? 'active' : ''}`}>Social Events</button>
          </Link>
        </div>


        {/* packages */}
        <div className="card_container flex justify-center space-x-20 mt-7 mb-8">

          {
            dataList.length > 0 ? (
              dataList.map((pkg) => {
                if (pkg.pkg_name === "Standard") {
                  return (
                    // {/* Standard */}
                    <div key={pkg._id} className="card2 w-80  h-[30rem] mb-8 bg-kgray backdrop-filter backdrop-blur-lg rounded-xl border-2 border-kyellow">
                      <img className="img2 w-72 mx-auto block rounded-lg mt-3 border-2 border-kwhite" src={Standard} />
                      <div className="decsription flex flex-col justify-center items-center text-kwhite mt-2 font-[inter]">
                        <p className="type text-2xl font-bold">{pkg.pkg_name} Package</p>
                        {pkg.description.split('\n').map((line, index) => (
                          <p className="desc" key={index}>{line}</p>
                        ))}
                        <br />
                        <p className="price text-3xl font-semibold">Rs {pkg.price}</p>
                      </div>
                      <div className="button flex justify-center font-bold">
                        <button className="btn_buy justify-end items-end w-28 h-12 bg-kyellow rounded-3xl text-center text-kwhite text-base font-bold hover:bg-kwhite hover:text-kblack" onClick={() => { selectPackage("Standard"); setAddSection(true); handleId(pkg._id) }}>BUY</button>
                      </div>
                    </div>
                  )
                }
                else if (pkg.pkg_name === "Premium") {
                  return (
                    // {/* Regular */}
                    <div key={pkg._id} className="card3 w-80 h-[30rem] mb-8 bg-kgray backdrop-filter backdrop-blur-lg rounded-xl border-2 border-kyellow">
                      <img className="img3 w-72 mx-auto block rounded-lg mt-3 border-2 border-kwhite" src={Premium} />
                      <div className="decsription flex flex-col justify-center items-center text-kwhite mt-2 font-[inter]">
                        <p className="type text-2xl font-bold">{pkg.pkg_name} Package</p>
                        {pkg.description.split('\n').map((line, index) => (
                          <p className="desc" key={index}>{line}</p>
                        ))}
                        <br />
                        <p className="price text-3xl font-semibold">Rs {pkg.price}</p>
                      </div>
                      <div className="button flex justify-center font-bold">
                        <button className="btn_buy justify-end items-end w-28 h-12 bg-kyellow rounded-3xl text-center text-kwhite text-base font-bold hover:bg-kwhite hover:text-kblack" onClick={() => { selectPackage("Premium"); setAddSection(true); handleId(pkg._id) }}>BUY</button>
                      </div>
                    </div>
                  )
                }
                else if (pkg.pkg_name === "Diamond") {
                  return (
                    // {/* Diamond */}
                    <div key={pkg._id} className="card3 w-80 h-[30rem] mb-8 bg-kgray backdrop-filter backdrop-blur-lg rounded-xl border-2 border-kyellow">
                      <img className="img3 w-72 mx-auto block rounded-lg mt-3 border-2 border-kwhite" src={Diamond} />
                      <div className="decsription flex flex-col justify-center items-center text-kwhite mt-2 font-[inter]">
                        <p className="type text-2xl font-bold">{pkg.pkg_name} Package</p>
                        {pkg.description.split('\n').map((line, index) => (
                          <p className="desc" key={index}>{line}</p>
                        ))}
                        <br />
                        <p className="price text-3xl font-semibold">Rs {pkg.price}</p>
                      </div>
                      <div className="button flex justify-center font-bold">
                        <button className="btn_buy justify-end items-end w-28 h-12 bg-kyellow rounded-3xl text-center text-kwhite text-base font-bold hover:bg-kwhite hover:text-kblack" onClick={() => { selectPackage("Diamond"); setAddSection(true); handleId(pkg._id) }}>BUY</button>
                      </div>
                    </div>
                  )
                }

              })
            ) : (
              <div className="text-kwhite text-2xl flex justify-center">
                <p>No packages available</p>
              </div>
            )
          }

        </div>
      </div>

      {
        addSection && (

          <form onSubmit={handleSubmit} className="form-container fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-100 bg-kgray rounded-2xl flex justify-center items-center border-2 border-kyellow">
            <div className="outer_box flex-auto mt-5 ml-7 mr-10 max-w-4xl flex-col h-[22rem]  mb-10 rounded-xl ">
              <div>
                <label htmlFor="pkg_category" className="block text-kwhite text-xl font-bold font-[Inter]" >{packageNameLabel} Package</label>
              </div>
              <div className="grid grid-cols-2 gap-7 mt-3 items-center ml-5 mr-5 font-normal text-mdfont-semibold ">
                <div>
                  <label htmlFor="cus_name" className="block text-kwhite">Customer Name</label>
                  <input type="text"
                    className="block w-80 mt-1 rounded-md h-8 text-md bg-kwhite p-1"
                    id="cus_name"
                    name="cus_name"
                    onChange={handleOnChange}
                    value={formData.cus_name}
                    required />
                </div>
                <div>
                  <label htmlFor="date" className="block text-kwhite">Date</label>
                  <DatePicker
                    className="block w-80 mt-1 rounded-md h-8 text-md bg-kwhite p-1"
                    name="date"
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="yyyy/MM/dd"
                    required />
                </div>
                <div>
                  <label htmlFor="cus_contact" className="block text-kwhite">Contact No</label>
                  <input
                    type="text"
                    id="cus_contact"
                    name="cus_contact"
                    onChange={handleOnChange}
                    value={formData.cus_contact}
                    className="block w-80 mt-1 rounded-md h-8 text-md bg-kwhite p-1" required />
                </div>
                <div>
                  <label htmlFor="venue" className="block text-kwhite">Venue</label>
                  <input type="text"
                    id="venue"
                    name="venue"
                    onChange={handleOnChange}
                    value={formData.venue}
                    className="block w-80 mt-1 rounded-md h-8 text-md bg-kwhite p-1" required />
                </div>

                <div>
                  <label htmlFor="additioal" className="block text-kwhite">Additional</label>
                  <input type="text"
                    id="additional"
                    name="additional"
                    onChange={handleOnChange}
                    value={formData.additional}
                    className="block w-80 mt-1 rounded-md h-8 text-md bg-kwhite p-1" />
                </div>
                <div>
                  <label htmlFor="payment_slip" className="block text-kwhite">Add Payment Slip</label>
                  <input type="file"
                    id="file"
                    name="file"
                    onChange={handleOnChange}
                    className="block w-80 mt-1 rounded-md h-8 text-sm bg-kwhite p-1"  />
                </div>
                <input type="hidden" name="package_id" value={selectedPackageId} onChange={handleOnChange} />
              </div>
              <div className="flex justify-between">
                <button className="btn_submit w-28 h-12 text-lg font-normal bg-kyellow text-kwhite mt-8 ml-5 mbflex justify-center items-center rounded-lg" onClick={() => setAddSection(false)}>Close</button>
                <button className="btn_submit w-28 h-12 text-lg font-normal bg-kyellow text-kwhite mt-8 mr-5 mbflex justify-center items-center rounded-lg">Submit</button>
              </div>
            </div>
          </form>
        )
      }
    </div>
  )
}

export default BdayEvents
