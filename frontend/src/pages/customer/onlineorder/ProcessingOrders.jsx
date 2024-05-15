import React, { useState, useEffect } from 'react'
import { Card, Typography, CardBody } from "@material-tailwind/react";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8010/";

const TABLE_HEAD = [
  "Orderd Date",
  "Item Name",  
  "Quantity",
  "Total Price",
  "Status",
];


export default function PendingOrders() {

  const navigate = useNavigate();
  const [OnlineOrders, setOnlineOrders] = useState([]);
  const [filteredOrder, setFilteredOrder] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        getOnlineOrders();
    }, []);
    

    const getOnlineOrders = async () => {
    try {
        const response = await axios.get('order/on/'); // Replace '/path/to/your/backend/api' with your actual API endpoint
        setOnlineOrders(response.data.data);
    } catch (error) {
        console.error('Error fetching pending orders:', error);
    }
    };

    useEffect(() => {
        const filtered = OnlineOrders.filter(order =>
            order.Project_Status.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.Item_Name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredOrder(filtered);
      }, [OnlineOrders, searchQuery]);
    
      const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
      };


  return (
    <div>
      <div className="mx-5 mb-5">
                <Card>
                    <CardBody className="flex items-center justify-between">
                      <div>
                        <div class="flex items-center" onClick={() => navigate('/myorder')}>
                          <svg class="h-9 w-9 mb-1 text-kwhite mr-2 cursor-pointer" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 8 8 12 12 16" />
                            <line x1="16" y1="12" x2="8" y2="12" />
                          </svg>
                          <h2 class="text-3xl font-bold text-kwhite cursor-pointer">Processing Orders</h2>
                        </div>
                      </div>

                    </CardBody>
                </Card>
            </div>

            {/* search bar */}
            <div>
                 <form className=" max-w-md mx-auto left-0 right-0">
                    <div>
                    <div className=" inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
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
                        {filteredOrder
                            .filter(order => order.Project_Status === 'Added' || order.Project_Status === 'Not Taken')
                            .map((order, index) => (
                                <tr
                                    key={index}
                                    className={`${index === OnlineOrders.length  ? "" : "border-b"} ${
                                        order.Project_Status === "Added" ? "bg-kgreen bg-opacity-30" : 
                                        order.Project_Status === "Not Taken" ? "bg-kyellow bg-opacity-30" : "bg-kgray"
                                    } text-kwhite text-center p-4`}
                                >
                                    <td>
                                        <Typography variant="lead" color="blue-gray" className="font-normal mb-4 mt-4">
                                            {new Date(order.Order_Date).toISOString().split('T')[0]}
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
                                            {order.Order_Amount.toFixed(2)}
                                        </Typography>
                                    </td>
                                    <td>
                                        <Typography variant="lead" className="font-normal mb-4 mt-4">
                                            {order.Project_Status}
                                        </Typography>
                                    </td>
                                </tr>
                        ))}
                    </tbody>
                </table>
            </div>
    </div>
  )
}