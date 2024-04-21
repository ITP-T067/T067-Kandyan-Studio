import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@material-tailwind/react";

axios.defaults.baseURL = "http://localhost:8010"
   

function Checkout() {

  const GoBack = () => {
    window.location.href = "/cashier/addneworder";
  };
  
  const [dataList,setDataList] = useState([])

  const getFetchData = async()=>{
    const data = await axios.get("/mainorder/")
      if(data.data.success){     
        setDataList(data.data.data)
      }
  }

  useEffect(()=>{
    getFetchData()
  },[])


    return (

      
        <div className="main bg-kblack bg-opacity-50 text-kwhite">
        
      <div class=" mx-auto w-full">
        <div class="grid lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2 max-lg:order-1 p-6 max-w-4xl mx-auto w-full">
            <div class="text-center max-lg:hidden">
              <h2 class="text-3xl font-extrabold  inline-block border-b-4 border-[#333] pb-1">Checkout</h2>
            </div>
            <form class="lg:mt-12">
              <div>
                <h2 class="text-3xl font-extrabold text-kwhite">Customer info</h2>
                <div class="grid grid-cols-4 gap-6 mt-8 text-lg">
                  <h1 className="text-xl m-2">Customer Name :</h1>
                  <input type="text" placeholder="Name"
                    class="ring-1 col-span-3 py-3 rounded-md "  />
                    <h1 className="text-xl m-2">Telephone :</h1>
                  <input type="number" placeholder="Telephone"
                    class="ring-1 col-span-3 py-3 rounded-md "  />
                </div>
              </div>
              <div class="mt-12">
                <h2 class="text-2xl font-extrabold ">Payment method</h2>
                <div class="grid gap-4 sm:grid-cols-3 mt-8">
                   <div class="flex items-center">
                    <input type="radio" class="w-5 h-5 cursor-pointer" id="card" checked />
                    <label for="card" class="ml-4 flex gap-2 cursor-pointer text-lg">
                      Cash
                    </label>
                  </div>

                  <div class="flex items-center">
                    <input type="radio" class="w-5 h-5 cursor-pointer" id="card" checked />
                    <label for="card" class="ml-4 flex gap-2 cursor-pointer">
                      <img src="https://readymadeui.com/images/visa.webp" class="w-12" alt="card1" />
                      <img src="https://readymadeui.com/images/american-express.webp" class="w-12" alt="card2" />
                      <img src="https://readymadeui.com/images/master.webp" class="w-12" alt="card3" />
                    </label>
                  </div>
                  <div class="flex items-center">
                    <input type="radio" class="w-5 h-5 cursor-pointer" id="paypal" />
                    <label for="paypal" class="ml-4 flex gap-2 cursor-pointer text-lg">
                      Bank Transfer
                    </label>
                  </div>
                </div>
                <div class="grid gap-6 mt-8">
                   <div class="flex bg-white border-b-2 focus-within:border-[#333] overflow-hidden">
                </div>
              
                </div>
              </div>
              <div class="flex flex-wrap gap-4 mt-8">
                <button type="button" class="min-w-[150px] px-6 py-3.5 text-lg bg-kred rounded-md hover:bg-gray-200" onClick={GoBack}>Back</button>
              
              </div>
            </form>
          </div>
          <div class="bg-gray-100 lg:h-screen lg:sticky lg:top-0  ring-kwhite ring-opacity-45">
            <div class="relative h-full">
              <div class="p-8 lg:overflow-auto lg:h-[calc(100vh-60px)] max-lg:mb-8">
                <h2 class="text-2xl font-extrabold  text-center">Order Summary</h2>
                
     <div className=" m-1  rounded-lg bg-kblack  text-kwhite ">
        
        <table className="m-5 text-lg justify-items-center">
            
            <thead>
              <tr className="bg-kwhite text-kblack">
                <th className="w-1/4">Name</th>
                <th className="w-1/4">Qty</th>
                <th className="w-1/4">Unit Price</th>
                <th className="w-1/4">Total</th>
              </tr>
            </thead>
            <tbody className=" bg-kgray bg-opacity-30 rounded-lg text-xl text-center"> 
              {
                dataList.map((el)=>{

                  return(
                  <tr>
                      <td>{el.name}</td>
                      <td>{el.quantity}</td>
                      <td>{el.maxCapacity}</td>
                      <td>{el.total}</td>
                      
                  </tr> 
                  )
                })
              }
            </tbody>
          </table>

                </div>
                    <div className="grid grid-cols-3 grid-rows-5 gap-4">
                    <h1 className="text-2xl">Gross Total :</h1>
                    <input className="ring-1 col-span-2 ring-kwhite ring-opacity-10 px-6 py-2 rounded-xl" type="number"></input>
                    <h1 className="text-2xl">Tendered :</h1>
                    <input className="ring-1 col-span-2 ring-kwhite ring-opacity-10 px-6 py-2 rounded-xl" type="number"></input>
                    <h1 className="text-2xl">Change  :</h1>
                    <input className="ring-1 col-span-2 ring-kwhite ring-opacity-10 px-6 py-2 rounded-xl" type="number"></input>
                     <h1 className="text-2xl">Discount  :</h1>
                    <input className="ring-1 col-span-2 ring-kwhite ring-opacity-10 px-6 py-2 rounded-xl" type="number"></input>
                    <h1 className="text-2xl">Net total  :</h1>
                    <input className="ring-1 col-span-2 ring-kwhite ring-opacity-10 px-6 py-2 rounded-xl" type="number"></input>
                    <Button className="bg-kred text-kwhite text-2xl text-center col-span-3 hover:scale-105 transition-transform hover:bg-kwhite hover:text-kred">{"Advance payment"}</Button>
                    <Button className="bg-kgreen text-kwhite text-2xl text-center col-span-3 hover:scale-105 transition-transform hover:bg-kwhite hover:text-kgreen">{"Full Payment"}</Button>
                    </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

        

        );
    }
    
    export default Checkout;
    