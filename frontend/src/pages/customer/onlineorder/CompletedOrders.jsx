import React, { useState } from 'react'
import { Card, Typography, CardBody } from "@material-tailwind/react";
import {useNavigate} from 'react-router-dom';

const TABLE_HEAD = [
  "Completed Date",
  "Item name",  
  "Total Price",
  "Completed"
];

const TABLE_ROWS = [
    {
        date: "2024/01/05",
        type: "Designing",
        total_price: "LKR 2,950.00"
    },
    {
        date: "2024/04/05",
        type: "Designing",
        total_price: "LKR 4,000.00"
    },
    {
      date: "2024/01/05",
      type: "Designing",
      total_price: "LKR 1,700.00"
    },
    
];

export default function CompletedOrders() {

  const navigate = useNavigate();
  const [showDetailAlert, setDetailAlert] = useState(false);

  const handleDetailClick = () => {
    setDetailAlert(true);
    navigate('/completeorder');
  };

  return (
    <div>
      <div className="mx-5 mb-5">
                <Card className={`${showDetailAlert ? 'blur' : ''}`}>
                    <CardBody className="flex items-center justify-between">
                      <div>
                        <div class="flex items-center" onClick={() => navigate('/myorder')}>
                          <svg class="h-9 w-9 mb-1 text-kwhite mr-2 cursor-pointer" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 8 8 12 12 16" />
                            <line x1="16" y1="12" x2="8" y2="12" />
                          </svg>
                          <h2 class="text-3xl font-bold text-kwhite cursor-pointer">Completed Orders</h2>
                        </div>
                      </div>

                    </CardBody>
                </Card>
            </div>
            <div className={`p-3 ${showDetailAlert ? 'blur' : ''}`}>
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
                        {TABLE_ROWS.map(({ date, type, total_price }, index) => {
                            const isLast = index === TABLE_ROWS.length;

                            return (
                                <tr
                                    key={index}
                                    className={`${isLast ? "" : "border-b"} bg-kgray text-kwhite text-center p-4 bg-opacity-20`}
                                >
                                    <td>
                                        <Typography variant="lead" color="blue-gray" className="font-normal">
                                            {date}
                                        </Typography>
                                    </td>
                                    <td>
                                        <Typography variant="lead" color="blue-gray" className="font-normal">
                                            {type}
                                        </Typography>
                                    </td>
                                    <td>
                                        <Typography variant="lead" color="blue-gray" className="font-normal">
                                            {total_price}
                                        </Typography>
                                    </td>
                                    <td className="p-2">
                                        <div className="mx-auto text-kwhite">
                                        
                                        <button type="button" class="bg-kyellow focus:ring-4 focus:outline-none font-medium rounded-3xl text-sm px-5 py-2.5 text-center me-2 mb-2 w-[6rem]" onClick={handleDetailClick} disabled={showDetailAlert}>Details</button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {showDetailAlert && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-100 bg-kgray rounded-2xl flex justify-center items-center">
                    <div className="bg-white p-8 rounded-3xl">
                        <form class="w-full max-w-">
                            <div class="md:flex md:items-center mb-6">
                                <div class="md:w-1/3">
                                    <label class="block text-kwhite md:text-right mb-1 md:mb-0 pr-4">
                                        Type : 
                                    </label>
                                </div>
                                <div class="md:w-">
                                    <label class="block text-kwhite font-bold mb-1 md:mb-0 pr-4 ">
                                        Designing
                                    </label>
                                </div>
            
                            </div>
                            <div class="md:flex md:items-center mb-6">
                                <div class="md:w-1/3">
                                    <label class="block text-kwhite md:text-right mb-1 md:mb-0 pr-4">
                                        Total Price :  
                                    </label>
                                </div>
                                <div class="md:w-">
                                    <label class="block text-kwhite font-bold mb-1 md:mb-0 pr-4 ">
                                        3000.00
                                    </label>
                                </div>
            
                            </div>
                            <div class="md:flex md:items-center mb-6">
                                <div class="md:w-1/3">
                                    <label class="block text-kwhite md:text-right mb-1 md:mb-0 pr-4">
                                        Description : 
                                    </label>
                                </div>
                                <div class="md:w-">
                                    <label class="block text-kwhite font-bold mb-1 md:mb-0 pr-4 ">
                                        I need a fairy themed design, make it look heavenly
                                    </label>
                                </div>
                            </div>
                            <button className="block mx-auto bg-kgreen hover:bg-green-600 text-kwhite font-bold py-2 px-4 mt-4 rounded">Ok</button>
                        </form>
                    </div>
                </div>
            )}
    </div>
  )
}
