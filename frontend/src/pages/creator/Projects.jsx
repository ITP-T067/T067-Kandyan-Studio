import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../Styles/creator/projects.css';
import axios from 'axios';
import { Card, Typography, Button, CardBody } from "@material-tailwind/react";
import Alert from '../../Components/Common/Alerts/alert.jsx'
import { HiOutlineArrowCircleLeft, HiOutlinePlusCircle } from "react-icons/hi";
import {useNavigate } from 'react-router-dom';

axios.defaults.baseURL = "http://localhost:8010/";

export default function Projects() {
  
    const [dataList, setDataList] = useState([]);
    const navigate = useNavigate();
    const [isAlert,setIsAlert] = useState(false);
    const [alertStatus,setAlertStatus] = useState('success');
    const [message,setMessage] = useState('');
    
    const getFetchData = async () => {
        try {
            const response = await axios.get("/project");
            if (response.data.success) {
                setDataList(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    
    useEffect(() => {
        getFetchData();
    }, []);
    
    const handleDelete = async(id, el)=>{ 
        const data = await axios.delete("/project/delete/" + id)
        if(data.data.success){
            await axios.put("/order/on/update", { _id: el.Order_ID, Project_Status: "Not Added" });
            await axios.put("/order/off/update", { _id: el.Order_ID, Project_Status: "Not Added" });
            getFetchData();
            setAlertStatus("success");
            setMessage("Project deleted Successfully");
            setIsAlert(true);
            const timer = setTimeout(() => {
                setIsAlert(false);
            }, 2000);
        }
    }

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const results = dataList.filter((el) => {
            const projectName = el.Project_Name ? el.Project_Name.toLowerCase() : '';
            const itemName = el.Order_ID.Item_Name ? el.Order_ID.Item_Name.toLowerCase() : '';
    
            return projectName.includes(searchTerm.toLowerCase()) || itemName.includes(searchTerm.toLowerCase());
        });
        setSearchResults(results);
    }, [searchTerm, dataList]);
    
    
    const showPdf = (slip) => {
        window.open(`http://localhost:8010/uploads/`+ slip, "_blank", "noreferrer");
    };

    const rowColor = (Status) => {
        let color = ""
        if( Status == "Pending"){
          color = "bg-pred/30"
        }
        if(Status == "In Progress"){
          color = 'bg-pyellow/30'
        }
        return color
    };

    return (
        <>
            <nav className="w-2/5  flex flex-row justify-center items-center mx-auto text-kwhite">
                <a className="w-1/2 h-[50px] py-3 text-center rounded-tl-[30px] rounded-bl-[30px] bg-kgray font-medium" href="/creator/"><div className="">Ongoing Projects</div></a>
                <a className="w-1/2 h-[50px] py-3 text-center rounded-tr-[30px] rounded-br-[30px] bg-kblack font-medium" href="/creator/completedProjects"><div>Completed Projects</div></a>
            </nav>

            <div className="mx-5 mb-5">
                <Card>
                    <CardBody className="flex items-center justify-between">
                    <div className="mt-5 mx-auto w-3/4 flex justify-center">
                        <input
                            type="search"
                            placeholder="Search"
                            className="bg-kwhite w-full max-w-lg rounded-full p-2 text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    </CardBody>
                </Card>
            </div>

            <div className="mt-5 mx-auto w-11/12">
                <div className="w-[530px] mx-auto">
                    {isAlert && (<Alert message={message} type={alertStatus}/>)}
                </div>
                <table className="w-full table-fixed rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-kblack/40 border-kwhite text-kwhite p-4 font-bold border-b text-center">
                            <th className="w-1/5 py-5">Project Name</th>
                            <th className="w-1/4">Order Name</th>
                            <th className="w-1/4">Added Date</th>
                            <th className="w-1/4">Customer Name</th>
                            <th className="w-1/4">Status</th>
                            <th className="w-1/4">Order Date</th>
                            <th className="w-1/4">Uploaded Image</th>
                            <th className="w-1/4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchTerm === "" ? (
                            dataList.length > 0 ? (
                                dataList.map((el) => {
                                    if(el.Status === "Pending" || el.Status === "In Progress"){
                                        const rowClass = el.Status === "Pending" ? "bg-pred/30" : "bg-kblue/30";
                                        return (
                                            <tr key={el._id}  className={`border-b  text-kwhite text-center items-center p-4 ${rowClass}`}>
                                                <td className="px-10">{el.Project_Name}</td>
                                                <td className="px-4 py-2 text-center">
                                                    {el.Order_ID ? el.Order_ID.Item_Name : 'N/A'}</td>
                                                <td className="px-4 py-2 text-center">{formatDate(el.Project_Date)}</td>
                                                <td className="px-4 py-2 text-center">
                                                    {el.OrderModel === 'OnlineOrder' ? 
                                                        (el.Order_ID.Cus_ID ? el.Order_ID.Cus_ID.Cus_Name : 'N/A') : 
                                                        (el.Order_ID ? el.Order_ID.Cus_Name : 'N/A')}
                                                </td>
                                                <td className="px-4 py-2 text-center">{el.Status}</td>
                                                <td className="px-4 py-2 text-center">{formatDate(el.Order_ID ? el.Order_ID.Order_Date : 'N/A')}</td>
                                                <td className='px-4 py-3 text-center'>{el.OrderModel === 'OnlineOrder' ? 
                                                        (<button className="btn_edit bg-kblue text-kwhite font-bold py-3 px-5 rounded-[10px] mr-2" onClick={() => showPdf(el.Order_ID.Uploaded_Image ? el.Order_ID.Uploaded_Image : 'N/A')}>
                                                            View
                                                        </button>) : 
                                                        ("None")}
                                                </td>
                                                <td className="px-4 py-2 flex flex-row text-center">
                                                    <Link to={`/creator/editProjects/${el._id}`}>
                                                        <button className='btn_edit bg-kblue text-kwhite font-bold py-3 px-5 rounded-[10px] mr-2'>Edit</button>
                                                    </Link>
                                                    <button className='btn_delete bg-kred text-white font-bold py-3 px-3 rounded-[10px] ' onClick={() => handleDelete(el._id, el)}>Delete</button>
                                                </td>
                                            </tr>
                                        )
                                    }
                                })
                            ) : (
                                <tr>
                                    <td colSpan="7">No data available</td>
                                </tr>
                            )
                        ) : (
                            searchResults.length > 0 ? (
                                searchResults.map((el) => {
                                    const rowClass = el.Status === "Pending" ? "k-red" : el.Status === "In Progress" ? "k-blue" : "";
                                    if(el.Status === "Pending" || el.Status === "In Progress"){
                                        const rowClass = el.Status === "Pending" ? "bg-pred/30" : "bg-kblue/30";
                                        return (
                                            <tr key={el._id}  className={`border-b  text-kwhite text-center items-center p-4 ${rowClass}`}>
                                                <td className="px-10">{el.Project_Name}</td>
                                                <td className="px-4 py-2 text-center">
                                                    {el.OrderModel === 'OnlineOrder' ? 
                                                        (el.Order_ID.Item_ID ? el.Order_ID.Item_ID.name : 'N/A') : 
                                                        (el.Order_ID ? el.Order_ID.Item_Name : 'N/A')}</td>
                                                <td className="px-4 py-2 text-center">{formatDate(el.Project_Date)}</td>
                                                <td className="px-4 py-2 text-center">
                                                    {el.OrderModel === 'OnlineOrder' ? 
                                                        (el.Order_ID.Cus_ID ? el.Order_ID.Cus_ID.Cus_Name : 'N/A') : 
                                                        (el.Order_ID ? el.Order_ID.Cus_Name : 'N/A')}
                                                </td>
                                                <td className="px-4 py-2 text-center">{el.Status}</td>
                                                <td className="px-4 py-2 text-center">{formatDate(el.Order_ID ? el.Order_ID.Order_Date : 'N/A')}</td>
                                                <td className='px-4 py-3 text-center'>{el.OrderModel === 'OnlineOrder' ? 
                                                        (<button className="btn_edit bg-kblue text-kwhite font-bold py-3 px-5 rounded-[10px] mr-2" onClick={() => showPdf(el.Order_ID.Uploaded_Image ? el.Order_ID.Uploaded_Image : 'N/A')}>
                                                            View
                                                        </button>) : 
                                                        ("None")}
                                                </td>
                                                <td className="px-4 py-2 flex flex-row text-center">
                                                    <Link to={`/creator/editProjects/${el._id}`}>
                                                        <button className='btn_edit bg-kblue text-kwhite font-bold py-3 px-5 rounded-[10px] mr-2'>Edit</button>
                                                    </Link>
                                                    <button className='btn_delete bg-kred text-white font-bold py-3 px-3 rounded-[10px] ' onClick={() => handleDelete(el._id, el)}>Delete</button>
                                                </td>
                                            </tr>
                                        )
                                    }
                                })
                            ) : (
                                <tr>
                                    <td colSpan="7">No matching results</td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}
