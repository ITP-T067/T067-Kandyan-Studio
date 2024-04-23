import React, { useState, useEffect } from 'react'
import { Button, Card, Typography } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { GrView } from "react-icons/gr";

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
  }, [tableRows]);

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
    <Link to="/manager/eventdept/AddPackages">
      <button className="addPackage text-xl text-kblack justify-center bg-kwhite rounded-lg w-48 h-12 flex pt-2  hover:bg-kyellow hover:text-kblack mr-6">
        Generate Report
      </button>
    </Link>
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
            searchResults.map(({ _id, package_id, date, venue, additional }, index) => {
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
                      <Button className="btn_edit w-24 border-1 rounded-lg bg-kblue ">View Payment</Button>
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

    </div>
  </div>
  )

}

export default EventsList
