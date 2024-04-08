import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../Styles/creator/orders.css';
import '../../Styles/creator/formData.css';
import '../../Styles/creator/orderNav.css';

axios.defaults.baseURL = "http://localhost:8010/"

export default function Orders() {

    const [formData, setFormData] = useState({
        Project_Name : "",
        Status : "",
        Order_ID: "",
        OrderModel: "OnlineOrder"
      })
    
      const [addSection, setAddSection] = useState(false);
      const [dataList, setDataList] = useState([])
    
      useEffect(() => {
        getFetchData();
        console.log(dataList);
      }, []);
    
      const getFetchData = async () => {
        try {
          const response = await axios.get("/order/on/");
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
        console.log("Form Data:", formData); 
        try {
          const data = await axios.post("/project/create", formData);
          console.log("Response:", data); 
          if (data.data.success) {
            await axios.put("/order/on/update", { _id: formData.Order_ID, Project_Status: "Added" });
            setAddSection(false);
            setFormData({
              Project_Name: "",
              Status: "",
              Order_ID: ""
            });
            getFetchData()
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
                if(el.Project_Status != "Added" && el.Status == "Paid"){
                  return(
                    <tr>
                      <td>{el.Order_Type}</td>
                      <td>{el.Quantity}</td>
                      <td>{el.Additional}</td>
                      <td>{el.Type}</td>
                      <td>
                          <Link to={`/creator/addProjects/${el._id}`}>
                              <button className='btn btn_add'>Add Project</button>
                          </Link>
                      </td>
                    </tr>
                  )
                }
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
