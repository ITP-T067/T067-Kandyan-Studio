import React, { useState, useEffect  } from 'react'
import { Card, Typography, CardBody } from "@material-tailwind/react";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8010/";

const TABLE_HEAD = [
  "Orderd Date",
  "Items", 
  "Total Price", 
  "Status",
  "Actions"
];

export default function PendingOrders() {

  const navigate = useNavigate();
  const [showPayAlert, setShowPayAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [deleteOrderId, setDeleteOrderId] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [filteredOrder, setFilteredOrder] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  

    useEffect(() => {
        getPendingOrders();
    }, []);
    
    const getPendingOrders = async () => {
        try {
            const response = await axios.get('order/on/get/pending'); // Replace '/path/to/your/backend/api' with your actual API endpoint
            setPendingOrders(response.data.data);
        } catch (error) {
            console.error('Error fetching pending orders:', error);
        }
    };

    const deletePendingItems = () => {
        axios.delete(`order/on/delete/pending/${deleteOrderId}`)
        .then(response => {
          console.log('Item deleted successfully:', response.data);
          setShowDeleteAlert(false);
          getPendingOrders();
        })
        .catch(error => {
          console.error('Error deleting item:', error);
        });
      };

      const handleRequestClick = (orderId) => {
        axios.put(`order/on/update/pending/${orderId}`)
            .then(response => {
                console.log('Order status updated successfully:', response.data);
                getPendingOrders(); // Refresh the pending orders list
            })
            .catch(error => {
                console.error('Error updating order status:', error);
            });
    };
    

    // const handleRequestClick = (orderId) => {
    //     setSelectedOrderId(orderId);
    //     setShowPayAlert(true);
    //     navigate('/pendingorder');
    // };

  const handleDeleteClick = (orderId) => {
    setDeleteOrderId(orderId);
    setShowDeleteAlert(true);
  };


  //serch bar filter
  useEffect(() => {
    const filtered = pendingOrders.filter(order =>
        order.order_status.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredOrder(filtered);
  }, [pendingOrders, searchQuery]);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const deleteAlertClass = showDeleteAlert ? "fixed top-1/4 left-1/2 transform -translate-x-1/2 " : "hidden";
  
  return (
    <div>
      <div className={`mx-5 mb-5 ${showPayAlert ? 'blur' : ''} ${showDeleteAlert ? 'blur' : ''} `}>
                <Card>
                    <CardBody className="flex items-center justify-between">
                      <div>
                        <div class="flex items-center" onClick={() => navigate('/myorder')}>
                          <svg class="h-9 w-9 mb-1 text-kwhite mr-2 cursor-pointer" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 8 8 12 12 16" />
                            <line x1="16" y1="12" x2="8" y2="12" />
                          </svg>
                          <h2 class="text-3xl font-bold text-kwhite cursor-pointer">Pending Orders</h2>
                        </div>
                      </div>

                    </CardBody>
                </Card>
            </div>

            {/* search bar */}
            <div>
                 <form className=" max-w-md mx-auto left-0 right-0">
                    <div>
                    <input value={searchQuery} onChange={handleSearchInputChange} className="w-full p-3 ps-10 text-lg rounded-full bg-gray-50 dark:bg-kwhite dark:text-kblack" placeholder="Filter Status" required />
                    </div>
                </form>
            </div>
            <div className={`p-8 ${showDeleteAlert ? 'blur' : ''}`}>
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
                            .filter(order => order.order_status === 'Pending' || order.order_status === 'Rejected')
                            .map((order, index) => (
                                <tr
                                    key={index}
                                    className={`${index === pendingOrders.length  ? "" : "border-b"} ${
                                        order.order_status === "Pending" ? "bg-kyellow bg-opacity-30" : 
                                        order.order_status === "Rejected" ? "bg-kred bg-opacity-30" : "bg-kgray"
                                    } text-kwhite text-center p-4`}
                                >
                                    <td>
                                        <Typography variant="lead" className="font-normal
                                        ">
                                            {new Date(order.order_Date).toISOString().split('T')[0]}
                                        </Typography>
                                    </td>
                                    <td>
                                        <Typography variant="lead" className="font-normal">
                                            {order.item_Names}
                                        </Typography>
                                    </td>
                                    <td>
                                        <Typography variant="lead" className="font-normal">
                                            {order.total_Price.toFixed(2)}
                                        </Typography>
                                    </td>
                                    <td>
                                        <Typography variant="lead" className="font-normal">
                                            {order.order_status}
                                        </Typography>
                                    </td>
                                    <td className="p-2">
                                        <div className="mx-auto text-kwhite">
                                        <button type="button" class={`bg-${order.order_status === 'Pending' ? 'kyellow opacity-50' : 'kyellow'} focus:ring-4 focus:outline-none font-medium rounded-3xl text-sm px-5 py-2.5 text-center me-2 mb-2 w-[6rem]`} onClick={() => handleRequestClick(order._id)} disabled={order.order_status === 'Pending'}>Request</button>
                                        {/* <button type="button" class={`bg-${order.order_status === 'Pending' ? 'kyellow opacity-50' : 'kyellow'} focus:ring-4 focus:outline-none font-medium rounded-3xl text-sm px-5 py-2.5 text-center me-2 mb-2 w-[10rem]`} onClick={() => handlePayClick(order._id)} disabled={order.order_status === 'Pending' || showPayAlert || showDeleteAlert}>Upload pay Slip</button> */}
                                        <button type="button" class={`bg-${order.order_status === 'Pending' ? 'kred opacity-50' : 'kred'} focus:ring-4 focus:outline-none font-medium rounded-3xl text-sm px-5 py-2.5 text-center me-2 mb-2 w-[6rem]`} onClick={() => handleDeleteClick(order._id)} disabled={order.order_status === 'Pending' || showPayAlert || showDeleteAlert}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            {/* uplaod slip alert */}
            {/* {showPayAlert && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-100 bg-kgray rounded-2xl flex justify-center items-center">
                    <div className="bg-white p-8 rounded-3xl">
                    {pendingOrders
                        .filter((order) => order._id === selectedOrderId)
                        .map((order) => (
                        <form key={order._id} class="w-full max-w-">
                            <div class="md:flex md:items-center mb-6">
                                <div class="md:w-1/3">
                                <button className='bg-kwhite h-4 w-4' onClick={() => setShowPayAlert(false)}>
                                    <HiXMark />
                                </button>
                                <label class="block text-kwhite  md:text-right mb-1 md:mb-0 pr-4" >
                                    Total Amount
                                </label>
                                </div>
                                <div class="md:w-2/3">
                                <input value={order.total_Price} class="block bg-kwhite rounded-xl w-full py-2 px-4 text-kblack font-bold focus:outline-none" type="number" min={1} required/>
                                </div>
                            </div>
                            <div class="md:flex md:items-center mb-6">
                                <div class="md:w-1/3">
                                    <label class="block text-kwhite  md:text-right mb-1 md:mb-0 pr-4">
                                        Bank Details: 
                                    </label>
                                </div>
                                <div class="md:w-">
                                    <label class="block text-kwhite font-bold mb-1 md:mb-0 pr-4 ">
                                        Bank Name: Hatton National Bank <br />
                                        Account: 801293979384 <br />
                                        Branch : Kollupitiya
                                    </label>
                                </div>
            
                            </div>
                            <div class="md:flex md:items-center mb-6">
                                <div class="md:w-1/3">
                                    <label class="block text-kwhite  md:text-right mb-1 md:mb-0 pr-4">
                                        Upload diposit slip
                                    </label>
                                </div>
                                <div class="md:w-2/3">
                                <input class="block bg-kwhite rounded-xl w-full py-2 px-4 text-kblack font-bold focus:outline-none" type="file" onChange={(e) => setfilename(e.target.files[0])} required/>
                                </div>
                            </div>
                            <button className="block mx-auto bg-kgreen hover:bg-green-600 text-kwhite font-bold py-2 px-4 mt-4 rounded">Pay</button>
                        </form>
                    ))}
                    </div>
                </div>
            )} */}

            {/* Delete alert */}
            {showDeleteAlert && (
               <div className={`${deleteAlertClass} bg-opacity-100 bg-kgray rounded-2xl flex justify-center items-center`}>
               <div className="bg-white p-8 rounded-3xl text-center">
                   <p className="text-3xl font-bold text-kwhite">Do you want to delete?</p>
                   <div className="mt-4">
                       <button className="inline-block bg-kgreen hover:bg-green-600 text-kwhite font-bold py-2 px-4 mr-8 rounded" onClick={deletePendingItems}>Yes</button>
                       <button className="inline-block bg-kred hover:bg-red-600 text-kwhite font-bold py-2 px-4 rounded" onClick={() => setShowDeleteAlert(false)}>No</button>
                   </div>
               </div>
           </div>
             
            )}
    </div>
  )
}