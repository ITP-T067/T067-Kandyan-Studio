import Sample from '../../../images/photography.jpg'; 
import React, { useEffect, useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Card, Typography, Button, CardBody } from "@material-tailwind/react";
import axios from "axios";


import { HiOutlineArrowCircleLeft, HiOutlinePlusCircle } from "react-icons/hi";


  const GoBack = () => {
      window.location.href = "/cashier/ordermain";
  };

  const handleButton = (type) => {
    return () => {
        switch (type) {
            case "studio":
                window.location.href = "/cashier/addnewstudio";
                break;
            default:
                break;
        }
    };
};


const addNewOrder = () => {
    return (
      <div className='mainclass'>
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
                        
                        <div className='flex flex-row'>
                            <Button
                                className="flex items-center space-x-2 bg-kblack text-kwhite p-3 px-5 rounded-full"
                                onClick={handleButton("creator")}
                            >
                                
                                <span className="text-sm">Creator</span>
                            </Button>
                            <Button
                                className="flex items-center space-x-2 bg-kwhite text-kblack p-3 px-5 rounded-full"
                                onClick={handleButton("studio")}
                            >
                                
                                <span className="text-sm">Studio</span>
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            </div>  
      //subcards
      <div className="flex flex-row ">

        <div className="m-1 rounded-lg bg-kwhite bg-opacity-10 px-full px-5 py-5 w-3/4">

          <div className="maincards m-1 flex flex-wrap justify-center gap-5">


          <a href='/cashier/addneworder'><div class="m-1 rounded-lg bg-kblack text-kwhite px-20 py-5 shadow-xl  ring-1 ring-slate-900/5 h-full w-100 transition-transform duration-300 ease-in-out hover:scale-105">Sublimation
            </div></a>
            <div class="m-1 rounded-lg bg-kblack text-kwhite px-20 py-5 shadow-xl ring-8 ring-slate-900/5 h-full w-100 ">Photo Prints
            </div>
            <a href='/cashier/laminates'><div class="m-1 rounded-lg bg-kblack text-kwhite px-20 py-5 shadow-xl ring-1 ring-slate-900/5 h-full w-100 transition-transform duration-300 ease-in-out hover:scale-105">Laminates
            </div></a>
            <a href='/cashier/frames'><div class="m-1 rounded-lg bg-kblack text-kwhite px-20 py-5 shadow-xl ring-1 ring-slate-900/5 h-full w-100 transition-transform duration-300 ease-in-out hover:scale-105">Frames
            </div></a>
        
        
          </div>  
          <br/>
          <hr className='text-kwhite opacity-30'/><br/>        
          <div class="grid grid-cols-4 grid-rows-2">
          <div className="card w-64 h-80 relative cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105" >
            <div class="w-64 h-80 absolute bg-kgray opacity-50 rounded-3xl"></div>
            <img className="absolute rounded-3xl" src={Sample} style={{ width: '225px', height: '225px', left: '16px', top: '20px' }} alt="Photography" />
            <div className="Souvenir absolute text-white text-center text-2xl font-bold top-64 left-0 right-0">Sample name</div>
          </div>
          <div className="card w-64 h-80 relative cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105" >
            <div class="w-64 h-80 absolute bg-kgray opacity-50 rounded-3xl"></div>
            <img className="absolute rounded-3xl" src={Sample} style={{ width: '225px', height: '225px', left: '16px', top: '20px' }} alt="Photography" />
            <div className="Souvenir absolute text-white text-center text-2xl font-bold top-64 left-0 right-0">Sample name</div>
          </div>
          <div className="card w-64 h-80 relative cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105" >
            <div class="w-64 h-80 absolute bg-kgray opacity-50 rounded-3xl"></div>
            <img className="absolute rounded-3xl" src={Sample} style={{ width: '225px', height: '225px', left: '16px', top: '20px' }} alt="Photography" />
            <div className="Souvenir absolute text-white text-center text-2xl font-bold top-64 left-0 right-0">Sample name</div>
          </div>
          <div className="card w-64 h-80 relative cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105" >
            <div class="w-64 h-80 absolute bg-kgray opacity-50 rounded-3xl"></div>
            <img className="absolute rounded-3xl" src={Sample} style={{ width: '225px', height: '225px', left: '16px', top: '20px' }} alt="Photography" />
            <div className="Souvenir absolute text-white text-center text-2xl font-bold top-64 left-0 right-0">Sample name</div>
          </div>
          
          

        </div>
        </div>

        <div className="m-1 rounded-lg bg-kblack w-1/4 ">
        
        </div>

      </div>
      </div>
      
    );
  }
  
  export default addNewOrder;
  