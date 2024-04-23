import { Button, Card, Typography } from "@material-tailwind/react";
import pending from "../../images/cashier/ordermain/Time.png"
import addnew from "../../images/cashier/ordermain/Add_square.png"
import check from "../../images/cashier/ordermain/Check_ring.png"
import supplier from "../../images/cashier/ordermain/Desk_fill.png"
import axios from "axios";
import React, { useEffect, useState } from 'react';


function Ordermain(){

  const [dataList, setDataList] = useState([]);

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

  const [currentStatus, setCurrentStatus] = useState();
  const [itemsData, setItemsData] = useState([]);
 

//getstatus
  // const getStatus = async(value) => {
  
  //       const response = await axios.get("/studio/")
  //       .then(response => {
  //         const status = response.data.data;
  //         const itemsData = status.map(item => ({
  //           ...item,
    
  //         }));
  //         setItemsData(status);
  //       })
  //       .catch(error => {
  //         console.error('Error fetching items:', error);
  //       });
  // }



  return (
    <div className='order'>

    <div class="flex flex-row justify-center">

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
      <h2 className="text-kred text-center">OCCUPIED</h2><br/>
  </div>


</div> 

<div class="m-1 px-10 py-12 flex flex-row  ">

     <Card className=" m-1 h-full w-full  rounded-lg bg-kblack bg-opacity-10 text-kwhite">
      <h3 className=" text-lg text-center font-extrabold">Creator Orders</h3>
      <div className='mt-5 mx-auto w-11/12 overflow-scroll'>
            <table className="w-full border-collapse text-kwhite ">
            <thead  className="bg-kblack text-kwhite h-[60px]">
                <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Order Name</th>
                <th className="px-4 py-2">Customer Name</th>
                <th className="px-4 py-2">Added Date</th>
                <th className="px-4 py-2">Completed Date</th>
                </tr>
            </thead>
            <tbody className="bg-kgray bg-opacity-60 h-[80px]">
                {dataList.length > 0 ? (
                    dataList.map((el) => {
                        if(el.Status == "Completed"){
                        
                        return (
                            <tr key={el._id}>
                                <td className="px-4 py-2 text-center">{el.Project_Name}</td>
                                <td className="px-4 py-2 text-center">
                                                {el.Order_ID ? el.Order_ID.Item_Name : 'N/A'}</td>
                                <td className="px-4 py-2 text-center">{el.Order_ID ? el.Order_ID.Cus_ID.Cus_Name : 'N/A'}</td>
                                <td className="px-4 py-2 text-center">{formatDate(el.Project_Date)}</td>
                                <td className="px-4 py-2 text-center">{formatDate(el.Completed_Date)}</td>
                                <td className="px-4 py-2 text-center"><Button className="bg-kblue transition-transform hover:scale-110">{"View"}</Button></td>
                        
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
     </Card>
     <Card className="h-full w-full "> 
     <div className="both flex flex-col">
     <div className="info flex justify-center ">
     <div class="m-1 rounded-lg bg-kgreen text-kwhite px-8 py-8 shadow-xl ring-1 ring-slate-900/5 w-full h-full ">
      <h3>Total Income</h3><br/><br/>
      <h3>LRK 40000</h3>
      </div>
      <div class="m-1 rounded-lg bg-kred text-kwhite px-8 py-8 shadow-xl ring-1 ring-slate-900/5 w-full h-full">
      <h3>Total Expenditures</h3>
      <br/><br/>
      <h3>LRK 20000</h3>
      </div>
      <div class="m-1 rounded-lg bg-kblack text-kwhite px-8 py-8 shadow-xl ring-1 ring-slate-900/5 w-full h-full">
      <h3>Net Profit</h3>
      <br/><br/>
      <h3>LRK 20000</h3>
      </div>
      </div>
      
      <div className="info ">

       <a href='#'>

     
     <div class="m-1 rounded-lg bg-kwhite px-8 py-8 shadow-xl ring-1 ring-slate-900/5 w-full h-auto transition-transform duration-300 ease-in-out hover:scale-105 ">

      <h3><center>Genarate Monthly Report</center></h3>
      </div>
      </a> 

      <a href='#'>
      <div class="m-1 rounded-lg bg-kwhite px-8 py-8 shadow-xl ring-1 ring-slate-900/5 w-full h-auto transition-transform duration-300 ease-in-out hover:scale-105">
      <h3><center>Genarate Daily Report</center></h3>
      </div>
      </a>
      
      </div>
      </div>
     </Card>

</div>
</div>

  );
}

export default Ordermain;
