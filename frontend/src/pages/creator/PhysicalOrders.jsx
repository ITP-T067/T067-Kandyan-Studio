import React, {useState } from 'react';
import axios from 'axios';
import { Input } from "@material-tailwind/react";

axios.defaults.baseURL = "http://localhost:8010/"

export default function PhysicalOrders() {

  const [formData, setFormData] = useState({
    Order_Type : "",
    Item_Name : "",
    Quantity : "",
    Additional: "",
    Artwork_Price: "",
    Cus_Name: "",
    Phone_Number: "",
    Status: "Not Paid",
    Project_Status: "Not Added",
  });

  const handleOnchange = (e) => {
    const {value,name} = e.target
    setFormData((prev)=> {
      
      return{
        ...prev,
        [name] : value
      }
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData); // Log form data before sending the request
    try {
      const data = await axios.post("/order/off/create", formData);
      console.log("Response:", data); // Log the response from the server
      if (data.data.success) {
        alert("Order created successfully");
        setFormData({
          Order_Type : "",
          Item_Name: "",
          Quantity : "",
          Additional: "",
          Artwork_Price: "",
          Cus_Name: "",
          Phone_Number: "",
          Quantity : "",
          Additional: "",
          Artwork_Price: "",
          Cus_Name: "",
          Phone_Number: "", 
          Status: "Not Paid",
          Project_Status: "Not Added",

        }); 
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  }    

  return (
    <>
        <nav className="w-4/5 flex flex-row justify-center items-center mx-auto text-kwhite mb-5">
            <a className="w-1/3 h-[55px] text-center rounded-tl-[30px] rounded-bl-[30px] bg-kblack font-bold flex flex-col justify-center" href="/creator/projectOrders/">
                <div>Order List</div>
            </a>
            <a className="w-1/3 h-[55px] text-center bg-kgray font-bold flex flex-col justify-center" href="/creator/physicalOrders">
                <div>Add physical orders</div>
            </a>
            <a className="w-1/3 h-[55px] text-center rounded-tr-[30px] rounded-br-[30px] bg-kblack font-bold flex flex-col justify-center" href="/creator/orderPayments">
                <div>Approve Order Payments</div>
            </a>
        </nav>


      <div className="w-3/4 max-h-[410px] bg-kgray bg-opacity-35 rounded-[20px] mt-2 shadow flex flex-col absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 mb-10 overflow-y-auto" style={{ overflow: '-webkit-scrollbar', scrollbarWidth: 'none' }}>
        <h className="text-kwhite text-3xl font-extrabold text-center mt-0 mb-0">Add Order</h>
        <form onSubmit={handleSubmit} className="flex flex-col px-5 py-5">
          
          <div className="flex flex-row justify-evenly mb-5">
            <div className="flex flex-col">
              <label htmlFor="Cus_Name" className="text-kwhite font-bold">Customer Name </label>
              <div className="border-2 border-kwhite rounded-lg">            
                <input type="text" id="Cus_Name" name="Cus_Name" onChange={handleOnchange} value={formData.Cus_Name} className="w-[480px] h-[49px] rounded-[10px] text-base p-3 text-kwhite"/>
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="Phone_Number" className="text-kwhite font-bold mr-4 mb-0">Phone Number </label>
              <div className="border-2 border-kwhite rounded-lg">
                <input type="text" id="Phone_Number" name="Phone_Number" onChange={handleOnchange} value={formData.Phone_Number}  className="w-[480px] h-[49px] rounded-[10px] text-base p-3 text-kwhite"/>
              </div>
            </div>
          </div>

          <div className="flex flex-row mb-5 justify-evenly">
            <div className="flex flex-col">
              <label htmlFor="Order_Type" className="text-kwhite font-bold mr-4">Order Type </label>
              <div className="border-2 border-kwhite rounded-lg">
                <input type="text" id="Order_Type" name="Order_Type" onChange={handleOnchange} value={formData.Order_Type} className="w-[480px] h-[49px] rounded-[10px] text-base p-3 text-kwhite"/>
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="Item_Name" className="text-kwhite font-bold mr-4">Item Name </label>
              <div className="border-2 border-kwhite rounded-lg">
                <input type="text" id="Item_Name" name="Item_Name" onChange={handleOnchange} value={formData.Item_Name} className="w-[480px] h-[49px] rounded-[10px] text-base p-3 text-kwhite"/>
              </div>
            </div>
          </div>

          <div className="flex flex-row mb-5 justify-evenly">

            <div className="flex flex-col">
              <label htmlFor="Artwork_Price" className="text-kwhite font-bold mr-4">Artwork Price </label>
              <div className="border-2 border-kwhite rounded-lg">
                <input type="text" id="Artwork_Price" name="Artwork_Price" onChange={handleOnchange} value={formData.Artwork_Price} className="w-[480px] h-[49px] rounded-[10px] text-base p-3 text-kwhite"/>
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="Quantity" className="text-kwhite font-bold mr-4">Number of edits </label>
              <div className="border-2 border-kwhite rounded-lg">
                <input type="text" id="Quantity" name="Quantity" onChange={handleOnchange} value={formData.Quantity} className="w-[480px] h-[49px] rounded-[10px] text-base p-3 text-kwhite"/>
              </div>
            </div>

          </div>


          <div className="flex flex-row justify-evenly mb-3">
            <div className="flex flex-col">
              <label htmlFor="Additional" className="text-kwhite font-bold mr-4">Additional </label>
              <div className="border-2 border-kwhite rounded-lg">
                <input type="text" id="Additional" name="Additional" onChange={handleOnchange} value={formData.Additional} className="w-[480px] h-[49px] rounded-[10px] text-base p-3 text-kwhite"/>
              </div>
            </div>
            
            <div className="flex flex-col">
              <label htmlFor="Additional" className="text-kwhite font-bold mr-4"></label>
              <input type="text" id="Additional" name="Additional" className="w-[480px] h-[49px] rounded-[10px] mb-5 text-base text-kwhite placeholder:text-kwhite opacity-50" disabled/>
            </div>

          </div>


          <div className="flex justify-center mb-0">
              <button className="submitBtn w-[152px] h-[44px] bg-kgreen rounded-[15px] text-kwhite font-bold hover:bg-kblue text-lg">Submit</button>
          </div>


        </form>
      </div>
    </>
  )
}
