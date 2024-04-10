import React from 'react'
import { Card, Typography, Button, CardBody } from "@material-tailwind/react";
import {useNavigate} from 'react-router-dom';

const TABLE_HEAD = [
  "Date",
  "Type",  
  "Price"

];

const TABLE_ROWS = [
    {
        date: "2024/01/05",
        type: "Designing",
        price: "LKR 2,950.00"
    },
    {
        date: "2024/04/05",
        type: "Designing",
        price: "LKR 4,000.00"
    },
    {
      date: "2024/01/05",
      type: "Designing",
      price: "LKR 1,700.00"
    },
    
];

export default function Generatereports() {

  const navigate = useNavigate();

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
                          <h2 class="text-3xl font-bold text-kwhite cursor-pointer">Generate Order History Report</h2>
                        </div>
                      </div>

                    </CardBody>
                </Card>
            </div>
          
            <div className="p-3">
                <table className="w-full rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-kblack">
                            {TABLE_HEAD.map((head, index) => (
                                <th
                                    key={head}
                                    className={`border-kwhite text-kwhite p-4 font-bold ${
                                        index = TABLE_HEAD.length ? "" : "border-b"
                                    } text-center`}
                                >
                                    <Typography variant="lead">{head}</Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {TABLE_ROWS.map(({ date, type, price }, index) => {
                            const isLast = index === TABLE_ROWS.length;

                            return (
                                <tr
                                    key={index}
                                    className={`${isLast ? "" : "border-b"} bg-kgray text-kwhite text-center p-4 bg-opacity-40`}
                                >
                                    <td>
                                        <Typography variant="lead" color="blue-gray" className="font-normal mb-4 mt-4">
                                            {date}
                                        </Typography>
                                    </td>
                                    <td>
                                        <Typography variant="lead" color="blue-gray" className="font-normal mb-4 mt-4">
                                            {type}
                                        </Typography>
                                    </td>
                                    <td>
                                        <Typography variant="lead" color="blue-gray" className="font-normal mb-4 mt-4">
                                            {price}
                                        </Typography>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
    </div>
  )
}