import React, { useState, useEffect, useRef } from 'react'
import { Button, Card, Typography } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { GrView } from "react-icons/gr";
import { HiOutlineArrowCircleLeft, HiOutlinePlusCircle, HiFilter, HiOutlineDocumentReport } from "react-icons/hi";
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';


axios.defaults.baseURL = "http://localhost:8010/";

//report generation
class EventSummaryContent extends React.Component {
  render() {

    const { approvedEvents } = this.props;

    const calculateEventsPerCategory = (rows) => {
      let weddingCount = 0;
      let birthdayCount = 0;
      let socialCount = 0;

      rows.forEach((event) => {
        if (event.package_id.package_category !== null) {
          if (event.package_id.pkg_category === "Wedding") {
            weddingCount++;
          } else if (event.package_id.pkg_category === "Birthday Party") {
            birthdayCount++;
          } else if (event.package_id.pkg_category === "Social Event") {
            socialCount++;
          }
        }

      });

      return [
        { category: "Wedding", count: weddingCount },
        { category: "Birthday Party", count: birthdayCount },
        { category: "Social Event", count: socialCount }
      ];
    };

    const calcTotalEvents = (data) => {
      let total = 0;
      data.forEach((event) => {
        total++;
      });
      return total;
    };

    const calcTotalAmount = (data) => {
      return data.reduce((amount, event) => {
        if (event.package_id && event.package_id.price) {
          return amount + event.package_id.price;
        } else {
          return amount;
        }
      }, 0); // Use reduce to sum up the prices
    };

    return (
      <div className="bg-kwhite text-black text-lg mt-20 justify-center max-w-4xl ml-20 border-bg-kyellow">
        <div className="mt-5 ml-5 mb-5">
          {/* Logo */}
          <div className="flex justify-center">
            <img src={require(`../../../images/logo.png`)} className="h-20 w-20" />
          </div>
          {/* Title and Subtitle */}
          <h1 className="flex justify-center font-bold">Kandyan Studio & Digital Color Lab</h1>
          <h2 className="flex justify-center font-bold">Event Summary</h2><br />
          {/* Event Summary Content */}
          <div className=" text-kblack  p-5">
            <h3>Events per Category:</h3>
            <br />
            <ol type="square">
              <li>Wedding: {calculateEventsPerCategory(approvedEvents)[0].count}</li>
              <li>Birthday Party: {calculateEventsPerCategory(approvedEvents)[1].count}</li>
              <li>Social Event: {calculateEventsPerCategory(approvedEvents)[2].count}</li>
            </ol><br /><br />
            <p>Total Number of Events Booked: {calcTotalEvents(approvedEvents)}</p> <br />
            <p>Total Amount Earned: {calcTotalAmount(approvedEvents)}</p><br /><br />
          </div>
        </div>
      </div>


    );
  }
};

