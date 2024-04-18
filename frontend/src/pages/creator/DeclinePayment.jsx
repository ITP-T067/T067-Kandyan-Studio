import React, { useState, useEffect } from 'react';
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
            const response = await axios.get("/order/on/" + orderId);
            if (response.data.success) {
                setData(response.data.data);
                console.log(data);
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
        await axios.put(`/order/on/update/`, {_id: orderId, Status: 'Declined' });
        
        console.log(data.Cus_ID.Email);
        // Send email to customer
        const message = `Your payment for order has been declined. Reason: ${reason}`;
        console.log(message);
        await axios.post('order/on/send-email', {
          to: data.Cus_ID.Email,
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-kwhite">Decline Payment</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="reason" className="block text-sm font-medium text-gray-700 text-kwhite">
            Reason for Decline:
          </label>
          <textarea
            id="reason"
            name="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-kblack"
          ></textarea>
        </div>
        <button type="submit" className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 text-kwhite bg-kred">
          Submit
        </button>
      </form>
    </div>
  );
}
