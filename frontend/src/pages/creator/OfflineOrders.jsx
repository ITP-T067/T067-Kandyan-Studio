import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

axios.defaults.baseURL = "http://localhost:8010/"

export default function OfflineOrders() {
    const [dataList, setDataList] = useState([])
    

      const getFetchData = async () => {
        try {
          const response = await axios.get("/order/off/");
          console.log(response);
          if (response.data.success) {
            setDataList(response.data.data);
          }
          else{
            console.log("error in success");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      useEffect(() => {
        getFetchData();
        console.log(dataList);
      }, []);
    

      const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      };
    
    
  return (
    <>
        <nav className="w-4/5 flex flex-row justify-center items-center mx-auto text-kwhite mb-5">
            <a className="w-1/3 h-[65px] py-5 text-center rounded-tl-[30px] rounded-bl-[30px] bg-kgray font-medium" href="/creator/projectOrders/" style={{backgroundColor: '#525252'}}><div className="">Order List</div></a>
            <a className="w-1/3 h-[65px] py-5 text-center bg-kblack font-medium" href="/creator/physicalOrders"><div>Add physical orders</div></a>
            <a className="w-1/3 h-[65px] py-5 text-center rounded-tr-[30px] rounded-br-[30px] bg-kblack font-medium" href="/creator/orderPayments"><div>Approve Order Payments</div></a>
        </nav>

        <nav className="w-3/5  flex flex-row justify-center items-center mx-auto text-kwhite">
            <a className="w-1/2 h-[65px] py-5 text-center rounded-tl-[30px] rounded-bl-[30px] bg-kblack font-medium" href="/creator/projectOrders/"><div className="">Online Orders</div></a>
            <a className="w-1/2 h-[65px] py-5 text-center rounded-tr-[30px] rounded-br-[30px] bg-kgray font-medium" href="/creator/offlineOrders/"><div>Offline Orders</div></a>
        </nav>

        <div className='tableContainer sm:w-3/4'>
        <table>
          <thead>
            <tr>
              <th>Order</th>
              <th>Quantity</th>
              <th>Additional</th>
              <th>Customer Name</th>
              <th>Order Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              dataList[0] ? (
              dataList.map((el)=>{
                if(el.Project_Status != "Added" && el.Status == "Paid"){
                  return(
                    <tr>
                      <td>{el.Order_Type}</td>
                      <td>{el.Quantity}</td>
                      <td>{el.Additional}</td>
                      <td>{el.Cus_Name}</td>
                      <td>{formatDate(el.Order_Date)}</td>
                      <td>
                          <Link to={`/creator/addOfflineProjects/${el._id}`}>
                              <button className='btn btn_add'>Add Project</button>
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
