import React, { useState } from 'react'
import { Card, Typography, CardBody } from "@material-tailwind/react";
import {useNavigate} from 'react-router-dom';

const TABLE_HEAD = [
  "Type", 
  "Description", 
  "Total Price",
  "Qty",
  "Actions"
];

const TABLE_ROWS = [
    {
        type: "Item 1",
        description: "Description 1",
        Total_price: 'LKR 2,950.00',
        Qty: "2"
    },
    {
        type: "Item 2",
        description: "Description hghhhkui",
        Total_price: 'LKR 3,000.00',
        Qty: "1"
    },
];

export default function PendingOrders() {

  const navigate = useNavigate();
  const [showEditAlert, setShowEditAlert] = useState(false);
  const [showPayAlert, setShowPayAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
 

  const handleEditClick = () => {
    setShowEditAlert(true);
    navigate('/pendingorder');
  };

  const handlePayClick = () => {
    setShowPayAlert(true);
    navigate('/pendingorder');
  };

  const handleDeleteClick = () => {
    setShowDeleteAlert(true);
    navigate('/pendingorder');
  };


  return (
    <div>
      <div className={`mx-5 mb-5 ${showEditAlert ? 'blur' : ''} ${showPayAlert ? 'blur' : ''} ${showDeleteAlert ? 'blur' : ''} `}>
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
            <div className={`p-3 ${showEditAlert ? 'blur' : ''} ${showPayAlert ? 'blur' : ''} ${showDeleteAlert ? 'blur' : ''}`}>
                <table className="w-full rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-kblack bg-opacity-40">
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
                        {TABLE_ROWS.map(({ type, description, Total_price, Qty}, index) => {
                            const isLast = index === TABLE_ROWS.length;

                            return (
                                <tr
                                    key={index}
                                    className={`${isLast ? "" : "border-b"} bg-kgray text-kwhite text-center p-4 bg-opacity-20`}
                                >
                                    <td>
                                        <Typography variant="lead" color="blue-gray" className="font-normal">
                                            {type}
                                        </Typography>
                                    </td>
                                    <td>
                                        <Typography variant="lead" color="blue-gray" className="font-normal">
                                            {description}
                                        </Typography>
                                    </td>
                                    <td>
                                        <Typography variant="lead" color="blue-gray" className="font-normal">
                                            {Total_price}
                                        </Typography>
                                    </td>
                                    <td>
                                        <Typography variant="lead" color="blue-gray" className="font-normal">
                                            {Qty}
                                        </Typography>
                                    </td>
                                    <td className="p-2">
                                        <div className="mx-auto text-kwhite">
                                        <button type="button" class="bg-kgreen focus:ring-4 focus:outline-none font-medium rounded-3xl text-sm px-5 py-2.5 text-center me-2 mb-2 w-[6rem]" onClick={handleEditClick} >Edit</button>
                                        <button type="button" class="bg-kyellow focus:ring-4 focus:outline-none font-medium rounded-3xl text-sm px-5 py-2.5 text-center me-2 mb-2 w-[6rem]" onClick={handlePayClick}>Pay</button>
                                        <button type="button" class="bg-kred focus:ring-4 focus:outline-none font-medium rounded-3xl text-sm px-5 py-2.5 text-center me-2 mb-2 w-[6rem]" onClick={handleDeleteClick}>Delete</button>
                                           
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* show edit alert */}
            {showEditAlert && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-100 bg-kgray rounded-2xl flex justify-center items-center">
                <div className="bg-white p-8 rounded-3xl">
                <form class="w-full max-w-sm">
                    <div class="md:flex md:items-center mb-6">
                        <div class="md:w-1/3">
                        <label class="block text-kwhite font-bold md:text-right mb-1 md:mb-0 pr-4" >
                            Order quantity
                        </label>
                        </div>
                        <div class="md:w-2/3">
                        <input class="block bg-kwhite rounded-xl w-full py-2 px-4 text-kblack font-bold focus:outline-none" type="number" max={4} min={1} required />
                        </div>
                    </div>
                    <div class="md:flex md:items-center mb-6">
                        <div class="md:w-1/3">
                        <label class="block text-kwhite font-bold md:text-right mb-1 md:mb-0 pr-4">
                            Additional
                        </label>
                        </div>
                        <div class="md:w-2/3">
                        <input class="block bg-kwhite rounded-xl w-full py-2 px-4 text-kblack font-bold focus:outline-none" type="text"/>
                        </div>
                    </div>
                    <button className="block mx-auto bg-kgreen hover:bg-green-600 text-kwhite font-bold py-2 px-4 mt-4 rounded" >Update</button>
                    </form>
                </div>
                </div>
            )}

            {/* pay alert */}
            {showPayAlert && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-100 bg-kgray rounded-2xl flex justify-center items-center">
                    <div className="bg-white p-8 rounded-3xl">
                        <form class="w-full max-w-">
                            <div class="md:flex md:items-center mb-6">
                                <div class="md:w-1/3">
                                <label class="block text-kwhite  md:text-right mb-1 md:mb-0 pr-4" >
                                    Total Amount
                                </label>
                                </div>
                                <div class="md:w-2/3">
                                <input class="block bg-kwhite rounded-xl w-full py-2 px-4 text-kblack font-bold focus:outline-none" type="number" min={1} required/>
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
                                <input class="block bg-kwhite rounded-xl w-full py-2 px-4 text-kblack font-bold focus:outline-none" type="file" required/>
                                </div>
                            </div>
                            <button className="block mx-auto bg-kgreen hover:bg-green-600 text-kwhite font-bold py-2 px-4 mt-4 rounded">Pay</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete alert */}
            {showDeleteAlert && (
               <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-100 bg-kgray rounded-2xl flex justify-center items-center">
               <div className="bg-white p-8 rounded-3xl text-center">
                 <p className="text-3xl font-bold text-kwhite">Do you want to delete?</p>
                 <div className="mt-4">
                   <button className="inline-block bg-kgreen hover:bg-green-600 text-kwhite font-bold py-2 px-4 mr-8 rounded">Yes</button>
                   <button className="inline-block bg-kred hover:bg-red-600 text-kwhite font-bold py-2 px-4 rounded">No</button>
                 </div>
               </div>
             </div>
             
            )}
    </div>
  )
}