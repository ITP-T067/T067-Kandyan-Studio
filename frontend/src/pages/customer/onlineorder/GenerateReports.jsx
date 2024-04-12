import React, { useRef, useState } from 'react'
import { Card, Typography, CardBody } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useReactToPrint } from 'react-to-print';

const TABLE_HEAD = [
  "Date",
  "Type",
  "Price"
];

const TABLE_ROWS = [
  {
    date: "2024/01/05",
    type: "Drowing",
    price: "LKR 2,950.00"
  },
  {
    date: "2024/04/05",
    type: "Designing",
    price: "LKR 4,000.00"
  },
  {
    date: "2024/01/05",
    type: "Shooting",
    price: "LKR 1,700.00"
  },
  {
    date: "2024/01/05",
    type: "Shooting",
    price: "LKR 1,700.00"
  },
  
];

export default function Generatereports() {

  const navigate = useNavigate();

  // pdf generate
  const componentPDF = useRef([]);

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "History Report",
    onAfterPrint: () => alert("Data saved in PDF")
  });

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
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
          <button type="button" className="bg-kgreen text-kwhite text-sm focus:ring-4 focus:outline-none rounded-3xl px-5 py-2.5 text-center w-[8rem] ml-8">GENERATE</button>
        </div>
      </div>

      <form className="absolute max-w-md mx-auto left-0 right-0">
        <div>
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-kwhite dark:text-kblack" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input type="search" id="default-search" className="w-full p-3 ps-10 text-lg rounded-full bg-gray-50 dark:bg-kwhite dark:text-kblack" placeholder="Search" required />
        </div>
      </form>

      <div className="h-10 max-w-md mx-auto">
        <button type="button" className="bg-kyellow font-bold text-kwhite text-sm focus:ring-4 focus:outline-none rounded-md py-3 text-center w-[6rem] right-10 absolute hover:bg-kblue" onClick={generatePDF}>GENERATE</button>
      </div>


      <div className="p-3">
        <div ref={componentPDF}>
          <table className="w-full rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-kblack bg-opacity-40">
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
                    className={`${isLast ? "" : "border-b"} bg-kgray text-kwhite text-center p-4 bg-opacity-20`}
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
    </div>
  )
}
