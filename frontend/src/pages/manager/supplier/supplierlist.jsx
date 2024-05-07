import React, { useEffect, useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Card, Typography, Button, CardBody } from "@material-tailwind/react";
import axios from "axios";

import { HiOutlineArrowCircleLeft, HiOutlinePlusCircle } from "react-icons/hi";

axios.defaults.baseURL = "http://localhost:8010/";

const SupplierList = () => {
    const GoBack = () => {
        window.location.href = "/manager/supplier/supplierlist/";
    };

    const handleButton = (type) => {
        return () => {
            switch (type) {
                case "Add":
                    window.location.href = "/manager/supplier/supplierlist/";
                    break;
                case "Edit":
                    window.location.href =  "/manager/supplier/supplierlist/";
                    break;
                default:
                    break;
            }
        };
    };

  

    const [dataList, setDataList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    useEffect(() => {
        getFetchData();
        console.log(dataList);
    }, []);

    const getFetchData = async () => {
        try {
            const response = await axios.get("/supplylist/");
            console.log(response);
            if (response.data.success) {
                setDataList(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Calculate index of the last item of current page
    const indexOfLastItem = currentPage * itemsPerPage;
    // Calculate index of the first item of current page
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // Get the current items to be displayed
    const currentItems = dataList.slice(indexOfFirstItem, indexOfLastItem);

    // Logic to dynamically generate page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(dataList.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
  
            <div className="p-10">
                <table className="w-full rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-kblack/40 border-kwhite text-kwhite p-4 font-bold border-b text-center">
                            <th>Supplier Name</th>
                            <th>Phone Number</th>
                            <th>Supplier Email</th>
                            <th>Item</th>
                            <th>Action</th>   
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.length > 0 ? (
                            currentItems.map((il, index) => {
                                return (
                                    <tr className="border-b bg-kwhite/20 text-kwhite text-center items-center p-4">
                                        <td>{il.supplier_name}</td>
                                        <td>{il.phone_number}</td>
                                        <td>{il.supplier_email}</td>
                                        <td>{il.item_name}</td>
                                        
                                        <td className="p-4 text-kblack flex-grow">
                                            <div className="flex justify-center gap-3 mx-auto">
                                                
                                                <Button size="sm" className="bg-kred text-kwhite">
                                                    Manage
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr className="bg-kwhite/20 w-full text-kwhite">
                                <td colSpan="6" className="text-center py-4">
                                    No data available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="flex items-center justify-between border-t border-kblack p-4">
                    
                  
                </div>
            </div>
        </>
    );
};

export default SupplierList;

