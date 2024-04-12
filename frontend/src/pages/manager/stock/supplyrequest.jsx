import React, {useEffect, useState} from "react";
import { Card, Typography, Button, CardBody } from "@material-tailwind/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { HiOutlineArrowCircleLeft, HiOutlinePlusCircle } from "react-icons/hi";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8010/";

const SupplyRequest = () => {
    const GoBack = () => {
        window.location.href = "/manager/stockdept/";
    };

    const handleButton = (option) => {
        return () => {
            switch (option) {
                case "Request":
                    window.location.href = "/manager/stockdept/stocklevels/customreq";
                    break;
                default:
                    break;
            }
        };
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this request?");
        if (confirmed) {
            const data = await axios.delete("/supplyrequest/delete/"+id);
            if(data.data.success){
                getFetchData();
                alert(data.data.message);
            }
        }
    }

    const [dataList, setDataList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    useEffect(() => {
        getFetchData();
        console.log(dataList);
    },[])

    const getFetchData = async () => {
        try {
            const response = await axios.get("/supplyrequest/");
            console.log(response);

            if(response.data.success){
                setDataList(response.data.data);
            }
        } catch (error) {
            console.error("error fetching data:", error);
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = dataList.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(dataList.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }


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
                                <span className="text-sm">Supply Requests</span>
                            </Button>
                        </div>
                        <div className="mx-auto">
                            <input
                                type="search"
                                placeholder="Search"
                                className="bg-kwhite rounded-full p-2 text-sm"
                            />
                        </div>
                        <div>
                            <Button
                                className="flex items-center space-x-2 bg-kblue text-kwhite p-3 px-5"
                                onClick={handleButton("Request")}
                            >
                                <HiOutlinePlusCircle className="w-5 h-5" />
                                <span className="text-sm">Add Custom Request</span>
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className="p-10">
                <table className="w-full rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-kblack/40 border-kwhite text-kwhite p-4 font-bold border-b text-center">
                            <th>Date</th>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Supplier</th>
                            <th>Expected Delivery Date</th>
                            <th>Expected Levels</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.length > 0 ? (
                            currentItems.map((srl, index) => {
                                return (
                                    <tr className="border-b bg-kwhite/20 text-kwhite text-center items-center p-4">
                                    <td>{srl.date}</td>
                                    <td>{srl.item}</td>
                                    <td>{srl.quantity}</td>
                                    <td>{srl.supplier}</td>
                                    <td>{srl.exdate}</td>
                                    <td>
                                            <div className="w-full bg-kgray rounded-full border">
                                                <div
                                                    className={"bg-kgreen p-2 text-center text-xs font-medium leading-none text-kwhite rounded-full"}
                                                    style={{ width: `40%` }}
                                                >
                                                    40%
                                                </div>
                                            </div>
                                    </td>
                                    <td>{srl.status}</td>
                                    <td className="p-4 text-kblack flex-grow">
                                        <div className="flex justify-center gap-3 mx-auto">
                                            <Button className="p-3 bg-kblue">
                                                <PencilIcon className="h-4 w-4 text-kwhite" />
                                            </Button>
                                            <Button className="p-3 bg-kred">
                                                <TrashIcon className="h-4 w-4 text-kwhite" onClick={() => handleDelete(srl._id)} />
                                            </Button>
                                        </div>
                                    </td>
                                    </tr>
                                )
                            })
                        ) : (
                            <tr className="border-b bg-kwhite/20 text-kwhite text-center items-center p-4">
                                    <td colSpan="8" className="text-center py-4">
                                    No data available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="flex items-center justify-between border-t border-kblack p-4">
                    <Button variant="text" size="sm" className="text-kblack bg-kwhite">
                        Previous
                    </Button>
                    <div className="flex items-center gap-2">
                        {pageNumbers.map((number) => (
                            <Button
                                key={number}
                                varient="text"
                                size="sm"
                                className="text-kblack bg-kwhite"
                                onClick={() => paginate(number)}
                            >
                                {number}
                            </Button>
                        ))}
                    </div>
                    <Button variant="text" size="sm" className="text-kblack bg-kwhite">
                        Next
                    </Button>
                </div>
            </div>
        </>
    );
};

export default SupplyRequest;
