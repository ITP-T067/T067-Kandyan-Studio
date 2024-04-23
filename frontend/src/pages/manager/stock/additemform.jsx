import React, { useState } from 'react';
import { Card, Button, CardBody } from "@material-tailwind/react";
import { HiOutlineArrowCircleLeft } from "react-icons/hi";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8010/";

const AddItemForm = () => {

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        type: "",
        quantity: "",
        maxCapacity: "",
        damaged: 0,
        sellingPrice: "",
        buyingPrice: 0,
        file: null
    });

    const handleOnChange = (e) => {
        const { value, name } = e.target;

        if (name === 'file') {
            setFormData((prev) => ({
                ...prev,
                [name]: e.target.files[0]
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const [isAlert, setIsAlert] = useState(false);
    const [alertStatus, setAlertStatus] = useState('success');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("type", formData.type);
        formDataToSend.append("quantity", formData.quantity);
        formDataToSend.append("maxCapacity", formData.maxCapacity);
        formDataToSend.append("damaged", formData.damaged);
        formDataToSend.append("sellingPrice", formData.sellingPrice);
        formDataToSend.append("buyingPrice", formData.buyingPrice);
        formDataToSend.append("file", formData.file);

        console.log("Form Data:", formDataToSend);
        try {
            const data = await axios.post("/item/create", formDataToSend);
            console.log("Response:", data); // Log the response from the server
            if (data.data.success) {
                setIsAlert(true);
                setAlertStatus('success');
                setMessage("Item Added Successfully !");
                setTimeout(() => {
                    setIsAlert(false);
                    window.location.href = "/manager/stockdept/items/";
                }, 3000);
            } else {
                setIsAlert(true);
                setAlertStatus('danger');
                setMessage("Failed to Add Item !");
                setTimeout(() => {
                    setIsAlert(false);
                }, 3000);
            }
        } catch (error) {
            console.log(error.response.data);
            setIsAlert(true);
            setAlertStatus('warning');
            setMessage("Error Occurred While Adding Item, Check For Empty Fields !");
        }
    };

    const GoBack = () => {
        window.location.href = "/manager/stockdept/items/";
    };

    return (
        <>
            <div className="mx-5 mb-5">
                        <div>
                            <Button
                                onClick={GoBack}
                                className="flex items-center bg-transparent text-kwhite px-5"
                            >
                                <HiOutlineArrowCircleLeft className="w-10 h-10" />
                                <span className="text-2xl ml-5">Add Item</span>
                            </Button>
                        </div>
            </div>
            <div className="flex p-10 m-5 text-kwhite bg-kwhite/20 rounded-lg w-1/2 mx-auto ">
                <form onSubmit={handleSubmit} className="grid grid-cols-3 items-center justify-between">
                    <label htmlFor="itemName">Item Name</label>
                    <div className="m-3 col-span-2 items-center justify-between">
                        <input
                            type="text"
                            className="bg-kwhite rounded-lg text-kblack w-full text-sm"
                            name="name"
                            value={formData.name}
                            onChange={handleOnChange}
                        />
                    </div>
                    <label htmlFor="type">Type</label>
                    <div className="m-3 col-span-2 items-center justify-between">
                        <select
                            className="bg-kwhite rounded-lg text-kblack w-full text-sm"
                            name="type"
                            value={formData.type}
                            onChange={handleOnChange}
                            required
                        >
                            <option value=""></option>
                            <option value="Sublimations">Sublimations</option>
                            <option value="Photo Prints">Photo Prints</option>
                            <option value="Laminates">Laminates</option>
                            <option value="Frames">Frames</option>
                        </select>
                        {/* <input
                            type="text"
                            className="bg-kwhite rounded-lg text-kblack w-full text-sm"
                            name="type"
                            value={formData.type}
                            onChange={handleOnChange}
                        /> */}
                    </div>
                    <label htmlFor="description">Description</label>
                    <div className="m-3 col-span-2 items-center justify-between">
                        <textarea
                            cols={50}
                            rows={3}
                            className="bg-kwhite rounded-lg text-kblack w-full text-sm"
                            name="description"
                            value={formData.description}
                            onChange={handleOnChange}
                        ></textarea>
                    </div>
                    <div className='col-span-3 mr-5'>
                            <div className="grid grid-cols-4 items-center justify between my-2">
                                <label htmlFor="quantity">Initial Quantity</label>
                                <div className='mr-3'>
                                    <input
                                        type="number"
                                        className="bg-kwhite rounded-lg text-kblack w-full text-sm mr-5"
                                        name="quantity" 
                                        value={formData.quantity}
                                        onChange={handleOnChange}
                                    />
                                </div>
                                <label className='ml-5' htmlFor="capacity">Max Capacity</label>
                                <div>
                                    <input
                                        type="number"
                                        className="bg-kwhite rounded-lg text-kblack w-full text-sm"
                                        name="maxCapacity"
                                        value={formData.maxCapacity}
                                        onChange={handleOnChange}
                                    />
                                </div>
                            </div>
                        </div>
                    <div className='col-span-2 grid-rows-2 items-center justify-between'>
                        <div className='col-span-2 items-center justify-between'>
                            <div className="grid grid-cols-3 items-center justify-between mt-3">
                                <label htmlFor="price">Selling Price</label>
                                <div className='col-span-2 grid grid-cols-3 items-center p-2'>
                                    <span>LKR</span>
                                    <input
                                        type="number"
                                        className="col-span-2 bg-kwhite rounded-lg text-kblack w-full text-sm"
                                        name="sellingPrice"
                                        value={formData.sellingPrice}
                                        onChange={handleOnChange}
                                    />
                                </div>
                                <label htmlFor="photo">Upload Photo</label>
                                <div className='col-span-2 mr-2'>
                                    <input
                                        type="file"
                                        className="bg-kwhite rounded-lg p-1 text-kblack w-full text-sm my-3"
                                        name="file"
                                        onChange={handleOnChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-2 text-kblack flex flex-col row-span-2 ml-5 bg-kwhite/20 rounded-lg">
                        <button type="submit" className="bg-kred text-kwhite rounded-lg p-2 mb-3 border">Submit</button>
                        <button className="bg-kwhite text-kblack rounded-lg p-3" onClick={GoBack}>Cancel</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddItemForm;
