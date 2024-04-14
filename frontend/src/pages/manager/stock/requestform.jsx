import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Button, CardBody } from "@material-tailwind/react";
import { HiOutlineArrowCircleLeft } from "react-icons/hi";
import Alert from "../../../Components/Common/Alerts/alert"

import axios from "axios";

axios.defaults.baseURL = "http://localhost:8010/";

const RequestForm = () => {

    const location = useLocation();
    const ItemId = new URLSearchParams(location.search).get("itemId");

    const [itemObj, setItemObj] = useState(null);

    const fetchItem = async () => {
        try {
            const response = await axios.get(`/item/find/${ItemId}`);
            setItemObj(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.log(error.response.data);
        }
    };

    useEffect(() => {
        fetchItem();
    }, [ItemId]);

    const itemid = itemObj ? itemObj._id : '';

    const [date, setDate] = useState(new Date());
    const [item, setItemName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [supplier, setSupplier] = useState('');
    const [exdate, setExDate] = useState('');
    const [status, setStatus] = useState('Pending');
    const [cost, setCost] = useState('0');
    const [additional, setAdditional] = useState('');


    const [isAlert, setIsAlert] = useState(false);
    const [alertStatus, setAlertStatus] = useState('success');
    const [message, setMessage] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const data = await axios.post("/supplyrequest/create",{
                date: date,
                item: itemid,
                reqquantity: quantity,
                supplier: supplier,
                exdate: exdate,
                status: status,
                cost: cost,
                additional: additional
            });
            if(data.data.success){
                //alert(data.data.message);
                setIsAlert(true);
                setAlertStatus('success');
                setMessage("Supply Request saved successfully");
                setTimeout(() => {
                    setIsAlert(false); // Reset delete status after 5000ms
                    window.location.href = "/manager/stockdept/stocklevels";
                  },5000);
            }else{
                setIsAlert(true);
                setAlertStatus('error');
                setMessage("Supply Request failed");
                setTimeout(() => {
                    setIsAlert(false); // Reset delete status after 5000ms
                  },5000);
            }
        }catch(error){
            console.log(error);
            setIsAlert(true);
            setAlertStatus("warning");
            setMessage("Error Occured While Updating Supply Request, Check For Empty Fields");
        }
    };

    const GoBack = () => {
        window.location.href = "/manager/stockdept/stocklevels";
    };

    return (
        <>
            {isAlert && (<Alert message={message} type={alertStatus}/>)}
            <div className="mx-5 mb-5">
                <Card>
                    <CardBody className="flex items-center justify-between">
                        <div>
                            <Button
                                onClick={GoBack}
                                className="flex items-center space-x-2 bg-transparent text-kwhite px-3 py-2 rounded-md"
                            >
                                <HiOutlineArrowCircleLeft className="w-5 h-5" />
                                <span className="text-sm">Request Supplies</span>
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className="flex p-3 m-5 text-kwhite bg-kwhite/20 rounded-lg">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col m-5">
                        <label htmlFor="itemName">Item Name</label>
                        <input
                            type="text"
                            className="bg-kwhite rounded-lg p-1 text-kblack w-full text-sm"
                            id="itemname"
                            value={`${itemObj ? itemObj.name : ''} - ${itemObj ? itemObj.description : ''}`}
                            onChange={(e) => setItemName(e.target.value)}
                            disabled
                        />
                    </div>
                    <div className="flex flex-col m-5">
                        <label htmlFor="quantity">Quantity</label>
                        <input 
                            type="number" 
                            className="bg-kwhite rounded-lg p-1 text-kblack w-full text-sm" 
                            id="quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col m-5">
                        <label htmlFor="supplier">Supplier</label>
                        <select 
                            className="bg-kwhite rounded-lg p-1 text-kblack w-full text-sm" 
                            id="supplier"
                            value={supplier}
                            onChange={(e) => setSupplier(e.target.value)}
                            >
                                <option value="">Select a supplier</option>
                                <option value="supplier1">Supplier 1</option>
                                <option value="supplier2">Supplier 2</option>
                                <option value="supplier3">Supplier 3</option>
                        </select>
                    </div>
                    <div className="flex flex-col m-5">
                        <label htmlFor="exdate">Expected Delivery Date</label>
                        <input type="date" 
                            className="bg-kwhite rounded-lg p-1 text-kblack w-full text-sm" 
                            id="exdate"
                            value={exdate}
                            onChange = {(e) => setExDate(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col m-5">
                        <label htmlFor="additional">Additional (Optional)</label>
                        <textarea 
                            className="bg-kwhite rounded-lg p-1 text-kblack text-sm w-full" 
                            id="additional" 
                            cols="100" 
                            rows="5"
                            value={additional}
                            onChange={(e) => setAdditional(e.target.value)}
                        />
                    </div>
                    <div className="p-4 text-kblack flex flex-col">
                        <button type="submit" className="bg-kred text-kwhite rounded-lg p-3 mb-4">Submit</button>
                        <button className="bg-kwhite text-kblack rounded-lg p-3" onClick={GoBack}>Cancel</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default RequestForm;
