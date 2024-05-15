import { Button, Card, Typography } from "@material-tailwind/react";
import pending from "../../images/cashier/ordermain/Time.png"
import addnew from "../../images/cashier/ordermain/Add_square.png"
import check from "../../images/cashier/ordermain/Check_ring.png"
import supplier from "../../images/cashier/ordermain/Desk_fill.png"
import axios from "axios";
import React, { useEffect, useState,useRef } from 'react';
import { Link } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';

function Ordermain() {
  const [studioStatus, setStudioStatus] = useState('');
  const [dataList, setDataList] = useState([]);
  const [dataListcomp, setDataListcomp] = useState([]);
  const [dataListsr, setDataListsr] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [totincome, setTotIncome] = useState(0);
  const [totoutcome, setTotOutcome] = useState(0);
  const [netprofit, setNetprofit] = useState(0);
  const [netloss, setNetLoss] = useState(0);
  const componentRef = useRef();
  const [reportSection, setReportSection] = useState(false);


 
    
  
    //Report Generation
    const componentPDF = useRef([]);

    const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
  });




  useEffect(() => {
    fetchStudioStatus();
    getFetchData();
    getFetchDatacomp();
    getFetchDatasr();
  }, []);

  useEffect(() => {
    setPendingOrders(dataList.filter(item => item.ordertype === "Pending"));
  }, [dataList]);

  useEffect(() => {
    setCompletedOrders(dataListcomp.filter(item => item.ordertype === "Completed"));
  }, [dataListcomp]);

  useEffect(() => {
    const income = completedOrders.reduce((sum, order) => sum + parseFloat(order.nettotal), 0);
    setTotIncome(income);
  }, [completedOrders]);

  useEffect(() => {
    const outcome = dataListsr.reduce((sum, request) => sum + parseFloat(request.cost), 0);
    setTotOutcome(outcome);
  }, [dataListsr]);

  const fetchStudioStatus = async () => {
    try {
      const response = await axios.get('/studio');
      if (response.data.success) {
        setStudioStatus(response.data.data[0].Studio_Status);
      }
    } catch (error) {
      console.error('Error fetching studio status:', error);
    }
  };

  const getFetchData = async () => {
    try {
      const response = await axios.get("/order/off/");
      if (response.data.success) {
        setDataList(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getFetchDatacomp = async () => {
    try {
      const response = await axios.get("/placeorder/");
      if (response.data.success) {
        setDataListcomp(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getFetchDatasr = async () => {
    try {
      const response = await axios.get("/supplyrequest/");
      if (response.data.success) {
        setDataListsr(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Pagination (Assuming pagination for supplier requests)
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchResults, setSearchResults] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(searchResults.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  //printable file 
  const ReportPrintable = ({ datalistnew,datalistnew2}) => {


    if(totincome > totoutcome){
      setNetprofit(totincome - totoutcome);
    }else{
        setNetLoss(totoutcome - totincome);
    }
    return (
        <div ref={componentPDF} className="bg-kwhite mx-auto items-center justify-center p-10 rounded-lg">
                <div className="text-3xl font-bold text-kblack items-center justify-center text-center mb-5">Kandyan Studio & Digital Color Lab</div>
                <div className="text-2xl font-bold text-kgray items-center justify-center text-center mb-5">Billing & Finance Management <br/>Monthly Finance Report</div>
                <div className="flex items-center justify-between">
                <span className="  text-base text-kblack mb-3">Issued date : {new Date().toLocaleString()}</span>
               </div>
               <div className="grid grid-cols-2 text-kblack text-center text-3xl">
                <div>Total Income</div>
                <div>Total Outcome</div>
               
               
               <div>
                <table className="m-1 w-full table-fixed border rounded-lg">
                  <thead>
                      <tr className="bg-kblack border-kblack py-4 text-kwhite border text-lg text-center">
                          <th className=" col-span-3">Customer</th>
                          <th className=" col-span-3">Mobile</th>
                          <th className=" col-span-3">Income</th>
                      </tr>
                  </thead>
                  <tbody>
                  {completedOrders.length > 0 ? (
                              completedOrders.map((il, index) => {
                                      
                                      return (
                                        <tr
                                          key={index}
                                          className="border-b bg-kgreen/20 text-kblack text-center items-center text-lg"
                                        >
                                          <td className="">{il.cusname}</td>
                                          <td className="">{il.telephone}</td>
                                          <td className="">{il.nettotal}</td>
                                        
                                        </tr>
                                      );
                                    })
                                  ) : (
                                    <tr className="bg-kwhite/20 w-full text-kwhite">
                                      <td colSpan="4" className="text-center py-4">
                                        No data available
                                      </td>
                                    </tr>
                                  )}

                          
                                  </tbody>
                          </table>
                                      </div>
                          <div>
               <table className="m-1 w-full table-fixed border rounded-lg ">
                  <thead>
                      <tr className="bg-kblack border-kblack py-4 text-kwhite text-lg border text-center">
                          <th className=" col-span-3">Supplier</th>
                          <th className=" col-span-3">Date</th>
                          <th className=" col-span-3">Cost</th>
                      </tr>
                  </thead>
                  <tbody>
                  {dataListsr.map((srl, index) => {
              if (srl.status === "Approved") {
                let totalCost = 0;
                    return (

                      totalCost = totalCost + srl.cost,
                        <tr className=" text-kblack bg-kred/20 text-lg text-center">
                         
                            <td>{srl.supplier}</td>
                            <td>{srl.date}</td>
                            <td>{srl.cost}</td>
                            
                            
                        </tr>
                        
                    );
                  }
                })}

                          
                                  </tbody>
                          </table>
                          </div>

</div>
<hr className="text-kblack"/>
            <div className="grid grid-cols-4 text-center">
                <span className="text-lg text-kblack mt-5">Total Income:</span>
                <span className="text-lg text-kblack mt-5">{totincome}</span>
                <span className="text-lg text-kblack mt-5">total Outcome:</span>
                <span className="text-lg text-kblack mt-5">{totoutcome}</span>
                <hr className="text-kblack"/>
                <hr className="text-kblack"/>
                <hr className="text-kblack"/>
                <hr className="text-kblack"/>

                <span className="text-2xl text-kblack mt-5">Net Profit :</span>
                <span className="text-2xl text-kblack mt-5">{netprofit}</span>
                <span className="text-2xl text-kblack mt-5">Net Loss :</span>
                <span className="text-2xl text-kblack mt-5">{netloss}</span>
                
            </div>
            
            
            </div>
            
    );
};

  
//main funtion returns

  return (
    <>
      {/* genarate reports */}
      {reportSection && (
        <div className="fixed grid grid-cols-1 top-0 left-0 h-full bg-kblack bg-opacity-50 backdrop-blur flex items-center justify-center text-kwhite z-50 px-1 ">
        <button
                    className="absolute top-5 right-5 bg-kblack text-kwhite"
                    onClick={() => setReportSection(false)}
                >
                    X
                </button>
                <button className="bg-kgreen rounded-lg text-kwhite mx-50 mx-64 p-2" onClick={generatePDF}>Print</button>
        <ReportPrintable ref={componentRef} datalistnew={completedOrders} datalistnew2={dataListsr} />
        
        </div>
      )}




    <div className='order'>

    <div class="flex flex-row justify-center font-bold text-lg">

    <a href='/cashier/addneworder'>
    <div class="m-1 rounded-3xl bg-kwhite px-8 py-8 shadow-xl ring-1 ring-slate-900/5 h-full w-100 transition-transform duration-300 ease-in-out hover:scale-105" >
    <img src={addnew}/><br/>
    <h3>ADD NEW ORDER</h3>
    </div></a>

  
    <a href='/cashier/completedorders'>
    <div class="m-1 rounded-3xl bg-kwhite px-8 py-8 shadow-xl ring-1 ring-slate-900/5 h-full w-100 transition-transform duration-300 ease-in-out hover:scale-105">
      <img src={check}/><br/>
      <h3>COMPLETED ORDERS</h3>
    </div>
    </a>

    <a href='/cashier/supplierpayment'>
    <div class="m-1 rounded-3xl bg-kwhite px-8 py-8 shadow-xl ring-1 ring-slate-900/5 h-full w-100 transition-transform duration-300 ease-in-out hover:scale-105 ">
      <img src={supplier}/><br/>
      <h3>SUPPLIER PAYMENTS</h3>
    </div>
    </a>

    <button 
    onClick={() => setReportSection(true)}>
    <div class="m-1 rounded-3xl bg-kwhite text-kblack px-10 text-lg shadow-xl ring-1 ring-slate-900/5 h-full transition-transform duration-300 ease-in-out hover:scale-105 ">
     <br/>
      <h3>GENARATE REPORT</h3><br/>
      <center> <img src={addnew}/></center>
    </div>
    </button>

    
    
  <div class="m-1 rounded-3xl bg-kblack px-8 py-9 shadow-xl ring-1 ring-slate-900/5 h-full w-100">
    <h3 className="text-kwhite text-center">STUDIO STATUS</h3><br/><br/>
      <div className="text-kred text-center text-2xl">{studioStatus}</div><br/>
  </div>
  



</div> 

<div class="m-1 px-10 py-12 flex flex-row  ">

{/*creator orders table */}

     <Card className=" m-1 h-full w-full  rounded-3xl bg-kwhite bg-opacity-10 text-kwhite ">
      <h3 className=" text-2xl text-center font-extrabold m-1">Creator Orders</h3>
      <div className='mt-0 mx-auto'>
      <div class="overflow-y-auto h-[20rem] ...">
            <table className="w-full border-collapse text-kwhite ">
            <thead  className="bg-kblack text-kwhite h-[60px]">
            <tr>
              <th className="px-4 py-2">Customer Name</th>
              <th className="px-4 py-2">Order</th>
              <th className="px-4 py-2">Item</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Edit price</th>
              <th className="px-4 py-2">Order Date</th>
              <th className="px-4 py-2"></th>
            </tr>
            </thead>
            <tbody className="bg-kgray bg-opacity-60 h-[80px]">
            {
              dataList[0] ? (
              dataList.map((el)=>{
                if(el.Project_Status != "Added" && el.Status == "Paid"){
                  return(
                    <tr>
                      <td className="px-4 py-2 text-center">{el.Cus_Name}</td>
                      <td className="px-4 py-2 text-center">{el.Order_Type}</td>
                      <td className="px-4 py-2 text-center">{el.Item_Name}</td>
                      <td className="px-4 py-2 text-center">{el.Quantity}</td>
                      <td className="px-4 py-2 text-center">{el.Artwork_Price}</td>
                      <td className="px-4 py-2 text-center">{formatDate(el.Order_Date)}</td>
                      <td className="px-4 py-2 text-center">
                          {/* <Link to={`/cashier/creatorcheckout/${el._id}`}>
                              <button  className='btn_edit bg-kgreen text-kwhite font-bold py-3 px-5 rounded-[10px] mr-2 hover:scale-105'>View</button>
                          </Link> */}
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
        </div>
     </Card>
     <Card className="h-full w-full font-bold text-lg "> 

      <div className="grid grid-cols-4 overflow-y-auto h-[19rem] ...">
        <table className="m-1 text-kwhite text-center col-span-2">
     
          <thead className="bg-kblack ">
            <tr>
              <th className="py-4">customer</th>
              <th>Telephone</th>
              <th>total</th>
            </tr>
          </thead>
          <tbody>
          {completedOrders.length > 0 ? (
                completedOrders.map((il, index) => {
                        
                        return (
                          <tr
                            key={index}
                            className="border-b bg-kgreen/20 text-kwhite text-center items-center p-4 text-lg"
                          >
                            <td className="p-4">{il.cusname}</td>
                            <td className="p-4">{il.telephone}</td>
                            <td className="p-4">{il.nettotal}</td>
                           
                          </tr>
                        );
                      })
                    ) : (
                      <tr className="bg-kwhite/20 w-full text-kwhite">
                        <td colSpan="4" className="text-center py-4">
                          No data available
                        </td>
                      </tr>
                    )}
                    </tbody>
        </table>

        <table className="text-kwhite text-center col-span-2">
           <thead className= "bg-kblack text-lg ">
            <tr>
              <th className="py-4">Supplier</th>
              <th>total cost</th>
            </tr>
          </thead>
           <tbody>
           {dataListsr.map((srl, index) => {
              if (srl.status === "Approved") {
                let totalCost = 0;
                    return (

                      totalCost = totalCost + srl.cost,
                        <tr className=" text-kwhite bg-kred/20 text-center">
                         
                            <td>{srl.supplier}</td>
                            <td>{srl.cost}</td>
                            
                            
                        </tr>
                        
                    );
                  }
                })}
                
                      </tbody>

        </table>
      </div>
    
    {/* totalcost showing */}

    <div className="grid grid-cols-4 bg-kwhite text-2xl text-kblack py-4 text-center">
      <div>
        <h3>Total income : </h3>
      </div>
      <div>
        <h3 className="text-kgreen">{totincome}</h3>
      </div>
      <div>
        <h3>Total Outcome : </h3>
      </div>
      <div>
        <h3 className="text-kred">{totoutcome}</h3>
      </div>

    </div>
     </Card>

</div>
</div>
</>
  );
}

export default Ordermain;
