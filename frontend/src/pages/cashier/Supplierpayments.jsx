import React, { useEffect, useState } from "react";
import { Card, Typography, Button, CardBody } from "@material-tailwind/react";


import { HiOutlineArrowCircleLeft, HiOutlinePlusCircle } from "react-icons/hi";




import {
    IconButton,
  } from "@material-tailwind/react";
  
  import { PencilIcon } from "@heroicons/react/24/solid";

  import {
    CardHeader,
    Chip,
    CardFooter,
    Avatar,
    Tooltip,
  } from "@material-tailwind/react";
  
  const GoBack = () => {
    window.location.href = "/cashier/ordermain";
};

const handleButton = (type) => {
  return () => {
      switch (type) {
          case "Add":
              window.location.href = "/cashier/ordermain";
              break;
          case "Edit":
              window.location.href = "/manager/stockdept/items/edititem";
              break;
          default:
              break;
      }
  };
};

  
  
  const TABLE_HEAD = ["Transaction", "Amount", "Date", "Status", "Account", ""];
   
  const TABLE_ROWS = [
    {
      img: "https://docs.material-tailwind.com/img/logos/logo-spotify.svg",
      name: "Spotify",
      amount: "$2,500",
      date: "Wed 3:00pm",
      status: "paid",
      account: "visa",
      accountNumber: "1234",
      expiry: "06/2026",
    },
    {
      img: "https://docs.material-tailwind.com/img/logos/logo-amazon.svg",
      name: "Amazon",
      amount: "$5,000",
      date: "Wed 1:00pm",
      status: "paid",
      account: "master-card",
      accountNumber: "1234",
      expiry: "06/2026",
    },
    {
      img: "https://docs.material-tailwind.com/img/logos/logo-pinterest.svg",
      name: "Pinterest",
      amount: "$3,400",
      date: "Mon 7:40pm",
      status: "pending",
      account: "master-card",
      accountNumber: "1234",
      expiry: "06/2026",
    },
    {
      img: "https://docs.material-tailwind.com/img/logos/logo-google.svg",
      name: "Google",
      amount: "$1,000",
      date: "Wed 5:00pm",
      status: "paid",
      account: "visa",
      accountNumber: "1234",
      expiry: "06/2026",
    },
    {
      img: "https://docs.material-tailwind.com/img/logos/logo-netflix.svg",
      name: "netflix",
      amount: "$14,000",
      date: "Wed 3:30am",
      status: "cancelled",
      account: "visa",
      accountNumber: "1234",
      expiry: "06/2026",
    },
  ];
  
  
  
  const Supplierpayments = () => {
      return (
        <div className='order text-kwhite'>

          <div className="mx-5 mb-5">
                          <Card>
                              <CardBody className="flex items-center justify-between">
                                  <div>
                                      <Button
                                          onClick={GoBack}
                                          className="flex items-center space-x-2 bg-transparent text-kwhite px-3 py-2 rounded-md"
                                      >
                                          <HiOutlineArrowCircleLeft className="w-5 h-5" />
                                          <span className="text-sm">Order</span>
                                      </Button>
                                  </div>
                                  
                                  <label class="relative block px-20">
                                    <span class="sr-only">Search</span>
                                    <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                                      <svg class="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"></svg>
                                    </span>
                                    <input class="placeholder:italic placeholder:text-slate-400 block text-kblack bg-kwhite w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Search for anything..." type="text" name="search"/>
                                  </label>
                                  
                                  <div>
                                      <Button
                                          className="flex items-center space-x-2 bg-kblue text-kwhite p-3 px-5 rounded-full"
                                          onClick={handleButton("Add")}
                                      >
                                          <HiOutlinePlusCircle className="w-5 h-5" />
                                          <span className="text-sm">Add Item</span>
                                      </Button>
                                  </div>
                              </CardBody>
                          </Card>
            </div> 
          
        
  
  
        <br/>
  
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex flex-col justify-center gap-8 md:flex-row md:items-center">
            <div className="justify-center">
              <Typography variant="h2" color="blue-gray" >
               Supplier Payments
              </Typography>
              
            </div>
            <div className="flex w-full shrink-0 gap-2 md:w-max">
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 "
                  >
                    <Typography
                      variant="large"
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
              {TABLE_ROWS.map(
                (
                  {
                    img,
                    name,
                    amount,
                    date,
                    status,
                    account,
                    accountNumber,
                    expiry,
                  },
                  index,
                ) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";
   
                  return (
                    <tr key={name}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={img}
                            alt={name}
                            size="md"
                            className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                          />
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {name}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {amount}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {date}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            size="sm"
                            variant="ghost"
                            value={status}
                            color={
                              status === "paid"
                                ? "green"
                                : status === "pending"
                                ? "amber"
                                : "red"
                            }
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-12 rounded-md border border-blue-gray-50 p-1">
                            <Avatar
                              src={
                                account === "visa"
                                  ? "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/visa.png"
                                  : "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/mastercard.png"
                              }
                              size="sm"
                              alt={account}
                              variant="square"
                              className="h-full w-full object-contain p-1"
                            />
                          </div>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal capitalize"
                            >
                              {account.split("-").join(" ")} {accountNumber}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {expiry}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <Tooltip content="Edit User">
                          <IconButton variant="text">
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
        </CardBody>

        <div className="flex items-center justify-between border-t border-kblack p-4">
                <Button variant="text" size="sm" className="text-kblack bg-kwhite">Previous</Button>
                <div className="flex items-center gap-2">
                    <Button variant="text" size="sm" className="text-kblack bg-kwhite">1</Button>
                    <Button variant="text" size="sm" className="text-kblack bg-kwhite">2</Button>
                    <Button variant="text" size="sm" className="text-kblack bg-kwhite">3</Button>
                    <Button variant="text" size="sm" className="text-kblack bg-kwhite">...</Button>
                    <Button variant="text" size="sm" className="text-kblack bg-kwhite">8</Button>
                    <Button variant="text" size="sm" className="text-kblack bg-kwhite">9</Button>
                    <Button variant="text" size="sm" className="text-kblack bg-kwhite">10</Button>
                </div>
                <Button variant="text" size="sm" className="text-kblack bg-kwhite">Next</Button>
            </div>
        
      </Card>
  
  
  
  
    </div>
        
      );
    }
    
    export default Supplierpayments;
    