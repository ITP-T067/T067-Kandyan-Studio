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
            setDetails(response.data.data);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
const calculateStatus = (amount) => {
    if (amount < 1000) {
        return "Bronze";
    } else if (amount >= 1000 && amount <= 2000) {
        return "Gold";
    } else {
        return "Platinum";
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
    <tr className="bg-kgray text-kwhite text-center p-4 bg-opacity-20">
      <td>
        <Typography variant="lead" color="blue-gray" className="font-normal">
          {details._id}
        </Typography>
      </td>
      <td>
        <Typography variant="lead" color="blue-gray" className="font-normal">
          {details.Order_Amount}
        </Typography>
      </td>
      <td className='text-plgreen'>
        <Typography variant="lead" color="green" className="font-normal">
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




