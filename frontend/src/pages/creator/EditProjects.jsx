import React, { useEffect, useState } from 'react';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

axios.defaults.baseURL = "http://localhost:8010/"

export default function EditProjects() {
    const { projectId } = useParams();
    const [formDataEdit, setFormDataEdit] = useState({
        Project_Name : "",
        Status : "",
        _id: projectId,
      });
      const navigate = useNavigate();

      const [dataList, setDataList] = useState([]);
      const getFetchData = async () => {
          try {
              const response = await axios.get("/project/");
              if (response.data.success) {
                  setDataList(response.data.data);
              }
          } catch (error) {
              console.error("Error fetching data:", error);
          }
      };

      const getProjectDetails = async () => {
        try {
            const response = await axios.get("/project/" + projectId);
            console.log(response.data.data)
            if (response.data.success) {
                const projectDetails = response.data.data;
                setFormDataEdit({
                    Project_Name: projectDetails.Project_Name,
                    Status: projectDetails.Status,
                    _id: projectDetails._id,
                });
            }
        } catch (error) {
            console.error("Error fetching project details:", error);
        }
      };

      useEffect(() => { 
        getProjectDetails();
        getFetchData();
      }, [projectId]);

      const handleUpdate = async(e)=>{ 
        e.preventDefault()
        const response = await axios.get("/project/" + projectId);
        const projectDetails = response.data.data;
        if (formDataEdit.Project_Name !== projectDetails.Project_Name) {
            const projectExists = dataList.some(project => project.Project_Name === formDataEdit.Project_Name);
            if (projectExists) {
                alert("Project with this name already exists. Please enter a different project name.");
                return;
            }
        }
        const data = await axios.put("/project/update", formDataEdit)
        console.log(projectDetails.Order_ID);
        if(formDataEdit.Status == "Completed" && projectDetails.OrderModel === "OnlineOrder"){
            const dataResponse = await axios.put("/order/on/update/", {_id: projectDetails.Order_ID, Project_Status: "Completed"})
        }
        if(data.data.success){
            navigate('/creator/')
            getFetchData()
            alert(data.data.message)
        }
    }
    
    const handleEditOnchange = async(e) => {
        const {value,name} = e.target
        setFormDataEdit((prev)=> {
            return{
                ...prev,
                [name] : value
            }
        })
    }

  return (
    <>
        <div className="addContainer w-[530px] h-[400px] bg-kgray bg-opacity-70 rounded-[20px] shadow flex flex-col mt-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5">
            <a href='/creator/'>
                <IoArrowBackCircleOutline  className="text-kwhite text-3xl" />
            </a>
            <h className="text-kwhite text-3xl font-extrabold text-center mt-0 mb-0">Edit Project</h>
            <form onSubmit={handleUpdate} className="flex flex-col px-5 py-5">
                <label htmlFor="Project_Name" className="text-kwhite mb-2 font-bold text-lg">Project Name: </label>
                <input type="text" id="Project_Name" name="Project_Name" onChange={handleEditOnchange} value={formDataEdit.Project_Name} className="w-[473px] h-[49px] rounded-[10px] mb-5 p-3 text-base bg-kwhite"/>
                
                <label htmlFor="Status" className='mb-2 font-bold text-kwhite text-lg'>Status: </label>
                <select id="Status" name="Status" className="select w-[473px] h-[49px] bg-kwhite text-kblack rounded-[10px] text-base mb-7 p-3" onChange={handleEditOnchange} value={formDataEdit.Status}>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
    
                <input type="hidden" name="Order_ID" value={formDataEdit.Order_ID} />
    
                <div className="flex justify-center mb-4">
                    <button className="submitBtn w-[152px] h-[44px] bg-kgreen rounded-[15px] text-kwhite font-bold hover:bg-kblue text-lg">Submit</button>
                </div>
            </form>
        </div>
    </>
  )
}
