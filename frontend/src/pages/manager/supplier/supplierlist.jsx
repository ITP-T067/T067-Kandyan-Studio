import React, { useEffect, useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Card, Typography, Button, CardBody, Input } from "@material-tailwind/react";
import axios from "axios";

import { HiOutlineArrowCircleLeft, HiOutlinePlusCircle } from "react-icons/hi";

axios.defaults.baseURL = "http://localhost:8010/";

const SupplierList = () => {
    const [dataList, setDataList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [editable, setEditable] = useState(false);
    const [editedSupplier, setEditedSupplier] = useState({
        name: "",
        phoneNumber: "",
        email: "",
        address: ""
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("/supplier/");
            if (response.data.success) {
                setDataList(response.data.data);
            } else {
                console.error("Unexpected data format:", response.data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleEdit = (supplier) => {
        setEditedSupplier(supplier);
        setEditable(true);
    };

    const handleUpdate = async () => {
        try {
            console.log("Updating supplier:", editedSupplier);
            const response = await axios.put(`/supplier/update/${editedSupplier._id}`, editedSupplier);
            console.log("Update response:", response.data);
            if (response.data.success) {
                setEditable(false);
                fetchData();
                alert("Supplier updated successfully!");
            } else {
                console.error("Error updating supplier:", response.data.message);
            }
        } catch (error) {
            console.error("Error updating supplier:", error);
        }
    };
    

    const handleCancelEdit = () => {
        setEditable(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedSupplier({ ...editedSupplier, [name]: value });
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this item?");
        if (confirmed) {
            try {
                const response = await axios.delete(`/supplier/delete/${id}`);
                if (response.data.success) {
                    fetchData();
                    alert(response.data.message);
                } else {
                    console.error("Error deleting item:", response.data.message);
                }
            } catch (error) {
                console.error("Error deleting item:", error);
            }
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
                            <th>Address</th>
                            <th>Action</th>   
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.length > 0 ? (
                            currentItems.map((supplier, index) => {
                                return (
                                    <tr key={index} className="border-b bg-kwhite/20 text-kwhite text-center items-center p-4">
                                        <td>{supplier.name}</td>
                                        <td>{supplier.phoneNumber}</td>
                                        <td>{supplier.email}</td>
                                        <td>{supplier.address}</td>
                                        
                                        <td className="p-4 text-kblack flex-grow">
                                            <div className="flex justify-center gap-3 mx-auto">
                                                <Button size="sm" className="bg-kgreen text-kwhite" onClick={() => handleEdit(supplier)}>
                                                    Edit
                                                </Button>
                                                <Button size="sm" className="bg-kred text-kwhite" onClick={() => handleDelete(supplier._id)}>
                                                    Delete
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
                    {pageNumbers.map((number) => (
                        <button key={number} onClick={() => paginate(number)} className="px-3 py-1 rounded-md bg-kblue text-kwhite">
                            {number}
                        </button>
                    ))}
                </div>
            </div>
            {editable && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-kwhite bg-opacity-50 backdrop-filter backdrop-blur-lg">
                    <Card className="w-full w-full md:w-2/3 lg:w-1/2 border border-kblack rounded-lg">
                        <CardBody>
                            <Typography tag="h2" className="text-2xl mb-4 font-semibold text-kblack text-center">
                                Edit Supplier
                            </Typography>
                            <div className="space-y-4">
                                <Input
                                        
                                    name="name"
                                    type="text"
                                    label="Name"
                                    placeholder="Enter Name"
                                    value={editedSupplier.name}
                                    onChange={handleInputChange}
                                    
                                   
                                />
                                <Input
                                    
                                    name="phoneNumber"
                                    type="text"
                                    label="Phone Number"
                                    placeholder="Enter Phone Numbe"
                                    value={editedSupplier.phoneNumber}
                                    onChange={handleInputChange}
                                  
                                />
                                <Input
                                    
                                 name="email"
                                    type="email"
                                    label="Email"
                                    placeholder="Enter Email"
                                    value={editedSupplier.email}
                                    onChange={handleInputChange}
                                
                                    
                                />
                                <Input
                                 name="address"
                                    type="text"
                                    label="Address"
                                    placeholder="Enter Address"
                                    value={editedSupplier.address}
                                    onChange={handleInputChange}
                                    
                                />
                            </div>
                            <div className="flex justify-center mt-4">
                                <Button color="white" onClick={handleUpdate} className="mr-2 bg-kgreen">
                                    Update
                                </Button>
                                <Button color="white" onClick={handleCancelEdit}className="mr-2 bg-kred">
                                    Cancel
                                </Button>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            )}
        </>
    );
};

export default SupplierList;
