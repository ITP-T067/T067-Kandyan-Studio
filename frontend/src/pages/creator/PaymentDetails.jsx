import React, { useEffect, useState } from 'react';
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
    const [receiptData, setReceiptData] = useState([]);

    const getFetchData = async () => {
        try {
            const response = await axios.get("/order/on/" + orderId);
            if (response.data.success) {
                setData(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const getFetchReceiptData = async () => {
        try {
          const response = await axios.get("/receipt/");
          if (response.data.success) {
            console.log("Sample Receipt:", response.data.data[0]);
            console.log("Current orderId:", orderId);

            const filteredReceipts = response.data.data.filter(receipt => {
                console.log("Comparing:", receipt.Order_ID._id, orderId);
                return receipt.Order_ID._id === orderId;
            });
            console.log(response);
            console.log(filteredReceipts);
            console.log(response.data);
            setReceiptData(filteredReceipts);
            console.log(response.data);
          }
        } catch (error) {
          console.error("Error fetching receipt data:", error);
        }
      };

    useEffect(() => { 
        getFetchData();
        getFetchReceiptData();
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
    
    const showPdf = (pdf) => {
        window.open(`http://localhost:8010/Receipts/`+ pdf, "_blank", "noreferrer");
      };

  return (
    <> 
        <div className="addContainer w-[530px] h-[450px] bg-kgray bg-opacity-70 rounded-[20px] shadow flex flex-col mt-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5">
            <a href='/creator/orderPayments'>
                <IoArrowBackCircleOutline className="text-kwhite text-3xl" />
            </a>
            <h className="text-kwhite text-3xl font-extrabold text-center mt-0 mb-0">View Payment</h>
            <div className="flex flex-col px-5 py-5">
                <div className="mb-5">
                    <label htmlFor="Customer_Name" className="text-kwhite font-bold text-lg">Customer Name: </label>
                    <span className="w-[473px] h-[49px] rounded-[10px] mb-0 p-3 text-base text-kwhite">{data?.Cus_ID?.Cus_Name || 'N/A'}</span>
                </div>

                <div className="mb-5">
                    <label htmlFor="Inquiry_Data" className="font-bold text-kwhite text-lg">Order: </label>
                    <span className="w-[473px] h-[49px] rounded-[10px] mb-0 p-3 text-base text-kwhite">{data?.Order_Type || 'N/A'}</span>
                </div>

                <div className="mb-5">
                    <label htmlFor="Quantity" className="font-bold text-kwhite text-lg">Quantity: </label>
                    <span className="w-[473px] h-[49px] rounded-[10px] mb-0 p-3 text-base text-kwhite">{data?.Quantity || 'N/A'}</span>
                </div>

                <div className="mb-5">
                    <label htmlFor="Order_Amount" className="font-bold text-kwhite text-lg">Amount To Be Paid: </label>
                    <span className="w-[473px] h-[49px] rounded-[10px] mb-0 p-3 text-base text-kwhite">{data?.Order_Amount}</span>
                </div>

                <div className="mb-5">
                    <label htmlFor="Receipts" className="font-bold text-kwhite text-lg">Receipts: </label>
                    <ul className="text-kwhite">
                        {receiptData.map((receipt, index) => (
                            <li key={index} className="mb-2">
                                <button className="btn_edit bg-kblue text-kwhite font-bold py-3 px-5 rounded-[10px] mr-2" onClick={() => showPdf(receipt.Receipt_Path)}>
                                    View Receipt
                                </button>
                                <span>{receipt.Receipt_Path}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </div>
        </>
  )
}
