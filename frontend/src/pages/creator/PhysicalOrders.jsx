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
  
  //the order types
  const orderTypes = {
    Sublimation: ["Mug", "Magic Mug", "Medals", "Rock", "Tile", "Souvenir"],
   "Photo Prints": ["4R", "10R", "2R", "10RW", "6R", "6RW"],
    Laminates: ["4R", "10R", "10RW", "6R", "6RW"],
    Frames: ["Black", "Brown", "White"],
  };

  //onChange function
  const handleOnchange = (e) => {
    const {value,name} = e.target
    setFormData((prev)=> {
      
      return{
        ...prev,
        [name] : value
      }
    })
  }

  //validate customer name
  const validateCustomerName = (name) => {
    const re = /^[a-zA-Z\s]+$/; // Regular expression to match alphabets and spaces
    return re.test(name);
  };

  //validate phone number
  const validatePhoneNumber = (phone) => {
    const re = /^[0-9]{10}$/; 
    return re.test(String(phone).toLowerCase());
  };
  
  //submit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    const artworkPriceRegex = /^\d+(\.\d{1,2})?$/;
    
    if (!artworkPriceRegex.test(formData.Artwork_Price)) {
      alert("Please enter a valid Artwork Price (numeric value with up to 2 decimal places).");
      return;
    }

    // Validate customer name
    if (!validateCustomerName(formData.Cus_Name)) {
      alert("Please enter a valid customer name (only alphabets and spaces allowed).");
      return;
    }

    // Validation for Quantity (Number of Edits)
    if (isNaN(formData.Quantity) || formData.Quantity < 1) {
      alert("Please enter a valid Number of Edits (minimum value should be 1).");
      return;
    }

    if (!validatePhoneNumber(formData.Phone_Number)) {
      alert("Please enter a valid phone number.");
      return;
    }
  
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
      console.error("Error creating order:"+ error);
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
              <label htmlFor="Cus_Name" className="text-kwhite font-bold" >Customer Name </label>
              <div className="border-2 border-kwhite rounded-lg">            
                <input type="text" id="Cus_Name" name="Cus_Name" onChange={handleOnchange} value={formData.Cus_Name} className="w-[480px] h-[49px] rounded-[10px] text-base p-3 text-kwhite" style={{ background: 'transparent' }} required/>
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="Phone_Number" className="text-kwhite font-bold mr-4 mb-0" >Phone Number </label>
              <div className="border-2 border-kwhite rounded-lg">
                <input type="text" id="Phone_Number" name="Phone_Number" onChange={handleOnchange} value={formData.Phone_Number}  className="w-[480px] h-[49px] rounded-[10px] text-base p-3 text-kwhite" style={{ background: 'transparent' }} required/>
              </div>
            </div>
          </div>

          <div className="flex flex-row mb-5 justify-evenly">
            <div className="flex flex-col">
              <label htmlFor="Order_Type" className="text-kwhite font-bold mr-4">
                Order Type
              </label>
              <div className="border-2 border-kwhite rounded-lg">
                <select
                  id="Order_Type"
                  name="Order_Type"
                  onChange={handleOnchange}
                  value={formData.Order_Type}
                  className="w-[480px] h-[49px] rounded-[10px] text-base p-3 bg-kgray text-kwhite"
                >
                  <option value="Sublimation" className=' bg-kgray bg-opacity-35'>Sublimation</option>
                  <option value="Photo Prints">Photo Prints</option>
                  <option value="Laminates">Laminates</option>
                  <option value="Frames">Frames</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="Item_Name" className="text-kwhite font-bold mr-4 ">
                Item Name
              </label>
              <div className="border-2 border-kwhite rounded-lg">
                <select
                  id="Item_Name"
                  name="Item_Name"
                  onChange={handleOnchange}
                  value={formData.Item_Name}
                  className="w-[480px] h-[49px] rounded-[10px] text-base p-3 bg-kgray text-kwhite"
                  disabled={!formData.Order_Type}
                >
                  {formData.Order_Type &&
                    orderTypes[formData.Order_Type].map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>


          <div className="flex flex-row mb-5 justify-evenly">

            <div className="flex flex-col">
              <label htmlFor="Artwork_Price" className="text-kwhite font-bold mr-4">Artwork Price </label>
              <div className="border-2 border-kwhite rounded-lg">
                <input type="text" id="Artwork_Price" name="Artwork_Price" onChange={handleOnchange} value={formData.Artwork_Price} className="w-[480px] h-[49px] rounded-[10px] text-base p-3 text-kwhite" style={{ background: 'transparent' }} required/>
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="Quantity" className="text-kwhite font-bold mr-4">Number of edits </label>
              <div className="border-2 border-kwhite rounded-lg">
                <input type="text" id="Quantity" name="Quantity" onChange={handleOnchange} value={formData.Quantity} className="w-[480px] h-[49px] rounded-[10px] text-base p-3 text-kwhite" style={{ background: 'transparent' }} required/>
              </div>
            </div>

          </div>


          <div className="flex flex-row justify-evenly mb-3">
            <div className="flex flex-col">
              <label htmlFor="Additional" className="text-kwhite font-bold mr-4">Additional </label>
              <div className="border-2 border-kwhite rounded-lg">
                <input type="text" id="Additional" name="Additional" onChange={handleOnchange} value={formData.Additional} className="w-[480px] h-[49px] rounded-[10px]] text-kwhite" style={{ background: 'transparent' }} />
              </div>
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