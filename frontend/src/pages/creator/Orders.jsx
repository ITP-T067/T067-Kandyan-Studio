import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../Styles/creator/orders.css';
import '../../Styles/creator/formData.css';
import '../../Styles/creator/orderNav.css';

axios.defaults.baseURL = "http://localhost:8010/"

export default function Orders() {

    const [formData, setFormData] = useState({
        Project_Name : "",
        Status : "",
        Order_ID: "",
      })
    
      const [addSection, setAddSection] = useState(false);
      const [dataList, setDataList] = useState([])
    
      useEffect(() => {
        getFetchData();
      }, []);
    
      const getFetchData = async () => {
        try {
          const response = await axios.get("/order/");
          console.log(response);
          if (response.data.success) {
            setDataList(response.data.data);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    
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
            setAddSection(false);
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
      
      const handleAddProject = (orderId) => {
        setFormData((prev) => ({
          ...prev,
          Status: "Pending",
          Order_ID: orderId
        }));
        setAddSection(true);
      };
    
    
  return (
    <>
        <nav className="order-navbar">
            <a className="order-el left_order " href="/creator/projectOrders/" style={{backgroundColor: '#525252'}}><div className="">Order List</div></a>
            <a className="order-el middle_order" href="/creator/physicalOrders"><div>Add physical orders</div></a>
            <a className="order-el right_order" href="/creator/orderPayments"><div>Approve Order Payments</div></a>
        </nav>

        {
        addSection && (
            <div className="addContainer bg-kgray">
            <button className="closeBtn"  onClick={()=>setAddSection(false)}>Close</button>
            <form onSubmit={handleSubmit}>
              <label htmlFor="Project_Name">Project Name: </label>
              <input type="text" id="Project_Name" name="Project_Name" onChange={handleOnchange} value={formData.Project_Name}/>
  
              <input type = "hidden" name = "Status" value={formData.Status}/>
  
              <input type="hidden" name="Order_ID" value={formData.Order_ID} />
  
              <button className="submitBtn bg-kblue">Submit</button>
            </form>
      </div>
          )
      }

      <div className='tableContainer'>
        <table>
          <thead>
            <tr>
              <th>Order</th>
              <th>Quantity</th>
              <th>Additional</th>
              <th>Order Type</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              dataList[0] ? (
              dataList.map((el)=>{
                return(
                  <tr>
                    <td>{el.Order_Type}</td>
                    <td>{el.Quantity}</td>
                    <td>{el.Additional}</td>
                    <td>{el.Type}</td>
                    <td>
                      <button className='btn btn_add' onClick={()=>handleAddProject(el._id)}>Add Project</button>
                    </td>
                  </tr>
                )
              }))
              : (
                <p>No data available</p>
              )
            }
          </tbody>
        </table>
      </div>
    </>
    
  )
}
