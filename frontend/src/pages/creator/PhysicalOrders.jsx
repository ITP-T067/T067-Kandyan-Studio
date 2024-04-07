import React, {useState } from 'react';
import axios from 'axios';
import '../../Styles/creator/orderNav.css';

axios.defaults.baseURL = "http://localhost:8010/"

export default function PhysicalOrders() {

  const [formData, setFormData] = useState({
    Project_Name : "",
    Status : "",
    Order_ID: "",
  })

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
      const data = await axios.post("/project/create", formData);
      console.log("Response:", data); // Log the response from the server
      if (data.data.success) {
        setFormData({
          Project_Name: "",
          Status: "",
          Order_ID: "",
        }); 
      }
    } catch (error) {
      console.error("Error creating project:", error);
    }
  }

    

  return (
    <>
        <nav className="order-navbar">
            <a className="order-el left_order " href="/creator/projectOrders/"><div className="">Order List</div></a>
            <a className="order-el middle_order" href="/creator/physicalOrders" style={{backgroundColor: '#525252'}}><div>Add physical orders</div></a>
            <a className="order-el right_order" href="/creator/orderPayments"><div>Approve Order Payments</div></a>
        </nav>

        <form onSubmit={handleSubmit}>
          <label htmlFor="Project_Name">Project Name: </label>
          <input type="text" id="Project_Name" name="Project_Name" onChange={handleOnchange} value={formData.Project_Name}/>

          <input type = "hidden" name = "Status" value={formData.Status}/>

          <input type="hidden" name="Order_ID" value={formData.Order_ID} />

          <button className="submitBtn bg-kblue">Submit</button>
        </form>
    </>
  )
}
