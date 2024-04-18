import React, { useEffect, useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Card, Typography, Button, CardBody } from "@material-tailwind/react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
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


function AddNewOrder(){


  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getItems();
  },[]);

  const getItems = () =>{
    axios.get('http://localhost:8010/item')
      .then(response => {
        setItems(response.data.data);
      })
      .catch(error =>{
        console.error('Error fetching items:',error);
      })
  }


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
                                className="flex items-center space-x-2 bg-kblack text-kwhite p-3 px-5 rounded-full">
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

      {/* sub navbar*/}
      <div className="flex flex-row ">

        <div className="m-1 rounded-lg bg-kwhite bg-opacity-10 px-full px-5 py-5 w-3/4">

          <div className="maincards m-1 flex flex-wrap justify-center gap-5">


           <div class="m-1 rounded-lg bg-kblack text-kwhite px-20 py-5 shadow-xl  ring-8 ring-slate-900/5 h-full w-100 ">Sublimation
            </div>
            <a href='/cashier/photoprints'><div class="m-1 rounded-lg bg-kblack text-kwhite px-20 py-5 shadow-xl ring-1 ring-slate-900/5 h-full w-100 transition-transform duration-300 ease-in-out hover:scale-105">Photo Prints
            </div></a>
            <a href='/cashier/laminates'><div class="m-1 rounded-lg bg-kblack text-kwhite px-20 py-5 shadow-xl ring-1 ring-slate-900/5 h-full w-100 transition-transform duration-300 ease-in-out hover:scale-105">Laminates
            </div></a>
            <a href='/cashier/frames'><div class="m-1 rounded-lg bg-kblack text-kwhite px-20 py-5 shadow-xl ring-1 ring-slate-900/5 h-full w-100 transition-transform duration-300 ease-in-out hover:scale-105">Frames
            </div></a>
        
        
          </div>  
          <br/>
          <hr className='text-kwhite opacity-30'/><br/>        
          
         
        <div class="flex flex-wrap justify-center gap-5 mt-5">
        {items.map(item => (
          <div key={item._id} className="card w-64 h-96 relative cursor-pointer" >
            <div class="w-64 h-auto  bg-kwhite opacity-100 rounded-xl "><center>
            <img className="rounded-xl" src={item.image} style={{ width: '225px', height: '225px', left: '16px', top: '20px' }} />
            <div className="text-white text-center text-2xl font-bold top-64 left-0 right-0">{item.name}</div>
          
          {/*quantity */}
              <div class="m-3 py-2 px-3 inline-block bg-white border border-gray-200 rounded-lg" data-hs-input-number="">
                <div class="flex items-center gap-x-1.5">
                  <Button type="button" class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none" data-hs-input-number-decrement="">
                    <svg class="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M5 12h14"></path>
                    </svg>
                  </Button>
                  <input class="p-0 w-6 bg-transparent border-0 text-gray-800 text-center focus:ring-0" type="text" value="0" data-hs-input-number-input=""></input>
                  <Button type="button" class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"  data-hs-input-number-increment="">
                    <svg class="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M5 12h14"></path>
                      <path d="M12 5v14"></path>
                    </svg>
                  </Button>
                </div>
              </div>
              
              {/*add to card button */}
              <Button className="bg-kgreen text-kwhite opacity-100 text-lg px-20 py-3 hover:bg-kblack rounded-xl m-1 transition-transform duration-300 ease-in-out hover:scale-105" onClick={() => navigate(`/cashier/photoprints`)}>{"Add"}</Button>
              

              </center>
            </div>
          </div>
         ))} 
         </div>

        </div>

         {/* payment  */}
        <div className="m-1  rounded-lg bg-kblack w-1/4 ">
        
        </div>

      </div>
      </div>
      
    );
  }
  
  export default AddNewOrder;
  