import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

axios.defaults.baseURL = "http://localhost:8010/"

export default function OrderPayment() {

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

      const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      };

      const handleApprove = async (orderId) => {
        try {
            const response = await axios.put(`/order/on/update/`, { _id: orderId, Status: "Completed" });
            if (response.data.success) {
                // Refresh the data
                getFetchData();
                alert('Order approved successfully!');
            }
        } catch (error) {
            console.error("Error updating order status:", error);
            alert('Error approving order.');
        }
    };
    
    

  return (
    <>
    <nav className="w-4/5 flex flex-row justify-center items-center mx-auto text-kwhite mb-5">
        <a className="w-1/3 h-[65px] py-5 text-center rounded-tl-[30px] rounded-bl-[30px] bg-kblack font-medium" href="/creator/projectOrders/"><div className="">Order List</div></a>
        <a className="w-1/3 h-[65px] py-5 text-center bg-kblack font-medium" href="/creator/physicalOrders"><div>Add physical orders</div></a>
        <a className="w-1/3 h-[65px] py-5 text-center rounded-tr-[30px] rounded-br-[30px] bg-kgray font-medium" href="/creator/orderPayments"><div>Approve Order Payments</div></a>
    </nav>

    <div className="mt-5 mx-auto">
        <table className="w-full border-collapse text-kwhite">
          <thead className="bg-kblack text-kwhite h-[60px]">
            <tr>
              <th className="px-4 py-2">Customer Name</th>
              <th className="px-4 py-2">Order</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Additional</th>
              <th className="px-4 py-2">Details</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-kgray bg-opacity-60 h-[80px]">
            {
              dataList[0] ? (
              dataList.map((el)=>{
                if(el.Status == "Checkout"){
                  return(
                    <tr>
                      <td className="px-4 py-2 text-center">{el.Cus_ID ? el.Cus_ID.Cus_Name : 'N/A'}</td>
                      <td className="px-4 py-2 text-center">{el.Order_Type}</td>
                      <td className="px-4 py-2 text-center">{el.Quantity}</td>
                      <td className="px-4 py-2 text-center">{el.Additional? el.Additional : 'None'}</td>
                      <td className="px-4 py-2 text-center">
                          <Link to={`/creator/paymentDetails/${el._id}`}>
                              <button className='btn_edit bg-kblue text-kwhite font-bold py-3 px-5 rounded-[10px] mr-2'>Details</button>
                          </Link>
                      </td>
                      <td className="px-4 py-2 text-center">
                      <button 
                          className='btn_edit bg-kgreen text-kwhite font-bold py-3 px-5 rounded-[10px] mr-2' 
                          onClick={() => handleApprove(el._id)}
                      >
                          Approve
                      </button>

                          <Link to={`/creator/declineOrders/${el._id}`}>
                              <button className='btn_edit bg-kred text-kwhite font-bold py-3 px-5 rounded-[10px] mr-2'>Decline</button>
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
