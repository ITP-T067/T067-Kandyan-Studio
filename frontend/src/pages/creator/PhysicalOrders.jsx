import React, {useState } from 'react';
import axios from 'axios';
import '../../Styles/creator/orderNav.css';

axios.defaults.baseURL = "http://localhost:8010/"

export default function PhysicalOrders() {

  const [formData, setFormData] = useState({
    Order_Type : "",
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
      <nav className="order-navbar">
        <a className="order-el left_order " href="/creator/projectOrders/"><div className="">Order List</div></a>
        <a className="order-el middle_order" href="/creator/physicalOrders" style={{ backgroundColor: '#525252' }}><div>Add physical orders</div></a>
        <a className="order-el right_order" href="/creator/orderPayments"><div>Approve Order Payments</div></a>
      </nav>

      <div className="w-11/12 max-h-[380px] bg-kgray bg-opacity-50 rounded-[20px] shadow flex flex-col absolute top-2/3 left-1/2 mt-5 transform -translate-x-1/2 -translate-y-1/2 p-5 mb-10">
        <h className="text-kwhite text-3xl font-extrabold text-center mt-0 mb-0">Add Order</h>
        <form onSubmit={handleSubmit} className="flex flex-col px-5 py-5">

          <div className="flex flex-row justify-start mb-5">
            <label htmlFor="Cus_Name" className="text-kwhite mb-2 font-bold text-lg mr-4">Customer Name:</label>
            <input type="text" id="Cus_Name" name="Cus_Name" onChange={handleOnchange} value={formData.Cus_Name} className=" w-[480px] h-[49px] rounded-[10px] p-3 text-base bg-kgray"/>

            <label htmlFor="Phone_Number" className="text-kwhite mb-2 font-bold text-lg ml-auto mr-4">Phone Number: </label>
            <input type="text" id="Phone_Number" name="Phone_Number" onChange={handleOnchange} value={formData.Phone_Number} className="w-[480px] h-[49px] rounded-[10px] p-3 text-base bg-kgray"/>
          </div>

          <div className="flex flex-row mb-5 justify-start">
            <label htmlFor="Order_Type" className="text-kwhite mb-2 font-bold text-lg mr-4">Order Type: </label>
            <input type="text" id="Order_Type" name="Order_Type" onChange={handleOnchange} value={formData.Order_Type} className="w-[480px] h-[49px] rounded-[10px] p-3 text-base bg-kgray"/>

            <label htmlFor="Quantity" className="text-kwhite mb-2 font-bold text-lg ml-auto mr-4">Quantity: </label>
            <input type="text" id="Quantity" name="Quantity" onChange={handleOnchange} value={formData.Quantity} className="w-[480px] h-[49px] rounded-[10px] p-3 text-base bg-kgray"/>
          </div>

          <div className="flex flex-row mb-5 justify-start">
            <label htmlFor="Additional" className="text-kwhite mb-2 font-bold text-lg mr-4">Additional: </label>
            <input type="text" id="Additional" name="Additional" onChange={handleOnchange} value={formData.Additional} className="w-[480px] h-[49px] rounded-[10px] mb-5 p-3 text-base bg-kgray"/>

            <label htmlFor="Artwork_Price" className="text-kwhite mb-2 font-bold text-lg ml-auto mr-4">Artwork Price: </label>
            <input type="text" id="Artwork_Price" name="Artwork_Price" onChange={handleOnchange} value={formData.Artwork_Price} className="w-[480px] h-[49px] rounded-[10px] mb-5 p-3 text-base bg-kgray"/>
          </div>


          <div className="flex justify-center mb-4">
              <button className="submitBtn w-[152px] h-[44px] bg-kgreen rounded-[15px] text-kwhite font-bold hover:bg-kblue text-lg">Submit</button>
          </div>


        </form>
      </div>
    </>
  )
}
