import React from 'react';
import { Card, Button, CardBody } from "@material-tailwind/react";

import { HiOutlineArrowCircleLeft } from "react-icons/hi";

const AddItemForm = () => {
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
                <form>
                    <div className="flex flex-col m-5">
                        <label htmlFor="itemName">Item Name</label>
                        <input type="text" className="bg-kwhite rounded-lg p-1 text-kblack w-full text-sm" id="itemName"/>
                    </div>
                    <div className="flex flex-col m-5">
                        <label htmlFor="additional">Description</label>
                        <textarea className="bg-kwhite rounded-lg p-1 text-kblack text-sm w-full" id="additional" cols="100" rows="5"/>
                    </div>
                    <div className="flex flex-col m-5">
                        <label htmlFor="itemName">Type</label>
                        <input type="text" className="bg-kwhite rounded-lg p-1 text-kblack w-full text-sm" id="itemName"/>
                    </div>
                    <div className="flex items-center justify between m-5">
                        <div className='mr-3'>
                        <label htmlFor="quantity">Initial Quantity</label>
                        <input type="number" className="bg-kwhite rounded-lg p-1 text-kblack text-sm" id="quantity"/>
                        </div>
                        <div>
                        <label htmlFor="quantity">Max Capacity</label>
                        <input type="number" className="bg-kwhite rounded-lg p-1 text-kblack text-sm" id="quantity"/>
                        </div>
                    </div>
                    <div className="flex items-center justify between m-5">
                        <div className='mr-3'>
                        <label htmlFor="quantity">Selling Price</label>
                        <input type="number" className="bg-kwhite rounded-lg p-1 text-kblack w-full text-sm" id="quantity"/>
                        </div>
                        <div>
                        <label htmlFor="quantity">Upload Photo</label>
                        <input type="file" className="bg-kwhite rounded-lg p-1 text-kblack w-full text-sm " id="quantity"/>
                        </div>
                    </div>
                    <div className="p-4 text-kblack flex flex-col">
                    <button type="submit" className="bg-kred text-kwhite rounded-lg p-3 mb-4">Submit</button>
                    <button type="submit" className="bg-kwhite text-kblack rounded-lg p-3">Cancel</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddItemForm;
