import React, { useEffect, useState } from "react";
import { Card, Typography, Button, CardBody } from "@material-tailwind/react";


import { HiOutlineArrowCircleLeft, HiOutlinePlusCircle } from "react-icons/hi";


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



const completedorders = () => {
    return (
      <div className='completedorders'>
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
  </div>
      
    );
  }
  
  export default completedorders;