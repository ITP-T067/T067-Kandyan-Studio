import React, { useEffect, useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Card, Typography, Button, CardBody } from "@material-tailwind/react";
import axios from "axios";

import { HiOutlineArrowCircleLeft, HiOutlinePlusCircle } from "react-icons/hi";

axios.defaults.baseURL = "http://localhost:8010/";

const Items = () => {
    const GoBack = () => {
        window.location.href = "/manager/stockdept/";
    };

    //Edit Item
    const [formDataEdit, setFormDataEdit] = useState({
        name: "",
        description: "",
        type: "",
        maxCapacity: "",
        sellingPrice: "",
        image: "",
        _id: "",
    });
    const [editSection, setEditSection] = useState(false);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const data = await axios.put("/item/update", formDataEdit);
        console.log("Response:", data);
        if (data.data.success) {
            console.log(data.data.message);
            setEditSection(false);
            getFetchData();
            alert(data.data.message);
        }
    };

    const handleEditOnchange = async(e) => {
        const {value,id} = e.target
        setFormDataEdit((prev)=> {
          
          return{
            ...prev,
            [id] : value
          }
        })
    };

    const handleEdit = async (item) => {
        setFormDataEdit(item);
        setEditSection(true);
        console.log("Edit Item Form Opened");
    };

    const handleButton = (type) => {
        return () => {
            switch (type) {
                case "Add":
                    window.location.href = "/manager/stockdept/items/additem";
                    break;
                case "Edit":
                    window.location.href = "/manager/stockdept/items/edititem";
                    break;
                default:
                    break;
            }
        };
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this item?");
        if (confirmed) {
            const data = await axios.delete("/item/delete/" + id);
            if (data.data.success) {
                getFetchData();
                alert(data.data.message);
            }
        }
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
            const response = await axios.get("/item/");
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
            {editSection && (
                <div className="fixed top-0 left-0 w-full h-full bg-kblack bg-opacity-50 backdrop-blur flex items-center justify-center z-50">
                    <button className="absolute top-5 right-5 bg-kblack text-kwhite" onClick={() => setEditSection(false)}>X</button>
                    <form onSubmit={handleUpdate} className="bg-kgray p-10 rounded-lg">
                        <Typography color="black" size="xl" bold>
                            Edit Item
                        </Typography>
                        <div className="flex flex-col m-5">
                            <label htmlFor="itemName">Item Name</label>
                            <input
                                type="text"
                                className="bg-kwhite rounded-lg p-1 text-kblack w-full text-sm"
                                id="name"
                                onChange={handleEditOnchange}
                                value={formDataEdit.name}
                                
                            />
                        </div>
                        <div className="flex flex-col m-5">
                            <label htmlFor="description">Description</label>
                            <textarea
                                className="bg-kwhite rounded-lg p-1 text-kblack text-sm w-full"
                                id="description"
                                cols="100"
                                rows="5"
                                value={formDataEdit.description}
                                onChange={handleEditOnchange} 
                            />
                        </div>
                        <div className="flex flex-col m-5">
                            <label htmlFor="type">Type</label>
                            <input
                                type="text"
                                className="bg-kwhite rounded-lg p-1 text-kblack w-full text-sm"
                                id="type"
                                value={formDataEdit.type}
                                onChange={handleEditOnchange}
                            />
                        </div>
                        <div className="flex items-center justify between m-5">
                            <div>
                                <label htmlFor="maxCapacity">Max Capacity</label>
                                <input
                                    type="number" 
                                    className="bg-kwhite rounded-lg p-1 text-kblack text-sm" 
                                    id="maxCapacity"
                                    value={formDataEdit.maxCapacity}
                                    onChange={handleEditOnchange}
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify between m-5">
                            <div className='mr-3'>
                                <label htmlFor="sellingPrice">Selling Price</label>
                                <input 
                                    type="number" 
                                    className="bg-kwhite rounded-lg p-1 text-kblack w-full text-sm" 
                                    id="sellingPrice" 
                                    value={formDataEdit.sellingPrice}
                                    onChange={handleEditOnchange}
                                />
                            </div>
                            <div>
                                <label htmlFor="image">Upload Photo</label>
                                <input 
                                    type="text" 
                                    className="bg-kwhite rounded-lg p-1 text-kblack w-full text-sm " 
                                    id="image" 
                                    value={formDataEdit.image}
                                    onChange={handleEditOnchange}
                                />
                            </div>
                                <input type="hidden" name="itemID" value={formDataEdit._id} />
                        </div>
                        <div className="p-4 text-kblack flex flex-col">
                            <button type="submit" className="bg-kred text-kwhite rounded-lg p-3 mb-4">Submit</button>
                        </div>
                    </form>
                </div>
            )}
            <div className="mx-5 mb-5">
                <Card>
                    <CardBody className="flex items-center justify-between">
                        <div>
                            <Button
                                onClick={GoBack}
                                className="flex items-center space-x-2 bg-transparent text-kwhite px-3 py-2 rounded-md"
                            >
                                <HiOutlineArrowCircleLeft className="w-5 h-5" />
                                <span className="text-sm">Item List</span>
                            </Button>
                        </div>
                        <div>
                            <input
                                type="search"
                                placeholder="Search"
                                className="bg-kwhite flex-grow rounded-full p-2 text-sm"
                            />
                        </div>
                        <div>
                            <Button
                                className="flex items-center space-x-2 bg-kblue text-kwhite p-3 px-5 rounded-full"
                                onClick={handleButton("Add")}
                            >
                                <HiOutlinePlusCircle className="w-5 h-5" />
                                <span className="text-sm">Add Item</span>
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className="px-10">
                <table className="w-full rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-kblack/40 border-kwhite text-kwhite p-4 font-bold border-b text-center">
                            <th className="py-5">Item Name</th>
                            <th>Description</th>
                            <th>Type</th>
                            <th>Max Capacity</th>
                            <th>Selling Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.length > 0 ? (
                            currentItems.map((il, index) => {
                                return (
                                    <tr key={il._id} className="border-b bg-kwhite/20 text-kwhite text-center items-center p-4">
                                        <td>{il.name}</td>
                                        <td>{il.description}</td>
                                        <td>{il.type}</td>
                                        <td>{il.maxCapacity}</td>
                                        <td>{il.sellingPrice}</td>
                                        <td className="p-4 text-kblack flex-grow">
                                            <div className="flex justify-center gap-3 mx-auto">
                                                <Button className="p-3 bg-kblue" onClick={() => handleEdit(il)}>
                                                    <PencilIcon className="h-4 w-4 text-kwhite" />
                                                </Button>
                                                <Button className="p-3 bg-kred" onClick={() => handleDelete(il._id)}>
                                                    <TrashIcon className="h-4 w-4 text-kwhite" />
                                                </Button>
                                                <Button size="sm" className="bg-kred text-kwhite">
                                                    Remove Waste
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
                    <Button variant="text" size="sm" className="text-kblack bg-kwhite">
                        Previous
                    </Button>
                    <div className="flex items-center gap-2">
                        {pageNumbers.map((number) => (
                            <Button
                                key={number}
                                variant="text"
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

export default Items;
