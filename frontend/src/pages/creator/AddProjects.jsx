import React, { useEffect, useState } from 'react';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Alert from "../../Components/Common/Alerts/alert";

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
    const [isAlert,setIsAlert] = useState(false);
    const [alertStatus,setAlertStatus] = useState('success');
    const [message,setMessage] = useState('');

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
            setAlertStatus("error");
            setMessage("Project with this name already exists.");
            setIsAlert(true);
            // alert("Project with this name already exists. Please enter a different project name.");
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
            setAlertStatus("success");
            setMessage("Project Saved Successfully");
            setIsAlert(true);
            const timer = setTimeout(() => {
                setIsAlert(false); // Reset alert status after 5000ms
                navigate('/creator/projectOrders'); // Navigate to orders page
            }, 1000);

          }
        } catch (error) {
          console.error("Error creating project:", error);
        }
      }

    //   useEffect(() => {
    //     if (isAlert) {
    
    //         return () => clearTimeout(timer); // Clear timer when component unmounts
    //     }
    // }, [isAlert]);
    
  return (
    <> 
            
            <div className="w-[530px] mx-auto">
             {isAlert && (<Alert message={message} type={alertStatus}/>)}
            </div>
            <div className="addContainer w-[530px] h-[328px] bg-kgray bg-opacity-70 rounded-[20px] shadow flex flex-col mt-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5">
                
                <a href='/creator/projectOrders'>
                    <IoArrowBackCircleOutline className="text-kwhite text-3xl" />
                </a>
                <h className="text-kwhite text-3xl font-extrabold text-center mt-0 mb-8">Add Project</h>
                <form onSubmit={handleSubmit} className="flex flex-col px-5 py-5">
                    <label htmlFor="Project_Name" className="text-kwhite mb-2 font-bold">Project Name: </label>
                    <input type="text" id="Project_Name" name="Project_Name" onChange={handleOnchange} value={formData.Project_Name} className="w-[473px] h-[49px] bg-white rounded-[10px] mb-10 p-3 text-lg bg-kwhite"/>
                    <input type="hidden" name="Status" value={formData.Status}/>
                    <input type="hidden" name="Order_ID" value={formData.Order_ID} />
                    <div className="flex justify-center mb-4">
                        <button className="submitBtn w-[152px] h-[44px] bg-kgreen rounded-[15px] text-kwhite font-bold  hover:bg-kblue">Submit</button>
                    </div>
                </form>
            </div>
        </>
  )
}
