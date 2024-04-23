import React, { useState, useEffect } from 'react'
import { Button, Card, Typography } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8010/';

function MyEvents() {

  const TABLE_HEAD = ["Package Category", "Package Name", "Date", "Venue", "Price" , "Additional", "Actions"];

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

  return (
    <div className=' mt-10 ml-10 mr-10'>

      <Card className="h-full w-full text-kwhite">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableRows.map(({ _id, package_id, date, venue, additional }, index) => {
              const { pkg_category, pkg_name, price } = package_id;
              const isLast = index === tableRows.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

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
                      <Button className="btn_edit w-24 border-1 rounded-lg  bg-kgreen ">Edit</Button>
                    </Link>
                    <Link className="ml-4">
                      <Button className="btn_edit w-24 border-1 rounded-lg bg-kred ">Cancel</Button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>

    </div>
  )
}

export default MyEvents
