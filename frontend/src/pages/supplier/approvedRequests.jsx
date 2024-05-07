import React, { useEffect, useState } from "react";
import { Card, Typography, Button, CardBody } from "@material-tailwind/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { HiOutlineArrowCircleLeft, HiOutlinePlusCircle } from "react-icons/hi";

import axios from "axios";

axios.defaults.baseURL = "http://localhost:8010/";

const SupplyRequest = () => {
    const GoBack = () => {
        window.location.href = "/manager/stockdept/";
    };

    // Find Item Name By ID to Display in Table
    const fetchItemById = async (itemId) => {
        try {
            const response = await axios.get(`/item/find/${itemId}`);
            if (response.data.success && response.data.data) {
                // Check if data exists
                const { name, quantity, maxCapacity } = response.data.data; // Destructure if data exists
                return { name, quantity, maxCapacity };
            } else {
                console.error("Failed to fetch item data:", response.data.message);
                return "Item not found";
            }
        } catch (error) {
            console.error("Error fetching item data:", error);
            return "Item not found";
        }
    };

    // Edit Supply Request
    const [formDataEdit, setFormDataEdit] = useState({
        date: "",
        item: "",
        reqquantity: "",
        supplier: "",
        exdate: "",
        status: "",
    });
    const [editSection, setEditSection] = useState(false);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const data = await axios.put("/supplyrequest/update/", formDataEdit);
            if (data.data.success) {
                console.log(data.data.message);
                setEditSection(false);
                getFetchData();
            } else {
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditOnChange = async (e) => {
        const { value, id } = e.target;
        setFormDataEdit((prev) => {
            return {
                ...prev,
                [id]: value,
            };
        });
    };

    const handleEdit = async (supplyRequest) => {
        setFormDataEdit(supplyRequest);
        setEditSection(true);
        console.log("Edit Supply Request Form Opened");
    };

    // Add custom Supply Request
    const handleButton = (option) => {
        return () => {
            switch (option) {
                case "Accept":
                    window.location.href = "/supplier/approvereq";
                    break;
                default:
                    break;
            }
        };
    };

    // Delete Supply Request
    const handleDelete = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this request?");
        if (confirmed) {
            const data = await axios.delete("/supplyrequest/delete/" + id);
            if (data.data.success) {
                getFetchData();
            } else {
            }
        }
    };

    const [dataList, setDataList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    // Fetch Data
    useEffect(() => {
        getFetchData();
        console.log(dataList);
    }, []);

    // Fetch Data Function
    const getFetchData = async () => {
        try {
            const response = await axios.get("/supplyrequest/");
            console.log(response);

            if (response.data.success) {
                const supplyRequests = response.data.data;

                // Fetch additional item information for each request
                const items = await Promise.all(
                    supplyRequests.map(async (request) => {
                        const item = await fetchItemById(request.item);
                        const { name, quantity, maxCapacity } = item;
                        const exquantity = quantity;
                        return { ...request, name, exquantity, maxCapacity };
                    })
                );

                // Set the data list with the updated items
                setDataList(items);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Stock Level Demonstration
    const colorChanger = (percentage) => {
        let color = "";

        if (percentage < 25) {
            color = "bg-pred/70";
        } else if (percentage < 50) {
            color = "bg-porange/70";
        } else if (percentage < 75) {
            color = "bg-pyellow/70";
        } else if (percentage < 90) {
            color = "bg-plgreen/70";
        } else {
            color = "bg-pgreen/70";
        }

        return `${color}`;
    };


    // Search Supply Request By ID
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const results = dataList.filter((item) =>
            item.name?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
    }, [searchTerm, dataList]);

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(searchResults.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
         <div className="flex justify-center">
    <Button className="bg-kgray text-kwhite px-6 py-4 "  onClick={handleButton("Add")}>
    
        Requests
    </Button>
    <Button className="bg-kgray text-kwhite px-6 py-3"  onClick={handleButton("Edit")}  >
        Approved Requests
    </Button>
</div>

            <div className="p-10">
                <table className="w-full rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-kblack/40 border-kwhite text-kwhite p-4 font-bold border-b text-center">
                            <th>Date</th>
                            <th>Item</th>
                            <th>Quantity</th>
                            
                            <th>Expected Date</th>
                            <th>Status</th>
                            <th>Cost</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {currentItems.length > 0 ? (
                            currentItems.map((srl, index) => {
                                const itemQuantity = parseInt(srl.exquantity, 10);
                                const itemMaxCapacity = parseInt(srl.maxCapacity, 10);

                                const ReqDate = new Date(srl.date);
                                const ReqDateStr =
                                    ReqDate.getDate() +
                                    " - " +
                                    (ReqDate.getMonth() + 1) +
                                    " - " +
                                    ReqDate.getFullYear();

                                const ExDate = new Date(srl.exdate);
                                const ExDateStr =
                                    ExDate.getDate() +
                                    " - " +
                                    (ExDate.getMonth() + 1) +
                                    " - " +
                                    ExDate.getFullYear();

                                return (
                                    <>
                                        <tr key={srl._id} className="border-b bg-kwhite/20 text-kwhite text-center items-center p-4">
                                            <td>{ReqDateStr}</td>
                                            <td>{srl.name}</td>
                                            <td>{srl.reqquantity}</td>
                                            <td>{ExDateStr}</td>
                                            <td>{srl.status}</td>
                                            <td>{srl.cost}</td>
                                            <td className="p-4 text-kblack flex-grow">
                                                <div className="flex justify-center gap-3 mx-auto">
                                                    <button className="p-3 bg-kgreen"onClick={handleButton("")}> Manage </button>
                                                </div>
                                            </td>
                                        </tr>
                                    </>
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

export default SupplyRequest;

