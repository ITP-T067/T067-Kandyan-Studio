import React, { useState, useEffect } from 'react'
import { Typography} from "@material-tailwind/react";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8010/";

const TABLE_HEAD = [
    "User Name",
    "Total Amount",  
    "Status",
    "Action"
  ];


export default function Loyaltyview() {

  const navigate = useNavigate();
  const [showEditAlert, setShowEditAlert] = useState(false);
  const [showPayAlert, setShowPayAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    getDetails();
    }, []);

    
  

const getDetails = async () => {
    try {
      const response = await axios.get('/order/on/get/cusdetail/66147c480a94b623c0e9a698');
      console.log(response);
      if (response.data.success) {
          const customerID = response.data.data.Cus_ID; // Assuming _id is the customer ID
          const customerResponse = await axios.get(`/customer/find/${customerID}`);
          if (customerResponse.data.success) {
              const customer = customerResponse.data.data;
              setDetails({ ...response.data.data, customerName: customer.Cus_Name });
          }
      }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const calculateStatus = (amount) => {
    if (amount < 1000) {
        return "BRONZE";
    } else if (amount >= 1000 && amount <= 2000) {
        return "GOLD";
    } else {
        return "PLATINUM";
    }
};


    
  const handleEditClick = () => {
    setShowEditAlert(true);
    navigate('/pendingorder');
  };

  const handleViewClick = () => {
    setShowPayAlert(true);
    navigate('/profile');
  };

  const handleDeleteClick = () => {
    setShowDeleteAlert(true);
    navigate('');
  };




  return (
    <div>
      <div className={`mx-5 mb-5 ${showEditAlert ? 'blur' : ''} ${showPayAlert ? 'blur' : ''} ${showDeleteAlert ? 'blur' : ''} `}>
                
                    
                      <div className="flex items-center justify-between">
                        <div className="flex" onClick={() => navigate('/manager')}>
                          <svg class="h-9 w-9 mb-1 text-kwhite mr-2 cursor-pointer" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 8 8 12 12 16" />
                            <line x1="16" y1="12" x2="8" y2="12" />
                          </svg>
                          <h2 class="text-3xl font-bold text-kwhite cursor-pointer">Loyalty</h2>
                          </div>
                          <div className='flex'>
                          <button className="bg-kblue text-kwhite p-3 px-5">Genarate Report</button>
                          </div>
                        
                      </div>
                      
            </div>
            <div className="p-3">
            <table className="w-full rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-kblack bg-opacity-40">
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className={`border-kwhite text-kwhite p-4 font-bold ${
                    index === TABLE_HEAD.length ? "" : "border-b"
                    } text-center`}
                >
                  <Typography variant="lead">{head}</Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
          {Object.keys(details).length > 0 ? (
            <tr className={`text-kwhite text-center p-4 bg-opacity-20  ${
              calculateStatus(details.Order_Amount) === "BRONZE" ? "bg-kred" :
              calculateStatus(details.Order_Amount) === "GOLD" ? "bg-kyellow" :
              calculateStatus(details.Order_Amount) === "PLATINUM" ? "bg-kwhite" : ""
          }`}>
          
        <td>
            <Typography variant="lead" color="blue-gray" className="font-normal">
             {details.customerName}
            </Typography>
        </td>
        <td>
            <Typography variant="lead" color="blue-gray" className="font-normal">
                {details.Order_Amount}
            </Typography>
        </td>
        <td className='text-5xl text-kwhiten'>
            <Typography variant="lead" color="green" className="font-normal" >
                {calculateStatus(details.Order_Amount)}
            </Typography>
        </td>
        <td className="p-2">
            <div className="mx-auto text-kwhite">
                <button type="button" className="bg-kyellow focus:ring-4 focus:outline-none font-medium rounded-3xl text-sm px-5 py-2.5 text-center me-2 mb-2 w-[6rem]" onClick={handleViewClick}>View</button>
                <button type="button" className="bg-kred focus:ring-4 focus:outline-none font-medium rounded-3xl text-sm px-5 py-2.5 text-center me-2 mb-2 w-[6rem]" onClick={handleDeleteClick}>Delete</button>
            </div>
        </td>
    </tr>
    

) : (
    <tr>
        <td colSpan={TABLE_HEAD.length} className="text-center text-kwhite py-4">
            No data available
        </td>
    </tr>
)}

</tbody>

        </table>
            </div>
    </div>

           
  )
}




