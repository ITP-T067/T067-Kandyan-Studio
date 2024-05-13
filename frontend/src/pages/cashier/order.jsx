import { Button, Card, Typography } from "@material-tailwind/react";
import pending from "../../images/cashier/ordermain/Time.png"
import addnew from "../../images/cashier/ordermain/Add_square.png"
import check from "../../images/cashier/ordermain/Check_ring.png"
import supplier from "../../images/cashier/ordermain/Desk_fill.png"
import axios from "axios";
import React, { useEffect, useState } from 'react';


function Ordermain(){

  const [studioStatus, setStudioStatus] = useState('');

  useEffect(() => {
    // Fetch studio status when the component mounts
    fetchStudioStatus();
  }, []);

  const fetchStudioStatus = async () => {
    try {
      const response = await axios.get('/studio');
      if (response.data.success) {
        // Set the studio status state
        setStudioStatus(response.data.data[0].Studio_Status);
      }
    } catch (error) {
      console.error('Error fetching studio status:', error);
    }
  };

  const [dataList, setDataList] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);

  useEffect(() => {
    setPendingOrders([]); // Clear pendingOrders state before populating it again
    dataList.forEach((item) => { // Use forEach instead of map since you're not returning anything
        if (item.ordertype === "Pending") {
            setPendingOrders((prev) => [...prev, item]);
        }
    });
}, [dataList]);


    const getFetchData = async () => {
        try {
          const response = await axios.get("/project/");
          if (response.data.success) {
            setDataList(response.data.data);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      useEffect(() =>{
        getFetchData()
      }, [])

      const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      };
  

  return (
    <div className='order'>

    <div class="flex flex-row justify-center font-bold text-lg">

    <a href='/cashier/addneworder'>
    <div class="m-1 rounded-lg bg-kwhite px-8 py-8 shadow-xl ring-1 ring-slate-900/5 h-full w-100 transition-transform duration-300 ease-in-out hover:scale-105" >
    <img src={addnew}/><br/>
    <h3>ADD NEW ORDER</h3>
    </div></a>

    <a href='/cashier/pendingorders'>
    <div class="m-1 rounded-lg bg-kwhite px-8 py-8 shadow-xl ring-1 ring-slate-900/5 h-full w-100 transition-transform duration-300 ease-in-out hover:scale-105">
      <img src={pending}/>
      <h3>PENDING ORDERS</h3>
    </div>
    </a>

    <a href='/cashier/completedorders'>
    <div class="m-1 rounded-lg bg-kwhite px-8 py-8 shadow-xl ring-1 ring-slate-900/5 h-full w-100 transition-transform duration-300 ease-in-out hover:scale-105">
      <img src={check}/>
      <h3>COMPLETED ORDERS</h3>
    </div>
    </a>

    <a href='/cashier/supplierpayment'>
    <div class="m-1 rounded-lg bg-kwhite px-8 py-8 shadow-xl ring-1 ring-slate-900/5 h-full w-100 transition-transform duration-300 ease-in-out hover:scale-105 ">
      <img src={supplier}/>
      <h3>SUPPLIER PAYMENTS</h3>
    </div>
    </a>

  <div class="m-1 rounded-lg bg-kblack px-8 py-9 shadow-xl ring-1 ring-slate-900/5 h-full w-100">
    <h3 className="text-kwhite text-center">STUDIO STATUS</h3><br/><br/>
      <div className="text-kred text-center text-2xl">{studioStatus}</div><br/>
  </div>


</div> 

<div class="m-1 px-10 py-12 flex flex-row  ">
{/* 
  creator orders table */}

     <Card className=" m-1 h-full w-full  rounded-lg bg-kwhite bg-opacity-10 text-kwhite ">
      <h3 className=" text-lg text-center font-extrabold m-1">Creator Orders</h3>
      <div className='mt-0 mx-auto'>
      <div class="overflow-y-auto h-[20rem] ...">
            <table className="w-full border-collapse text-kwhite ">
            <thead  className="bg-kblack text-kwhite h-[60px]">
                <tr>
                <th className="px-4 py-2">Customer Name</th>
                <th className="px-4 py-2">Order Name</th>
                <th className="px-4 py-2">Added Date</th>
                <th className="px-4 py-2">Completed Date</th>
                <th></th>
                </tr>
            </thead>
            <tbody className="bg-kgray bg-opacity-60 h-[80px]">
                {dataList.length > 0 ? (
                    dataList.map((el) => {
                        if(el.Status == "Completed"){
                        
                        return (
                            <tr key={el._id}>
                               <td className="px-4 py-2 text-center">{el.Order_ID ? el.Order_ID.Cus_ID.Cus_Name : 'N/A'}</td>
                                <td className="px-4 py-2 text-center">{el.Order_ID ? el.Order_ID.Item_Name : 'N/A'}</td>
                                 <td className="px-4 py-2 text-center">{formatDate(el.Project_Date)}</td>
                                <td className="px-4 py-2 text-center">{formatDate(el.Completed_Date)}</td>
                                <td className="px-4 py-2 text-center"><Button className="bg-kblue transition-transform hover:scale-110 ring-1">{"View"}</Button></td>

                            </tr> 
                        )
                        }
                    })
                ) : (
                    <tr>
                        <td colSpan="4">No data available</td>
                    </tr>
                )}
            </tbody>
            </table>
            </div>
        </div>
     </Card>
     <Card className="h-full w-full font-bold text-lg "> 
     {/* <div className="">
     
     <div class="grid grid-cols-3 m-1 rounded-lg bg-kgreen text-kwhite text-3xl px-8 py-10 shadow-xl ring-1 ring-slate-900/5 w-full h-full">
      <h3 className=" col-span-2">Total Income</h3>
      <h3>LRK 40000</h3>
      </div>
      <div class="grid grid-cols-3 m-1 m-1 rounded-lg bg-kred text-kwhite text-3xl  px-8 py-10 shadow-xl ring-1 ring-slate-900/5 w-full h-full">
      <h3 className=" col-span-2">Total Expenditures</h3>
      
      <h3>LRK 20000</h3>
      </div>
      <div class=" grid grid-cols-3 m-1 rounded-lg bg-kblack text-kwhite text-3xl  px-8 py-10 shadow-xl ring-1 ring-slate-900/5 w-full h-full">
      <h3 className=" col-span-2">Net Profit</h3>
    
      <h3>LRK 20000</h3>
      </div>
     
      <div className="info ">


      
      </div>
      </div> */}

      <div className="grid grid-cols-4 overflow-y-auto h-[20rem] ...">
        <table className="m-1 text-kwhite text-center col-span-2">
          <caption>INCOME</caption>
          <thead className="bg-kblack ">
            <tr>
              <th className="py-4">customer</th>
              <th>total</th>
            </tr>
          </thead>
          <tbody>
                        {pendingOrders.length > 0 ? (
                            pendingOrders.map((il, index) => {
                    
                               
                                return (
                                    <>
                                    <tr key={index} className="border-b bg-kwhite/20 text-kwhite text-center items-center p-4 text-lg">

                                        <td className="p-4"> {il.cusname}</td>
                                        <td className="p-4"> {il.telephone}</td>
                                        <td className="p-4"> {il.email}</td>
                                        <td className="p-4"> {il.nettotal}</td>
                                        
                                        {/* <td className="p-4">
                                            <div className="flex flex-grow justify-center mx-auto">
                                                <div className="p-3 text-kwhite text-lg" >
                                                   {il.email}
                                                </div>
                                            </div>
                                        </td> */}

                                        <td>
                                            <Button className="p-3 bg-kblack text-kwhite text-lg" >
                                                {"COMPLETE"}
                                            </Button>
                                        </td>
                                    </tr>
                                    </>
                                );
                            })
                        ) : (
                            <tr className="bg-kwhite/20 w-full text-kwhite">
                                <td colSpan="4" className="text-center py-4">No data available</td>
                            </tr>
                        )}
                    </tbody>
        </table>

        <table className="m-1 text-kwhite text-center col-span-2">
        <caption>EXPENSES</caption>
          <thead className= "bg-kblack text-lg ">
            <tr>
              <th className="py-4">Supplier</th>
              <th>total</th>
            </tr>
          </thead>
          <tbody className="bg-kred bg-opacity-60">
            <tr>
              <td>John</td>
              <td>1000</td>
            </tr>
          </tbody>
        </table>
      </div>
     </Card>

</div>
</div>

  );
}

export default Ordermain;
