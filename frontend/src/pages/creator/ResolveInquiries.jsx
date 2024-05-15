import React, { useEffect, useState } from 'react';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

axios.defaults.baseURL = "http://localhost:8010/"

export default function ResolveInquiries() {
    const { inquiryId } = useParams();
    const [formDataEdit, setFormDataEdit] = useState({
        Feedback : "",
        Status: "Resolved",
        _id: inquiryId,
    });
    const navigate = useNavigate();

    const [data, setData] = useState();

    const getFetchData = async () => {
        try {
            const response = await axios.get("/inquiry/" + inquiryId);
            if (response.data.success) {
                setData(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => { 
        getFetchData();
    }, []);

    const handleUpdate = async(e)=>{ 
        e.preventDefault()
        const data = await axios.put("/inquiry/update", formDataEdit)
        if(data.data.success){
            navigate('/creator/inquiries')
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

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      };
    
    return (
        <> 
                {data?.Status !== 'Resolved' ? (
                    <>
                        <div className="addContainer w-[530px] h-[450px] bg-kgray bg-opacity-70 rounded-[20px] shadow flex flex-col mt-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5">
                            <a href='/creator/inquiries'>
                                <IoArrowBackCircleOutline className="text-kwhite text-3xl" />
                            </a>
                            <h className="text-kwhite text-3xl font-extrabold text-center mt-0 mb-0">Resolve Inquiry</h>
                            <form onSubmit={handleUpdate} className="flex flex-col px-5 py-5">
                                <label htmlFor="Customer_Name" className="text-kwhite font-bold text-lg ">Customer Name: </label>
                                <input type="text" id="Customer_Name" name="Customer_Name" value={data?.Cus_ID?.Cus_Name || 'N/A'} className="w-[473px] h-[49px] rounded-[10px] mb-0 p-3 text-base text-kblack disabled"  />
                                
                                <label htmlFor="Inquiry_Data" className='font-bold text-kwhite text-lg'>Inquiry Data: </label>
                                <input type="text" id="Inquiry_Data" name="Inquiry_Data" value={data?.Inquiry_Data || 'N/A'} className="w-[473px] h-[49px] rounded-[10px] mb-0 p-3 text-base text-kblack disabled"  />

                                <label htmlFor="Feedback" className='mb-2 font-bold text-kwhite text-lg'>Feedback: </label>
                                <input type="text" id="Feedback" name="Feedback" onChange={handleEditOnchange} value={formDataEdit.Feedback} className="w-[473px] h-[49px] rounded-[10px] mb-5 p-3 text-base bg-kblack" />
                                
                                <div className="flex justify-center mb-4">
                                    <button className="submitBtn w-[152px] h-[44px] bg-kgreen rounded-[15px] text-kwhite font-bold hover:bg-kblue text-lg">Submit</button>
                                </div>
                            </form>
                        </div>
                    </>
                ) : 
                
                (
                    <>
                        <div className="addContainer w-[530px] h-[450px] bg-kgray bg-opacity-70 rounded-[20px] shadow flex flex-col mt-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5">
                            <a href='/creator/inquiries'>
                                <IoArrowBackCircleOutline className="text-kwhite text-3xl" />
                            </a>
                            <h className="text-kwhite text-3xl font-extrabold text-center mt-0 mb-0">View Inquiry</h>
                            <form onSubmit={handleUpdate} className="flex flex-col px-5 py-5">
                                <label htmlFor="Customer_Name" className="text-kwhite font-bold text-lg ">Customer Name: </label>
                                <input type="text" id="Customer_Name" name="Customer_Name" value={data?.Cus_ID?.Cus_Name || 'N/A'} className="w-[473px] h-[49px] rounded-[10px] mb-0 p-3 text-base text-kwhite disabled"  />
                                
                                <label htmlFor="Inquiry_Data" className='font-bold text-kwhite text-lg'>Inquiry Data: </label>
                                <input type="text" id="Inquiry_Data" name="Inquiry_Data" value={data?.Inquiry_Data || 'N/A'} className="w-[473px] h-[49px] rounded-[10px] mb-0 p-3 text-base text-kwhite disabled"  />

                                <label htmlFor="Feedback" className=' font-bold text-kwhite text-lg'>Resolved Date: </label>
                                <input type="text" id="Feedback" name="Feedback" value={formatDate(data?.Inquiry_Resolved_Date)} className="w-[473px] h-[49px] rounded-[10px] mb-0 p-3 text-base text-kwhite disabled" />

                                <label htmlFor="Feedback" className='font-bold text-kwhite text-lg'>Feedback: </label>
                                <input type="text" id="Feedback" name="Feedback" value={data?.Feedback} className="w-[473px] h-[49px] rounded-[10px] mb-5 p-3 text-base text-kwhite disabled" />
                            </form>
                        </div>

                    </>
                )}
        </>
    )
}
