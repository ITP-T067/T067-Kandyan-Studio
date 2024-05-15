import React, { useState, useEffect } from 'react';
import { Card, Typography, CardBody } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TABLE_HEAD = [
  "Completed Date",
  "Item name", 
  "Quantity", 
  "Total Price",
  "Action"
];

axios.defaults.baseURL = "http://localhost:8010/";

export default function CompletedReview() {
  const navigate = useNavigate();
  const [filteredOrder, setFilteredOrder] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [completedOrders, setCompletedOrders] = useState([]);

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

  const handleViewClick = (itemId) => {
    navigate(`/addreview/${itemId}`);
  };

  return (
    <div>
      <div className="mx-5 mb-5">
        <Card>
          <CardBody className="flex items-center justify-between">
            <div>
              <div className="flex items-center" onClick={() => navigate('/review')}>
                <svg className="h-9 w-9 mb-1 text-kwhite mr-2 cursor-pointer" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 8 8 12 12 16" />
                  <line x1="16" y1="12" x2="8" y2="12" />
                </svg>
                <h2 className="text-3xl font-bold text-kwhite cursor-pointer">Completed Orders</h2>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <div>
        <form className="max-w-md mx-auto left-0 right-0">
          <div>
            <div className="inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-kwhite dark:text-kblack" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input value={searchQuery} onChange={handleSearchInputChange} className="w-full p-3 ps-10 text-lg rounded-full bg-gray-50 dark:bg-kwhite dark:text-kblack" placeholder="Search item name or status" required />
          </div>
        </form>
      </div>

      <div className="p-8">
        <table className="w-full rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-kgray bg-opacity-30">
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className={`border-kwhite text-kwhite p-4 font-bold ${
                    index === TABLE_HEAD.length ? "" : "border-b"
                  } text-center`}
                >
                  <Typography variant="lead">{head}</Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredOrder.map((order, index) => (
              <tr key={index} className={`${index === completedOrders.length ? "" : "border-b"} text-kwhite text-center p-4 bg-kgreen bg-opacity-30`}>
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
                <td className="p-2">
                  <div className="mx-auto text-kwhite">
                    <button type="button" className="bg-kyellow focus:ring-4 focus:outline-none font-medium rounded-3xl text-sm px-5 py-2.5 text-center me-2 mb-2 w-[6rem]" onClick={() => handleViewClick(order.Item_Name)}>Add Review</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
