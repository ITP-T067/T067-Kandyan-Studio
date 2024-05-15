import React, { useState, useEffect } from 'react';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

axios.defaults.baseURL = "http://localhost:8010/"

export default function DeclinePayment() {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [reason, setReason] = useState('');
    const [data, setData] = useState();

    

    const getFetchData = async () => {
        try {
            const response = await axios.get("/order/on/get/pending/" + orderId);
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
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      try {
        // Update order status to 'Declined'
        await axios.put(`/order/on/update/pending/`, {_id: orderId, order_status: 'Rejected' });
        
        // Send email to customer
        const message = `Dear Customer,

We regret to inform you that your payment for the order has been declined because ${reason}. Please review your payment details and try again.

If you have any questions or concerns, please do not hesitate to contact us.

Best regards,
Kandyan Studio`;

        console.log(message);
        await axios.post('order/on/send-email', {
          to: "customer.kandyan.example@gmail.com",
          subject: 'Payment Declined',
          text: message
        });

  
        // Navigate back to order payments page
        navigate('/creator/orderPayments');
      } catch (error) {
        console.error("Error declining payment:", error);
      }
    };

  return (
    <div className="w-[530px] h-[328px] bg-kgray bg-opacity-70 rounded-[20px] shadow flex flex-col mt-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5">
      <a href='/creator/orderPayments'>
                    <IoArrowBackCircleOutline className="text-kwhite text-3xl" />
                </a>
      <h1 className="text-kwhite text-3xl font-extrabold text-center mt-0 mb-8">Decline Payment</h1>
      <form onSubmit={handleSubmit} className="flex flex-col px-5 py-5">
        <div>
          <label htmlFor="reason" className="text-kwhite mb-2 font-bold">
            Reason for Decline:
          </label>
          <textarea
            id="reason"
            name="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-mdw-[473px] h-[49px] bg-white rounded-[10px] mb-10 p-3 text-lg bg-kwhite"
          ></textarea>
        </div>
        <div className="flex justify-center mb-4">  
          <button type="submit" className="w-[152px] h-[44px] inline-flex items-center justify-center px-4 py-2 rounded-md shadow-sm text-kwhite focus:outline-none font-bold bg-kred ">
            Decline
          </button>
        </div>
      </form>
    </div>
  );
}
