import React from 'react'
import { FaList } from "react-icons/fa";
import { MdManageHistory } from "react-icons/md";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

axios.defaults.baseURL = "http://localhost:8010"; // Adjust the port number as needed

const MgrDashboardEvent = () => {

  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    fetchPackageData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/event/'); // Adjust the endpoint URL as needed
      if (response.data.success) {
        setDataList(response.data.data);
      } else {
        console.error("Failed to fetch data:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //getting pkg_category and pkg_name by package_id
  const fetchPackageData = async () => {
    try {
      const response = await axios.get("/event/package");
      if (response.data.success) {
        setDataList(response.data.data);
        console.log(response.data);
      } else {
        console.error("Failed to fetch data:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching package data:", error);
    }
  };

  const calcTotalEvents = (data) => {
    let total = 0;
    fetchPackageData();
    data.forEach((event) => {
      total++;
    });
    return total;
  }

  const calcTotalValue = (data) => {
    fetchPackageData();
    return data.reduce((total, event) => {
      if (event.package_id && event.package_id.price) {
        return total + event.package_id.price;
      } else {
        return total;
      }
    }, 0); // Use reduce to sum up the prices
  }

  return (
    <div>

      {/* Container Section */}
      <br/>
      <div className="container flex justify-center items-center  space-x-10">
        <Link to='/manager/eventdept/EventsList'>
          <button className="Rectangle172 flex flex-col items-center justify-center w-80 h-[16rem] rounded-lg text-kwhite bg-kblack  border-4 border-kyellow text-2xl font-bold hover:scale-105 transition-transform duration-300">
            <FaList  className="text-5xl mb-4 w-20 h-20 text-kwhite-default" />
            Events List
          </button>
        </Link>
        <Link to='/manager/eventdept/MgrWedding'>
          <button className="Rectangle172 flex flex-col items-center justify-center w-80 h-[16rem] rounded-lg  text-kwhite bg-kblack border-kyellow border-4 text-kwhite-default text-2xl font-bold hover:scale-105 transition-transform duration-300">
            <MdManageHistory className="text-5xl mb-4 text-white w-20 h-20" />
            Manage Packages  
          </button>
        </Link>
      </div>

      {/* Bottom Section */}
      <div className="badges flex justify-center mt-10 px-20 space-x-20  mb-10">
        <div className="badge1 flex items-center justify-center w-96 h-40 relative  bg-kblack rounded-lg border-2 border-kwhite">
          <div className="Rectangle173 absolute inset-0  rounded-lg"></div>
          <span className=" text-kwhite text-lg font-semibold absolute top-4 left-4">Total Event Requests</span>
          <span className=" text-kwhite text-3xl font-semibold"> {calcTotalEvents(dataList)}</span>
        </div>
        <div className="Group9019 flex items-center justify-center w-96 h-40 relative bg-kblack rounded-lg border-2 border-kwhite">
          <div className="Rectangle174 absolute inset-0 rounded-lg"></div>
          <span className=" text-kwhite text-lg font-semibold absolute  top-4 left-4">Total Sales</span>
          <span className=" text-kwhite text-3xl font-semibold">LKR {calcTotalValue(dataList)}</span>
        </div>
      </div>

      
    </div>
  )
}

export default MgrDashboardEvent
