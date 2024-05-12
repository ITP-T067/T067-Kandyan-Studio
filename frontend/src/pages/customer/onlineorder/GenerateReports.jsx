import React, { useRef, useState, useEffect } from 'react'
import { Card, Typography, CardBody } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useReactToPrint } from 'react-to-print';
import axios from 'axios';


axios.defaults.baseURL = "http://localhost:8010/";

const TABLE_HEAD = [
  "Completed Date",
  "Item Name",
  "Quantity",
  "Total Price"
];


export default function Generatereports() {

  const navigate = useNavigate();
  const [filteredOrder, setFilteredOrder] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [completedOrders, setCompletedOrders] = useState([]);

  // pdf generate
  const componentPDF = useRef([]);

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "History Report",
  });

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  useEffect(() => {
    fetchCompletedOrders();
  }, []);

  const fetchCompletedOrders = async () => {
    try {
      const response = await axios.get('/order/on/');
      const onlineOrders = response.data.data;

      // Filter completed orders
      const completedOnlineOrders = onlineOrders.filter(order => order.Project_Status === 'Completed');

      // Fetch project details for each completed order
      const completedOrdersWithProjectData = await Promise.all(
        completedOnlineOrders.map(async order => {
          const projectResponse = await axios.get(`/project/order/${order._id}`);
           // Assuming the endpoint to fetch project details is '/projects/:id'
          const project = projectResponse.data.data;
          return { ...order, Completed_Date: project.Completed_Date }; // Add completed date from project to order
        })
      );

      setCompletedOrders(completedOrdersWithProjectData);
    } catch (error) {
      console.error('Error fetching completed orders:', error);
    }
  };

  useEffect(() => {
    const filtered = completedOrders.filter(order =>
        order.Item_Name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredOrder(filtered);
  }, [completedOrders, searchQuery]);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleGenerateButtonClick = () => {
    // Check if both start and end dates are selected
    if (startDate && endDate) {
      // Convert start and end dates to timestamps for comparison
      const startTimestamp = startDate.getTime();
      const endTimestamp = endDate.getTime();
  
      // Check if end date is earlier than start date
      if (endTimestamp < startTimestamp) {
        alert("End date cannot be earlier than start date.");
        return; // Exit function if end date is earlier than start date
      }
  
      // Filter orders within the selected date range
      const filteredOrders = completedOrders.filter(order => {
        const orderTimestamp = new Date(order.Completed_Date).getTime();
        return orderTimestamp >= startTimestamp && orderTimestamp <= endTimestamp;
      });
  
      // Update the state with filtered orders
      setFilteredOrder(filteredOrders);
    } else {
      // If either start or end date is not selected, show an alert or handle accordingly
      alert("Please select both start and end dates.");
    }
  };
  
  



  return (
    <div>
      <div className="mx-5 mb-5">
        <Card>
          <CardBody className="flex items-center justify-between">
            <div>
              <div className="flex items-center" onClick={() => navigate('/myorder')}>
                <svg className="h-9 w-9 mb-1 text-kwhite mr-2 cursor-pointer" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 8 8 12 12 16" />
                  <line x1="16" y1="12" x2="8" y2="12" />
                </svg>
                <h2 className="text-3xl font-bold text-kwhite cursor-pointer">Generate Order History Report</h2>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="h-28 relative ">
        <div className="w-[50%] h-20 left-1/4 top-0 absolute bg-kgray bg-opacity-40 rounded-3xl flex items-center">
          <label className='font-bold text-kwhite text-lg ml-20 mr-2'>FROM</label>
          <DatePicker
            className='text-kwhite bg-kgray w-36 h-10 bg-opacity-80  rounded-3xl text-center'
            selected={startDate}
            onChange={handleStartDateChange}
          />
          <label className='font-bold text-kwhite text-lg ml-8 mr-2'>TO</label>
          <DatePicker
            className='text-kwhite bg-kgray w-36 h-10 bg-opacity-80  rounded-3xl text-center'
            selected={endDate}
            onChange={handleEndDateChange}
          />
          <button type="button" onClick={handleGenerateButtonClick} className="bg-kgreen text-kwhite text-sm focus:ring-4 focus:outline-none rounded-3xl px-5 py-2.5 text-center w-[8rem] ml-8">GENERATE</button>
        </div>
      </div>

      <form className=" max-w-md mx-auto left-0 right-0">
        <div>
          <div className=" inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-kwhite dark:text-kblack" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input value={searchQuery} onChange={handleSearchInputChange} type="search" id="default-search" className="w-full p-3 ps-10 text-lg rounded-full bg-gray-50 dark:bg-kwhite dark:text-kblack" placeholder="Search" required />
        </div>
      </form>

      <div className="h-10 max-w-md mx-auto">
        <button type="button" className="bg-kyellow font-bold text-kwhite text-sm focus:ring-4 focus:outline-none rounded-md py-3 text-center w-[6rem] right-10 absolute hover:bg-kblue" onClick={generatePDF}>DOWNLOAD</button>
      </div>



      <div className="p-8">
        <div ref={componentPDF}>
          <table className="w-full rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-kwhite bg-opacity-100 font-sans">
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className={`border-kblack text-kblack p-4 font-bold ${
                    index === TABLE_HEAD.length ? "" : "border-b"
                    } text-center`}
                  >
                  <Typography variant="lead">{head}</Typography>
                </th>
                ))}
              </tr>
            </thead>
            <tbody>
              
            {filteredOrder
                .map((order, index) => (
                  <tr
                      key={index}
                      className={`${index === completedOrders.length ? "" : "border-b"} text-kblack bg-kwhite text-center p-4`}
                  >
                      <td>
                          <Typography variant="lead" className="font-normal mb-4 mt-4">
                              {order.Completed_Date ? new Date(order.Completed_Date).toISOString().split('T')[0] : ''}
                          </Typography>
                      </td>
                      <td>
                          <Typography variant="lead" className="font-normal mb-4 mt-4">
                              {order.Item_Name}
                          </Typography>
                      </td>
                      <td>
                          <Typography variant="lead" className="font-normal mb-4 mt-4">
                              {order.Quantity}
                          </Typography>
                      </td>
                      <td>
                          <Typography variant="lead" className="font-normal mb-4 mt-4">
                              {order.Order_Amount}
                          </Typography>
                      </td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
