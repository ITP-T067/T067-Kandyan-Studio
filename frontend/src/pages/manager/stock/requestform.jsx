import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Button, CardBody } from "@material-tailwind/react";
import { HiOutlineArrowCircleLeft } from "react-icons/hi";
import Alert from "../../../Components/Common/Alerts/alert"

import DatePicker from "react-datepicker";

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

    const [itemImage, setItemImage] = useState(null);
    const [itemName, setItemName] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    const [itemQuantity, setItemQuantity] = useState(0);
    const [itemMaxCapacity, setItemMaxCapacity] = useState(0);
    const [itemSellingPrice, setItemSellingPrice] = useState(0);
    const [itemDiscount, setItemDiscount] = useState(0);
    const [slotsLeft, setSlotsLeft] = useState(0);


    useEffect(() => {
        if (itemObj) {
            setItemName(itemObj.name);
            setItemDescription(itemObj.description);
            setItemQuantity(itemObj.quantity);
            setItemMaxCapacity(itemObj.maxCapacity);
            setItemSellingPrice(itemObj.sellingPrice);
            setSlotsLeft(itemObj.maxCapacity - itemObj.quantity);


            import(`../../../../../backend/uploads/StockManagement/${itemObj.image}`)
                .then(image => {
                    setItemImage(image.default);
                })
                .catch(error => {
                    console.error("Error loading image:", error);
                });
        }
    }, [itemObj]);

    useEffect(() => {
        fetchItem();
    }, [ItemId]);

    const itemid = itemObj ? itemObj._id : '';

    const [date, setDate] = useState(new Date());
    const [item, setItem] = useState('');
    const [quantity, setQuantity] = useState('');
    const [supplier, setSupplier] = useState('');
    const [exdate, setExDate] = useState(new Date());
    const [status, setStatus] = useState('Pending');
    const [cost, setCost] = useState('0');
    const [additional, setAdditional] = useState('');

    const [isAlert, setIsAlert] = useState(false);
    const [alertStatus, setAlertStatus] = useState('success');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(isAlert === true) {
            return;
        } else {
            try {
                const TotalCost = calcTotal(quantity, itemSellingPrice, itemDiscount);
                const data = await axios.post("/supplyrequest/create", {
                    date: date,
                    item: itemid,
                    reqquantity: quantity,
                    supplier: supplier,
                    exdate: exdate,
                    status: status,
                    cost: TotalCost,
                    additional: additional
                });
                if (data.data.success) {
                    setIsAlert(true);
                    setAlertStatus('success');
                    setMessage("Supply Request saved successfully !");
                    setTimeout(() => {
                        setIsAlert(false);
                        window.location.href = "/manager/stockdept/stocklevels";
                    }, 3000);
                } else {
                    setIsAlert(true);
                    setAlertStatus('error');
                    setMessage("Supply Request failed !");
                    setTimeout(() => {
                        setIsAlert(false);
                    }, 3000);
                }
            } catch (error) {
                console.log(error);
                setIsAlert(true);
                setAlertStatus("warning");
                setMessage("Error Occured While Updating Supply Request, Check For Empty Fields !");
            }
        }
        
        
    };

    const GoBack = () => {
        window.location.href = "/manager/stockdept/stocklevels";
    };

    const calcTotal = (quantity, itemSellingPrice, itemDiscount) => {
        return (quantity * itemSellingPrice) - itemDiscount;
    }

    const [remainingSlotsError, setRemainingSlotsError] = useState("");

    const handleQuantityChange = (e) => {
        const enteredQuantity = e.target.value;
        const onlyNumbers = enteredQuantity.replace(/\D/g, ''); // Remove non-numeric characters
        if (onlyNumbers > slotsLeft) {
            setRemainingSlotsError("Quantity exceeds remaining slots");
        } else if (onlyNumbers < 1) {
            setRemainingSlotsError("Quantity must be at least 1");
        } else {
            setRemainingSlotsError("");
        }
        setQuantity(enteredQuantity === '' ? '' : onlyNumbers);
    };
    
    const handleDateChange = (date) => {
        // Check if the selected date is in the past
        if (date < new Date()) {
            // If the date is in the past, show an error message
            setIsAlert(true);
            setAlertStatus("error");
            setMessage("Expected delivery date cannot be in the past");
        } else {
            // If the date is valid, update the exdate state
            setExDate(date);
            // Hide the error message if it was shown previously
            setIsAlert(false);
        }
    };
    

    return (
        <>
            {isAlert && (<Alert message={message} type={alertStatus} />)}
            <div className="mx-5 mb-5">
                <div className="flex items-center justify-between">
                    <div>
                        <Button
                            onClick={GoBack}
                            className="flex items-center bg-transparent text-kwhite px-5"
                        >
                            <HiOutlineArrowCircleLeft className="w-10 h-10" />
                            <span className="text-2xl ml-5">Request Supplies</span>
                        </Button>
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-3'>
                    <div className="col-span-2 p-3 m-5 text-kwhite bg-kwhite/20 rounded-lg items-center justify-center">
                        <div className='grid grid-cols-3'>
                            <div className='grid grid-cols-1 bg-kwhite/20 rounded-lg items-center justify-center m-5 p-5'>
                                <img src={itemImage} className="mx-auto w-40 h-auto rounded-full" />
                                <span className='text-3xl font-bold mx-auto mt-5'>{itemName}</span>
                                <span className='truncate max-w-xs'>{itemDescription}</span>
                                <span className='text-center w-full bg-kblack p-2 mt-5 rounded-full'>{itemQuantity} Out of {itemMaxCapacity}</span>
                            </div>
                            <div className='col-span-2 my-auto mx-auto'>
                                <div className="grid grid-cols-5 p-5 items-center">
                                    <label htmlFor="quantity">Quantity</label>
                                    <div class="col-span-2">
                                        <input
                                            type="number"
                                            name="quantity"
                                            min={1}
                                            id="quantity"
                                            className="w-full rounded-md border-0 py-1.5 text-kblack shadow-sm ring-1 ring-inset ring-kgray focus:ring-2 focus:ring-inset focus:ring-kgreen sm:max-w-xs sm:text-sm sm:leading-6"
                                            value={quantity}
                                            onChange={handleQuantityChange}
                                        />
                                    </div>
                                    <div className="col-span-2 text-center w-full bg-kblack/80 p-1 ml-5 rounded-lg">
        {slotsLeft} slots left
    </div>
                                    {remainingSlotsError ? (
    <div className="col-span-5 text-center w-full bg-kred/40 mt-5 p-1 ml-5 rounded-lg">
        {remainingSlotsError}
    </div>
) : (
    ''
)}

                                </div>
                                <div className="grid grid-cols-3 p-5 items-center">
                                    <label htmlFor="supplier">Supplier</label>
                                    <div class="mt-2 col-span-2">
                                        <select
                                            className="w-full rounded-md border-0 py-1.5 text-kblack shadow-sm ring-1 ring-inset ring-kgray focus:ring-2 focus:ring-inset focus:ring-kgreen sm:max-w-xs sm:text-sm sm:leading-6"
                                            id="supplier"
                                            value={supplier}
                                            onChange={(e) => setSupplier(e.target.value)}
                                        >
                                            <option value="">Select a supplier</option>
                                            <option value="Photo Technica">Photo Technica</option>
                                            <option value="Nine Hearts">Nine Hearts</option>
                                            <option value="Pettah Traders">Pettah Traders</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex p-5 items-center justify-between">
                                    <label htmlFor="exdate">Expected Delivery Date</label>
                                    <DatePicker
                                        placeholderText="Select Date"
                                        className="w-full rounded-md border-0 py-1.5 text-kblack shadow-sm ring-1 ring-inset ring-kgray focus:ring-2 focus:ring-inset focus:ring-kgreen sm:max-w-xs sm:text-sm sm:leading-6"
                                        id="exdate"
                                        selected={exdate}
                                        onChange={handleDateChange}
                                    />
                                </div>
                                <div className="grid grid-cols-3 p-5 items-center">
                                    <label htmlFor="additional">Additional (Optional)</label>
                                    <div class="mt-2 col-span-2">
                                        <textarea
                                            className="w-full rounded-md border-0 py-1.5 text-kblack shadow-sm ring-1 ring-inset ring-kgray focus:ring-2 focus:ring-inset focus:ring-kgreen sm:max-w-xs sm:text-sm sm:leading-6"
                                            id="additional"
                                            cols="100"
                                            rows="5"
                                            value={additional}
                                            onChange={(e) => setAdditional(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-3 m-5 text-kwhite bg-kwhite/20 rounded-lg">
                        <div className='w-full text-2xl text-center bg-kblack rounded-lg p-4 mb-5'>Supply Request Preview</div>
                        <div className='flex items-center justify-between bg-kwhite/20 px-5 py-2 mb-5 rounded-lg'>
                            <p>Supplier:</p>
                            <span>{supplier}</span>
                        </div>
                        <table className='w-full table-fixed rounded-lg overflow-hidden'>
                            <tr className='bg-kblack/80 border-kwhite text-kwhite p-4 font-bold border-b text-center '>
                                <th>Item</th>
                                <th>Quantity</th>
                                <th>Unit Price</th>
                            </tr>
                            <tr className="border-b bg-kblack/40 text-kwhite text-center items-center p-4">
                                <td>{itemName}</td>
                                <td>{quantity}</td>
                                <td>{Number(itemSellingPrice).toLocaleString('en-US', { style: 'currency', currency: 'LKR' })}</td>
                            </tr>
                            <tr className="border-b bg-kwhite/20 text-kwhite p-4">
                                <td className='border-r bg-kblack/60 text-center items-center'>Subtotal</td>
                                <td colSpan={2} className='text-right pr-5 bg-kblack/40'>{Number(quantity * itemSellingPrice).toLocaleString('en-US', { style: 'currency', currency: 'LKR' })} </td>
                            </tr>
                        </table>
                        <div className="flex items-center justify-between p-3 text-2xl bg-kblack rounded-lg mt-5">
                            <p>Total:</p>
                            <span>{Number(calcTotal(quantity, itemSellingPrice, itemDiscount)).toLocaleString('en-US', { style: 'currency', currency: 'LKR' })}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-6 mt-5 text-kblack">
                            <button type="submit" className="bg-kred text-kwhite rounded-lg p-3">Submit</button>
                            <button className="bg-kwhite text-kblack rounded-lg p-3" onClick={GoBack}>Cancel</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default RequestForm;
