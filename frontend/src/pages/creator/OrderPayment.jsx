import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

axios.defaults.baseURL = "http://localhost:8010/"

export default function OrderPayment() {

  const [dataList, setDataList] = useState([])
    
      useEffect(() => {
        getFetchData();
        console.log(dataList[0]);
      }, []);
    
      const getFetchData = async () => {
        try {
          const response = await axios.get("/order/on/get/pending");
          console.log(response);
          if (response.data.success) {
            setDataList(response.data.data);
            console.log(response.data.data); // Log updated dataList here
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
          console.log("before update");
          const response = await axios.put(`/order/on/update/pending/`, { _id: orderId, order_status: "Processing" });
          if (response.data.success) {
            // Parse item_Names and Uploaded_Image
            const newResponse = await axios.get("/order/on/get/pending/" + orderId);
            console.log(newResponse.data.data);
            const items = newResponse.data.data.item_Names.split(',').map(item => item.trim());
            const quantities = items.map(item => parseInt(item.split('-')[1]));
      
            const images = newResponse.data.data.order_uploaded_image.split(',');
      
            // Create OnlineOrder entries
            const orders = items.map((item, index) => ({
              PendingOrder_ID: orderId,
              Item_Name: item.split('-')[0].trim(),
              Quantity: quantities[index],
              Uploaded_Image: images[index].trim(),
              Order_Date: newResponse.data.data.order_Date,
              Order_Amount: newResponse.data.data.total_Price,
            }));
            // Send multiple post requests to create OnlineOrder entries
            await Promise.all(orders.map(order => axios.post("/order/on/create", order)));
      
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
            <a className="w-1/3 h-[55px] text-center rounded-tl-[30px] rounded-bl-[30px] bg-kblack font-bold flex flex-col justify-center" href="/creator/projectOrders/">
                <div>Order List</div>
            </a>
            <a className="w-1/3 h-[55px] text-center bg-kblack font-bold flex flex-col justify-center" href="/creator/physicalOrders">
                <div>Add physical orders</div>
            </a>
            <a className="w-1/3 h-[55px] text-center rounded-tr-[30px] rounded-br-[30px] bg-kgray font-bold flex flex-col justify-center" href="/creator/orderPayments">
                <div>Approve Order Payments</div>
            </a>
        </nav>

    <div className="mt-5 mx-auto  w-11/12">
        <table className="w-full table-fixed rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-kblack/40 border-kwhite text-kwhite p-4 font-bold border-b text-center">
              <th className="px-4 py-2">Items Names</th>
              <th className="px-4 py-2">Total Price</th>
              <th className="px-4 py-2">Order Date</th>
              <th className="px-4 py-2">Details</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              dataList[0] ? (
              dataList.map((el)=>{
                if(el.order_status == "Pending"){
                  return(
                    <tr className="border-b bg-kwhite/20 text-kwhite text-center items-center p-4">
                      <td className="px-4 py-2 text-center">{el?.item_Names || 'N/A'}</td>
                      <td className="px-4 py-2 text-center">LKR {el.total_Price}</td>
                      <td className="px-4 py-2 text-center">{formatDate(el.order_Date)}</td>
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

                          <Link to={`/creator/declinePayment/${el._id}`}>
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
