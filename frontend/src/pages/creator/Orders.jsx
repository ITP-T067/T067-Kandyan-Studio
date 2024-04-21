import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../Styles/creator/orders.css';

axios.defaults.baseURL = "http://localhost:8010/"

export default function Orders() {
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

      const showPdf = (slip) => {
        window.open(`http://localhost:8010/uploads/`+ slip, "_blank", "noreferrer");
      };
    
    
  return (
    <>
        <nav className="w-4/5 flex flex-row justify-center items-center mx-auto text-kwhite mb-5">
            <a className="w-1/3 h-[55px] text-center rounded-tl-[30px] rounded-bl-[30px] bg-kgray font-bold flex flex-col justify-center" href="/creator/projectOrders/">
                <div>Order List</div>
            </a>
            <a className="w-1/3 h-[55px] text-center bg-kblack font-bold flex flex-col justify-center" href="/creator/physicalOrders">
                <div>Add physical orders</div>
            </a>
            <a className="w-1/3 h-[55px] text-center rounded-tr-[30px] rounded-br-[30px] bg-kblack font-bold flex flex-col justify-center" href="/creator/orderPayments">
                <div>Approve Order Payments</div>
            </a>
        </nav>

        <nav className="w-3/5  flex flex-row justify-center items-center mx-auto text-kwhite">
            <a className="w-1/2 h-[55px] text-center rounded-tl-[30px] rounded-bl-[30px] bg-kgray font-bold flex flex-col justify-center" href="/creator/projectOrders/"><div className="">Online Orders</div></a>
            <a className="w-1/2 h-[55px] text-center rounded-tr-[30px] rounded-br-[30px] bg-kblack font-bold flex flex-col justify-center" href="/creator/offlineOrders/"><div>Offline Orders</div></a>
        </nav>

      <div className="mt-5 mx-auto">
        <table className="w-full border-collapse text-kwhite">
          <thead className="bg-kblack text-kwhite h-[60px]">
            <tr>
              <th className="px-4 py-2">Order</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Customer Name</th>
              <th className="px-4 py-2">Order Date</th>
              <th className="px-4 py-2">Order Image</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody className="bg-kgray bg-opacity-60 h-[80px]">
            {
              dataList[0] ? (
              dataList.map((el)=>{
                if(el.Project_Status != "Added"){
                  return(
                    <tr>
                      <td className="px-4 py-2 text-center">{el?.Item_Name || 'N/A'}</td>
                      <td className="px-4 py-2 text-center">{el.Quantity}</td>
                      <td className="px-4 py-2 text-center">{el.Cus_ID ? el.Cus_ID.Cus_Name : 'N/A'}</td>
                      <td className="px-4 py-2 text-center">{formatDate(el.Order_Date)}</td>
                      <td className="px-4 py-2 text-center">
                        <button className="btn_edit bg-kblue text-kwhite font-bold py-3 px-5 rounded-[10px] mr-2" onClick={() => showPdf(el.Uploaded_Image)}>
                            View
                        </button>
                      </td>
                      <td className="px-4 py-2 text-center">
                          <Link to={`/creator/addProjects/${el._id}`}>
                              <button className='btn_edit bg-kgreen text-kwhite font-bold py-3 px-5 rounded-[10px] mr-2'>Add Project</button>
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