function EventsList() {

  const TABLE_HEAD = ["Package Category", "Package Name", "Date", "Venue", "Price", "Additional", "Actions"];

  const [tableRows, setTableRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [approvedEvents, setApprovedEvents] = useState([]);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailMsg, setEmailMsg] = useState("");


  const fetchData = async (_id) => {
    try {
      // Assuming you have a package ID stored in a variable called packageId
      const response = await axios.get(`/event/package/${_id}`, {
        params: {
          status: "Pending"
        }
      });
      if (response.data.success) {
        setTableRows(response.data.data);
        console.log(response.data.data);
      } else {
        console.error("Failed to fetch data:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  //updating status of the event
  const approveEvent = async (eventId) => {
    try {
      const response = await axios.put(`/event/${eventId}`);
      if (response.data.success) {
        // Fetch data again to update the UI
        fetchData();
      } else {
        console.error("Failed to approve event:", response.data.message);
      }
    } catch (error) {
      console.error("Error approving event:", error);
    }
  };

  //declining event-> sending email
  const sendEmail = async (eventId) => {
    try {
      const response = await axios.post(`/event/send-email`);
      if (response.data.success) {
        alert("Email sent successfully");
      }
      else {
        console.error("Failed to send email:", response.data.message);
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  // Function to format date in yyyy/mm/dd format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  //
  const fetchDataApproved = async (_id) => {
    try {
      // Assuming you have a package ID stored in a variable called packageId
      const response = await axios.get(`/event/package/${_id}`, {
        params: {
          status: "Approved"
        }
      });
      if (response.data.success) {
        setApprovedEvents(response.data.data);
        console.log(response.data.data);
      } else {
        console.error("Failed to fetch data:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDataApproved();
  }, []);

  //search events

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const results = tableRows.filter((event) =>
      event.package_id.pkg_category && event.package_id.pkg_category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }
    , [searchTerm, tableRows]);

  const componentRef = useRef([]);

  const generatePDF = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Event Report",
    onAfterPrint: () => alert("Data saved in PDF"),
  });

  //view pdf
  const viewPaymentPDF = async (file) => {
    try {
      // Make a GET request to fetch the PDF file
      const response = await axios.get(`/uploads/EventManagement/${file}`, {
        responseType: 'blob' // Set the response type to 'blob' to handle binary data
      });

      // Create a blob object from the response data
      const blob = new Blob([response.data], { type: 'application/pdf' });

      // Create a URL for the blob object
      const url = window.URL.createObjectURL(blob);

      // Create an anchor element
      const a = document.createElement('a');
      a.href = url;
      a.download = file; // Set the filename for the downloaded file
      a.target = '_blank';

      // Append the anchor element to the document body and click it to trigger the download
      document.body.appendChild(a);
      a.click();

      // Remove the anchor element from the document body
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error fetching PDF file:", error);
    }
  };


  //fetching file

  return (
    <div className="h-[100vh]">
      <div className={`container ${showEmailForm ? 'blur' : ''}`}>
        {/* upper section */}
        <div className="ml-10 mt-0 flex justify-between gap-5 items-center">
          <div className="flex justify-center items-center">
            <Link to="/manager/eventdept">
              <IoArrowBackCircleSharp className="w-10 h-10 text-kwhite" />
            </Link>
            <p className="text-kwhite mt-2 mb-2 ml-2 text-lg font-[inter]">All Events</p>
          </div>
          <div>
            {/* search bar */}
            <input
              type="search"
              placeholder="Search by Category"
              className="border-2 border-kwhite bg-kwhite rounded-full w-96 h-8 pl-4 text-normal"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={generatePDF}
            className="addPackage text-xl text-kblack justify-center bg-kwhite rounded-lg w-48 h-12 flex pt-2  hover:bg-kyellow hover:text-kblack mr-6">
            <HiOutlineDocumentReport className="w-9 h-9" />
            <span className="text-sm">Generate Reports</span>
          </button>
        </div>

        {/* table displaying section */}
        <div className=' mt-10 ml-10 mr-10'>

          <Card className="h-full w-full text-kwhite">
            <table className="w-full min-w-max table-auto text-center">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-kwhite bg-kblack p-4 text-kwhite "
                    >
                      <Typography
                        variant="normal"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {searchResults.length > 0 ? (
                  searchResults.map(({ _id, package_id, date, venue, additional, file, status }, index) => {
                    const { pkg_category, pkg_name, price } = package_id;
                    const isLast = index === searchResults.length - 1;
                    const classes = isLast ? "p-4" : "p-4 border-b border-kblue-gray-50";

                    return (
                      <tr key={_id} className="bg-kwhite bg-opacity-20">
                        <td className={classes}>
                          <Typography
                            variant="normal"
                          >
                            {pkg_category}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="normal"
                          >
                            {pkg_name}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="normal"
                          >
                            {formatDate(date)}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="normal"
                          >
                            {venue}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="normal"
                          >
                            {price}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="normal"
                          >
                            {additional}
                          </Typography>
                        </td>
                        <td hidden>
                          {status}
                        </td>
                        <td className={classes}>
                          <Button onClick={() => approveEvent(_id)} className="btn_edit w-24 border-1 rounded-lg  bg-kgreen ">Approve</Button>
                          <Button onClick={() => sendEmail(_id)} className="ml-4 btn_edit w-24 border-1 rounded-lg bg-kred ">Decline</Button>
                          <Button onClick={() => viewPaymentPDF(file)} className="btn_edit w-24 border-1 rounded-lg bg-kblue ml-4">View Payment</Button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr className="p-4 border-b border-kblue-gray-50">
                    <td colSpan="6" className="text-center py-4">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </Card>

          {/* Event summary report component */}
          <div style={{ display: 'none' }}>
            <EventSummaryContent approvedEvents={approvedEvents} ref={componentRef} />
          </div>
        </div>
      </div>



    </div>
  )

}

export default EventsList
