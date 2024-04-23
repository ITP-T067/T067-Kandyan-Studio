import React, { useState, useEffect, useRef } from 'react'
import { Button, Card, Typography } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { GrView } from "react-icons/gr";
import { HiOutlineArrowCircleLeft, HiOutlinePlusCircle, HiFilter, HiOutlineDocumentReport } from "react-icons/hi";
import { useReactToPrint } from 'react-to-print';

//report generation
class EventSummaryContent extends React.Component {
  render() {  
    const { tableRows } = this.props;

    const calculateEventsPerCategory = (rows) => {
      let weddingCount = 0;
      let birthdayCount = 0;
      let socialCount = 0;

      rows.forEach((event) => {
        if(event.package_id.package_category !== null){
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
      <div className="bg-kblack text-kwhite text-3xl border-2 rounded-xl mt-20 justify-center max-w-xl ml-20 border-bg-kyellow">
        <div className="mt-5 ml-5 mb-5">
          <h1 className="flex justify-center">Event Summary Report</h1><br/>
          <p>Total Number of Events Booked: {calcTotalEvents(tableRows)}</p>
          <p>Total Amount Earned: {calcTotalAmount(tableRows)}</p><br/><br/>
          <h2>Events per Category:</h2>
          <br/>
          <ol type="square">
            <li>Wedding: {calculateEventsPerCategory(tableRows)[0].count}</li>
            <li>Birthday Party: {calculateEventsPerCategory(tableRows)[1].count}</li>
            <li>Social Event: {calculateEventsPerCategory(tableRows)[2].count}</li>
          </ol>
        </div>
      </div>
    );
  }
}

function EventsList() {

  const TABLE_HEAD = ["Package Category", "Package Name", "Date", "Venue", "Price", "Additional", "Actions"];

  const [tableRows, setTableRows] = useState([]);


  const fetchData = async () => {
    try {
      const response = await axios.get('/event/'); // Adjust the endpoint URL as needed
      if (response.data.success) {
        setTableRows(response.data.data);
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

  //getting pkg_category and pkg_name by package_id
  const fetchPackageData = async () => {
    try {
      const response = await axios.get("/event/package");
      if (response.data.success) {
        setTableRows(response.data.data);
      } else {
        console.error("Failed to fetch data:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching package data:", error);
    }
  };

  useEffect(() => {
    fetchPackageData();
  }, []);

  // Function to format date in yyyy/mm/dd format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  //search events
  const [searchTerm, setSearchTerm] = useState("");
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
  const viewPaymentPDF = (file) => {
    window.open(`../../../../../backend/uploads/EventManagement/${file}`, '_blank');
  };

  return (
    <div>
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
            placeholder="Search by Package Category"
            className="border-2 border-kwhite bg-kwhite rounded-full w-72 h-8 pl-4 text-lg"
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
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-kwhite bg-transparent p-4 text-kwhite "
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className=" leading-non opacity-100 text-xl font-extrabold"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {searchResults.length > 0 ? (
                searchResults.map(({ _id, package_id, date, venue, additional, file }, index) => {
                  const { pkg_category, pkg_name, price } = package_id;
                  const isLast = index === searchResults.length - 1;
                  const classes = isLast ? "p-4" : "p-4 border-b border-kblue-gray-50";

                  return (
                    <tr key={_id}>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {pkg_category}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {pkg_name}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {formatDate(date)}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {venue}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {price}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {additional}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Link>
                          <Button className="btn_edit w-24 border-1 rounded-lg  bg-kgreen ">Approve</Button>
                        </Link>
                        <Link className="ml-4">
                          <Button className="btn_edit w-24 border-1 rounded-lg bg-kred ">Decline</Button>
                        </Link>
                        <Link className="ml-4">
                          <Button onClick={() => viewPaymentPDF(file)} className="btn_edit w-24 border-1 rounded-lg bg-kblue ">View Payment</Button>
                        </Link>
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
          <EventSummaryContent tableRows={tableRows} ref={componentRef} />
        </div>
      </div>
    </div>
  )

}

export default EventsList
