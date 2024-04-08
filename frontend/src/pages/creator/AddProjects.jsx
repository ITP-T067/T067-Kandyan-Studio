import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

axios.defaults.baseURL = "http://localhost:8010/"

export default function AddProjects() {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        Project_Name : "",
        Status : "Pending",
        Order_ID: orderId,
        OrderModel: "OnlineOrder"
    });
    const [dataList, setDataList] = useState([]);

    const getFetchData = async () => {
        try {
            const response = await axios.get("/project/");
            console.log(response);
            if (response.data.success) {
            setDataList(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        getFetchData();
        console.log(dataList);
    }, []);

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

        const projectExists = dataList.some(project => project.Project_Name === formData.Project_Name);
        if (projectExists) {
            // Display an error message or handle the case where project already exists
            alert("Project with this name already exists. Please enter a different project name.");
            return;
        }

        console.log("Form Data:", formData); 
        try {
          const data = await axios.post("/project/create", formData);
          console.log("Response:", data); 
          if (data.data.success) {
            await axios.put("/order/on/update", { _id: formData.Order_ID, Project_Status: "Added" });
            setFormData({
              Project_Name: "",
              Status: "Pending",
              Order_ID: "",
            });
            navigate('/creator/projectOrders');
          }
        } catch (error) {
          console.error("Error creating project:", error);
        }
      }

    
  return (
    <> 
        <div className="addContainer">
            <button className="closeBtn"  onClick={()=>setAddSection(false)}>Close</button>
            <form onSubmit={handleSubmit}>
              <label htmlFor="Project_Name">Project Name: </label>
              <input type="text" id="Project_Name" name="Project_Name" onChange={handleOnchange} value={formData.Project_Name}/>
  
              <input type = "hidden" name = "Status" value={formData.Status}/>
  
              <input type="hidden" name="Order_ID" value={formData.Order_ID} />
  
              <button className="submitBtn bg-kblue">Submit</button>
            </form>
      </div>
    </>
  )
}
