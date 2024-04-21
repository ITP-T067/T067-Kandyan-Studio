import React, { useEffect, useState } from "react";
import axios from "axios";

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
            <div class="font-[sans-serif] ">
      <div class=" mx-auto w-full">
        <div class="grid lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2 max-lg:order-1 p-6 max-w-4xl mx-auto w-full">
            <div class="text-center max-lg:hidden">
              <h2 class="text-3xl font-extrabold  inline-block border-b-4 border-[#333] pb-1">Checkout</h2>
            </div>
            <form class="lg:mt-12">
              <div>
                <h2 class="text-2xl font-extrabold ">Customer info</h2>
                <div class="grid grid-cols-1 gap-6 mt-8 text-lg">
                  <input type="text" placeholder="Name"
                    class="px-2 py-3.5 bg-white  w-full text-sm border-b-2 focus:border-[#333] outline-none" />
                  <input type="email" placeholder="Telephone"
                    class="px-2 py-3.5 bg-white  w-full text-sm border-b-2 focus:border-[#333] outline-none" />
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
                <button type="button" class="min-w-[150px] px-6 py-3.5 text-sm bg-kred rounded-md hover:bg-gray-200" onClick={GoBack}>Back</button>
                <button type="button" class="min-w-[150px] px-6 py-3.5 text-sm bg-[#333] text-white rounded-md hover:bg-[#111]">Confirm payment $240</button>
              </div>
            </form>
          </div>
          <div class="bg-gray-100 lg:h-screen lg:sticky lg:top-0">
            <div class="relative h-full">
              <div class="p-8 lg:overflow-auto lg:h-[calc(100vh-60px)] max-lg:mb-8">
                <h2 class="text-2xl font-extrabold ">Order Summary</h2>
                
            <div className=" m-1  rounded-lg bg-kblack  text-kwhite ">
        
        <table className="m-5 text-lg justify-items-center">
            
            <thead>
              <tr>
                <th className="w-1/4">Name</th>
                <th className="w-1/4">Qty</th>
                <th className="w-1/4">Unit Price</th>
                
              </tr>
            </thead>
            <tbody className=" bg-kgray bg-opacity-30 rounded-lg text-xl"> 
              {
                dataList.map((el)=>{
                  return(
                  <tr >
                      <td className="m-1">{el.name}</td>
                      <td>{el.quantity}</td>
                      <td>{el.maxCapacity}</td>
                  </tr> 
                  )
                })
              }
            </tbody>
          </table>

    </div>
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
    