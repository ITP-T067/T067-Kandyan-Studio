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
        image: "image"
    })

    const handleOnChange = (e) => {
        const { value, id } = e.target
        setFormData((prev) => {
            return {
                ...prev,
                [id]: value
            }
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);
        try {
            const data = await axios.post("/item/create", formData);
            console.log("Response:", data); // Log the response from the server
            if (data.data.success) {
                alert(data.data.message);
                window.location.href = "/manager/stockdept/items/";
            }
        } catch (error) {
            console.log(error.response.data);
        }
    };

    const GoBack = () => {
        window.location.href = "/manager/stockdept/items/";
    };

    return (
        <>
            <div className="mx-5 mb-5">
                <Card>
                    <CardBody className="flex items-center justify-between">
                        <div>
                            <Button
                                onClick={GoBack}
                                className="flex items-center space-x-2 bg-transparent text-kwhite px-3 py-2 rounded-md"
                            >
                                <HiOutlineArrowCircleLeft className="w-5 h-5" />
                                <span className="text-sm">Add Item</span>
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
                            id="name"
                            value={formData.name}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="flex flex-col m-5">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            className="bg-kwhite rounded-lg p-1 text-kblack text-sm w-full"
                            id="description"
                            value={formData.description}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="flex flex-col m-5">
                        <label htmlFor="type">Type</label>
                        <input
                            type="text"
                            className="bg-kwhite rounded-lg p-1 text-kblack w-full text-sm"
                            id="type"
                            value={formData.type}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="flex items-center justify between m-5">
                        <div className='mr-3'>
                            <label htmlFor="quantity">Initial Quantity</label>
                            <input
                                type="number"
                                className="bg-kwhite rounded-lg p-1 text-kblack text-sm"
                                id="quantity"
                                value={formData.quantity}
                                onChange={handleOnChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="capacity">Max Capacity</label>
                            <input
                                type="number"
                                className="bg-kwhite rounded-lg p-1 text-kblack text-sm"
                                id="maxCapacity"
                                value={formData.maxCapacity}
                                onChange={handleOnChange}
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify between m-5">
                        <div className='mr-3'>
                            <label htmlFor="price">Selling Price</label>
                            <input
                                type="number"
                                className="bg-kwhite rounded-lg p-1 text-kblack w-full text-sm"
                                id="sellingPrice"
                                value={formData.sellingPrice}
                                onChange={handleOnChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="photo">Upload Photo</label>
                            <input
                                type="text"
                                className="bg-kwhite rounded-lg p-1 text-kblack w-full text-sm "
                                id="image"
                                value={formData.image}
                                onChange={handleOnChange}
                            />
                        </div>
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

export default AddItemForm;
