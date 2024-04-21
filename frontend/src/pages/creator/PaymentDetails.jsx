import React, { useEffect, useState, useRef } from 'react';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

axios.defaults.baseURL = "http://localhost:8010/"

export default function PaymentDetails() {
  const { orderId } = useParams();
    const [formDataEdit, setFormDataEdit] = useState({
        Status : "",
    });
    const navigate = useNavigate();

    const [data, setData] = useState();
    const [receiptData, setReceiptData] = useState(null);

    const dataRef = useRef(null); // Create a ref to keep track of data

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
    

    // const getPendingOrderData = async () => {
    //     try {
    //       const response = await axios.get("/order/on/get/pending");
    //       if (response.data.success) {
    //         console.log("Sample Order:", response.data.data[0]);
    //         console.log("Current orderId:", orderId);

    //         const filteredReceipts = response.data.data.filter(receipt => {
    //             console.log("Comparing:", receipt.Order_ID._id, orderId);
    //             return receipt.Order_ID._id === orderId;
    //         });
    //         console.log(response);
    //         console.log(filteredReceipts);
    //         console.log(response.data);
    //         setReceiptData(filteredReceipts);
    //         console.log(response.data);
    //       }
    //     } catch (error) {
    //       console.error("Error fetching receipt data:", error);
    //     }
    //   };

    useEffect(() => { 
        getFetchData();
        // getPendingOrderData();
    }, []);

    // const handleUpdate = async(e)=>{ 
    //     e.preventDefault()
    //     setFormDataEdit(formDataEdit.Status == "Completed")
    //     const data = await axios.put("/order/on/update", formDataEdit)
    //     if(data.data.success){
    //         navigate('/creator/orderPayments')
    //         getFetchData()
    //         alert(data.data.message)
    //     }
    // }
    
    const handleEditOnchange = async(e) => {
        const {value,name} = e.target
        setFormDataEdit((prev)=> {
            return{
                ...prev,
                [name] : value
            }
        })
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    
    const showPdf = (slip) => {
        window.open(`http://localhost:8010/uploads/`+ slip, "_blank", "noreferrer");
      };

  return (
    <> 
        <div className="addContainer w-[530px] h-[400px] bg-kgray bg-opacity-70 rounded-[20px] shadow flex flex-col mt-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5">
            <a href='/creator/orderPayments'>
                <IoArrowBackCircleOutline className="text-kwhite text-3xl" />
            </a>
            <h className="text-kwhite text-3xl font-extrabold text-center mt-0 mb-0">View Payment</h>
            <div className="flex flex-col px-5 py-5">
                <div className="mb-5">
                    <label htmlFor="Customer_Name" className="text-kwhite font-bold text-lg">Item Names: </label>
                    <span className="w-[473px] h-[49px] rounded-[10px] mb-0 p-3 text-base text-kwhite">{data?.item_Names.split(',').map((item, index) => {
                        const parts = item.split('-');
                        if (parts.length > 1) {
                        parts.pop();
                        }
                        return parts.join('-'); // join the remaining parts back with dash
                    }).join(', ') || 'N/A'}</span>
                </div>

                <div className="mb-5">
                    <label htmlFor="Inquiry_Data" className="font-bold text-kwhite text-lg">Total Amount: </label>
                    <span className="w-[473px] h-[49px] rounded-[10px] mb-0 p-3 text-base text-kwhite">{data?.total_Price || 'N/A'}</span>
                </div>

                <div className="mb-5">
                    <label htmlFor="Quantity" className="font-bold text-kwhite text-lg">Order Data: </label>
                    <span className="w-[473px] h-[49px] rounded-[10px] mb-0 p-3 text-base text-kwhite">{formatDate(data?.order_Date || 'N/A')}</span>
                </div>

                <div className="mb-5">
                    <label htmlFor="Receipts" className="font-bold text-kwhite text-lg">Receipts: </label>
                    <ul className="text-kwhite mt-2">
                        {data?.order_slip.split(',').map((receipt, index) => (
                            <li key={index} className="mb-2">
                                <button className="btn_edit bg-kblue text-kwhite font-bold py-3 px-5 rounded-[10px] mr-2" onClick={() => showPdf(receipt.trim())}>
                                    View Receipt
                                </button>
                                <span>{receipt.trim()}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </div>
        </>
  )
}
