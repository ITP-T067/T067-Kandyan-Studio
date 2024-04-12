import React from 'react';
import { Card, Button, CardBody } from "@material-tailwind/react";
import { HiOutlineArrowCircleLeft } from "react-icons/hi";

const CustomRequestForm = () => {
    const GoBack = () => {
        window.location.href = "/manager/stockdept/supplyrequest";
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
                                <span className="text-sm">Request Supplies</span>
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className="flex p-3 m-5 text-kwhite bg-kwhite/20 rounded-lg">
                <form>
                    <div className="flex flex-col m-5">
                        <label htmlFor="itemName">Item Name</label>
                        <input type="text" className="bg-kwhite rounded-lg p-1 text-kblack w-full text-sm" id="itemName" />
                    </div>
                    <div className="flex flex-col m-5">
                        <label htmlFor="quantity">Quantity</label>
                        <input type="number" className="bg-kwhite rounded-lg p-1 text-kblack w-full text-sm" id="quantity" />
                    </div>
                    <div className="flex flex-col m-5">
                        <label htmlFor="supplier">Supplier</label>
                        <select className="bg-kwhite rounded-lg p-1 text-kblack w-full text-sm" id="supplier">
                            <option value="supplier1">Supplier 1</option>
                            <option value="supplier2">Supplier 2</option>
                            <option value="supplier3">Supplier 3</option>
                        </select>
                    </div>
                    <div className="flex flex-col m-5">
                        <label htmlFor="dDate">Expected Delivery Date</label>
                        <input type="date" className="bg-kwhite rounded-lg p-1 text-kblack w-full text-sm" id="dDate" />
                    </div>
                    <div className="flex flex-col m-5">
                        <label htmlFor="additional">Additional (Optional)</label>
                        <textarea className="bg-kwhite rounded-lg p-1 text-kblack text-sm w-full" id="additional" cols="100" rows="5" />
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

export default CustomRequestForm;
